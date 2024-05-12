'use strict';

var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');

var config = require('../webpack.config');

var compiler = webpack(config);

var devServer = new webpackDevServer(config.devServer, compiler);
devServer.startCallback(() => {
  console.log('[dev] ready to start dev');
});
