#!/bin/bash

# Скрипт для автоматической настройки защиты ветки main через GitHub API
# Использование: ./setup-branch-protection.sh <OWNER> <REPO> <GITHUB_TOKEN>

set -e

OWNER="${1:-m0rfy}"
REPO="${2:-SIFS-Theory-Core}"
GITHUB_TOKEN="${3:-${GITHUB_TOKEN}}"

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Ошибка: GITHUB_TOKEN не установлен"
    echo "Использование: $0 <OWNER> <REPO> <GITHUB_TOKEN>"
    echo "Или установите переменную окружения GITHUB_TOKEN"
    exit 1
fi

API_URL="https://api.github.com/repos/${OWNER}/${REPO}"

echo "🔧 Настройка защиты ветки main для ${OWNER}/${REPO}..."

# Проверяем, существует ли репозиторий
echo "📡 Проверка доступа к репозиторию..."
REPO_INFO=$(curl -s -H "Authorization: token ${GITHUB_TOKEN}" \
    -H "Accept: application/vnd.github.v3+json" \
    "${API_URL}")

if echo "$REPO_INFO" | grep -q "Not Found"; then
    echo "❌ Репозиторий не найден или нет доступа"
    exit 1
fi

echo "✅ Репозиторий найден"

# Настройка защиты ветки через Branch Protection API
echo "🛡️  Настройка правил защиты ветки..."

PROTECTION_CONFIG=$(cat <<EOF
{
  "required_status_checks": {
    "strict": true,
    "contexts": [
      "CI / lint-and-build"
    ]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "required_approving_review_count": 1,
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": false,
    "require_last_push_approval": false
  },
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "block_creations": false,
  "required_conversation_resolution": true,
  "lock_branch": false,
  "allow_fork_syncing": false
}
EOF
)

RESPONSE=$(curl -s -w "\n%{http_code}" -X PUT \
    -H "Authorization: token ${GITHUB_TOKEN}" \
    -H "Accept: application/vnd.github.v3+json" \
    -H "Content-Type: application/json" \
    -d "${PROTECTION_CONFIG}" \
    "${API_URL}/branches/main/protection")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 201 ]; then
    echo "✅ Защита ветки main успешно настроена!"
    echo ""
    echo "📋 Настроенные правила:"
    echo "   ✅ Требуется Pull Request перед мержем"
    echo "   ✅ Требуется минимум 1 одобрение"
    echo "   ✅ Требуется прохождение CI проверок"
    echo "   ✅ Ветка должна быть актуальной"
    echo "   ✅ Запрещены force push"
    echo "   ✅ Запрещено удаление ветки"
    echo "   ✅ Требуется разрешение всех обсуждений"
    echo ""
    echo "🔍 Проверьте настройки: https://github.com/${OWNER}/${REPO}/settings/branches"
else
    echo "❌ Ошибка при настройке защиты ветки"
    echo "HTTP код: $HTTP_CODE"
    echo "Ответ: $BODY"
    exit 1
fi
