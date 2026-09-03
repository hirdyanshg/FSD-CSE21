// practice routing using http module
import http from "http";

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });

    if (req.url === "/") {
        res.end("<h1>Hello, World!</h1>");
    }
    else if (req.url === "/about") {
        res.end("<h2>About Us</h2>");
    }
    else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 - Page Not Found</h1>");
    }
});

server.listen(3001, () => {
    console.log("Server working on 3001");
});