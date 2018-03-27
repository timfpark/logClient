class Log {
    constructor(path) {
        this.path = path;
    }

    debug(message) {
        if (["debug"].indexOf(process.env.LOG_SEVERITY) !== -1)
            this.log("DEBUG", message);
    }

    info(message) {
        if (["debug", "info"].indexOf(process.env.LOG_SEVERITY) !== -1)
            this.log("INFO", message);
    }

    warn(message) {
        if (["debug", "info", "warn"].indexOf(process.env.LOG_SEVERITY) !== -1)
            this.log("WARN", message);
    }

    error(message) {
        if (
            ["debug", "info", "warn", "error"].indexOf(
                process.env.LOG_SEVERITY
            ) !== -1
        )
            this.log("ERROR", message);
    }

    log(severity, message) {
        console.log(`${severity}: ${this.path}: ${message}`);
    }
}

module.exports = Log;
