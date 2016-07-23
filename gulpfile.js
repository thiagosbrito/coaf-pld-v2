var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    browserSync = require('browser-sync').create(),
    proxy = require('http-proxy-middleware'),
    url = require('url'),
    https = require('https');



gulp.task('serve',['clean'], function () {

    var proxyApi    = proxy('/api', { 
        target: 'https://dpld.wba.com.br:8443',
        https: true,
        changeOrigin: true
    });

    var proxyLogin  = proxy('/j_security_check',{
        target:'https://dpld.wba.com.br:8443',
        https: true,
        changeOrigin: true
    });

    browserSync.init({
        open: true,
        port: 3000,
        server: {
            baseDir: "./app",
            middleware: [proxyApi, proxyLogin]
        }
    })
    gulp.start('scripts', 'images-assets','images-template');
    gulp.watch('app/assets/css/**/*.css').on('change',browserSync.reload);
    gulp.watch('app/scripts/**/*.js', ['scripts']).on('change',browserSync.reload);
    gulp.watch('app/views/**/*.html').on('change',browserSync.reload);
})

gulp.task('scripts', function() {
  return gulp.src('app/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(gulp.dest('dist/scripts'))
    
});

gulp.task('images-assets', function() {
  return gulp.src('app/assets/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/img'));
    // .pipe(notify({ message: 'Images from assets task complete' }));
});

gulp.task('images-template', function() {
  return gulp.src('app/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    // .pipe(notify({ message: 'Images from template task complete' }));
});

gulp.task('clean', function() {
  return del(['dist/assets', 'dist/scripts', 'dist/images']);
});

gulp.task('default', ['clean'], function() {
  gulp.start('scripts', 'images-assets','images-template');
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('app/assets/**/*.css', ['styles']).on('change', livereload.changed);

  // Watch .js files
  gulp.watch('app/scripts/**/*.js', ['scripts']).on('change', livereload.changed);

  // Watch image files
  gulp.watch('app/assets/img/**/*', ['images-assets']);
  gulp.watch('app/images/**/*', ['images-template']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);

});