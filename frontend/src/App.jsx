import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

// Store
import { store } from "./store/store";

// Contexts
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { Web3Provider } from "./contexts/Web3Context.jsx";
import { PsychologyProvider } from "./contexts/PsychologyContext.jsx";
import { AIProvider } from "./contexts/AIContext.jsx";

// Components
import Layout from "./components/Layout/Layout.jsx";
import ProtectedRoute from "./components/Auth/ProtectedRoute.jsx";
import LoadingSpinner from "./components/UI/LoadingSpinner.jsx";

// Pages
import LandingPage from "./pages/Landing/LandingPage.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import RegisterPage from "./pages/Auth/RegisterPage.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import LeadsPage from "./pages/Leads/LeadsPage.jsx";
import PropertiesPage from "./pages/Properties/PropertiesPage.jsx";
import DealsPage from "./pages/Deals/DealsPage.jsx";
import MarketplacePage from "./pages/Marketplace/MarketplacePage.jsx";
import CampaignsPage from "./pages/Campaigns/CampaignsPage.jsx";
import AIAssistantPage from "./pages/AI/AIAssistantPage.jsx";
import BlockchainPage from "./pages/Blockchain/BlockchainPage.jsx";
import AnalyticsPage from "./pages/Analytics/AnalyticsPage.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";
import SettingsPage from "./pages/Settings/SettingsPage.jsx";
import WhiteLabelPage from "./pages/WhiteLabel/WhiteLabelPage.jsx";
import PsychologyDashboard from "./pages/Psychology/PsychologyDashboard.jsx";

// Styles
import "./index.css";
import AddLead from "./pages/Leads/add/index.jsx";
import EditLead from "./pages/Leads/edit/index.jsx";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
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
                        <Route
                          path="/app"
                          element={
                            <ProtectedRoute>
                              <Layout />
                            </ProtectedRoute>
                          }
                        >
                          <Route
                            index
                            element={<Navigate to="/app/dashboard" replace />}
                          />
                          <Route path="dashboard" element={<Dashboard />} />
                          <Route path="leads" element={<LeadsPage />} />
                          <Route path="leads/add" element={<AddLead />} />
                          <Route path="leads/edit" element={<EditLead />} />

                          <Route
                            path="properties"
                            element={<PropertiesPage />}
                          />
                          <Route path="deals" element={<DealsPage />} />
                          <Route
                            path="marketplace"
                            element={<MarketplacePage />}
                          />
                          <Route path="campaigns" element={<CampaignsPage />} />
                          <Route
                            path="ai-assistant"
                            element={<AIAssistantPage />}
                          />
                          <Route
                            path="blockchain"
                            element={<BlockchainPage />}
                          />
                          <Route path="analytics" element={<AnalyticsPage />} />
                          <Route
                            path="psychology"
                            element={<PsychologyDashboard />}
                          />
                          <Route path="profile" element={<ProfilePage />} />
                          <Route path="settings" element={<SettingsPage />} />
                          <Route
                            path="white-label"
                            element={<WhiteLabelPage />}
                          />
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
                          background: "rgba(15, 23, 42, 0.95)",
                          color: "#fff",
                          border: "1px solid rgba(59, 130, 246, 0.3)",
                          backdropFilter: "blur(10px)",
                        },
                        success: {
                          iconTheme: {
                            primary: "#10b981",
                            secondary: "#fff",
                          },
                        },
                        error: {
                          iconTheme: {
                            primary: "#ef4444",
                            secondary: "#fff",
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
