const path = require("path");
const webpack = require("webpack");
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
  entry: "./frontend/src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "frontend/static/frontend/"),
    publicPath: "/frontend/static/frontend/",
    filename: "main.js",
    sourceMapFilename: "[name].js.map"
  },
  devtool: false,
  plugins: [
    new SourceMapDevToolPlugin({}),
  ]
};