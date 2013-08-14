winston = require("winston");

// log to console and to weblog.log
var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: 'log/weblog.log' })
	]
});


exports.logger = logger;