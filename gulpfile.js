const gulp = require('gulp');
const fs = require('fs');
const { argv } = require('yargs');
const run = require('gulp-run-command').default;

const landName = argv.name;

function checkLandingExist(name) {
  const { readdirSync } = fs;
  const landsNames = readdirSync('src/landings/');
  return landsNames.some(dirName => dirName === name);
}
const isExists = checkLandingExist(landName);

if (!landName || !isExists) {
  throw new Error(` 
    -------------------------------------------
    1) Must have arg: (--name=land_name)
    2) land with this name=${landName} dont exists
    -------------------------------------------`);
}

/*
  Tasks for prod
*/
gulp.task('webpack:prod', run(`webpack --env.LAND_NAME=${argv.name} --config webpack.prod.js`));
gulp.task('webpack:server-run', ['webpack:prod'], run(`PORT=80 node src/landings/${argv.name}/dist/server.bundle.js`));
gulp.task('build', ['webpack:prod']);
gulp.task('bulid:run', ['webpack:server-run']);

/*
  Tasks for dev
*/
gulp.task('dev', run(`webpack-dev-server --env.LAND_NAME=${argv.name} --config webpack.dev.js --open`));

