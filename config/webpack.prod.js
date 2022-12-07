const {join, resolve}= require("path");
const common = require("./webpack.common");
const {merge} = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const  HtmlWebpackPlugin = require("html-webpack-plugin");
const {jsSrc, cssSrc } = require('../config/utils')

module.exports = merge(common, {
  mode: "production",
  entry:{
    'js/index': join(jsSrc,'index.js'),
    'css/style': join(cssSrc, 'style.css')
 
   }, 
  output: {
    filename: "[name].min.js",
    path: resolve(__dirname, "../dist")
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          keep_classnames: true,
          mangle: true,
          compress: true,
          keep_fnames: true,
          output: {
            comments: false,
          }
        }

      }),
      new CssMinimizerPlugin(),
      
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        inject: 'body',
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ]
  },
  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({ filename: "[name].min.css" }),
    new CssMinimizerPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader,
           
           
          },
          { loader: 'css-loader', options: {url: false,  sourceMap: true}},
        ]
      }
    ]
  }
});