FROM node:lts-alpine

WORKDIR /var/www/app/voice-gpt

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

CMD [ "yarn", "start" ]