import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

// Store
import { store } from './store/store';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { Web3Provider } from './contexts/Web3Context';
import { PsychologyProvider } from './contexts/PsychologyContext';
import { AIProvider } from './contexts/AIContext';

// Components
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import LoadingSpinner from './components/UI/LoadingSpinner';

// Pages
import LandingPage from './pages/Landing/LandingPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import Dashboard from './pages/Dashboard/Dashboard';
import LeadsPage from './pages/Leads/LeadsPage';
import PropertiesPage from './pages/Properties/PropertiesPage';
import DealsPage from './pages/Deals/DealsPage';
import MarketplacePage from './pages/Marketplace/MarketplacePage';
import CampaignsPage from './pages/Campaigns/CampaignsPage';
import AIAssistantPage from './pages/AI/AIAssistantPage';
import BlockchainPage from './pages/Blockchain/BlockchainPage';
import AnalyticsPage from './pages/Analytics/AnalyticsPage';
import ProfilePage from './pages/Profile/ProfilePage';
import SettingsPage from './pages/Settings/SettingsPage';
import WhiteLabelPage from './pages/WhiteLabel/WhiteLabelPage';
import PsychologyDashboard from './pages/Psychology/PsychologyDashboard';

// Styles
import './index.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Web3Provider>
          <AuthProvider>
            <PsychologyProvider>
              <AIProvider>
                <Router>
                  <div className="App min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
                    <AnimatePresence mode="wait">
                      <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        
                        {/* Protected Routes */}
                        <Route path="/app" element={
                          <ProtectedRoute>
                            <Layout />
                          </ProtectedRoute>
                        }>
                          <Route index element={<Navigate to="/app/dashboard" replace />} />
                          <Route path="dashboard" element={<Dashboard />} />
                          <Route path="leads" element={<LeadsPage />} />
                          <Route path="properties" element={<PropertiesPage />} />
                          <Route path="deals" element={<DealsPage />} />
                          <Route path="marketplace" element={<MarketplacePage />} />
                          <Route path="campaigns" element={<CampaignsPage />} />
                          <Route path="ai-assistant" element={<AIAssistantPage />} />
                          <Route path="blockchain" element={<BlockchainPage />} />
                          <Route path="analytics" element={<AnalyticsPage />} />
                          <Route path="psychology" element={<PsychologyDashboard />} />
                          <Route path="profile" element={<ProfilePage />} />
                          <Route path="settings" element={<SettingsPage />} />
                          <Route path="white-label" element={<WhiteLabelPage />} />
                        </Route>

                        {/* Catch all route */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </AnimatePresence>

                    {/* Global Toast Notifications */}
                    <Toaster
                      position="top-right"
                      toastOptions={{
                        duration: 4000,
                        style: {
                          background: 'rgba(15, 23, 42, 0.95)',
                          color: '#fff',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          backdropFilter: 'blur(10px)',
                        },
                        success: {
                          iconTheme: {
                            primary: '#10b981',
                            secondary: '#fff',
                          },
                        },
                        error: {
                          iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                          },
                        },
                      }}
                    />

                    {/* Global Loading Overlay */}
                    <LoadingSpinner />
                  </div>
                </Router>
              </AIProvider>
            </PsychologyProvider>
          </AuthProvider>
        </Web3Provider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
