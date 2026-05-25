# Gogate Products — initial setup (run from repo root)
$ErrorActionPreference = "Stop"
$Root = "D:\Gogate Products"
Set-Location $Root

Write-Host "=== Gogate Products setup ===" -ForegroundColor Cyan

if (-not (Test-Path ".env")) {
  Copy-Item ".env.example" ".env"
  Write-Host "Created .env from .env.example" -ForegroundColor Green
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host "Node.js 20+ is required. Install from https://nodejs.org" -ForegroundColor Red
  exit 1
}

Write-Host "Installing npm dependencies (workspaces)..." -ForegroundColor Yellow
npm install

Write-Host "Generating Prisma client..." -ForegroundColor Yellow
npm run db:generate

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Start Postgres: docker compose -f infrastructure/docker/docker-compose.yml up -d"
Write-Host "  2. Migrate DB:      npm run db:migrate"
Write-Host "  3. Start API:       npm run dev:api"
Write-Host "  4. Seed data:      npm run db:seed"
Write-Host "  5. Start shop:      npm run dev -w @gogate/customer-web"
Write-Host "  6. Admin:           npm run dev -w @gogate/admin-web  (port 3001)"
Write-Host "  7. Seller:          npm run dev -w @gogate/seller-web (port 3002)"
Write-Host "  8. Tracking:        npm run dev -w @gogate/tracking-portal (port 3004)"
Write-Host ""
Write-Host "Project root: $Root" -ForegroundColor Green
