FROM node:20.15.0 AS builder

WORKDIR /opt/ui

COPY ./gms-ui/package.json ./

# COPY ./gms-ui/yarn.lock ./

ENV CPPFLAGS=-DPNG_ARM_NEON_OPT=0

RUN npm config set registry https://registry.npmmirror.com && npm install

COPY ./gms-ui/ ./

RUN npm run build

FROM nginx:alpine

COPY --from=builder /opt/ui/dist/ /usr/share/nginx/html/

EXPOSE 80