FROM node:19

WORKDIR /app

COPY . .
COPY package*.json ./

RUN npm install

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/wait-for-it.sh

ENV NODE_ENV=production
EXPOSE 3000

CMD ["sh", "-c", "wait-for-it.sh strapi:1337 -- npm run lint && npm run build && npm start"]
