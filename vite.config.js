import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // ✅ Required for using "path.resolve"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 👈 Using path here
    },
  },
  server: {
    proxy: {
      '/api': 'https://ai-resume-backend-hdci.onrender.com/'
    }
  }
})

