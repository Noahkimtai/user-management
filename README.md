# User Management Project

This repository contains the backend API, frontend application, Playwright end-to-end tests, and Postman API tests for a User Management system.

## Table of Contents

1.  [Prerequisites](#1-prerequisites)
2.  [Backend Setup and Running](#2-backend-setup-and-running)
3.  [Frontend Setup and Running](#3-frontend-setup-and-running)
4.  [Playwright End-to-End Tests](#4-playwright-end-to-end-tests)
5.  [Postman API Tests](#5-postman-api-tests)
6.  [Project Structure](#6-project-structure)
7.  [Troubleshooting](#7-troubleshooting)

---

## 1. Prerequisites

Before you begin, ensure you have the following installed on your system:

* **Node.js**: LTS version (e.g., v18.x or v20.x). You can download it from [nodejs.org](https://nodejs.org/).
* **npm** (Node Package Manager): Comes bundled with Node.js.
* **Docker**: Or access to a MongoDB instance (local or cloud-based).
* **Git**: For cloning the repository.
* **Postman Desktop App**: For importing and running API tests. Download from [postman.com/downloads](https://www.postman.com/downloads/).

---
## Project Structure
├── backend  
├── compose.yml  
├── frontend  
├── infra   
├── README.md  
└── tests 

## 2. Backend Setup and Running

The backend is an API that handles user registration, authentication, and management.

### Setup Steps:

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:Noahkimtai/user-management.git
    cd user-management/backend # Navigate to your backend directory
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Rename the `.env_template` file to  `.env` in the `backend` directory. This file will store configurations information.

4.  **Start the MongoDB container:**
    The database for storing user information is set using a docker container.
    ```bash
    docker compose up -d
    ```
5.  **Start the Backend Server:**
    ```bash
    npm start
    ```
    The backend server should now be running, typically on `http://localhost:8080`.

---

## 3. Frontend Setup and Running

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend/
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Start the Frontend Development Server:**
    ```bash
    npm run dev
    ```
    The frontend application should now be running, typically on `http://localhost:5173`.

---

## 4. Playwright End-to-End Tests

Playwright tests simulate user interactions with your frontend application to ensure the entire system works as expected.

### Setup Steps:

1.  **Navigate to the tests directory:**
    ```bash
    cd tests/
    ```
1.  **Install Playwright dependencies:**
    ```bash
    npm install
    npx playwright install
    ```
1.  **Ensure Backend and Frontend are Running:**
    For Playwright tests to run successfully, your backend API and frontend application must be running (as described in sections 2 and 3).

### Running Playwright Tests:

1.  **Run all tests:**
    ```bash
    npx playwright test
    ```

1.  **Run specific tests (e.g., a file or a describe block):**
    ```bash
    npx playwright test functional_ui_tests/user_management_functional.spec.ts
    ```
---

## 5. Postman API Tests

Your Postman collection contains automated API tests for your backend endpoints.

### Setup Steps:

1.  **Import the Collection into Postman:**
    * Open your Postman Desktop App.
    * Click on the **"Import"** button in the top-left corner.
    * Select **"Upload Files"** and choose your Postman collection JSON file(`tests/api_tests/api_tests.postman_collection.json`).
    * Click "Import".
    The collection will now appear in your "Collections" sidebar.

2.  **Set up Postman Environment:**
    Postman tests use an environment variable for the `baseUrl` (`{{baseUrl}}/api/v1/user/register`).

    * In Postman, click on the **"Environments"** tab in the left sidebar.
    * Click the `+` icon to create a new environment.
    * Give it a name (e.g., "User Management Local").
    * Add a variable:
        * **Variable:** `baseUrl`
        * **Initial Value:** `http://localhost:8080` (or the base URL where your backend is running)
        * **Current Value:** `http://localhost:8080`
    * Click "Save".
    * Select this environment from the dropdown in the top-right corner of Postman.

### Running Postman API Tests:

1.  **Run a Single Request:**
    * Expand the imported collection in the "Collections" sidebar.
    * Click on any individual request (e.g., "User Registration").
    * Click the blue "Send" button.
    * The "Test Results" tab at the bottom will show if the tests associated with that request passed or failed.

2.  **Run the Entire Collection:**
    * In the "Collections" sidebar, hover over your imported collection (or a specific folder within it).
    * Click the `...` (More actions) menu.
    * Select **"Run"**.
    * In the Collection Runner window:
        * Ensure the desired requests are checked.
        * Set the "Iterations" to 1.
        * Click the "Run api_tests" button.
    * The Collection Runner will display the results for each request and iteration.
 
