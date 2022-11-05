const _path = require("path");


module.exports = {
    entry: _path.resolve(__dirname, "../src/ns/workload/ns.main.ts"),
    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            ns: _path.resolve(__dirname, "../src/ns"),
            "@image": _path.resolve(__dirname, "../src/ns/assets/site_images"),
            "@design_Home": _path.resolve(__dirname, "../src/ns/assets/sass/home.view.style"),
            "@design_About": _path.resolve(__dirname, "../src/ns/assets/sass/aboutus.view.style"),
            "@design_Common": _path.resolve(__dirname, "../src/ns/assets/sass/common"),
            "@design_Blog": _path.resolve(__dirname, "../src/ns/assets/sass/blog.view.style"),
            "@design_Academics": _path.resolve(__dirname, "../src/ns/assets/sass/academics.view.style")

        }
    },

    output: {
        filename: "ns.[contenthash].js",
        path: _path.resolve(__dirname, "../public"),
        publicPath: "/"
    },

}