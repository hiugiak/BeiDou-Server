FROM node:20.15.0 AS builder

WORKDIR /opt/ui

COPY ./gms-ui/package.json ./

COPY ./gms-ui/yarn.lock ./

RUN yarn config set registry https://registry.npmmirror.com && yarn upgrade && yarn

COPY ./gms-ui/ ./

RUN yarn build

FROM nginx:alpine

COPY --from=builder /opt/ui/dist/ /usr/share/nginx/html/

EXPOSE 80