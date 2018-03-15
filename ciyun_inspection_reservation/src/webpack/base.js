var webpack = require("webpack");

var path = require("path");


const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	externals:{
    'BMap':'BMap'
  },
	entry: {
		vendor: ["react", "react-dom","jquery"],
		app: path.resolve(__dirname, "../src/app.js"),
	},

	output: {
		path: path.resolve(__dirname, "../dist"),
		publicPath: "/",
		filename: "[name]-[hash].js"
	},

	resolve: {
		alias: {
			common: path.resolve(__dirname, "../src/common"),
			component: path.resolve(__dirname, "../src/common/component"),
      static: path.resolve(__dirname, "../src/static"),
			utils: path.resolve(__dirname, "../src/common/utils"),
		},
		extensions: [".web.js",".js", ".json", ".jsx", ".less", ".css", ".scss"],
	},


	module: {
    rules: [
      {
      	test: /\.(js|jsx)$/,
      	use: ['babel-loader'],

				// exclude: /node_modules/,
        // loader: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0'
				//loader: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0'
      },
      {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:[
            {
              loader: 'css-loader',
              options:{
                  minimize: true,
                  sourceMap: true
              }
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
        	{
        		loader: 'url-loader',
        		options: {
        			limit: 8192,
        			name: 'img/[name].[hash:7].[ext]',
        			//prefix: 'img'
        		}

        	}
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
        	{
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'fonts/[name].[hash:7].[ext]',
            }

          }
        ]
      },


    ]
  },

  plugins: [

  	new webpack.optimize.CommonsChunkPlugin({
  		filename: "vendor.js",
  		//name: "vendor",
  		// children: true,
  		// name:"chunk",
  		// minChunks:2

  		 name: ["jquery"],
    //   minChunks:2
  	}),

		new webpack.ProvidePlugin({
  	  $: "jquery",
  	  jQuery: "jquery"
  	}),




    new ExtractTextPlugin({
      filename: 'index-[contenthash].css',
      disable: false,
      allChunks: true
    }),

  ]

}
