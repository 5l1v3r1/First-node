var server = require("./server");
var router = require("./router");

server.start_server(router.route);