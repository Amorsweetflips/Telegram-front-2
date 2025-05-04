# 1) Build stage – name it “builder” here
FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache git openssh-client

# copy manifests + env + CRACO config
COPY package.json craco.config.js .env.production ./
RUN npm install

# copy source & build
COPY public ./public
COPY src    ./src
RUN npm run build

# 2) Serve stage – pull from your “builder” stage, not an external image
FROM nginx:stable-alpine
# disable AIO to silence io_setup() errors
COPY nginx.conf /etc/nginx/nginx.conf

# now copy the static files from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
