"use strict";

//******************************************************************************
//* DEPENDENCIES
//******************************************************************************
var gulp = require("gulp"),
    tsc = require("gulp-typescript"),
    runSequence = require("run-sequence"),
    mochaTest = require('gulp-mocha'),
    nodemon = require('gulp-nodemon'),
    definitions = __dirname + "/tools/typings/**/*.ts";

//******************************************************************************
//* BUILD
//******************************************************************************
var tsProject = tsc.createProject('tsd.json', {
    removeComments: true,
    target: "ES5",
    module: "commonjs",
    declarationFiles: false,
    noExternalResolve: true
});

gulp.task("build-source", function () {
    return gulp.src([__dirname + "/src/**/**.ts", definitions])
        .pipe(tsc(tsProject))
        .js.pipe(gulp.dest(__dirname + "/build/src/"));
});

gulp.task("build-test", function () {
    return gulp.src([__dirname + "/spec/*.spec.ts", definitions])
        .pipe(tsc(tsProject))
        .js.pipe(gulp.dest(__dirname + "/build/spec/"));
});

gulp.task("build", function (cb) {
    runSequence("build-source", "build-test", cb);
});

//******************************************************************************
//* TEST
//******************************************************************************
gulp.task("mocha", function () {
    return gulp.src(__dirname + "/build/spec/**/*.js")
        .pipe(mochaTest({reporter: 'dot'}))
});

gulp.task("test", function (cb) {
    runSequence("build", "mocha", cb);
});

//******************************************************************************
//* RUN
//******************************************************************************
gulp.task('watch', function () {
    gulp.watch([__dirname + "/src/**/**.ts"], ["build-source"]);
});

gulp.task("nodemon", ["build-source", "watch"], function () {
    nodemon({script: './build/src/index.js'});
});

//******************************************************************************
//* DEFAULT
//******************************************************************************
gulp.task("default", ["nodemon"]);