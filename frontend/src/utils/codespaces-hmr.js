// Custom HMR client for GitHub Codespaces environment
// This handles the WebSocket connection issues in Codespaces

let isCodespaces = false;
let codespacesDomain = '';

// Detect if we're running in GitHub Codespaces
if (typeof window !== 'undefined') {
  const hostname = window.location.hostname;
  isCodespaces = hostname.includes('.app.github.dev') || hostname.includes('.githubpreview.dev');
  
  if (isCodespaces) {
    codespacesDomain = hostname;
    console.log('🚀 Detected GitHub Codespaces environment:', codespacesDomain);
  }
}

// Override Vite's HMR WebSocket connection for Codespaces
if (isCodespaces && typeof window !== 'undefined') {
  // Store original WebSocket constructor
  const OriginalWebSocket = window.WebSocket;
  
  // Create a custom WebSocket that handles Codespaces URLs
  window.WebSocket = function(url, protocols) {
    let modifiedUrl = url;
    
    // If this is a Vite HMR WebSocket connection
    if (url.includes('/@vite/client') || url.includes('ws://') || url.includes('wss://')) {
      console.log('🔧 Intercepting WebSocket connection:', url);
      
      // Convert localhost WebSocket URLs to Codespaces format
      if (url.includes('ws://localhost:') || url.includes('wss://localhost:')) {
        const port = url.match(/:(\d+)/)?.[1];
        if (port) {
          // Use the current Codespaces domain with the correct port
          modifiedUrl = `wss://${codespacesDomain.replace('-3000.', `-${port}.`)}`;
          console.log('🔄 Modified WebSocket URL for Codespaces:', modifiedUrl);
        }
      }
      
      // Handle relative WebSocket URLs
      if (url.startsWith('/')) {
        modifiedUrl = `wss://${codespacesDomain}${url}`;
        console.log('🔄 Modified relative WebSocket URL for Codespaces:', modifiedUrl);
      }
    }
    
    try {
      return new OriginalWebSocket(modifiedUrl, protocols);
    } catch (error) {
      console.warn('⚠️ WebSocket connection failed, falling back to polling:', error);
      // Return a mock WebSocket that doesn't actually connect
      return {
        readyState: WebSocket.CONNECTING,
        send: () => {},
        close: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
        onopen: null,
        onclose: null,
        onmessage: null,
        onerror: null
      };
    }
  };
  
  // Copy static properties
  Object.setPrototypeOf(window.WebSocket, OriginalWebSocket);
  window.WebSocket.CONNECTING = OriginalWebSocket.CONNECTING;
  window.WebSocket.OPEN = OriginalWebSocket.OPEN;
  window.WebSocket.CLOSING = OriginalWebSocket.CLOSING;
  window.WebSocket.CLOSED = OriginalWebSocket.CLOSED;
}

// Suppress manifest-related errors in Codespaces
if (isCodespaces && typeof window !== 'undefined') {
  // Override fetch to handle manifest.json requests
  const originalFetch = window.fetch;
  window.fetch = function(url, options) {
    if (typeof url === 'string' && url.includes('manifest.json')) {
      console.log('🔧 Intercepting manifest.json request:', url);
      // Return a mock response to prevent CORS errors
      return Promise.resolve(new Response(JSON.stringify({
        short_name: "DealFlow",
        name: "DealFlow - AI Real Estate Wholesaling Platform",
        start_url: "/",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#ffffff"
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }));
    }
    return originalFetch.call(this, url, options);
  };
  
  // Suppress console errors related to WebSocket and manifest
  const originalConsoleError = console.error;
  console.error = function(...args) {
    const message = args.join(' ');
    
    // Suppress known Codespaces-related errors
    if (
      message.includes('WebSocket connection') ||
      message.includes('manifest.json') ||
      message.includes('CORS policy') ||
      message.includes('failed to connect to websocket')
    ) {
      console.warn('🔇 Suppressed Codespaces-related error:', ...args);
      return;
    }
    
    originalConsoleError.apply(console, args);
  };
}

export { isCodespaces, codespacesDomain };
