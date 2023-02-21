FROM node:16
ARG APP
WORKDIR /app
COPY app/package.json ./
COPY app/ ./

RUN  npm i

EXPOSE 81

CMD npm run dev;