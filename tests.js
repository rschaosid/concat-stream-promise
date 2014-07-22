var concat = require('./');
var vows = require('vows');
var assert = require('assert');

vows.describe('concat-stream-promise')

.addBatch({
  'A concat instance': {
    topic: concat(),
    'should be a Writable Stream': function(instance) {
      assert.instanceOf(instance.write, Function);
    },
    'should be a thenable': function(instance) {
      assert.instanceOf(instance.then, Function);
    }
  },
})

.run();
