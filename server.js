const net = require('node:net');

const server = net.createServer();

//socket is a endpoint A--> B
//i can have mutiple client to server
//how do i enable multiple client to communicate with each others
// create more socket ?
//NOTE  a array of client
const clients = [];

server.on('connection', (socket) => {
  console.log('A new connection to the server');

  socket.on('data', (data) => {
    clients.map((s) => {
      s.write(data);
    });
  });

  clients.push(socket);
});

server.listen(3008, '127.0.0.1', () => {
  console.log('Open server on', server.address());
});
