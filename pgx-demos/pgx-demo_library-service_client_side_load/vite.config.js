import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  base: '/pgx-knowledge-base/', // for GitHub Pages
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html'
    }
  }
})