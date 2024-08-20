FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE $SERVER_PORT

CMD ["node", "dist/index.js"]