const { createConsoleLogger, format } = require('@auxilin/common-logger');
const config = require('./config');

module.exports = createConsoleLogger(
  config.isDev
    ? {
      format: format.combine(format.colorize(), format.splat(), format.simple()),
    }
    : {},
);
