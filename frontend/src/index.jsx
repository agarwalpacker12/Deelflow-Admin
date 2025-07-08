import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { initializeErrorSuppression } from './utils/errorSuppression.js';

// Initialize Codespaces HMR fixes FIRST (before Vite's HMR client loads)
if (import.meta.env.DEV) {
  import('./utils/codespaces-hmr.js');
}

// Initialize error suppression for development environment
initializeErrorSuppression();

// Initialize custom HMR client for Codespaces
if (import.meta.env.DEV) {
  import('../vite-hmr-client.js');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
