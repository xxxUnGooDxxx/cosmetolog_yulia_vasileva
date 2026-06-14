import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/cosmetolog_yulia_vasileva/',
  plugins: [react(), tailwindcss()],
})
