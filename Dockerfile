FROM node:14

COPY package*.json ./
WORKDIR /app
COPY . .

RUN npm install

EXPOSE 8080
CMD [ "node", "server.js" ]