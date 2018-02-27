const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const CONTENT_SCRIPTS = [
  'src/*.js'
];

// Env vars
const logJsError = (error) => { console.log(error); };

gulp.task('content_scripts', () => {
  return gulp.src(CONTENT_SCRIPTS)
         .pipe($.babel({ presets: ['es2015'] }).on('error', logJsError))
         // toplevel (default false) - set to true if you wish to enable top level variable
         // and function name mangling and to drop unused variables and functions.
         .pipe($.concat('content_script.js'))
         .pipe($.uglify())
         .pipe(gulp.dest('dist'));
});

gulp.task('chrome_manifest', () => {
  return gulp.src('src/manifest.json')
         .pipe(gulp.dest('dist'));
});

gulp.task('bower_components', () => {
  return gulp.src('bower_components/*/dist/*.js')
         .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('locales', () => {
  return gulp.src('src/_locales/**/*')
         .pipe(gulp.dest('dist/_locales'));
});


const BUILD_TASKS = ['content_scripts', 'bower_components', 'chrome_manifest', 'locales'];

gulp.task('watch', BUILD_TASKS, () => {
  $.livereload.listen();

  gulp.watch([
    'src/*.js',
    'bower_components',
    'src/_locales/**/*.json'
  ]).on('change', $.livereload.reload);

  gulp.watch(CONTENT_SCRIPTS, ['content_scripts']);
  gulp.watch('bower_components/**/*', ['bower_components']);
  gulp.watch('src/manifest.json', ['chrome_manifest']);
});

gulp.task('build', BUILD_TASKS, () => {
  console.log(`Built extension`);
});

