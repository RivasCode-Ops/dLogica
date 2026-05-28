param(
    [Parameter(Mandatory = $true)]
    [string]$InputJsonPath,

    [Parameter(Mandatory = $false)]
    [string]$StoragePath = ".\auditorias.db.json",

    [Parameter(Mandatory = $false)]
    [string]$DemandasStoragePath = ".\demandas.db.json",

    [Parameter(Mandatory = $false)]
    [string]$BriefingsStoragePath = ".\briefings.db.json"
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

function Ensure-GateObject {
    param($GateObj, [string[]]$RequiredKeys, [string]$Label)
    if ($null -eq $GateObj) { throw "$Label obrigatorio" }
    foreach ($k in $RequiredKeys) {
        if (-not ($GateObj.PSObject.Properties.Name -contains $k)) {
            throw "$Label.$k obrigatorio"
        }
        Validate-Enum -Value $GateObj.$k -Allowed @("ok", "falhou") -FieldName "$Label.$k"
    }
}

function Get-FailedKeys {
    param($GateObj)
    $fails = @()
    foreach ($p in $GateObj.PSObject.Properties) {
        if ($p.Value -eq "falhou") { $fails += $p.Name }
    }
    return $fails
}

function Validate-AuditoriaPayload {
    param($Payload, [array]$Demandas, [array]$Briefings)

    $vereditosValidos = @("aprovado", "aprovado_com_ressalvas", "corrigir", "reprovado")

    if (-not $Payload.auditoria_id) { throw "auditoria_id obrigatorio" }
    if (-not $Payload.demanda_id) { throw "demanda_id obrigatorio" }
    if (-not $Payload.briefing_id) { throw "briefing_id obrigatorio" }
    if (-not $Payload.escopo_referencia) { throw "escopo_referencia obrigatorio" }
    if (-not $Payload.resumo_objetivo -or $Payload.resumo_objetivo.Trim().Length -lt 15) {
        throw "resumo_objetivo invalido (minimo 15 caracteres)"
    }

    $demandaExists = @($Demandas | Where-Object { $_.demanda_id -eq $Payload.demanda_id }).Count -gt 0
    if (-not $demandaExists) { throw "demanda_id nao encontrado em demandas.db.json" }

    $briefing = $Briefings | Where-Object { $_.briefing_id -eq $Payload.briefing_id } | Select-Object -First 1
    if ($null -eq $briefing) { throw "briefing_id nao encontrado em briefings.db.json" }
    if ($briefing.demanda_id -ne $Payload.demanda_id) {
        throw "briefing_id nao pertence ao demanda_id informado"
    }

    $requiredCrit = @("aderencia_problema_objetivo", "escopo_limites", "rastreabilidade_decisao", "qualidade_minima_verificavel")
    $requiredImp = @("coerencia_tipo_solucao", "proximo_passo_executavel", "clareza_entrega", "descartes_rastreaveis")
    Ensure-GateObject -GateObj $Payload.gates_criticos -RequiredKeys $requiredCrit -Label "gates_criticos"
    Ensure-GateObject -GateObj $Payload.gates_importantes -RequiredKeys $requiredImp -Label "gates_importantes"

    Validate-Enum -Value $Payload.veredito -Allowed $vereditosValidos -FieldName "veredito"

    if (-not ($Payload.PSObject.Properties.Name -contains "gates_criticos_falhos")) { throw "gates_criticos_falhos obrigatorio" }
    if (-not ($Payload.PSObject.Properties.Name -contains "gates_importantes_falhos")) { throw "gates_importantes_falhos obrigatorio" }
    if (-not ($Payload.PSObject.Properties.Name -contains "acoes_obrigatorias_antes_do_aceite")) { throw "acoes_obrigatorias_antes_do_aceite obrigatorio" }

    $critFailsDeclared = @($Payload.gates_criticos_falhos)
    $impFailsDeclared = @($Payload.gates_importantes_falhos)
    $critFailsReal = @(Get-FailedKeys -GateObj $Payload.gates_criticos)
    $impFailsReal = @(Get-FailedKeys -GateObj $Payload.gates_importantes)

    $critDeclaredKey = (($critFailsDeclared | Sort-Object) -join "|")
    $critRealKey = (($critFailsReal | Sort-Object) -join "|")
    if ($critDeclaredKey -ne $critRealKey) {
        throw "gates_criticos_falhos divergente dos status de gates_criticos"
    }
    $impDeclaredKey = (($impFailsDeclared | Sort-Object) -join "|")
    $impRealKey = (($impFailsReal | Sort-Object) -join "|")
    if ($impDeclaredKey -ne $impRealKey) {
        throw "gates_importantes_falhos divergente dos status de gates_importantes"
    }

    $expectedVeredito = ""
    if ($critFailsReal.Count -gt 0) {
        $expectedVeredito = "reprovado"
    }
    elseif ($impFailsReal.Count -gt 0) {
        $expectedVeredito = "corrigir"
    }
    else {
        if (@($Payload.acoes_obrigatorias_antes_do_aceite).Count -gt 0) {
            $expectedVeredito = "aprovado_com_ressalvas"
        }
        else {
            $expectedVeredito = "aprovado"
        }
    }

    if ($Payload.veredito -ne $expectedVeredito) {
        throw "veredito incoerente com gates. Esperado: $expectedVeredito"
    }

    if ($Payload.veredito -ne "aprovado" -and @($Payload.acoes_obrigatorias_antes_do_aceite).Count -lt 1) {
        throw "acoes_obrigatorias_antes_do_aceite deve ter ao menos 1 item quando veredito nao for aprovado"
    }

    Validate-IsoDate -Value $Payload.data_auditoria -FieldName "data_auditoria"
    if (-not $Payload.responsavel_auditoria) { throw "responsavel_auditoria obrigatorio" }
}

function Upsert-Auditoria {
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
Ensure-Storage -Path $BriefingsStoragePath

$demandas = Get-ListFromDb -Path $DemandasStoragePath
$briefings = Get-ListFromDb -Path $BriefingsStoragePath
$payload = Read-JsonFile -Path $InputJsonPath

Validate-AuditoriaPayload -Payload $payload -Demandas $demandas -Briefings $briefings
$result = Upsert-Auditoria -Path $StoragePath -Payload $payload

Write-Output "ok:$result"
