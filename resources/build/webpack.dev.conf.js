var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var prodConfig = require('./webpack.prod.conf')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

var env = process.env.NODE_ENV === 'development'
  ? require('../config/test.env')
  : config.build.env

var webpackConfig = merge(baseWebpackConfig,{

  module: {
    rules: utils.styleLoaders({
      sourceMap: true,
      extract: true
    })
  },

  devtool: '#cheap-module-eval-source-map',
  output: prodConfig.output,

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new FriendlyErrorsPlugin(),
    new BundleAnalyzerPlugin()
  ]
})

webpackConfig.plugins.concat(prodConfig.plugins)

module.exports = webpackConfig
