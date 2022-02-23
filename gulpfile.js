'use strict';

var http = require('http'),
  st = require('st'),
  exec = require('child_process').exec,
    log = require('fancy-log'),
  clear = require('clear'),
  counter = 0;

const c = require('ansi-colors');
const { series } = require('gulp');
const { watch } = require('gulp');

var cmd = 'elm make ./src/Main.elm --output ./bundle.js';
clear();

function watchFiles(cb) {
  watch('src/**/*.elm', elm(cb));
}

function server(done) {
  log(c.blue('Starting server at http://localhost:4000'));
  http.createServer(
      st({
        path: __dirname,
        index: 'index.html',
        cache: false
      })
  ).listen(4000, done);
}

function elm(cb) {
  if (counter > 0){
    clear();
  }
  exec(cmd, function(err, stdout, stderr) {
    if (err){
      log(c.red('elm make: '),c.red(stderr));
    } else {
      log(c.green('elm make: '), c.green(stdout));
    }
    cb();
  });
  counter++;
}

exports.default = series(server, watchFiles, elm);
