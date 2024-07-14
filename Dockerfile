# build stage
FROM node:21-alpine as build-stage

WORKDIR /app

COPY . .

RUN npm install --force

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY ./nginx.conf /temp/prod.conf

RUN envsubst < /temp/prod.conf > /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

