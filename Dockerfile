FROM node:20-alpine
WORKDIR /app

# grab git so your git-based deps install
RUN apk add --no-cache git openssh-client

# copy your manifests + CRACO config
COPY package.json craco.config.js ./
RUN npm install

# now grab the rest of your app
COPY public ./public
COPY src    ./src

# build & serve
RUN npm run build
CMD ["npm","run","start"]
