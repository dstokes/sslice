var through = require('through');

module.exports = slice;

function slice(begin, end) {
  var index = 0
    , buffer = []
    , maxBuf = Math.abs(end || 0);

  return through(function(data) {
    if(index >= begin) {
      if(end < 0) {
        if(buffer.length > maxBuf) {
          this.queue(buffer.shift());
        }
        buffer.push(data);
      } else {
        if(typeof end === 'undefined' || index < end) {
          this.queue(data);
        }
      }
    }
    index++;
  },
  function() {
    if(!(buffer[buffer.length-1])) buffer.pop()
    while(buffer.length > maxBuf) {
      this.queue(buffer.shift());
    }
    this.queue(null);
  });
}
