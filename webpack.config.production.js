const webpack = require("webpack");
const path = require("path");
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: "production",
  /* devtool: false, */
  output: {
    path: path.resolve(__dirname, "frontend/static/frontend/assets/js"),
    filename: '[name].js',
    /* chunkFilename: '[name].chunk.js', */
  },
  optimization: {
    splitChunks: {
        chunks: 'all',
        name: 'vendors'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ]
})