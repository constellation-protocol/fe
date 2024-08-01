import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
   https: {
      key: './certs/constellation-privateKey.key',
      cert:'./certs/constellation.crt'
   }
  },
  plugins: [react()],
})
