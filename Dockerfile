FROM alpine:latest

RUN apk add --no-cache nodejs npm curl jq

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3005

RUN npm run build

CMD ["node", "dist/app.js" ]