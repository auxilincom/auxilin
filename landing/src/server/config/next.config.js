const { resolve } = require('path');

const withCSS = require('../lib/next-css');
const webpack = require('./webpack.config');

const { apiUrl, webUrl, isDev } = require('./index');

module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    localsConvention: 'dashesOnly',
    modules: {
      localIdentName: '[local]__[hash:base64:5]',
    },
  },
  dev: isDev,
  dir: resolve('./../../client'),
  isServer: true,
  publicRuntimeConfig: {
    apiUrl,
    webUrl,
  },
  webpack,
});
