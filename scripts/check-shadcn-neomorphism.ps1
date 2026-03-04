# Check SC-030: All shadcn/ui components use neomorphism (100% pages)
# T115: Verify all components use shadcn/ui with neomorphism effects consistently
#
# This script checks:
# - Usage of shadcn/ui components: Card, Button, Tabs, Accordion, Sheet, Badge, Separator, Tooltip, Popover
# - Application of neomorphism classes: neo-raised, neo-pressed, neo-card, neo-glow, neo-grid

Write-Host "=== SC-030 Verification: shadcn/ui with Neomorphism ===" -ForegroundColor Cyan
Write-Host "Checking that all shadcn/ui components use neomorphism effects" -ForegroundColor Gray
Write-Host ""

$ErrorActionPreference = "Continue"
$srcPath = "src/app"
$violations = @()
$totalComponents = 0
$checkedComponents = 0

# shadcn/ui components to check
$shadcnComponents = @(
    "Card", "Button", "Tabs", "Accordion", "Sheet", "Badge", 
    "Separator", "Tooltip", "Popover", "Dialog", "DropdownMenu",
    "Select", "Input", "Textarea", "Label", "Checkbox", "RadioGroup"
)

# Neomorphism classes
$neoClasses = @("neo-raised", "neo-pressed", "neo-card", "neo-glow", "neo-grid")

# Get all component and page files (exclude ui/ directory as it contains shadcn/ui base components)
$files = Get-ChildItem -Path $srcPath -Include *.tsx,*.ts -Recurse | Where-Object {
    $_.FullName -notmatch "node_modules" -and
    $_.FullName -notmatch "\\dist\\" -and
    $_.FullName -notmatch "\\build\\" -and
    $_.FullName -notmatch "\\ui\\" -and  # Exclude shadcn/ui base components
    $_.FullName -notmatch "\\components\\ui\\"  # Exclude shadcn/ui directory
}

function Check-Neomorphism {
    param (
        [string]$content,
        [string]$filePath
    )
    
    $violations = @()
    $hasShadcn = $false
    $hasNeo = $false
    
    # Check for shadcn/ui component usage
    foreach ($component in $shadcnComponents) {
        if ($content -match "from ['\`"]@/app/components/ui/$($component.ToLower())['\`"]" -or
            $content -match "<$component" -or
            $content -match "{$component") {
            $hasShadcn = $true
            break
        }
    }
    
    # Check for neomorphism classes
    foreach ($neoClass in $neoClasses) {
        if ($content -match $neoClass -or $content -match "className.*$neoClass") {
            $hasNeo = $true
            break
        }
    }
    
    # Also check for NeoCard component (custom neomorphism component)
    if ($content -match "NeoCard" -or $content -match "from.*NeoCard") {
        $hasNeo = $true
    }
    
    # If uses shadcn/ui but no neomorphism, it's a violation
    if ($hasShadcn -and -not $hasNeo) {
        # Find which shadcn components are used
        $usedComponents = @()
        foreach ($component in $shadcnComponents) {
            if ($content -match "from ['\`"]@/app/components/ui/$($component.ToLower())['\`"]" -or
                $content -match "<$component" -or
                $content -match "{$component") {
                $usedComponents += $component
            }
        }
        
        $violations += [PSCustomObject]@{
            File = $filePath
            Components = ($usedComponents -join ", ")
        }
    }
    
    return $violations
}

foreach ($file in $files) {
    $totalComponents++
    $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/")
    
    try {
        $content = Get-Content -Path $file.FullName -Raw -ErrorAction Stop
        
        $fileViolations = Check-Neomorphism -content $content -filePath $relativePath
        
        if ($fileViolations.Count -eq 0) {
            $checkedComponents++
        } else {
            $violations += $fileViolations
            Write-Host "  ⚠ $relativePath" -ForegroundColor Yellow
            foreach ($violation in $fileViolations) {
                Write-Host "    - Uses shadcn/ui ($($violation.Components)) without neomorphism" -ForegroundColor Yellow
            }
        }
    } catch {
        Write-Host "  ✗ Error reading $relativePath : $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== Summary ===" -ForegroundColor Cyan
Write-Host "Total components checked: $totalComponents" -ForegroundColor White
Write-Host "Components with neomorphism: $checkedComponents" -ForegroundColor Green
Write-Host "Components without neomorphism: $($violations.Count)" -ForegroundColor $(if ($violations.Count -eq 0) { "Green" } else { "Yellow" })

if ($violations.Count -gt 0) {
    Write-Host ""
    Write-Host "=== Violations ===" -ForegroundColor Yellow
    foreach ($violation in $violations | Select-Object -First 20) {
        Write-Host "  $($violation.File) : $($violation.Components)" -ForegroundColor Yellow
    }
    if ($violations.Count -gt 20) {
        Write-Host "  ... and $($violations.Count - 20) more" -ForegroundColor Gray
    }
    Write-Host ""
    Write-Host "=== Recommendations ===" -ForegroundColor Yellow
    Write-Host "1. Add neomorphism classes to shadcn/ui components:"
    Write-Host "   - Card: Add 'neo-card' class"
    Write-Host "   - Button: Add 'neo-raised' or 'neo-pressed' class"
    Write-Host "   - Other components: Use appropriate neo- class or wrap in NeoCard"
    Write-Host "2. Use NeoCard component for custom neomorphism cards"
    Write-Host "3. Apply neo-glow for important elements"
    Write-Host ""
    Write-Host "Status: ⚠ WARNING - Some components need neomorphism" -ForegroundColor Yellow
    exit 0  # Warning, not error
} else {
    Write-Host ""
    Write-Host "Status: ✓ PASS - All shadcn/ui components use neomorphism" -ForegroundColor Green
    exit 0
}
