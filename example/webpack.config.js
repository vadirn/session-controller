const path = require('path');
const webpack = require('webpack');

const config = {
  devtool: 'eval',
  entry: {
    main: path.resolve(__dirname, 'src/main.js'),
    common: [
      'object-state-storage',
      'react-dom',
      'react-simple-di',
      'react',
      'session-controller',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build/assets'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/assets/',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules', 'object-state-storage'),
          path.resolve(__dirname, 'node_modules', 'session-controller'),
        ],
        loader: 'babel',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: '[name].js',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
  ],
  watchOptions: {
    aggregateTimeout: 100,
  },
};

module.exports = config;
