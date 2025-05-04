FROM node:20-alpine
WORKDIR /app

# Install git so npm can fetch git-based deps
RUN apk add --no-cache git openssh-client

# Copy manifest & install
COPY package.json ./
RUN npm install

# Copy app code
COPY public ./public
COPY src    ./src

# Build & start
RUN npm run build
CMD ["npm","run","start"]
