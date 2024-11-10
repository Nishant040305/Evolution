# Project Management API Documentation

This documentation provides an overview of the Project Management API, detailing routes, methods, and functionalities for managing projects, including CRUD operations, publishing, and member management.

## Table of Contents
- [Project Management API Documentation](#project-management-api-documentation)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [API Routes](#api-routes)
    - [Project Routes](#project-routes)
    - [Member Routes](#member-routes)
    - [Publish and Download Routes](#publish-and-download-routes)
  - [Controller Functions](#controller-functions)

## Overview
The Project Management API enables users to create, retrieve, update, delete, and publish projects. Each project is associated with a user, and role-based access control is enforced to ensure that only authorized users can perform specific actions.

## API Routes

### Project Routes

1. **Get All Projects**
   - **Route**: `GET /api/project`
   - **Description**: Retrieves all projects associated with the authenticated user.
   - **Middleware**: `UserVerifier`
   - **Response**:
     - **200 OK**: Returns a list of projects.
     - **500 Internal Server Error**: Returns an error message if an error occurs while fetching projects.

2. **Get Project by ID**
   - **Route**: `GET /api/project/:id`
   - **Description**: Retrieves a project by its ID.
   - **Middleware**: `UserVerifier`, `authorize(permissions.viewProject)`
   - **Response**:
     - **200 OK**: Returns project details.
     - **404 Not Found**: Project not found.
     - **500 Internal Server Error**: Error retrieving project.

3. **Create a New Project**
   - **Route**: `POST /api/project`
   - **Description**: Creates a new project and associates it with a user.
   - **Middleware**: `UserVerifier`
   - **Request Body**:
     ```json
     {
         "name": "Project Name",
         "description": "Project Description",
         "user": "User ID"
     }
     ```
   - **Response**:
     - **201 Created**: Project created successfully.
     - **404 Not Found**: User not found.
     - **500 Internal Server Error**: Error creating project.

4. **Update Project by ID**
   - **Route**: `PUT /api/project/:id`
   - **Description**: Updates a project by its ID.
   - **Middleware**: `UserVerifier`, `authorize(permissions.manageProject)`
   - **Request Body**: Contains project details to be updated.
   - **Response**:
     - **200 OK**: Project updated successfully.
     - **404 Not Found**: Project not found.
     - **500 Internal Server Error**: Error updating project.

5. **Delete Project by ID**
   - **Route**: `DELETE /api/project/:id`
   - **Description**: Deletes a project by its ID.
   - **Middleware**: `UserVerifier`, `authorize(permissions.deleteProject)`
   - **Response**:
     - **200 OK**: Project deleted successfully.
     - **404 Not Found**: Project not found.
     - **500 Internal Server Error**: Error deleting project.

6. **Update Project Components**
   - **Route**: `PUT /api/project/:id/components`
   - **Description**: Updates specific components within a project.
   - **Middleware**: `UserVerifier`, `authorize(permissions.editProject)`
   - **Request Body**: JSON object containing component data.
   - **Response**:
     - **200 OK**: Components updated successfully.
     - **404 Not Found**: Project not found.
     - **500 Internal Server Error**: Error updating components.

7. **Update Project Media**
   - **Route**: `POST /api/project/image/:id`
   - **Description**: Uploads media (image) to be associated with the project.
   - **Middleware**: `UserVerifier`, `authorize(permissions.editProject)`, `multer` for file upload handling
   - **Request Body**: Form data with the image file.
   - **Response**:
     - **200 OK**: Image uploaded and updated successfully.
     - **500 Internal Server Error**: Error updating image.

### Member Routes

1. **Invite a Member**
   - **Route**: `POST /api/project/:id/invite/:userid`
   - **Description**: Invites a user to join a project.
   - **Middleware**: `UserVerifier`, `authorize(permissions.manageMembers)`
   - **Response**:
     - **200 OK**: Invitation sent successfully.
     - **404 Not Found**: Project or user not found.
     - **500 Internal Server Error**: Error sending invitation.

2. **Update Member Role**
   - **Route**: `PUT /api/project/:id/member/:userid`
   - **Description**: Updates the role of a project member.
   - **Middleware**: `UserVerifier`, `authorize(permissions.manageMembers)`
   - **Response**:
     - **200 OK**: Member role updated.
     - **404 Not Found**: Project or member not found.
     - **500 Internal Server Error**: Error updating role.

3. **Remove Member**
   - **Route**: `DELETE /api/project/:id/member/:userid`
   - **Description**: Removes a user from the project.
   - **Middleware**: `UserVerifier`, `authorize(permissions.manageMembers)`
   - **Response**:
     - **200 OK**: Member removed successfully.
     - **404 Not Found**: Project or member not found.
     - **500 Internal Server Error**: Error removing member.

### Publish and Download Routes

1. **Publish Project**
   - **Route**: `POST /api/project/:id/publish`
   - **Description**: Publishes a project by saving its HTML content.
   - **Middleware**: `UserVerifier`, `authorize(permissions.publishProject)`
   - **Request Body**: JSON containing HTML content.
   - **Response**:
     - **200 OK**: Project published successfully.
     - **400 Bad Request**: Missing required fields.
     - **500 Internal Server Error**: Error publishing project.

2. **Open Project by Domain**
   - **Route**: `GET /api/project/open/:domain`
   - **Description**: Opens a project by domain, serving the associated HTML file.
   - **Response**:
     - **200 OK**: Returns the HTML file.
     - **404 Not Found**: Project not found.
     - **500 Internal Server Error**: Error retrieving project.

3. **Download Project as ZIP**
   - **Route**: `GET /api/project/:id/download`
   - **Description**: Downloads the project as a ZIP file.
   - **Middleware**: `UserVerifier`, `authorize(permissions.downloadProject)`
   - **Response**:
     - **200 OK**: ZIP file of the project.
     - **500 Internal Server Error**: Error downloading project.

## Controller Functions

These functions handle the business logic for the above routes:

- **Project Controller**:
  - `getAllProjects`: Retrieves all projects for the authenticated user.
  - `getProjectById`: Fetches a project by its ID.
  - `createProject`: Creates a new project.
  - `updateProject`: Updates details of an existing project.
  - `deleteProject`: Deletes a project by its ID.
  - `updateComponents`: Updates specific components within a project.
  - `updateImageProject`: Handles image uploads for a project.

- **Publish Controller**:
  - `publishProject`: Publishes the project by saving HTML content to a file.
  - `openProject`: Opens the HTML file of a project based on domain.
  - `downloadProject`: Downloads the project as a ZIP file.

- **Member Controller**:
  - `inviteMember`: Invites a user to join a project.
  - `updateMemberRole`: Updates the role of an existing project member.
  - `removeMember`: Removes a user from the project.

This documentation provides a detailed guide for interacting with the Project Management API, covering endpoints, request and response formats, and the associated business logic.
