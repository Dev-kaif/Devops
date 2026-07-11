FROM node:22-alpine

WORKDIR /app

COPY /server /server
COPY /html /html

EXPOSE 3000

CMD [ "node","server/server.js" ]
