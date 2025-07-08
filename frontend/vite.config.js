import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createErrorHandler } from './vite-error-handler.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), createErrorHandler()],
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    port: 5173,
    host: '0.0.0.0', // Allow external connections (required for Codespaces)
    hmr: {
      port: 5174,
      host: '0.0.0.0', // Use 0.0.0.0 for Codespaces compatibility
    },
    cors: true, // Enable CORS for all origins in development
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    ws: true, // Enable WebSocket support
    // No proxy needed - backend Vite server handles all routing
  },
  // Suppress manifest-related warnings in Codespaces
  define: {
    __SUPPRESS_MANIFEST_WARNINGS__: true,
  }
})
