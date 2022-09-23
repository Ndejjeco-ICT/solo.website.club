const _path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')


const mainWebpackCOnfiguration = {
    mode : "development",
    entry : "./simple.js",
    output : {
        filename : "jo.js",
        path : _path.resolve(__dirname,"dist")
    },
    plugins : [
        new HtmlWebpackPlugin({
            title : "io",
            filename: "_testpaclk.html",
            inject : "body",
            scriptLoading : "defer"
        })
    ],
    devServer : {
        port : "9002",
        hto : true,
        liveReload : true
    }
}
module.exports = mainWebpackCOnfiguration;
