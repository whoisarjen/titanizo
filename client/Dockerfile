# Use an official Node.js runtime as a parent image
FROM node:19

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./
COPY .npmrc ./.npmrc

RUN npm cache clean --force
# Install NPM dependencies
RUN npm install

# Copy the rest of the application code to /app
COPY . .

# Build the Nuxt.js application
RUN npm run build

COPY .output ./app/.output

# Start the application on port 3333
CMD ["npm", "run", "start"]
