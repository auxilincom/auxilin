const config = require('config');
const { createConsoleLogger, format } = require('@auxilin/common-logger');

module.exports = createConsoleLogger(
  config.isDev
    ? {
      format: format.combine(format.colorize(), format.splat(), format.simple()),
    }
    : {},
);
