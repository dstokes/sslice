var fs = require('fs')
  , slice = require('../')
  , split = require('split')
  , assert = require('assert')
  , through = require('through');

var file = __dirname + '/data';

function test(slice, result) {
  var count = 0
    , output = [];
  fs.createReadStream(file)
    .pipe(split())
    .pipe(slice)
    .pipe(through(function(data) {
      output.push(data);
    }, function() {
      assert(output.join(' ') === result);
    }));
}

test(slice(1,2), 'things');
test(slice(1,3), 'things are');
test(slice(0,-3), 'the things');
