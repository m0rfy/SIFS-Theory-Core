# Check SC-027: All pages follow "one page - one goal" rule (FR-053)
# T116: Verify all pages follow "one page - one goal" rule (max 2-3 types of visual effects per page)
#
# This script analyzes pages to count visual effect types:
# - hover effects (onMouseEnter, hover:, :hover)
# - click effects (onClick, click handlers)
# - scroll effects (onScroll, scroll-triggered, IntersectionObserver)
# - parallax effects (parallax, transform: translateZ)
# - animations (animate:, motion, transition, keyframes)

Write-Host "=== SC-027 Verification: One Page - One Goal Rule ===" -ForegroundColor Cyan
Write-Host "Checking that each page has maximum 2-3 types of visual effects" -ForegroundColor Gray
Write-Host ""

$ErrorActionPreference = "Continue"
$pagesPath = "src/app/pages"
$maxEffectTypes = 3
$violations = @()
$totalPages = 0
$checkedPages = 0

# Get all page files
$pageFiles = Get-ChildItem -Path $pagesPath -Include *.tsx,*.ts -Recurse | Where-Object {
    $_.FullName -notmatch "node_modules" -and
    $_.FullName -notmatch "\\dist\\" -and
    $_.FullName -notmatch "\\build\\"
}

function Count-EffectTypes {
    param (
        [string]$filePath
    )
    
    $content = Get-Content -Path $filePath -Raw -ErrorAction SilentlyContinue
    if (-not $content) {
        return @{}
    }
    
    $effects = @{
        hover = $false
        click = $false
        scroll = $false
        parallax = $false
        animation = $false
    }
    
    # Check for hover effects
    if ($content -match "(onMouseEnter|hover:|:hover|onHover)" -or 
        $content -match "hover\s*[:=]" -or
        $content -match "HoverCard|hover-card") {
        $effects.hover = $true
    }
    
    # Check for click effects
    if ($content -match "(onClick|onMouseDown|onMouseUp|click\s*[:=])" -or
        $content -match "Button|button" -and $content -match "onClick") {
        $effects.click = $true
    }
    
    # Check for scroll effects
    if ($content -match "(onScroll|scroll-triggered|IntersectionObserver|ScrollReveal|useScroll|scroll)" -or
        $content -match "scroll\s*[:=]" -or
        $content -match "parallax") {
        $effects.scroll = $true
    }
    
    # Check for parallax effects
    if ($content -match "(parallax|Parallax|translateZ|transform.*translateZ)" -or
        $content -match "ParallaxHero|parallax-hero") {
        $effects.parallax = $true
    }
    
    # Check for animations
    if ($content -match "(animate:|motion|Motion|transition|keyframes|@keyframes|animation:)" -or
        $content -match "framer-motion|motion\." -or
        $content -match "AnimatePresence|useAnimation") {
        $effects.animation = $true
    }
    
    return $effects
}

foreach ($file in $pageFiles) {
    $totalPages++
    $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/")
    
    try {
        $effects = Count-EffectTypes -filePath $file.FullName
        $effectTypes = ($effects.Values | Where-Object { $_ -eq $true }).Count
        
        if ($effectTypes -gt $maxEffectTypes) {
            $activeEffects = @()
            if ($effects.hover) { $activeEffects += "hover" }
            if ($effects.click) { $activeEffects += "click" }
            if ($effects.scroll) { $activeEffects += "scroll" }
            if ($effects.parallax) { $activeEffects += "parallax" }
            if ($effects.animation) { $activeEffects += "animation" }
            
            $violations += [PSCustomObject]@{
                Page = $relativePath
                EffectTypes = $effectTypes
                Effects = $activeEffects -join ", "
            }
            Write-Host "  ✗ $relativePath : $effectTypes effect types ($($activeEffects -join ', '))" -ForegroundColor Red
        } else {
            $checkedPages++
            if ($effectTypes -eq $maxEffectTypes) {
                $activeEffects = @()
                if ($effects.hover) { $activeEffects += "hover" }
                if ($effects.click) { $activeEffects += "click" }
                if ($effects.scroll) { $activeEffects += "scroll" }
                if ($effects.parallax) { $activeEffects += "parallax" }
                if ($effects.animation) { $activeEffects += "animation" }
                Write-Host "  ⚠ $relativePath : $effectTypes effect types (at limit: $($activeEffects -join ', '))" -ForegroundColor Yellow
            } else {
                Write-Host "  ✓ $relativePath : $effectTypes effect types" -ForegroundColor Green
            }
        }
    } catch {
        Write-Host "  ✗ Error analyzing $relativePath : $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== Summary ===" -ForegroundColor Cyan
Write-Host "Total pages checked: $totalPages" -ForegroundColor White
Write-Host "Pages within limit (≤$maxEffectTypes effects): $checkedPages" -ForegroundColor Green
Write-Host "Pages exceeding limit (>$maxEffectTypes effects): $($violations.Count)" -ForegroundColor $(if ($violations.Count -eq 0) { "Green" } else { "Red" })

if ($violations.Count -gt 0) {
    Write-Host ""
    Write-Host "=== Violations ===" -ForegroundColor Red
    foreach ($violation in $violations) {
        Write-Host "  $($violation.Page) : $($violation.EffectTypes) types ($($violation.Effects))" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "=== Recommendations ===" -ForegroundColor Yellow
    Write-Host "1. Review pages with >$maxEffectTypes effect types"
    Write-Host "2. Consider removing or consolidating visual effects"
    Write-Host "3. Move some effects to child components if needed"
    Write-Host "4. Ensure each page has a single, clear goal"
    Write-Host ""
    Write-Host "Status: ✗ FAIL - Some pages exceed the limit" -ForegroundColor Red
    exit 1
} else {
    Write-Host ""
    Write-Host "Status: ✓ PASS - All pages follow the rule" -ForegroundColor Green
    exit 0
}
