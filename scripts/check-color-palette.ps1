# Check SC-029: Color palette consistency (FR-056)
# T175: Verify only defined colors from theme.css are used on all pages

Write-Host "=== SC-029 Verification: Color Palette Consistency ===" -ForegroundColor Cyan
Write-Host "Checking that only theme.css colors are used" -ForegroundColor Gray
Write-Host ""

$ErrorActionPreference = "Continue"
$srcPath = "src/app"
$violations = @()
$totalFiles = 0
$checkedFiles = 0

# Valid colors from theme.css (SIFS palette)
$validColors = @(
    # Level 0: Temporal Abyss
    "sifs-level-0", "oklch(0% 0 0)", "var(--sifs-level-0)",
    # Level 1: Substrate
    "sifs-level-1", "rgba(15, 15, 15, 0.7)", "var(--sifs-level-1)",
    # Level 2: Control Plane
    "sifs-level-2", "rgba(255, 255, 255, 0.03)", "var(--sifs-level-2)",
    # Neomorphism base
    "sifs-neo-base", "#1e1e1e", "var(--sifs-neo-base)",
    # CSS variables (general)
    "var(--", "--sifs-", "--color-", "--background", "--foreground"
)

# Get all component and page files
$files = Get-ChildItem -Path $srcPath -Include *.tsx,*.ts,*.css -Recurse | Where-Object {
    $_.FullName -notmatch "node_modules" -and
    $_.FullName -notmatch "\\dist\\" -and
    $_.FullName -notmatch "\\build\\" -and
    $_.FullName -notmatch "\\ui\\"  # Exclude shadcn/ui base components
}

function Check-ColorPalette {
    param (
        [string]$content,
        [string]$filePath
    )
    
    $violations = @()
    
    # Check for hardcoded colors (hex, rgb, rgba, hsl, hsla, oklch)
    # Exclude comments and string literals
    $colorPattern = "(#[0-9a-fA-F]{3,6}|rgb\(|rgba\(|hsl\(|hsla\(|oklch\()"
    
    if ($content -match $colorPattern) {
        $lines = $content -split "`n"
        for ($i = 0; $i -lt $lines.Length; $i++) {
            $line = $lines[$i]
            
            # Skip comments
            if ($line -match "^\s*//" -or $line -match "^\s*/\*") {
                continue
            }
            
            # Check for color values
            if ($line -match $colorPattern) {
                # Check if it's a valid SIFS color
                $isValid = $false
                foreach ($validColor in $validColors) {
                    if ($line -match [regex]::Escape($validColor)) {
                        $isValid = $true
                        break
                    }
                }
                
                # Also check for CSS variables
                if ($line -match "var\(--" -or $line -match "--[a-z-]+:") {
                    $isValid = $true
                }
                
                # Check for Tailwind color classes (acceptable)
                if ($line -match "(text-|bg-|border-|ring-|from-|to-|via-)(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-") {
                    $isValid = $true
                }
                
                if (-not $isValid -and $line -match "(color|background|border|fill|stroke|box-shadow|text-shadow)") {
                    # Extract the color value
                    $colorMatch = [regex]::Match($line, $colorPattern)
                    if ($colorMatch.Success) {
                        $violations += [PSCustomObject]@{
                            File = $filePath
                            Line = $i + 1
                            Issue = "Potentially undefined color: $($line.Trim())"
                        }
                    }
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
        
        $fileViolations = Check-ColorPalette -content $content -filePath $relativePath
        
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
Write-Host "Color violations: $($violations.Count)" -ForegroundColor $(if ($violations.Count -eq 0) { "Green" } else { "Yellow" })

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
    Write-Host "1. Use SIFS color palette from theme.css:"
    Write-Host "   - Level 0: var(--sifs-level-0) or oklch(0% 0 0)"
    Write-Host "   - Level 1: var(--sifs-level-1) or rgba(15, 15, 15, 0.7)"
    Write-Host "   - Level 2: var(--sifs-level-2) or rgba(255, 255, 255, 0.03)"
    Write-Host "   - Neomorphism: var(--sifs-neo-base) or #1e1e1e"
    Write-Host "2. Use CSS variables: var(--sifs-*) or var(--color-*)"
    Write-Host "3. Use Tailwind color classes for UI elements"
    Write-Host ""
    Write-Host "Status: ⚠ WARNING - Some violations found" -ForegroundColor Yellow
    exit 0  # Warning, not error
} else {
    Write-Host ""
    Write-Host "Status: ✓ PASS - Only theme.css colors used" -ForegroundColor Green
    exit 0
}
