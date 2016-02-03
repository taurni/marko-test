//imports
var gulp = require('gulp');
var bs = require('browser-sync').create();
var gulpLoadPlugins = require('gulp-load-plugins');

//constants
var $ = gulpLoadPlugins();
var RELOAD = bs.reload;

//variables
var src = {
    //scss: 'app/scss/*.scss',
    //css:  'app/css',
    html:   'app/*.html',
    marko:  'app/test.marko' //'app/*.marko'
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
    //gulp.watch(src.html).on('change', RELOAD);
    gulp.watch(src.marko, ['marko']);
});

gulp.task('watcher',function(){
    gulp.watch('app/*.marko', ['marko']);
});

gulp.task('marko',function(){
    var fs = require('fs');

    gulp.src(src.marko)
        .pipe($.debug({title: 'MARKO-in:'}))
        .pipe($.marko({
            renderParams: {
                title: 'Hello Marko'
            }
        }))
        .pipe($.debug({title: 'MARKO-out:'}))
        .pipe(gulp.dest(dir.marko))
        .on('finish', function () {
            fs.readFile('app/test.marko.html', {encoding: 'utf-8', flag: 'rs'}, function(e, data) {
                if (e) return console.log(e);
                console.log("DATA-END\n",data);
            });
        })

});
