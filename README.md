sslice
======

[![Build Status](https://travis-ci.org/dstokes/sslice.png)](https://travis-ci.org/dstokes/sslice)

Slice streams with ease. This was originally created for use with [split](http://github.com/dominictarr/split) but
should work with any stream buffer delimiter.

``` js
var sslice = require('sslice')
  , split  = require('split')
  , fs     = require('fs');
  
// pipe all but the first and last line of a file to stdout
fs.createReadStream(somefile)
  .pipe(split())
  .pipe(sslice(1, -1)
  .pipe(process.stdout)
```

install
=======

With [npm](http://npmjs.org) do:

```
npm install sslice
```
