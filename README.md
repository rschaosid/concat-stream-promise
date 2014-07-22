concat-stream-promise
=====================

promise version of [concat-stream](https://www.npmjs.org/package/concat-stream).

usage
-----

```js
var concat = require('concat-stream-promise');
var foo = require('fs').createReadStream('foo');

foo.pipe(concat()).then(function(buffer) {
  console.log(buffer.toString('utf8'));
}).done();
```

`concat()` returns a [promise](https://www.npmjs.org/package/promise) that is also a Writable Stream. When the stream ends, the promise is resolved with a buffer.

'encoding' stuff
----------------

Don't write strings to it. It won't encode them; it'll just throw.

options
-------

This space intentionally left blank.

No, seriously, there aren't any.

contributing
------------

This is about as simple as a module can get, but there are some things missing:
* Tests (I got started with [vows](https://www.npmjs.org/package/vows))
* Testing in non-0.10 Node
* A better way of doing multiple inheritance between Promise and Writable: currently we have to use `__proto__`, so it won't work in the browser.
