# Stage 1: Build the application
FROM node:20-alpine3.16 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Run the application
FROM node:20-alpine3.16

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

RUN npm install --production

CMD ["npm", "start"]

EXPOSE 3000
