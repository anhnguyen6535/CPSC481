import path from 'path';
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Use "path.resolve" where you need it
const { resolve } = path;

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        404: resolve(__dirname, "public/404.html"),
      },
    },
  },
});