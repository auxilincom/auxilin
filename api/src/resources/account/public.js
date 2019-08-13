const Router = require('koa-router');
const validate = require('middlewares/validate');
const validators = require('./validators');

const router = new Router();
const controller = require('./account.controller');

router.post('/signup', validate(validators.signup), controller.signup);
router.get('/verify-email/:token', validate(validators.verifyEmail), controller.verifyEmail);
router.post('/signin', validate(validators.signin), controller.signin);
router.post('/forgot-password', validate(validators.forgotPassword), controller.forgotPassword);
router.put('/reset-password', validate(validators.resetPassword), controller.resetPassword);
router.post('/resend', controller.resendVerification);
router.post('/refresh-token', controller.refreshToken);
router.post('/logout', controller.logout);

module.exports = router.routes();
