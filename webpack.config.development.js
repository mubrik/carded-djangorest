const webpack = require("webpack");
const { merge } = require('webpack-merge');
const path = require("path");
const common = require('./webpack.common.js');
const BundleTracker = require('webpack-bundle-tracker')

module.exports = merge(common, {
    mode: "development",
    output: {
      path: path.resolve(__dirname, "frontend/static/frontend/assets/js/dev"),
      publicPath: "/static/frontend/assets/js/dev/",
      filename: "[name].js",
    },
    plugins: [
      new webpack.SourceMapDevToolPlugin({filename: '[name].js.map'}),
      new BundleTracker({
        filename: path.resolve(__dirname, "frontend/static/frontend/assets/js/dev/webpack-stats.json"),
      }),
    ],
    devtool: false,
})