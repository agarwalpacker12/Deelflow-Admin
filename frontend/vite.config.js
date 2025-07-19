import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createErrorHandler } from './vite-error-handler.js'
import dotenv from 'dotenv'

// Load .env file
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), createErrorHandler()],
  css: {
    postcss: "./postcss.config.js",
  },
  server: {
    port: 5173,
    host: "0.0.0.0",
    hmr: {
      port: 5174,
      host: "0.0.0.0",
    }, 
    proxy: {
      "/api": {
        target: "https://develop.monorepo-backend.dealflow.pro.kurious.dev",
        changeOrigin: true,
        secure: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    },
  },
  define: {
    __SUPPRESS_MANIFEST_WARNINGS__: true,
  },
});
