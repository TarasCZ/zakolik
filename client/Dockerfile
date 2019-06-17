# base image
FROM node:11.6

# set working directory (also creates two folders needed for cypress)
RUN mkdir /usr/src/app
RUN mkdir /usr/src/app/cypress
RUN mkdir /usr/src/app/cypress/plugins
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install app and cache app dependencies
COPY . .
RUN npm install


# start app
CMD ["npm", "run", "docker-start"]
