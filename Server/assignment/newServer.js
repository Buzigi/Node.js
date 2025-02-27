const http = require('http');
const port = 3000;

const routes = require('./newRoutes');

const server = http.createServer(routes);

server.listen(port);
