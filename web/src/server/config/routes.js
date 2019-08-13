const axios = require('axios');
const Router = require('koa-router');

const config = require('config');
const constants = require('app.constants');

const { logger } = global;

const indexRouter = new Router();

const signinUrl = `${config.landingUrl}/signin`;
const apiUrl = config.apiInternalUrl || config.apiUrl;

const apiGet = (ctx, url, method = 'get') => {
  const accessToken = ctx.cookies.get(constants.COOKIES.ACCESS_TOKEN);
  const refreshToken = ctx.cookies.get(constants.COOKIES.REFRESH_TOKEN);

  return axios[method](`${apiUrl}${url}`, {
    responseType: 'json',
    withCredentials: true,
    headers: {
      Cookie: `${constants.COOKIES.ACCESS_TOKEN}=${accessToken};${constants.COOKIES.REFRESH_TOKEN}=${refreshToken};`,
    },
  });
};

// match all routes but not files (i.e. routes with dots)
indexRouter.get(/^((?!\.).)*$/, async (ctx) => {
  const data = {
    isDev: config.isDev,
    config: {
      apiUrl: config.apiUrl,
      signinUrl,
    },
    user: {},
  };

  try {
    const response = await apiGet(ctx, '/users/current');
    data.user = response.data;
  } catch (error) {
    logger.error(error);
    ctx.redirect(signinUrl);
    return null;
  }

  return ctx.render('index', data);
});

module.exports = indexRouter.routes();
