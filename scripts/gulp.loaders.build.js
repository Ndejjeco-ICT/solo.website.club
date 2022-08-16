const gulp = require("gulp");

function WebpackStandardBuild() {
    
    return gulp.src([
        "./src/ns/bootstrap.js",
        "./src/ns/polyfill.loader.js",
        "./src/ns/polyfill.webcomponents.js"
    ]).pipe(gulp.dest("./public/ns-loaders"))

}

exports.WebpackStandardFileTransferBuild = WebpackStandardBuild;