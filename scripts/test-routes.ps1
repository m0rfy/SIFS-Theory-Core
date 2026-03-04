# Test SC-032: All routes work correctly (FR-059)
# T180: Test all routes

Write-Host "=== SC-032 Verification: Routes Testing ===" -ForegroundColor Cyan
Write-Host "Checking that all routes are defined in router.tsx" -ForegroundColor Gray
Write-Host ""

$ErrorActionPreference = "Continue"
$routerPath = "src/app/router.tsx"
$requiredRoutes = @(
    "/",
    "/docs/theory",
    "/docs/calculations",
    "/docs/predictions",
    "/docs/data",
    "/docs/defense",
    "/docs/protocol",
    "/simulations",
    "/simulations/collapse",
    "/simulations/temporal",
    "/simulations/calculations",
    "/simulations/visualizations",
    "/presentation",
    "/world-change"
)

$missingRoutes = @()
$foundRoutes = @()

try {
    $routerContent = Get-Content -Path $routerPath -Raw -ErrorAction Stop
    
    foreach ($route in $requiredRoutes) {
        # Check if route exists in router.tsx
        # Routes can be defined as: path: '/', path: 'docs', path: 'simulations', etc.
        $routePattern = $route -replace "^/", ""
        $routePattern = $routePattern -replace "/", ".*"
        
        if ($routerContent -match "path:\s*['\`"]$routePattern['\`"]" -or 
            $routerContent -match "path:\s*['\`"]/$routePattern['\`"]" -or
            ($route -eq "/" -and $routerContent -match "index:\s*true")) {
            $foundRoutes += $route
            Write-Host "  ✓ $route : Found" -ForegroundColor Green
        } else {
            $missingRoutes += $route
            Write-Host "  ✗ $route : Not found" -ForegroundColor Red
        }
    }
    
    Write-Host ""
    Write-Host "=== Summary ===" -ForegroundColor Cyan
    Write-Host "Total routes required: $($requiredRoutes.Count)" -ForegroundColor White
    Write-Host "Routes found: $($foundRoutes.Count)" -ForegroundColor Green
    Write-Host "Routes missing: $($missingRoutes.Count)" -ForegroundColor $(if ($missingRoutes.Count -eq 0) { "Green" } else { "Red" })
    
    if ($missingRoutes.Count -gt 0) {
        Write-Host ""
        Write-Host "=== Missing Routes ===" -ForegroundColor Red
        foreach ($route in $missingRoutes) {
            Write-Host "  - $route" -ForegroundColor Red
        }
        Write-Host ""
        Write-Host "Status: ✗ FAIL - Some routes are missing" -ForegroundColor Red
        exit 1
    } else {
        Write-Host ""
        Write-Host "Status: ✓ PASS - All routes are defined" -ForegroundColor Green
        Write-Host ""
        Write-Host "⚠️  Note: This script only checks route definitions." -ForegroundColor Yellow
        Write-Host "   For full testing, manually verify routes in browser:" -ForegroundColor Yellow
        Write-Host "   1. Start dev server: npm run dev" -ForegroundColor Gray
        Write-Host "   2. Navigate to each route" -ForegroundColor Gray
        Write-Host "   3. Verify no 404 errors" -ForegroundColor Gray
        exit 0
    }
} catch {
    Write-Host "  ✗ Error reading router.tsx: $_" -ForegroundColor Red
    exit 1
}
