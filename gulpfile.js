'use strict';

var gulp = require('gulp'),
    fs = require('fs'),
    sass = require('gulp-sass'),
    scsslint = require('gulp-scss-lint'),
    sourcemaps = require('gulp-sourcemaps'),
    prefix = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    handlebars = require('gulp-compile-handlebars'),
    todo = require('gulp-todo'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;


gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./build",
    },
    open: false,
    logConnections: true,
    logSnippet: false
  });
});

gulp.task('todo', function(){
  return gulp.src([
    './**/*.scss',
    '!./bower_components/**/*.scss',
    './**/*.html',
    '!./bower_components/**/*.html',
    './**/*.hbs',
    '!./bower_components/**/*.hbs',
    './**/*.haml',
    '!./bower_components/**/*.haml'
  ])
  .pipe(todo())
  .pipe(gulp.dest('./'));
});

gulp.task('compile-scss', ['scss-lint'], function(){
  return gulp.src([
      './test/scss/styles.scss'
    ])
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['scss','./bower_components/support-for/sass'],
      outputStyle: 'expanded'
    }))
    .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7", { cascade: true }))
    .pipe(sourcemaps.write('maps', {
      includeContent: false,
      sourceRoot: './build/css/'
    }))
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('build', ['todo','compile-scss'], function () {

  var templateData = JSON.parse(fs.readFileSync('./data/_wvu-buttons.json'));

  // get variables json
  var variableData = JSON.parse(fs.readFileSync('./bower_components/wvu-utilities-variables/data/_wvu-variables.json'));

  // merge json
  templateData.wvu_variables = variableData.wvu_variables;


  var options = {};

  return gulp.src('./test/index.hbs')
        .pipe(handlebars(templateData, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./build'));
});

gulp.task('scss-lint', function(){
  return gulp.src('./src/scss/*.scss')
    .pipe(scsslint({
      'config': '.scss-lint.yml'
    }))
    .pipe(scsslint.failReporter());
});

gulp.task('ci',['build']);

gulp.task('default',['build','browser-sync'], function(){
  gulp.watch(["./src/**/*.scss","./test/scss/**/*.scss"],['build']);
  gulp.watch(["./test/**/*.hbs","./test/data.json"],['build']);
  gulp.watch("./build/**/*.html").on('change',reload);
  gulp.watch("./build/css/*.css").on('change',reload);
  gulp.watch(['./src/haml/**/*.haml','./src/cleanslate/**/*.html'], ['todo']);
});
