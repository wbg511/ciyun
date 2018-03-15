var webpack = require("webpack");

var path = require("path");


const ExtractTextPlugin = require('extract-text-webpack-plugin');

//const extractCSS = new ExtractTextPlugin('stylesheets/[name]-[hash]-css.css');
//const extractLESS = new ExtractTextPlugin('stylesheets/[name]-[hash]-less.css');
//const extractSCSS = new ExtractTextPlugin('stylesheets/[name]-[hash]-sass.css');




module.exports = {

	entry: {
		vendor: ["react", "react-dom"],
		app: path.resolve(__dirname, "../src/app.js"),
		// jquery:["jquery"],
		// vue:["vue"]
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
		extensions: [".js", ".json", ".jsx", ".less", ".css", ".scss"],
	},


	module: {
    rules: [
      {
      	test: /\.(js|jsx)$/,
      	use: ['babel-loader']
      },

      // {
      //   test: /\.css$/,
      //   use: extractCSS.extract([ 'css-loader', 'postcss-loader' ])
      // },
      // {
      //   test: /\.less$/,
      //   use: extractLESS.extract([ 'css-loader',  'less-loader' ])
      // },

      {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          //use:[ 'css-loader', 'less-loader'],
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

      // {
      //   test: /\.scss$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     //resolve-url-loader may be chained before sass-loader if necessary
      //     use: ['css-loader', 'sass-loader']
      //   })
      // },

      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 8192
      //       }
      //     }
      //   ]
      // }

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
  		name: "vendor",
  		// children: true,
  		// name:"chunk",
  		// minChunks:2

  		// name: ["common","jquery","vue","load"],
    //   minChunks:2
  	}),





  	// new webpack.ProvidePlugin({
  	//   $: "jquery",
  	//   jQuery: "jquery",
  	//   axios: "axios",
  	// }),

  	//extractCSS,
    //extractLESS,
    //extractSCSS,

    new ExtractTextPlugin({
      filename: 'index-[contenthash].css',
      disable: false,
      allChunks: true,
    }),



  ]

}
