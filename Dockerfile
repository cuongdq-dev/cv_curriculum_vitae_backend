# Use Node.js image as base
FROM node:latest AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:prod"]

# Second stage: Setup NGINX
FROM nginx:latest

# Remove default NGINX configuration
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy custom NGINX configuration for the backend
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy the application from the builder stage
COPY --from=builder /usr/src/app /usr/src/app

# Expose port 80 for NGINX
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]