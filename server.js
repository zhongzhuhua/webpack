var express = require('express');
var http = require('http');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var del = require('del');
var port = 4050;

// 创建服务器对象
var app = express();

// 创建服务器
var server = http.createServer(app);

// 装载 webpack 容器
var webpackConfig = require('./server/webpack.config.js');

if (process.env.nodeEnv == 'dev') {
  runDev();
} else {
  runBuild();
}

/**
 * 打包
 */
function runBuild() {
  // 删除 zipName
  del.sync('./dist');
  // 打包文件
  console.log('begin build：' + new Date().toLocaleTimeString());
  webpack(webpackConfig, function() {
    console.log('build success!');
  });
};

/**
 * 启动开发环境
 */
function runDev() {
  // 装载 webpack 容器
  var compiler = webpack(webpackConfig);

  // 链接 webpack 服务器
  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    noInfo: true,
    inline: true,
    stats: {
      cached: false,
      colors: true
    }
  }));
  app.use(webpackHotMiddleware(compiler));

  // 配置静态文件服务器
  app.use('*/demo/img/', express.static('src/demo/img'));
  app.use('*/huarui/img/', express.static('src/huarui/img'));
  app.get('/dmz/*.js', function(req, res) {
    res.redirect(req.originalUrl.replace('/dmz', ''));
  });

  console.log('http://localhost:' + port);
  server.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
      console.log(err);
    }
    console.log('启动成功');
  });
}
