# Руководство по генерации изображений

## Быстрый старт

1. **Настройте OpenAI API ключ** в настройках Cursor MCP
2. **Используйте промпты** из `image-prompts.json` с MCP DALL-E инструментами
3. **Сохраните изображения** в соответствующие директории

## Промпты для генерации

Все промпты сохранены в `image-prompts.json`. Используйте их с MCP DALL-E инструментами:

### Hero изображение
```json
{
  "prompt": "Abstract fractal spacetime visualization for SIFS Theory...",
  "filename": "hero.png",
  "size": "1024x1024"
}
```

### Иконки разделов
- `icon-theory.png` - Теория
- `icon-calculations.png` - Расчёты
- `icon-predictions.png` - Предсказания
- `icon-data.png` - Данные
- `icon-simulations.png` - Симуляции

### Фоновые паттерны
- `backgrounds/background-fractal-1.png`
- `backgrounds/background-fractal-2.png`
- `backgrounds/background-fractal-3.png`

## Использование MCP DALL-E

В Cursor чате используйте команды типа:
```
Сгенерируй изображение для hero.png используя промпт из image-prompts.json
```

Или напрямую:
```
Используй MCP DALL-E для генерации hero изображения: [промпт из JSON]
```

## Альтернативный способ

Если MCP не настроен, можно использовать:
- OpenAI API напрямую
- Другие сервисы генерации изображений (Midjourney, Stable Diffusion)
- Ручное создание изображений по описаниям из промптов
