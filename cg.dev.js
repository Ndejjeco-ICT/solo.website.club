const {merge}  = require("webpack-merge")
const __ClCommon = require("./.devcontainer/cl.common")


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
    }
})