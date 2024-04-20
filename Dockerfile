FROM node:18-alpine

WORKDIR /app

COPY . .

RUN yarn install

CMD yarn db:migrate && yarn build && yarn dev

EXPOSE 8080