const http = require("http");

const PORT = 3000;

const server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write("Hello World");
    res.end();
});

server.listen(PORT, () => {
    console.log("Connected to Server at port", PORT);
});
