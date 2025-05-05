# 1) Builder
FROM node:20-alpine AS builder
WORKDIR /app

# copy both package.json and package-lock.json so Docker sees axios
COPY package.json package-lock.json craco.config.js .env.production ./

# 1.2) Clean‐install from lockfile (this will pull in axios)
RUN npm ci

# 1.3) Copy your app code
COPY public ./public
COPY src    ./src

# 1.4) Build production bundle
RUN npm run build

# 2) NGINX
FROM nginx:stable-alpine
# (Optional) copy custom nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

So this
