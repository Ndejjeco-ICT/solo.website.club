const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const _path = require("path");


const productionConfig = {
    entry: _path.resolve(__dirname, "./src/ns/workload/ns.main.ts"),
    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            ns: _path.resolve(__dirname, "./src/ns"),
            "@image": _path.resolve(__dirname, "./src/ns/assets/site_images"),
            "@design_Home": _path.resolve(__dirname, "./src/ns/assets/sass/home.view.style"),
            "@design_About": _path.resolve(__dirname, "./src/ns/assets/sass/aboutus.view.style"),
            "@design_Common": _path.resolve(__dirname, "./src/ns/assets/sass/common"),
            "@design_Blog": _path.resolve(__dirname, "./src/ns/assets/sass/blog.view.style"),
            "@design_Academics": _path.resolve(__dirname, "./src/ns/assets/sass/academics.view.style")

        }
    },

    output: {
        filename: "ns.[contenthash].js",
        path: _path.resolve(__dirname, "./out"),
        publicPath: "."
    },
    mode: "production",
    plugins: [
        new HtmlWebpackPlugin({
            title: "Ndejje SSS",
            filename: "index.html",
            inject: "body",
            scriptLoading: "defer",
            favicon : _path.resolve(__dirname,"./out/resources/xtr.png"),
            minify : false,
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
}

module.exports = productionConfig