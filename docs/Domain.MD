# Project Routes Documentation

This module provides routes for accessing projects by domain. It includes routes to open a project or audit its content based on the provided domain.

## Routes

### 1. Open Project by Domain

- **Route**: `GET /:domain`
- **Description**: Opens a project associated with the specified domain. If a project with the provided domain exists, the corresponding HTML file is sent to the client.

#### Request Parameters
- `domain` (string): The domain associated with the project to be opened.

#### Response
- **200 OK**: Returns the HTML file for the project if it exists.
- **404 Not Found**: If no project is found for the given domain.
  - **Response Body**:
    ```json
    {
        "message": "404 Page not found"
    }
    ```
- **500 Internal Server Error**: If an error occurs while fetching the project.
  - **Response Body**:
    ```json
    {
        "message": "Server error"
    }
    ```

#### Example Successful Response
- **Status**: `200 OK`
- **Content**: HTML file of the project.

#### Example Error Response
- **Status**: `404 Not Found`
- **Content**:
    ```json
    {
        "message": "404 Page not found"
    }
    ```

### 2. Audit Project by Domain

- **Route**: `GET /audit/:domain`
- **Description**: Audits a project associated with the specified domain. This endpoint is intended for reviewing the project’s content or structure for quality, SEO, or other checks.

#### Request Parameters
- `domain` (string): The domain associated with the project to be audited.

#### Response
- **200 OK**: Returns the audit details for the project.
- **404 Not Found**: If no project is found for the given domain.
  - **Response Body**:
    ```json
    {
        "message": "404 Project not found for audit"
    }
    ```
- **500 Internal Server Error**: If an error occurs while auditing the project.
  - **Response Body**:
    ```json
    {
        "message": "Server error during audit"
    }
    ```

#### Example Successful Response
- **Status**: `200 OK`
- **Content**: JSON containing audit details of the project.

#### Example Error Response
- **Status**: `404 Not Found`
- **Content**:
    ```json
    {
        "message": "404 Project not found for audit"
    }
    ```

## Module Exports

The module exports the following routes:
- `/:domain` - Opens a project by domain.
- `/audit/:domain` - Audits a project by domain.
