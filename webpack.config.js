const HtmlWebpackPlugin = require('html-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const IgnoreEmitPlugin =  require('ignore-emit-webpack-plugin') ;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const devMode = process.env.NODE_ENV.trim() !== "production";
const { resolve, join } = require('path')
const {DefinePlugin, webpack } = require('webpack')

console.log(devMode)
const base = join(__dirname, 'src')
const jsSrc = join(base, 'js')
const cssSrc = join(base, 'css')

module.exports = {
  entry:{
   'js/index': join(jsSrc,'index.js'),
   'css/style': join(cssSrc, 'style.css')

  }, 
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js',
   
  },
  devServer: {
    static: resolve(__dirname, "./dist"),
    compress: true,
    port: 8080,
    open: true,
  },
  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: devMode?[
            {
            loader: 'style-loader'
            },
            {
            loader: 'css-loader'
           }
          ]:
           [  {
           loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            }
          },
            {
              loader: 'css-loader'
        
          }  
           ],
      },
    ]
  },
  plugins: [].concat(devMode ? [

    new HtmlWebpackPlugin(
      {template: join(__dirname, 'src','index.html'),
      filename: "index.html",
      }
    ),
    new FixStyleOnlyEntriesPlugin(),

  ] : [
    new HtmlWebpackPlugin(
      {template: join(__dirname, 'src','index.html'),
      filename: "index.html",
      inject: 'body',
      }
    ),

    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
     filename: "[name].min.css",
     chunkFilename: "[id].css",
     ignoreOrder: false,

    }),
  ]),
  optimization: {
    moduleIds:  'deterministic',
     chunkIds:  'deterministic',
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ie8: true,
          safari10: true,
          sourceMap: true
        }
      }),
      new CssMinimizerPlugin({
        exclude: /.css/,
      }),
    ]
  }
}