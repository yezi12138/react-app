var HtmlwebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlwebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    index: './src/root.js',
    verdor: ['react', 'react-dom']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx',  '.scss'],
    alias: {
      'src': path.join(__dirname, 'src'),
      'static': path.join(__dirname, 'static')
    }
  },
  module: {
    loaders: [
    {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    },
    {
      test: /\.scss$/,
      loaders: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader!sass-loader'
      })
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'images/[name].[hash:7].[ext]'
      }
    }
    ]
  },
  plugins: [
  new HtmlwebpackPlugin({
    template: path.resolve(__dirname, '../index.html'),
    inject: true
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    sourceMap: true
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'verdor'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    chunks: ['vendor']
  }),
  new ExtractTextPlugin({
      filename: 'css/[name].[hash].css'
    })
  ]
}