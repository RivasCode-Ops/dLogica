param(
    [Parameter(Mandatory = $true)]
    [string]$InputJsonPath,

    [Parameter(Mandatory = $false)]
    [string]$StoragePath = ".\briefings.db.json",

    [Parameter(Mandatory = $false)]
    [string]$DemandasStoragePath = ".\demandas.db.json",

    [Parameter(Mandatory = $false)]
    [string]$DecisoesStoragePath = ".\decisoes.db.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Read-JsonFile {
    param([string]$Path)
    if (-not (Test-Path $Path)) { throw "Arquivo nao encontrado: $Path" }
    $raw = Get-Content -Path $Path -Raw -Encoding UTF8
    if ([string]::IsNullOrWhiteSpace($raw)) { throw "Arquivo vazio: $Path" }
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
    if ($db -is [string]) { throw "Storage invalido. Esperado array JSON." }
    return @($db)
}

function Validate-IsoDate {
    param([string]$Value, [string]$FieldName)
    if (-not $Value) { throw "$FieldName obrigatorio" }
    try { [void][DateTimeOffset]::Parse($Value) } catch { throw "$FieldName invalido. Use formato ISO 8601." }
}

function Validate-Enum {
    param([string]$Value, [string[]]$Allowed, [string]$FieldName)
    if (-not $Value) { throw "$FieldName obrigatorio" }
    if ($Allowed -notcontains $Value) { throw "$FieldName invalido. Valores: $($Allowed -join ', ')" }
}

function Validate-BriefingPayload {
    param($Payload, [array]$Demandas, [array]$Decisoes)

    $tiposValidos = @("app", "automacao", "agente", "painel", "documento_estruturado", "fluxo_manual", "backlog", "descarte")
    $decisaoPromocaoValida = @("sim", "nao", "validar_mais")

    if (-not $Payload.briefing_id) { throw "briefing_id obrigatorio" }
    if (-not $Payload.demanda_id) { throw "demanda_id obrigatorio" }

    $demandaExistente = @($Demandas | Where-Object { $_.demanda_id -eq $Payload.demanda_id }).Count -gt 0
    if (-not $demandaExistente) { throw "demanda_id nao encontrado em demandas.db.json" }

    $decisao = $Decisoes | Where-Object { $_.demanda_id -eq $Payload.demanda_id } | Select-Object -First 1
    if ($null -eq $decisao) { throw "decisao da demanda nao encontrada em decisoes.db.json" }

    if (-not $Payload.problema -or $Payload.problema.Trim().Length -lt 10) { throw "problema invalido (minimo 10 caracteres)" }
    if (-not $Payload.objetivo -or $Payload.objetivo.Trim().Length -lt 8) { throw "objetivo invalido (minimo 8 caracteres)" }

    if (-not ($Payload.PSObject.Properties.Name -contains "criterios_de_decisao")) { throw "criterios_de_decisao obrigatorio" }
    $criterios = @($Payload.criterios_de_decisao)
    if ($criterios.Count -lt 3) { throw "criterios_de_decisao deve ter no minimo 3 itens" }

    Validate-Enum -Value $Payload.solucao_sugerida -Allowed $tiposValidos -FieldName "solucao_sugerida"
    if ($Payload.solucao_sugerida -ne $decisao.tipo_recomendado) {
        throw "solucao_sugerida divergente da decisao registrada no Modulo 3"
    }

    if (-not $Payload.proximo_passo -or $Payload.proximo_passo.Trim().Length -lt 8) { throw "proximo_passo invalido (minimo 8 caracteres)" }

    if (-not $Payload.metrica_tempo) { throw "metrica_tempo obrigatoria" }
    if (-not $Payload.metrica_impacto) { throw "metrica_impacto obrigatoria" }
    if (-not $Payload.metrica_risco) { throw "metrica_risco obrigatoria" }
    if (-not ($Payload.PSObject.Properties.Name -contains "baseline_numerico_inicial")) { throw "baseline_numerico_inicial obrigatorio" }
    if (-not ($Payload.PSObject.Properties.Name -contains "meta_numerica_primeira_iteracao")) { throw "meta_numerica_primeira_iteracao obrigatorio" }

    if (-not ($Payload.PSObject.Properties.Name -contains "fora_de_escopo")) { throw "fora_de_escopo obrigatorio" }
    if (@($Payload.fora_de_escopo).Count -lt 1) { throw "fora_de_escopo deve ter no minimo 1 item" }

    if (-not ($Payload.PSObject.Properties.Name -contains "descartes_relevantes")) { throw "descartes_relevantes obrigatorio" }
    $descartes = @($Payload.descartes_relevantes)
    if ($descartes.Count -lt 2) { throw "descartes_relevantes deve ter no minimo 2 itens" }
    foreach ($d in $descartes) {
        if (-not $d.item) { throw "descartes_relevantes.item obrigatorio" }
        if (-not $d.justificativa_curta -or $d.justificativa_curta.Trim().Length -lt 5) {
            throw "descartes_relevantes.justificativa_curta invalida (minimo 5 caracteres)"
        }
    }

    Validate-IsoDate -Value $Payload.data_geracao -FieldName "data_geracao"
    if (-not $Payload.responsavel_geracao) { throw "responsavel_geracao obrigatorio" }

    if ($Payload.solucao_sugerida -eq "app") {
        if (-not ($Payload.PSObject.Properties.Name -contains "gate_promocao_app")) {
            throw "gate_promocao_app obrigatorio quando solucao_sugerida = app"
        }
        $g = $Payload.gate_promocao_app
        if ($null -eq $g.score_total) { throw "gate_promocao_app.score_total obrigatorio" }
        $score = [int]$g.score_total
        if ($score -lt 0 -or $score -gt 16) { throw "gate_promocao_app.score_total invalido. Faixa: 0 a 16" }
        Validate-Enum -Value $g.decisao_promocao -Allowed $decisaoPromocaoValida -FieldName "gate_promocao_app.decisao_promocao"
        if (-not $g.justificativa_promocao) { throw "gate_promocao_app.justificativa_promocao obrigatorio" }
    }
}

function Upsert-Briefing {
    param([string]$Path, $Payload)
    Ensure-Storage -Path $Path
    $list = @(Get-ListFromDb -Path $Path)

    $existing = $list | Where-Object { $_.demanda_id -eq $Payload.demanda_id } | Select-Object -First 1
    if ($null -ne $existing) {
        $updated = @()
        foreach ($entry in $list) {
            if ($entry.demanda_id -eq $Payload.demanda_id) { $updated += $Payload } else { $updated += $entry }
        }
        Set-Content -Path $Path -Value (ConvertTo-Json -InputObject @($updated) -Depth 12) -Encoding UTF8
        return "updated"
    }

    $newList = @($list) + @($Payload)
    Set-Content -Path $Path -Value (ConvertTo-Json -InputObject @($newList) -Depth 12) -Encoding UTF8
    return "created"
}

Ensure-Storage -Path $DemandasStoragePath
Ensure-Storage -Path $DecisoesStoragePath

$demandas = Get-ListFromDb -Path $DemandasStoragePath
$decisoes = Get-ListFromDb -Path $DecisoesStoragePath
$payload = Read-JsonFile -Path $InputJsonPath

Validate-BriefingPayload -Payload $payload -Demandas $demandas -Decisoes $decisoes
$result = Upsert-Briefing -Path $StoragePath -Payload $payload

Write-Output "ok:$result"
