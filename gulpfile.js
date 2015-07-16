var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var open = require('gulp-open');
var glue = require('gulp-glue');

// Watch

gulp.task('watch', function() {
  gulp.watch('./_dev/scss/*.scss', ['sass']);
  gulp.watch('./_dev/*.jade', ['jade']);
  gulp.watch('./_dev/js/app.js', ['javascript']);
});

// SCSS

gulp.task('sass', function() {
  gulp.src('./_dev/scss/*.scss')
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(gulp.dest('./_prod/css/'));
});

// Compile Jade

gulp.task('jade', function() {
  gulp.src('./_dev/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./_prod/'))
});

// Minify JS

gulp.task('javascript', function() {
  return gulp.src('./_dev/js/scripts.js')
    .pipe(uglify())
    .pipe(gulp.dest('./_prod/js/'));
});

// Moves Images

gulp.task('images', function() {
  return gulp.src('./_dev/img/*')
    .pipe(gulp.dest('./_prod/img/'))
});

gulp.task('default', ['sass','jade','javascript','images']);
