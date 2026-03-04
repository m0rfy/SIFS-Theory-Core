# Generated Images Directory

This directory contains generated images for the SIFS Theory project.

## Structure

```
generated/
├── hero.png                    # Hero image (1920x1080)
├── icon-theory.png            # Theory section icon (256x256)
├── icon-calculations.png      # Calculations section icon (256x256)
├── icon-predictions.png       # Predictions section icon (256x256)
├── icon-data.png              # Data section icon (256x256)
├── icon-simulations.png       # Simulations section icon (256x256)
├── backgrounds/               # Background patterns
│   ├── background-fractal-1.png
│   ├── background-fractal-2.png
│   └── background-fractal-3.png
└── image-prompts.json         # Prompts used for generation
```

## Generation

Images are generated using MCP DALL-E tools. To generate images:

1. **Configure OpenAI API Key**:
   - Open Cursor settings
   - Navigate to MCP configuration
   - Add OpenAI API key to DALL-E MCP server

2. **Generate Images**:
   - Use MCP DALL-E tools in Cursor chat
   - Or run `node scripts/generate-images.js` for prompts reference

3. **Image Requirements**:
   - Hero image: 1920x1080, SIFS Theory theme
   - Icons: 256x256, minimalist, scientific style
   - Backgrounds: 1920x1080, abstract fractal patterns

## Prompts

See `image-prompts.json` for detailed prompts used for each image.

## Usage

Images are referenced in:
- `src/app/pages/HomePage.tsx` - Hero image
- `src/app/components/museum/ParallaxHero.tsx` - Background images
- Navigation components - Section icons
