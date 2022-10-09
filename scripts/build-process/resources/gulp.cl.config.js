const _path = require("path");

const _gulpClConfig = {
    mode: "production",
    resolve : {
        extensions : [".ts",".js"],
        alias : {
            ns : _path.resolve(__dirname,"../../../src/ns"),
            "@image": _path.resolve(__dirname, "../../../src/ns/assets/site_images"),
            "@design_Home": _path.resolve(__dirname, "../../../src/ns/assets/sass/home.view.style"),
            "@design_About": _path.resolve(__dirname, "../../../src/ns/assets/sass/aboutus.view.style"),
            "@design_Common": _path.resolve(__dirname, "../../../src/ns/assets/sass/common"),
            "@design_Blog": _path.resolve(__dirname, "../../../src/ns/assets/sass/blog.view.style"),
            "@design_Academics": _path.resolve(__dirname, "../../../src/ns/assets/sass/academics.view.style")
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
            }
        ]
    },
    output: {
        filename: "temp.[contenthash].js",
    },
};


module.exports = _gulpClConfig