FROM node:19 as builder

WORKDIR /app

COPY . .

RUN npm install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

RUN npm run build

RUN rm -rf node_modules && \
  NODE_ENV=production npm install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true

FROM node:19

WORKDIR /app

COPY --from=builder /app  .

ENV HOST 0.0.0.0
ENV NUXT_PORT 3333
EXPOSE 3333

CMD [ "npm", "start" ]