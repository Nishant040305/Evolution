# Project Management API Documentation

This document provides an overview of the Project Management API, including its routes, methods, and functionalities for managing projects.

## Table of Contents
- [Overview](#overview)
- [API Routes](#api-routes)
- [Controller Functions](#controller-functions)

## Overview
The Project Management API allows users to create, read, update, delete, and publish projects. Each project is associated with a user, and the API handles operations related to project management seamlessly.

## API Routes

### 1. Get All Projects
- **Route**: `GET /api/project`
- **Description**: Retrieves all projects from the database.
- **Response**:
    - **Status Code**: `200 OK`
    - **Body**:
      ```json
      [
          {
              "_id": "Project ID",
              "name": "Project Name",
              "description": "Project Description",
              "user": {
                  "_id": "User ID",
                  "displayname": "User's Display Name",
                  "email": "User's Email"
              },
              ...
          }
      ]
      ```
    - **Status Code**: `500 Internal Server Error`
      - **Body**:
      ```json
      {
          "message": "Error retrieving projects",
          "error": "Error details"
      }
      ```

### 2. Get Project by ID
- **Route**: `GET /api/project/:id`
- **Description**: Retrieves a specific project by its ID.
- **Response**:
    - **Status Code**: `200 OK`
    - **Body**:
      ```json
      {
          "_id": "Project ID",
          "name": "Project Name",
          "description": "Project Description",
          "user": {
              "_id": "User ID",
              "displayname": "User's Display Name",
              "email": "User's Email"
          },
          ...
      }
      ```
    - **Status Code**: `404 Not Found`
      - **Body**:
      ```json
      {
          "message": "Project not found"
      }
      ```
    - **Status Code**: `500 Internal Server Error`
      - **Body**:
      ```json
      {
          "message": "Error retrieving project",
          "error": "Error details"
      }
      ```

### 3. Create a New Project
- **Route**: `POST /api/project`
- **Description**: Creates a new project and associates it with a user.
- **Request Body**:
    ```json
    {
        "name": "Project Name",
        "description": "Project Description",
        "user": "User ID"
    }
    ```
- **Response**:
    - **Status Code**: `201 Created`
    - **Body**:
      ```json
      {
          "_id": "Project ID",
          "name": "Project Name",
          "description": "Project Description",
          "user": "User ID",
          ...
      }
      ```
    - **Status Code**: `404 Not Found`
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
          "message": "Error creating project",
          "error": "Error details"
      }
      ```

### 4. Update a Project by ID
- **Route**: `PUT /api/project/:id`
- **Description**: Updates a project by its ID.
- **Request Body**:
    ```json
    {
        "components": {
            // Project components
        }
    }
    ```
- **Response**:
    - **Status Code**: `200 OK`
    - **Body**:
      ```json
      {
          "_id": "Project ID",
          "components": {
              // Updated components
          },
          ...
      }
      ```
    - **Status Code**: `404 Not Found`
      - **Body**:
      ```json
      {
          "message": "Project not found"
      }
      ```
    - **Status Code**: `500 Internal Server Error`
      - **Body**:
      ```json
      {
          "message": "Error updating project",
          "error": "Error details"
      }
      ```

### 5. Delete a Project by ID
- **Route**: `DELETE /api/project/:id`
- **Description**: Deletes a project by its ID.
- **Response**:
    - **Status Code**: `200 OK`
    - **Body**:
      ```json
      {
          "message": "Project deleted successfully"
      }
      ```
    - **Status Code**: `404 Not Found`
      - **Body**:
      ```json
      {
          "message": "Project not found"
      }
      ```
    - **Status Code**: `500 Internal Server Error`
      - **Body**:
      ```json
      {
          "message": "Error deleting project",
          "error": "Error details"
      }
      ```

### 6. Publish a Project by ID
- **Route**: `POST /api/project/:id/publish`
- **Description**: Publishes a project by saving its HTML content to a file.
- **Request Body**:
    ```json
    {
        "id": "Project ID",
        "htmlContent": "<html>...</html>"
    }
    ```
- **Response**:
    - **Status Code**: `200 OK`
    - **Body**:
      ```json
      {
          "message": "File saved successfully."
      }
      ```
    - **Status Code**: `400 Bad Request`
      - **Body**:
      ```json
      {
          "error": "ID and HTML content are required."
      }
      ```
    - **Status Code**: `500 Internal Server Error`
      - **Body**:
      ```json
      {
          "error": "Error saving the file."
      }
      ```

### 7. Open a Project by Domain
- **Route**: `GET /api/project/open/:domain`
- **Description**: Opens a project by its domain and sends the associated HTML file.
- **Response**:
    - **Status Code**: `200 OK`
    - **Body**: HTML file
    - **Status Code**: `404 Not Found`
      - **Body**:
      ```json
      {
          "message": "404 Page not found"
      }
      ```
    - **Status Code**: `500 Internal Server Error`
      - **Body**:
      ```json
      {
          "error": "Server error"
      }
      ```

## Controller Functions
The controller functions handle the business logic for the API routes:

- **`getAllProjects`**: Retrieves all projects and populates user information.
- **`getProjectById`**: Fetches a project by its ID, returning user information.
- **`createProject`**: Creates a new project, linking it to a user.
- **`updateProject`**: Updates an existing project by its ID.
- **`deleteProject`**: Deletes a project and updates the user's project list.
- **`publishProject`**: Saves the HTML content of a project to a file.
- **`openProject`**: Serves the HTML file of a project by its domain.

This documentation serves as a comprehensive guide for interacting with the Project Management API.
