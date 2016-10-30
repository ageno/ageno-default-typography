var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var cleancss = require('gulp-clean-css');
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var stripCssComments = require('gulp-strip-css-comments');
var cssbeautify = require('gulp-cssbeautify');

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('sass', function () {
  return gulp.src('./sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(stripCssComments())
    .pipe(cssbeautify( { indent: '  '} ))
    .pipe(sourcemaps.write('./maps'))
    .pipe(rename('ageno-default-typography.css'))
    .pipe(gulp.dest('./css'))
});

gulp.task('css-min', function () {
  return gulp.src('./css/ageno-default-typography.css')
    .pipe(plumber())
    .pipe(cleancss())
    .pipe(autoprefixer())
    .pipe(rename('ageno-default-typography.min.css'))
    .pipe(gulp.dest('./css'))
});

gulp.task('normalizecss', function () {
  return gulp.src('./node_modules/normalize.css/normalize.css')
    .pipe(stripCssComments({preserve: false}))
    .pipe(rename('normalize.scss'))
    .pipe(gulp.dest('./sass'));
});

gulp.task('watch', function (){
  gulp.watch('app/scss/**/*.scss', ['default']);
  // Other watchers
});

gulp.task('default', function(callback) {
  runSequence('normalizecss', 'sass', 'css-min', callback);
});
