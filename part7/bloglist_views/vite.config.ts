import { defineConfig, InlineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.ts',
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3003',
          changeOrigin: true,
        },
      },
    },
  },
} as UserConfig & { test: InlineConfig })
