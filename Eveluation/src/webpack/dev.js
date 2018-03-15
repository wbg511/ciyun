var base = require("./base.js");
var path = require("path");
var webpack = require("webpack");
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require("html-webpack-plugin");



module.exports = merge(base, {
  module: {
    //loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  devServer: {
  	proxy: {
  		"/api": "http://newshop.ciyun.cn/api"
  	}
  },
  plugins: [
  	new HtmlWebpackPlugin({
  		path: path.resolve(__dirname, "../dist"),
  		template: "src/template/index.html",
  	}),

  	new webpack.SourceMapDevToolPlugin(),

  	new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ]
})
