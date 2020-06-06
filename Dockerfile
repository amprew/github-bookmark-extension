FROM node:12-alpine AS base

ENV NODE_ENV=production

WORKDIR /extension

RUN apk add --upgrade --no-cache zip

COPY ["manifest.json", "popup.html", "./"]
COPY images/icons/* images/icons/

FROM base as build

COPY [".babelrc", "package.json", "package-lock.json", "webpack.config.js", "./"]
COPY src src

RUN npm install --production=false

RUN npx webpack

FROM base as prod

COPY --from=build /extension/dist ./dist

RUN cd /extension

RUN zip -r /extension.zip .

