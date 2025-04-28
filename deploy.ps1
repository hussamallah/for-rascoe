# PowerShell deployment script
Write-Host "Starting deployment process..." -ForegroundColor Green

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

# Run type checking
Write-Host "Running type checking..." -ForegroundColor Yellow
npm run type-check

# Build the project
Write-Host "Building the project..." -ForegroundColor Yellow
npm run build

# Verify the build output
if (Test-Path -Path "out") {
    Write-Host "Build successful! Static files generated in 'out' directory" -ForegroundColor Green
    Write-Host "Contents of out directory:" -ForegroundColor Yellow
    Get-ChildItem -Path "out" | Format-Table Name, Length, LastWriteTime
} else {
    Write-Host "Build failed! 'out' directory not found" -ForegroundColor Red
    exit 1
}

Write-Host "Deployment script completed successfully!" -ForegroundColor Green 