const gulp        = require('gulp')
const sass        = require('gulp-sass')
const rename      = require('gulp-rename')
const sourcemaps  = require('gulp-sourcemaps')
const uglify      = require('gulp-uglify')
const minify      = require('gulp-minify')
const concat      = require('gulp-concat')
const rev         = require('gulp-rev')
const cleanCss    = require('gulp-clean-css')
const babel       = require('gulp-babel')
const pump        = require('pump')
const del         = require('del')
const merge       = require('merge-stream')
const path        = './src/assets/'
const Path        = require('path')
// my files

config = {
  css: {
    origin: '',
    test: '',
    dest: './assets/css/'
  }
}

var Head = [
  path + "js/lib/jquery-3.2.1.min.js",
  path + "js/lib/bootstrap.min.js",
  path + "js/lib/moment.min.js",
  path + "js/lib/locale/es-do.js",
  path + "js/lib/Chart.js",
  path + "js/lib/currencyFormat.js"
]

const Libraries = [
  path + "js/lib/vue.min.js",
  path + "js/lib/axios.min.js",
	path + "bt/bootstrap-table.min.js",
  path + "bt/locale/bootstrap-table-es-SP.min.js",
  path + "js/lib/sweetalert2.min.js",
	path + "js/lib/icheck.min.js",
  path + "js/lib/peace.min.js",
  path + "js/lib/select2.full.min.js"
]

const Common = [
  path + "js/tables/clientTable.js",
  path + "js/tables/serviceTable.js",
  path + "js/tables/contractTable.js",
  path + "js/tables/paymentTable.js",
  path + "js/tables/sectionTable.js",
  path + "js/lib/globals.js",
  path + "js/base.js"
]

const Components  = `${path}js/components/**.js`

// sass files

const cssFiles    = [
  path + "css/5-others/material-icons.css",
  path + "css/5-others/font-awesome.min.css",
  path + "css/5-others/bootstrap.min.css",
  path + "css/5-others/sweetalert2.min.css",
  path + "bt/bootstrap-table.min.css"
]

const frontendCss = [
  path + "css/5-others/peace-material.min.css",
  path + "css/5-others/select2.min.css",
  path + "css/5-others/AdminLTE.min.css",
  path + "css/5-others/square/blue.css",
  path + "css/5-others/square/square.css",
]

const superPath   = 'C:/xampp/htdocs/icpayment/'
const distTest    = Path.resolve(superPath,'src','js','test')
const dist        = Path.resolve(superPath,'assets','js','dist')
const distMin     = Path.resolve(superPath,'assets','js','min')
// sass taks

gulp.task('sass', () => {
  const mainMinCSS = gulp.src([`${path}/css/**/*.sass`,`!${path}assets/css/_*.sass`, `${path }assets/css/*.sass}`])
    .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.css.dest))

  const secundaryMinCSS = gulp.src(cssFiles)
    .pipe(concat("secundaryCss.min.css"))
    .pipe(cleanCss())
    .pipe(gulp.dest(config.css.dest))

    const frontendMinCSS = gulp.src(frontendCss)
    .pipe(concat("frontend.min.css"))
    .pipe(cleanCss())
    .pipe(gulp.dest(`${config.css.dest}5-others/square`))

  return merge(mainMinCSS,secundaryMinCSS,frontendMinCSS)
});

// javascript

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
    gulp.dest(distMin)],
    cb
 )
})

gulp.task('head', (cb) => {
  pump([
    gulp.src(Head),
    sourcemaps.init(),
    concat("head.bundle.js"),
    uglify(),
    sourcemaps.write('.'),
    gulp.dest(distMin)],
    cb
  )
})

gulp.task('final-compress',['components','head'] , (cb) => {
  pump([
     gulp.src([...Libraries, ...Common]),
     sourcemaps.init(),
     concat("final.bundle.js"),
     uglify(),
     sourcemaps.write('.'),
     gulp.dest(distMin)],
     cb
    )
})


gulp.task('watch', () => {
  gulp.watch(`${path }css/**`,['sass']);
  gulp.watch([`${path}js/**/*.js`,`!${path}js/test/**`], ['final-compress']);
});

gulp.task('default',['watch',"sass","final-compress"]);
