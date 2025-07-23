# API Changes Documentation - Campaign & Client System Updates

This document outlines all the API changes made to support the new campaign types, lead types, client management, and wholesaler-only authentication system.

## Table of Contents
1. [Authentication Changes](#authentication-changes)
2. [Campaign API Updates](#campaign-api-updates)
3. [Lead API Updates](#lead-api-updates)
4. [New Client API](#new-client-api)
5. [Data Models](#data-models)
6. [Migration Guide](#migration-guide)

---

## Authentication Changes

### User Registration - BREAKING CHANGE
**Endpoint:** `POST /api/register`

**REMOVED FIELD:**
- `role` field is no longer accepted or required

**Updated Request Body:**
```json
{
  "email": "wholesaler@example.com",
  "password": "password123",
  "password_confirmation": "password123",
  "first_name": "John",
  "last_name": "Doe",
  "company_name": "ABC Wholesaling", // optional
  "phone": "+1234567890" // optional
}
```

**Response:** (unchanged)
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "uuid": "uuid-string",
    "email": "wholesaler@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "role": "wholesaler", // Always "wholesaler"
    // ... other user fields
  }
}
```

**Key Changes:**
- All new users automatically get `role: "wholesaler"`
- No other roles are supported
- Frontend should remove role selection from registration forms

---

## Campaign API Updates

### Campaign Types - BREAKING CHANGE
**Endpoints:** `POST /api/campaigns`, `PUT /api/campaigns/{id}`

**UPDATED VALIDATION:**
- `campaign_type` now only accepts: `"seller_finder"` or `"buyer_finder"`
- Old values (`lead_generation`, `nurture`, `follow_up`, `promotional`) are no longer valid

**Updated Request Body:**
```json
{
  "name": "Downtown Seller Campaign",
  "campaign_type": "seller_finder", // NEW: only "seller_finder" or "buyer_finder"
  "channel": "email", // unchanged: email, sms, voice, direct_mail
  "subject_line": "We Buy Houses Fast",
  "email_content": "Are you looking to sell your house quickly?",
  // ... other fields unchanged
}
```

**Frontend Updates Required:**
```javascript
// OLD campaign type options
const oldCampaignTypes = [
  { value: 'lead_generation', label: 'Lead Generation' },
  { value: 'nurture', label: 'Nurture' },
  { value: 'follow_up', label: 'Follow Up' },
  { value: 'promotional', label: 'Promotional' }
];

// NEW campaign type options
const newCampaignTypes = [
  { value: 'seller_finder', label: 'Seller Finder' },
  { value: 'buyer_finder', label: 'Buyer Finder' }
];
```

### Campaign Filtering
**Endpoint:** `GET /api/campaigns`

**Updated Query Parameters:**
```
GET /api/campaigns?campaign_type=seller_finder
GET /api/campaigns?campaign_type=buyer_finder
```

---

## Lead API Updates

### Lead Creation - BREAKING CHANGE
**Endpoint:** `POST /api/leads`

**NEW REQUIRED FIELD:**
- `lead_type` is now required: `"buyer"` or `"seller"`

**NEW OPTIONAL FIELD:**
- `client_id` (integer, optional) - Links lead to an existing client

**Updated Request Body:**
```json
{
  "lead_type": "seller", // NEW REQUIRED: "buyer" or "seller"
  "client_id": 123, // NEW OPTIONAL: link to existing client
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  // ... other fields unchanged
}
```

**Response includes new fields:**
```json
{
  "status": "success",
  "message": "Lead created successfully",
  "data": {
    "id": 1,
    "lead_type": "seller", // NEW
    "client_id": 123, // NEW (nullable)
    "client": { // NEW relationship (if client_id provided)
      "id": 123,
      "first_name": "Jane",
      "last_name": "Smith",
      "client_type": "seller"
    },
    // ... other lead fields
  }
}
```

### Lead Filtering - NEW
**Endpoint:** `GET /api/leads`

**New Query Parameters:**
```
GET /api/leads?lead_type=buyer
GET /api/leads?lead_type=seller
GET /api/leads?client_id=123
```

**Frontend Implementation:**
```javascript
// Lead type filter options
const leadTypeOptions = [
  { value: 'buyer', label: 'Buyer Leads' },
  { value: 'seller', label: 'Seller Leads' }
];

// API call examples
const fetchBuyerLeads = () => api.get('/leads?lead_type=buyer');
const fetchSellerLeads = () => api.get('/leads?lead_type=seller');
```

---

## New Client API

### Client Endpoints - NEW FEATURE
All client endpoints require authentication (`auth:sanctum` middleware).

#### List Clients
**Endpoint:** `GET /api/clients`

**Query Parameters:**
- `client_type` (optional): `"seller"` or `"buyer"`
- `status` (optional): `"prospect"`, `"active"`, `"closed"`, `"inactive"`
- `needs_followup` (optional): `true` or `false`
- `search` (optional): Search in name, email, phone
- `page` (optional): Page number for pagination
- `per_page` (optional): Items per page (default: 15)

**Request:**
```
GET /api/clients?client_type=seller&status=active&page=1&per_page=20
```

**Response:**
```json
{
  "status": "success",
  "message": "Clients retrieved successfully",
  "data": {
    "data": [
      {
        "id": 1,
        "uuid": "client-uuid",
        "client_type": "seller",
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@example.com",
        "phone": "+1234567890",
        "status": "active",
        "relationship_score": 85,
        "last_contact_at": "2025-01-15T10:30:00Z",
        "next_followup_at": "2025-01-20T09:00:00Z",
        "leads": [
          {
            "id": 1,
            "lead_type": "seller",
            "status": "qualified"
          }
        ],
        // ... other client fields
      }
    ],
    "meta": {
      "current_page": 1,
      "per_page": 20,
      "total": 150,
      "last_page": 8
    }
  }
}
```

#### Create Client
**Endpoint:** `POST /api/clients`

**Request Body:**
```json
{
  "client_type": "seller", // REQUIRED: "seller" or "buyer"
  "first_name": "John", // REQUIRED
  "last_name": "Doe", // REQUIRED
  "email": "john@example.com", // optional
  "phone": "+1234567890", // optional
  "alternate_phone": "+0987654321", // optional
  "date_of_birth": "1985-06-15", // optional
  "address": "123 Main St", // optional
  "city": "Anytown", // optional
  "state": "CA", // optional
  "zip": "12345", // optional
  "occupation": "Engineer", // optional
  "employer": "Tech Corp", // optional
  "annual_income": 75000.00, // optional
  "net_worth": 250000.00, // optional
  "liquid_assets": 50000.00, // optional
  "credit_score": 720, // optional (300-850)
  "has_financing_preapproval": true, // optional
  "financing_amount": 300000.00, // optional
  
  // For buyers only:
  "investment_criteria": { // optional
    "property_types": ["single_family", "duplex"],
    "min_price": 100000,
    "max_price": 500000,
    "preferred_locations": ["Downtown", "Suburbs"]
  },
  "investment_goals": { // optional
    "primary_goal": "rental",
    "target_roi": 15,
    "timeline": "60_days"
  },
  "investment_experience": "intermediate", // optional: beginner, intermediate, expert
  
  // For sellers only:
  "owned_properties": [ // optional
    {
      "address": "456 Oak St",
      "city": "Anytown",
      "property_type": "single_family",
      "estimated_value": 350000.00,
      "mortgage_balance": 200000.00
    }
  ],
  "selling_motivation": "Relocation", // optional
  "selling_timeline": "60 days", // optional
  
  // Common fields:
  "preferred_contact_method": "phone", // optional: phone, email, text
  "best_time_to_call": "Morning (8-12)", // optional
  "source": "referral", // optional
  "notes": "Very motivated seller", // optional
  "next_followup_at": "2025-01-20T09:00:00Z", // optional
  "tags": ["hot-lead", "qualified"] // optional array
}
```

#### Get Client
**Endpoint:** `GET /api/clients/{id}`

**Response:** Single client object with all fields and relationships.

#### Update Client
**Endpoint:** `PUT /api/clients/{id}`

**Request Body:** Same as create, but all fields are optional (use `sometimes` validation).

#### Delete Client
**Endpoint:** `DELETE /api/clients/{id}`

**Response:**
```json
{
  "status": "success",
  "message": "Client deleted successfully",
  "data": null
}
```

---

## Data Models

### Campaign Model Updates
```typescript
interface Campaign {
  id: number;
  user_id: number;
  name: string;
  campaign_type: 'seller_finder' | 'buyer_finder'; // UPDATED
  channel: 'email' | 'sms' | 'voice' | 'direct_mail';
  // ... other existing fields
}
```

### Lead Model Updates
```typescript
interface Lead {
  id: number;
  user_id: number;
  lead_type: 'buyer' | 'seller'; // NEW
  client_id?: number; // NEW (nullable)
  uuid: string;
  first_name: string;
  last_name: string;
  // ... other existing fields
  
  // NEW relationships
  client?: Client; // When client_id is present
}
```

### Client Model - NEW
```typescript
interface Client {
  id: number;
  uuid: string;
  user_id: number;
  client_type: 'seller' | 'buyer';
  
  // Personal Information
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  alternate_phone?: string;
  date_of_birth?: string; // ISO date
  
  // Address Information
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country: string; // defaults to "USA"
  
  // Professional Information
  occupation?: string;
  employer?: string;
  annual_income?: number;
  
  // Financial Information
  net_worth?: number;
  liquid_assets?: number;
  credit_score?: number; // 300-850
  has_financing_preapproval: boolean;
  financing_amount?: number;
  
  // Investment Profile (buyers)
  investment_criteria?: {
    property_types?: string[];
    min_price?: number;
    max_price?: number;
    preferred_locations?: string[];
    min_bedrooms?: number;
    min_bathrooms?: number;
    condition_preference?: string;
  };
  investment_goals?: {
    primary_goal?: string;
    target_roi?: number;
    timeline?: string;
    cash_available?: number;
  };
  investment_experience?: 'beginner' | 'intermediate' | 'expert';
  
  // Property Ownership (sellers)
  owned_properties?: Array<{
    address: string;
    city: string;
    state: string;
    property_type: string;
    estimated_value: number;
    mortgage_balance: number;
    rental_income?: number;
  }>;
  selling_motivation?: string;
  selling_timeline?: string;
  
  // Communication
  preferred_contact_method: 'phone' | 'email' | 'text';
  best_time_to_call?: string;
  communication_notes?: Record<string, any>;
  
  // Relationship Management
  status: 'prospect' | 'active' | 'closed' | 'inactive';
  source?: string;
  notes?: string;
  relationship_score: number; // 0-100
  last_contact_at?: string; // ISO datetime
  next_followup_at?: string; // ISO datetime
  
  // Metadata
  custom_fields?: Record<string, any>;
  tags?: string[];
  
  // Timestamps
  created_at: string;
  updated_at: string;
  
  // Relationships
  leads?: Lead[];
  user?: User;
}
```

---

## Migration Guide

### Frontend Changes Required

#### 1. Update Campaign Forms
```javascript
// Remove old campaign type options
// Add new campaign type options
const campaignTypes = [
  { value: 'seller_finder', label: 'Seller Finder Campaign' },
  { value: 'buyer_finder', label: 'Buyer Finder Campaign' }
];
```

#### 2. Update Lead Forms
```javascript
// Add lead type selection (required)
const leadTypes = [
  { value: 'buyer', label: 'Buyer Lead' },
  { value: 'seller', label: 'Seller Lead' }
];

// Add optional client selection
const handleLeadSubmit = (formData) => {
  const payload = {
    ...formData,
    lead_type: formData.lead_type, // Required
    client_id: formData.client_id || null // Optional
  };
  
  api.post('/leads', payload);
};
```

#### 3. Remove Role Selection from Registration
```javascript
// Remove role field from registration form
const registrationFields = [
  'email',
  'password',
  'password_confirmation',
  'first_name',
  'last_name',
  'company_name', // optional
  'phone' // optional
  // Remove: 'role'
];
```

#### 4. Add Client Management
```javascript
// New client management pages/components needed:
// - ClientList component
// - ClientForm component (create/edit)
// - ClientDetail component
// - Client filtering and search
// - Client-Lead relationship management

// Example API service methods:
const clientService = {
  getClients: (filters = {}) => api.get('/clients', { params: filters }),
  createClient: (data) => api.post('/clients', data),
  getClient: (id) => api.get(`/clients/${id}`),
  updateClient: (id, data) => api.put(`/clients/${id}`, data),
  deleteClient: (id) => api.delete(`/clients/${id}`)
};
```

#### 5. Update Navigation/Routing
```javascript
// Add new routes for client management
const routes = [
  // ... existing routes
  { path: '/clients', component: ClientList },
  { path: '/clients/create', component: ClientForm },
  { path: '/clients/:id', component: ClientDetail },
  { path: '/clients/:id/edit', component: ClientForm }
];

// Update navigation menu
const navigationItems = [
  // ... existing items
  { label: 'Clients', path: '/clients', icon: 'users' },
  { label: 'Seller Clients', path: '/clients?client_type=seller' },
  { label: 'Buyer Clients', path: '/clients?client_type=buyer' }
];
```

### Error Handling Updates

#### New Validation Errors
```javascript
// Handle new validation errors
const handleApiError = (error) => {
  if (error.response?.data?.errors) {
    const errors = error.response.data.errors;
    
    // New possible validation errors:
    if (errors.lead_type) {
      // Handle lead_type validation error
    }
    if (errors.client_type) {
      // Handle client_type validation error
    }
    if (errors.campaign_type) {
      // Handle updated campaign_type validation error
    }
  }
};
```

### Testing Checklist

- [ ] Registration works without role field
- [ ] Campaign creation with new campaign types
- [ ] Campaign filtering by new types
- [ ] Lead creation with required lead_type
- [ ] Lead filtering by lead_type
- [ ] Client CRUD operations
- [ ] Client filtering and search
- [ ] Client-Lead relationship linking
- [ ] All existing functionality still works
- [ ] Error handling for new validation rules

---

## Summary of Breaking Changes

1. **Campaign Types**: Only `seller_finder` and `buyer_finder` are valid
2. **Lead Creation**: `lead_type` field is now required
3. **User Registration**: `role` field removed, all users are wholesalers
4. **New Client API**: Entirely new endpoint set for client management

## New Features Added

1. **Client Management**: Complete CRUD API for managing seller/buyer clients
2. **Lead-Client Linking**: Leads can be associated with clients
3. **Enhanced Filtering**: New filtering options for campaigns and leads
4. **Relationship Management**: Client relationship scoring and follow-up tracking

This documentation should provide the frontend developer with all the information needed to implement the new features and update existing functionality.
