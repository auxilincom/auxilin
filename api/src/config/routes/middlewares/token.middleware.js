const constants = require('app.constants');

const urlToken = async (ctx, next) => {
  let accessToken = ctx.cookies.get(constants.COOKIES.ACCESS_TOKEN);
  const refreshToken = ctx.cookies.get(constants.COOKIES.REFRESH_TOKEN);

  const { authorization } = ctx.headers;
  if (!accessToken && authorization) {
    accessToken = authorization.replace('Bearer', '').trim();
  }

  ctx.state.token = accessToken;
  ctx.state.refreshToken = refreshToken;

  await next();
};

module.exports = urlToken;
