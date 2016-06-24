//Directories
var src				= './src',
		jsSrc			= src + '/js/app.js',
		jsDest		= './build/js',
		cssDest   = './build/css';

// Gulp
var gulp 			= require('gulp');

// Gulp plugins
var sass 			= require('gulp-sass'),
		notify 		= require('gulp-notify'),
		uglify 		= require('gulp-uglify'),
    cssmin  	= require('gulp-cssmin'),
		rename 		= require('gulp-rename'),
    imagemin	= require('gulp-imagemin'),
    jshint    = require('gulp-jshint');

// Non Gulp plugins
var browserify	= require('browserify'),
    source      = require('vinyl-source-stream');

// JS Lint
gulp.task('lint', function() {
    return gulp.src(jsSrc)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Sass
gulp.task('styles', function() {

	var sassOptions = {
        errLogToConsole: true,
        outputStyle: 'compact'
    }

    return gulp.src(src + '/sass/*.scss')
    .pipe(sass(sassOptions))
    .on('error', handleErrors)
    .pipe(gulp.dest(cssDest));

});

// Browserify
gulp.task('browserify', function() {
    return browserify(jsSrc)
    .bundle()
    .pipe(source('app.js'))
    .on('error', function(err){
      console.log(err.message);
      this.emit('end');
    })
    .pipe(gulp.dest(jsDest));
});

// Minify JS
gulp.task('compressjs', ['browserify'], function() {
  return gulp.src(jsDest + '/app.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(jsDest));
});

// Minify CSS
gulp.task('compresscss', ['styles'], function () {
    gulp.src(cssDest + '/style.css')
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(cssDest));
});

// Watch task
gulp.task('watch',function() {
    gulp.watch(src + '/sass/**/*.scss', ['styles']);
    gulp.watch(src + '/js/*.js', ['browserify', 'lint']);
});

// Notify of any errors
var handleErrors = function() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: "Compile Error",
        message: "<%= error %>"
    }).apply(this, args);
    this.emit('end');
};

// Image optimisation
gulp.task('images', function() {
    gulp.src(src + '/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('img'))
});

// Build Task
gulp.task('default', ['browserify', 'styles', 'lint', 'watch']);
gulp.task('production', ['compresscss', 'compressjs']);
