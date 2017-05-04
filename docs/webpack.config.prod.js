//require our dependencies
var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var config = require('./webpack.config');

var GhPagesWebpackPlugin = require('gh-pages-webpack-plugin');

module.exports = {
  //the entry point we created earlier. Note that './' means
  //your current directory. You don't have to specify the extension  now,
  //because you will specify extensions later in the `resolve` section
  entry: './src/index',

  output: {
    //where you want your compiled bundle to be stored
    path: path.resolve('./build/'),
    //naming convention webpack should use for your files
    filename: '[name]-[hash].js',
  },

  plugins: config.plugins.concat([
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {warnings: false},
      sourceMap: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')},
    }),
    new GhPagesWebpackPlugin({
      path: './build',
      options: {
          message: 'Deploy Page',
      }
    }),
  ]),

  module: config.module,
};
