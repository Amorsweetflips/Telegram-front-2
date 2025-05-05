# 1) Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install git (for any git-based deps) and SSH client
RUN apk add --no-cache git openssh-client

# Copy manifests, CRACO config & production env
COPY package.json craco.config.js .env.production ./
RUN npm install

# Copy source and build
COPY public ./public
COPY src    ./src
RUN npm run build

# 2) Serve stage
FROM nginx:stable-alpine

# (Optional) custom nginx.conf to disable AIO and enable SPA fallback
COPY nginx.conf /etc/nginx/nginx.conf

# Copy static assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Expose the HTTP port
EXPOSE 80

# Launch Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
