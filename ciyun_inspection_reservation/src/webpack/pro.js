var base = require("./base.js");
var path = require("path");
var webpack = require("webpack");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require("html-webpack-plugin");



module.exports = merge(base, {

	output: {
		publicPath: "/booking/dist/",
	},

  plugins: [
		new HtmlWebpackPlugin({
			path: path.resolve(__dirname, "../dist"),
			template: "src/template/index.html",
			filename: "index.html"
		}),

		new UglifyJSPlugin({
			compress: {
			  warnings: false
			}
		}),

		new webpack.DefinePlugin({
	    'process.env':{
	      'NODE_ENV': JSON.stringify('production')
	    }
	  })
  ]
})
