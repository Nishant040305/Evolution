# Credential Management API Documentation

This document provides an overview of the Credential Management API, including its endpoints, methods, and functions for user authentication and account management.

## Table of Contents
- [Overview](#overview)
- [API Endpoints](#api-endpoints)
- [Controller Functions](#controller-functions)
- [Middleware](#middleware)
- [Models](#models)

## Overview
The Credential Management API facilitates user authentication, account verification, password recovery, and password changes. It provides endpoints for signing in, logging in, and verifying user accounts through OTP (One-Time Password).

## API Endpoints

### 1. Get User Info
- **Route**: `/api/auth/`
- **Method**: `GET`
- **Description**: Retrieves the current user's information if verified.
- **Middleware**: `UserVerifier`
- **Response**:
    - **Status Code**: `200 OK`
    - **Body**: 
      ```json
      {
          "info": {
              "_id": "User ID",
              "displayname": "User's display name",
              "email": "User's email",
              "projects": [ "Project1", "Project2" ],
              "avatar": "URL to user's avatar image"
          }
      }
      ```

### 2. Sign In
- **Route**: `/api/auth/signin`
- **Method**: `POST`
- **Description**: Signs in a user by creating a new account if it does not exist and sends a verification OTP.
- **Request Body**: 
    - `EMAIL`: User's email address (string)
    - `PASSWORD`: User's password (string)
- **Response**: 
    - **Status Code**: `200 OK`
      - **Body**:
      ```json
      {
          "message": "An Email sent to your account please verify",
          "AUTH": "Token ID"
      }
      ```
    - **Status Code**: `400 Bad Request`
      - **Body**:
      ```json
      {
          "message": "User already exists"
      }
      ```

### 3. Verify User
- **Route**: `/api/auth/OTPverification`
- **Method**: `POST`
- **Description**: Verifies the user's email using the OTP sent to their email address.
- **Request Body**: 
    - `AUTHENTICATION`: Token ID for OTP verification (string)
    - `OTP`: The OTP received via email (string)
- **Response**: 
    - **Status Code**: `200 OK`
      - **Body**:
      ```json
      {
          "_id": {
              "displayname": "User's display name",
              "_id": "User ID",
              "email": "User's email",
              "projects": [ "Project1", "Project2" ],
              "avatar": "URL to user's avatar image"
          },
          "message": "Email verified successfully"
      }
      ```
    - **Status Code**: `400 Bad Request`
      - **Body**:
      ```json
      {
          "message": "OTP Expired or invalid"
      }
      ```

### 4. Log In
- **Route**: `/api/auth/login`
- **Method**: `POST`
- **Description**: Logs in an existing user and returns user info along with a JWT token.
- **Request Body**: 
    - `EMAIL`: User's email address (string)
    - `PASSWORD`: User's password (string)
- **Response**: 
    - **Status Code**: `200 OK`
      - **Body**:
      ```json
      {
          "info": {
              "_id": "User ID",
              "displayname": "User's display name",
              "email": "User's email",
              "projects": [ "Project1", "Project2" ],
              "avatar": "URL to user's avatar image"
          },
          "message": "Login successful"
      }
      ```
    - **Status Code**: `400 Bad Request`
      - **Body**:
      ```json
      {
          "error": "please try to login with correct credentials"
      }
      ```

### 5. Password Recovery
- **Route**: `/api/auth/forgetPassword`
- **Method**: `POST`
- **Description**: Initiates the password recovery process by sending an OTP to the user's email.
- **Request Body**: 
    - `EMAIL`: User's email address (string)
- **Response**: 
    - **Status Code**: `200 OK`
      - **Body**:
      ```json
      {
          "type": "PasswordChangeOTP",
          "AUTH": "Token ID"
      }
      ```
    - **Status Code**: `404 Not Found`
      - **Body**:
      ```json
      {
          "message": "User not found"
      }
      ```

### 6. Change Password
- **Route**: `/api/auth/passwordChange`
- **Method**: `POST`
- **Description**: Changes the user's password after verifying the OTP.
- **Request Body**: 
    - `AUTHENTICATION`: Token ID for password change (string)
    - `PASSWORD`: New password (string)
- **Response**: 
    - **Status Code**: `200 OK`
      - **Body**:
      ```json
      {
          "info": {
              "displayname": "User's display name",
              "_id": "User ID",
              "email": "User's email",
              "projects": [ "Project1", "Project2" ],
              "avatar": "URL to user's avatar image"
          },
          "message": "Password updated successfully"
      }
      ```
    - **Status Code**: `400 Bad Request`
      - **Body**:
      ```json
      {
          "message": "Invalid or expired OTP"
      }
      ```

## Controller Functions
The controller functions are responsible for handling the business logic for each API endpoint. They include:
- `Signin`: Handles user sign-in and account creation with email verification.
- `VerifyUser`: Verifies the user's OTP and updates the user’s verification status.
- `LogIn`: Authenticates users and issues JWT tokens for session management.
- `PasswordRecovery`: Sends a password recovery OTP to the user's email.
- `ConfirmPasswordChange`: Updates the user's password after OTP verification.

## Middleware
- `UserVerifier`: This middleware checks whether the user is verified before accessing certain endpoints, ensuring only verified users can retrieve their info.

## Models
- `User`: Represents the user entity in the database, including fields for display name, email, hashed password, and verification status.
- `Token`: Represents tokens used for OTP verification and password recovery, linked to the user.

This documentation provides a clear understanding of how to interact with the Credential Management API for authentication and account management tasks.
