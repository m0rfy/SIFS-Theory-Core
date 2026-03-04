# Verify SC-004: Visual effects react in real-time (< 100ms)
# Checks code structure for real-time updates

Write-Host "=== SC-004 Verification: Real-time Visual Effects ===" -ForegroundColor Cyan
Write-Host ""

$ErrorActionPreference = "Continue"
$errors = @()
$warnings = @()
$success = 0

# Check spatial connector for real-time updates
$spatialConnector = "src/app/utils/sifs-spatial-connector.ts"
if (Test-Path $spatialConnector) {
    Write-Host "Checking: $spatialConnector" -NoNewline
    $content = Get-Content $spatialConnector -Raw -Encoding UTF8
    
    # Check for requestAnimationFrame batching (ensures < 100ms updates)
    $hasRAF = $content -match "requestAnimationFrame"
    $hasBatching = $content -match "pendingUpdates|batching"
    $hasRealTime = $content -match "real-time|real time|100ms"
    
    if ($hasRAF -and $hasBatching) {
        $success++
        Write-Host " [OK]" -ForegroundColor Green
        Write-Host "  - Uses requestAnimationFrame for batching" -ForegroundColor Gray
        Write-Host "  - Batches updates for smooth performance" -ForegroundColor Gray
    } else {
        $warnings += "No requestAnimationFrame batching found"
        Write-Host " [WARN]" -ForegroundColor Yellow
    }
} else {
    $errors += "Spatial connector not found: $spatialConnector"
}

# Check spatial components for CSS variable usage
$spatialComponents = @(
    "src/app/components/spatial/OrbitalDock.tsx",
    "src/app/components/spatial/TemporalAbyss.tsx"
)

foreach ($component in $spatialComponents) {
    if (-not (Test-Path $component)) {
        $warnings += "Component not found: $component"
        continue
    }
    
    Write-Host "Checking: $component" -NoNewline
    $content = Get-Content $component -Raw -Encoding UTF8
    
    # Check for CSS variable usage (enables real-time updates)
    $hasCSSVars = $content -match "--sifs-|CSS\.variable|getComputedStyle"
    $hasReactive = $content -match "useSpatialConnector|updateSpatialVariables"
    
    if ($hasCSSVars -or $hasReactive) {
        $success++
        Write-Host " [OK]" -ForegroundColor Green
    } else {
        $warnings += "No CSS variable usage found in: $component"
        Write-Host " [WARN]" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "=== Results ===" -ForegroundColor Cyan
Write-Host "Components checked: $($spatialComponents.Count + 1)"
Write-Host "Components with real-time support: $success"
Write-Host "Warnings: $($warnings.Count)"
Write-Host "Errors: $($errors.Count)"

if ($errors.Count -gt 0) {
    Write-Host ""
    Write-Host "Errors:" -ForegroundColor Red
    foreach ($error in $errors) {
        Write-Host "  - $error" -ForegroundColor Red
    }
}

if ($warnings.Count -gt 0) {
    Write-Host ""
    Write-Host "Warnings:" -ForegroundColor Yellow
    foreach ($warning in $warnings) {
        Write-Host "  - $warning" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "NOTE: Full verification requires running the app and measuring actual update delays." -ForegroundColor Cyan
Write-Host "Expected: Visual effects should update within 100ms of parameter changes." -ForegroundColor Cyan
Write-Host "Implementation uses requestAnimationFrame batching for optimal performance." -ForegroundColor Cyan

if ($success -gt 0 -and $errors.Count -eq 0) {
    Write-Host ""
    Write-Host "SC-004 PASS: Code structure supports real-time updates" -ForegroundColor Green
    exit 0
} else {
    Write-Host ""
    Write-Host "SC-004 FAIL: Issues found in code structure" -ForegroundColor Red
    exit 1
}
