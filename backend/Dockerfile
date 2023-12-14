# Use a base image with Node.js and npm pre-installed
FROM node:20.10.0

# Set the working directory inside the container
WORKDIR /todoApp

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy the rest of the backend files to the container
COPY . ./

# Expose the port on which the backend server will run
EXPOSE 4000

# Start the backend server
CMD ["npm", "run", "start"]