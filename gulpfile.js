'use strict';

let gulp = require('gulp');
let uglify = require('gulp-uglify');
var concat = require("gulp-concat-js");
let ts = require('gulp-typescript');
let sourcemaps = require('gulp-sourcemaps');
let mocha = require('gulp-mocha');

let clientTsProject = ts.createProject('client/tsconfig.json');
let serverTsProject = ts.createProject('server/tsconfig.json');

// These tasks will be run when you just type "gulp"
gulp.task('default', [ 'clientscripts', 'serverscripts', 'server-tests' ]);

// By adding this, we can run "gulp watch" to automatically
// run the build when we change a script
gulp.task('watch', () => {
  gulp.watch('client/src/**/*.ts', [ 'clientscripts' ]);
  gulp.watch('server/src/**/*.ts', [ 'serverscripts', 'server-tests' ]);
});

// This task can be run alone with "gulp clientscripts"
gulp.task('clientscripts', () => {
  return clientTsProject.src()
                        .pipe(sourcemaps.init())
                        .pipe(clientTsProject())
                        .js
                        //.pipe(uglify())
                        .pipe(sourcemaps.write('.'))
                        .pipe(gulp.dest('client/dist'));
});

// This task can be run alone with "gulp serverscripts"
gulp.task('serverscripts', () => {
  return serverTsProject.src()
                        .pipe(sourcemaps.init())
                        .pipe(serverTsProject())
                        .js
                        //.pipe(uglify())
                        .pipe(sourcemaps.write('.'))
                        .pipe(gulp.dest('server/dist'));
});

gulp.task('server-tests', () => {
  gulp.src('server/dist/**/*spec.js')
    .pipe(mocha(/*{reporter: 'nyan'}*/))
});

/* client tasks */

gulp.task('build-client', ['clientscripts', 'client-copy-static']);

gulp.task('clean-client-distr', function () {
  return gulp.src('./client/dist/*', {
          read: false
      })
      .pipe(clean({
          force: true
      }));
});

gulp.task('client-copy-static', function () {
  return gulp.src(['./client/src/**/*.html', './client/src/**/*.css', './client/src/favicon.ico'
      ])
      .pipe(gulp.dest('./client/dist/'));
});

gulp.task('client-concat-js', function () {
  return gulp.src(["./client/dist/**/*.js"])
      .pipe(sourcemaps.init())
        .pipe(concat({
            "target": "bundle.js", // Name to concatenate to 
            "entry": "./main.js" // Entrypoint for the application, main module 
                                 // The `./` part is important! The path is relative to 
                                 // whatever gulp decides is the base-path, in this 
                                 // example that is `./lib` 
        }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("client/dist"));
});
