const webpack = require("webpack");
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: "production",
  /* devtool: false, */
  output: {
    filename: '[name].js',
    /* chunkFilename: '[name].chunk.js', */
  },
  optimization: {
    splitChunks: {
        chunks: 'all',
        name: 'vendors'
    }
  },
})