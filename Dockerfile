# Stage 1: Build frontend
FROM node:18-slim as frontend

# Set the working directory for the frontend
WORKDIR /app/native

# Copy and install frontend dependencies
COPY numida/package.json numida/yarn.lock ./
RUN yarn install

# Copy the rest of the frontend files
COPY numida ./

# Stage 2: Build backend
FROM python:3.11-slim as backend

# Set the working directory for the backend
WORKDIR /app/backend

# Copy and install backend dependencies
COPY server/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend files
COPY server ./

# Stage 3: Combine frontend and backend
FROM python:3.11-slim

# Install Node.js and Yarn
RUN apt-get update && \
    apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn

# Set the working directory
WORKDIR /app

# Copy frontend build artifacts
COPY --from=frontend /app/native /app/native

# Copy backend application
COPY --from=backend /app/backend /app/backend

# Expose the necessary ports
EXPOSE 19000 19001 19002  
EXPOSE 5000              

# Start both the Expo frontend and Flask backend
CMD ["sh", "-c", "cd /app/backend && python app.py & cd /app/native && yarn start --host lan"]
