# Check Responsive Design - T066
# Verification script for responsive design on all screen sizes

$ErrorActionPreference = "Stop"

Write-Host "=== Responsive Design Check ===" -ForegroundColor Cyan
Write-Host ""

# Screen sizes for testing
$screenSizes = @(
    @{ width = 320; name = "Mobile (320px)" },
    @{ width = 640; name = "Small Mobile (640px)" },
    @{ width = 768; name = "Tablet (768px)" },
    @{ width = 1024; name = "Desktop (1024px)" },
    @{ width = 1280; name = "Large Desktop (1280px)" },
    @{ width = 1920; name = "XL Desktop (1920px)" }
)

# Pages to check
$pages = @(
    "/",
    "/docs/theory/overview",
    "/docs/calculations/coupling-constants",
    "/simulations",
    "/simulations/collapse",
    "/simulations/temporal",
    "/simulations/calculations"
)

Write-Host "Screen sizes:" -ForegroundColor Yellow
foreach ($size in $screenSizes) {
    Write-Host "  - $($size.name): $($size.width)px" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Pages to check:" -ForegroundColor Yellow
foreach ($page in $pages) {
    Write-Host "  - $page" -ForegroundColor Gray
}

Write-Host ""
Write-Host "=== Testing Instructions ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Open the app in browser (npm run dev)" -ForegroundColor White
Write-Host "2. Open DevTools (F12)" -ForegroundColor White
Write-Host "3. Enable Responsive Design Mode (Ctrl+Shift+M)" -ForegroundColor White
Write-Host "4. For each screen size, verify:" -ForegroundColor White
Write-Host "   - Navigation works correctly" -ForegroundColor Gray
Write-Host "   - Text is readable" -ForegroundColor Gray
Write-Host "   - Graphs scale properly (100% width on mobile)" -ForegroundColor Gray
Write-Host "   - Tables scroll horizontally (on mobile)" -ForegroundColor Gray
Write-Host "   - Buttons are at least 44x44px (touch-friendly)" -ForegroundColor Gray
Write-Host "   - Spacing is reduced on mobile (spacing-md instead of spacing-xl)" -ForegroundColor Gray
Write-Host "   - Typography is adaptive (h1: 32px mobile, 48px desktop)" -ForegroundColor Gray
Write-Host ""

Write-Host "=== Success Criteria ===" -ForegroundColor Cyan
Write-Host "✓ 100% pages work correctly on all screen sizes" -ForegroundColor Green
Write-Host "✓ All elements are functional (navigation, buttons, links)" -ForegroundColor Green
Write-Host "✓ Text is readable on all sizes" -ForegroundColor Green
Write-Host "✓ Graphs and tables are responsive" -ForegroundColor Green
Write-Host "✓ Touch-friendly interface on mobile (44x44px minimum)" -ForegroundColor Green
Write-Host ""

# Create checklist file
$checklistPath = "responsive-design-checklist.md"
$sb = [System.Text.StringBuilder]::new()

[void]$sb.AppendLine("# Responsive Design Checklist - T066")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("## Screen Sizes")
foreach ($size in $screenSizes) {
    [void]$sb.AppendLine("- $($size.name): $($size.width)px")
}

[void]$sb.AppendLine("")
[void]$sb.AppendLine("## Pages")
foreach ($page in $pages) {
    [void]$sb.AppendLine("- $page")
}

[void]$sb.AppendLine("")
[void]$sb.AppendLine("## Checklist")
[void]$sb.AppendLine("")
[void]$sb.AppendLine('| Page | Size | Navigation | Text | Graphs | Tables | Buttons | Spacing | Typography |')
[void]$sb.AppendLine('|------|------|------------|------|--------|--------|---------|---------|------------|')

foreach ($page in $pages) {
    foreach ($size in $screenSizes) {
        $checkbox = '[ ]'
        $line = '| ' + $page + ' | ' + $size.name + ' | ' + $checkbox + ' | ' + $checkbox + ' | ' + $checkbox + ' | ' + $checkbox + ' | ' + $checkbox + ' | ' + $checkbox + ' | ' + $checkbox + ' |'
        [void]$sb.AppendLine($line)
    }
}

[void]$sb.AppendLine("")
[void]$sb.AppendLine("## Success Criteria")
$checkbox = '[ ]'
[void]$sb.AppendLine('- ' + $checkbox + ' 100% pages work correctly on all screen sizes')
[void]$sb.AppendLine('- ' + $checkbox + ' All elements are functional (navigation, buttons, links)')
[void]$sb.AppendLine('- ' + $checkbox + ' Text is readable on all sizes')
[void]$sb.AppendLine('- ' + $checkbox + ' Graphs and tables are responsive')
[void]$sb.AppendLine('- ' + $checkbox + ' Touch-friendly interface on mobile (44x44px minimum)')
[void]$sb.AppendLine("")
[void]$sb.AppendLine("## Issues")
[void]$sb.AppendLine("(Fill after testing)")
[void]$sb.AppendLine("")

[System.IO.File]::WriteAllText($checklistPath, $sb.ToString(), [System.Text.Encoding]::UTF8)
$msg = "Checklist saved to: " + $checklistPath
Write-Host $msg -ForegroundColor Green
Write-Host ""
