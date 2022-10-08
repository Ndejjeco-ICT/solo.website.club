const gulp = require("gulp");


function _transportTemplate(){

    return gulp.src("./scripts/build-process/resources/workbench.browser.html")
    .pipe(gulp.dest("./src/out/ns/ns-browser"));

}

function _transportControlImages(){
    return gulp.src([
        "./public/splash.png",
        "./dependencies/screen/favicon.png"
    ]).pipe(gulp.dest("./src/out/ns/workbench/parts"))
}

exports.TransportTemplateComponents = gulp.series(_transportTemplate,_transportControlImages);
