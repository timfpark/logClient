"use strict";

const assert = require("assert"),
    Log = require("../log"),
    log = new Log("test/path");

describe("log client", function() {
    it("can create log", function(done) {
        log.info("Hello world!");
        log.debug("Not printed!");

        done();
    });
});
