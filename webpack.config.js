const webpack = require('webpack');
const path = require('path');

const IS_PRODUCTION_BUILD = process.env.NODE_ENV === 'production';

module.exports = {
  mode: IS_PRODUCTION_BUILD ? 'production' : 'development',
  devtool: IS_PRODUCTION_BUILD ? 'source-map' : 'eval-source-map',
  entry: {
    'bookmark-list': './src/bookmark-list.js',
    'bookmark-add': './src/bookmark-add.js',
    'bookmark-show': './src/bookmark-show.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
};
