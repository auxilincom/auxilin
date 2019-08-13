const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',

  entry: {
    main: ['core-js/stable', 'regenerator-runtime/runtime', './index.jsx'],
  },

  output: {
    path: `${__dirname}/static/`,
    publicPath: '/static/',
    filename: '[name].js',
  },

  context: path.resolve(__dirname, './'),

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.pcss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localsConvention: 'dashesOnly',
              modules: {
                localIdentName: '[local]__[hash:base64:5]',
              },
            },
          },
          { loader: 'postcss-loader' },
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

  devtool: 'eval',

  resolve: {
    modules: ['./', 'node_modules'],
    extensions: ['.mjs', '.js', '.jsx', '.pcss'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },

  plugins: [new webpack.NoEmitOnErrorsPlugin()],
};
