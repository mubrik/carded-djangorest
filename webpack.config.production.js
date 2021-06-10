const webpack = require("webpack");
const path = require("path");
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: "production",
  devtool: false,
  bail: true,
  output: {
    path: path.resolve(__dirname, "frontend/static/frontend/assets/js"),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  optimization: {
    splitChunks: {
        chunks: 'all',
        cacheGroups: {
            react: {
                test: /[\\/]node_modules[\\/](react)[\\/]/,
                name: 'react',
            },
            bootstrap: {
                test: /[\\/]node_modules[\\/](bootstrap)[\\/]/,
                name: 'bootstrap',
            },
            reactDom: {
                test: /[\\/]node_modules[\\/](react-dom)[\\/]/,
                name: 'reactdom',
            },
            axios: {
                test: /[\\/]node_modules[\\/](axios)[\\/]/,
                name: 'axios',
            },
            reactRedux: {
                test: /[\\/]node_modules[\\/](react-redux)[\\/]/,
                name: 'reactRedux',
            },
            reactRouter: {
                test: /[\\/]node_modules[\\/](react-router-dom)[\\/]/,
                name: 'reactRouter',
            },
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
            },
        }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ]
})