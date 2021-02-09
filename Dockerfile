# Transpile typescript into javascript
FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# create image for production
FROM node:lts-buster
ENV TZ=Europe/Zurich
RUN apt update
RUN apt -y install openjdk-11-jre
WORKDIR /eve
COPY package*.json ./
RUN npm install --production
COPY --from=0 ./app/dist .
CMD npm start