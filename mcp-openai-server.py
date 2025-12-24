#!/usr/bin/env python3
"""
MCP Server for OpenAI Image Generation
Генерирует изображения с помощью OpenAI DALL-E API
"""
import os
import sys
from typing import Any
from openai import OpenAI

# Проверяем наличие API ключа
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    print("Ошибка: OPENAI_API_KEY не установлен в переменных окружения", file=sys.stderr)
    sys.exit(1)

client = OpenAI(api_key=api_key)

def generate_image(prompt: str, size: str = "1024x1024", quality: str = "standard", n: int = 1) -> dict[str, Any]:
    """
    Генерирует изображение с помощью OpenAI DALL-E API
    
    Args:
        prompt: Текстовое описание изображения
        size: Размер изображения (256x256, 512x512, 1024x1024, 1792x1024, 1024x1792)
        quality: Качество изображения (standard, hd)
        n: Количество изображений для генерации (1-10)
    
    Returns:
        Словарь с URL изображения и метаданными
    """
    try:
        response = client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size=size,
            quality=quality,
            n=min(n, 1) if size in ["1024x1024", "1792x1024", "1024x1792"] else min(n, 10)
        )
        
        result = {
            "url": response.data[0].url,
            "revised_prompt": getattr(response.data[0], 'revised_prompt', prompt),
            "size": size,
            "quality": quality
        }
        
        return result
    except Exception as e:
        return {
            "error": str(e),
            "url": None
        }

if __name__ == "__main__":
    # Простой интерфейс командной строки для тестирования
    if len(sys.argv) < 2:
        print("Использование: python mcp-openai-server.py <prompt> [size] [quality]")
        print("Пример: python mcp-openai-server.py 'красивый закат' 1024x1024 hd")
        sys.exit(1)
    
    prompt = sys.argv[1]
    size = sys.argv[2] if len(sys.argv) > 2 else "1024x1024"
    quality = sys.argv[3] if len(sys.argv) > 3 else "standard"
    
    result = generate_image(prompt, size, quality)
    print(f"URL изображения: {result.get('url', 'Ошибка генерации')}")
    if 'error' in result:
        print(f"Ошибка: {result['error']}", file=sys.stderr)
