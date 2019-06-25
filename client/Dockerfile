FROM node:11.6 as development
# Set the entrypoint as bin bash incase we want to inspect the container
ENTRYPOINT ["/bin/bash"]
# Manually copy the package.json
COPY ./package.json /usr/src/app/package.json
COPY ./package-lock.json /usr/src/app/package-lock.json
COPY cypress /usr/src/app/cypress
# Set the work directory to where we copied our source files
WORKDIR /usr/src/app
# Install all of our dependencies
RUN npm install

CMD ["npm", "run", "docker-start"]

FROM development as builder
# Copy the app excluding everything in the .dockerignore
COPY . .
# Put node_modules into the path, this will purely be used for accessing the angular cli
ENV PATH /usr/src/app/node_modules/.bin:$PATH
# Build our distributable
RUN npm run build:prod


# Build a small nginx image with static website
FROM nginx:alpine as production
RUN rm -rf /usr/share/nginx/html/*
#COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
