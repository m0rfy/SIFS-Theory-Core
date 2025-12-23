# Настройка Git для проекта

## ✅ Текущая конфигурация

Git настроен со следующими параметрами:

- **Имя автора:** TohaVorobey
- **GitHub ник:** m0rfy
- **Email для коммитов:** 4241515@gmail.com
- **Email для связей:** nikelon@proton.me
- **Ветка по умолчанию:** main

## 🔧 Команды для настройки

Если нужно перенастроить Git, выполните следующие команды:

```bash
# Настройка имени
git config --global user.name "TohaVorobey"

# Настройка email (используется в коммитах)
git config --global user.email "4241515@gmail.com"

# Ветка по умолчанию
git config --global init.defaultBranch main

# Автоматическое преобразование окончаний строк (для Windows)
git config --global core.autocrlf true

# Цветной вывод
git config --global color.ui auto
```

## 📝 Использование скриптов

В папке `.github/scripts/` доступны скрипты для автоматической настройки:

### Windows (PowerShell)
```powershell
.\github\scripts\setup-git-config.ps1
```

### Windows (Batch)
```cmd
.github\scripts\setup-git-config.bat
```

### Linux/Mac (Bash)
```bash
chmod +x .github/scripts/setup-git-config.sh
./.github/scripts/setup-git-config.sh
```

## 🔍 Проверка настроек

Просмотр всех настроек:
```bash
git config --list --show-origin
```

Проверка конкретных параметров:
```bash
git config --global user.name
git config --global user.email
git config --global init.defaultBranch
```

## 📚 Дополнительные ресурсы

- [Официальная документация Git](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)
- [Git Configuration](https://git-scm.com/docs/git-config)

## ⚠️ Важные замечания

1. **Email для коммитов:** Используется `4241515@gmail.com` - это email, привязанный к GitHub аккаунту `m0rfy`
2. **Email для связей:** `nikelon@proton.me` - используйте этот email для личных контактов и коммуникации
3. **Ветка main:** Все новые репозитории будут создаваться с веткой `main` вместо `master`

## 🔐 Безопасность email

Если вы хотите скрыть свой email в коммитах, можно использовать GitHub no-reply email:

```bash
git config --global user.email "m0rfy@users.noreply.github.com"
```

Но для правильной работы с GitHub лучше использовать email, привязанный к аккаунту: `4241515@gmail.com`
