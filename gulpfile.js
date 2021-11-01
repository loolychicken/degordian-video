// Include gulp
var gulp = require("gulp");

// Include plugins
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("gulp-autoprefixer");
var cleanCSS = require("gulp-clean-css");
var path = require("path");
var gulpUtil = require("gulp-util");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var ext_replace = require("gulp-ext-replace");

// Input and output paths
var input = {
  sass: "src/sass/*.scss",
  html: "*.html",
  js: "src/js/*.js",
};

var output = {
  css: "dist/css",
  js: "dist/js",
};

// Browserify static Server + watching sass/html files
gulp.task("serve", ["build-css"], function () {
  browserSync.init({
    server: "./",
    open: false,
  });

  gulp.watch(input.sass, ["build-css"]);
  gulp.watch(["./src/js/*.js", "!./src/js/*.min.js"], ["scripts"]);
  gulp.watch(["./src/**/*.{gif,jpg,jpeg,png,svg}"], ["build-images"]);
  gulp.watch(["./src/**/*.{ttf,otf,,woff,eot,svg}"], ["build-fonts"]);
});

// SASS -> CSS, generate sourcemaps (optional), do autoprefixer, minify CSS
gulp.task("build-css", function () {
  return (
    gulp
      .src(input.sass)
      // .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(rename("main.min.css"))
      .pipe(
        autoprefixer({
          browsers: ["last 4 versions"],
          cascade: false,
        })
      )
      .pipe(cleanCSS({ compatibility: "ie9" }))
      // .pipe(sourcemaps.write())
      .pipe(gulp.dest(output.css))
      .pipe(browserSync.stream())
  );
});

// Gulp task to minify JavaScript files
gulp.task("scripts", function () {
  return (
    gulp
      .src(["./src/js/*.js", "!./src/js/*.min.js"])
      // Minify the file
      .pipe(uglify())
      .pipe(rename({ suffix: ".min" }))
      // Output
      .pipe(gulp.dest("./dist/js"))
  );
});

// Gulp task to copy images
gulp.task("build-images", function () {
  return gulp
    .src(["./src/img/**/*.{gif,jpg,jpeg,png,svg}"])
    .pipe(gulp.dest("./dist/img"));
});

// Gulp task to copy fonts
gulp.task("build-fonts", function () {
  return gulp
    .src(["./src/fonts/**/*.{ttf,otf,woff,eot,svg}"])
    .pipe(gulp.dest("./dist/fonts/"));
});

// Build all
gulp.task("build", ["serve", "scripts", "build-images", "build-fonts"]);

// Default Task
gulp.task("default", ["build"]);
