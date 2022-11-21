FROM node:16.14-alpine
WORKDIR /NG-Cash-Project
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001

CMD [ "npm", "start" ]