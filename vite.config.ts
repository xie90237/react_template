/// <reference types="vitest" />
import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@root': path.resolve(__dirname),
      lodash: 'lodash-es'
    }
  },
  server: {
    host: '0.0.0.0',
    port: 9002,
    proxy: {
      // '/api': {
      //   target: 'http://192.168.1.101/oa',
      //   changeOrigin: true,
      //   rewrite: (path) => {
      //     console.log(path.replace(/^\/dev-api/, ''))
      //     return path.replace(/^\/dev-api/, '')
      //   }
      // }
    },
    watch: { ignored: ['**/dist/**'] }
  },
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: '.vitest/setup',
    include: ['**/test.{ts,tsx}']
  }
})
