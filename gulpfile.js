// LIBRARIES

// Include gulp
var gulp        = require('gulp'); 

// Include our plugins
var jshint      = require('gulp-jshint');
var compass     = require('gulp-compass');
var plumber     = require('gulp-plumber');
var minifyCSS   = require('gulp-minify-css');
var notify      = require('gulp-notify');
var gulpIgnore  = require('gulp-ignore');
// var sass     = require('gulp-sass');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var livereload  = require('gulp-livereload');
var runSequence = require('run-sequence');
var rimraf      = require('rimraf');
var connect     = require('gulp-connect');

// PATHS

// Base Paths
var basePaths = {
    src: './source/',
    sass: './source/scss/',
    css: './source/css/',
    js: './source/js/',
    scripts: './source/scripts/',
    comp: './source/components/',
    dest: './dest/',
    bower: './bower_components/'
};
// App & Components Paths
var paths = {
    uploader: basePaths.comp + 'uploader/',
    grid: basePaths.comp + 'grid/',
    singlePage: basePaths.comp + 'singlePage/',
    sass: [
        basePaths.src + 'scss/',
        basePaths.comp + 'uploader/scss/',
        basePaths.comp + 'grid/scss/',
        basePaths.comp + 'singlePage/scss/'
    ],
    css: [
        basePaths.src + 'css/',
        basePaths.comp + 'uploader/css/',
        basePaths.comp + 'grid/css/',
        basePaths.comp + 'singlePage/css/'
    ],
    js: [
        basePaths.bower + 'modernizr/src/modernizr.js',
        basePaths.bower + 'jquery/dist/jquery.js'
    ],
    scripts: [
        basePaths.src + 'scripts/',
        basePaths.comp + 'uploader/scripts/',
        basePaths.comp + 'grid/scripts/',
        basePaths.comp + 'singlePage/scripts/'
    ]
};

// TASKS

// Plumber error handler
var onError = function (err) {
	console.log(err);
};

// Connect task with livereload
gulp.task('connect', function () {
    connect.server({livereload: true, root: '.'});
});

// Livereload task
gulp.task('livereload', function () {
    gulp.src([basePaths.src + '*.html',
              basePaths.src + 'stylesheets/*.css',
              basePaths.src + 'tv/*.html',
              basePaths.src + 'css/*.css',
              basePaths.src + 'scripts/*.js'])
        .pipe(watch())
        .pipe(connect.reload())
        .pipe(notify({ message: 'Livereload Task ---> Connect Reloaded' }));
});

// HTML task
gulp.task('html', function () {
    gulp.src([basePaths.src + '*.html',
              basePaths.src + 'tv/*.html',
              paths.uploader + '*.html',
              paths.grid + '*.html',
              paths.singlePage + '*.html'
             ])
        .pipe(connect.reload())
        .pipe(notify({ message: 'HTML Task ---> Connect Reloaded' }));
});

// Lint task
gulp.task('lint', function () {
    return gulp.src(basePaths.src + 'js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile base app sass with compass
gulp.task('compile', function () {
  gulp.src(basePaths.src + 'scss/*.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(compass({
      css: basePaths.src + 'css',
      sass: basePaths.src + 'scss'
    }))
    .on('error', function (err) {
      // Would like to catch the error here 
    })
    .pipe(minifyCSS())
    .pipe(gulp.dest(basePaths.src + 'css'))
      .pipe(notify({ message: 'Compile base app sass ---> complete' }))
    .pipe(connect.reload());
});
// Watch files for base app changes
gulp.task('watchBase', function () {
    gulp.watch([basePaths.src + 'scss/*.scss'], ['compile']);
    gulp.watch([basePaths.src + '*.html'], ['html']);
});
gulp.task('base', ['connect', 'watchBase']);

// Compile uploader component sass with compass
gulp.task('compileUploader', function () {
  gulp.src(paths.uploader + 'scss/*.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(compass({
      css: paths.uploader + 'css',
      sass: paths.uploader + 'scss'
    }))
    .on('error', function (err) {
      // Would like to catch the error here 
    })
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.uploader + 'css'))
      .pipe(notify({ message: 'Compile uploader component sass ---> complete' }))
    .pipe(connect.reload());
});
// Watch files for uploader changes
gulp.task('watchUploader', function () {
    gulp.watch([paths.uploader + 'scss/*.scss'], ['compileUploader']);
    gulp.watch([paths.uploader + '*.html'], ['html']);
});
gulp.task('uploader', ['connect', 'watchUploader']);

// Compile grid component sass with compass
gulp.task('compileGrid', function () {
  gulp.src(paths.grid + 'scss/*.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(compass({
      css: paths.grid + 'css',
      sass: paths.grid + 'scss'
    }))
    .on('error', function(err) {
      // Would like to catch the error here 
    })
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.grid + 'css'))
      .pipe(notify({ message: 'Compile grid component sass ---> complete' }))
    .pipe(connect.reload());
});
// Watch files for grid changes
gulp.task('watchGrid', function () {
    gulp.watch([paths.grid + 'scss/*.scss'], ['compileGrid']);
    gulp.watch([paths.grid + '*.html'], ['html']);
});
gulp.task('grid', ['connect', 'watchGrid']);

// Compile singlePage component sass with compass
gulp.task('compileSinglePage', function () {
  gulp.src(paths.singlePage + 'scss/*.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(compass({
      css: paths.singlePage + 'css',
      sass: paths.singlePage + 'scss'
    }))
    .on('error', function (err) {
      // Would like to catch the error here 
    })
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.singlePage + 'css'))
      .pipe(notify({ message: 'Compile single page component sass ---> complete' }))
    .pipe(connect.reload());
});
// Watch files for singlePage changes
gulp.task('watchSinglePage', function () {
    gulp.watch([paths.singlePage + 'scss/*.scss'], ['compileSinglePage']);
    gulp.watch([paths.singlePage + '*.html'], ['html']);
});
gulp.task('singlePage', ['connect', 'watchSinglePage']);


// Compile sass with sass
/* gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('stylesheets'));
}); */

// Concatenate & minify js
gulp.task('scripts', function () {
    return gulp.src('source/javascripts/*.js')
        .pipe(concat('source/script/all.js'))
        .pipe(gulp.dest('source/script'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('source/script'));
});

// Watch files for changes
gulp.task('watch', function () {
    gulp.watch(basePaths.src + 'js/*.js', ['lint', 'scripts']);
    gulp.watch(basePaths.src + 'scripts/*.js', ['lint', 'scripts']);
    gulp.watch(basePaths.src + 'scss/*.scss', ['compile']);
    gulp.watch(basePaths.src + '*.html', ['html']);
});

// Cleans the build directory
gulp.task('clean', function (cb) {
    rimraf('./dest', cb);
});

var a = basePaths.src + 'scss';

// Copies everything in the source folder except scss
gulp.task('copy', function () {
        gulp.src(basePaths.src + '**/*')
        .pipe(gulpIgnore.exclude(a))
        .pipe(gulp.dest(basePaths.dest));
});

// DEFAULT TASK

// gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
gulp.task('default', ['lint', 'compass', 'scripts', 'watch']);

gulp.task('build', function (cb) {
    runSequence('clean', ['copy', 'compass'], cb);
});

