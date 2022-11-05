const {merge}  = require("webpack-merge")
const __ClCommon = require("./.devcontainer/cl.common")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const _path = require("path");


module.exports = merge(__ClCommon,{
    devtool: "inline-source-map",
    mode : "development",
    devServer : {
        liveReload : true,
        hot : true,
        port : 5001,
        hot: true,
        magicHtml: true,
        liveReload : true,
        historyApiFallback : true,
        client: {
            progress : true
        }
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                loader: "ts-loader"
            },
            {

                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(svg|ico|png|jpg|gif|jpeg|woff|tff|json)/,
                type: "asset/resource",
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Ndejje SSS",
            filename: "index.html",
            inject: "body",
            scriptLoading: "defer",
            favicon : _path.resolve(__dirname,"./public/ns-images/ctx.png"),
            template: _path.resolve(__dirname, "./src/ns/bootstrap.template.ejs"),
        }),
    ],
})