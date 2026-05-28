param(
    [Parameter(Mandatory = $true)]
    [string]$InputJsonPath,

    [Parameter(Mandatory = $false)]
    [string]$StoragePath = ".\triagens.db.json",

    [Parameter(Mandatory = $false)]
    [string]$DemandasStoragePath = ".\demandas.db.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Read-JsonFile {
    param([string]$Path)
    if (-not (Test-Path $Path)) {
        throw "Arquivo nao encontrado: $Path"
    }
    $raw = Get-Content -Path $Path -Raw -Encoding UTF8
    if ([string]::IsNullOrWhiteSpace($raw)) {
        throw "Arquivo vazio: $Path"
    }
    return $raw | ConvertFrom-Json
}

function Ensure-Storage {
    param([string]$Path)
    if (-not (Test-Path $Path)) {
        Set-Content -Path $Path -Value "[]" -Encoding UTF8
    }
}

function Get-ListFromDb {
    param([string]$Path)
    $db = Read-JsonFile -Path $Path
    if ($null -eq $db) { return @() }
    if ($db -is [string]) {
        throw "Storage invalido. Esperado array JSON."
    }
    return @($db)
}

function Validate-IsoDate {
    param([string]$Value, [string]$FieldName)
    if (-not $Value) {
        throw "$FieldName obrigatorio"
    }
    try {
        [void][DateTimeOffset]::Parse($Value)
    }
    catch {
        throw "$FieldName invalido. Use formato ISO 8601."
    }
}

function Validate-Item {
    param($Item, [string]$DemandaId)

    $classesValidas = @("fato", "hipotese", "sugestao", "contexto", "ruido")
    $statusValidos = @("manter", "revisar", "backlog", "descartar")
    $origensValidas = @("usuario", "IA", "referencia_externa", "regra_interna")

    if (-not $Item.triagem_item_id) { throw "triagem_item_id obrigatorio" }
    if (-not $Item.demanda_id) { throw "item.demanda_id obrigatorio" }
    if ($Item.demanda_id -ne $DemandaId) { throw "item.demanda_id divergente da demanda principal" }
    if (-not $Item.texto_item -or $Item.texto_item.Trim().Length -lt 3) { throw "texto_item invalido (minimo 3 caracteres)" }
    if (-not $Item.classe_item) { throw "classe_item obrigatoria" }
    if (-not $Item.status_pertinencia) { throw "status_pertinencia obrigatorio" }
    if (-not ($Item.PSObject.Properties.Name -contains "justificativa_curta")) {
        throw "justificativa_curta obrigatoria"
    }
    if (-not $Item.justificativa_curta -or $Item.justificativa_curta.Trim().Length -lt 5) { throw "justificativa_curta invalida (minimo 5 caracteres)" }

    if ($classesValidas -notcontains $Item.classe_item) {
        throw "classe_item invalida. Valores: $($classesValidas -join ', ')"
    }
    if ($statusValidos -notcontains $Item.status_pertinencia) {
        throw "status_pertinencia invalido. Valores: $($statusValidos -join ', ')"
    }
    if ($Item.PSObject.Properties.Name -contains "origem_item") {
        if ($origensValidas -notcontains $Item.origem_item) {
            throw "origem_item invalida. Valores: $($origensValidas -join ', ')"
        }
    }
    if ($Item.PSObject.Properties.Name -contains "nota_pertinencia") {
        $nota = [double]$Item.nota_pertinencia
        if ($nota -lt 0 -or $nota -gt 5) {
            throw "nota_pertinencia invalida. Faixa permitida: 0 a 5"
        }
    }

    Validate-IsoDate -Value $Item.data_classificacao -FieldName "data_classificacao"
}

function Validate-Resumo {
    param($Resumo, [string]$DemandaId, [int]$TotalItens, [array]$Items)

    $classes = @("fato", "hipotese", "sugestao", "contexto", "ruido")
    $status = @("manter", "revisar", "backlog", "descartar")

    if (-not $Resumo.demanda_id) { throw "triagem_resumo.demanda_id obrigatorio" }
    if ($Resumo.demanda_id -ne $DemandaId) { throw "triagem_resumo.demanda_id divergente da demanda principal" }
    if ($Resumo.total_itens -lt 1) { throw "triagem_resumo.total_itens deve ser >= 1" }
    if ($Resumo.total_itens -ne $TotalItens) { throw "triagem_resumo.total_itens divergente da quantidade de itens" }
    if (-not $Resumo.totais_por_classe) { throw "totais_por_classe obrigatorio" }
    if (-not $Resumo.totais_por_status) { throw "totais_por_status obrigatorio" }
    Validate-IsoDate -Value $Resumo.data_fechamento_triagem -FieldName "data_fechamento_triagem"

    foreach ($c in $classes) {
        if ($null -eq $Resumo.totais_por_classe.$c) { throw "totais_por_classe.$c obrigatorio" }
    }
    foreach ($s in $status) {
        if ($null -eq $Resumo.totais_por_status.$s) { throw "totais_por_status.$s obrigatorio" }
    }

    foreach ($c in $classes) {
        $countReal = @($Items | Where-Object { $_.classe_item -eq $c }).Count
        if ([int]$Resumo.totais_por_classe.$c -ne $countReal) {
            throw "Resumo inconsistente em classe '$c': esperado $countReal"
        }
    }
    foreach ($s in $status) {
        $countReal = @($Items | Where-Object { $_.status_pertinencia -eq $s }).Count
        if ([int]$Resumo.totais_por_status.$s -ne $countReal) {
            throw "Resumo inconsistente em status '$s': esperado $countReal"
        }
    }
}

function Validate-TriagemPayload {
    param($Payload, [array]$Demandas)

    if (-not $Payload.demanda_id) { throw "demanda_id obrigatorio no payload de triagem" }
    if (-not ($Payload.PSObject.Properties.Name -contains "triagem_itens")) { throw "triagem_itens obrigatorio" }

    $itens = @($Payload.triagem_itens)
    if ($itens.Count -lt 1) {
        throw "Cada demanda precisa ter ao menos 1 item classificado."
    }

    $demandaExistente = @($Demandas | Where-Object { $_.demanda_id -eq $Payload.demanda_id }).Count -gt 0
    if (-not $demandaExistente) {
        throw "demanda_id nao encontrado em demandas.db.json"
    }

    foreach ($item in $itens) {
        Validate-Item -Item $item -DemandaId $Payload.demanda_id
    }

    if (-not $Payload.triagem_resumo) {
        throw "triagem_resumo obrigatorio para fechamento da triagem"
    }
    Validate-Resumo -Resumo $Payload.triagem_resumo -DemandaId $Payload.demanda_id -TotalItens $itens.Count -Items $itens
}

function Upsert-Triagem {
    param([string]$Path, $Payload)
    Ensure-Storage -Path $Path
    $list = @(Get-ListFromDb -Path $Path)

    $existing = $list | Where-Object { $_.demanda_id -eq $Payload.demanda_id } | Select-Object -First 1
    if ($null -ne $existing) {
        $updated = @()
        foreach ($entry in $list) {
            if ($entry.demanda_id -eq $Payload.demanda_id) { $updated += $Payload } else { $updated += $entry }
        }
        Set-Content -Path $Path -Value (ConvertTo-Json -InputObject @($updated) -Depth 10) -Encoding UTF8
        return "updated"
    }

    $newList = @($list) + @($Payload)
    Set-Content -Path $Path -Value (ConvertTo-Json -InputObject @($newList) -Depth 10) -Encoding UTF8
    return "created"
}

Ensure-Storage -Path $DemandasStoragePath
$demandas = Get-ListFromDb -Path $DemandasStoragePath
$payload = Read-JsonFile -Path $InputJsonPath

Validate-TriagemPayload -Payload $payload -Demandas $demandas
$result = Upsert-Triagem -Path $StoragePath -Payload $payload

Write-Output "ok:$result"
