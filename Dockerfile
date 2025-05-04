# 1) Build your React app
FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache git openssh-client

# Copy only what’s needed for install
COPY package.json craco.config.js .env.production ./
RUN npm install

# Copy source & build
COPY public ./public
COPY src    ./src
RUN npm run build

# 2) Serve the build with Nginx
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
