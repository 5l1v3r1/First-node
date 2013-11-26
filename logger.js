winston = require("winston");

// log for valid requests
var validlogger = new (winston.Logger)({ transports: [ new (winston.transports.File)({ filename: 'log/weblog.log' }) ] });

// log for requests to nonvalid domains
var bullog = new (winston.Logger)({ transports: [ new (winston.transports.File)({ filename: 'log/bull.log' }) ] });

// log for errors
var errlog = new (winston.Logger)({ transports: [ new (winston.transports.File)({ filename: 'log/errors.log' }) ] });


exports.validlogger = validlogger;
exports.bullog = bullog;
exports.errlog = errlog;
