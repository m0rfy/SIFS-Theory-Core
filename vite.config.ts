import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Base path for GitHub Pages deployment - using relative path to be agnostic of repo name
  base: './',
  
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  // T135 [US10]: Build optimizations with code splitting (FR-063)
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React vendor chunk
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          
          // React Router chunk
          if (id.includes('node_modules/react-router')) {
            return 'router';
          }
          
          // Motion animation library
          if (id.includes('node_modules/motion')) {
            return 'motion';
          }
          
          // Charts library
          if (id.includes('node_modules/recharts')) {
            return 'charts';
          }
          
          // Markdown rendering libraries
          if (id.includes('node_modules/react-markdown') || 
              id.includes('node_modules/remark-') || 
              id.includes('node_modules/rehype-')) {
            return 'markdown';
          }
          
          // Radix UI components (shadcn/ui base)
          if (id.includes('node_modules/@radix-ui')) {
            return 'ui';
          }
          
          // KaTeX for math rendering
          if (id.includes('node_modules/katex')) {
            return 'katex';
          }
          
          // Spatial components chunk (SSF-2025)
          if (id.includes('/components/spatial/')) {
            return 'spatial';
          }
          
          // Museum components chunk
          if (id.includes('/components/museum/')) {
            return 'museum';
          }
          
          // Other vendor libraries
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    // Оптимизация размера chunks
    chunkSizeWarningLimit: 1000,
  },
})
