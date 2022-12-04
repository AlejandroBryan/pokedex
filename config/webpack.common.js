
const {join} = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const {jsSrc, cssSrc} =  require("../config/utils")

module.exports = {
  entry: {
    'js/index': join(jsSrc,'index.js'),
    'css/style': join(cssSrc, 'style.css')
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs"
          }
        }
      }
    ]
  }
};