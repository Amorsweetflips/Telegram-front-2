# 1) Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# install git for any git-based deps
RUN apk add --no-cache git openssh-client

# copy manifests, CRACO config and prod env
COPY package.json craco.config.js .env.production ./
RUN npm install

# copy source and build
COPY public ./public
COPY src    ./src
RUN npm run build

# 2) Serve with nginx
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
