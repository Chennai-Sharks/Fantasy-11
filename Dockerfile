FROM node:12-alpine

# Working directory is made as home/server
WORKDIR /home/server

# Package.json is copied from the local machine to the docker container in home/server
COPY ./server/package.json ./

# Run this command
RUN npm install

# Copy all the contents in server folder to the docker Container in home/server
COPY ./server/ .

# Run node when running the docker container, not when building the container
CMD node index.js

# Expose this port to the outside world.
EXPOSE 3000