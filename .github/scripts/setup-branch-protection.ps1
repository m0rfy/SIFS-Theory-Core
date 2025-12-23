# Скрипт для автоматической настройки защиты ветки main через GitHub API (PowerShell)
# Использование: .\setup-branch-protection.ps1 -Owner <OWNER> -Repo <REPO> -Token <GITHUB_TOKEN>

param(
    [string]$Owner = "m0rfy",
    [string]$Repo = "SIFS-Theory-Core",
    [string]$Token = $env:GITHUB_TOKEN
)

if (-not $Token) {
    Write-Host "❌ Ошибка: GITHUB_TOKEN не установлен" -ForegroundColor Red
    Write-Host "Использование: .\setup-branch-protection.ps1 -Owner <OWNER> -Repo <REPO> -Token <GITHUB_TOKEN>"
    Write-Host "Или установите переменную окружения GITHUB_TOKEN"
    exit 1
}

$ApiUrl = "https://api.github.com/repos/${Owner}/${Repo}"

Write-Host "🔧 Настройка защиты ветки main для ${Owner}/${Repo}..." -ForegroundColor Cyan

# Проверяем, существует ли репозиторий
Write-Host "📡 Проверка доступа к репозиторию..." -ForegroundColor Yellow

$Headers = @{
    "Authorization" = "token ${Token}"
    "Accept" = "application/vnd.github.v3+json"
}

try {
    $RepoInfo = Invoke-RestMethod -Uri $ApiUrl -Headers $Headers -Method Get
    Write-Host "✅ Репозиторий найден" -ForegroundColor Green
} catch {
    Write-Host "❌ Репозиторий не найден или нет доступа" -ForegroundColor Red
    Write-Host $_.Exception.Message
    exit 1
}

# Настройка защиты ветки через Branch Protection API
Write-Host "🛡️  Настройка правил защиты ветки..." -ForegroundColor Yellow

$ProtectionConfig = @{
    required_status_checks = @{
        strict = $true
        contexts = @("CI / lint-and-build")
    }
    enforce_admins = $true
    required_pull_request_reviews = @{
        required_approving_review_count = 1
        dismiss_stale_reviews = $true
        require_code_owner_reviews = $false
        require_last_push_approval = $false
    }
    restrictions = $null
    allow_force_pushes = $false
    allow_deletions = $false
    block_creations = $false
    required_conversation_resolution = $true
    lock_branch = $false
    allow_fork_syncing = $false
} | ConvertTo-Json -Depth 10

try {
    $Response = Invoke-RestMethod -Uri "${ApiUrl}/branches/main/protection" `
        -Headers $Headers `
        -Method Put `
        -Body $ProtectionConfig `
        -ContentType "application/json"
    
    Write-Host "✅ Защита ветки main успешно настроена!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Настроенные правила:" -ForegroundColor Cyan
    Write-Host "   ✅ Требуется Pull Request перед мержем"
    Write-Host "   ✅ Требуется минимум 1 одобрение"
    Write-Host "   ✅ Требуется прохождение CI проверок"
    Write-Host "   ✅ Ветка должна быть актуальной"
    Write-Host "   ✅ Запрещены force push"
    Write-Host "   ✅ Запрещено удаление ветки"
    Write-Host "   ✅ Требуется разрешение всех обсуждений"
    Write-Host ""
    Write-Host "🔍 Проверьте настройки: https://github.com/${Owner}/${Repo}/settings/branches" -ForegroundColor Yellow
} catch {
    Write-Host "❌ Ошибка при настройке защиты ветки" -ForegroundColor Red
    Write-Host "HTTP код: $($_.Exception.Response.StatusCode.value__)"
    Write-Host "Ответ: $($_.Exception.Message)"
    exit 1
}
