const gulp = require("gulp");
const {series}  = require("gulp")
const gulpUglify = require("gulp-uglify");
const gulp_bom = require("gulp-bom")

function __Loaders(){

    return gulp.src([
        "./src/ns/bootstrap.fork.js",
        "./scripts/resources/workbench/bootstrap.js",
    ]).pipe(gulpUglify())
    .pipe(gulp_bom())
    .pipe(gulp.dest("./out"))

};

function _Polyfills(){
    return gulp.src([
        "./src/ns/polyfill.loader.js",
        "./src/ns/polyfill.webcomponents.js"
    ]).pipe(gulpUglify())
    .pipe(gulp_bom())
    .pipe(gulp.dest("./out/ns/polyfills"))
};


exports.BootstrapBundleManager = series(__Loaders,_Polyfills)