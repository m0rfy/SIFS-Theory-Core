# Скрипт валидации LaTeX формул в документации SIFS Theory

param(
    [string]$Path = "docs"
)

$ErrorActionPreference = "Continue"

Write-Host "Проверка LaTeX формул в документации SIFS Theory" -ForegroundColor Cyan
Write-Host "Путь: $Path" -ForegroundColor Gray
Write-Host ""

# Получаем все .md файлы
$files = Get-ChildItem -Path $Path -Filter "*.md" -Recurse | Where-Object {
    $_.FullName -notmatch "\\node_modules\\" -and
    $_.FullName -notmatch "\\.git\\"
}

$formulaIssues = @()
$totalFormulas = 0
$checkedFiles = 0

# Паттерны для LaTeX формул
$formulaPatterns = @(
    # Inline формулы: $...$ или \(...\)
    '\$([^$]+)\$',
    '\\\(([^\)]+)\\\)',
    # Block формулы: $$...$$ или \[...\]
    '\$\$([^$]+)\$\$',
    '\\\[([^\]]+)\\\]',
    # Code block с math
    '```math\s*\n(.*?)\n```'
)

foreach ($file in $files) {
    $checkedFiles++
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "")
    
    Write-Host "Проверка: $relativePath" -ForegroundColor Gray
    
    foreach ($pattern in $formulaPatterns) {
        $matches = [regex]::Matches($content, $pattern, [System.Text.RegularExpressions.RegexOptions]::Singleline)
        
        foreach ($match in $matches) {
            $totalFormulas++
            $formula = $match.Groups[1].Value.Trim()
            $lineNumber = ($content.Substring(0, $match.Index) -split "`n").Count
            
            # Проверка на незакрытые скобки
            $openBraces = ($formula.ToCharArray() | Where-Object { $_ -eq '{' }).Count
            $closeBraces = ($formula.ToCharArray() | Where-Object { $_ -eq '}' }).Count
            if ($openBraces -ne $closeBraces) {
                $issue = [PSCustomObject]@{
                    File = $relativePath
                    Line = $lineNumber
                    Formula = $formula
                    Issue = "Несбалансированные фигурные скобки (открыто: $openBraces, закрыто: $closeBraces)"
                }
                $formulaIssues += $issue
            }
            
            # Проверка на незакрытые скобки круглые
            $openParens = ($formula.ToCharArray() | Where-Object { $_ -eq '(' }).Count
            $closeParens = ($formula.ToCharArray() | Where-Object { $_ -eq ')' }).Count
            if ($openParens -ne $closeParens) {
                $issue = [PSCustomObject]@{
                    File = $relativePath
                    Line = $lineNumber
                    Formula = $formula
                    Issue = "Несбалансированные круглые скобки (открыто: $openParens, закрыто: $closeParens)"
                }
                $formulaIssues += $issue
            }
            
            # Проверка на незакрытые квадратные скобки
            $openSquare = ($formula.ToCharArray() | Where-Object { $_ -eq '[' }).Count
            $closeSquare = ($formula.ToCharArray() | Where-Object { $_ -eq ']' }).Count
            if ($openSquare -ne $closeSquare) {
                $issue = [PSCustomObject]@{
                    File = $relativePath
                    Line = $lineNumber
                    Formula = $formula
                    Issue = "Несбалансированные квадратные скобки (открыто: $openSquare, закрыто: $closeSquare)"
                }
                $formulaIssues += $issue
            }
            
            # Проверка на пустую формулу
            if ([string]::IsNullOrWhiteSpace($formula)) {
                $issue = [PSCustomObject]@{
                    File = $relativePath
                    Line = $lineNumber
                    Formula = $formula
                    Issue = "Пустая формула"
                }
                $formulaIssues += $issue
            }
        }
    }
}

Write-Host ""
Write-Host "Результаты проверки:" -ForegroundColor Cyan
Write-Host "Проверено файлов: $checkedFiles" -ForegroundColor Gray
Write-Host "Проверено формул: $totalFormulas" -ForegroundColor Gray
Write-Host "Найдено проблем: $($formulaIssues.Count)" -ForegroundColor $(if ($formulaIssues.Count -eq 0) { "Green" } else { "Yellow" })
Write-Host ""

if ($formulaIssues.Count -gt 0) {
    Write-Host "Найденные проблемы:" -ForegroundColor Yellow
    Write-Host ""
    
    foreach ($issue in $formulaIssues) {
        Write-Host "Файл: $($issue.File)" -ForegroundColor Red
        Write-Host "  Строка: $($issue.Line)" -ForegroundColor Gray
        Write-Host "  Формула: $($issue.Formula)" -ForegroundColor Yellow
        Write-Host "  Проблема: $($issue.Issue)" -ForegroundColor Red
        Write-Host ""
    }
    
    exit 1
} else {
    Write-Host "Все формулы корректны!" -ForegroundColor Green
    exit 0
}
