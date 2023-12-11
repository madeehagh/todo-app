# TODO App Backend

This is the backend server for the TODO application. It is built using Node.js, TypeScript
I have used prisma as an ORM tool, which can be integrated with any DB, in my case I am using sql.

## Assumptions
Task name should be unique
Task should not have timeline as past date time
Used apidoc for generating API doc for each endpoint.


## Project Structure

The project follows the following structure:

- `src`: This is the root directory for your TypeScript source code.
    - `controllers`: This directory contains the controller classes that handle the business logic for different routes or resources.
    - `models`: This directory contains the model classes that represent the data structures used in your application.
    - `routes`: This directory contains the route files that define the API routes and their corresponding controller methods.
    - `database`: This directory contains the database-related files, including the database connection setup and migration files.
    - `app.ts`: This file is the entry point of your application. It sets up the Express.js server, registers the routes, and starts the server.
- `package.json`: This file contains the metadata and dependencies for your project.
- `tsconfig.json`: This file is the TypeScript configuration file. It specifies the compiler options and project settings.


## Getting Started

To get started with the backend server, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the backend directory: `cd backend`
3. Install the dependencies: `npm install`
4. Install docker on the local setUp and run command `docker-compose up -d` to install postgres
    You can change the desired userName and password of db in docker-compose.yml and in .env file
5. If you run `docker ps`, a container where postgres is running should be displayed
6. For now, I am creating tables at application startup. To do that run command `npx prisma migrate dev --name init`
7. Start the server: `npm start`
8. The backend server will be running at `http://localhost:3000`.
9. You can use POSTMAN or curl command for APIs mentioned in openAPI 
10. Generate API by `apidoc -i src/ -o doc/`

## API Endpoints

The backend server exposes the following API endpoints:
API doc can be accessed by http://localhost:63342/todo-app/backend/doc/index.html
Please note that all task endpoints require authentication. Make sure to include the authentication token in the request headers.

## Testing

To run the tests for the backend server, use the following command: