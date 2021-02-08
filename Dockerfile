FROM node:15-alpine

MAINTAINER Raphael THIBIERGE

COPY ./ /app

WORKDIR /app

RUN npm install --no-cache

CMD ["node", "server.js"]

EXPOSE 3000