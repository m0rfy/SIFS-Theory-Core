# Скрипт проверки терминологии в документации SIFS Theory
# Ищет токсичные термины и неправильные формулировки

param(
    [string]$Path = "docs",
    [switch]$Fix = $false
)

$ErrorActionPreference = "Continue"

# Запрещенные термины и их контексты
$ForbiddenTerms = @{
    # "черная дыра" для микроуровня (разрешено только для астрофизических объектов)
    "черная дыра" = @{
        Pattern = "(?i)(черная дыра|черной дыры|черные дыры|черной дырой)"
        Context = "микроуровень|элементарные частицы|протон|электрон|микро"
        Replacement = "effective horizon"
        Description = "Использование 'черная дыра' для микроуровня запрещено"
    }
    "подтверждено" = @{
        Pattern = "(?i)(подтверждено|подтвердил|подтверждает|подтверждение)"
        Context = "данными|экспериментом|наблюдениями"
        Replacement = "согласуется с данными"
        Description = "Использование 'подтверждено' вместо 'согласуется' запрещено"
    }
    "доказано" = @{
        Pattern = "(?i)(доказано|доказал|доказывает|доказательство)"
        Context = "теорией|экспериментом"
        Replacement = "предсказано теорией"
        Description = "Использование 'доказано' вместо 'предсказано' запрещено"
    }
}

# Разрешенные контексты для "черная дыра"
$AllowedBlackHoleContexts = @(
    "M87",
    "Sgr A",
    "astrophysical",
    "macroscopic",
    "information paradox",
    "Page curve"
)

Write-Host "Проверка терминологии в документации SIFS Theory" -ForegroundColor Cyan
Write-Host "Путь: $Path" -ForegroundColor Gray
Write-Host ""

$issues = @()
$totalFiles = 0
$checkedFiles = 0

# Получаем все .md файлы
$files = Get-ChildItem -Path $Path -Filter "*.md" -Recurse | Where-Object {
    $_.FullName -notmatch "\\node_modules\\" -and
    $_.FullName -notmatch "\\.git\\"
}

$totalFiles = $files.Count

foreach ($file in $files) {
    $checkedFiles++
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "")
    
    Write-Host "Проверка: $relativePath" -ForegroundColor Gray
    
    foreach ($termName in $ForbiddenTerms.Keys) {
        $term = $ForbiddenTerms[$termName]
        $matches = [regex]::Matches($content, $term.Pattern)
        
        foreach ($match in $matches) {
            $lineNumber = ($content.Substring(0, $match.Index) -split "`n").Count
            $lineContent = ($content -split "`n")[$lineNumber - 1].Trim()
            
            # Проверка контекста для "черная дыра"
            if ($termName -eq "черная дыра") {
                $isAllowed = $false
                foreach ($allowedContext in $AllowedBlackHoleContexts) {
                    if ($lineContent -match $allowedContext) {
                        $isAllowed = $true
                        break
                    }
                }
                if ($isAllowed) {
                    continue
                }
                
                # Проверяем, не в контексте микроуровня
                $contextBefore = $content.Substring([Math]::Max(0, $match.Index - 100), 100)
                $contextAfter = $content.Substring($match.Index, [Math]::Min(100, $content.Length - $match.Index))
                $fullContext = $contextBefore + $contextAfter
                
                if ($fullContext -match "(?i)(micro|elementary|proton|electron|particle)" -and 
                    $fullContext -notmatch "(?i)(astrophysical|macroscopic|M87|Sgr)") {
                    $issue = [PSCustomObject]@{
                        File = $relativePath
                        Line = $lineNumber
                        Term = $termName
                        Description = $term.Description
                        LineContent = $lineContent
                        Replacement = $term.Replacement
                    }
                    $issues += $issue
                }
            } else {
                # Для других терминов проверяем контекст
                $contextBefore = $content.Substring([Math]::Max(0, $match.Index - 50), 50)
                $contextAfter = $content.Substring($match.Index, [Math]::Min(50, $content.Length - $match.Index))
                $fullContext = $contextBefore + $contextAfter
                
                if ($fullContext -match $term.Context) {
                    $issue = [PSCustomObject]@{
                        File = $relativePath
                        Line = $lineNumber
                        Term = $termName
                        Description = $term.Description
                        LineContent = $lineContent
                        Replacement = $term.Replacement
                    }
                    $issues += $issue
                }
            }
        }
    }
}

Write-Host ""
Write-Host "Результаты проверки:" -ForegroundColor Cyan
Write-Host "Проверено файлов: $checkedFiles из $totalFiles" -ForegroundColor Gray
Write-Host "Найдено проблем: $($issues.Count)" -ForegroundColor $(if ($issues.Count -eq 0) { "Green" } else { "Yellow" })
Write-Host ""

if ($issues.Count -gt 0) {
    Write-Host "Найденные проблемы:" -ForegroundColor Yellow
    Write-Host ""
    
    foreach ($issue in $issues) {
        Write-Host "Файл: $($issue.File)" -ForegroundColor Red
        Write-Host "  Строка: $($issue.Line)" -ForegroundColor Gray
        Write-Host "  Термин: $($issue.Term)" -ForegroundColor Yellow
        Write-Host "  Описание: $($issue.Description)" -ForegroundColor Gray
        Write-Host "  Строка: $($issue.LineContent)" -ForegroundColor White
        Write-Host "  Рекомендуемая замена: $($issue.Replacement)" -ForegroundColor Green
        Write-Host ""
    }
    
    exit 1
} else {
    Write-Host "Все проверки пройдены успешно!" -ForegroundColor Green
    exit 0
}
