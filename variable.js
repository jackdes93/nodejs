// const http = require('http');
//
// const hostname = '127.0.0.1';
// const port = 3000;
//
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World!');
// });
//
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

var state = "ONF";

switch (state) {
  case 'ON':
    console.log(`Lamp is ${state}`);
    break;
    case 'OFF':
    console.log(`Lamp is ${state}`);
  default:
  console.log(`Lamp isn't available`);

}
