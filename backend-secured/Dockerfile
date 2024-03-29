FROM node:latest

COPY . /opt/app

WORKDIR /opt/app

RUN npm install

EXPOSE 3000

CMD ["node", "/opt/app/main.js"]