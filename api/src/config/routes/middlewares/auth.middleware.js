const _ = require('lodash');

const authService = require('services/auth.service');

const auth = async (ctx, next) => {
  const res = await authService.decodeToken(ctx.state.token);
  const isTokenInBlackList = await authService.isTokenInBlackList(ctx.state.token);

  if (!res || isTokenInBlackList) {
    ctx.status = 401;
    ctx.body = {};
    return;
  }

  const state = _.omit(res, ['iat', 'exp', 'aud', 'iss']);
  ctx.state.user = state.user;

  await next();
};

module.exports = auth;
