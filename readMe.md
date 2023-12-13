# Todo App

This is a TypeScript project that utilizes Express.js and SQL for building a todo list web server.
The application covers following functionalities.
1. A user is able to add new task(s)
2. A user is able to retrieve all the tasks created by him/her
3. A user is able to mark the task(s) as completed
4. A user is able to delete a particular task

## Assumptions
1. Before creating a task, a user needs to register via the signUp endpoint.
2. Users can only view the tasks they have created.

## Plugins and Technologies Used
### Backend
    1. Typescript
    2. Express
    3. ORM: Prisma
    4. SQL: Postgres
    5. Jest 
### Frontend
    1. React
    2. Axios
    3. Jest

### Improvements
1. [ ] Some of the improvements are mentioned in `Improvement` section in [backend/readMe.md](backend/readMe.md)
2. [ ] In order to ensure security of the system, add stricter checks on header values and request body pattern check
3. [ ] Other than that, for the overall project common linting needs to be added.
4. [ ] Managing to different packages is tedious with 2 package.json. I would create a shared package.json and bundle it in an efficient way.
5. [ ] Handle more edge case scenarios for both backend and frontend
6. [ ] Frontend has very basic functionality, a lot more could be added on the validation and performance side. 
Like optimizing rendering and preventing re-rendering of components.  

### Getting Started

To get started with the project, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Run `nvm use` to install node version mentioned in .nvmrc, `nvm install` if the version is not installed on your system
3. Install the dependencies: `npm install`
4. Steps to set up backend is mentioned in [backend/readMe.md](backend/readMe.md)
5. Steps to set up frontend is mentioned in [frontend/README.md](frontend/README.md)

Make sure to set up the backend before setting up the frontend to ensure proper functionality.

Feel free to explore the individual `readMe.md` files in the `backend` and `frontend` directories for more detailed instructions.
