FROM node:carbon-alpine as dist
ENTRYPOINT ["/bin/bash"]
WORKDIR /tmp/
COPY package.json package-lock.json tsconfig.json tsconfig.build.json ./
COPY src/ src/
RUN npm install
RUN npm run build

FROM node:carbon-alpine as node_modules
WORKDIR /tmp/
COPY package.json package-lock.json ./
RUN npm install --production

FROM node:carbon-alpine
WORKDIR /usr/local/nub-api
COPY --from=node_modules /tmp/node_modules ./node_modules
COPY --from=dist /tmp/dist ./dist
CMD ["node", "dist/main.js"]
