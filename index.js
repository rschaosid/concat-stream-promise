var Promise = require('promise');
var Writable = require('stream').Writable;

module.exports = function() {
  var chunks = [];
  
  // then/promise doesn't have defer() so we have to go the long way
  var done, error;
  var that = new Promise(function(resolve, reject) {
    done = resolve;
    error = reject;
  });
  
  // "Parasitic" inheritance from Writable
  for(method in Writable.prototype) {
    that[method] = Writable.prototype[method];
  }
  
  // the Writable constructor checks instanceof, so we have to work around it
  var oldProto = that.__proto__; // this is probably Promise.prototype or something
  that.__proto__ = Writable.prototype;
  Writable.call(that, { decodeStrings: false });
  that.__proto__ = oldProto; // I feel so dirty
  
  that._write = function(chunk, enc, cb) {
    chunks.push(chunk);
    process.nextTick(cb);
  };
  
  that.on('finish', function() {
    done(Buffer.concat(chunks));
    chunks = null; // try not to take up too much memory
  });
  
  that.on('error', error);
  
  return that;
};
