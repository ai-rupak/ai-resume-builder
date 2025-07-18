import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@':  path.resolve(__dirname, "src")// ✅ Vercel safe
    }
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
