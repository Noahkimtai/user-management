# Automated Test Plan: User Management System

## 1. Introduction

This document details automated testing of the User Management system's backend and frontend.  
The goal of these tests is to ensure the functional correctness, reliability, and integration of both the frontend user interface and the backend API, covering key user management workflows.

## 2. What is Being Tested

This test plan covers the following components and their interactions:
1. Functional UI Tests with Playwright to assert presence of expected behavior after actions.
2. API Test Automation. Using Postman

### 2.1 Frontend (UI/End-to-End) Tests

Simulates user interactions within a browser, covering the entire user journey. They verify that the user interface behaves as expected and that the frontend correctly communicates with the backend API.

#### 2.1.1 Test Scenarios

* **Landing Page Display:** Verification that the initial landing page loads correctly and displays essential elements like the main heading, login button, and register button.
* **User Registration Flow:**
    * Successful registration of a new, valid user.
    * Prevention of registration with a duplicate email address.
    * Handling of registration attempts with invalid or empty input data.
* **User Login Flow:**
    * Successful login with valid user credentials.
    * Prevention of login with incorrect password.
    * Prevention of login with an unregistered email address.
* **User Profile Management:**
    * Ability to update an existing user's profile details (name, phone).
    * Ability to delete an existing user's account.

### 2.2 Backend (API) Test Scenarios

These tests directly interact with the backend API endpoints to verify their functionality, 

#### 2.2.1 Test Scenarios

* **User Login:**
    * Verify successful login with valid credentials.
    * Test login failures with incorrect passwords or non-existent email addresses.

* **User Creation (Registration):**
    * Validate successful registration of new user accounts.
    * Confirm prevention of registration with duplicate email addresses.
    * Test handling of invalid or missing registration data.

* **User Profile Editing:**
    * Verify the ability to successfully update existing user details (name, phone).
    * Test attempts to update non-existent user profiles.

* **User Deletion:**
    * Confirm successful deletion of existing user accounts.
    * Test attempts to delete non-existent user accounts.

* **Data Retrieval & Assertion:**
    * Test retrieving details for non-existent users.
    * Verify the comprehensive list of all registered users.



## 3. Test Coverage Areas

### 3.1 Functional Coverage

* **CRUD Operations for Users:** Comprehensive testing of Create (Register), Read (Get All, Get Single), Update (Update Profile), and Delete (Delete Account) functionalities.
* **Input Validation:** Testing how the system handles valid, invalid, missing, and duplicate input data across registration, login, and update flows.
* **Error Handling:** Validation of appropriate error messages and HTTP status codes for various failure scenarios (e.g., user not found, incorrect credentials, duplicate data).
* **Data Integrity:** Ensuring that user data is correctly stored, retrieved, and updated in the database.


## 4. Tools Used and Why

* **Playwright (for Frontend E2E Tests):**
    * **Why:** Playwright is a modern, fast, and reliable end-to-end testing framework. It allows for browser automation with a single API. Its auto-waiting capabilities reduce flakiness, and its support for Page Object Model (POM) promotes maintainable and reusable test code.  
    Additionally, Playwright comes with helpful tools for test debugging, and Selectors generations.
* **Postman (for Backend API Tests):**
    * **Why:** Postman provides an intuitive GUI for crafting HTTP requests, writing JavaScript-based test scripts (for assertions), and organizing tests into collections , making it ideal for validating API functionality and responses.

## 5. Assumptions and Limitations

### 5.1 Assumptions

* Both the backend API and frontend application are stable and running on their expected ports (`8080` for backend, `5173` for frontend) during test execution.
* A MongoDB instance is accessible and configured correctly for the backend.
* The provided `userData.ts` file contains the necessary test data for various scenarios (valid, duplicate, empty, wrong credentials, update).

### 5.2 Limitations

* **Test Data Management:** The current tests rely on static or simple dynamic test data. For more complex scenarios or larger test suites, a more robust test data management strategy (e.g., database seeding/teardown scripts, faker libraries for unique data generation within Postman/Playwright) would be beneficial to ensure test isolation and repeatability.
* **Test Isolation:** While Playwright provides a fresh `page` context for each test, the backend's in-memory data store (if used) means that backend state might persist between API calls or even between Playwright tests if not explicitly reset or managed. For true isolation, database cleanup/seeding before/after each test or test suite is recommended.
* **Non-Functional Testing Scope:** This test plan primarily focuses on functional correctness. Performance, load, stress, and comprehensive security testing are outside the current scope.
* **Error Message Brittleness:** Some Playwright tests assert on exact alert message strings. While effective, this can make tests brittle if error messages change frequently. Consider asserting on partial text or error codes if available.
* **Cross-Browser/Device Coverage:** While Playwright supports multiple browsers and devices, the provided configuration primarily targets Chrome. Expanding this would require adding more projects to `playwright.config.ts`.

## 6. How to Run the Tests

* [Click to Refer to the Readme to run the backend, frontend and tests](README.md)




