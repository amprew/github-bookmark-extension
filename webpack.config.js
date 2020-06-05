const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const IS_PRODUCTION_BUILD = process.env.NODE_ENV === 'production';

module.exports = {
  mode: IS_PRODUCTION_BUILD ? 'production' : 'development',
  devtool: IS_PRODUCTION_BUILD ? false : 'eval-source-map',
  entry: {
    'bookmark-list': './src/pages/bookmarks/list/index.js',
    'bookmark-add': './src/pages/bookmark-add.js',
    'bookmark-show': './src/pages/bookmark-show.js',
    'bookmark-header-link': './src/pages/bookmark-header-link.js',
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
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        extractComments: false,
        parallel: true,
        cache: !IS_PRODUCTION_BUILD,
        terserOptions: {
          mangle: true,
          output: {
            beautify: false,
            comments: false
          },
          compress: true,
          warnings: false
        }
      })
    ]
  }
};
