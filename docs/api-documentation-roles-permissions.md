# Role and Permission Management API Documentation

This document outlines all the role and permission management APIs available in the application, including both Super Admin and Organization Admin endpoints.

## Overview

The application implements a two-tier role and permission management system:

1. **Super Admin Level**: Cross-organization management (prefix: `/api/super/`)
2. **Organization Admin Level**: Organization-scoped management (prefix: `/api/admin/`)

## Authentication & Authorization

All endpoints require authentication via Sanctum token in the Authorization header:
```
Authorization: Bearer {token}
```

### Super Admin Access
- Super Admin endpoints require the user's email to match the configured super admin email
- Super Admin can manage users, roles, and permissions across all organizations
- Access is controlled by the `super_admin` middleware

### Organization Admin Access
- Organization Admin endpoints require the `admin` role within the user's organization
- Organization Admins can only manage users within their own organization
- Access is controlled by the `role:admin` middleware

## RBAC (Role-Based Access Control) Endpoints

### 1. Get Roles

**GET** `/api/rbac/roles`

Retrieves roles with their assigned permissions based on user type:
- **Super Admin**: Returns all roles with their permissions
- **Organization Admin**: Returns all roles except super admin role with their permissions

**Response:**

**For Super Admin:**
```json
{
  "status": "success",
  "message": "Roles retrieved successfully",
  "data": {
    "roles": [
      {
        "id": 1,
        "name": "admin",
        "label": "Administrator",
        "organization_id": 1,
        "users_count": 5,
        "permissions": [
          {
            "id": 1,
            "name": "manage_roles",
            "label": "Manage Roles"
          },
          {
            "id": 2,
            "name": "manage_client",
            "label": "Manage Clients"
          },
          {
            "id": 3,
            "name": "manage_campaign",
            "label": "Manage Campaigns"
          }
        ],
        "created_at": "2025-08-11T09:00:00.000000Z",
        "updated_at": "2025-08-11T09:00:00.000000Z"
      },
      {
        "id": 2,
        "name": "staff",
        "label": "Staff",
        "organization_id": 1,
        "users_count": 12,
        "permissions": [
          {
            "id": 4,
            "name": "manage_lead",
            "label": "Manage Leads"
          },
          {
            "id": 5,
            "name": "manage_properties",
            "label": "Manage Properties"
          }
        ],
        "created_at": "2025-08-11T09:00:00.000000Z",
        "updated_at": "2025-08-11T09:00:00.000000Z"
      }
    ],
    "total_roles": 10
  }
}
```

**For Organization Admin:**
```json
{
  "status": "success",
  "message": "Roles retrieved successfully",
  "data": {
    "roles": [
      {
        "id": 1,
        "name": "admin",
        "label": "Administrator",
        "organization_id": 1,
        "permissions": [
          {
            "id": 1,
            "name": "manage_roles",
            "label": "Manage Roles"
          },
          {
            "id": 2,
            "name": "manage_client",
            "label": "Manage Clients"
          },
          {
            "id": 3,
            "name": "manage_campaign",
            "label": "Manage Campaigns"
          }
        ],
        "created_at": "2025-08-11T09:00:00.000000Z",
        "updated_at": "2025-08-11T09:00:00.000000Z"
      },
      {
        "id": 2,
        "name": "staff",
        "label": "Staff",
        "organization_id": 2,
        "permissions": [
          {
            "id": 4,
            "name": "manage_lead",
            "label": "Manage Leads"
          },
          {
            "id": 5,
            "name": "manage_properties",
            "label": "Manage Properties"
          }
        ],
        "created_at": "2025-08-11T09:00:00.000000Z",
        "updated_at": "2025-08-11T09:00:00.000000Z"
      }
    ],
    "total_roles": 8
  }
}
```

**Note:** Organization Admin response excludes any `super_admin` roles and their permissions for security reasons.

### 2. Get Permissions (Super Admin Only)

**GET** `/api/rbac/permissions`

Retrieves all permissions with their associated roles. This endpoint is only accessible by super admin users.

**Access:** Super Admin only

**Response:**
```json
{
  "status": "success",
  "message": "Permissions retrieved successfully",
  "data": {
    "permissions": [
      {
        "id": 1,
        "name": "manage_roles",
        "label": "Manage Roles",
        "roles": [
          {
            "id": 1,
            "name": "admin",
            "label": "Administrator",
            "organization_id": 1
          },
          {
            "id": 3,
            "name": "admin",
            "label": "Administrator",
            "organization_id": 2
          }
        ],
        "created_at": "2025-08-11T09:00:00.000000Z",
        "updated_at": "2025-08-11T09:00:00.000000Z"
      },
      {
        "id": 2,
        "name": "manage_client",
        "label": "Manage Clients",
        "roles": [
          {
            "id": 1,
            "name": "admin",
            "label": "Administrator",
            "organization_id": 1
          },
          {
            "id": 2,
            "name": "staff",
            "label": "Staff",
            "organization_id": 1
          }
        ],
        "created_at": "2025-08-11T09:00:00.000000Z",
        "updated_at": "2025-08-11T09:00:00.000000Z"
      }
    ],
    "total_permissions": 6
  }
}
```

**Error Response (Non-Super Admin):**
```json
{
  "status": "error",
  "message": "Access denied. You need super admin privileges to access permissions data.",
  "error_code": "FORBIDDEN"
}
```

### 3. Update Role Permissions (Super Admin Only)

**PUT** `/api/rbac/roles/{role}`

Updates the permissions assigned to a specific role. This endpoint is only accessible by super admin users.

**Access:** Super Admin only

**Request Body:**
```json
{
  "permissions": ["manage_roles", "manage_client", "manage_campaign"]
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Role permissions updated successfully",
  "data": {
    "role_id": 1,
    "role_name": "admin",
    "role_label": "Administrator",
    "organization_id": 1,
    "permissions": [
      {
        "id": 1,
        "name": "manage_roles",
        "label": "Manage Roles"
      },
      {
        "id": 2,
        "name": "manage_client",
        "label": "Manage Clients"
      },
      {
        "id": 3,
        "name": "manage_campaign",
        "label": "Manage Campaigns"
      }
    ],
    "updated_at": "2025-08-11T09:00:00.000000Z"
  }
}
```

**Error Response (Non-Super Admin):**
```json
{
  "status": "error",
  "message": "Access denied. You need super admin privileges to update role permissions.",
  "error_code": "FORBIDDEN"
}
```

**Error Response (Invalid Permissions):**
```json
{
  "status": "error",
  "message": "Some permissions do not exist in the role's organization",
  "error_code": "INVALID_PERMISSIONS",
  "details": {
    "requested_permissions": ["invalid_permission"],
    "organization_id": 1
  },
  "suggestions": [
    "Ensure all permissions exist in the role's organization",
    "Check permission names for typos"
  ]
}
```

**Validation Error Response:**
```json
{
  "status": "error",
  "message": "Validation failed for updating role permissions",
  "error_code": "VALIDATION_ERROR",
  "errors": [
    "The permissions field is required.",
    "The permissions.0 field must be a string."
  ]
}
```

## Default Roles and Permissions

### Default Roles
- **admin**: Full access to all permissions within the organization
- **staff**: Limited access (manage_lead, manage_properties, manage_campaign)

### Default Permissions
- `manage_roles`: Manage Roles and Permissions
- `manage_client`: Manage Clients
- `manage_campaign`: Manage Campaigns
- `manage_org`: Manage Organization
- `manage_lead`: Manage Leads
- `manage_properties`: Manage Properties

## Error Responses

### Validation Errors
```json
{
  "status": "error",
  "message": "Validation failed for updating user roles",
  "error_code": "VALIDATION_ERROR",
  "errors": [
    "The roles field is required.",
    "The roles.0 field must be a string."
  ]
}
```

### Authorization Errors
```json
{
  "status": "error",
  "message": "Access denied. Super admin privileges required.",
  "error_code": "FORBIDDEN"
}
```

### Business Logic Errors
```json
{
  "status": "error",
  "message": "Some roles do not exist in the user's organization",
  "error_code": "INVALID_ROLES",
  "details": {
    "requested_roles": ["invalid_role"],
    "organization_id": 1
  },
  "suggestions": [
    "Ensure all roles exist in the user's organization",
    "Check role names for typos"
  ]
}
```

## Security Features

1. **Organization Isolation**: Users can only manage resources within their organization
2. **Super Admin Protection**: Super admin access is restricted to configured email
3. **Role-based Access**: Different access levels for super admin vs organization admin
4. **Permission Validation**: All role and permission assignments are validated against organization scope
5. **Cross-organization Prevention**: Built-in checks prevent cross-organization access

## Rate Limiting

All endpoints are subject to rate limiting:
- Authenticated users: 1000 requests per hour
- Unauthenticated users: 100 requests per hour

Rate limit headers are included in responses:
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Reset timestamp
