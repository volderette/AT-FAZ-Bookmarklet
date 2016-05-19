var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    artoo = require('gulp-artoo'),
    rename = require('gulp-rename'),
    webserver = require('gulp-webserver'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace'),
    fs = require('fs'),
    gutil = require('gulp-util');

// Files to aggregate
var files = [
    './templates/*.tpl',
    './stylesheets/*.css',
    './src/librairies/**/*.js',
    './src/scrapping/**/*.js',
    './src/render/**/*.js',
    './src/model/**/*.js',
    './src/*.js'
];

// Build
function preBuild() {
    return gulp.src(files)
        .pipe(gulpif('*.tpl', replace(/(?:\r\n|\r|\n)/g, '')))
        .pipe(gulpif('*.tpl', replace(/(?:\s\s\s\s)/g, '')))
        .pipe(gulpif('*.tpl', artoo.template()))
        .pipe(gulpif('*.css', replace(/(?:\r\n|\r|\n)/g, '')))
        .pipe(gulpif('*.css', replace(/(?:\s\s\s\s)/g, '')))
        .pipe(gulpif('*.css', artoo.stylesheet()))
        .pipe(concat('AT-Bookmarklet.concat.js'));
}

gulp.task('build', function () {
    return preBuild()
        .pipe(gulp.dest('./build'));
});

// Bookmarklets
gulp.task('bookmark.dev', function () {
    return artoo.blank('AT-Bookmarklet.bookmark.dev.js')
        .pipe(artoo({
            random: true,
            loadingText: null,
            settings: {
                reExec: true,
                scriptUrl: 'http://localhost:8000/build/AT-Bookmarklet.concat.js',
                env: 'dev',
                dependencies: [
                    {
                        "name": "jqueryUI",
                        "url": "//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js",
                        "globals": ["jqueryUI"]
                    },
                    {
                        "name": "Materialize",
                        "url": "//cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/js/materialize.min.js",
                        "globals": ["Materialize"]
                    },
                    {
                        "name": "chart",
                        "url": "//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.0.0/Chart.js",
                        "globals": ["chart"]
                    }
                ]
            }
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('bookmark.prod', function () {
    return preBuild()
        .pipe(uglify())
        .pipe(rename('AT-Bookmarklet.bookmark.prod.js'))
        .pipe(artoo({
            settings: {
                reExec: true,
                dependencies: [
                    {
                        "name": "jqueryUI",
                        "url": "//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js",
                        "globals": ["jqueryUI"]
                    },
                    {
                        "name": "Materialize",
                        "url": "//cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/js/materialize.min.js",
                        "globals": ["Materialize"]
                    },
                    {
                        "name": "Chart",
                        "url": "//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.0.0/Chart.js",
                        "globals": ["Chart"]
                    }
                ]
            }
        }))
        .pipe(gulp.dest('./build'));
});

// Demo
gulp.task('demo', function () {
    var fileContent = fs.readFileSync("./build/AT-Bookmarklet.bookmark.prod.js", "utf8");
    fileContent=fileContent.replace(/"/g,"&quot;");
    return gulp.src('./demo/demo.tpl')
            .pipe(replace(/(?:#bookmarklet)/g, fileContent))
            .pipe(rename('index.html'))
            .pipe(gulp.dest('./demo'));
});

// Deploy http://innovation.intraxiti.com/bookmarklet/
gulp.task('deploy', function () {
    return  gulp.src('./demo/**/*.*')
        .pipe(gulp.dest('\\\\bdxweb014\\wwwroot\\Innovation\\bookmarklet\\'))
        .on('end', function(){ gutil.log('The demo is here : http://innovation.intraxiti.com/bookmarklet/'); });
});

// Watch
gulp.task('watch', function () {
    gulp.watch(files, ['build']);
});

// Server
gulp.task('serve', function () {
    gulp.src('./')
        .pipe(webserver({
            directoryListing: true,
            port: 8000,
            livereload: true
        }));
});

// Macro tasks
gulp.task('work', ['build', 'watch', 'serve']);
gulp.task('bookmarklets', ['bookmark.dev', 'bookmark.prod']);
gulp.task('default', ['build', 'bookmark.dev', 'bookmark.prod']);
gulp.task('deploy-demo', ['default', 'demo', 'deploy']);

