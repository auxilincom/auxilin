FROM node:10.13.0

EXPOSE 3002 8081
COPY ["./package.json", "./package-lock.json", "./.eslintrc.js", "./.eslintignore", "./.babelrc", "./browserslist", "./.stylelintrc", "/app/"]

WORKDIR /app

VOLUME "/app/src"

RUN npm i --quiet

CMD npm run development
