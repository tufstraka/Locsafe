import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/",   
  server: {
    port: 8080,
  },
  plugins: [react()],
  build: {
    outDir: 'dist', 
  },
})
