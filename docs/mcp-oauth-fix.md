# Решение проблемы OAuth уведомлений в MCP

## Проблема

MCP сервер выдает ошибку при попытке подключиться к OAuth notification stream:

```
Failed to connect to OAuth notifications: Get "http://localhost/notify/notifications/channel/external-oauth": 
dial unix \\.\pipe\dockerBackendApiServer: connect: No connection could be made because the target machine actively refused it.
```

## Анализ

### ✅ Что работает
- MCP сервер успешно инициализирован
- Подключение к stdio серверу установлено
- Все инструменты MCP доступны (mcp-find, mcp-add, mcp-remove, code-mode, и т.д.)

### ⚠️ Что не работает
- OAuth notification monitor не может подключиться к Docker backend API server
- Это **не критично** для основной функциональности MCP

## Решения

### Вариант 1: Игнорировать ошибку (рекомендуется)

Если вы не используете OAuth аутентификацию через Docker backend, эту ошибку можно безопасно игнорировать. Основная функциональность MCP работает нормально.

### Вариант 2: Отключить OAuth уведомления

Если вы хотите убрать ошибку из логов, можно отключить OAuth notification monitor в конфигурации MCP (если такая опция доступна).

### Вариант 3: Запустить Docker backend API server

Если вам нужна OAuth аутентификация:

1. Убедитесь, что Docker запущен
2. Проверьте, что Docker backend API server настроен и запущен
3. Убедитесь, что named pipe `\\.\pipe\dockerBackendApiServer` доступен

## Проверка работоспособности MCP

Чтобы убедиться, что MCP работает правильно, проверьте доступность инструментов:

- `mcp-find` - поиск MCP серверов в каталоге
- `mcp-add` - добавление MCP серверов
- `mcp-remove` - удаление MCP серверов
- `code-mode` - создание инструментов с JavaScript
- `mcp-exec` - выполнение инструментов
- `mcp-config-set` - настройка конфигурации

Если эти инструменты доступны, MCP работает корректно, несмотря на ошибку OAuth.

## Статус

**Текущий статус:** ✅ MCP работает нормально, ошибка OAuth не критична

**Рекомендация:** Игнорировать ошибку, если OAuth не используется
