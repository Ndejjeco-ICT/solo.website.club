const gulp = require("gulp");
const LOADERS_BUILD = require("./gulp.loaders.build");
const SASS_BUILD = require("./gulp.sass.build")

const loaderBuildTask = LOADERS_BUILD.WebpackStandardFileTransferBuild;
gulp.task("__nsLoadersBuild", loaderBuildTask);

const sassBuildTask = SASS_BUILD.WebpackSassBuild;
gulp.task("__nsSassBuild", sassBuildTask);