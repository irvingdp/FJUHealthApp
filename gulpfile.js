const gulp = require('gulp-help')(require('gulp'));
const runSequence = require('run-sequence');
const argv = require('yargs').argv;
const template = require('gulp-template');
const {exec} = require('child_process');

/**
 *Basic parameters
 */
const ENVIRONMENT = (argv.env || argv.e || 'dev').toLowerCase();

const attachProcessToOutput = function(process) {
    process.stdout.on("data", (data) => {
        console.log(data.toString());
    });
    process.stderr.on("data", (data) => {
        console.error(data.toString());
    });
};

gulp.task("setup", "setup for given environment, options: -e (environment)", function (cb) {
    runSequence('compile-template', cb);
});

gulp.task("compile-template", "Compile files under templates/master with given environment, options: -e (environment)", function (cb) {
    let environmentStringValues = require(`./build-resources/template/env/${ENVIRONMENT}/string.js`);
    let constantStringValues = require('./build-resources/template/env/constant.js');

    gulp.src('build-resources/template/master/**/*', {base: 'build-resources/template/master/'})
        .pipe(template(Object.assign(environmentStringValues, constantStringValues), {
            interpolate: /<%=([\s\S]+?)%>/g //Ignore ES6 syntax ${} replacement
        }))
        .pipe(gulp.dest('.'))
        .on('end', function () {
            cb();
        })
});