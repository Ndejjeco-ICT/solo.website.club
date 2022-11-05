const  {merge} = require("webpack-merge");
const common = require("./webpack.common");


module.exports = merge(common,{
    mode : "development",
    devtool : "inline-source-map",
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