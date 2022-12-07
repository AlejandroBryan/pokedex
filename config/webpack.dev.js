const { resolve, join } = require("path");
const common = require("./webpack.common");
const {merge} = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: join(__dirname, "../dist")
  },  
  plugins: [
    new HtmlWebpackPlugin({
      template: join(__dirname, '../src','index.html')
    })
  ],
 
   devServer: {
    static: resolve(__dirname, "../dist"),
    compress: true,
    port: 8080,
    open: true,
    hot : true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader", 
          "css-loader"
        ]
      }
    ]
  }
});