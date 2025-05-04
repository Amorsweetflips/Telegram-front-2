FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache git openssh-client
COPY package.json craco.config.js ./
RUN npm install
COPY public ./public
COPY src    ./src
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
