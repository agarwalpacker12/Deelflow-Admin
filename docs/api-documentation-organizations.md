# Organizations API

The Organizations API allows you to manage organizations within the system.

## Organization Model

The `Organization` model contains the following fields:

- `id` (integer, read-only): The unique identifier for the organization.
- `name` (string, required): The name of the organization.
- `slug` (string, unique, nullable): The slug for the organization.
- `subscription_status` (string, nullable): The subscription status of the organization. Can be `new`, `active`, `suspended`, or `waiting`.
- `industry` (string, nullable): The industry of the organization.
- `organization_size` (string, nullable): The size of the organization.
- `business_email` (string, nullable): The business email of the organization.
- `business_phone` (string, nullable): The business phone of the organization.
- `website` (string, nullable): The website of the organization.
- `support_email` (string, nullable): The support email of the organization.
- `street_address` (string, nullable): The street address of the organization.
- `city` (string, nullable): The city of the organization.
- `state_province` (string, nullable): The state or province of the organization.
- `zip_postal_code` (string, nullable): The zip or postal code of the organization.
- `country` (string, nullable): The country of the organization.
- `timezone` (string, nullable): The timezone of the organization.
- `language` (string, nullable): The language of the organization.
- `created_at` (datetime, read-only): The date and time the organization was created.
- `updated_at` (datetime, read-only): The date and time the organization was last updated.

## API Endpoints

### GET /api/organizations

- **Description:** Retrieve the current user's organization.
- **Response:** A JSON object representing the organization.

### GET /api/organizations/{id}

- **Description:** Retrieve a specific organization by its ID.
- **Parameters:**
  - `id` (integer, required): The ID of the organization to retrieve.
- **Response:** A JSON object representing the organization.

### POST /api/organizations

- **Description:** Create a new organization.
- **Request Body:** A JSON object containing the organization's data.
  - `name` (string, required)
  - `industry` (string, nullable)
  - `organization_size` (string, nullable)
  - `business_email` (string, nullable)
  - `business_phone` (string, nullable)
  - `website` (string, nullable)
  - `support_email` (string, nullable)
  - `street_address` (string, nullable)
  - `city` (string, nullable)
  - `state_province` (string, nullable)
  - `zip_postal_code` (string, nullable)
  - `country` (string, nullable)
  - `timezone` (string, nullable)
  - `language` (string, nullable)
- **Response:** A JSON object representing the newly created organization.

### PUT /api/organizations/{id}

- **Description:** Update an existing organization.
- **Parameters:**
  - `id` (integer, required): The ID of the organization to update.
- **Request Body:** A JSON object containing the fields to update.
- **Response:** A JSON object representing the updated organization.

### DELETE /api/organizations/{id}

- **Description:** Delete an organization.
- **Parameters:**
  - `id` (integer, required): The ID of the organization to delete.
- **Response:** A success message.

### GET /api/organizations/status

- **Description:** Get the subscription status of the current user's organization.
- **Response:** A JSON object with the organization's subscription status.

### PUT /api/organizations/{id}/subscription-status

- **Description:** Update the subscription status of an organization.
- **Parameters:**
  - `id` (integer, required): The ID of the organization to update.
- **Request Body:**
  - `subscription_status` (string, required): The new subscription status. Can be `new`, `active`, `suspended`, or `waiting`.
- **Response:** A JSON object representing the updated organization.

### DELETE /api/organizations/{id}/users/{user_id}

- **Description:** Remove a user from an organization.
- **Parameters:**
  - `id` (integer, required): The ID of the organization.
  - `user_id` (integer, required): The ID of the user to remove.
- **Response:** A success message.

### PUT /api/organizations/{id}/users/{user_id}/status

- **Description:** Update a user's status within an organization.
- **Parameters:**
  - `id` (integer, required): The ID of the organization.
  - `user_id` (integer, required): The ID of the user to update.
- **Request Body:**
  - `status` (string, required): The new status for the user. Can be `active` or `inactive`.
- **Response:** A JSON object representing the updated user.
