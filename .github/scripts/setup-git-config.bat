@echo off
REM Скрипт для настройки Git конфигурации (Windows Batch)
REM Использование: setup-git-config.bat

echo 🔧 Настройка Git конфигурации...

REM Настройка имени пользователя
git config --global user.name "TohaVorobey"

REM Настройка email для GitHub (используется для коммитов)
git config --global user.email "4241515@gmail.com"

REM Настройка имени ветки по умолчанию
git config --global init.defaultBranch main

REM Настройка автоперевода CRLF (для Windows)
git config --global core.autocrlf true

REM Настройка цветного вывода
git config --global color.ui auto

REM Настройка push поведения (только текущая ветка)
git config --global push.default simple

REM Настройка pull поведения (rebase вместо merge)
git config --global pull.rebase false

REM Настройка алиасов для удобства
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage "reset HEAD --"
git config --global alias.last "log -1 HEAD"
git config --global alias.visual "!gitk"

echo.
echo ✅ Git конфигурация успешно настроена!
echo.
echo 📋 Текущие настройки:
git config --global user.name
git config --global user.email
git config --global init.defaultBranch
echo.
echo 📧 Контакты:
echo    GitHub: m0rfy
echo    GitHub Email: 4241515@gmail.com
echo    Email для связей: nikelon@proton.me
echo.
echo 🔍 Просмотр всех настроек: git config --list --show-origin
pause
