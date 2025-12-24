# Инструкция по настройке shadcn в Cursor IDE

Конфигурация shadcn была подготовлена в файле `.cursor/rules/shadcn-config.json`.

## Добавление конфигурации в Cursor IDE

Чтобы добавить конфигурацию shadcn в настройки Cursor IDE, выполните следующие шаги:

1. Откройте файл настроек Cursor IDE:
   - Нажмите `Ctrl+Shift+P` (или `Cmd+Shift+P` на Mac)
   - Введите "Preferences: Open User Settings (JSON)"
   - Или откройте файл напрямую: `%APPDATA%\Cursor\User\settings.json`

2. Добавьте конфигурацию shadcn из файла `.cursor/rules/shadcn-config.json` в ваш `settings.json`

3. Перезапустите Cursor IDE для применения изменений

## Альтернативный способ (через PowerShell)

Вы можете выполнить следующую команду PowerShell для автоматического добавления конфигурации:

```powershell
$settingsPath = "$env:APPDATA\Cursor\User\settings.json"
$shadcnConfig = Get-Content ".cursor\rules\shadcn-config.json" | ConvertFrom-Json
$settings = Get-Content $settingsPath -Raw | ConvertFrom-Json
$settings | Add-Member -MemberType NoteProperty -Name 'shadcn' -Value $shadcnConfig.shadcn -Force
$settings | ConvertTo-Json -Depth 10 | Set-Content $settingsPath -Encoding UTF8
```
