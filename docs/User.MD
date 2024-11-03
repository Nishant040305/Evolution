# User API Documentation

This document provides details about the User API, specifically for retrieving user-related project information.

## Endpoints

### 1. Get All Projects by User ID

- **URL:** `/api/user/:id/project`
- **Method:** `GET`
- **Description:** Retrieves all projects associated with a specific user by their ID.
- **Parameters:**
  - `id` (path parameter): The unique identifier of the user whose projects you want to retrieve.

- **Response**:
    - **Status Code**: `200 OK`
    - **Content**:A JSON array containing all projects related to the user. Each project object may include fields such as id, name, description, and user.
    - **Body**:
      ```json
            [
            {
                "_id": "1234567890abcdef12345678",
                "name": "Project A",
                "description": "Description for Project A",
                "user": "1234567890abcdef"
            },
            {
                "_id": "1234567890abcdef12345679",
                "name": "Project B",
                "description": "Description for Project B",
                "user": "1234567890abcdef"
            }
        ]

      ```
    - **Status Code**: `400 Bad Request`
      - **Body**:
      ```json
        {
            "message": "User not found"
        }

      ```
    - **Status Code**: `500 Internal Server Error`
      - **Body**:
      ```json
            {
            "message": "Error retrieving projects",
            "error": "Detailed error message"
        }
      ```
