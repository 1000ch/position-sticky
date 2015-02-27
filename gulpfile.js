var gulp     = require('gulp');
var plumber  = require('gulp-plumber');
var rename   = require('gulp-rename');
var sequence = require('run-sequence').use(gulp);
var package  = require('./package.json');
var banner   = '/*! <%= name %> - v<%= version %> */';

var FILE_BROWSERIFY_INDEX = './src/index.js';
var FILE_TEST_RUNNER      = './test/runner.js';
var FILE_PACKAGE_JSON     = 'package.json';

var DIR_DIST  = './dist';
var DIR_TEMP  = './temp';

var GLOB_TEST_FILES    = ['./test/**/*.js', '!./test/runner.js'];
var GLOB_JS_SRC_FILES  = ['./src/**/*.js'];
var GLOB_DIST_FILES    = ['./dist/**/*'];

function bufferedBrowserify(standaloneName) {
  var transform  = require('vinyl-transform');
  var browserify = require('browserify');
  var babelify   = require('babelify');

  return transform(function(filename) {
    return browserify(filename, {
      standalone : standaloneName,
      debug      : true,
      noParse    : [
        require.resolve('babel/browser-polyfill')
      ]
    })
      .transform(babelify.configure({
        experimental : false,
        playground   : false
      }))
      .bundle()
      .on('error', function(err){
        console.error(err.message);
        this.emit('end');
      })
      ;
  });
}

function bumpCommit(type) {
  var bump   = require('gulp-bump');
  var git    = require('gulp-git');
  var filter = require('gulp-filter');

  var onlyPackageJson = filter(FILE_PACKAGE_JSON);

  return gulp.src(GLOB_DIST_FILES.concat(FILE_PACKAGE_JSON))
    .pipe(onlyPackageJson)
    .pipe(bump({type: type}))
    .pipe(gulp.dest('./'))
    .pipe(onlyPackageJson.restore())
    .pipe(git.commit('bump version'))
    .pipe(onlyPackageJson);
}

gulp.task('jshint', function() {
  var jshint = require('gulp-jshint');

  return gulp.src(GLOB_JS_SRC_FILES)
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('tag', function() {
  var tag = require('gulp-tag-version');
  return gulp.src(FILE_PACKAGE_JSON)
    .pipe(tag({prefix: ''}));
});

gulp.task('pretest', function() {
  gulp.start('build', 'build-test');
});

gulp.task('watch', function() {
  gulp.watch(GLOB_JS_SRC_FILES, function() {
    gulp.start('jshint', 'build');
  });
});

gulp.task('build', function() {
  var uglify     = require('gulp-uglify');
  var header     = require('gulp-header');
  var fileName   = 'position-sticky';
  var exportName = fileName.slice(0, 1).toUpperCase() + fileName.slice(1);

  return gulp.src(FILE_BROWSERIFY_INDEX)
    .pipe(bufferedBrowserify(exportName))
    .pipe(header(banner, {name: fileName, version: package.version}))
    .pipe(rename(fileName + '.js'))
    .pipe(gulp.dest(DIR_DIST))
    .pipe(plumber())
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(rename(fileName + '.min.js'))
    .pipe(gulp.dest(DIR_DIST))
});

gulp.task('build-test', function() {
  var espower = require('gulp-espower');

  gulp.src(FILE_TEST_RUNNER)
    .pipe(bufferedBrowserify(null))
    .pipe(gulp.dest(DIR_TEMP));

  return gulp.src(GLOB_TEST_FILES)
    .pipe(bufferedBrowserify(null))
    .pipe(espower())
    .pipe(gulp.dest(DIR_TEMP));
});