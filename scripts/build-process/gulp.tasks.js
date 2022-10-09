const gulp = require("gulp");
const _viewBuild = require("./gulp.view");
const _sassBuild  = require("./gulp.sass")
const _bootstrapperBuild = require("./gulp.bootstrap.main");
const _visualBuild = require("./gulp.visual");
const _webpackBuild = require("./gulp.build.webpack");



function _(){
    return  gulp.series(
        _webpackBuild.MainWebpackExtractBundle,
        _sassBuild.SASSBuild,
        _bootstrapperBuild.BootstrapBundleManager,
        _visualBuild.TrasportVisualComponents,
        _viewBuild.TransportTemplateComponents
    )
}


gulp.task("__BUILD_INSIGHT",_())