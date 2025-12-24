# Скрипт проверки перекрестных ссылок в документации SIFS Theory

param(
    [string]$Path = "docs"
)

$ErrorActionPreference = "Continue"

Write-Host "Проверка перекрестных ссылок в документации SIFS Theory" -ForegroundColor Cyan
Write-Host "Путь: $Path" -ForegroundColor Gray
Write-Host ""

# Получаем все .md файлы
$files = Get-ChildItem -Path $Path -Filter "*.md" -Recurse | Where-Object {
    $_.FullName -notmatch "\\node_modules\\" -and
    $_.FullName -notmatch "\\.git\\"
}

# Создаем карту файлов (имя файла -> полный путь)
$fileMap = @{}
foreach ($file in $files) {
    $fileName = $file.Name
    $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/")
    
    # Добавляем по имени файла
    if (-not $fileMap.ContainsKey($fileName)) {
        $fileMap[$fileName] = @()
    }
    $fileMap[$fileName] += $relativePath
    
    # Добавляем по относительному пути
    $fileMap[$relativePath] = $file.FullName
}

$brokenLinks = @()
$totalLinks = 0
$checkedFiles = 0

# Паттерны для ссылок Markdown
$linkPatterns = @(
    # [текст](путь)
    '\[([^\]]+)\]\(([^)]+)\)',
    # [текст][ref]
    '\[([^\]]+)\]\[([^\]]+)\]',
    # <путь>
    '<([^>]+)>'
)

foreach ($file in $files) {
    $checkedFiles++
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $fileDir = $file.DirectoryName
    $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/")
    
    Write-Host "Проверка: $relativePath" -ForegroundColor Gray
    
    foreach ($pattern in $linkPatterns) {
        $matches = [regex]::Matches($content, $pattern)
        
        foreach ($match in $matches) {
            $totalLinks++
            $linkTarget = $match.Groups[2].Value
            
            # Пропускаем внешние ссылки
            if ($linkTarget -match "^(https?|ftp|mailto):") {
                continue
            }
            
            # Пропускаем якоря
            if ($linkTarget -match "^#") {
                continue
            }
            
            # Убираем якорь из ссылки
            $linkPath = $linkTarget -replace "#.*$", ""
            
            # Если путь относительный, делаем его абсолютным относительно текущего файла
            if (-not [System.IO.Path]::IsPathRooted($linkPath)) {
                $linkPath = [System.IO.Path]::Combine($fileDir, $linkPath)
                $linkPath = [System.IO.Path]::GetFullPath($linkPath)
            }
            
            # Проверяем существование файла
            if (-not (Test-Path $linkPath)) {
                # Пробуем найти по имени файла
                $fileName = Split-Path -Leaf $linkPath
                if ($fileMap.ContainsKey($fileName)) {
                    # Файл найден по имени, но путь неверный
                    $brokenLink = [PSCustomObject]@{
                        File = $relativePath
                        Link = $linkTarget
                        Line = ($content.Substring(0, $match.Index) -split "`n").Count
                        Issue = "Неверный путь (файл существует: $($fileMap[$fileName][0]))"
                    }
                    $brokenLinks += $brokenLink
                } else {
                    # Файл не найден
                    $brokenLink = [PSCustomObject]@{
                        File = $relativePath
                        Link = $linkTarget
                        Line = ($content.Substring(0, $match.Index) -split "`n").Count
                        Issue = "Файл не найден"
                    }
                    $brokenLinks += $brokenLink
                }
            }
        }
    }
}

Write-Host ""
Write-Host "Результаты проверки:" -ForegroundColor Cyan
Write-Host "Проверено файлов: $checkedFiles" -ForegroundColor Gray
Write-Host "Проверено ссылок: $totalLinks" -ForegroundColor Gray
Write-Host "Найдено проблем: $($brokenLinks.Count)" -ForegroundColor $(if ($brokenLinks.Count -eq 0) { "Green" } else { "Yellow" })
Write-Host ""

if ($brokenLinks.Count -gt 0) {
    Write-Host "Найденные проблемы:" -ForegroundColor Yellow
    Write-Host ""
    
    foreach ($link in $brokenLinks) {
        Write-Host "Файл: $($link.File)" -ForegroundColor Red
        Write-Host "  Строка: $($link.Line)" -ForegroundColor Gray
        Write-Host "  Ссылка: $($link.Link)" -ForegroundColor Yellow
        Write-Host "  Проблема: $($link.Issue)" -ForegroundColor Red
        Write-Host ""
    }
    
    exit 1
} else {
    Write-Host "Все ссылки работают корректно!" -ForegroundColor Green
    exit 0
}
