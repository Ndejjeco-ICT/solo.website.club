const { merge } = require('webpack-merge')
const __ClCommon = require("./.devcontainer/cl.common")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const _path = require("path");

module.exports = merge(__ClCommon, {
    devtool: "source-map",
    mode: "production",
    plugins: [
        new HtmlWebpackPlugin({
            title: "Ndejje SSS",
            filename: "index.html",
            inject: "body",
            scriptLoading: "defer",
            favicon : _path.resolve(__dirname,"./public/ns-images/ctx.png"),
            template: _path.resolve(__dirname, "./src/ns/bootstrap.template.ejs"),
        }),
        new MiniCssExtractPlugin({filename : "[name].[contenthash].css"})
    ],
    module : {
        rules : [
            {
                test: /\.ts/,
                loader: "ts-loader"
            },
            {
                test: /\.(svg|ico|png|jpg|gif|jpeg|woff|tff|json)/,
                type: "asset/resource",
            },
            {

                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
        ]
    }
})
