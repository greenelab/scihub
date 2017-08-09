//require our dependencies
var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var StatsPlugin = require('stats-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const env = require('./env');

let devServerPort = 9001;

module.exports = {
  devtool: 'eval',

  //the entry point we created earlier. Note that './' means
  //your current directory. You don't have to specify the extension  now,
  //because you will specify extensions later in the `resolve` section
  entry: [ 'bootstrap-loader', './src/index' ],

  output: {
    //where you want your compiled bundle to be stored
    path: path.resolve('./docs/'),
    //naming convention webpack should use for your files
    filename: '[name].js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      // Required
      inject: false,
      template: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        preserveLineBreaks: true
      },
      appMountId: 'app-container',
      window: {
        env: env
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
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
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader?sourceMap=1&modules=1&localIdentName=[name]__[local]--[hash:base64:3]', 'sass-loader?sourceMap=1'],
        exclude: ['node_modules'],
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
    ]
  },

  resolve: {
    // root: __dirname,
  }
};


