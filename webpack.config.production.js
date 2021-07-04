const webpack = require("webpack");
const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");
const BundleTracker = require("webpack-bundle-tracker");

module.exports = merge(common, {
    mode: "production",
    devtool: false,
    output: {
        path: path.resolve(__dirname, "frontend/static/frontend/assets/js/prd"),
        publicPath: "/static/frontend/assets/js/prd/",
        filename: "[name].[contenthash].js",
        chunkFilename: "[name].[contenthash].js",
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(
                            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                        )[1];
  
                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace("@", "")}`;
                    }
                }
            }
        }
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({filename: "[name].[contenthash].js.map"}),
        new BundleTracker({
            filename: path.resolve(__dirname, "frontend/static/frontend/assets/js/prd/webpack-stats.json"),
        }),
    ]
});