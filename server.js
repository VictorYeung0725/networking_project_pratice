const net = require('node:net');

const server = net.createServer();

server.on('connection', (socket) => {
  console.log('A new connection to the server');

  socket.write('Welcome to the server!\n');
  console.log(socket);

  socket.on('data', (data) => {
    console.log('Received data:', data.toString());
  });
});

server.listen(3008, '127.0.0.1', () => {
  console.log('Open server on', server.address());
});
