const psl = require('psl');

const constants = require('app.constants');

const userService = require('resources/user/user.service');
const authService = require('services/auth.service');
const emailService = require('services/email.service');

const securityUtil = require('security.util');
const config = require('config');

const createUserAccount = async (userData) => {
  const salt = await securityUtil.generateSalt();

  const [hash, signupToken] = await Promise.all([
    securityUtil.getHash(userData.password, salt),
    securityUtil.generateSecureToken(),
  ]);

  const user = await userService.create({
    firstName: userData.firstName,
    lastName: userData.lastName,
    passwordHash: hash.toString(),
    passwordSalt: salt.toString(),
    email: userData.email,
    isEmailVerified: false,
    signupToken,
  });

  await emailService.sendSignupWelcome({ email: user.email, signupToken });

  return user;
};

const setTokens = async (ctx, userId) => {
  const token = await authService.createAuthToken({ userId });
  const refreshToken = await securityUtil.generateSecureToken();

  const expiredAt = new Date(Date.now() + config.jwt.expiresIn);
  const refreshTokenExpiredAt = new Date(Date.now() + config.jwt.refreshTokenExpiresIn);

  await authService.addRefreshToken(userId, refreshToken);

  const parsed = psl.parse(config.webUrl);
  const cookiesDomain = parsed.subdomain ? `${parsed.subdomain}.${parsed.domain}` : parsed.domain;

  ctx.cookies.set(constants.COOKIES.ACCESS_TOKEN, token, {
    httpOnly: true,
    expires: expiredAt,
    domain: cookiesDomain,
  });
  ctx.cookies.set(constants.COOKIES.REFRESH_TOKEN, refreshToken, {
    httpOnly: true,
    expires: refreshTokenExpiredAt,
    domain: cookiesDomain,
  });
  ctx.cookies.set(constants.COOKIES.EXPIRED_AT, expiredAt, {
    httpOnly: false,
    domain: cookiesDomain,
  });
};

/**
 * Create user, company, default app, send signup confirmation email and
 * create auth token for user to login
 */
exports.signup = async (ctx) => {
  const userData = ctx.validatedRequest.value;
  const user = await createUserAccount(userData);

  const response = {};
  if (config.isDev) {
    response._signupToken = user.signupToken;
  }
  ctx.body = response;
};

/**
 * Verify user's email when user click a link from email
 * sets `emailVerified` to true if token is valid
 */
exports.verifyEmail = async (ctx, next) => {
  const data = ctx.validatedRequest.value;
  const user = await userService.markEmailAsVerified(data.userId);

  await setTokens(ctx, user._id);
  ctx.redirect(config.webUrl);
};

/**
 * Sign in user
 * Loads user by email and compare password hashes
 */
exports.signin = async (ctx, next) => {
  const signinData = ctx.validatedRequest.value;

  await setTokens(ctx, signinData.userId);

  ctx.body = {
    redirectUrl: config.webUrl,
  };
};

/**
 * Allows to get updated access token and update refresh token
 */
exports.refreshToken = async (ctx, next) => {
  const token = ctx.cookies.get(constants.COOKIES.REFRESH_TOKEN);

  const userId = await authService.userIdByRefreshToken(token);
  const user = await userService.findById(userId);
  if (!user) {
    ctx.status = 401;
    ctx.body = {};
    return;
  }

  await setTokens(ctx, userId);
  ctx.body = {};
};

/**
 * Logout user by adding access token to the black list
 */
exports.logout = async (ctx, next) => {
  await Promise.all([
    authService.addTokenToBlackList(ctx.state.token),
    authService.deleteRefreshToken(ctx.state.refreshToken),
  ]);
  ctx.body = {
    redirectUrl: `${config.landingUrl}/signin`,
  };
};

/**
 * Send forgot password email with a unique link to set new password
 * If user is found by email - sends forgot password email and update
 * `forgotPasswordToken` field. If user not found, returns validator's error
 */
exports.forgotPassword = async (ctx, next) => {
  const data = ctx.validatedRequest.value;
  const user = await userService.findOne({ email: data.email });

  let { resetPasswordToken } = user;
  const { firstName } = user;
  if (!resetPasswordToken) {
    resetPasswordToken = await securityUtil.generateSecureToken();
    await userService.updateResetPasswordToken(user._id, resetPasswordToken);
  }

  await emailService.sendForgotPassword({
    email: user.email,
    resetPasswordToken,
    firstName,
  });

  ctx.body = {};
};

/**
 * Updates user password, used in combination with forgotPassword
 */
exports.resetPassword = async (ctx, next) => {
  const { userId, password } = ctx.validatedRequest.value;

  await userService.updatePassword(userId, password);
  await userService.updateResetPasswordToken(userId, '');

  ctx.body = {};
};

exports.resendVerification = async (ctx, next) => {
  const { email } = ctx.request.body;
  const user = await userService.findOne({ email });

  if (user) {
    await emailService.sendSignupWelcome({ email, signupToken: user.signupToken });
  }

  ctx.body = {};
};
