const gulp = require("gulp");
const {series}  = require("gulp")
const gulpUglify = require("gulp-uglify");


function __Loaders(){
    console.log("Building **Loaders**")


    return gulp.src([
        "./src/ns/bootstrap.fork.js",
        "./scripts/build-process/resources/bootstrap.js",
    ]).pipe(gulpUglify())
    .pipe(gulp.dest("./out"))

};

function _Polyfills(){
    console.log("Building **PolyFills**")
    return gulp.src([
        "./src/ns/polyfill.loader.js",
        "./src/ns/polyfill.webcomponents.js"
    ]).pipe(gulpUglify())
    .pipe(gulp.dest("./out/ns/polyfills"))
};

function _(){
    console.log("--BUILDING-BOOTSTRAPPERS-BUNDLE--")
    return series(__Loaders,_Polyfills)
}   


exports.BootstrapBundleManager = _();