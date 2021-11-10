FROM ubuntu:20.04

ENV DEBIAN_FRONTEND noninteractive

# RUN apt-get update && apt-get install -y nodejs=14.17.2 npm=6.14.13
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update && apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_14.x  | bash -
RUN apt-get -y install nodejs
# RUN npm ci

# RUN nvm install v14.17.2 && nvm use v14.17.2

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available ([email protected]+)
COPY package*.json ./

RUN npm ci
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run package