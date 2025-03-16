# MedConnect Backend - API Services

This repository contains the backend API services for the MedConnect project, a life-saving application designed to connect users with critical medical resources during emergencies.

## Project Overview

(This repo is the backend of the platform. For the frontend, see [medconnect-frontend](https://github.com/Jayant-issar/hackathon-medConnect))
MedConnect is a web-based platform that centralizes essential medical resources such as blood banks, hospital beds, and medical supplies. It facilitates community-driven assistance and provides real-time alerts during emergencies, aiming to improve coordination between patients, hospitals, and volunteers.

This backend provides the API endpoints to manage and serve data for the MedConnect application.

**Key Features:**

*   **Centralized Resource Finder:** APIs to search for blood banks, hospital beds, creating emergency requests and medical supplies.
*   **Smart Resource Allocation (Planned-yet to implement):**  API endpoints that simulate AI-driven prioritization of resources based on urgency and proximity. 
*   **Community-Driven Help:** Endpoints to manage user requests for help and volunteer assistance.
*   **Event Management:** APIs for creating and managing blood donation events and vaccination camps.
*   **Real-Time Notifications (Planned - yet to implement):**  Socket.io integration for real-time updates and alerts (to be implemented).

## Technologies Used

*   **Backend Framework:** [Hono.js](https://hono.dev/) - A lightweight and fast web framework for Cloudflare Workers.
*   **Database:** [PostgreSQL](https://www.postgresql.org/) - Managed via [Prisma ORM](https://www.prisma.io/).
*   **ORM (Object-Relational Mapper):** [Prisma](https://www.prisma.io/) - For type-safe database access.
*   **Real-time Communication (Planned):** [Socket.io](https://socket.io/) - For real-time notifications (implementation in progress).
*   **Hosting:** [Cloudflare Workers](https://workers.cloudflare.com/) - Serverless platform for deployment.
*   **Authentication:** [Clerk](https://clerk.com/) - For user authentication (middleware included).
*   **CORS:** [hono/cors](https://hono.dev/middleware/cors) - For Cross-Origin Resource Sharing.

## Setup & Installation

To set up and run the backend API locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Jayant-issar/hackathon-medconnect-backend.git
    cd medconnect-backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    *   Create a `.env` file in the root of the backend directory.
    *   Add the following environment variables. You can refer to `.env-example` (if available) or the `wrangler.toml` file for necessary variables like `DATABASE_URL`. You will need to set up your own PostgreSQL database and Cloudflare account for full deployment. For local development, you might use a local PostgreSQL instance or a development database.

        ```env
        DATABASE_URL="your_postgresql_connection_string"
        CLERK_JWT_ISSUER="your_clerk_jwt_issuer" (yet to be implemented)
        CLERK_JWKS_URL="your_clerk_jwks_url" (yet to be implemented)
        ```
        **Note:**  The provided `wrangler.toml` file in the context includes a `DATABASE_URL` that uses Prisma Data Proxy and Accelerate. If you intend to use this, ensure you have a Prisma Data Proxy API key. Otherwise, replace it with your direct PostgreSQL connection string.

4.  **Run database migrations:**

    ```bash
    npx prisma migrate dev
    ```
    This command will create the database schema based on `prisma/schema.prisma`.

5.  **Seed the database with dummy data (optional):**

    ```bash
    npm run seed
    ```
    This will populate the database with hospitals and blood banks using the data in `prisma/dummyData.ts`.

6.  **Start the development server:**

    ```bash
    npm run dev
    ```
    The backend server will start running, typically on `http://localhost:8787` (Cloudflare Workers default for local dev).

## API Endpoints

The base URL for all API endpoints is `/api`.

*   **User API Endpoints:** `/api/users`
    *   `POST /api/users/onboard`: Onboard a new user.
    *   `GET /api/users`: Health check for User API.

*   **Hospital API Endpoints:** `/api/hospitals`
    *   `GET /api/hospitals`: Get all hospitals.
    *   `GET /api/hospitals/:id`: Get hospital by ID.

*   **Blood Bank API Endpoints:** `/api/bloodbanks`
    *   `GET /api/bloodbanks`: Get all blood banks.
    *   `POST /api/bloodbanks`: Create a new blood bank.

*   **Emergency API Endpoints:** `/api/emergencies`
    *   `POST /api/emergencies`: Create a new emergency request.

Refer to the code in `src/modules` directory, specifically the router files (`userRouter.ts`, `hospitalRouter.ts`, `bloodbankRouter.ts`, `emergencyRouter.ts`) and controller files for detailed information on request bodies, response formats, and available parameters.

## Usage Instructions

To use these APIs, you will typically send HTTP requests from the frontend application (or using tools like `curl` or Postman).

*   **Authentication:** Most protected endpoints will require a valid JWT token in the `Authorization` header. This backend is set up to use Clerk for authentication, and the `authMiddleware.ts` handles JWT verification.

*   **Request and Response Formats:** API requests and responses are generally in JSON format. Refer to the schema files in `src/schemas` for the expected structure of request bodies and data validation rules.


