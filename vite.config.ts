import { defineConfig } from 'vite'
import path from 'path'
import { copyFileSync, mkdirSync, readdirSync, statSync, existsSync, createReadStream } from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

/** Recursively copy src directory to dest */
function copyDir(src: string, dest: string) {
  if (!existsSync(src)) return;
  mkdirSync(dest, { recursive: true });
  for (const item of readdirSync(src)) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    if (statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

export default defineConfig({
  // Base path for GitHub Pages deployment - using relative path to be agnostic of repo name
  base: './',
  
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    // Copy docs/ to dist/docs/ so markdown files are served on GitHub Pages
    {
      name: 'copy-docs',
      closeBundle() {
        copyDir('docs', path.join('dist', 'docs'));
        console.log('✓ docs/ copied to dist/docs/');
      },
    },
    // In dev: serve /docs/* from project docs/ so DocPage fetch works
    {
      name: 'serve-docs-dev',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const urlPath = req.url?.split('?')[0] ?? '';
          if (!urlPath.startsWith('/docs/')) return next();
          const relative = urlPath.replace(/^\/docs\/?/, '').replace(/\.\./g, '');
          const filePath = path.join(process.cwd(), 'docs', relative);
          if (!existsSync(filePath) || !statSync(filePath).isFile()) return next();
          res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
          createReadStream(filePath).pipe(res);
        });
      },
    },
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
          // Single vendor chunk: React, React-DOM, Radix, MUI, etc. (avoids forwardRef load-order error)
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
