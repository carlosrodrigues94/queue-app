FROM node:18-alpine

WORKDIR /app-publisher

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]