const request = require('request');

const LOGS_ENDPOINT = "https://logs.rhom.io/logs";
const LOG_POST_INTERVAL = 5000;

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

class Log {
    constructor(options) {
        for (let key in options) {
            this[key] = options[key];
        }

        this.queued = [];

        setInterval(() => {
            this.post();
        }, LOG_POST_INTERVAL);
    }

    clone(id) {
        return new Log({
            id,
            severity: this.severity
        });
    }

    debug(message) {
        if (['debug'].indexOf(this.severity) !== -1)
            this.log('DEBUG', message);
    }

    info(message) {
        if (['debug','info'].indexOf(this.severity) !== -1)
            this.log('INFO', message);
    }

    warn(message) {
        if (['debug','info','warn'].indexOf(this.severity) !== -1)
            this.log('WARN', message);
    }

    error(message) {
        if (['debug', 'info', 'warn', 'error'].indexOf(this.severity) !== -1)
            this.log('ERROR', message);
    }

    log(severity, message) {
        console.log(`${new Date().toISOString()}: ${severity}: ${this.id}: ${message}`);
        this.queue({
            severity,
            tier: process.env.LOG_TIER,
            source: this.source,
            log: message,
            timestamp: Date.now()
        });
    }

    queue(event) {
        event.tags = buildPathTags(this.path);
        event.tags.push(`source:${this.source}`);

        this.queued.push(event);
    }

    post() {
        if (this.queued.length === 0) return;

        request.post(LOGS_ENDPOINT, {
            body: {
                logs: this.queued
            },
            json: true
        }, err => {
            if (err) console.log(err);
        });

        this.queued = [];
    }
}

module.exports = Log;
