# Защита ветки main

Этот документ описывает, как настроить защиту главной ветки `main` в репозитории GitHub.

## 🛡️ Настройка через GitHub UI

### Шаг 1: Перейдите в настройки репозитория

1. Откройте репозиторий на GitHub
2. Перейдите в **Settings** → **Rules** → **Rulesets** (или **Settings** → **Branches** для старого интерфейса)

### Шаг 2: Создайте Ruleset для ветки main

#### Вариант A: Используя Rulesets (рекомендуется)

1. Нажмите **New ruleset**
2. Выберите **Branch ruleset**
3. В поле **Target branches** укажите: `main`
4. Настройте следующие правила:

   **✅ Обязательные настройки:**
   
   - **Require pull request before merging**
     - ✅ Require approvals: `1` (минимум 1 одобрение)
     - ✅ Dismiss stale pull request approvals when new commits are pushed
     - ✅ Require review from Code Owners (если есть CODEOWNERS файл)
   
   - **Require status checks to pass before merging**
     - ✅ Require branches to be up to date before merging
     - ✅ Status checks that are required:
       - `CI / lint-and-build` (из workflow `.github/workflows/ci.yml`)
   
   - **Require conversation resolution before merging**
     - ✅ All comments and review threads must be resolved
   
   - **Restrict force pushes**
     - ✅ Do not allow force pushes
   
   - **Restrict deletions**
     - ✅ Do not allow branch deletions

5. Нажмите **Create ruleset**

#### Вариант B: Используя Branch protection rules (старый интерфейс)

Если Rulesets недоступны, используйте Branch protection rules:

1. Перейдите в **Settings** → **Branches**
2. В разделе **Branch protection rules** нажмите **Add rule**
3. В поле **Branch name pattern** введите: `main`
4. Включите следующие настройки:

   - ✅ **Require a pull request before merging**
     - Require approvals: `1`
     - Dismiss stale pull request approvals when new commits are pushed
     - Require review from Code Owners
   
   - ✅ **Require status checks to pass before merging**
     - Require branches to be up to date before merging
     - Status checks: выберите `CI / lint-and-build`
   
   - ✅ **Require conversation resolution before merging**
   
   - ✅ **Do not allow bypassing the above settings** (для администраторов)
   
   - ✅ **Restrict who can push to matching branches**
     - Оставьте пустым, если хотите разрешить всем создавать PR
   
   - ✅ **Do not allow force pushes**
   
   - ✅ **Do not allow deletions**

5. Нажмите **Create**

## 🤖 Настройка через GitHub API

Для автоматической настройки можно использовать скрипт. См. файл `.github/scripts/setup-branch-protection.sh`

## ✅ Проверка настройки

После настройки защиты:

1. Попробуйте создать Pull Request в ветку `main`
2. Убедитесь, что:
   - ✅ Нельзя мержить без одобрения
   - ✅ Нельзя мержить, если CI не прошёл
   - ✅ Нельзя делать force push в `main`
   - ✅ Нельзя удалить ветку `main`

## 📚 Дополнительные ресурсы

- [GitHub Documentation: About rulesets](https://docs.github.com/ru/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)
- [GitHub Documentation: Managing a branch protection rule](https://docs.github.com/ru/repositories/configuring-branches-and-merges-in-your-repository/managing-a-branch-protection-rule)
