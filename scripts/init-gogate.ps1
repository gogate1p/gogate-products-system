# Create D:\Gogate Products and run full setup
$ErrorActionPreference = "Stop"
$Root = "D:\Gogate Products"

if (-not (Test-Path $Root)) {
  New-Item -Path $Root -ItemType Directory -Force | Out-Null
  Write-Host "Created $Root" -ForegroundColor Green
}

Set-Location $Root
& "$Root\scripts\setup.ps1"

Write-Host ""
Write-Host "Gogate Products monorepo ready at $Root" -ForegroundColor Cyan
Write-Host "Domain: gogateproducts.store" -ForegroundColor Cyan
