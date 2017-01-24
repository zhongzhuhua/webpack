var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var env = process.env.nodeEnv;

// 入口文件
var entryMap = {
  'demo/js/index': ['./src/demo/js/index.js'],
  'demo/js/user': ['./src/demo/js/user.js'],
  'huarui/js/index': ['./src/huarui/js/index.js'],
  'huarui/js/user': ['./src/huarui/js/user.js']
};
if (env == 'dev') {
  for (var key in entryMap) {
    entryMap[key].push('webpack-hot-middleware/client?reload=true');
  }
}

// 插件
var plugins = [];
if (env == 'dev') {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}
plugins.push(new HtmlWebpackPlugin({
  filename: 'demo/html/index.html',
  template: 'src/demo/html/index.html',
  chunks: ['demo/js/index']
}));
plugins.push(new HtmlWebpackPlugin({
  filename: 'demo/html/user.html',
  template: 'src/demo/html/user.html',
  chunks: ['demo/js/user']
}));
plugins.push(new HtmlWebpackPlugin({
  filename: 'huarui/html/index.html',
  template: 'src/huarui/html/index.html',
  chunks: ['huarui/js/index']
}));
plugins.push(new HtmlWebpackPlugin({
  filename: 'huarui/html/user.html',
  template: 'src/huarui/html/user.html',
  chunks: ['huarui/js/user']
}));

module.exports = {
  plugins: plugins,
  entry: entryMap,
  //入口文件输出配置
  output: {
    path: env == 'dev' ? '/' : './dist',
    filename: env == 'dev' ? '[name].[hash:8].js' : '[name].[chunkhash:8].js',
    publicPath: '/dmz'
  },
  //其它解决方案配置
  resolve: {
    root: __dirname + '/src'
  },
  module: {
    //加载器配置
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }, {
      test: /.*\.html$/,
      loader: 'html?attrs[]=img:src&attrs[]=img:path&attrs[]=img:data-src'
    }, {
      test: /.*\.(png|jpg|gif|jpeg)$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'font-image?limit=5120&remove=src&name=[path][name].[ext]?[hash:8]'
    }]
  },
};
