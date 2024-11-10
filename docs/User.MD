# User API Documentation

This documentation provides details about the User API, which handles user-specific operations such as retrieving user-related projects, updating profiles, and finding users by email.

## Endpoints

### 1. Get All Projects by User ID

- **URL**: `/api/user/:id/project`
- **Method**: `GET`
- **Description**: Retrieves all projects associated with a specific user by their user ID.
- **Parameters**:
  - `id` (path parameter): The unique identifier of the user whose projects you want to retrieve.

- **Middleware**: `UserVerifier`
  
- **Response**:
  - **Status Code**: `200 OK`
    - **Content**: A JSON array containing all projects related to the user. Each project object may include fields such as `id`, `name`, `description`, and `user`.
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

### 2. Get All Shared Projects by User ID

- **URL**: `/api/user/:id/shared`
- **Method**: `GET`
- **Description**: Retrieves all projects that are shared with the specified user by their user ID.
- **Parameters**:
  - `id` (path parameter): The unique identifier of the user whose shared projects you want to retrieve.

- **Middleware**: `UserVerifier`
  
- **Response**:
  - **Status Code**: `200 OK`
    - **Content**: A JSON array containing all shared projects related to the user.
    - **Body**:
      ```json
      [
        {
          "_id": "9876543210abcdef12345678",
          "name": "Project C",
          "description": "Description for Project C",
          "user": "abcdef1234567890"
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
        "message": "Error retrieving shared projects",
        "error": "Detailed error message"
      }
      ```

### 3. Update User Profile

- **URL**: `/api/user/:id`
- **Method**: `PUT`
- **Description**: Allows the authenticated user to update their profile information.
- **Parameters**:
  - `id` (path parameter): The unique identifier of the user whose profile is being updated.
  
- **Middleware**: `UserVerifier`

- **Request Body**: The updated user profile data, which can include fields like `displayname`, `email`, `profilePicture`, etc.
  ```json
  {
    "displayname": "New Display Name",
    "email": "newemail@example.com",
    "profilePicture": "new-image-url.jpg"
  }
## Response Examples

### 1. Update User Profile

#### Status Code: 200 OK
- **Body**:
  ```json
  {
    "_id": "1234567890abcdef",
    "displayname": "New Display Name",
    "email": "newemail@example.com",
    "profilePicture": "new-image-url.jpg"
  }
### 2. Find User by Email

### Status Code: 200 OK
- **Body**:
  ```json
  {
    "displayname":"New Display Name",
    "_id":"1234567890abcdef",
    "email":"newemail@example.com",
    "projects":["1234567890abcdef12345678","1234567890abcdef12345679"],
    "avatar":"new-image-url.jpg"
  }

### 3. Status Code: 400 Bad Request
- **Body**:
  ```json
  {
    "message": "User not found"
  }
  ```
### 4. Status Code: 500 Internal Server Error
- **Body**:
  ```json
  {
    "message": "Internal Server Error"
  }
  ```
  
### Controller Functions:

- **User Controller**:
  - `getAllUserProjects`: Retrieves all projects associated with a user by their user ID.
  - `getAllSharedProjects`: Retrieves all shared projects associated with a user by their user ID.
  - `ChangeProfile`: Updates the user's profile information.
  - `FindUserEmail`: Finds a user by their email. Returns the user's information if found, otherwise returns an error message.