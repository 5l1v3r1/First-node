var http = require("http");
var port = 80;
var url = require("url");
var l = require("./logger.js");
var fs = require("fs");



// domain config
var domains = new Array();
domains["graa"]="graa";
domains["sterf"]="sterf";

var fingernow = "";	// fingerprint voor ip + agent
var lastfinger = "";	// fingerprint voor ip + agent

// function to startup the server
function start_server(route) {
	// handle some request
	function requesthandle(request, response) {

		// send requested path to router.js
	    var pathname = url.parse(request.url).pathname;

	    // do we want timelog? we want timelog
	    var d = new Date();
	    timelog = d.getHours() + ':' + d.getMinutes();
	    datelog = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() + '-' + timelog;    

	    try {
			requested_host = request.headers.host.split(".");		// security note: requested_host can be anything
	    	domain = requested_host[requested_host.length - 2];
	    	if (domain in domains) {	// check if domain is valid
	    		domain = domains[domain];
	    		// aww we got a request, let's see if we can get the user agent and save users fingerprint (ip + agent)
	    		ua = request.headers['user-agent'] != 'undefined' ? '\t\t[' + request.headers['user-agent'].substring(request.headers['user-agent'].lastIndexOf(' ')+1) + ']' : '';
	    		fingernow = request.connection.remoteAddress + ua;

	    		// nice console log
	    		if (lastfinger == fingernow)	process.stdout.write('.');
	    		else {
	    			console.log('\n[' + timelog + ']\t[' + domain + ']\t[' + request.connection.remoteAddress + ']\t[' + request.method + ' ' + request.url + ']');
	    			process.stdout.write(ua + '\t');
	    			lastfinger = fingernow;
	    		}

	    		// route to domain
	    		route(pathname, domain, response);

	    		// log as real request
	    		l.validlogger.info(datelog + request.connection.remoteAddress + ":" + request.method + ":" + request.url + ":" + request.httpVersion);
	    		l.validlogger.info(request.headers);
	    	}
	    	else {
	    		// log as random bull
	    		l.bullog.info(datelog + request.connection.remoteAddress + ":" + request.method + ":" + request.url + ":" + request.httpVersion);
	    		l.bullog.info(request.headers);

	    		route('404', null, response);
	    	}

		}
 		catch(err) {
 			// log as error
	    	l.errlog.info(datelog + request.connection.remoteAddress + ":" + request.method + ":" + request.url + ":" + request.httpVersion);
	    	l.errlog.info(request.headers);
			route('404', null, response);
		}
	    
	}
	// create server
	http.createServer(requesthandle).listen(port);
	l.validlogger.info("Server started @ " + Date());
	l.validlogger.info("Listing on port " + port);
	console.log("Online @ " + Date());
}

exports.start_server = start_server;
