class Log {
    constructor(options) {
        for (let key in options) {
            this[key] = options[key];
        }
    }

    debug(message) {
        if (["debug"].indexOf(this.severity) !== -1) this.log("DEBUG", message);
    }

    info(message) {
        if (["debug", "info"].indexOf(this.severity) !== -1)
            this.log("INFO", message);
    }

    warn(message) {
        if (["debug", "info", "warn"].indexOf(this.severity) !== -1)
            this.log("WARN", message);
    }

    error(message) {
        if (["debug", "info", "warn", "error"].indexOf(this.severity) !== -1)
            this.log("ERROR", message);
    }

    log(severity, message) {
        console.log(`${severity}: ${this.path}: ${message}`);
    }
}

module.exports = Log;
