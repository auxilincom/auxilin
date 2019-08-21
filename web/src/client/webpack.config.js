const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const incstr = require('incstr');

const createUniqueIdGenerator = () => {
  const index = {};

  const generateNextId = incstr.idGenerator({
    // Removed "d" letter to avoid accidental "ad" construct.
    // @see https://medium.com/@mbrevda/just-make-sure-ad-isnt-being-used-as-a-class-name-prefix-or-you-might-suffer-the-wrath-of-the-558d65502793
    alphabet: 'abcefghijklmnopqrstuvwxyz0123456789',
  });

  return (name) => {
    if (index[name]) {
      return index[name];
    }

    let nextId;

    do {
      // Class name cannot start with a number.
      nextId = generateNextId();
    } while (/^[0-9]/.test(nextId));

    index[name] = nextId;

    return index[name];
  };
};

const uniqueIdGenerator = createUniqueIdGenerator();

const getComponentName = (resourcePath, separator) => {
  return resourcePath
    .split(separator)
    .slice(-5, -1)
    .join(separator);
};

const generateScopedName = (localName, resourcePath) => {
  const componentUnixName = getComponentName(resourcePath, '/');
  const componentWindowsName = getComponentName(resourcePath, '\\');

  const componentName = componentUnixName > componentWindowsName ? componentUnixName : componentWindowsName;

  return `${uniqueIdGenerator(componentName)}_${uniqueIdGenerator(localName)}`;
};

module.exports = {
  mode: 'production',

  entry: {
    main: ['core-js/stable', 'regenerator-runtime/runtime', './index.jsx'],
  },

  output: {
    path: `${__dirname}/static/`,
    publicPath: '/static/',
    filename: 'main.[hash].js',
    chunkFilename: 'main.[id].[hash].js',
  },

  context: path.resolve(__dirname, './'),

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [
            [
              'react-css-modules',
              {
                generateScopedName,
                webpackHotModuleReloading: false,
              },
            ],
          ],
        },
      },
      {
        test: /\.pcss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localsConvention: 'dashesOnly',
              modules: {
                getLocalIdent: ({ resourcePath }, localIdentName, localName) => {
                  return generateScopedName(localName, resourcePath);
                },
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true, // true outputs JSX tags
              svgo: {
                plugins: [
                  {
                    removeViewBox: false,
                    cleanupIDs: false,
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },

  devtool: 'source-map',

  resolve: {
    modules: ['./', 'node_modules'],
    extensions: ['.mjs', '.js', '.jsx', '.pcss'],
  },

  optimization: {
    minimize: true,
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.[hash].css',
      chunkFilename: 'main.[id].[hash].css',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        BABEL_ENV: JSON.stringify('production'),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'views/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ],
};
