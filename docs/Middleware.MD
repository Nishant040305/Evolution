# Authorization Middleware

This middleware module provides a permission-based authorization system for a project management application. It defines various permissions, roles, and role-based access control functions to manage access to project resources.

## Overview

The middleware has the following key components:

1. **Permissions and Roles**: Defines a set of permissions and assigns them to various roles (e.g., owner, admin, editor, viewer).
2. **Helper Functions**:
   - `getMemberRole`: Fetches the role of a user within a project.
   - `hasPermission`: Checks if a user has the required permission to perform an action.
3. **Authorization Middleware**:
   - `authorize`: Middleware function to enforce permission checks based on roles and custom permissions.

## Functions

### 1. `getMemberRole`

Retrieves the project and the role of a specified user in that project.

- **Parameters**:
  - `projectId` - ID of the project.
  - `userId` - ID of the user.

- **Returns**: 
  - Object with `project` and `member`, where `member` contains user details and role.

- **Throws**:
  - Error if the project is not found.

### 2. `rolePermissions`

Defines the permissions available for each role based on project visibility.

- **Parameters**:
  - `visibility` - The visibility setting of the project.

- **Returns**:
  - Object mapping roles to their permitted actions.

### 3. `hasPermission`

Checks if a given member has the required permission for a project.

- **Parameters**:
  - `project` - The project object.
  - `member` - The member object (containing user and role).
  - `permission` - The permission to check for (e.g., `VIEW_PROJECT`).

- **Returns**:
  - Boolean indicating whether the permission is granted.

### 4. `authorize`

Express middleware to enforce authorization for protected routes.

- **Parameters**:
  - `permission` - The permission required to access the route.

- **Usage**:
  - `authorize(permission)` checks if the user has the specified permission before allowing access.
  - If authorized, the request proceeds to the next middleware. If not, it returns a 403 error.

- **Error Handling**:
  - Returns 400 if `projectId` is missing.
  - Returns 401 if the user is not authenticated.
  - Returns 403 if the user lacks the required permission.
  - Returns 500 on server errors.

## Permission Constants

The `permissions` object contains constants representing different permissions:

```javascript
const permissions = {
    viewProject: "VIEW_PROJECT",
    editProject: "EDIT_PROJECT",
    publishProject: "PUBLISH_PROJECT",
    downloadProject: "DOWNLOAD_PROJECT",
    manageProject: "MANAGE_PROJECT",
    deleteProject: "DELETE_PROJECT",
    manageMembers: "MANAGE_MEMBERS",
}
