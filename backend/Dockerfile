# Use official Node.js LTS image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

ENV PORT=8080
# Expose port (matches the one in your Express app)
EXPOSE 8080

# Start the server
CMD ["npm", "start"]