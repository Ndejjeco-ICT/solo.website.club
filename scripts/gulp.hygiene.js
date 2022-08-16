const gulp = require("gulp");
const gulp_bom = require("gulp-bom")

const filesToBeCleaned = [
    "./temp/prebuildJs/bootstrap.js",
    "./temp/prebuildJs/polyfill.loader.js",
    "./temp/prebuildJs/polyfill.webcomponents.js"
]

function cleanFinalFilesFromBom() {
    return gulp.src(filesToBeCleaned)
        .pipe(gulp.dest("./temp/cleanJs"))
}