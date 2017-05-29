var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractStyles = new ExtractTextPlugin({
  filename: 'styles-[hash].css',
  disable: false,
  allChunks: true
});

module.exports = {
  //the entry point we created earlier. Note that './' means
  //your current directory. You don't have to specify the extension  now,
  //because you will specify extensions later in the `resolve` section
  entry: './src/index',

  output: {
    //where you want your compiled bundle to be stored
    path: path.resolve('../docs/'),
    //naming convention webpack should use for your files
    filename: '[name]-[hash].js',
  },

  plugins: config.plugins.concat([
    // css files from the extract-text-plugin loader
    extractStyles,
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {warnings: false},
      sourceMap: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')},
    }),
  ]),

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
        use: extractStyles.extract({
          fallback: 'style-loader',
          use: ['css-loader?sourceMap=1&modules=1&localIdentName=[name]__[local]--[hash:base64:3]', 'sass-loader?sourceMap=1']
        }),
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
    ]
  },
};