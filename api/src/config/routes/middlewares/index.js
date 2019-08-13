const token = require('./token.middleware');
const user = require('./user.middleware');
const auth = require('./auth.middleware');

module.exports = {
  token,
  user,
  auth,
};
