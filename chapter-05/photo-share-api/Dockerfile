FROM node:14-slim

EXPOSE 4000

RUN apt-get update \
  && apt-get install -y git build-essential \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /photo-share-api

COPY . .

RUN yarn

# CMD ["yarn", "start"]