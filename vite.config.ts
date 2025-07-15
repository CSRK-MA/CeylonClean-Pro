// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/CeylonClean-Pro/', // 👈 use your repo name
  plugins: [react()],
})
