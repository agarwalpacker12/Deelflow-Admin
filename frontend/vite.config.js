import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    port: 5173,
    host: '0.0.0.0', // Allow external connections (required for Codespaces)
    proxy: {
      // Proxy API requests to the Laravel backend
      '/api': {
        target: 'http://localhost:5174', // Laravel artisan serve port
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('API Proxy error:', err);
          });
        }
      }
    }
  }
})
