'use strict';

let gulp = require('gulp');
let uglify = require('gulp-uglify');
let ts = require('gulp-typescript');
let sourcemaps = require('gulp-sourcemaps');
let mocha = require('gulp-mocha');

let serverTsProject = ts.createProject('tsconfig.json');

// These tasks will be run when you just type "gulp"
gulp.task('default', [ 'serverscripts', 'server-tests' ]);

// By adding this, we can run "gulp watch" to automatically
// run the build when we change a script
gulp.task('watch', () => {
  gulp.watch('src/**/*.ts', [ 'serverscripts', 'server-tests' ]);
});

// This task can be run alone with "gulp serverscripts"
gulp.task('serverscripts', () => {
  return serverTsProject.src()
                        .pipe(sourcemaps.init())
                        .pipe(serverTsProject())
                        .js
                        //.pipe(uglify())
                        .pipe(sourcemaps.write('.'))
                        .pipe(gulp.dest('dist'));
});

gulp.task('server-tests', () => {
  gulp.src('dist/**/*spec.js')
    .pipe(mocha(/*{reporter: 'nyan'}*/))
});