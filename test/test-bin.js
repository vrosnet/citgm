'use strict';

var path = require('path');

var test = require('tap').test;

var spawn = require('../lib/spawn');

var citgmPath = path.resolve(__dirname, '..', 'bin', 'citgm');

test('bin: omg-i-pass /w tap output', function (t) {
  t.plan(1);
  var proc = spawn(citgmPath, ['omg-i-pass', '-t']);
  proc.on('error', function(err) {
    t.error(err);
    t.fail('we should not get an error testing omg-i-pass');
  });
  proc.on('close', function (code) {
    t.ok(code === 0, 'omg-i-pass should pass and exit with a code of zero');
  });
});

test('bin: omg-i-fail /w markdown output /w nodedir', function (t) {
  t.plan(1);
  var proc = spawn(citgmPath, ['omg-i-fail', '-m', '-d', '/dev/null']);
  proc.on('error', function(err) {
    t.error(err);
    t.fail('we should not get an error testing omg-i-pass');
  });
  proc.on('close', function (code) {
    t.equal(code, 1, 'omg-i-fail should fail and exit with a code of one');
  });
});

test('bin: no module /w root check', function (t) {
  t.plan(1);
  var proc = spawn(citgmPath, ['-s']);
  proc.on('error', function(err) {
    t.error(err);
    t.fail('we should not get an error');
  });
  proc.on('close', function (code) {
    t.equal(code, 0, 'we should exit with a code of 0');
  });
});