// webpack.config.js
var glob = require("glob");

var entries = {};
//すべてのjsファイル
glob.sync('./examples/ex**/*.js').forEach(function(file, i){
  entries['app' + (i + 1)] = file;
});
module.exports = {
  entry : entries,
  output: {
    path    : __dirname + '/dist',
    publicPath: 'http://localhost:8090/dist', //webpack-dev-server用のアウトプットディレクトリ
    filename: '[name].bundle.js',
    sourceMapFilename: '[file].map'
  },
  debug : false,
  cache : true,
  stats : {
    colors : true,
    reasons: true
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test  : /\.styl$/,
      loader: 'style!css!autoprefixer?browsers=last 1 version!stylus'
    }]
  },
  externals: {
    'pixi.js': 'PIXI'
  },
  resolve: {
    extensions: ['', '.js', '.json', '.styl'],
    modulesDirectories: ['node_modules']
  }
};
