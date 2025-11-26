$ErrorActionPreference = "Stop"

# Path to Node.js (contains npm.cmd)
$nodeDir = "C:\Program Files\nodejs"

# Locate MongoDB executable (mongod)
$mongoPath = $null
$possibleMongoPaths = @(
    "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe",
    "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe",
    "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe",
    "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe"
)
foreach ($p in $possibleMongoPaths) {
    if (Test-Path $p) { $mongoPath = $p; break }
}
if (-not $mongoPath) {
    Write-Warning "MongoDB not found in standard locations. Trying PATH..."
    $command = Get-Command mongod -ErrorAction SilentlyContinue
    if ($command) { $mongoPath = $command.Source }
}

# Ensure data directory exists for MongoDB
$dataDir = Join-Path $PSScriptRoot "data\db"
if (-not (Test-Path $dataDir)) { New-Item -ItemType Directory -Path $dataDir -Force | Out-Null }

# Start MongoDB (if found)
if ($mongoPath) {
    Write-Host "Starting MongoDB..." -ForegroundColor Green
    Start-Process -FilePath $mongoPath -ArgumentList "--dbpath `"$dataDir`" --port 27017" -WindowStyle Minimized
}
else {
    Write-Error "Could not locate mongod.exe. Please install MongoDB or add it to PATH."
}

# Function to start a module (frontend or backend)
function Start-Module {
    param (
        [string]$Name,
        [string]$Path
    )
    Write-Host "Starting $Name..." -ForegroundColor Cyan

    $startCmd = "npm run dev"
    if ($Name -eq "Server") { $startCmd = "npm start" }

    # Since we prepend nodeDir to Path, we can just call 'npm' directly
    $cmd = "`$env:Path = '$nodeDir' + ';' + `$env:Path; Write-Host 'Environment Configured'; node --version; cd '$Path'; npm install; $startCmd"
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "$cmd"
}

# Launch all modules
Start-Module -Name "Server" -Path (Join-Path $PSScriptRoot "server")
Start-Module -Name "Sales Tool" -Path (Join-Path $PSScriptRoot "sales-tool")
Start-Module -Name "Admin Tool" -Path (Join-Path $PSScriptRoot "admin-tool")
Start-Module -Name "Customer Portal" -Path (Join-Path $PSScriptRoot "customer-portal")

Write-Host "All services started in separate windows." -ForegroundColor Green
