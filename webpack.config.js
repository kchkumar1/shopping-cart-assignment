const path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

// logincss: './client/styles/login.css',
// categorycss: './client/styles/category.css',
// cartcss: './client/styles/cart.css',
// productscss: './client/styles/products.css',

// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    index: ['./client/js/home.js', './client/styles/category.css'],
    login: ['./client/js/login.js', './client/styles/login.css'],
    products: ['./client/js/products.js', './client/styles/products.css'],
    cart: ['./client/js/cart.js', './client/styles/cart.css', './client/styles/login.css'],
    footer: './client/js/footer.js',
  },
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].[contenthash].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        // https://webpack.js.org/guides/asset-modules/#resource-assets
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource'
      },
      {
        // https://webpack.js.org/loaders/css-loader/#root
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Home',
      template: './client/html/index.html',
      chunks: ['cart', 'home', 'footer'],
      inject: 'body',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Login',
      template: './client/html/login.html',
      chunks: ['login', 'footer'],
      inject: 'body',
      filename: 'login.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Products',
      template: './client/html/products.html',
      chunks: ['cart', 'products', 'footer'],
      inject: 'body',
      filename: 'products.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Register',
      template: './client/html/register.html',
      chunks: ['login', 'footer'],
      inject: 'body',
      filename: 'register.html'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].[contenthash].css"
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true
      }),
      // https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production
      new CssMinimizerPlugin()
    ]
  }

};
