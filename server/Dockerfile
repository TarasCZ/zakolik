FROM node:11.6

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD [ "npm", "run", "start:dev" ]
