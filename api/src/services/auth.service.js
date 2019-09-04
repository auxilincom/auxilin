const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const config = require('config');

const CacheService = require('./cache.service');

const { logger } = global;

const jwtSignAsync = promisify(jwt.sign);
const jwtVerifyAsync = promisify(jwt.verify);

const jwtOptions = _.pick(config.jwt, ['audience', 'issuer', 'expiresIn']);

const accessTokenService = new CacheService('access_token', config.jwt.expiresIn);
const refreshTokenService = new CacheService('refresh_token', config.jwt.refreshTokenExpiresIn);

exports.createAuthToken = ({ userId }) => {
  const payload = {
    user: {
      _id: userId,
    },
  };

  return jwtSignAsync(payload, config.jwt.secret, jwtOptions);
};

exports.decodeToken = async (token) => {
  let res;

  try {
    res = await jwtVerifyAsync(token, config.jwt.secret, jwtOptions);
  } catch (err) {
    logger.warning('Invalid json web token', err);
  }

  return res;
};

exports.addTokenToBlackList = (token) => {
  if (token) {
    return accessTokenService.set(token, true);
  }
  return Promise.resolve(null);
};

exports.isTokenInBlackList = (token) => {
  return accessTokenService.has(token);
};

exports.addRefreshToken = (userId, refreshToken) => {
  return refreshTokenService.set(refreshToken, userId);
};

exports.deleteRefreshToken = (refreshToken) => {
  return refreshTokenService.delete(refreshToken);
};

exports.userIdByRefreshToken = (refreshToken) => {
  return refreshTokenService.get(refreshToken);
};
