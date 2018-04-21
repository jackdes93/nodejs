var http = require("http");

http.createServer(function(req, res){
  console.log("Hello World!");
  res.end("TEST");
}).listen(8888);
