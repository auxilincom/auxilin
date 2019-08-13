FROM node:10.16.0

EXPOSE 3000
COPY ["./package.json", "./package-lock.json", "./.eslintrc.js", "./.babelrc", "./postcss.config.js", "./.stylelintrc", "/app/"]
RUN cd /app && npm i --quiet

COPY ./src /app/src
WORKDIR /app

CMD npm start
