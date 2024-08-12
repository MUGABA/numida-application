
FROM node:18-slim


WORKDIR /UI


COPY package.json yarn.lock ./

RUN yarn install

RUN npm install -g expo-cli


COPY . .


EXPOSE 19000


CMD ["yarn", "start", "--tunnel"]
