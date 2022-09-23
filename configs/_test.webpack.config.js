
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
/**
 * @param {string} source
 */

const _WebPackConfiguration = {
    devtool: "inline-source-map",
    mode: "development",
    entry: {
        main : path.resolve(__dirname, "src/ns/workload/ns.main.ts")
    },
    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            ns: path.resolve(__dirname, "src/ns"),
            "@image" : path.resolve(__dirname, "src/ns/assets/site_images"),
            "@design_Home": path.resolve(__dirname, "src/ns/assets/sass/home.view.style"),
            "@design_About": path.resolve(__dirname, "src/ns/assets/sass/aboutus.view.style"),
            "@design_Common": path.resolve(__dirname, "src/ns/assets/sass/common"),
            "@design_Blog": path.resolve(__dirname, "src/ns/assets/sass/blog.view.style"),
            "@design_Academics": path.resolve(__dirname, "src/ns/assets/sass/academics.view.style")
            
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
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader"
                ],
            },
            {
                test: /\.(svg|ico|png|jpg|gif|jpeg|woff|tff|json)/,
                type : "asset/resource"
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Ndejje Website",
            filename: "index.html",
            template: path.resolve(__dirname, "src/ns/bootstrap.template.ejs"),
            inject: "body",
            scriptLoading : "defer",
            favicon : path.resolve(__dirname,"./public/dependencies/screen/favicon.png")

            
        })
    ],
    output: {
        filename : "ns.[contenthash].js",
        path: path.resolve(__dirname, "public"),
        publicPath: "auto"
    },
    devServer: {
        port : 5001,
        hot: true,
        magicHtml: true,
        liveReload : true,
        static: {
            directory: path.join(__dirname, 'public'),
            publicPath : "/",
        },
        client: {
            progress : true
        }
    },
}

module.exports = _WebPackConfiguration;