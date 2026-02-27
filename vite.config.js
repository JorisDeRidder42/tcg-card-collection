import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
  proxy: {
    '/api': {
      target: 'https://api.pokemontcg.io',
      changeOrigin: true,
      secure: true,
      rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
})
