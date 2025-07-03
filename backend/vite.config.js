import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        tailwindcss(),
    ],
    server: {
        port: 5174,
        host: '0.0.0.0',
        proxy: {
            // Proxy all non-API requests to the frontend Vite server
            '^(?!/api).*': {
                target: 'http://localhost:5173',
                changeOrigin: true,
                secure: false,
                ws: true, // Re-enable WebSocket proxying
                configure: (proxy, options) => {
                    proxy.on('error', (err, req, res) => {
                        console.log('Proxy error:', err);
                    });
                }
            }
        }
    }
});
