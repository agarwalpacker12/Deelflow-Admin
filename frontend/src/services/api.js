// Updated services/api.js with CSRF token support
import axios from "axios";

const API_BASE_URL = process.env.NODE_ENV === 'development'
  ? (import.meta.env.VITE_API_URL || `/api`)
  : (import.meta.env.VITE_API_URL || 'https://develop.monorepo-backend.dealflow.pro.kurious.dev/api');

// Get the base URL without /api for CSRF cookie requests
const BASE_URL = API_BASE_URL.replace('/api', '');

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important: This ensures cookies are sent with requests
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest", // Required for Laravel to recognize as AJAX
  },
});

// Function to get CSRF token from cookies
const getCsrfToken = () => {
  const name = 'XSRF-TOKEN';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop().split(';').shift());
  }
  return null;
};

// Function to fetch CSRF cookie
const fetchCsrfCookie = async () => {
  try {
    await axios.get(`${BASE_URL}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error('Failed to fetch CSRF cookie:', error);
  }
};

// Request interceptor to add auth token, CSRF token, and debug
api.interceptors.request.use(
  async (config) => {
    // Add Bearer token if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // For state-changing requests (POST, PUT, PATCH, DELETE), ensure CSRF token is available
    if (['post', 'put', 'patch', 'delete'].includes(config.method.toLowerCase())) {
      let csrfToken = getCsrfToken();
      
      // If no CSRF token found, fetch it first
      if (!csrfToken) {
        await fetchCsrfCookie();
        csrfToken = getCsrfToken();
      }
      
      // Add CSRF token to headers
      if (csrfToken) {
        config.headers['X-XSRF-TOKEN'] = csrfToken;
      }
    }

    // Debug logging
    console.log("API Request:", {
      method: config.method,
      url: config.url,
      baseURL: config.baseURL,
      headers: config.headers,
      data: config.data,
    });

    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors and debug
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data,
    });
    return response;
  },
  async (error) => {
    console.error("API Error:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      headers: error.response?.headers,
      data: error.response?.data,
      message: error.message,
    });

    // Handle CSRF token mismatch (419 status)
    if (error.response?.status === 419) {
      console.log("CSRF token mismatch, refreshing token and retrying...");
      await fetchCsrfCookie();
      
      // Retry the original request
      const originalRequest = error.config;
      const csrfToken = getCsrfToken();
      if (csrfToken) {
        originalRequest.headers['X-XSRF-TOKEN'] = csrfToken;
      }
      return api.request(originalRequest);
    }

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post("/login", credentials),
  register: (userData) => api.post("/register", userData),
  logout: () => api.post("/logout"),
  getCurrentUser: () => api.get("/user"),
};

// Rest of your APIs...
export const leadsAPI = {
  getLeads: (params) => api.get("/leads", { params }),
  getLead: (id) => api.get(`/leads/${id}`),
  createLead: (data) => api.post("/leads", data),
  updateLead: (id, data) => api.put(`/leads/${id}`, data),
  deleteLead: (id) => api.delete(`/leads/${id}`),
  getAIScore: (id) => api.get(`/leads/${id}/ai-score`),
};

export const propertiesAPI = {
  getProperties: (params) => api.get("/properties", { params }),
  getProperty: (id) => api.get(`/properties/${id}`),
  createProperty: (data) => api.post("/properties", data),
  updateProperty: (id, data) => api.put(`/properties/${id}`, data),
  deleteProperty: (id) => api.delete(`/properties/${id}`),
  getAIAnalysis: (id) => api.get(`/properties/${id}/ai-analysis`),
};

export const dealsAPI = {
  getDeals: (params) => api.get("/deals", { params }),
  getDeal: (id) => api.get(`/deals/${id}`),
  createDeal: (data) => api.post("/deals", data),
  updateDeal: (id, data) => api.put(`/deals/${id}`, data),
  deleteDeal: (id) => api.delete(`/deals/${id}`),
  getMilestones: (id) => api.get(`/deals/${id}/milestones`),
};

export const dealMilestonesAPI = {
  getMilestones: (params) => api.get("/deal-milestones", { params }),
  getMilestone: (id) => api.get(`/deal-milestones/${id}`),
  createMilestone: (data) => api.post("/deal-milestones", data),
  updateMilestone: (id, data) => api.put(`/deal-milestones/${id}`, data),
  deleteMilestone: (id) => api.delete(`/deal-milestones/${id}`),
  completeMilestone: (id) => api.patch(`/deal-milestones/${id}/complete`),
};

export const campaignsAPI = {
  getCampaigns: (params) => api.get("/campaigns", { params }),
  getCampaign: (id) => api.get(`/campaigns/${id}`),
  createCampaign: (data) => api.post("/campaigns", data),
  updateCampaign: (id, data) => api.put(`/campaigns/${id}`, data),
  deleteCampaign: (id) => api.delete(`/campaigns/${id}`),
  getRecipients: (id) => api.get(`/campaigns/${id}/recipients`),
};

export const propertySaveAPI = {
  getPropertySave: (params) => api.get("/property-saves", { params }),
  getSinglePropertySave: (id) => api.get(`/property-saves/${id}`),
  createPropertySave: (data) => api.post("/property-saves", data),
  updatePropertySave: (id, data) => api.put(`/property-saves/${id}`, data),
  deletePropertySave: (id) => api.delete(`/property-saves/${id}`),
};

// Export CSRF functions for use in app initialization
export { fetchCsrfCookie, getCsrfToken };

export default api;
