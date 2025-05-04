FROM node:20-alpine
WORKDIR /app

# Copy manifest
COPY package.json ./
RUN npm install

# Copy app code
COPY public ./public
COPY src    ./src

# Build & start
RUN npm run build
CMD ["npm","run","start"]
