# Sobe API (8000) + UI dLogica (5174) em janelas separadas.
# Uso: .\start-fase3.ps1

$root = $PSScriptRoot
$apiCmd = "cd '$root'; pip install -q -r requirements-fase3.txt; uvicorn api.main:app --host 127.0.0.1 --port 8000 --reload"
$uiCmd = "cd '$root\ui'; npm run dev"

Write-Host "Iniciando API em http://127.0.0.1:8000 ..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", $apiCmd

Start-Sleep -Seconds 2

Write-Host "Iniciando UI em http://127.0.0.1:5174 ..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", $uiCmd

Write-Host ""
Write-Host "Abra no browser: http://127.0.0.1:5174"
Write-Host "(5173 = Quadro-Negro, outro projeto)"
Write-Host ""
Write-Host "Para parar: feche as duas janelas PowerShell abertas."
