const gulp = require("gulp");
const gulp_Minify = require("gulp-minify")


function _rebaseFontAwesomeResources(){
    console.log("Transporting **FontAwesomeResources**")

    return gulp.src("./public/libraries/font-awesome/css/all.css")
        .pipe(gulp_Minify())
        .pipe(gulp.dest("./out/ns/workbench/visual/font-awesome/css"))

}
function _rebaseVideoJSResources(){
    console.log("Transporting **VideoJSResources**")
    return gulp.src("./public/libraries/ns_v/ns_v.css")
        .pipe(gulp_Minify())
        .pipe(gulp.dest("./out/ns/workbench/visual/ns_v"))

}

function _transportWebFonts(){
    console.log("Transporting **WebFonts**")
    return gulp.src([
        "./public/libraries/font-awesome/webfonts/*.ttf",
        "./public/libraries/font-awesome/webfonts/*.woff2"
    ]).pipe(gulp.dest("./out/ns/workbench/visual/font-awesome/webfonts"))
}

function _(){
    console.log("--BUILDING-VISUAL-BUNDLE--")
    return gulp.series(_rebaseFontAwesomeResources,_rebaseVideoJSResources,_transportWebFonts)

}

exports.TrasportVisualComponents = _();