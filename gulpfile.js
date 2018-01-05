var gulp = require('gulp');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var useref = require('gulp-useref');
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');
var htmlmin = require('gulp-htmlmin');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var fontSpider = require( 'gulp-font-spider' );

gulp.task("rev", function() {
  var jsFilter = filter("**/*.js", { restore: true });
  var cssFilter = filter("**/*.css", { restore: true });
  var indexHtmlFilter = filter(['**/*', '!**/index.html'], { restore: true });

  return gulp.src("src/index.html")
    .pipe(useref())      // Concatenate with gulp-useref
    .pipe(jsFilter)
    .pipe(uglify())             // Minify any javascript sources
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(csso())               // Minify any CSS sources
    .pipe(cssFilter.restore)
    .pipe(indexHtmlFilter)
    .pipe(rev())                // Rename the concatenated files (but not index.html)
    .pipe(indexHtmlFilter.restore)
    .pipe(revReplace())         // Substitute in new filenames
    .pipe(gulp.dest('dist'));
});

gulp.task('fontspider', function() {
    return gulp.src('src/index.html')
        .pipe(fontSpider());
});

gulp.task('copyFont', function() {
  gulp.src('src/font/*')
  .pipe(gulp.dest('dist/font'))
})

gulp.task('copyMusic', function() {
    gulp.src('src/music/*')
        .pipe(gulp.dest('dist/music'))
})

gulp.task('img', function() {
  return gulp.src('src/images/**/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngcrush()]
    }))
    .pipe(gulp.dest('dist/images/'));
});

gulp.task('minifyHtml', function() {
  return gulp.src('dist/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return gulp.src('dist', {read: true})
        .pipe(clean());
});

gulp.task('default',function(done){
  runSequence(
    ['clean'],
    ['rev','img','fontspider','copyFont','copyMusic'],
    ['minifyHtml'],
    done);
})
