import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// SPA tĩnh — Vercel tự nhận diện Vite, output vào dist/
export default defineConfig({
  plugins: [react()],
})
