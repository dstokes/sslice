var through = require('through');

module.exports = slice;

function slice(begin, end) {
  var index = 0
    , buffer = [];

  if(typeof end === 'undefined') end = Infinity;
  var maxBuf = Math.abs(begin < 0 ? begin : (end || 0));

  return through(function(data) {
    var afterStart = (index >= begin)
      , beforeEnd  = (index < end);
    index++;

    if(begin < 0) {
      if(buffer.length >= maxBuf) {
        buffer.shift();
      }
      buffer.push(data);
      return;
    }

    if(afterStart) {
      if(end < 0) {
        if(buffer.length > maxBuf) {
          this.queue(buffer.shift());
        }
        buffer.push(data);
      } else {
        if(beforeEnd) {
          this.queue(data);
        }
      }
    }
  },
  function() {
    if(begin >= 0) {
      buffer.splice(-maxBuf);
    }
    while(buffer.length) {
      this.queue(buffer.shift());
    }
    this.queue(null);
  });
}
