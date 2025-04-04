FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install -g yarn

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]
