FROM node:18-alpine

WORKDIR /app-consumer

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]