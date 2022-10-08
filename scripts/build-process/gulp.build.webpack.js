const gulp = require("gulp");
const _gulpClConfig = require("./resources/gulp.cl.config")
const webpack_stream = require("webpack-stream")
const gulp_bom = require("gulp-bom");
const gulp_rename = require("gulp-rename")

function _initializeMainBundleProcess() {

    return gulp.src("./src/ns/workload/ns.main.ts")
        .pipe(webpack_stream(_gulpClConfig))
        .pipe(gulp_bom())
        .pipe(gulp_rename())

}