const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const webpack = require("webpack");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const isDev = process.env.NODE_ENV === "development";

module.exports = {
  entry: {
    index: "./src/pages/index/index.js",
    about: "./src/pages/about/about.js",
    analytics: "./src/pages/analytics/analytics.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].js",
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },

      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [
          "file-loader?name=./images/[name].[ext]",
          {
            loader: "image-webpack-loader",
            options: {},
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: "file-loader?name=./vendor/[name].[ext]",
      },
    ],
  },
  plugins: [
    new WebpackMd5Hash(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      chunks: ["index"],
      template: "./src/pages/index/index.html",
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      chunks: ["about"],
      template: "./src/pages/about/about.html",
      filename: "about.html",
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      chunks: ["analytics"],
      template: "./src/pages/analytics/analytics.html",
      filename: "analytics.html",
    }),

    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      canPrint: true,
    }),
  ],
};
