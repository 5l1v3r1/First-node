var http = require("http");
var port = 8888;
var url = require("url");
var l = require("./logger.js");

// function to startup the server
function start_server(route) {
	// handle some request
	function requesthandle(request, response) {
		// log request with headers as metadata
		l.logger.info(">R " + request.connection.remoteAddress + ":" + request.method + ":" + request.url + ":" + request.httpVersion + "|>H ", request.headers);
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
