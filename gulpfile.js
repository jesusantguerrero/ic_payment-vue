var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var pump = require('pump');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var rev = require('gulp-rev');
var cleanCss = require('gulp-clean-css')
var del = require('del')
var merge = require('merge-stream')
const _ = require('lodash');


const path = './'
const Path = require('path');
// my files

var headLibraries = [
  path + "assets/js/lib/jquery-3.2.1.min.js",
  path + "assets/js/lib/bootstrap.min.js",
  path + "assets/js/lib/moment.min.js",
  path + "assets/js/lib/locale/es-do.js",
  path + "assets/js/lib/Chart.js",
  path + "assets/js/lib/currencyFormat.js"
]

var Libraries = [
  path + "assets/js/lib/vue.min.js",
  path + "assets/js/lib/axios.min.js",
  path + "assets/bt/bootstrap-table.min.js",
  path + "assets/bt/locale/bootstrap-table-es-SP.min.js",
  path + "assets/js/lib/sweetalert2.min.js",
  path + "assets/js/lib/jquery.inputmask.js",
  path + "assets/js/lib/icheck.min.js",
  path + "assets/js/lib/peace.min.js",
  path + "assets/js/lib/select2.full.min.js"
]

var commonChunks = [,
  path + "assets/js/tables/clientTable.js",
  path + "assets/js/tables/serviceTable.js",
  path + "assets/js/tables/contractTable.js",
  path + "assets/js/tables/adminTables.js",
  path + "assets/js/tables/paymentTable.js",
  path + "assets/js/tables/sectionTable.js",
  path + "assets/js/lib/globals.js",
  path + "assets/js/base.js",
  path + "assets/js/controllers.js",
  path + "assets/js/ajax.js",
  path + "assets/js/ajax2.js"
]

var Components = `${path}assets/js/components/**.js`

// sass files

var cssFiles = [
  path + "assets/css/material-icons.css",
  path + "assets/css/font-awesome.min.css",
  path + "assets/css/bootstrap.min.css",
  path + "assets/css/sweetalert2.min.css",
  path + "assets/bt/bootstrap-table.min.css"
]

var frontendCss = [
  path + "assets/css/5-others/peace-material.min.css",
  path + "assets/css/5-others/select2.min.css",
  path + "assets/css/5-others/AdminLTE.min.css",
  path + "assets/css/5-others/square/blue.css",
  path + "assets/css/5-others/square/square.css",
]

const superPath = 'C:/xampp/htdocs/icpayment/'

const distTest = Path.resolve(superPath, 'assets', 'js', 'test')
const dist = Path.resolve(superPath, 'assets', 'js', 'dist')
const distMin = Path.resolve(superPath, 'assets', 'js', 'min')

// tSass

gulp.task('sass', () => {
  const mainMinCSS = gulp.src([`${path}/css/**/*.sass`, `!${path}assets/css/_*.sass`, `${path }assets/css/*.sass}`])
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(path + '../assets/css'))

  const secundaryMinCSS = gulp.src(cssFiles)
    .pipe(concat("secundaryCss.min.css"))
    .pipe(cleanCss())
    .pipe(gulp.dest(path + '../assets/css'))

  const frontendMinCSS = gulp.src(frontendCss)
    .pipe(concat("frontend.min.css"))
    .pipe(cleanCss())
    .pipe(gulp.dest(path + '../assets/css/5-others/square'))

  return merge(mainMinCSS, secundaryMinCSS, frontendMinCSS)
});



// JavaScript

gulp.task('head', function () {
  var head = gulp.src(headLibraries)
    .pipe(concat("head.bundle.js"))
    .pipe(gulp.dest(distTest))
    .pipe(uglify())
    .pipe(gulp.dest(distMin))

  return merge(head, components)
})

gulp.task('components', (cb) => {
  pump([
      gulp.src(Components),
      sourcemaps.init(),
      babel({
        presets: ['env']
      }),
      concat('components.js'),
      uglify(),
      sourcemaps.write('.'),
      gulp.dest(distMin),
    ],
    cb
  )
})

gulp.task('final-compress', ['components', 'head'], (cb) => {
  pump([
      gulp.src([...Libraries, ...commonjs]),
      sourcemaps.init(),
      concat("final.bundle.js"),
      gulp.dest(distTest),
      uglify(),
      sourcemaps.write('.'),
      gulp.dest(distMin)
    ],
    cb
  )
})


gulp.task('js', function (cb) {
  pump([
      gulp.src([path + 'assets/js/**.js', "!" + path + 'assets/js/lib/', '!' + path + 'assets/js/min/']),
      uglify(),
      rename({
        suffix: '.min'
      }),
      gulp.dest(path + "assets/js/min")
    ],
    cb
  );

})

gulp.task('watch', function () {
  gulp.watch(`${path }assets/css/**`, ['sass']);
  gulp.watch([`${superPath}assets/js/**/*.js`, `!${superPath}assets/js/test`, `!${superPath}assets/js/min`], ['final-compress']);
});

gulp.task('default', ['watch', "sass", "final-compress"]);