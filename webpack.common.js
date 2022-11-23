/**
 * Webpack common merge file production and development
 */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")



module.exports = {
    entry: {
        app : path.resolve(__dirname, "./src/ns/workload/ns.main.ts"),
    },
    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            ns: path.resolve(__dirname, "./src/ns"),
            "@image": path.resolve(__dirname, "./src/ns/assets/site_images"),
            "@design_Home": path.resolve(__dirname, "./src/ns/assets/sass/home.view.style"),
            "@design_About": path.resolve(__dirname, "./src/ns/assets/sass/aboutus.view.style"),
            "@design_Common": path.resolve(__dirname, "./src/ns/assets/sass/common"),
            "@design_Blog": path.resolve(__dirname, "./src/ns/assets/sass/blog.view.style"),
            "@design_Academics": path.resolve(__dirname, "./src/ns/assets/sass/academics.view.style")

        }
    },
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
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            title: "Ndejje SSS",
            filename: "index.html",
            inject: "body",
            scriptLoading: "defer",
            favicon : path.resolve(__dirname,"./public/ns-images/ctx.png"),
            template: path.resolve(__dirname, "./src/ns/bootstrap.template.ejs"),
        }),
        new MiniCssExtractPlugin({filename : "[name].[contenthash].css"})

    ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "public"),
        publicPath: "/"
    },


}

