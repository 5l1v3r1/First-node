var http = require("http");
var port = 80;
var url = require("url");
var l = require("./logger.js");

// function to startup the server
function start_server(route) {
	// handle some request
	function requesthandle(request, response) {
		// log request with headers as metadata
		l.logger.info(request.connection.remoteAddress + ":" + request.method + ":" + request.url + ":" + request.httpVersion);
		l.logger.info(request.headers);
		// send requested path to router.js
	    var pathname = url.parse(request.url).pathname;
	    route(pathname, response);
	}
	// create server
	http.createServer(requesthandle).listen(port);
	l.logger.info("Server started @ " + Date())
	l.logger.info("Listing on port " + port)
}

exports.start_server = start_server
