# API Documentation

## Introduction

This document provides detailed information about the API endpoints for the Real Estate Wholesaling Platform.

## Authentication

This API uses Sanctum authentication. You need to obtain an API token to access the protected endpoints.

## Leads API

### List Leads

*   **Description:** Retrieves a list of all leads.
*   **Method:** GET
*   **Endpoint:** `/api/leads`
*   **Request:**

    ```json
    {
        "page": 1,
        "per_page": 10
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Leads retrieved successfully",
        "data": [
            {
                "id": 1,
                "source": "api",
                "original_data": null,
                "status": "new",
                "qualification_score": null,
                "lead_details": null,
                "assigned_to_user_id": null,
                "created_at": "2025-06-24T08:00:00.000000Z",
                "updated_at": "2025-06-24T08:00:00.000000Z"
            }
        ],
        "links": {
            "first": "/api/leads?page=1",
            "last": "/api/leads?page=1",
            "prev": null,
            "next": null
        },
        "meta": {
            "current_page": 1,
            "from": 1,
            "last_page": 1,
            "links": [
                {
                    "url": null,
                    "label": "&laquo; Previous",
                    "active": false
                },
                {
                    "url": "/api/leads?page=1",
                    "label": "1",
                    "active": true
                },
                {
                    "url": null,
                    "label": "Next &raquo;",
                    "active": false
                }
            ],
            "path": "/api/leads",
            "per_page": 10,
            "to": 1,
            "total": 1
        }
    }
    ```
*   **Response (Error):**

    ```json
    {
        "status": "error",
        "message": "Failed to retrieve leads",
        "error": "Error message here"
    }
    ```

### Create Lead

*   **Description:** Creates a new lead.
*   **Method:** POST
*   **Endpoint:** `/api/leads`
*   **Request:**

    ```json
    {
        "source": "api",
        "original_data": null,
        "status": "new",
        "qualification_score": null,
        "lead_details": null,
        "assigned_to_user_id": null
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Lead created successfully",
        "data": {
            "id": 2,
            "source": "api",
            "original_data": null,
            "status": "new",
            "qualification_score": null,
            "lead_details": null,
            "assigned_to_user_id": null,
            "created_at": "2025-06-24T08:00:00.000000Z",
            "updated_at": "2025-06-24T08:00:00.000000Z"
        }
    }
    ```
*   **Response (Error):**

    ```json
    {
        "status": "error",
        "message": "Failed to create lead",
        "error": "Error message here"
    }
    ```

### Get Lead

*   **Description:** Retrieves a specific lead by ID.
*   **Method:** GET
*   **Endpoint:** `/api/leads/{lead}`
*   **Request:** N/A
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Lead retrieved successfully",
        "data": {
            "id": 1,
            "source": "api",
            "original_data": null,
            "status": "new",
            "qualification_score": null,
            "lead_details": null,
            "assigned_to_user_id": null,
            "created_at": "2025-06-24T08:00:00.000000Z",
            "updated_at": "2025-06-24T08:00:00.000000Z"
        }
    }
    ```
*   **Response (Error):**

    ```json
    {
        "status": "error",
        "message": "Failed to retrieve lead",
        "error": "Error message here"
    }
    ```

### Update Lead

*   **Description:** Updates an existing lead.
*   **Method:** PUT/PATCH
*   **Endpoint:** `/api/leads/{lead}`
*   **Request:**

    ```json
    {
        "source": "api",
        "original_data": null,
        "status": "new",
        "qualification_score": null,
        "lead_details": null,
        "assigned_to_user_id": null
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Lead updated successfully",
        "data": {
            "id": 1,
            "source": "api",
            "original_data": null,
            "status": "new",
            "qualification_score": null,
            "lead_details": null,
            "assigned_to_user_id": null,
            "created_at": "2025-06-24T08:00:00.000000Z",
            "updated_at": "2025-06-24T08:00:00.000000Z"
        }
    }
    ```
*   **Response (Error):**

    ```json
    {
        "status": "error",
        "message": "Failed to update lead",
        "error": "Error message here"
    }
    ```

### Delete Lead

*   **Description:** Deletes a specific lead by ID.
*   **Method:** DELETE
*   **Endpoint:** `/api/leads/{lead}`
*   **Request:** N/A
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Lead deleted successfully"
    }
    ```
*   **Response (Error):**

    ```json
    {
        "status": "error",
        "message": "Failed to delete lead",
        "error": "Error message here"
    }
    ```

## Properties API

### List Properties

*   **Description:** Retrieves a list of all properties.
*   **Method:** GET
*   **Endpoint:** `/api/properties`
*   **Request:**

    ```json
    {
        "page": 1,
        "per_page": 10
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Properties retrieved successfully",
        "data": [
            {
                "id": 1,
                "seller_user_id": 1,
                "address": "123 Main St",
                "description": "A beautiful property",
                "price": 250000.00,
                "status": "available",
                "property_details": null,
                "arv": 300000.00,
                "estimated_repairs": 25000.00,
                "created_at": "2025-06-24T08:00:00.000000Z",
                "updated_at": "2025-06-24T08:00:00.000000Z"
            }
        ],
        "links": {
            "first": "/api/properties?page=1",
            "last": "/api/properties?page=1",
            "prev": null,
            "next": null
        },
        "meta": {
            "current_page": 1,
            "from": 1,
            "last_page": 1,
            "links": [
                {
                    "url": null,
                    "label": "&laquo; Previous",
                    "active": false
                },
                {
                    "url": "/api/properties?page=1",
                    "label": "1",
                    "active": true
                },
                {
                    "url": null,
                    "label": "Next &raquo;",
                    "active": false
                }
            ],
            "path": "/api/properties",
            "per_page": 10,
            "to": 1,
            "total": 1
        }
    }
    ```
*   **Response (Error):**

    ```json
    {
        "status": "error",
        "message": "Failed to retrieve properties",
        "error": "Error message here"
    }
    ```

### Create Property

*   **Description:** Creates a new property.
*   **Method:** POST
*   **Endpoint:** `/api/properties`
*   **Request:**

    ```json
    {
        "seller_user_id": 1,
        "address": "456 Oak Ave",
        "description": "A beautiful property",
        "price": 250000.00,
        "status": "available",
        "property_details": null,
        "arv": 300000.00,
        "estimated_repairs": 25000.00
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Property created successfully",
        "data": {
            "id": 2,
            "seller_user_id": 1,
            "address": "456 Oak Ave",
            "description": "A beautiful property",
            "price": 250000.00,
            "status": "available",
            "property_details": null,
            "arv": 300000.00,
            "estimated_repairs": 25000.00,
            "created_at": "2025-06-24T08:00:00.000000Z",
            "updated_at": "2025-06-24T08:00:00.000000Z"
        }
    }
    ```
*   **Response (Error):**

    ```json
    {
        "status": "error",
        "message": "Failed to create property",
        "error": "Error message here"
    }
    ```

### Get Property

*   **Description:** Retrieves a specific property by ID.
*   **Method:** GET
*   **Endpoint:** `/api/properties/{property}`
*   **Request:** N/A
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Property retrieved successfully",
        "data": {
            "id": 1,
            "seller_user_id": 1,
            "address": "123 Main St",
            "description": "A beautiful property",
            "price": 250000.00,
            "status": "available",
            "property_details": null,
            "arv": 300000.00,
            "estimated_repairs": 25000.00,
            "created_at": "2025-06-24T08:00:00.000000Z",
            "updated_at": "2025-06-24T08:00:00.000000Z"
        }
    }
    ```
*   **Response (Error):**

    ```json
    {
        "status": "error",
        "message": "Failed to retrieve property",
        "error": "Error message here"
    }
    ```

### Update Property

*   **Description:** Updates an existing property.
*   **Method:** PUT/PATCH
*   **Endpoint:** `/api/properties/{property}`
*   **Request:**

    ```json
    {
        "seller_user_id": 1,
        "address": "456 Oak Ave",
        "description": "A beautiful property",
        "price": 250000.00,
        "status": "available",
        "property_details": null,
        "arv": 300000.00,
        "estimated_repairs": 25000.00
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Property updated successfully",
        "data": {
            "id": 1,
            "seller_user_id": 1,
            "address": "456 Oak Ave",
            "description": "A beautiful property",
            "price": 250000.00,
            "status": "available",
            "property_details": null,
            "arv": 300000.00,
            "estimated_repairs": 25000.00,
            "created_at": "2025-06-24T08:00:00.000000Z",
            "updated_at": "2025-06-24T08:00:00.000000Z"
        }
    }
    ```
*   **Response (Error):**

    ```json
    {
        "status": "error",
        "message": "Failed to update property",
        "error": "Error message here"
    }
    ```

### Delete Property

*   **Description:** Deletes a specific property by ID.
*   **Method:** DELETE
*   **Endpoint:** `/api/properties/{property}`
*   **Request:** N/A
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Property deleted successfully"
    }
    ```
*   **Response (Error):**

    ```json
    {
        "status": "error",
        "message": "Failed to delete property",
        "error": "Error message here"
    }
    ```

## Offers API

### List Offers

*   **Description:** Retrieves a list of all offers.
*   **Method:** GET
*   **Endpoint:** `/api/offers`
*   **Request:**

    ```json
    {
        "page": 1,
        "per_page": 10
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Offers retrieved successfully",
        "data": [
            {
                "id": 1,
                "property_id": 1,
                "buyer_user_id": 1,
                "offer_amount": "100000.00",
                "status": "pending",
                "message": "I am interested in this property.",
                "terms": null,
                "created_at": "2025-06-24T08:00:00.000000Z",
                "updated_at": "2025-06-24T08:00:00.000000Z"
            }
        ],
        "links": {
            "first": "/api/offers?page=1",
            "last": "/api/offers?page=1",
            "prev": null,
            "next": null
        },
        "meta": {
            "current_page": 1,
            "from": 1,
            "last_page": 1,
            "links": [
                {
                    "url": null,
                    "label": "&laquo; Previous",
                    "active": false
                },
                {
                    "url": "/api/offers?page=1",
                    "label": "1",
                    "active": true
                },
                {
                    "url": null,
                    "label": "Next &raquo;",
                    "active": false
                }
            ],
            "path": "/api/offers",
            "per_page": 10,
            "to": 1,
            "total": 1
        }
    }
    ```
*   **Response (Error):**

    ```json
    {
        "status": "error",
        "message": "Failed to retrieve offers",
        "error": "Error message here"
    }
    ```

### Create Offer

*   **Description:** Creates a new offer.
*   **Method:** POST
*   **Endpoint:** `/api/offers`
*   **Request:**

    ```json
    {
        "property_id": 2,
        "buyer_user_id": 2,
        "offer_amount": "120000.00",
        "status": "pending",
        "message": "I would like to make an offer.",
        "terms": null
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Offer created successfully",
        "data": {
            "id": 2,
            "property_id": 2,
            "buyer_user_id": 2,
            "offer_amount": "120000.00",
            "status": "pending",
            "message": "I would like to make an offer.",
            "terms": null,
            "created_at": "2025-06-24T08:00:00.000000Z",
            "updated_at": "2025-06-24T08:00:00.000000Z"
        }
    }
    ```
*   **Response (Error):**

    ```json
    {
        "status": "error",
        "message": "Failed to create offer",
        "error": "Error message here"
    }
    ```

### Get Offer

*   **Description:** Retrieves a specific offer by ID.
*   **Method:** GET
*   **Endpoint:** `/api/offers/{offer}`
*   **Request:** N/A
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Offer retrieved successfully",
        "data": {
            "id": 1,
            "property_id": 1,
            "buyer_user_id": 1,
            "offer_amount": "100000.00",
            "status": "pending",
            "message": "I am interested in this property.",
            "terms": null,
            "created_at": "2025-06-24T08:00:00.000000Z",
            "updated_at": "2025-06-24T08:00:00.000000Z"
        }
    }
    ```
*   **Response (Error):**

    ```json
    {
        "status": "error",
        "message": "Failed to retrieve offer",
        "error": "Error message here"
    }
    ```

### Update Offer

*   **Description:** Updates an existing offer.
*   **Method:** PUT/PATCH
*   **Endpoint:** `/api/offers/{offer}`
*   **Request:**

    ```json
    {
        "offer_amount": "110000.00",
        "status": "accepted"
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Offer updated successfully",
        "data": {
            "id": 1,
            "property_id": 1,
            "buyer_user_id": 1,
            "offer_amount": "110000.00",
            "status": "accepted",
            "message": "I am interested in this property.",
            "terms": null,
            "created_at": "2025-06-24T08:00:00.000000Z",
            "updated_at": "2025-06-24T08:00:00.000000Z"
        }
    }
    ```
*   **Response (Error):**

    ```json
    {
        "status": "error",
        "message": "Failed to update offer",
        "error": "Error message here"
    }
    ```

### Delete Offer

*   **Description:** Deletes a specific offer by ID.
*   **Method:** DELETE
*   **Endpoint:** `/api/offers/{offer}`
*   **Request:** N/A
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Offer deleted successfully"
    }
    ```
*   **Response (Error):**

    ```json
    {
        "status": "error",
        "message": "Failed to delete offer",
        "error": "Error message here"
    }
    ```

## Agreements API

### List Agreements

*   **Description:** Retrieves a list of all agreements.
*   **Method:** GET
*   **Endpoint:** `/api/agreements`
*   **Request:**

    ```json
    {
        "page": 1,
        "per_page": 10
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Agreements retrieved successfully",
        "data": [
            {
                "id": 1,
                "offer_id": 1,
                "type": "assignment",
                "status": "draft",
                "document_template_name": "template.pdf",
                "generated_document_path": "path/to/document.pdf",
                "signature_provider_id": null,
                "parties_involved": null,
                "agreement_details": null,
                "created_at": "2025-06-24T08:00:00.000000Z",
                "updated_at": "2025-06-24T08:00:00.000000Z"
            }
        ],
        "links": {
            "first": "/api/agreements?page=1",
            "last": "/api/agreements?page=1",
            "prev": null,
            "next": null
        },
        "meta": {
            "current_page": 1,
            "from": 1,
            "last_page": 1,
            "links": [
                {
                    "url": null,
                    "label": "&laquo; Previous",
                    "active": false
                },
                {
                    "url": "/api/agreements?page=1",
                    "label": "1",
                    "active": true
                },
                {
                    "url": null,
                    "label": "Next &raquo;",
                    "active": false
                }
            ],
            "path": "/api/agreements",
            "per_page": 10,
            "to": 1,
            "total": 1
        }
    }
    ```
*   **Response (Error):**

    ```json
    {
        "status": "error",
        "message": "Failed to retrieve agreements",
        "error": "Error message here"
    }
    ```

### Create Agreement

*   **Description:** Creates a new agreement.
*   **Method:** POST
*   **Endpoint:** `/api/agreements`
*   **Request:**

    ```json
    {
        "offer_id": 2,
        "type": "jv_agreement",
        "status": "draft",
        "document_template_name": "jv_template.pdf",
        "generated_document_path": "path/to/jv_document.pdf",
        "signature_provider_id": null,
        "parties_involved": null,
        "agreement_details": null
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Agreement created successfully",
        "data": {
            "id": 2,
            "offer_id": 2,
            "type": "jv_agreement",
            "status": "draft",
            "document_template_name": "jv_template.pdf",
            "generated_document_path": "path/to/jv_document.pdf",
            "signature_provider_id": null,
            "parties_involved": null,
            "agreement_details": null,
            "created_at": "2025-06-24T08:00:00.000000Z",
            "updated_at": "2025-06-24T08:00:00.000000Z"
        }
    }
    ```
*   **Response (Error):**

    ```json
    {
        "status": "error",
        "message": "Failed to create agreement",
        "error": "Error message here"
    }
    ```

### Get Agreement

*   **Description:** Retrieves a specific agreement by ID.
*   **Method:** GET
*   **Endpoint:** `/api/agreements/{agreement}`
*   **Request:** N/A
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Agreement retrieved successfully",
        "data": {
            "id": 1,
            "offer_id": 1,
            "type": "assignment",
            "status": "draft",
            "document_template_name": "template.pdf",
            "generated_document_path": "path/to/document.pdf",
            "signature_provider_id": null,
            "parties_involved": null,
            "agreement_details": null,
            "created_at": "2025-06-24T08:00:00.000000Z",
            "updated_at": "2025-06-24T08:00:00.000000Z"
        }
    }
    ```
*   **Response (Error):**

    ```json
    {
        "status": "error",
        "message": "Failed to retrieve agreement",
        "error": "Error message here"
    }
    ```

### Update Agreement

*   **Description:** Updates an existing agreement.
*   **Method:** PUT/PATCH
*   **Endpoint:** `/api/agreements/{agreement}`
*   **Request:**

    ```json
    {
        "status": "sent_for_signature"
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Agreement updated successfully",
        "data": {
            "id": 1,
            "offer_id": 1,
            "type": "assignment",
            "status": "sent_for_signature",
            "document_template_name": "template.pdf",
            "generated_document_path": "path/to/document.pdf",
            "signature_provider_id": null,
            "parties_involved": null,
            "agreement_details": null,
            "created_at": "2025-06-24T08:00:00.000000Z",
            "updated_at": "2025-06-24T08:00:00.000000Z"
        }
    }
    ```
*   **Response (Error):**

    ```json
    {
        "status": "error",
        "message": "Failed to update agreement",
        "error": "Error message here"
    }
    ```

### Delete Agreement

*   **Description:** Deletes a specific agreement by ID.
*   **Method:** DELETE
*   **Endpoint:** `/api/agreements/{agreement}`
*   **Request:** N/A
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Agreement deleted successfully"
    }
    ```
*   **Response (Error):**

    ```json
    {
        "status": "error",
        "message": "Failed to delete agreement",
        "error": "Error message here"
    }
    ```

## User Authentication & Registration API

### Register User

*   **Description:** Registers a new user.
*   **Method:** POST
*   **Endpoint:** `/api/register`
*   **Request:**

    ```json
    {
        "name": "User Name",
        "email": "user@example.com",
            "password": "password",
            "password_confirmation": "password",
            "role": "seller/buyer/investor"
    }
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "User registered successfully",
        "data": {
            "id": 1,
            "name": "User Name",
            "email": "user@example.com",
            "email_verified_at": null,
            "role": "seller/buyer/investor",
            "created_at": "2025-06-24T08:00:00.000000Z",
            "updated_at": "2025-06-24T08:00:00.000000Z"
        }
    }
    ```
*   **Response (Error):**

    ```json
    {
        "status": "error",
        "message": "Failed to register user",
        "error": "Error message here"
    }
    ```

### Login User

*   **Description:** Logs in an existing user.
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
            "token": "API_TOKEN"
        }
    }
    ```
*   **Response (Error):**

    ```json
    {
        "status": "error",
        "message": "Failed to login",
        "error": "Error message here"
    }
    ```

## Lead Management API

### Import Leads from CSV

*   **Description:** Imports leads from a CSV file.
*   **Method:** POST
*   **Endpoint:** `/api/leads/import`
*   **Request:**

    ```
    // CSV file upload
    ```
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Leads imported successfully",
        "data": {
            "imported": 10,
            "failed": 2
        }
    }
    ```
*   **Response (Error):**

    ```json
    {
        "status": "error",
        "message": "Failed to import leads",
        "error": "Error message here"
    }
    ```

### Get AI Lead Score

*   **Description:** Retrieves an AI-powered lead score for a specific lead.
*   **Method:** GET
*   **Endpoint:** `/api/leads/{lead}/score`
*   **Response (Success):**

    ```json
    {
        "status": "success",
        "message": "Lead score retrieved successfully",
        "data": {
            "lead_id": 1,
            "score": 0.85
        }
    }
    ```
*   **Response (Error):**

    ```json
    {
        "status": "error",
        "message": "Failed to retrieve lead score",
        "error": "Error message here"
    }
    ```

## Marketplace API

### Create Property Listing (Seller)

*   **Description:** Creates a new property listing by a seller.
*   **Method:** POST
*   **Endpoint:** `/api/properties/seller`
*   **Request:**

    ```json
    {
        "seller_user_id": 1,
        "address": "789 Pine Ln",
        "description": "Charming lakeside property",
        "price": 350000.00,
        "status": "available",
        "property_details": {
            "bedrooms": 3,
            "bath
