# Transpile typescript into javascript
FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# create image for production
ARG NODE_VERSION 
FROM node:$NODE_VERSION 

ENV TZ=Europe/Zurich

ARG JAVA_PACKAGE
RUN apt update
RUN apt -y install $JAVA_PACKAGE

WORKDIR /eve
COPY package*.json ./
RUN npm install --production
COPY --from=0 ./app/dist .

CMD npm start