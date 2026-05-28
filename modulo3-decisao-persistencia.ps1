param(
    [Parameter(Mandatory = $true)]
    [string]$InputJsonPath,

    [Parameter(Mandatory = $false)]
    [string]$StoragePath = ".\decisoes.db.json",

    [Parameter(Mandatory = $false)]
    [string]$DemandasStoragePath = ".\demandas.db.json"
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

function Validate-DecisaoPayload {
    param($Payload, [array]$Demandas)

    $tiposValidos = @("app", "automacao", "agente", "painel", "documento_estruturado", "fluxo_manual", "backlog", "descarte")
    $decisaoPainelDocValida = @("painel", "documento_estruturado")
    $decisaoPromocaoValida = @("sim", "nao", "validar_mais")

    if (-not $Payload.decisao_id) { throw "decisao_id obrigatorio" }
    if (-not $Payload.demanda_id) { throw "demanda_id obrigatorio" }

    $demandaExistente = @($Demandas | Where-Object { $_.demanda_id -eq $Payload.demanda_id }).Count -gt 0
    if (-not $demandaExistente) { throw "demanda_id nao encontrado em demandas.db.json" }

    Validate-Enum -Value $Payload.tipo_recomendado -Allowed $tiposValidos -FieldName "tipo_recomendado"

    if (-not ($Payload.PSObject.Properties.Name -contains "justificativa_principal")) {
        throw "justificativa_principal obrigatoria"
    }
    if (-not $Payload.justificativa_principal -or $Payload.justificativa_principal.Trim().Length -lt 10) {
        throw "justificativa_principal invalida (minimo 10 caracteres)"
    }
    if (-not ($Payload.PSObject.Properties.Name -contains "alternativas_consideradas")) {
        throw "alternativas_consideradas obrigatorio"
    }
    $alts = @($Payload.alternativas_consideradas)
    if ($alts.Count -lt 1) { throw "alternativas_consideradas deve ter ao menos 1 item" }

    Validate-IsoDate -Value $Payload.data_decisao -FieldName "data_decisao"
    if (-not $Payload.responsavel_decisao) { throw "responsavel_decisao obrigatorio" }

    if ($Payload.PSObject.Properties.Name -contains "confianca_decisao") {
        $c = [double]$Payload.confianca_decisao
        if ($c -lt 0 -or $c -gt 5) { throw "confianca_decisao invalida. Faixa: 0 a 5" }
    }

    $envolvePainelDocumento = @($alts | Where-Object { $_ -in @("painel", "documento_estruturado") }).Count -gt 0 -or
        ($Payload.tipo_recomendado -in @("painel", "documento_estruturado"))

    if ($envolvePainelDocumento) {
        if (-not ($Payload.PSObject.Properties.Name -contains "validacao_painel_documento")) {
            throw "validacao_painel_documento obrigatoria para disputa painel vs documento_estruturado"
        }

        $v = $Payload.validacao_painel_documento
        if (-not ($v.PSObject.Properties.Name -contains "aplicada")) { throw "validacao_painel_documento.aplicada obrigatorio" }
        if (-not [bool]$v.aplicada) { throw "validacao_painel_documento.aplicada deve ser true" }

        if ($null -eq $v.score_classificacao) { throw "validacao_painel_documento.score_classificacao obrigatorio" }
        $score = [int]$v.score_classificacao
        if ($score -lt 0 -or $score -gt 10) { throw "score_classificacao invalido. Faixa: 0 a 10" }

        if (-not $v.criterio_mais_relevante) { throw "criterio_mais_relevante obrigatorio" }
        Validate-Enum -Value $v.decisao_final -Allowed $decisaoPainelDocValida -FieldName "validacao_painel_documento.decisao_final"
        if (-not $v.justificativa_curta -or $v.justificativa_curta.Trim().Length -lt 5) {
            throw "validacao_painel_documento.justificativa_curta invalida (minimo 5 caracteres)"
        }
        if ($score -ge 5 -and $score -le 7) {
            if (-not ($v.PSObject.Properties.Name -contains "evidencia_teste_7_dias")) {
                throw "evidencia_teste_7_dias obrigatoria para score entre 5 e 7"
            }
            if (-not $v.evidencia_teste_7_dias -or $v.evidencia_teste_7_dias.Trim().Length -lt 10) {
                throw "evidencia_teste_7_dias invalida (minimo 10 caracteres)"
            }
        }
    }

    if ($Payload.tipo_recomendado -eq "app") {
        if (-not ($Payload.PSObject.Properties.Name -contains "gate_promocao_app")) {
            throw "gate_promocao_app obrigatorio quando tipo_recomendado = app"
        }
        $g = $Payload.gate_promocao_app
        if ($null -eq $g.score_total) { throw "gate_promocao_app.score_total obrigatorio" }
        $scoreApp = [int]$g.score_total
        if ($scoreApp -lt 0 -or $scoreApp -gt 16) { throw "gate_promocao_app.score_total invalido. Faixa: 0 a 16" }
        Validate-Enum -Value $g.decisao_promocao -Allowed $decisaoPromocaoValida -FieldName "gate_promocao_app.decisao_promocao"
        if (-not $g.justificativa_promocao) { throw "gate_promocao_app.justificativa_promocao obrigatorio" }
    }
}

function Upsert-Decisao {
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
$demandas = Get-ListFromDb -Path $DemandasStoragePath
$payload = Read-JsonFile -Path $InputJsonPath

Validate-DecisaoPayload -Payload $payload -Demandas $demandas
$result = Upsert-Decisao -Path $StoragePath -Payload $payload

Write-Output "ok:$result"
