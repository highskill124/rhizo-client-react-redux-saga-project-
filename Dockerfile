FROM node:12 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

# RUN yarn run build-storybook
RUN yarn run build

FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder usr/src/app/storybook-static /usr/share/nginx/html
COPY --from=builder usr/src/app/build /usr/share/nginx/html/app

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'