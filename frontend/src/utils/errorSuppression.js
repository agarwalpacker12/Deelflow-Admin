// Client-side error suppression for development environment
export function initializeErrorSuppression() {
  if (import.meta.env.DEV) {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      const message = args.join(' ');
      
      if (
        message.includes('manifest.json') ||
        message.includes('github.dev/pf-signin') ||
        message.includes('WebSocket closed without opened') ||
        message.includes('failed to connect to websocket') ||
        message.includes('Access to manifest at') ||
        message.includes('CORS policy') ||
        message.includes('localhost:5175') ||
        message.includes('localhost:5174') ||
        message.includes('WebSocket connection to') ||
        message.includes('Error: WebSocket') ||
        message.includes('net::ERR_FAILED')
      ) {
        console.warn('🔇 Suppressed development error:', message);
        return;
      }
      
      originalConsoleError.apply(console, args);
    };

    // Override console.warn to also suppress WebSocket warnings
    const originalConsoleWarn = console.warn;
    console.warn = (...args) => {
      const message = args.join(' ');
      
      if (
        message.includes('WebSocket') ||
        message.includes('localhost:5175') ||
        message.includes('localhost:5174') ||
        message.includes('failed to connect')
      ) {
        console.info('🔇 Suppressed WebSocket warning:', message);
        return;
      }
      
      originalConsoleWarn.apply(console, args);
    };

    window.addEventListener('unhandledrejection', (event) => {
      const message = event.reason?.message || event.reason?.toString() || '';
      
      if (
        message.includes('WebSocket') || 
        message.includes('manifest') ||
        message.includes('localhost:5175') ||
        message.includes('localhost:5174') ||
        message.includes('CORS')
      ) {
        console.info('🔇 Suppressed unhandled rejection:', message);
        event.preventDefault();
      }
    });

    // Suppress network errors in the global error handler
    window.addEventListener('error', (event) => {
      const message = event.message || event.error?.message || '';
      
      if (
        message.includes('WebSocket') ||
        message.includes('localhost:5175') ||
        message.includes('localhost:5174') ||
        message.includes('manifest')
      ) {
        console.info('🔇 Suppressed global error:', message);
        event.preventDefault();
      }
    });

    console.log('🔇 Enhanced error suppression initialized for development');
  }
}
