# Скрипт для обновления OpenSSH на Windows
# Обновляет OpenSSH до последней версии с GitHub

Write-Host "=== Обновление OpenSSH для Windows ===" -ForegroundColor Cyan
Write-Host ""

# Проверяем текущую версию
Write-Host "Текущая версия:" -ForegroundColor Yellow
ssh -V
Write-Host ""

# Определяем путь установки OpenSSH
$opensshPath = "$env:ProgramFiles\OpenSSH"
$opensshPathWin32 = "$env:ProgramFiles\OpenSSH-Win64"

# Проверяем, установлен ли OpenSSH
if (Test-Path $opensshPath) {
    Write-Host "Найден OpenSSH в: $opensshPath" -ForegroundColor Green
    $installPath = $opensshPath
} elseif (Test-Path $opensshPathWin32) {
    Write-Host "Найден OpenSSH в: $opensshPathWin32" -ForegroundColor Green
    $installPath = $opensshPathWin32
} else {
    Write-Host "OpenSSH не найден в стандартных путях" -ForegroundColor Yellow
    Write-Host "Попробуем найти через where.exe..." -ForegroundColor Yellow
    $sshPath = (Get-Command ssh -ErrorAction SilentlyContinue).Source
    if ($sshPath) {
        $installPath = Split-Path (Split-Path $sshPath -Parent) -Parent
        Write-Host "Найден OpenSSH в: $installPath" -ForegroundColor Green
    } else {
        Write-Host "ОШИБКА: OpenSSH не найден!" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "=== Варианты обновления ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "ВАРИАНТ 1 (Рекомендуется): Скачать с GitHub" -ForegroundColor Yellow
Write-Host "  1. Откройте: https://github.com/PowerShell/Win32-OpenSSH/releases/latest"
Write-Host "  2. Скачайте файл: OpenSSH-Win64.zip (или OpenSSH-Win32.zip для 32-bit)"
Write-Host "  3. Распакуйте архив"
Write-Host "  4. Запустите от имени администратора: install-sshd.ps1"
Write-Host ""
Write-Host "ВАРИАНТ 2: Через Windows Optional Features" -ForegroundColor Yellow
Write-Host "  1. Нажмите Win + R, введите: optionalfeatures"
Write-Host "  2. Найдите 'OpenSSH Client' и 'OpenSSH Server'"
Write-Host "  3. Снимите галочки (удалить)"
Write-Host "  4. Перезагрузите компьютер"
Write-Host "  5. Снова откройте optionalfeatures"
Write-Host "  6. Установите обратно (это установит более свежую версию, если доступна)"
Write-Host ""
Write-Host "ВАРИАНТ 3: Автоматическое обновление через PowerShell" -ForegroundColor Yellow
Write-Host "  (Требует прав администратора)"
Write-Host ""

$choice = Read-Host "Выберите вариант (1/2/3) или 'q' для выхода"

if ($choice -eq "1") {
    Write-Host ""
    Write-Host "Открываю страницу релизов GitHub..." -ForegroundColor Cyan
    Start-Process "https://github.com/PowerShell/Win32-OpenSSH/releases/latest"
    Write-Host ""
    Write-Host "Инструкция:" -ForegroundColor Yellow
    Write-Host "1. Скачайте OpenSSH-Win64.zip"
    Write-Host "2. Распакуйте в папку (например, C:\OpenSSH)"
    Write-Host "3. Откройте PowerShell от имени администратора"
    Write-Host "4. Перейдите в распакованную папку"
    Write-Host "5. Запустите: .\install-sshd.ps1"
    Write-Host ""
    
} elseif ($choice -eq "2") {
    Write-Host ""
    Write-Host "Открываю Windows Optional Features..." -ForegroundColor Cyan
    Start-Process "optionalfeatures"
    Write-Host ""
    Write-Host "Следуйте инструкциям выше для обновления через Optional Features" -ForegroundColor Yellow
    Write-Host ""
    
} elseif ($choice -eq "3") {
    Write-Host ""
    Write-Host "Проверяю права администратора..." -ForegroundColor Cyan
    
    $isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
    
    if (-not $isAdmin) {
        Write-Host "ОШИБКА: Требуются права администратора!" -ForegroundColor Red
        Write-Host "Запустите PowerShell от имени администратора и повторите попытку" -ForegroundColor Yellow
        exit 1
    }
    
    Write-Host "Скачиваю последнюю версию с GitHub..." -ForegroundColor Cyan
    
    # Получаем последний релиз
    $releaseUrl = "https://api.github.com/repos/PowerShell/Win32-OpenSSH/releases/latest"
    try {
        $release = Invoke-RestMethod -Uri $releaseUrl -UseBasicParsing
        $downloadUrl = ($release.assets | Where-Object { $_.name -like "OpenSSH-Win64.zip" }).browser_download_url
        
        if (-not $downloadUrl) {
            Write-Host "Не удалось найти ссылку на скачивание" -ForegroundColor Red
            exit 1
        }
        
        $downloadPath = "$env:TEMP\OpenSSH-Win64.zip"
        Write-Host "Скачиваю: $downloadUrl" -ForegroundColor Yellow
        Invoke-WebRequest -Uri $downloadUrl -OutFile $downloadPath
        
        $extractPath = "$env:TEMP\OpenSSH-Update"
        if (Test-Path $extractPath) {
            Remove-Item $extractPath -Recurse -Force
        }
        New-Item -ItemType Directory -Path $extractPath | Out-Null
        
        Write-Host "Распаковываю..." -ForegroundColor Yellow
        Expand-Archive -Path $downloadPath -DestinationPath $extractPath -Force
        
        Write-Host ""
        Write-Host "Скачано и распаковано в: $extractPath" -ForegroundColor Green
        Write-Host ""
        Write-Host "ВАЖНО: Теперь нужно вручную установить:" -ForegroundColor Yellow
        Write-Host "1. Откройте PowerShell от имени администратора"
        Write-Host "2. Перейдите в: $extractPath\OpenSSH-Win64"
        Write-Host "3. Запустите: .\install-sshd.ps1"
        Write-Host ""
        Write-Host "Или откройте папку сейчас?" -ForegroundColor Cyan
        $openFolder = Read-Host "(y/n)"
        if ($openFolder -eq "y") {
            Start-Process explorer.exe -ArgumentList $extractPath
        }
        
    } catch {
        Write-Host "ОШИБКА при скачивании: $_" -ForegroundColor Red
        Write-Host "Попробуйте вариант 1 (ручное скачивание)" -ForegroundColor Yellow
    }
    
} else {
    Write-Host "Выход..." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "После обновления проверьте версию командой: ssh -V" -ForegroundColor Cyan
Write-Host ""
