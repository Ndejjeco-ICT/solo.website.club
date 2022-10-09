

const gulp = require("gulp");
const _gulpClConfig = require("./resources/gulp.cl.config")
const webpack_stream = require("webpack-stream")
const gulp_rename = require("gulp-rename")
const gulpFilter = require("gulp-filter")

let gulpBomManager;

function bundleForJavascriptFiles(){
    console.log("Building **workbench.main.js**")
    let JavaScriptFilter = gulpFilter("*.js")

    return gulp.src("./src/ns/workload/ns.components.ts")
    .pipe(webpack_stream(_gulpClConfig))
    .pipe(JavaScriptFilter)
    .pipe(gulp_rename({basename : "workbench.main",extname : ".js"}))
    .pipe(gulp.dest("./out/ns/workbench"))
}


function bundleForImageFiles(){
    console.log("Building **Images**")
    let ImageFilter = gulpFilter(["*.png","*.jpg"])

    return gulp.src("./src/ns/workload/ns.components.ts")
        .pipe(webpack_stream(_gulpClConfig))
        .pipe(ImageFilter)
        .pipe(gulp.dest("./out/ns/workbench/parts/images"))

}

function buildWebpack(){
    console.log("--BUILDING-WEBPACK-BUNDLE--")
    return gulp.series(bundleForJavascriptFiles,bundleForImageFiles)
}




exports.MainWebpackExtractBundle = buildWebpack()