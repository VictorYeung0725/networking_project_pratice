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
  const clientId = clients.length + 1;

  //Broadcasting a message to everyone when someone enter the chat room
  clients.map((client) => {
    client.socket.write(`User ${clientId} Joined!`);
  });

  socket.write(`id-${clientId}`);

  socket.on('data', (data) => {
    const dataString = data.toString('utf-8');
    const id = dataString.substring(0, dataString.indexOf('-'));
    const message = dataString.substring(dataString.indexOf('-message-') + 9);

    clients.map((client) => {
      client.socket.write(`User ${id}: ${message}`);
    });
  });

  //Broadcasting a message to everyone when someone leaves the chat room
  socket.on('end', () => {
    handleClientLeave();
  });

  socket.on('error', () => {
    handleClientLeave();
  });

  const handleClientLeave = () => {
    clients.map((client) => {
      client.socket.write(`User ${clientId} left!`);
    });
  };
  clients.push({ id: clientId.toString(), socket });
});

server.listen(3008, '127.0.0.1', () => {
  console.log('Open server on', server.address());
});
