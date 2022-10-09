const gulp = require("gulp");


function _transportTemplate(){
    console.log("Transporting **Template**")
    return gulp.src("./scripts/build-process/resources/workbench.browser.html")
    .pipe(gulp.dest("./out/ns/ns-browser"));

}

function _transportControlImages(){
    console.log("Transporting **ControlImages**")
    return gulp.src([
        "./public/splash/splash.png",
        "./public/dependencies/screen/favicon.png"
    ]).pipe(gulp.dest("./out/ns/workbench/parts/selon"))
}

function _(){
    console.log("--BUILDING-VIEW-BUNDLE--")
    return gulp.series(_transportTemplate,_transportControlImages);
}


exports.TransportTemplateComponents = _();
