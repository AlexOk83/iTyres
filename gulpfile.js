'use strict';

var gulp = require('gulp'),
  pug = require('gulp-pug'),
  rename = require('gulp-rename'),
  minifyCSS = require('gulp-minify-css'),
  less = require('gulp-less'),
  concat = require('gulp-concat'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync'),
  plumber = require('gulp-plumber'),
  reload = browserSync.reload;

gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: "./build"
    },
    port: 3001,
    open: true,
    notify: false
  });
});

//less
gulp.task('less', function () {
    gulp.src('src/less/global.less')
        .pipe(less())
        .pipe(plumber())
        .pipe(autoprefixer('last 15 versions'))
        .pipe(minifyCSS())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest('./build/css/'))
        .pipe(reload({stream:true}));
});


//html
gulp.task('html', function () {
  gulp.src('build/*.html')
    .pipe(reload({stream: true}));
});

// pug
gulp.task('pug', function () {
  gulp.src('src/pug/*.pug')
    .pipe(plumber())
    .pipe(pug({
      locals: '',
      pretty : true
    }))
    .pipe(gulp.dest('./build'));
});

//css
gulp.task('css', function () {
  gulp.src('build/css/*.css')
    .pipe(reload({stream: true}));
});

gulp.task('watch', function () {
  gulp.watch('src/less/*.less', ['less']);
  gulp.watch('src/pug/*.pug', ['pug']);
  gulp.watch('src/pug/template/*.pug', ['pug']);
  gulp.watch('build/*.html', ['html']);
  gulp.watch('build/css/*.css', ['css']);

});

gulp.task('default', ['browserSync', 'html', 'css', 'less', 'pug', 'watch']);