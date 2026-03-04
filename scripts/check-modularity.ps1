# Check SC-022: All files follow modularity rule (< 300 lines, 100% cases)
# T239: Verify file modularity

Write-Host "=== SC-022 Verification: File Modularity (< 300 lines) ===" -ForegroundColor Cyan
Write-Host ""

$ErrorActionPreference = "Continue"
$srcPath = "src/app"
$maxLines = 300
$violations = @()
$totalFiles = 0
$checkedFiles = 0

# Get all TypeScript and TSX files
$files = Get-ChildItem -Path $srcPath -Include *.ts,*.tsx -Recurse | Where-Object {
    # Exclude node_modules, dist, build directories
    $_.FullName -notmatch "node_modules" -and
    $_.FullName -notmatch "\\dist\\" -and
    $_.FullName -notmatch "\\build\\"
}

foreach ($file in $files) {
    $totalFiles++
    $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/")
    
    try {
        $lineCount = (Get-Content -Path $file.FullName -ErrorAction Stop | Measure-Object -Line).Lines
        
        if ($lineCount -gt $maxLines) {
            $violations += [PSCustomObject]@{
                File = $relativePath
                Lines = $lineCount
                OverLimit = $lineCount - $maxLines
            }
            Write-Host "  ✗ $relativePath : $lineCount lines (exceeds by $($lineCount - $maxLines))" -ForegroundColor Red
        } else {
            $checkedFiles++
            if ($lineCount -gt 250) {
                Write-Host "  ⚠ $relativePath : $lineCount lines (close to limit)" -ForegroundColor Yellow
            }
        }
    } catch {
        Write-Host "  ✗ Error reading $relativePath : $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== Summary ===" -ForegroundColor Cyan
Write-Host "Total files checked: $totalFiles" -ForegroundColor White
Write-Host "Files within limit: $checkedFiles" -ForegroundColor Green
Write-Host "Files exceeding limit: $($violations.Count)" -ForegroundColor $(if ($violations.Count -eq 0) { "Green" } else { "Red" })

if ($violations.Count -gt 0) {
    Write-Host ""
    Write-Host "=== Violations ===" -ForegroundColor Red
    foreach ($violation in $violations) {
        Write-Host "$($violation.File) : $($violation.Lines) lines (exceeds by $($violation.OverLimit))" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "Recommendation: Split large files into modules (.types.ts, .hooks.ts, .utils.ts, .config.ts)" -ForegroundColor Yellow
    exit 1
} else {
    Write-Host ""
    Write-Host "All files follow modularity rule (< $maxLines lines)" -ForegroundColor Green
    exit 0
}
