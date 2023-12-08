# My TypeScript Project

This is a TypeScript project that utilizes Express.js for building a todo list web server.

## Project Structure

The project follows the following structure:

- `src`: This is the root directory for your TypeScript source code.
    - `controllers`: This directory contains the controller classes that handle the business logic for different routes or resources.
    - `models`: This directory contains the model classes that represent the data structures used in your application.
    - `routes`: This directory contains the route files that define the API routes and their corresponding controller methods.
    - `app.ts`: This file is the entry point of your application. It sets up the Express.js server, registers the routes, and starts the server.
- `package.json`: This file contains the metadata and dependencies for your project.
- `tsconfig.json`: This file is the TypeScript configuration file. It specifies the compiler options and project settings.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Install the dependencies: `npm install`
3. Compile the TypeScript code: `npx tsc`
4. Start the server: `node dist/app.js`
5. Open your browser and visit `http://localhost:3000` to see the application in action.

## Available Scripts

In the project directory, you can run the following scripts:

- `npm start`: Starts the server in production mode.
- `npm run dev`: Starts the server in development mode with nodemon for automatic restart on file changes.
- `npm run build`: Compiles the TypeScript code.
- `npm test`: Runs the tests for the project.

