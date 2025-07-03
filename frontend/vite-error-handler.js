// Vite error handler for development
export function createErrorHandler() {
  return {
    name: 'error-handler',
    configureServer(server) {
      // Handle WebSocket connection errors gracefully
      server.ws.on('error', (error) => {
        // Suppress common WebSocket errors in development
        if (error.message.includes('WebSocket') || error.message.includes('ECONNREFUSED')) {
          console.warn('WebSocket connection issue (non-critical):', error.message);
        } else {
          console.error('Server error:', error);
        }
      });

      // Override console.error to filter out known Codespaces issues
      const originalConsoleError = console.error;
      console.error = (...args) => {
        const message = args.join(' ');
        
        // Suppress known Codespaces manifest and WebSocket errors
        if (
          message.includes('manifest.json') ||
          message.includes('github.dev/pf-signin') ||
          message.includes('WebSocket closed without opened') ||
          message.includes('failed to connect to websocket')
        ) {
          console.warn('Suppressed Codespaces-related error:', message);
          return;
        }
        
        originalConsoleError.apply(console, args);
      };

      // Add error handling for HMR
      server.middlewares.use((req, res, next) => {
        // Add CORS headers for all requests
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        
        // Handle preflight requests
        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          res.end();
          return;
        }
        
        // Handle manifest.json requests to prevent redirects
        if (req.url === '/manifest.json') {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'no-cache');
        }
        
        next();
      });
    }
  };
}
