var webpack = require('webpack');
var path = require('path');

// js css 热更新
var commonHot = new webpack.HotModuleReplacementPlugin();
// let publicPath = 'http://localhost:' + process.env.PORT + '/';
// const entryMap = require('./server/routes/entrymap.json');

var entryMap = {
  hello: ['./client/js/hello'],
  index: ['./client/js/index'],
  main: ['./client/js/main']
};

// entryMap = entryMap.forEach(function(item) {
//   item.push('webpack/hot/only-dev-server');
//   item.push('webpack-dev-server/client?http://localhost:8080');
// });

// {
//    hello: ['./client/js/hello', 'webpack/hot/only-dev-server', 'webpack-dev-server/client?http://localhost:8080'],
//    index: ['./client/js/index', 'webpack/hot/only-dev-server', 'webpack-dev-server/client?http://localhost:8080'],
//    main: ['./client/js/main', 'webpack/hot/only-dev-server', 'webpack-dev-server/client?http://localhost:8080']
//  }

for(key in entryMap) {
  entryMap[key].push('webpack/hot/only-dev-server');
  entryMap[key].push('webpack-dev-server/client?http://localhost:8080');
};

module.exports = {
  // 插件
  plugins: [commonHot],

  // 脚本入口文件配置
  entry: entryMap,

  // 脚本文件输出配置
  output: {
    filename: '[name].js',
    path: './dist/js/',
  },

  // require 引用入口配置
  resolve: {
    //绝对路径
    // root: __dirname + '/dist/js',
    root: 'E:/webs/webpack/client/js/',
    //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    extensions: ['', '.js', '.json', '.scss']
  },

  // 全局应用
  externals: {
    jquery: 'jQuery'
  }
};
