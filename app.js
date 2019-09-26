const http = require('http');

const hostname = '127.0.0.1'; // This is localhost
const port = process.env.PORT || 3000; // This is a node convention

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});