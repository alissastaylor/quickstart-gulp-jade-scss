// Requirements

var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var glue = require('gulp-glue');
var size = require('gulp-size');
var imageMin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var comOpen = require('open');
var comDel = require('del');

// Optimize images
gulp.task('images', function () {
  return gulp.src('./_dev/img/*')
    .pipe(plugins.cache(plugins.imagemin({ progressive: true, interlaced: true })))
    .pipe(gulp.dest('./_prod/img/'))
    .pipe(size({ title: 'images' }));
});

// SCSS
gulp.task('sass', function() {
  gulp.src('./_dev/scss/**/*.scss')
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(autoprefixer({ browsers: [ 'last 2 versions' ] }))
  .pipe(gulp.dest('./_prod/css/'));
  .pipe(size({ title: 'stylesheets' }));
});

// Minify JS
gulp.task('javascript', function() {
  return gulp.src('./_dev/js/scripts.js')
    .pipe(uglify())
    .pipe(gulp.dest('./_prod/js/'));
    .pipe(size({ title: 'scripts' }));
});

// Compile Jade
gulp.task('jade', function() {
  gulp.src('./_dev/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./_prod/'))
    .pipe(size({ title: 'html' }));
});

// Watch
gulp.task('watch', [ 'javascript', 'sass', 'jade' ], function() {
  browserSync({ notify: false, server: ['.tmp', 'app'] });
  gulp.watch(['./_dev/*.jade'], browserSync.reload);
  gulp.watch(['./_dev/scss/**/*.scss'], ['styles', browserSync.reload]);
  gulp.watch(['./_dev/js/app.js'], ['scripts', browserSync.reload]);
});

gulp.task('default', ['sass','jade','javascript','images']);
