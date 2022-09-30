const gulp = require("gulp");
const gulp_bom = require("gulp-bom");
const gulpUglify = require("gulp-uglify");

function WebpackProductionBuild() {
    
    return gulp.src([
        "./src/ns/bootstrap.fork.js",
        "./src/ns/bootstrap.js",
        "./src/ns/polyfill.loader.js",
        "./src/ns/polyfill.webcomponents.js"
    ]).pipe(gulpUglify())
        .pipe(gulp_bom())
            .pipe(gulp.dest("./src"))

}

exports.WebpackProductionFileTransferBuild = WebpackProductionBuild;