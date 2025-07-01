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
        "phone": "+1234567890",
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
            "phone": "+1234567890",
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
                "phone": "+1987654321",
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
        "phone": "+1987654321",
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

### List Saved Properties

*   **Description:** Retrieves user's saved properties.
*   **Method:** GET
*   **Endpoint:** `/api/property-saves`

### Remove Saved Property

*   **Description:** Removes a property from user's saved list.
*   **Method:** DELETE
*   **Endpoint:** `/api/property-saves/{property_save}`

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

## Deal Milestones API

### List Deal Milestones

*   **Description:** Retrieves milestones for a specific deal.
*   **Method:** GET
*   **Endpoint:** `/api/deals/{deal}/milestones`

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

### Complete Deal Milestone

*   **Description:** Marks a milestone as completed.
*   **Method:** PATCH
*   **Endpoint:** `/api/deal-milestones/{milestone}/complete`

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

## Campaign Recipients API

### List Campaign Recipients

*   **Description:** Retrieves recipients and their engagement for a campaign.
*   **Method:** GET
*   **Endpoint:** `/api/campaigns/{campaign}/recipients`

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
