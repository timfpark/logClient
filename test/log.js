"use strict"

const assert = require('assert'),
      Log = require('../log.js')

let log = new Log('testService', 'test/path');

describe('log client', function() {
    it('can create log', function(done) {
        log.info('Hello world!');

        // wait for log to be sent.
        setTimeout(done, 6000);
    });
});