//require our dependencies
var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var StatsPlugin = require('stats-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin')

let devServerPort = 9001;

module.exports = {
  //the entry point we created earlier. Note that './' means
  //your current directory. You don't have to specify the extension  now,
  //because you will specify extensions later in the `resolve` section
  entry: './src/index',

  output: {
    //where you want your compiled bundle to be stored
    path: path.resolve('./build/'),
    //naming convention webpack should use for your files
    filename: '[name].js', //[name]-[hash].js',
  },

  devtool: 'source-map',

  plugins: [
    new CleanWebpackPlugin(['build'], {}),
    new HtmlWebpackPlugin({
      // Required
      inject: false,
      template: require('html-webpack-template'),

      appMountId: 'app-container',
      mobile: true,
      title: 'Sci-Hub',
      window: {
        env: {
          apiHost: 'http://myapi.com/api/v1'
        }
      }
    }),
  ],

  devServer: {
    port: devServerPort,
    headers: {'Access-Control-Allow-Origin': '*'},
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ['es2015', 'react'],
          plugins: [
            'transform-class-properties',
            'transform-async-to-generator',
            'transform-object-rest-spread',
          ],
        },
      },
      {test: /\.(jpe?g|png|gif|svg|ico)$/, loader: 'url-loader?limit=10000&name=[hash].[ext]'},
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader?sourceMap=1&modules=1&localIdentName=[name]__[local]--[hash:base64:3]', 'sass-loader?sourceMap=1'],
        exclude: ['node_modules'],
      },
    ]
  },

  resolve: {
    // root: __dirname,
  }
};


