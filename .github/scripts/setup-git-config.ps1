# Скрипт для настройки Git конфигурации (PowerShell)
# Использование: .\setup-git-config.ps1

Write-Host "🔧 Настройка Git конфигурации..." -ForegroundColor Cyan

# Настройка имени пользователя
git config --global user.name "TohaVorobey"

# Настройка email для GitHub (используется для коммитов)
git config --global user.email "4241515@gmail.com"

# Настройка имени ветки по умолчанию
git config --global init.defaultBranch main

# Настройка автоперевода CRLF (для Windows)
git config --global core.autocrlf true

# Настройка цветного вывода
git config --global color.ui auto

# Настройка push поведения (только текущая ветка)
git config --global push.default simple

# Настройка pull поведения (rebase вместо merge)
git config --global pull.rebase false

# Настройка алиасов для удобства
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'

Write-Host ""
Write-Host "✅ Git конфигурация успешно настроена!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Текущие настройки:" -ForegroundColor Cyan
Write-Host "   Имя: $(git config --global user.name)"
Write-Host "   Email: $(git config --global user.email)"
Write-Host "   Ветка по умолчанию: $(git config --global init.defaultBranch)"
Write-Host ""
Write-Host "📧 Контакты:" -ForegroundColor Cyan
Write-Host "   GitHub: m0rfy"
Write-Host "   GitHub Email: 4241515@gmail.com"
Write-Host "   Email для связей: nikelon@proton.me"
Write-Host ""
Write-Host "🔍 Просмотр всех настроек: git config --list --show-origin" -ForegroundColor Yellow
