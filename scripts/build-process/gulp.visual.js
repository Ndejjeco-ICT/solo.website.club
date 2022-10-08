const gulp = require("gulp");
const gulp_Minify = require("gulp-minify")


function _rebaseFontAwesomeResources(){

    return gulp.src("./public/libraries/font-awesome/css/all.css")
        .pipe(gulp_Minify())
        .pipe("./out/ns/workbench/visual/font-awesome/css")

}
function _rebaseVideoJSResources(){

    return gulp.src("./public/libraries/ns_v/ns_v.css")
        .pipe(gulp_Minify())
        .pipe("./out/ns/workbench/visual/ns_v")

}

function _transportWebFonts(){
    return gulp.src([
        "./public/libraries/font-awesome/webfonts/*.ttf",
        "./public/libraries/font-awesome/webfonts/*.woff2"
    ]).pipe(gulp.dest("./out/ns/workbench/visual/font-awesome"))
}

exports.TrasportVisualComponents = gulp.series(_rebaseFontAwesomeResources,_rebaseVideoJSResources,_transportWebFonts)