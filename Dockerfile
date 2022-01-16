FROM node:16.13-alpine3.15
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD ["npm", "run", "docker"] 