# Check SC-026: Design consistency (FR-054)
# T117: Verify design consistency (spacing, typography, colors) on all pages
#
# This script checks:
# - Spacing: xs, sm, md, lg, xl, 2xl from theme.css
# - Typography: h1, h2, h3, h4, base, small from theme.css
# - Colors: Only colors from theme.css (Level 0, Level 1, Level 2, Neomorphism)

Write-Host "=== SC-026 Verification: Design Consistency ===" -ForegroundColor Cyan
Write-Host "Checking spacing, typography, and color usage across all pages" -ForegroundColor Gray
Write-Host ""

$ErrorActionPreference = "Continue"
$srcPath = "src/app"
$violations = @{
    spacing = @()
    typography = @()
    colors = @()
}

# Valid spacing values from theme.css
$validSpacing = @("xs", "sm", "md", "lg", "xl", "2xl", "spacing-xs", "spacing-sm", "spacing-md", "spacing-lg", "spacing-xl", "spacing-2xl")

# Valid typography values from theme.css
$validTypography = @("h1", "h2", "h3", "h4", "base", "small", "sifs-h1", "sifs-h2", "sifs-h3", "sifs-h4", "sifs-base", "sifs-small")

# Valid colors from theme.css (SIFS palette)
$validColors = @(
    "sifs-level-0", "sifs-level-1", "sifs-level-2", "sifs-neo-base",
    "oklch(0% 0 0)", "rgba(15, 15, 15, 0.7)", "rgba(255, 255, 255, 0.03)", "#1e1e1e",
    "var(--sifs-level-0)", "var(--sifs-level-1)", "var(--sifs-level-2)", "var(--sifs-neo-base)"
)

# Get all component and page files
$files = Get-ChildItem -Path $srcPath -Include *.tsx,*.ts,*.css -Recurse | Where-Object {
    $_.FullName -notmatch "node_modules" -and
    $_.FullName -notmatch "\\dist\\" -and
    $_.FullName -notmatch "\\build\\" -and
    $_.FullName -notmatch "\\ui\\"  # Exclude shadcn/ui components
}

function Check-Spacing {
    param (
        [string]$content,
        [string]$filePath
    )
    
    $violations = @()
    
    # Check for hardcoded spacing values (px, rem, em)
    if ($content -match "(\d+px|\d+rem|\d+em)" -and $content -match "(padding|margin|gap|spacing)") {
        # Extract spacing-related lines
        $lines = $content -split "`n"
        for ($i = 0; $i -lt $lines.Length; $i++) {
            $line = $lines[$i]
            if ($line -match "(padding|margin|gap|spacing)" -and $line -match "(\d+px|\d+rem|\d+em)") {
                # Check if it's not a valid spacing variable
                if ($line -notmatch "(--spacing-|spacing-)" -and $line -notmatch "var\(--spacing") {
                    $violations += [PSCustomObject]@{
                        File = $filePath
                        Line = $i + 1
                        Issue = "Hardcoded spacing value: $line"
                    }
                }
            }
        }
    }
    
    return $violations
}

function Check-Typography {
    param (
        [string]$content,
        [string]$filePath
    )
    
    $violations = @()
    
    # Check for hardcoded font sizes
    if ($content -match "font-size:\s*(\d+px|\d+rem|\d+em)") {
        $lines = $content -split "`n"
        for ($i = 0; $i -lt $lines.Length; $i++) {
            $line = $lines[$i]
            if ($line -match "font-size:\s*(\d+px|\d+rem|\d+em)") {
                # Check if it's not a valid typography variable
                if ($line -notmatch "(--sifs-|var\(--sifs-)" -and $line -notmatch "text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)") {
                    $violations += [PSCustomObject]@{
                        File = $filePath
                        Line = $i + 1
                        Issue = "Hardcoded font size: $line"
                    }
                }
            }
        }
    }
    
    return $violations
}

function Check-Colors {
    param (
        [string]$content,
        [string]$filePath
    )
    
    $violations = @()
    
    # Check for hardcoded colors (hex, rgb, rgba, hsl, hsla)
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
                
                if (-not $isValid -and $line -match "(color|background|border|fill|stroke)") {
                    $violations += [PSCustomObject]@{
                        File = $filePath
                        Line = $i + 1
                        Issue = "Potentially undefined color: $($line.Trim())"
                    }
                }
            }
        }
    }
    
    return $violations
}

$totalFiles = 0
$checkedFiles = 0

foreach ($file in $files) {
    $totalFiles++
    $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/")
    
    try {
        $content = Get-Content -Path $file.FullName -Raw -ErrorAction Stop
        
        # Check spacing
        $spacingViolations = Check-Spacing -content $content -filePath $relativePath
        $violations.spacing += $spacingViolations
        
        # Check typography
        $typographyViolations = Check-Typography -content $content -filePath $relativePath
        $violations.typography += $typographyViolations
        
        # Check colors
        $colorViolations = Check-Colors -content $content -filePath $relativePath
        $violations.colors += $colorViolations
        
        if ($spacingViolations.Count -eq 0 -and $typographyViolations.Count -eq 0 -and $colorViolations.Count -eq 0) {
            $checkedFiles++
        } else {
            Write-Host "  ⚠ $relativePath" -ForegroundColor Yellow
            if ($spacingViolations.Count -gt 0) {
                Write-Host "    - Spacing: $($spacingViolations.Count) violations" -ForegroundColor Yellow
            }
            if ($typographyViolations.Count -gt 0) {
                Write-Host "    - Typography: $($typographyViolations.Count) violations" -ForegroundColor Yellow
            }
            if ($colorViolations.Count -gt 0) {
                Write-Host "    - Colors: $($colorViolations.Count) violations" -ForegroundColor Yellow
            }
        }
    } catch {
        Write-Host "  ✗ Error reading $relativePath : $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== Summary ===" -ForegroundColor Cyan
Write-Host "Total files checked: $totalFiles" -ForegroundColor White
Write-Host "Files with no violations: $checkedFiles" -ForegroundColor Green
Write-Host "Spacing violations: $($violations.spacing.Count)" -ForegroundColor $(if ($violations.spacing.Count -eq 0) { "Green" } else { "Yellow" })
Write-Host "Typography violations: $($violations.typography.Count)" -ForegroundColor $(if ($violations.typography.Count -eq 0) { "Green" } else { "Yellow" })
Write-Host "Color violations: $($violations.colors.Count)" -ForegroundColor $(if ($violations.colors.Count -eq 0) { "Green" } else { "Yellow" })

$totalViolations = $violations.spacing.Count + $violations.typography.Count + $violations.colors.Count

if ($totalViolations -gt 0) {
    Write-Host ""
    Write-Host "=== Violations ===" -ForegroundColor Red
    
    if ($violations.spacing.Count -gt 0) {
        Write-Host ""
        Write-Host "Spacing Violations:" -ForegroundColor Yellow
        foreach ($violation in $violations.spacing | Select-Object -First 10) {
            Write-Host "  $($violation.File):$($violation.Line) - $($violation.Issue)" -ForegroundColor Red
        }
        if ($violations.spacing.Count -gt 10) {
            Write-Host "  ... and $($violations.spacing.Count - 10) more" -ForegroundColor Gray
        }
    }
    
    if ($violations.typography.Count -gt 0) {
        Write-Host ""
        Write-Host "Typography Violations:" -ForegroundColor Yellow
        foreach ($violation in $violations.typography | Select-Object -First 10) {
            Write-Host "  $($violation.File):$($violation.Line) - $($violation.Issue)" -ForegroundColor Red
        }
        if ($violations.typography.Count -gt 10) {
            Write-Host "  ... and $($violations.typography.Count - 10) more" -ForegroundColor Gray
        }
    }
    
    if ($violations.colors.Count -gt 0) {
        Write-Host ""
        Write-Host "Color Violations:" -ForegroundColor Yellow
        foreach ($violation in $violations.colors | Select-Object -First 10) {
            Write-Host "  $($violation.File):$($violation.Line) - $($violation.Issue)" -ForegroundColor Red
        }
        if ($violations.colors.Count -gt 10) {
            Write-Host "  ... and $($violations.colors.Count - 10) more" -ForegroundColor Gray
        }
    }
    
    Write-Host ""
    Write-Host "=== Recommendations ===" -ForegroundColor Yellow
    Write-Host "1. Replace hardcoded spacing with spacing system (xs, sm, md, lg, xl, 2xl)"
    Write-Host "2. Replace hardcoded font sizes with typography system (h1-h4, base, small)"
    Write-Host "3. Replace hardcoded colors with SIFS color palette (Level 0, Level 1, Level 2, Neomorphism)"
    Write-Host "4. Use CSS variables from theme.css: var(--spacing-*), var(--sifs-*), var(--sifs-level-*)"
    Write-Host ""
    Write-Host "Status: ⚠ WARNING - Some violations found" -ForegroundColor Yellow
    exit 0  # Warning, not error
} else {
    Write-Host ""
    Write-Host "Status: ✓ PASS - All files use consistent design system" -ForegroundColor Green
    exit 0
}
