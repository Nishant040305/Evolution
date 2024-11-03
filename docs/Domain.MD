### Open Project by Domain

- **Route**: `GET /:domain`
- **Description**: Opens a project associated with the given domain. If the project exists, the corresponding HTML file is sent to the client.

#### Request Parameters
- `domain` (string): The domain associated with the project to be opened.

#### Response
- **200 OK**: If the project is found, returns the HTML file for the project.
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

- **Successful Response**:
- Status: `200 OK`
- Content: HTML file of the project.

- **Error Response**:
- Status: `404 Not Found`
- Content:
  ```json
  {
      "message": "404 Page not found"
  }
  ```
