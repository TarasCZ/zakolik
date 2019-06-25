FROM node:11.6 AS development

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD [ "npm", "run", "start:dev" ]

# Build
FROM development AS build
RUN rm -rf node_modules/
RUN npm install --production
RUN npm run build

FROM node:11-alpine AS production
WORKDIR /usr/arc/app
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./
COPY --from=build /usr/src/app/production.env ./production.env
CMD ["node", "main.js"]
