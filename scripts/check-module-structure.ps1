# Check SC-034: Module structure validation (FR-042.2)
# T179: Validate module structure for all components

Write-Host "=== SC-034 Verification: Module Structure ===" -ForegroundColor Cyan
Write-Host "Checking module structure for components > 200 lines" -ForegroundColor Gray
Write-Host ""

$ErrorActionPreference = "Continue"
$srcPath = "src/app/components"
$minLinesForStructure = 200
$violations = @()
$totalComponents = 0
$checkedComponents = 0

# Required module files for large components
$requiredModuleFiles = @(".types.ts", ".hooks.ts", ".utils.ts", ".config.ts")

# Get all component files
$componentFiles = Get-ChildItem -Path $srcPath -Include *.tsx,*.ts -Recurse | Where-Object {
    $_.FullName -notmatch "node_modules" -and
    $_.FullName -notmatch "\\dist\\" -and
    $_.FullName -notmatch "\\build\\" -and
    $_.FullName -notmatch "\\ui\\"  # Exclude shadcn/ui base components
}

function Get-ComponentModuleFiles {
    param (
        [string]$componentPath
    )
    
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($componentPath)
    $directory = [System.IO.Path]::GetDirectoryName($componentPath)
    $moduleFiles = @()
    
    foreach ($moduleType in $requiredModuleFiles) {
        $modulePath = Join-Path $directory "$baseName$moduleType"
        if (Test-Path $modulePath) {
            $moduleFiles += $moduleType
        }
    }
    
    return $moduleFiles
}

foreach ($file in $componentFiles) {
    $totalComponents++
    $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/")
    
    try {
        $lineCount = (Get-Content -Path $file.FullName -ErrorAction Stop | Measure-Object -Line).Lines
        
        # Only check components > 200 lines
        if ($lineCount -gt $minLinesForStructure) {
            $existingModules = Get-ComponentModuleFiles -componentPath $file.FullName
            $missingModules = $requiredModuleFiles | Where-Object { $existingModules -notcontains $_ }
            
            if ($missingModules.Count -gt 0) {
                $violations += [PSCustomObject]@{
                    Component = $relativePath
                    Lines = $lineCount
                    MissingModules = ($missingModules -join ", ")
                    ExistingModules = ($existingModules -join ", ")
                }
                Write-Host "  ⚠ $relativePath : $lineCount lines, missing: $($missingModules -join ', ')" -ForegroundColor Yellow
            } else {
                $checkedComponents++
                Write-Host "  ✓ $relativePath : $lineCount lines, all modules present" -ForegroundColor Green
            }
        } else {
            $checkedComponents++
        }
    } catch {
        Write-Host "  ✗ Error reading $relativePath : $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== Summary ===" -ForegroundColor Cyan
Write-Host "Total components checked: $totalComponents" -ForegroundColor White
Write-Host "Components with proper structure: $checkedComponents" -ForegroundColor Green
Write-Host "Components missing modules: $($violations.Count)" -ForegroundColor $(if ($violations.Count -eq 0) { "Green" } else { "Yellow" })

if ($violations.Count -gt 0) {
    Write-Host ""
    Write-Host "=== Violations ===" -ForegroundColor Yellow
    foreach ($violation in $violations) {
        Write-Host "  $($violation.Component) : $($violation.Lines) lines" -ForegroundColor Yellow
        Write-Host "    Missing: $($violation.MissingModules)" -ForegroundColor Yellow
        if ($violation.ExistingModules) {
            Write-Host "    Existing: $($violation.ExistingModules)" -ForegroundColor Gray
        }
    }
    Write-Host ""
    Write-Host "=== Recommendations ===" -ForegroundColor Yellow
    Write-Host "1. Create .types.ts for TypeScript interfaces and types"
    Write-Host "2. Create .hooks.ts for custom React hooks"
    Write-Host "3. Create .utils.ts for utility functions"
    Write-Host "4. Create .config.ts for configuration constants"
    Write-Host "5. Split large components into smaller modules"
    Write-Host ""
    Write-Host "Status: ⚠ WARNING - Some components need module structure" -ForegroundColor Yellow
    exit 0  # Warning, not error
} else {
    Write-Host ""
    Write-Host "Status: ✓ PASS - All components have proper module structure" -ForegroundColor Green
    exit 0
}
