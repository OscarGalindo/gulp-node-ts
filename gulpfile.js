'use strict';

var gulp = require('gulp');
var tsc = require('gulp-typescript');
var tslint = require('gulp-tslint');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var Config = require('./gulpfile.config');
var nodemon = require('gulp-nodemon');
var tsProject = tsc.createProject('tsd.json');

var config = new Config();

gulp.task('ts-lint', function () {
    return gulp.src(config.allTypeScript).pipe(tslint()).pipe(tslint.report('prose'));
});

gulp.task('compile-ts', function () {
    var sourceTsFiles = [config.allTypeScript, config.libraryTypeScriptDefinitions];

    var tsResult = gulp.src(sourceTsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));

    tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.tsOutputPath));
});

gulp.task('clean-ts', function (cb) {
    var typeScriptGenFiles = [
        config.tsOutputPath + '/**/*.js',
        config.tsOutputPath + '/**/*.js.map',
        '!' + config.tsOutputPath + '/lib'
    ];

    del(typeScriptGenFiles, cb);
});

gulp.task('watch', function () {
    gulp.watch([config.allTypeScript], ['ts-lint', 'compile-ts']);
});

gulp.task('nodemon', ['ts-lint', 'compile-ts', 'watch'], function () {
    nodemon({script: './build/index.js'});
});

gulp.task('default', ['ts-lint', 'compile-ts']);