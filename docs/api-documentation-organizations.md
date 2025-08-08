# Organizations API

The Organizations API allows you to manage organizations within the system.

## Organization Model

The `Organization` model contains the following fields:

- `id` (integer, read-only): The unique identifier for the organization.
- `name` (string, required): The name of the organization.
- `slug` (string, unique, nullable): The slug for the organization.
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

- **Description:** Retrieve a list of all organizations.
- **Response:** A JSON array of organization objects.

### GET /api/organizations/{id}

- **Description:** Retrieve a specific organization by its ID.
- **Parameters:**
  - `id` (integer, required): The ID of the organization to retrieve.
- **Response:** A JSON object representing the organization.

### POST /api/organizations

- **Description:** Create a new organization.
- **Request Body:** A JSON object containing the organization's data.
  - `name` (string, required)
  - `slug` (string, nullable)
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
