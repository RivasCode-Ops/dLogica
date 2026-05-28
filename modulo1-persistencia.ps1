param(
    [Parameter(Mandatory = $true)]
    [string]$InputJsonPath,

    [Parameter(Mandatory = $false)]
    [string]$StoragePath = ".\demandas.db.json"
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

function Validate-Demanda {
    param($Demanda)

    $origensValidas = @("usuario", "IA", "referencia_externa", "regra_interna")
    $statusValidos = @("capturado", "classificado", "avaliado", "aprovado", "backlog", "descartado")

    if (-not $Demanda.demanda_id) { throw "demanda_id obrigatorio" }
    if (-not $Demanda.data_registro) { throw "data_registro obrigatorio" }
    if (-not $Demanda.origem_principal) { throw "origem_principal obrigatoria" }
    if (-not $Demanda.demanda_bruta) { throw "demanda_bruta obrigatoria" }
    if (-not $Demanda.status) { throw "status obrigatorio" }

    if ($Demanda.demanda_bruta.Trim().Length -lt 10) {
        throw "demanda_bruta deve ter no minimo 10 caracteres"
    }

    if ($origensValidas -notcontains $Demanda.origem_principal) {
        throw "origem_principal invalida. Valores: $($origensValidas -join ', ')"
    }

    if ($statusValidos -notcontains $Demanda.status) {
        throw "status invalido. Valores: $($statusValidos -join ', ')"
    }

    try {
        [void][DateTimeOffset]::Parse($Demanda.data_registro)
    }
    catch {
        throw "data_registro invalida. Use formato ISO 8601."
    }
}

function Ensure-Storage {
    param([string]$Path)
    if (-not (Test-Path $Path)) {
        Set-Content -Path $Path -Value "[]" -Encoding UTF8
    }
}

function Upsert-Demanda {
    param(
        [string]$Path,
        $Demanda
    )

    Ensure-Storage -Path $Path
    $db = Read-JsonFile -Path $Path
    if ($null -eq $db) { $db = @() }
    if ($db -is [string]) {
        throw "Storage invalido. Esperado array JSON."
    }

    if ($db.PSObject.Properties.Name -contains "demanda_id") {
        # Compatibilidade com storage legado salvo como objeto unico.
        $list = @($db)
    }
    else {
        $list = @($db)
    }
    $existing = $list | Where-Object { $_.demanda_id -eq $Demanda.demanda_id } | Select-Object -First 1

    if ($null -ne $existing) {
        # Preserva regra de rastreabilidade: nao sobrescrever demanda_bruta sem historico.
        if ($existing.demanda_bruta -ne $Demanda.demanda_bruta) {
            throw "Nao permitido sobrescrever demanda_bruta sem historico."
        }
        $updated = @()
        foreach ($item in $list) {
            if ($item.demanda_id -eq $Demanda.demanda_id) {
                $updated += $Demanda
            }
            else {
                $updated += $item
            }
        }
        $updatedJson = ConvertTo-Json -InputObject @($updated) -Depth 10
        Set-Content -Path $Path -Value $updatedJson -Encoding UTF8
        return "updated"
    }
    else {
        if ($Demanda.status -ne "capturado") {
            throw "Status inicial invalido para criacao. Use 'capturado'."
        }
        $list += $Demanda
        $listJson = ConvertTo-Json -InputObject @($list) -Depth 10
        Set-Content -Path $Path -Value $listJson -Encoding UTF8
        return "created"
    }
}

$demanda = Read-JsonFile -Path $InputJsonPath
Validate-Demanda -Demanda $demanda
$result = Upsert-Demanda -Path $StoragePath -Demanda $demanda

Write-Output "ok:$result"
