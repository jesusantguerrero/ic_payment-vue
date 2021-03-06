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
const path        = './resources/src/assets/'
const Path        = require('path')
// my files

config = {
  css: {
    origin: '',
    test: '',
    dest: './public/assets/css/'
  }
}
// sass files

const cssFiles    = [
  path + "css/5-others/material-icons.css",
  path + "css/5-others/font-awesome.min.css",
  path + "css/5-others/bootstrap.min.css",
  path + "css/5-others/sweetalert2.min.css"
]

const frontendCss = [
  path + "css/5-others/peace-material.min.css",
  path + "css/5-others/select2.min.css",
  // path + "css/5-others/AdminLTE.min.css",
  path + "css/5-others/square/blue.css",
  path + "css/5-others/square/square.css",
  path + "css/5-others/animate.css"
]

const superPath   = 'C:/xampp/htdocs/icpayment/'
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


gulp.task('watch', () => {
  gulp.watch(`${path }css/**`, gulp.parallel('sass'));
});

gulp.task('default', gulp.parallel('watch',"sass"));
