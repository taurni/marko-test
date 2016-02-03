//imports
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var bs = require('browser-sync').create();
var through = require('through2');
var merge = require('merge-stream');

//constants
var $ = gulpLoadPlugins();
var RELOAD = bs.reload;

//variables
var src = {
    //scss: 'app/scss/*.scss',
    //css:  'app/css',
    html:   'app/*.html',
    marko:  'app/*.marko'
};
var dir ={
    app:            "./app",
    browserSync:    "./app",
    marko:          "./app"
};


gulp.task('serve', ['marko'], function(){
    bs.init({
        server: {
            baseDir: dir.browserSync
        }
    });
    gulp.watch(src.html).on('change', RELOAD);
    gulp.watch(src.marko, ['marko']);
});

gulp.task('watcher',function(){
    gulp.watch('app/*.marko', ['marko']);
});



/** Marko hotreloader for auto combileing
 *  https://gitter.im/marko-js/marko/archives/2015/10/22
 *  ---------------------------------------------------- *
 *  TODO: compile only changed files!
**/
require('marko/hot-reload').enable();
gulp.task('marko',function(){
    var reload = gulp.src(src.marko)
        .pipe(through.obj(function (file, enc, cb) {
            require('marko/hot-reload').handleFileModified(file.path);
            cb(null, file);
        }));

    var build = gulp.src(src.marko)
        .pipe($.marko({
            renderParams: {
                title: 'Hello Marko'
            }
        }))
        .pipe($.debug({title: 'MARKO-out:'}))
        .pipe(gulp.dest(dir.marko));

    return merge(reload,build);
});
