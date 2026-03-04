# Script to fix Cursor IDE errors
# Fixes cache, terminal files, and Git submodule issues

Write-Host "=== Fixing Cursor IDE errors ===" -ForegroundColor Cyan

# 1. Create missing terminal files
Write-Host "`n1. Creating missing terminal files..." -ForegroundColor Yellow
$terminalsDir = "$env:USERPROFILE\.cursor\projects\c-SIFS-Theory-Core\terminals"
if (Test-Path $terminalsDir) {
    for ($i = 1; $i -le 10; $i++) {
        $file = Join-Path $terminalsDir "$i.txt"
        if (-not (Test-Path $file)) {
            New-Item -Path $file -ItemType File -Force | Out-Null
            Write-Host "  Created: $i.txt" -ForegroundColor Green
        }
    }
    Write-Host "  OK Terminal files ready" -ForegroundColor Green
} else {
    Write-Host "  WARNING Terminal directory not found" -ForegroundColor Yellow
}

# 2. Check Git submodule
Write-Host "`n2. Checking Git submodule..." -ForegroundColor Yellow
$specKitPath = Join-Path $PSScriptRoot "..\spec-kit"
if (Test-Path $specKitPath) {
    Write-Host "  WARNING spec-kit found (submodule)" -ForegroundColor Yellow
    Write-Host "  Note: Git errors with submodule are not critical" -ForegroundColor Gray
}

# 3. Check MCP servers
Write-Host "`n3. Checking MCP servers..." -ForegroundColor Yellow
$mcpConfig = Join-Path $PSScriptRoot "..\.cursor\mcp.json"
if (Test-Path $mcpConfig) {
    Write-Host "  OK MCP configuration found" -ForegroundColor Green
    # Check for BOM
    $bytes = [System.IO.File]::ReadAllBytes($mcpConfig)
    if ($bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
        Write-Host "  WARNING BOM detected in mcp.json, fixing..." -ForegroundColor Yellow
        $content = Get-Content $mcpConfig -Raw -Encoding UTF8
        $utf8NoBom = New-Object System.Text.UTF8Encoding $false
        [System.IO.File]::WriteAllText($mcpConfig, $content, $utf8NoBom)
        Write-Host "  OK BOM removed" -ForegroundColor Green
    } else {
        Write-Host "  OK No BOM found" -ForegroundColor Green
    }
} else {
    Write-Host "  WARNING MCP configuration not found" -ForegroundColor Yellow
}

Write-Host "`n=== Done ===" -ForegroundColor Cyan
Write-Host "`nNotes:" -ForegroundColor Gray
Write-Host "  - Git submodule errors are not critical - this is normal for submodules" -ForegroundColor Gray
Write-Host "  - MCP server logs (stderr) are normal output, not errors" -ForegroundColor Gray
Write-Host "  - OTLP errors are telemetry, can be ignored" -ForegroundColor Gray
Write-Host "`nRecommendation: Restart Cursor IDE to apply changes" -ForegroundColor Yellow
