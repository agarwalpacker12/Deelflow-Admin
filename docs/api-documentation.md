# API Documentation

## Introduction

This document provides detailed information about the API endpoints for the Real Estate Wholesaling Platform. The API follows RESTful conventions and returns JSON responses.

## Authentication

This API uses Sanctum authentication. You need to obtain an API token to access the protected endpoints.

### Base URL
```
https://api.dealflow.com/api
```

### Authentication Headers
```
Authorization: Bearer {your-api-token}
Content-Type: application/json
Accept: application/json
```

## Users API

### Register User

*   **Description:** Registers a new user with comprehensive profile information.
*   **Method:** POST
*   **Endpoint:** `/api/register`
*   **Request:**

    ```json
    {
        "email": "user@example.com",
        "password": "password",
        "password_confirmation": "password",
        "first_name": "John",
        "last_name": "Doe",
        "company_name": "Real Estate Ventures LLC",
        "phone": "+14155552671",
        "role": "wholesaler"
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "User registered successfully",
        "data": {
            "id": 1,
            "uuid": "550e8400-e29b-41d4-a716-446655440000",
            "email": "user@example.com",
            "first_name": "John",
            "last_name": "Doe",
            "company_name": "Real Estate Ventures LLC",
            "phone": "+14155552671",
            "role": "wholesaler",
            "level": 1,
            "points": 0,
            "subscription_tier": "starter",
            "subscription_status": "active",
            "is_verified": false,
            "is_active": true,
            "created_at": "2025-06-26T20:00:00.000000Z",
            "updated_at": "2025-06-26T20:00:00.000000Z"
        }
    }
    ```

### Login User

*   **Description:** Authenticates a user and returns an API token.
*   **Method:** POST
*   **Endpoint:** `/api/login`
*   **Request:**

    ```json
    {
        "email": "user@example.com",
        "password": "password"
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "User logged in successfully",
        "data": {
            "token": "1|abcdef123456789",
            "user": {
                "id": 1,
                "uuid": "550e8400-e29b-41d4-a716-446655440000",
                "email": "user@example.com",
                "first_name": "John",
                "last_name": "Doe",
                "role": "wholesaler"
            }
        }
    }
    ```

### Get Current User

*   **Description:** Retrieves the authenticated user's profile information.
*   **Method:** GET
*   **Endpoint:** `/api/user`
*   **Headers:** `Authorization: Bearer {token}`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "User retrieved successfully",
        "data": {
            "id": 1,
            "uuid": "550e8400-e29b-41d4-a716-446655440000",
            "email": "user@example.com",
            "first_name": "John",
            "last_name": "Doe",
            "company_name": "Real Estate Ventures LLC",
            "phone": "+14155552671",
            "role": "wholesaler",
            "level": 1,
            "points": 0,
            "subscription_tier": "starter",
            "subscription_status": "active",
            "is_verified": false,
            "is_active": true,
            "created_at": "2025-06-26T20:00:00.000000Z",
            "updated_at": "2025-06-26T20:00:00.000000Z"
        }
    }
    ```

### Logout User

*   **Description:** Logs out the authenticated user and invalidates the token.
*   **Method:** POST
*   **Endpoint:** `/api/logout`
*   **Headers:** `Authorization: Bearer {token}`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "User logged out successfully"
    }
    ```

## Leads API

### List Leads

*   **Description:** Retrieves a paginated list of leads with filtering options.
*   **Method:** GET
*   **Endpoint:** `/api/leads`
*   **Query Parameters:**
    - `page` (integer): Page number for pagination
    - `per_page` (integer): Number of items per page (max 100)
    - `status` (string): Filter by lead status
    - `ai_score_min` (integer): Minimum AI score filter
    - `search` (string): Search in names, email, or address

*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Leads retrieved successfully",
        "data": [
            {
                "id": 1,
                "uuid": "550e8400-e29b-41d4-a716-446655440001",
                "user_id": 1,
                "first_name": "Jane",
                "last_name": "Smith",
                "email": "jane.smith@example.com",
                "phone": "+14155552671",
                "property_address": "123 Main St",
                "property_city": "Austin",
                "property_state": "TX",
                "property_zip": "78701",
                "property_type": "single_family",
                "ai_score": 85,
                "motivation_score": 90,
                "urgency_score": 75,
                "financial_score": 80,
                "source": "website_form",
                "estimated_value": 250000.00,
                "mortgage_balance": 180000.00,
                "asking_price": 220000.00,
                "status": "qualified",
                "preferred_contact_method": "phone",
                "next_action": "Schedule property visit",
                "next_action_date": "2025-06-28",
                "created_at": "2025-06-26T20:00:00.000000Z",
                "updated_at": "2025-06-26T20:00:00.000000Z"
            }
        ],
        "meta": {
            "current_page": 1,
            "per_page": 10,
            "total": 1,
            "last_page": 1
        }
    }
    ```

### Create Lead

*   **Description:** Creates a new lead with comprehensive information.
*   **Method:** POST
*   **Endpoint:** `/api/leads`
*   **Request:**

    ```json
    {
        "first_name": "Jane",
        "last_name": "Smith",
        "email": "jane.smith@example.com",
        "phone": "+14155552671",
        "property_address": "123 Main St",
        "property_city": "Austin",
        "property_state": "TX",
        "property_zip": "78701",
        "property_type": "single_family",
        "source": "website_form",
        "estimated_value": 250000.00,
        "mortgage_balance": 180000.00,
        "asking_price": 220000.00,
        "preferred_contact_method": "phone"
    }
    ```
*   **Field Restrictions:**
    - `property_type`: Allowed values are `single_family`, `townhouse`, `condo`, `duplex`, `multi_family`, `mobile_home`.
    - `preferred_contact_method`: Allowed values are `phone`, `email`, `text`.
    - `status`: Allowed values are `new`, `contacted`, `qualified`, `negotiating`, `contract`, `closed`, `dead`.
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Lead created successfully",
        "data": {
            "id": 2,
            "uuid": "550e8400-e29b-41d4-a716-446655440005",
            "user_id": 1,
            "first_name": "Jane",
            "last_name": "Smith",
            "email": "jane.smith@example.com",
            "phone": "+14155552671",
            "property_address": "123 Main St",
            "property_city": "Austin",
            "property_state": "TX",
            "property_zip": "78701",
            "property_type": "single_family",
            "ai_score": 0,
            "motivation_score": 0,
            "urgency_score": 0,
            "financial_score": 0,
            "source": "website_form",
            "estimated_value": 250000.00,
            "mortgage_balance": 180000.00,
            "asking_price": 220000.00,
            "status": "new",
            "preferred_contact_method": "phone",
            "next_action": null,
            "next_action_date": null,
            "created_at": "2025-06-27T20:00:00.000000Z",
            "updated_at": "2025-06-27T20:00:00.000000Z"
        }
    }
    ```

### Get Lead

*   **Description:** Retrieves a specific lead by ID.
*   **Method:** GET
*   **Endpoint:** `/api/leads/{id}`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Lead retrieved successfully",
        "data": {
            "id": 1,
            "uuid": "550e8400-e29b-41d4-a716-446655440001",
            "user_id": 1,
            "first_name": "Jane",
            "last_name": "Smith",
            "email": "jane.smith@example.com",
            "phone": "+14155552671",
            "property_address": "123 Main St",
            "property_city": "Austin",
            "property_state": "TX",
            "property_zip": "78701",
            "property_type": "single_family",
            "ai_score": 85,
            "motivation_score": 90,
            "urgency_score": 75,
            "financial_score": 80,
            "source": "website_form",
            "estimated_value": 250000.00,
            "mortgage_balance": 180000.00,
            "asking_price": 220000.00,
            "status": "qualified",
            "preferred_contact_method": "phone",
            "next_action": "Schedule property visit",
            "next_action_date": "2025-06-28",
            "created_at": "2025-06-26T20:00:00.000000Z",
            "updated_at": "2025-06-26T20:00:00.000000Z"
        }
    }
    ```

### Update Lead

*   **Description:** Updates an existing lead.
*   **Method:** PUT
*   **Endpoint:** `/api/leads/{id}`
*   **Request:**

    ```json
    {
        "first_name": "Jane",
        "last_name": "Smith",
        "email": "jane.smith@example.com",
        "phone": "+14155552671",
        "status": "qualified",
        "next_action": "Schedule property visit",
        "next_action_date": "2025-06-28"
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Lead updated successfully",
        "data": {
            "id": 1,
            "uuid": "550e8400-e29b-41d4-a716-446655440001",
            "user_id": 1,
            "first_name": "Jane",
            "last_name": "Smith",
            "email": "jane.smith@example.com",
            "phone": "+14155552671",
            "property_address": "123 Main St",
            "property_city": "Austin",
            "property_state": "TX",
            "property_zip": "78701",
            "property_type": "single_family",
            "ai_score": 85,
            "motivation_score": 90,
            "urgency_score": 75,
            "financial_score": 80,
            "source": "website_form",
            "estimated_value": 250000.00,
            "mortgage_balance": 180000.00,
            "asking_price": 220000.00,
            "status": "qualified",
            "preferred_contact_method": "phone",
            "next_action": "Schedule property visit",
            "next_action_date": "2025-06-28",
            "created_at": "2025-06-26T20:00:00.000000Z",
            "updated_at": "2025-06-27T20:00:00.000000Z"
        }
    }
    ```

### Delete Lead

*   **Description:** Deletes a specific lead.
*   **Method:** DELETE
*   **Endpoint:** `/api/leads/{id}`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Lead deleted successfully"
    }
    ```

### Get Lead AI Score

*   **Description:** Retrieves AI-powered scoring for a specific lead.
*   **Method:** GET
*   **Endpoint:** `/api/leads/{lead}/ai-score`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Lead AI score retrieved successfully",
        "data": {
            "lead_id": 1,
            "ai_score": 85,
            "motivation_score": 90,
            "urgency_score": 75,
            "financial_score": 80,
            "analysis": {
                "motivation_factors": ["Divorce situation", "Financial distress"],
                "urgency_indicators": ["Needs to sell within 30 days"],
                "financial_capability": "Strong equity position"
            }
        }
    }
    ```

## Properties API

### List Properties

*   **Description:** Retrieves a paginated list of properties with advanced filtering.
*   **Method:** GET
*   **Endpoint:** `/api/properties`
*   **Query Parameters:**
    - `page`, `per_page`: Pagination
    - `status`: Filter by property status
    - `city`, `state`, `zip`: Location filters
    - `price_min`, `price_max`: Price range filters
    - `bedrooms`, `bathrooms`: Property specification filters
    - `transaction_type`: Filter by transaction type
    - `ai_score_min`: Minimum AI score filter

*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Properties retrieved successfully",
        "data": [
            {
                "id": 1,
                "uuid": "550e8400-e29b-41d4-a716-446655440002",
                "user_id": 1,
                "address": "456 Oak Avenue",
                "unit": "Unit A",
                "city": "Austin",
                "state": "TX",
                "zip": "78702",
                "county": "Travis",
                "property_type": "single_family",
                "bedrooms": 3,
                "bathrooms": 2.5,
                "square_feet": 1800,
                "lot_size": 0.25,
                "year_built": 1995,
                "purchase_price": 180000.00,
                "arv": 250000.00,
                "repair_estimate": 25000.00,
                "holding_costs": 5000.00,
                "profit_potential": 40000.00,
                "ai_score": 92,
                "transaction_type": "assignment",
                "assignment_fee": 15000.00,
                "status": "active",
                "view_count": 45,
                "save_count": 8,
                "inquiry_count": 3,
                "images": [
                    "https://example.com/images/property1_1.jpg",
                    "https://example.com/images/property1_2.jpg"
                ],
                "created_at": "2025-06-26T20:00:00.000000Z",
                "updated_at": "2025-06-26T20:00:00.000000Z"
            }
        ]
    }
    ```

### Create Property

*   **Description:** Creates a new property listing with comprehensive details.
*   **Method:** POST
*   **Endpoint:** `/api/properties`
*   **Request:**

    ```json
    {
        "address": "456 Oak Avenue",
        "unit": "Unit A",
        "city": "Austin",
        "state": "TX",
        "zip": "78702",
        "county": "Travis",
        "property_type": "single_family",
        "bedrooms": 3,
        "bathrooms": 2.5,
        "square_feet": 1800,
        "lot_size": 0.25,
        "year_built": 1995,
        "purchase_price": 180000.00,
        "arv": 250000.00,
        "repair_estimate": 25000.00,
        "holding_costs": 5000.00,
        "transaction_type": "assignment",
        "assignment_fee": 15000.00,
        "description": "Beautiful single-family home with great potential",
        "seller_notes": "Motivated seller, quick closing preferred"
    }
    ```
*   **Field Restrictions:**
    - `property_type`: Allowed values are `single_family`, `townhouse`, `condo`, `duplex`, `multi_family`, `mobile_home`.
    - `transaction_type`: Allowed values are `assignment`, `double_close`, `wholesale`, `fix_and_flip`, `buy_and_hold`.
    - `status`: Allowed values are `draft`, `active`, `pending`, `sold`.
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Property created successfully",
        "data": {
            "id": 2,
            "uuid": "550e8400-e29b-41d4-a716-446655440006",
            "user_id": 1,
            "address": "456 Oak Avenue",
            "unit": "Unit A",
            "city": "Austin",
            "state": "TX",
            "zip": "78702",
            "county": "Travis",
            "property_type": "single_family",
            "bedrooms": 3,
            "bathrooms": 2.5,
            "square_feet": 1800,
            "lot_size": 0.25,
            "year_built": 1995,
            "purchase_price": 180000.00,
            "arv": 250000.00,
            "repair_estimate": 25000.00,
            "holding_costs": 5000.00,
            "profit_potential": 40000.00,
            "ai_score": 0,
            "transaction_type": "assignment",
            "assignment_fee": 15000.00,
            "status": "new",
            "view_count": 0,
            "save_count": 0,
            "inquiry_count": 0,
            "images": [],
            "created_at": "2025-06-27T20:00:00.000000Z",
            "updated_at": "2025-06-27T20:00:00.000000Z"
        }
    }
    ```

### Get Property

*   **Description:** Retrieves a specific property by ID.
*   **Method:** GET
*   **Endpoint:** `/api/properties/{id}`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Property retrieved successfully",
        "data": {
            "id": 1,
            "uuid": "550e8400-e29b-41d4-a716-446655440002",
            "user_id": 1,
            "address": "456 Oak Avenue",
            "unit": "Unit A",
            "city": "Austin",
            "state": "TX",
            "zip": "78702",
            "county": "Travis",
            "property_type": "single_family",
            "bedrooms": 3,
            "bathrooms": 2.5,
            "square_feet": 1800,
            "lot_size": 0.25,
            "year_built": 1995,
            "purchase_price": 180000.00,
            "arv": 250000.00,
            "repair_estimate": 25000.00,
            "holding_costs": 5000.00,
            "profit_potential": 40000.00,
            "ai_score": 92,
            "transaction_type": "assignment",
            "assignment_fee": 15000.00,
            "status": "active",
            "view_count": 45,
            "save_count": 8,
            "inquiry_count": 3,
            "images": [
                "https://example.com/images/property1_1.jpg",
                "https://example.com/images/property1_2.jpg"
            ],
            "created_at": "2025-06-26T20:00:00.000000Z",
            "updated_at": "2025-06-26T20:00:00.000000Z"
        }
    }
    ```

### Update Property

*   **Description:** Updates an existing property.
*   **Method:** PUT
*   **Endpoint:** `/api/properties/{id}`
*   **Request:**

    ```json
    {
        "address": "456 Oak Avenue",
        "city": "Austin",
        "state": "TX",
        "zip": "78702",
        "purchase_price": 185000.00,
        "arv": 260000.00,
        "status": "active"
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Property updated successfully",
        "data": {
            "id": 1,
            "uuid": "550e8400-e29b-41d4-a716-446655440002",
            "user_id": 1,
            "address": "456 Oak Avenue",
            "unit": "Unit A",
            "city": "Austin",
            "state": "TX",
            "zip": "78702",
            "county": "Travis",
            "property_type": "single_family",
            "bedrooms": 3,
            "bathrooms": 2.5,
            "square_feet": 1800,
            "lot_size": 0.25,
            "year_built": 1995,
            "purchase_price": 185000.00,
            "arv": 260000.00,
            "repair_estimate": 25000.00,
            "holding_costs": 5000.00,
            "profit_potential": 45000.00,
            "ai_score": 92,
            "transaction_type": "assignment",
            "assignment_fee": 15000.00,
            "status": "active",
            "view_count": 45,
            "save_count": 8,
            "inquiry_count": 3,
            "images": [
                "https://example.com/images/property1_1.jpg",
                "https://example.com/images/property1_2.jpg"
            ],
            "created_at": "2025-06-26T20:00:00.000000Z",
            "updated_at": "2025-06-27T20:00:00.000000Z"
        }
    }
    ```

### Delete Property

*   **Description:** Deletes a specific property.
*   **Method:** DELETE
*   **Endpoint:** `/api/properties/{id}`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Property deleted successfully"
    }
    ```

### Get Property AI Analysis

*   **Description:** Retrieves AI-powered analysis for a specific property.
*   **Method:** GET
*   **Endpoint:** `/api/properties/{property}/ai-analysis`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Property AI analysis retrieved successfully",
        "data": {
            "property_id": 1,
            "ai_score": 92,
            "market_analysis": {
                "comparable_sales": [
                    {"address": "123 Oak Ave", "sale_price": 245000, "date": "2025-05-15"},
                    {"address": "789 Oak Ave", "sale_price": 255000, "date": "2025-04-20"}
                ],
                "market_trends": "Appreciating market with 8% YoY growth",
                "days_on_market_avg": 25
            },
            "repair_analysis": {
                "estimated_repairs": 25000.00,
                "priority_items": ["Roof repair", "HVAC system", "Kitchen updates"],
                "timeline_estimate": "6-8 weeks"
            },
            "investment_metrics": {
                "profit_potential": 40000.00,
                "roi_percentage": 22.2,
                "break_even_price": 210000.00
            }
        }
    }
    ```

## Property Saves API

### Save Property

*   **Description:** Adds a property to user's saved/favorites list.
*   **Method:** POST
*   **Endpoint:** `/api/property-saves`
*   **Request:**

    ```json
    {
        "property_id": 1
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Property saved successfully",
        "data": {
            "id": 1,
            "user_id": 1,
            "property_id": 1,
            "created_at": "2025-06-27T20:00:00.000000Z",
            "updated_at": "2025-06-27T20:00:00.000000Z"
        }
    }
    ```

### List Saved Properties

*   **Description:** Retrieves user's saved properties.
*   **Method:** GET
*   **Endpoint:** `/api/property-saves`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Saved properties retrieved successfully",
        "data": [
            {
                "id": 1,
                "user_id": 1,
                "property_id": 1,
                "property": {
                    "id": 1,
                    "address": "456 Oak Avenue",
                    "city": "Austin",
                    "state": "TX",
                    "purchase_price": 180000.00,
                    "arv": 250000.00
                },
                "saved_at": "2025-06-26T20:00:00.000000Z"
            }
        ]
    }
    ```

### Remove Saved Property

*   **Description:** Removes a property from user's saved list.
*   **Method:** DELETE
*   **Endpoint:** `/api/property-saves/{property_save}`
*   **Request:**

    ```json
    {
        "property_id": 1
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Property removed from saved list"
    }
    ```

## Deals API

### List Deals

*   **Description:** Retrieves deals with comprehensive filtering options.
*   **Method:** GET
*   **Endpoint:** `/api/deals`
*   **Query Parameters:**
    - `status`: Filter by deal status
    - `deal_type`: Filter by deal type
    - `closing_date_from`, `closing_date_to`: Date range filters

*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Deals retrieved successfully",
        "data": [
            {
                "id": 1,
                "uuid": "550e8400-e29b-41d4-a716-446655440003",
                "property_id": 1,
                "lead_id": 1,
                "wholesaler_id": 1,
                "buyer_id": 2,
                "seller_id": 3,
                "deal_type": "assignment",
                "purchase_price": 180000.00,
                "sale_price": 195000.00,
                "assignment_fee": 15000.00,
                "contract_date": "2025-06-26",
                "closing_date": "2025-07-15",
                "inspection_period": 10,
                "earnest_money": 5000.00,
                "status": "active",
                "contract_terms": {
                    "financing_contingency": true,
                    "inspection_contingency": true,
                    "appraisal_contingency": false
                },
                "created_at": "2025-06-26T20:00:00.000000Z",
                "updated_at": "2025-06-26T20:00:00.000000Z"
            }
        ]
    }
    ```

### Create Deal

*   **Description:** Creates a new deal with comprehensive terms.
*   **Method:** POST
*   **Endpoint:** `/api/deals`
*   **Request:**

    ```json
    {
        "property_id": 1,
        "lead_id": 1,
        "buyer_id": 2,
        "seller_id": 3,
        "deal_type": "assignment",
        "purchase_price": 180000.00,
        "sale_price": 195000.00,
        "assignment_fee": 15000.00,
        "contract_date": "2025-06-26",
        "closing_date": "2025-07-15",
        "inspection_period": 10,
        "earnest_money": 5000.00,
        "contract_terms": {
            "financing_contingency": true,
            "inspection_contingency": true,
            "appraisal_contingency": false
        }
    }
    ```
*   **Field Restrictions:**
    - `deal_type`: Allowed values are `assignment`, `double_close`, `wholesale`, `fix_flip`.
    - `status`: Allowed values are `active`, `pending`, `closed`, `cancelled`.
*   **Field Restrictions:**
    - `campaign_type`: Allowed values are `lead_generation`, `nurture`, `follow_up`, `promotional`.
    - `channel`: Allowed values are `email`, `sms`, `voice`, `direct_mail`.
    - `ai_tone`: Allowed values are `professional`, `friendly`, `urgent`, `casual`.
    - `status`: Allowed values are `draft`, `scheduled`, `active`, `paused`, `completed`, `cancelled`.
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Deal created successfully",
        "data": {
            "id": 2,
            "uuid": "550e8400-e29b-41d4-a716-446655440007",
            "property_id": 1,
            "lead_id": 1,
            "wholesaler_id": 1,
            "buyer_id": 2,
            "seller_id": 3,
            "deal_type": "assignment",
            "purchase_price": 180000.00,
            "sale_price": 195000.00,
            "assignment_fee": 15000.00,
            "contract_date": "2025-06-26",
            "closing_date": "2025-07-15",
            "inspection_period": 10,
            "earnest_money": 5000.00,
            "status": "new",
            "contract_terms": {
                "financing_contingency": true,
                "inspection_contingency": true,
                "appraisal_contingency": false
            },
            "created_at": "2025-06-27T20:00:00.000000Z",
            "updated_at": "2025-06-27T20:00:00.000000Z"
        }
    }
    ```

### Get Deal

*   **Description:** Retrieves a specific deal by ID.
*   **Method:** GET
*   **Endpoint:** `/api/deals/{id}`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Deal retrieved successfully",
        "data": {
            "id": 1,
            "uuid": "550e8400-e29b-41d4-a716-446655440003",
            "property_id": 1,
            "lead_id": 1,
            "wholesaler_id": 1,
            "buyer_id": 2,
            "seller_id": 3,
            "deal_type": "assignment",
            "purchase_price": 180000.00,
            "sale_price": 195000.00,
            "assignment_fee": 15000.00,
            "contract_date": "2025-06-26",
            "closing_date": "2025-07-15",
            "inspection_period": 10,
            "earnest_money": 5000.00,
            "status": "active",
            "contract_terms": {
                "financing_contingency": true,
                "inspection_contingency": true,
                "appraisal_contingency": false
            },
            "created_at": "2025-06-26T20:00:00.000000Z",
            "updated_at": "2025-06-26T20:00:00.000000Z"
        }
    }
    ```

### Update Deal

*   **Description:** Updates an existing deal.
*   **Method:** PUT
*   **Endpoint:** `/api/deals/{id}`
*   **Request:**

    ```json
    {
        "purchase_price": 185000.00,
        "sale_price": 200000.00,
        "closing_date": "2025-07-20",
        "status": "pending"
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Deal updated successfully",
        "data": {
            "id": 1,
            "uuid": "550e8400-e29b-41d4-a716-446655440003",
            "property_id": 1,
            "lead_id": 1,
            "wholesaler_id": 1,
            "buyer_id": 2,
            "seller_id": 3,
            "deal_type": "assignment",
            "purchase_price": 185000.00,
            "sale_price": 200000.00,
            "assignment_fee": 15000.00,
            "contract_date": "2025-06-26",
            "closing_date": "2025-07-20",
            "inspection_period": 10,
            "earnest_money": 5000.00,
            "status": "pending",
            "contract_terms": {
                "financing_contingency": true,
                "inspection_contingency": true,
                "appraisal_contingency": false
            },
            "created_at": "2025-06-26T20:00:00.000000Z",
            "updated_at": "2025-06-27T20:00:00.000000Z"
        }
    }
    ```

### Delete Deal

*   **Description:** Deletes a specific deal.
*   **Method:** DELETE
*   **Endpoint:** `/api/deals/{id}`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Deal deleted successfully"
    }
    ```

## Deal Milestones API

### List Deal Milestones

*   **Description:** Retrieves milestones for a specific deal.
*   **Method:** GET
*   **Endpoint:** `/api/deals/{deal}/milestones`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Deal milestones retrieved successfully",
        "data": [
            {
                "id": 1,
                "uuid": "550e8400-e29b-41d4-a716-446655440008",
                "deal_id": 1,
                "milestone_type": "inspection",
                "title": "Property Inspection",
                "description": "Schedule and complete property inspection",
                "due_date": "2025-07-01",
                "completed_at": null,
                "is_critical": true,
                "created_at": "2025-06-27T20:00:00.000000Z",
                "updated_at": "2025-06-27T20:00:00.000000Z"
            }
        ]
    }
    ```

### Create Deal Milestone

*   **Description:** Creates a new milestone/task for a deal.
*   **Method:** POST
*   **Endpoint:** `/api/deal-milestones`
*   **Request:**

    ```json
    {
        "deal_id": 1,
        "milestone_type": "inspection",
        "title": "Property Inspection",
        "description": "Schedule and complete property inspection",
        "due_date": "2025-07-01",
        "is_critical": true
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Deal milestone created successfully",
        "data": {
            "id": 2,
            "uuid": "550e8400-e29b-41d4-a716-446655440009",
            "deal_id": 1,
            "milestone_type": "inspection",
            "title": "Property Inspection",
            "description": "Schedule and complete property inspection",
            "due_date": "2025-07-01",
            "completed_at": null,
            "is_critical": true,
            "created_at": "2025-06-27T20:00:00.000000Z",
            "updated_at": "2025-06-27T20:00:00.000000Z"
        }
    }
    ```

### Complete Deal Milestone

*   **Description:** Marks a milestone as completed.
*   **Method:** PATCH
*   **Endpoint:** `/api/deal-milestones/{milestone}/complete`
*   **Request:**

    ```json
    {
        "completed_at": "2025-06-28T10:00:00.000000Z"
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Deal milestone completed successfully",
        "data": {
            "id": 1,
            "uuid": "550e8400-e29b-41d4-a716-446655440008",
            "deal_id": 1,
            "milestone_type": "inspection",
            "title": "Property Inspection",
            "description": "Schedule and complete property inspection",
            "due_date": "2025-07-01",
            "completed_at": "2025-06-28T10:00:00.000000Z",
            "is_critical": true,
            "created_at": "2025-06-27T20:00:00.000000Z",
            "updated_at": "2025-06-28T10:00:00.000000Z"
        }
    }
    ```

### List All Deal Milestones

*   **Description:** Retrieves all deal milestones with filtering options.
*   **Method:** GET
*   **Endpoint:** `/api/deal-milestones`
*   **Query Parameters:**
    - `deal_id`: Filter by specific deal
    - `milestone_type`: Filter by milestone type
    - `is_critical`: Filter by critical milestones
    - `completed`: Filter by completion status
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "All deal milestones retrieved successfully",
        "data": [
            {
                "id": 1,
                "uuid": "550e8400-e29b-41d4-a716-446655440008",
                "deal_id": 1,
                "milestone_type": "inspection",
                "title": "Property Inspection",
                "description": "Schedule and complete property inspection",
                "due_date": "2025-07-01",
                "completed_at": null,
                "is_critical": true,
                "created_at": "2025-06-27T20:00:00.000000Z",
                "updated_at": "2025-06-27T20:00:00.000000Z"
            }
        ]
    }
    ```

### Get Deal Milestone

*   **Description:** Retrieves a specific deal milestone by ID.
*   **Method:** GET
*   **Endpoint:** `/api/deal-milestones/{id}`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Deal milestone retrieved successfully",
        "data": {
            "id": 1,
            "uuid": "550e8400-e29b-41d4-a716-446655440008",
            "deal_id": 1,
            "milestone_type": "inspection",
            "title": "Property Inspection",
            "description": "Schedule and complete property inspection",
            "due_date": "2025-07-01",
            "completed_at": null,
            "is_critical": true,
            "created_at": "2025-06-27T20:00:00.000000Z",
            "updated_at": "2025-06-27T20:00:00.000000Z"
        }
    }
    ```

### Update Deal Milestone

*   **Description:** Updates an existing deal milestone.
*   **Method:** PUT
*   **Endpoint:** `/api/deal-milestones/{id}`
*   **Request:**

    ```json
    {
        "title": "Updated Property Inspection",
        "description": "Updated description",
        "due_date": "2025-07-05",
        "is_critical": false
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Deal milestone updated successfully",
        "data": {
            "id": 1,
            "uuid": "550e8400-e29b-41d4-a716-446655440008",
            "deal_id": 1,
            "milestone_type": "inspection",
            "title": "Updated Property Inspection",
            "description": "Updated description",
            "due_date": "2025-07-05",
            "completed_at": null,
            "is_critical": false,
            "created_at": "2025-06-27T20:00:00.000000Z",
            "updated_at": "2025-06-28T11:00:00.000000Z"
        }
    }
    ```

### Delete Deal Milestone

*   **Description:** Deletes a specific deal milestone.
*   **Method:** DELETE
*   **Endpoint:** `/api/deal-milestones/{id}`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Deal milestone deleted successfully"
    }
    ```

## Property Saves API (Complete)

### List Saved Properties

*   **Description:** Retrieves user's saved properties with pagination.
*   **Method:** GET
*   **Endpoint:** `/api/property-saves`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Saved properties retrieved successfully",
        "data": [
            {
                "id": 1,
                "user_id": 1,
                "property_id": 1,
                "property": {
                    "id": 1,
                    "address": "456 Oak Avenue",
                    "city": "Austin",
                    "state": "TX",
                    "purchase_price": 180000.00,
                    "arv": 250000.00
                },
                "saved_at": "2025-06-26T20:00:00.000000Z"
            }
        ]
    }
    ```

### Save Property

*   **Description:** Adds a property to user's saved/favorites list.
*   **Method:** POST
*   **Endpoint:** `/api/property-saves`
*   **Request:**

    ```json
    {
        "property_id": 1
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Property saved successfully",
        "data": {
            "id": 1,
            "user_id": 1,
            "property_id": 1,
            "created_at": "2025-06-27T20:00:00.000000Z",
            "updated_at": "2025-06-27T20:00:00.000000Z"
        }
    }
    ```

### Get Saved Property

*   **Description:** Retrieves a specific saved property by ID.
*   **Method:** GET
*   **Endpoint:** `/api/property-saves/{id}`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Saved property retrieved successfully",
        "data": {
            "id": 1,
            "user_id": 1,
            "property_id": 1,
            "property": {
                "id": 1,
                "address": "456 Oak Avenue",
                "city": "Austin",
                "state": "TX",
                "purchase_price": 180000.00,
                "arv": 250000.00
            },
            "saved_at": "2025-06-26T20:00:00.000000Z"
        }
    }
    ```

### Remove Saved Property

*   **Description:** Removes a property from user's saved list.
*   **Method:** DELETE
*   **Endpoint:** `/api/property-saves/{id}`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Property removed from saved list"
    }
    ```

## AI Conversations API

### List AI Conversations

*   **Description:** Retrieves AI conversation history.
*   **Method:** GET
*   **Endpoint:** `/api/ai-conversations`
*   **Query Parameters:**
    - `channel`: Filter by communication channel
    - `status`: Filter by conversation status
    - `lead_id`: Filter by specific lead

*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "AI conversations retrieved successfully",
        "data": [
            {
                "id": 1,
                "uuid": "550e8400-e29b-41d4-a716-446655440004",
                "user_id": 1,
                "lead_id": 1,
                "property_id": 1,
                "channel": "sms",
                "external_id": "twilio_call_123",
                "sentiment_score": 75,
                "urgency_score": 80,
                "motivation_score": 85,
                "qualification_score": 78,
                "extracted_data": {
                    "timeline": "30 days",
                    "motivation": "divorce",
                    "price_flexibility": "moderate"
                },
                "identified_pain_points": ["Financial stress", "Time pressure"],
                "status": "completed",
                "outcome": "qualified_lead",
                "next_steps": "Schedule property visit",
                "created_at": "2025-06-26T20:00:00.000000Z",
                "updated_at": "2025-06-26T20:00:00.000000Z"
            }
        ]
    }
    ```

### Create AI Conversation

*   **Description:** Initiates a new AI conversation.
*   **Method:** POST
*   **Endpoint:** `/api/ai-conversations`
*   **Request:**

    ```json
    {
        "lead_id": 1,
        "property_id": 1,
        "channel": "sms",
        "external_id": "twilio_call_123"
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "AI conversation created successfully",
        "data": {
            "id": 2,
            "uuid": "550e8400-e29b-41d4-a716-446655440010",
            "user_id": 1,
            "lead_id": 1,
            "property_id": 1,
            "channel": "sms",
            "external_id": "twilio_call_123",
            "sentiment_score": 0,
            "urgency_score": 0,
            "motivation_score": 0,
            "qualification_score": 0,
            "extracted_data": null,
            "identified_pain_points": [],
            "status": "initiated",
            "outcome": null,
            "next_steps": null,
            "created_at": "2025-06-27T20:00:00.000000Z",
            "updated_at": "2025-06-27T20:00:00.000000Z"
        }
    }
    ```

### Get AI Conversation

*   **Description:** Retrieves a specific AI conversation by ID.
*   **Method:** GET
*   **Endpoint:** `/api/ai-conversations/{id}`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "AI conversation retrieved successfully",
        "data": {
            "id": 1,
            "uuid": "550e8400-e29b-41d4-a716-446655440004",
            "user_id": 1,
            "lead_id": 1,
            "property_id": 1,
            "channel": "sms",
            "external_id": "twilio_call_123",
            "sentiment_score": 75,
            "urgency_score": 80,
            "motivation_score": 85,
            "qualification_score": 78,
            "extracted_data": {
                "timeline": "30 days",
                "motivation": "divorce",
                "price_flexibility": "moderate"
            },
            "identified_pain_points": ["Financial stress", "Time pressure"],
            "status": "completed",
            "outcome": "qualified_lead",
            "next_steps": "Schedule property visit",
            "created_at": "2025-06-26T20:00:00.000000Z",
            "updated_at": "2025-06-26T20:00:00.000000Z"
        }
    }
    ```

### Update AI Conversation

*   **Description:** Updates an existing AI conversation.
*   **Method:** PUT
*   **Endpoint:** `/api/ai-conversations/{id}`
*   **Request:**

    ```json
    {
        "sentiment_score": 80,
        "urgency_score": 85,
        "status": "completed",
        "outcome": "qualified_lead",
        "next_steps": "Schedule property visit"
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "AI conversation updated successfully",
        "data": {
            "id": 1,
            "uuid": "550e8400-e29b-41d4-a716-446655440004",
            "user_id": 1,
            "lead_id": 1,
            "property_id": 1,
            "channel": "sms",
            "external_id": "twilio_call_123",
            "sentiment_score": 80,
            "urgency_score": 85,
            "motivation_score": 85,
            "qualification_score": 78,
            "extracted_data": {
                "timeline": "30 days",
                "motivation": "divorce",
                "price_flexibility": "moderate"
            },
            "identified_pain_points": ["Financial stress", "Time pressure"],
            "status": "completed",
            "outcome": "qualified_lead",
            "next_steps": "Schedule property visit",
            "created_at": "2025-06-26T20:00:00.000000Z",
            "updated_at": "2025-06-27T20:00:00.000000Z"
        }
    }
    ```

### Delete AI Conversation

*   **Description:** Deletes a specific AI conversation.
*   **Method:** DELETE
*   **Endpoint:** `/api/ai-conversations/{id}`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "AI conversation deleted successfully"
    }
    ```

## Campaigns API

### List Campaigns

*   **Description:** Retrieves marketing campaigns with performance metrics.
*   **Method:** GET
*   **Endpoint:** `/api/campaigns`

*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Campaigns retrieved successfully",
        "data": [
            {
                "id": 1,
                "user_id": 1,
                "name": "Austin Distressed Properties Q3",
                "campaign_type": "lead_generation",
                "channel": "email",
                "target_criteria": {
                    "location": "Austin, TX",
                    "property_type": "single_family",
                    "equity_min": 50000
                },
                "subject_line": "We Buy Houses Fast - Cash Offer in 24 Hours",
                "status": "active",
                "scheduled_at": "2025-06-27T09:00:00.000000Z",
                "total_recipients": 500,
                "sent_count": 450,
                "open_count": 135,
                "click_count": 45,
                "response_count": 12,
                "conversion_count": 3,
                "budget": 1000.00,
                "spent": 750.00,
                "created_at": "2025-06-26T20:00:00.000000Z",
                "updated_at": "2025-06-26T20:00:00.000000Z"
            }
        ]
    }
    ```

### Create Campaign

*   **Description:** Creates a new marketing campaign.
*   **Method:** POST
*   **Endpoint:** `/api/campaigns`
*   **Request:**

    ```json
    {
        "name": "Austin Distressed Properties Q3",
        "campaign_type": "lead_generation",
        "channel": "email",
        "target_criteria": {
            "location": "Austin, TX",
            "property_type": "single_family",
            "equity_min": 50000
        },
        "subject_line": "We Buy Houses Fast - Cash Offer in 24 Hours",
        "email_content": "Hello [FIRST_NAME], we specialize in buying houses...",
        "scheduled_at": "2025-06-27T09:00:00.000000Z",
        "budget": 1000.00,
        "use_ai_personalization": true
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Campaign created successfully",
        "data": {
            "id": 2,
            "user_id": 1,
            "name": "Austin Distressed Properties Q3",
            "campaign_type": "lead_generation",
            "channel": "email",
            "target_criteria": {
                "location": "Austin, TX",
                "property_type": "single_family",
                "equity_min": 50000
            },
            "subject_line": "We Buy Houses Fast - Cash Offer in 24 Hours",
            "status": "draft",
            "scheduled_at": "2025-06-27T09:00:00.000000Z",
            "total_recipients": 0,
            "sent_count": 0,
            "open_count": 0,
            "click_count": 0,
            "response_count": 0,
            "conversion_count": 0,
            "budget": 1000.00,
            "spent": 0.00,
            "created_at": "2025-06-27T20:00:00.000000Z",
            "updated_at": "2025-06-27T20:00:00.000000Z"
        }
    }
    ```

### Get Campaign

*   **Description:** Retrieves a specific campaign by ID.
*   **Method:** GET
*   **Endpoint:** `/api/campaigns/{id}`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Campaign retrieved successfully",
        "data": {
            "id": 1,
            "user_id": 1,
            "name": "Austin Distressed Properties Q3",
            "campaign_type": "lead_generation",
            "channel": "email",
            "target_criteria": {
                "location": "Austin, TX",
                "property_type": "single_family",
                "equity_min": 50000
            },
            "subject_line": "We Buy Houses Fast - Cash Offer in 24 Hours",
            "status": "active",
            "scheduled_at": "2025-06-27T09:00:00.000000Z",
            "total_recipients": 500,
            "sent_count": 450,
            "open_count": 135,
            "click_count": 45,
            "response_count": 12,
            "conversion_count": 3,
            "budget": 1000.00,
            "spent": 750.00,
            "created_at": "2025-06-26T20:00:00.000000Z",
            "updated_at": "2025-06-26T20:00:00.000000Z"
        }
    }
    ```

### Update Campaign

*   **Description:** Updates an existing campaign.
*   **Method:** PUT
*   **Endpoint:** `/api/campaigns/{id}`
*   **Request:**

    ```json
    {
        "name": "Updated Campaign Name",
        "status": "paused",
        "budget": 1500.00
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Campaign updated successfully",
        "data": {
            "id": 1,
            "user_id": 1,
            "name": "Updated Campaign Name",
            "campaign_type": "lead_generation",
            "channel": "email",
            "target_criteria": {
                "location": "Austin, TX",
                "property_type": "single_family",
                "equity_min": 50000
            },
            "subject_line": "We Buy Houses Fast - Cash Offer in 24 Hours",
            "status": "paused",
            "scheduled_at": "2025-06-27T09:00:00.000000Z",
            "total_recipients": 500,
            "sent_count": 450,
            "open_count": 135,
            "click_count": 45,
            "response_count": 12,
            "conversion_count": 3,
            "budget": 1500.00,
            "spent": 750.00,
            "created_at": "2025-06-26T20:00:00.000000Z",
            "updated_at": "2025-06-27T20:00:00.000000Z"
        }
    }
    ```

### Delete Campaign

*   **Description:** Deletes a specific campaign.
*   **Method:** DELETE
*   **Endpoint:** `/api/campaigns/{id}`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Campaign deleted successfully"
    }
    ```

### Get Campaign Recipients

*   **Description:** Retrieves recipients for a specific campaign.
*   **Method:** GET
*   **Endpoint:** `/api/campaigns/{id}/recipients`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Campaign recipients retrieved successfully",
        "data": [
            {
                "id": 1,
                "campaign_id": 1,
                "lead_id": 1,
                "sent_at": "2025-06-27T10:00:00.000000Z",
                "opened_at": "2025-06-27T10:15:00.000000Z",
                "clicked_at": "2025-06-27T10:20:00.000000Z",
                "responded_at": null,
                "open_count": 2,
                "click_count": 1,
                "response_count": 0,
                "created_at": "2025-06-27T20:00:00.000000Z",
                "updated_at": "2025-06-27T20:00:00.000000Z"
            }
        ]
    }
    ```

## Campaign Recipients API

### List Campaign Recipients

*   **Description:** Retrieves recipients and their engagement for a campaign.
*   **Method:** GET
*   **Endpoint:** `/api/campaigns/{campaign}/recipients`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Campaign recipients retrieved successfully",
        "data": [
            {
                "id": 1,
                "campaign_id": 1,
                "lead_id": 1,
                "sent_at": "2025-06-27T10:00:00.000000Z",
                "opened_at": "2025-06-27T10:15:00.000000Z",
                "clicked_at": "2025-06-27T10:20:00.000000Z",
                "responded_at": null,
                "open_count": 2,
                "click_count": 1,
                "response_count": 0,
                "created_at": "2025-06-27T20:00:00.000000Z",
                "updated_at": "2025-06-27T20:00:00.000000Z"
            }
        ]
    }
    ```

### Add Campaign Recipients

*   **Description:** Adds recipients to a campaign.
*   **Method:** POST
*   **Endpoint:** `/api/campaign-recipients`
*   **Request:**

    ```json
    {
        "campaign_id": 1,
        "lead_ids": [1, 2, 3, 4, 5]
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Campaign recipients added successfully"
    }
    ```

### List All Campaign Recipients

*   **Description:** Retrieves all campaign recipients with filtering options.
*   **Method:** GET
*   **Endpoint:** `/api/campaign-recipients`
*   **Query Parameters:**
    - `campaign_id`: Filter by specific campaign
    - `sent`: Filter by sent status
    - `opened`: Filter by opened status
    - `clicked`: Filter by clicked status
    - `responded`: Filter by responded status
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "All campaign recipients retrieved successfully",
        "data": [
            {
                "id": 1,
                "campaign_id": 1,
                "lead_id": 1,
                "sent_at": "2025-06-27T10:00:00.000000Z",
                "opened_at": "2025-06-27T10:15:00.000000Z",
                "clicked_at": "2025-06-27T10:20:00.000000Z",
                "responded_at": null,
                "open_count": 2,
                "click_count": 1,
                "response_count": 0,
                "created_at": "2025-06-27T20:00:00.000000Z",
                "updated_at": "2025-06-27T20:00:00.000000Z"
            }
        ]
    }
    ```

### Get Campaign Recipient

*   **Description:** Retrieves a specific campaign recipient by ID.
*   **Method:** GET
*   **Endpoint:** `/api/campaign-recipients/{id}`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Campaign recipient retrieved successfully",
        "data": {
            "id": 1,
            "campaign_id": 1,
            "lead_id": 1,
            "sent_at": "2025-06-27T10:00:00.000000Z",
            "opened_at": "2025-06-27T10:15:00.000000Z",
            "clicked_at": "2025-06-27T10:20:00.000000Z",
            "responded_at": null,
            "open_count": 2,
            "click_count": 1,
            "response_count": 0,
            "created_at": "2025-06-27T20:00:00.000000Z",
            "updated_at": "2025-06-27T20:00:00.000000Z"
        }
    }
    ```

### Update Campaign Recipient

*   **Description:** Updates campaign recipient engagement tracking.
*   **Method:** PUT
*   **Endpoint:** `/api/campaign-recipients/{id}`
*   **Request:**

    ```json
    {
        "sent_at": "2025-06-27T10:00:00.000000Z",
        "opened_at": "2025-06-27T10:15:00.000000Z",
        "clicked_at": "2025-06-27T10:20:00.000000Z",
        "open_count": 2,
        "click_count": 1
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Campaign recipient updated successfully",
        "data": {
            "id": 1,
            "campaign_id": 1,
            "lead_id": 1,
            "sent_at": "2025-06-27T10:00:00.000000Z",
            "opened_at": "2025-06-27T10:15:00.000000Z",
            "clicked_at": "2025-06-27T10:20:00.000000Z",
            "responded_at": null,
            "open_count": 2,
            "click_count": 1,
            "response_count": 0,
            "created_at": "2025-06-27T20:00:00.000000Z",
            "updated_at": "2025-06-28T12:00:00.000000Z"
        }
    }
    ```

### Remove Campaign Recipient

*   **Description:** Removes a recipient from a campaign.
*   **Method:** DELETE
*   **Endpoint:** `/api/campaign-recipients/{id}`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Campaign recipient removed successfully"
    }
    ```

## User Achievements API

### List User Achievements

*   **Description:** Retrieves user's achievements and points.
*   **Method:** GET
*   **Endpoint:** `/api/user-achievements`

*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "User achievements retrieved successfully",
        "data": [
            {
                "id": 1,
                "user_id": 1,
                "achievement_type": "deal_milestone",
                "achievement_name": "First Deal Closed",
                "points_earned": 100,
                "metadata": {
                    "deal_id": 1,
                    "deal_value": 15000.00
                },
                "earned_at": "2025-06-26T20:00:00.000000Z"
            }
        ],
        "summary": {
            "total_points": 350,
            "current_level": 2,
            "points_to_next_level": 150,
            "total_achievements": 5
        }
    }
    ```

### Create User Achievement

*   **Description:** Creates a new achievement (typically called by system).
*   **Method:** POST
*   **Endpoint:** `/api/user-achievements`
*   **Request:**

    ```json
    {
        "achievement_type": "deal_milestone",
        "achievement_name": "First Deal Closed",
        "points_earned": 100,
        "metadata": {
            "deal_id": 1,
            "deal_value": 15000.00
        }
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "User achievement created successfully",
        "data": {
            "id": 2,
            "user_id": 1,
            "achievement_type": "deal_milestone",
            "achievement_name": "First Deal Closed",
            "points_earned": 100,
            "metadata": {
                "deal_id": 1,
                "deal_value": 15000.00
            },
            "earned_at": "2025-06-27T20:00:00.000000Z"
        }
    }
    ```

### Get User Achievement

*   **Description:** Retrieves a specific achievement by ID.
*   **Method:** GET
*   **Endpoint:** `/api/user-achievements/{id}`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "User achievement retrieved successfully",
        "data": {
            "id": 1,
            "user_id": 1,
            "achievement_type": "deal_milestone",
            "achievement_name": "First Deal Closed",
            "points_earned": 100,
            "metadata": {
                "deal_id": 1,
                "deal_value": 15000.00
            },
            "earned_at": "2025-06-26T20:00:00.000000Z"
        }
    }
    ```

### Delete User Achievement

*   **Description:** Deletes a specific achievement (admin only operation).
*   **Method:** DELETE
*   **Endpoint:** `/api/user-achievements/{id}`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "User achievement deleted successfully"
    }
    ```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
    "status": "error",
    "message": "Validation failed",
    "errors": {
        "email": ["The email field is required."],
        "price": ["The price must be a number."]
    }
}
```

### 401 Unauthorized
```json
{
    "status": "error",
    "message": "Unauthenticated",
    "error": "Token not provided or invalid"
}
```

### 403 Forbidden
```json
{
    "status": "error",
    "message": "Forbidden",
    "error": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
    "status": "error",
    "message": "Resource not found",
    "error": "The requested resource could not be found"
}
```

### 422 Unprocessable Entity
```json
{
    "status": "error",
    "message": "Validation error",
    "errors": {
        "field_name": ["Specific validation error message"]
    }
}
```

### 500 Internal Server Error
```json
{
    "status": "error",
    "message": "Internal server error",
    "error": "An unexpected error occurred"
}
```

## Rate Limiting

The API implements rate limiting to ensure fair usage:

- **Authenticated requests**: 1000 requests per hour
- **Unauthenticated requests**: 100 requests per hour

Rate limit headers are included in all responses:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Pagination

List endpoints support pagination with the following parameters:

- `page`: Page number (default: 1)
- `per_page`: Items per page (default: 10, max: 100)

Pagination metadata is included in the response:
```json
{
    "meta": {
        "current_page": 1,
        "per_page": 10,
        "total": 100,
        "last_page": 10,
        "from": 1,
        "to": 10
    },
    "links": {
        "first": "/api/endpoint?page=1",
        "last": "/api/endpoint?page=10",
        "prev": null,
        "next": "/api/endpoint?page=2"
    }
}
```

## Filtering and Searching

Many list endpoints support filtering and searching:

### Common Filter Parameters
- `search`: General text search across relevant fields
- `status`: Filter by status
- `created_from`, `created_to`: Date range filters
- `sort_by`: Field to sort by
- `sort_direction`: `asc` or `desc`

### Example
```
GET /api/properties?search=austin&status=active&price_min=100000&price_max=300000&sort_by=created_at&sort_direction=desc
