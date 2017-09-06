var HtmlwebpackPlugin = require('html-webpack-plugin')
var path = require('path')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
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
      loader: "style-loader!css-loader"
    },
    {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
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
  }
}