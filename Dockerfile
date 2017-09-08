FROM node:boron

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .

# copy entrypoint
COPY mapic-entrypoint.sh .

# Bundle app source
COPY . .

EXPOSE 3004

CMD [ "bash", "mapic-entrypoint.sh" ]