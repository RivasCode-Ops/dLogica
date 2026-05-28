# Verificacao critica da Fase 3 (um comando).
# Uso: .\verify-fase3.ps1
# Saida: 0 = tudo ok, 1 = falha

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
Set-Location $root

Write-Host "=== dLogica - verify-fase3 ===" -ForegroundColor Cyan

function Step($name, [scriptblock]$action) {
    Write-Host "`n>> $name" -ForegroundColor Yellow
    & $action
    if ($LASTEXITCODE -ne 0 -and $null -ne $LASTEXITCODE) {
        throw "Falha em: $name (exit $LASTEXITCODE)"
    }
    Write-Host "OK: $name" -ForegroundColor Green
}

Step "Dependencias Python" {
    pip install -q -r requirements-fase3.txt
}

Step "Migracoes Alembic" {
    alembic upgrade head
}

Step "Testes API (pytest)" {
    pytest -q tests/api/
}

Step "Dependencias UI" {
    Push-Location ui
    npm install --silent
    Pop-Location
}

Step "Testes UI (vitest)" {
    Push-Location ui
    npm test
    Pop-Location
}

Step "Testes E2E (Playwright)" {
    Push-Location ui
    npx playwright install chromium 2>$null
    npm run test:e2e
    Pop-Location
}

Write-Host ""
Write-Host "=== SUITE CRITICA APROVADA ===" -ForegroundColor Green
exit 0
