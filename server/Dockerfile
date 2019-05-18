FROM node:11.6

RUN mkdir /usr/app
WORKDIR /usr/app

COPY . .

RUN npm install

CMD [ "npm", "run", "start:dev" ]
