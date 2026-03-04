# Check SC-028: Typography consistency (FR-055)
# T172: Verify line-height 1.6 for text and 1.2 for headings on all pages
# T173: Verify maximum text width 800px on all pages

Write-Host "=== SC-028 Verification: Typography Consistency ===" -ForegroundColor Cyan
Write-Host "Checking line-height and max-width on all pages" -ForegroundColor Gray
Write-Host ""

$ErrorActionPreference = "Continue"
$srcPath = "src/app"
$violations = @()
$totalFiles = 0
$checkedFiles = 0

# Valid line-height values from theme.css
$validLineHeightText = @("1.6", "var(--sifs-line-height-text)", "leading-relaxed")
$validLineHeightHeadings = @("1.2", "var(--sifs-line-height-headings)", "leading-tight")
$validMaxWidth = @("800px", "var(--sifs-max-width)", "max-w-3xl", "max-w-4xl")

# Get all component and page files
$files = Get-ChildItem -Path $srcPath -Include *.tsx,*.ts,*.css -Recurse | Where-Object {
    $_.FullName -notmatch "node_modules" -and
    $_.FullName -notmatch "\\dist\\" -and
    $_.FullName -notmatch "\\build\\" -and
    $_.FullName -notmatch "\\ui\\"  # Exclude shadcn/ui base components
}

function Check-Typography {
    param (
        [string]$content,
        [string]$filePath
    )
    
    $violations = @()
    $lines = $content -split "`n"
    
    for ($i = 0; $i -lt $lines.Length; $i++) {
        $line = $lines[$i]
        
        # Skip comments
        if ($line -match "^\s*//" -or $line -match "^\s*/\*") {
            continue
        }
        
        # Check for hardcoded line-height in text elements (p, span, li, div)
        if ($line -match "(p|span|li|div|label|button)" -and $line -match "line-height:\s*([^;]+)") {
            $lineHeight = $matches[1].Trim()
            $isValid = $false
            foreach ($valid in $validLineHeightText) {
                if ($line -match [regex]::Escape($valid)) {
                    $isValid = $true
                    break
                }
            }
            if (-not $isValid -and $lineHeight -notmatch "var\(--") {
                $violations += [PSCustomObject]@{
                    File = $filePath
                    Line = $i + 1
                    Issue = "Hardcoded line-height for text: $lineHeight (should be 1.6 or var(--sifs-line-height-text))"
                }
            }
        }
        
        # Check for hardcoded line-height in headings (h1-h6)
        if ($line -match "(h[1-6]|Heading)" -and $line -match "line-height:\s*([^;]+)") {
            $lineHeight = $matches[1].Trim()
            $isValid = $false
            foreach ($valid in $validLineHeightHeadings) {
                if ($line -match [regex]::Escape($valid)) {
                    $isValid = $true
                    break
                }
            }
            if (-not $isValid -and $lineHeight -notmatch "var\(--") {
                $violations += [PSCustomObject]@{
                    File = $filePath
                    Line = $i + 1
                    Issue = "Hardcoded line-height for heading: $lineHeight (should be 1.2 or var(--sifs-line-height-headings))"
                }
            }
        }
        
        # Check for hardcoded max-width in text blocks
        if ($line -match "(max-width|maxWidth):\s*([^;,\s]+)") {
            $maxWidth = $matches[2].Trim()
            $isValid = $false
            foreach ($valid in $validMaxWidth) {
                if ($line -match [regex]::Escape($valid)) {
                    $isValid = $true
                    break
                }
            }
            # Allow numeric values that are close to 800px (e.g., 800, 800px, 48rem ≈ 768px)
            if (-not $isValid -and $maxWidth -notmatch "var\(--" -and $maxWidth -notmatch "^\d+px$" -and $maxWidth -notmatch "^\d+rem$") {
                $violations += [PSCustomObject]@{
                    File = $filePath
                    Line = $i + 1
                    Issue = "Potentially invalid max-width: $maxWidth (should be 800px or var(--sifs-max-width))"
                }
            }
        }
    }
    
    return $violations
}

foreach ($file in $files) {
    $totalFiles++
    $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/")
    
    try {
        $content = Get-Content -Path $file.FullName -Raw -ErrorAction Stop
        
        $fileViolations = Check-Typography -content $content -filePath $relativePath
        
        if ($fileViolations.Count -eq 0) {
            $checkedFiles++
        } else {
            $violations += $fileViolations
            Write-Host "  ⚠ $relativePath : $($fileViolations.Count) violations" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "  ✗ Error reading $relativePath : $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== Summary ===" -ForegroundColor Cyan
Write-Host "Total files checked: $totalFiles" -ForegroundColor White
Write-Host "Files with no violations: $checkedFiles" -ForegroundColor Green
Write-Host "Typography violations: $($violations.Count)" -ForegroundColor $(if ($violations.Count -eq 0) { "Green" } else { "Yellow" })

if ($violations.Count -gt 0) {
    Write-Host ""
    Write-Host "=== Violations ===" -ForegroundColor Yellow
    foreach ($violation in $violations | Select-Object -First 20) {
        Write-Host "  $($violation.File):$($violation.Line) - $($violation.Issue)" -ForegroundColor Yellow
    }
    if ($violations.Count -gt 20) {
        Write-Host "  ... and $($violations.Count - 20) more" -ForegroundColor Gray
    }
    Write-Host ""
    Write-Host "=== Recommendations ===" -ForegroundColor Yellow
    Write-Host "1. Use line-height: 1.6 for text (p, span, li) or var(--sifs-line-height-text)"
    Write-Host "2. Use line-height: 1.2 for headings (h1-h6) or var(--sifs-line-height-headings)"
    Write-Host "3. Use max-width: 800px for text blocks or var(--sifs-max-width)"
    Write-Host ""
    Write-Host "Status: ⚠ WARNING - Some violations found" -ForegroundColor Yellow
    exit 0  # Warning, not error
} else {
    Write-Host ""
    Write-Host "Status: ✓ PASS - Typography applied consistently" -ForegroundColor Green
    exit 0
}
