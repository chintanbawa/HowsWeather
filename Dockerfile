FROM node:16

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn
RUN npx pod-install

COPY . .

EXPOSE 8081

CMD ["npx", "react-native", "start"]