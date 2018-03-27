"use strict";

const assert = require("assert"),
    Log = require("../log.js");

let log = new Log({
    severity: "info",
    source: "testService",
    path: "test/path"
});

describe("log client", function() {
    it("can create log", function(done) {
        log.info("Hello world!");
        log.debug("Not printed!");

        done();
    });
});
