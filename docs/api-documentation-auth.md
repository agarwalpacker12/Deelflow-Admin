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
