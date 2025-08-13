// Updated services/api.js with CSRF token support
import axios from "axios";

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? `${import.meta.env.VITE_API_HOST}/api` || `/api`
    : `${import.meta.env.VITE_API_HOST}/api` ||
      "https://develop.monorepo-backend.dealflow.pro.kurious.dev/api";

// Get the base URL without /api for CSRF cookie requests
const BASE_URL = API_BASE_URL.replace("/api", "");

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

// Function to get CSRF token. This should be called before making any state-changing requests.
export const getCsrfToken = async () => {
  try {
    // Use axios directly instead of the api instance to avoid the /api prefix
    await axios.get(`${BASE_URL}/sanctum/csrf-cookie`, {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    console.log("CSRF cookie fetched successfully.");
  } catch (error) {
    console.error("Failed to fetch CSRF cookie:", error);
  }
};

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 Unauthorized errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
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
  getAllUsers: () => api.get("/users"),

  invite: (data) => api.post("/invitations", data),
  getInvitation: (invitationtoken) =>
    api.get(`/validate-invitation?token=${invitationtoken}`),
  inviteeRegister: (userData) => api.post("/invitee-register", userData),
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
export const TenantAPI = {
  getTenants: (params) => api.get("/tenant", { params }),
  getTenant: (id) => api.get(`/tenant/${id}`),
  createTenant: (data) => api.post("/tenant", data),
  updateTenant: (id, data) => api.put(`/tenant/${id}`, data),
  deleteTenant: (id) => api.delete(`/tenant/${id}`),
};
export const OrganizationAPI = {
  getOrganizationStatus: () => api.get(`/organizations/status`),
  getOrganization: () => api.get(`/organizations`),
  UpdateOrganization: (id, data) => api.put(`/organizations/${id}`, data),
};

export const RbacAPI = {
  getRoles: () => api.get("/rbac/roles"),
  getPermissions: () => api.get("/rbac/permissions"),
  UpdatePermission: (id, data) => api.put(`/rbac/roles/${role}`, data),
  UpdateRole: (data) => api.put(`users/${data.id}/roles`, data),
};
export const PaymentAPI = {
  getSubscriptionPack: () => api.get(`/subscription-packs`),
  createCheckout: (id) => api.post(`/create-checkout-session`, id),
  createCustomerPortal: () => api.post(`/create-customer-portal-session`),
  getTransactionList: () => api.post(`/stripe-invoice`),
  getCurrentPack: () => api.get(`/current-subscription`),
};

export default api;
