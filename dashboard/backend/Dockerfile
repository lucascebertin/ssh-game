FROM node:12-alpine

RUN apk update && apk upgrade

WORKDIR /app

COPY ./package.json ./package-lock.json ./tsconfig.json ./index.d.ts ./

RUN npm install

COPY . .

RUN npm run build

ENTRYPOINT ["node", "build/index"]
