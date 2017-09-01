'use strict'

const request = require('request');

const LOGS_ENDPOINT = "https://logs.rhom.io/logs";
const LOG_POST_INTERVAL = 5000;

let queuedLogs = [];

function buildPathTags(path) {
    let pathTags = [];
    let currentPath = "";
    let pathParts = path.split('/');
    let prefix = "";

    pathParts.forEach(pathPart => {
        currentPath += prefix + pathPart;
        prefix = "/";
        pathTags.push(`path:${currentPath}`);
    });

    return pathTags;
}

function queueLog(severity, source, path, log) {
    let tags = buildPathTags(path);
    tags.push(`source:${source}`);

    let logObject = {
        severity,
        tags,
        log,
        timestamp: Date.now()
    };

    console.log(`${severity}: ${path}: ${log}`);
    queuedLogs.push(logObject);
}

function postLogs() {
    if (queuedLogs.length === 0) return;

    request.post(LOGS_ENDPOINT, {
        body: {
            logs: queuedLogs
        },
        json: true
    });

    queuedLogs = [];
}

setInterval(postLogs, LOG_POST_INTERVAL);

module.exports = function(source, path) {
    return {
        debug: function(log) { queueLog('debug', source, path, log); },
        error: function(log) { queueLog('error', source, path, log); },
        info:  function(log) { queueLog('info', source, path, log); },
        warn:  function(log) { queueLog('warn', source, path, log); },

        stream: {
            write: function(log, encoding) {
                queueLog('info', source, path, log);
            }
        }
    };
};
