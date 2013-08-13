var path 	= require("path");
var fs		= require("fs");
var basicheaders = require("./basicheaders");
var l 		= require("./logger.js");

var basedir = path.join(process.cwd(), "static");

var conversion_array = { 
	"/" : "/index.html" 
	}

// route to apropriate respondse
function route(pathname, response) {
	
	// convert default pathnames
	if (pathname in conversion_array)	pathname = conversion_array[pathname];

	// apend request to static dir
	var filename = path.resolve(path.join(process.cwd(), "static", pathname));

	// checks for evil-doers
	if (filename.substr(0, basedir.length) != basedir) {
		l.logger.warn("Directory traversal attempt");
		basicheaders.basic_404(response);
		return;
	}
 	
 	// check if file exists
    fs.exists(filename, function(exists) {  
        if(!exists) { basicheaders.basic_404(response);	return;	}

        // check if file is a file
        fs.stat(filename, function(err, stats) {
        	if (err) { basicheaders.basic_500(response, err);	return;	}
        	if (stats.isFile()) {

		        // read the file
		        fs.readFile(filename, "binary", function(err, file) {  
		            if(err) {	basicheaders.basic_500(response, err);	return;	}
		            // file exists in static dir and is not a dir
		            else {
		            	response.writeHead(200);  
		            	response.write(file, "binary");  
		            	response.end();
		            }  
		        });
        	}
        	// no directory listing
        	else {
        		basicheaders.basic_404(response);
        	}
        });
    });
}

exports.route = route;
