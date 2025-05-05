# 1) Builder
FROM node:20-alpine AS builder
WORKDIR /app

# copy manifests & config
COPY package.json package-lock.json craco.config.js .env.production ./

# Install everything (dev + prod) so craco lives here
RUN npm install

# Copy your source
COPY public ./public
COPY src    ./src

# Build production bundle
RUN npm run build

# 2) NGINX
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
