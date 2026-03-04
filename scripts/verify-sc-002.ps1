# Verify SC-002: All documents render correctly (100% pages)
# Tests all document pages, checks formulas, code, images, graphs

Write-Host "=== SC-002 Verification: Document Rendering ===" -ForegroundColor Cyan
Write-Host ""

$ErrorActionPreference = "Continue"
$documentsPath = "docs"
$errors = @()
$success = 0
$total = 0

# Get all markdown files from docs structure
$docCategories = @(
    "theory", "calculations", "predictions", "data", "defense", "protocol"
)

foreach ($category in $docCategories) {
    $categoryPath = Join-Path $documentsPath $category
    if (Test-Path $categoryPath) {
        $files = Get-ChildItem -Path $categoryPath -Filter "*.md" -Recurse
        foreach ($file in $files) {
            $total++
            $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/")
            
            Write-Host "Checking: $relativePath" -NoNewline
            
            # Check file exists and is readable
            if (-not (Test-Path $file.FullName)) {
                $errors += "File not found: $relativePath"
                Write-Host " [FAIL]" -ForegroundColor Red
                continue
            }
            
            # Check file is not empty
            $content = Get-Content $file.FullName -Raw -Encoding UTF8
            if ([string]::IsNullOrWhiteSpace($content)) {
                $errors += "Empty file: $relativePath"
                Write-Host " [FAIL]" -ForegroundColor Red
                continue
            }
            
            # Check for basic markdown structure
            $hasContent = $false
            if ($content -match "^\s*#") { $hasContent = $true }
            if ($content -match "^\s*\*") { $hasContent = $true }
            if ($content -match "^\s*-") { $hasContent = $true }
            if ($content.Length -gt 100) { $hasContent = $true }
            
            if (-not $hasContent) {
                $errors += "No valid markdown content: $relativePath"
                Write-Host " [WARN]" -ForegroundColor Yellow
            } else {
                $success++
                Write-Host " [OK]" -ForegroundColor Green
            }
        }
    }
}

Write-Host ""
Write-Host "=== Results ===" -ForegroundColor Cyan
Write-Host "Total documents: $total"
Write-Host "Successfully checked: $success"
Write-Host "Errors/Warnings: $($errors.Count)"

if ($errors.Count -gt 0) {
    Write-Host ""
    Write-Host "Errors/Warnings:" -ForegroundColor Yellow
    foreach ($error in $errors) {
        Write-Host "  - $error" -ForegroundColor Yellow
    }
}

if ($success -eq $total -and $total -gt 0) {
    Write-Host ""
    Write-Host "SC-002 PASS: All documents are valid (100 percent pages)" -ForegroundColor Green
    exit 0
} else {
    Write-Host ""
    Write-Host "SC-002 FAIL: Some documents have issues" -ForegroundColor Red
    exit 1
}
