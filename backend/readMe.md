# TODO App Backend

This is the backend server for the TODO application, where a user can add, update and mark a task done. 
It is built using Node.js, TypeScript
I have used prisma as an ORM tool, which can be integrated with any DB, in my case I am using sql.

## Assumptions
1. Task name should be unique.
2. A user has flexibility to add dueDate, which should not be a past date.
3. A user can modify/update the task(s) created by him/her.
4. Lazy loading of DB connections

## Improvement
1. [ ]  Add reminder to the task
2. [ ]  For now, I am expecting api-key in the header and checking the value for authorisation. 
To save time I have added UserId passed in task endpoints, which is used for authorisation. I would rather move to jwt for authentication and authorisation.
3. [ ]  Add more validations on the request body and param in the request

## Project Structure

The project follows the following structure:

- `src`: This is the root directory for your TypeScript source code.
  - `controllers`: This directory contains the controller classes that handle the business logic for different routes or resources.
  - `routes`: This directory contains the route files that define the API routes and their corresponding controller methods.
  - `app.ts`: This file is the entry point of your application. It sets up the Express.js server, registers the routes, and starts the server.
  - `models`: This directory contains the data models or schemas for your application.
  - `middlewares`: This directory contains the custom middleware functions used in your application.
  - `services`: This directory contains the service classes that encapsulate the business logic and interact with the database or external services.
  - `utils`: This directory contains utility functions or helper classes used throughout your application.
- `tests`: This directory contains the test files for your backend server.
- `package.json`: This file contains the metadata and dependencies for your project.
- `tsconfig.json`: This file is the TypeScript configuration file. It specifies the compiler options and project settings.
- `.env`: This file is used to store environment variables for your application.
- `docker-compose.yml`: This file is used to define the Docker services and configurations for your application.
- `apidoc.json`: This file is the configuration file for generating API documentation using the apidoc tool.
- `doc/`: This directory contains the generated API documentation files.
- `prisma/`: This directory contains the Prisma configuration files and migrations for your database.

## Getting Started

To get started with the backend server, follow these steps:
Before starting make sure API_KEY and DATABASE_URL='postgresql://root:root@localhost:5432/tasks-db?schema=task'


1. Clone the repository: `git clone https://github.com/madeehagh/todo-app`
2. Navigate to the backend directory: `cd backend`
3. Install the dependencies: `npm install`
4. Install docker on the local setUp and run command `docker-compose up -d` to install postgres
    You can change the desired userName and password of db in docker-compose.yml and in .env file
5. If you run `docker ps`, a container where postgres is running should be displayed
6. For now, I am creating tables at application startup. To do that run command `npx prisma migrate dev --name init`
7. Start the server: `npm start`
8. The backend server will be running at `http://localhost:4000`.
9. You can use POSTMAN or curl command for APIs mentioned in openAPI 
10. Generate API by `apidoc -i src/ -o doc/`, which creates a doc folder with index file with all the apis 
11. If you want seed users for testing, run `npm seed:user` and for task `npm seed:task`

## API Endpoints

The backend server exposes the following API endpoints:
API doc can be accessed by http://localhost:63342/todo-app/backend/doc/index.html
Please note that all task endpoints require authentication. Make sure to include the authentication token in the request headers.

## Testing

To run the tests for the backend server, use the following command:
`npm test`
Make sure seed user is generated before running this. Also, you can conveniently get user and task details on UI http://localhost:5555/ . You need to run `npm prisma-ui` before accessing UI