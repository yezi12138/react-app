var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.dev.conf')
var bodyParser = require('body-parser')
var session = require('express-session')
var cookieParser = require('cookie-parser')
// var MongoStore = require('connect-mongo')(session)
var proxyMiddleware = require('http-proxy-middleware')
var app = express()
// 使用session
app.use(cookieParser())
// var sessionStore = new MongoStore({   // 创建新的mongodb数据库
//   url: 'mongodb://localhost/test'
// })
var sessionMiddleware = session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 10 * 10 // 过期时间设置(单位毫秒)
  }
  // store: sessionStore
})
// app.use(sessionMiddleware)

// 解析post过来的数据
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 引入编写好的api
const api = require('../server/api.js')
app.use(api)

// 读取webpack配置
var compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

// proxy api requests
var proxyTable = {
  '/api': {
    target: 'https://api.douban.com',
    changeOrigin: true,
    pathRewrite: {
      '/api': '/'
    }
  }
}
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

var server = app.listen(8080)

console.log('Listening at http://localhost:8080')
