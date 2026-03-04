# Руководство по ошибкам Cursor IDE

Этот документ объясняет различные сообщения в консоли Cursor IDE и как с ними работать.

## ✅ Не критичные ошибки (можно игнорировать)

### 1. Git Submodule ошибки

```
Git error: Pathspec 'spec-kit/templates/plan-template.md' is in submodule 'spec-kit'
```

**Что это:** Git пытается работать с файлами внутри submodule, что вызывает предупреждения.

**Решение:** Это нормальное поведение для submodule. Можно игнорировать.

**Как скрыть:** Добавьте `spec-kit/` в `.gitignore` или настройте Git для игнорирования submodule.

### 2. MCP Server stderr логи

```
Server "openai-image-generation" stderr: ListToolsRequest
Server "dalle-mcp" stderr: DALL-E MCP server running on stdio
```

**Что это:** MCP серверы выводят информационные сообщения в stderr. Это **не ошибки**, а нормальный вывод.

**Решение:** Можно игнорировать. Серверы работают корректно.

### 3. OTLP Exporter ошибки

```
OTLPExporterError: Bad Request
"error":"Trace spans collection is not enabled for this user"
```

**Что это:** Ошибка телеметрии (сбора данных для аналитики).

**Решение:** Можно игнорировать. Это не влияет на работу Cursor IDE.

### 4. Отсутствующие файлы терминалов

```
Error: ENOENT: no such file or directory, stat 'terminals\2.txt'
```

**Что это:** Cursor IDE пытается получить доступ к логам терминалов, которые были удалены.

**Решение:** Запустите скрипт `scripts/fix-cursor-errors.ps1` для создания недостающих файлов.

### 5. ToolCallEventService логи

```
ToolCallEventService: Tracked tool call start/end
```

**Что это:** Информационные логи о вызовах инструментов (tools).

**Решение:** Можно игнорировать. Это нормальная работа системы.

### 6. Composer задержки

```
[composer] No first token received within 2s/4s/6s
```

**Что это:** Предупреждение о задержке ответа от AI модели.

**Решение:** Обычно ответ приходит позже. Можно игнорировать, если ответы в итоге приходят.

### 7. Ошибки чтения несуществующих файлов

```
[ToolV2Service] Error executing tool: File not found: .gitmodules
File not found: .gitmodules
```

**Что это:** AI агент пытается прочитать файл, которого не существует в проекте. Это нормально - агент исследует проект и может пытаться прочитать файлы, которые могут существовать.

**Решение:** Можно игнорировать. Агент обработает ошибку и продолжит работу. Это не влияет на функциональность.

## 🔧 Исправление проблем

### Автоматическое исправление

Запустите скрипт для автоматического исправления проблем:

```powershell
powershell -ExecutionPolicy Bypass -File "scripts\fix-cursor-errors.ps1"
```

Скрипт:
- Создает недостающие файлы терминалов
- Проверяет и исправляет BOM в mcp.json
- Проверяет конфигурацию MCP серверов

### Ручное исправление

#### Очистка кэша проекта

```powershell
# Удалить кэш проекта (правила не удалятся)
Remove-Item -Path "$env:USERPROFILE\.cursor\projects\c-SIFS-Theory-Core" -Recurse -Force
```

**Важно:** Правила в `.cursor/rules/` не будут удалены, так как они находятся в самом проекте.

#### Создание файлов терминалов

```powershell
$terminalsDir = "$env:USERPROFILE\.cursor\projects\c-SIFS-Theory-Core\terminals"
for ($i = 1; $i -le 10; $i++) {
    $file = Join-Path $terminalsDir "$i.txt"
    if (-not (Test-Path $file)) {
        New-Item -Path $file -ItemType File -Force | Out-Null
    }
}
```

## 📝 Рекомендации

1. **Не перезагружайте Cursor IDE** из-за этих ошибок - большинство из них не критичны
2. **Используйте скрипт** `fix-cursor-errors.ps1` для автоматического исправления
3. **Игнорируйте** не критичные ошибки (MCP stderr, OTLP, ToolCallEventService)
4. **Проверяйте** только реальные ошибки, которые влияют на функциональность

## 🚨 Критичные ошибки (требуют внимания)

### Ошибки парсинга JSON

```
SyntaxError: Unexpected token in JSON
```

**Решение:** Проверьте файлы конфигурации (`.cursor/mcp.json`, `.cursor/shadcn.json`) на синтаксические ошибки.

### Ошибки загрузки расширений

```
Failed to load extension
```

**Решение:** Перезапустите Cursor IDE или переустановите проблемное расширение.

## 🔗 Связанные файлы

- `scripts/fix-cursor-errors.ps1` - скрипт для автоматического исправления
- `.cursor/mcp.json` - конфигурация MCP серверов
- `.cursor/rules/` - правила Cursor IDE (не удаляются при очистке кэша)
