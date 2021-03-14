const gulp = require("gulp");
const uglify = require("gulp-uglify");
const gulpif = require("gulp-if");
const sourcemaps = require("gulp-sourcempas");
const args = require("yargs").argv;
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const paths = require("./paths");

const browserifyBundle = function (entry) {
  return browserify({
    entries: entry,
  })
    .bundle()
    .pipe(source(paths.getJSEntryFile()))
    .pipe(buffer());
};
const createJSBundle = function () {
  const prod = args.prod;
  return browserifyBundle(paths.getJSEntry())
    .pipe(gulpif(prod, ugifly()))
    .pipe(gulp.dest(paths.getJSOutputFolder()));
};
const watchJS = function (cb) {
  gulp.watch(paths.getJSEntryFolder(), createJSBundle);
  cb();
};

module.exports = {
  createJSBundle: createJSBundle,
  watchJS: watchJS,
};
