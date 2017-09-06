var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlwebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var config = require('./webpack.base.conf')

Object.keys(config.entry).forEach(function (name) {
  config.entry[name] = ['webpack-hot-middleware/client'].concat(config.entry[name])
})

module.exports = merge(config, {
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlwebpackPlugin({
    template: path.resolve(__dirname, '../index.html'),
    inject: true
    })
  ]
})