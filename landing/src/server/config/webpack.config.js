module.exports = (config) => {
  config.module.rules.push({
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
  });

  return config;
};
