const path = require("path");
const webpack = require("webpack");
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    entry: {
      app: path.resolve(__dirname, 'frontend/src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, "frontend/static/frontend/assets/js"),
        publicPath: "/static/",
        filename: "[name].js",
        /* sourceMapFilename: "[name].js.map" */
    },
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
    plugins: [
        /* new webpack.SourceMapDevToolPlugin({filename: '[name].js.map'}), */
        new BundleTracker({
          filename: './frontend/static/frontend/assets/js/webpack-stats.json',
        }),
    ]
}