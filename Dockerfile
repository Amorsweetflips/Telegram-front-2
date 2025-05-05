# 1) Builder
FROM node:20-alpine AS builder
WORKDIR /app

# copy package manifests, CRACO config & env
COPY package.json package-lock.json craco.config.js .env.production ./

# 1.2) Install deps (lockfile‐safe)
RUN npm install --only=production

# 1.3) Copy your app code
COPY public ./public
COPY src    ./src

# 1.4) Build production bundle
RUN npm run build

# 2) NGINX
FROM nginx:stable-alpine

# optional custom nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

# serve the built app
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
