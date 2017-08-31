var gulp        = require('gulp');
var sass        = require('gulp-sass');
var rename      = require('gulp-rename');
var sourcemaps  = require('gulp-sourcemaps');
var pump        = require('pump');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var rev         = require('gulp-rev');
var cleanCss    = require('gulp-clean-css')
var del         = require('del')
const _         = require('lodash');


const path = './'
const Path =  require('path');
// my files

var headLibraries = [
  path + "assets/js/lib/jquery.js",
	path + "assets/js/lib/bootstrap.min.js",
  path + "assets/js/lib/moment.min.js",
  path + "assets/js/lib/Chart.js",
  path + "assets/js/lib/currencyFormat.js"
]

var footLibraries = [
  path + "assets/js/lib/vue.min.js",
  path + "assets/js/lib/axios.min.js",
	path + "assets/bt/bootstrap-table.min.js",
  path + "assets/bt/locale/bootstrap-table-es-SP.min.js",
  path + 'assets/js/lib/sweetalert2.min.js',
  path + 'assets/js/tables/clientTable.js',
  path + 'assets/js/tables/serviceTable.js',
  path + 'assets/js/tables/contractTable.js',
  path + 'assets/js/tables/adminTables.js',
  path + 'assets/js/tables/paymentTable.js',
  path + "assets/js/lib/globals.js",
  path + "assets/js/functions.js",
  path + "assets/js/base.js",
  path + "assets/js/controllers.js",
  path + "assets/js/ajax.js",
  path + "assets/js/ajax2.js",
  path + 'assets/js/cierreCaja.js',
	path + 'assets/js/lib/adminlte.min.js',
	path + 'assets/js/lib/jquery.inputmask.js',
	path + 'assets/js/lib/icheck.min.js'
]

// sass files

var cssFiles = [
  path + "assets/css/material-icons.css",
  path + "assets/css/font-awesome.min.css",
  path + "assets/css/bootstrap.min.css",
  path + "assets/css/sweetalert2.min.css",
  path + "assets/bt/bootstrap-table.min.css"
]

var frontendCss = [
  path + 'assets/css/5-others/AdminLTE.min.css',
  path + 'assets/css/5-others/square/blue.css',
  path + 'assets/css/5-others/square/square.css'
]

const distTest = Path.resolve(__dirname,'assets','js','test')
const dist = Path.resolve(__dirname,'assets','js','dist')



// tasks


gulp.task('sass', function() {
  return gulp.src([path + '**.sass',"!" + path + 'assets/css/_*.sass', path + 'assets/css/*.sass'])
   .pipe(sourcemaps.init())
     .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
   .pipe(sourcemaps.write())
   .pipe(rename({suffix: '.min'}))
   .pipe(gulp.dest(path + 'assets/css'))
   .pipe(browserSync.reload({stream:true}));
 
});

gulp.task('compress',['clean-js'],function (cb){
 pump([
   gulp.src(headLibraries),
   concat("head.bundle.js"),
   gulp.dest(distTest),
   uglify(),
   rename({suffix: '.min'}),
   rev(),
   gulp.dest(dist),
   rev.manifest(dist + 'dev-manifest.json',{
     merge: true
   }),
   gulp.dest(dist),

   gulp.src(footLibraries),
   concat("foot.bundle.js"),
   gulp.dest(distTest),
   uglify(),
   rename({suffix: '.min'}),
   rev(),
   gulp.dest(dist),
   rev.manifest(dist + 'dev-manifest.json',{
     merge: true
   }),
   gulp.dest(dist)
 ],
 cb
 );     
});

gulp.task('clean-js', function () {
  return del([
    dist + '*.js'
  ])
})

gulp.task('css', function() {
  return gulp.src(cssFiles)
   .pipe(concat("secundaryCss.min.css"))
   .pipe(cleanCss())
   .pipe(gulp.dest(path + 'assets/css'))
});


gulp.task('css2', function() {
 return gulp.src(frontendCss)
 .pipe(concat("frontend.min.css"))
 .pipe(gulp.dest(path + 'assets/css/5-others/square'))
});


gulp.task('watch', function() {
 gulp.watch(path + 'assets/css/**',['sass']);
 gulp.watch(path + 'assets/js/**',['compress']);
 gulp.watch([path +'assets/js/*.js'] ,['js']);
});

gulp.task('default',['watch',"compress","css","css2"]);
