var webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
  watch: true,
  entry: [
    //'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
    //'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    path.resolve(__dirname, 'src/index.js')
  ],
  output: {                                       // 定义出口目录
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'bundle.js',
    publicPath: 'public/dist'
  },
  resolve: {                                      // resolve 指定可以被 import 的文件后缀
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [
      { 
        test: /\.js|jsx$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader',
        query:{
          presets: ["es2015", "react"]
        }  
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader', // backup loader when not building .css file
            use: ['css-loader', 'sass-loader'] // loaders to preprocess CSS
        })
      },
      {
        test: /\.js|jsx$/, 
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
    ]
  },

  plugins: [
    //new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('dev') 
        }
    })
  ],
  devtool: 'inline-source-map',
}

module.exports = config;