# Stage 1 – build the app
FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache git openssh-client

# Copy manifest + CRACO config
COPY package.json craco.config.js ./
RUN npm install

# Copy source
COPY public ./public
COPY src    ./src

# Build static assets
RUN npm run build

# Stage 2 – serve with nginx
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html

# Optional: if you want custom nginx.conf, add it here
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
