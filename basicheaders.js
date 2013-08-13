
// basic response layout
function basic_resp(response, code, message) {
	response.writeHead(code, {"Content-Type": "text/plain"});
    response.write(message + "\n");  
    response.end();  
    return; 
}

function basic_404(response) {
	basic_resp(response, 404, "404 Not Found");
}

function basic_500(response, error) {  
    basic_resp(response, 500, error);  
}

exports.basic_404 = basic_404;
exports.basic_500 = basic_500;
