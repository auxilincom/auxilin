const config = require('config');
const { createConsoleLogger } = require('@auxilin/common-logger');

module.exports = createConsoleLogger({
  isDev: config.isDev,
});
