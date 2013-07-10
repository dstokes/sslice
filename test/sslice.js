var fs = require('fs')
  , slice = require('../')
  , assert = require('assert')
  , through = require('through');

var chunks = 'the things are being tested'.split(' ')
  , slices = [ [1], [-2], [1, 2], [1, 4], [0, -3] ]
  , aslice = Array.prototype.slice;

function test(slice, result) {
  var output = [];
  slice.pipe(through(
    function(data) { output.push(data); },
    function() {
      output = output.join(' ');
      assert(output === result, 'Expected: "' + result + '", Got: "' + output + '"');
    }
  ));
  for(var i = 0; i < chunks.length; i++) slice.write(chunks[i]);
  slice.end();
}

// test passing cases
for(var i = 0; i < slices.length; i++) {
  test(
    slice.apply(slice, slices[i]),
    aslice.apply(chunks, slices[i]).join(' ')
  );
}

// test failure case
assert.throws(function() {
  test(slice(0, 1), 'the things')
});
