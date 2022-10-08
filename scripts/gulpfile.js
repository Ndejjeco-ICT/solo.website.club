const gulp = require("gulp");
const LOADERS_BUILD = require("./gulp.loaders.build");
const SASS_BUILD = require("./gulp.sass.build")
const MAIN_SS = require("./build-process/gulp.build.webpack")

const WebPackBundleTask =  MAIN_SS.MainWebpackExtractBundle
gulp.task("__testWebpackGulp",WebPackBundleTask)


const loaderBuildTask = LOADERS_BUILD.WebpackStandardFileTransferBuild;
gulp.task("__nsLoadersBuild", loaderBuildTask);

const sassBuildTask = SASS_BUILD.WebpackSassBuild;
gulp.task("__nsSassBuild", sassBuildTask);