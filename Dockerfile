FROM node:17-alpine3.12
WORKDIR /build
RUN apk add --update python3 make g++\
   && rm -rf /var/cache/apk/*
COPY . ./

RUN npm install -g node-gyp
RUN npm add -D @nrwl/cli
RUN npm ci



EXPOSE 3333
CMD [ "npm", "start", "fe-api" ]