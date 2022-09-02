const gulp = require("gulp")

function _moveCommonResources(){

    return gulp.src([
        "./public/index.html",
        "./splash/splash.png"

    ]).pipe(gulp.dest("./out"))

}
exports.MoveMainItems = _moveCommonResources;