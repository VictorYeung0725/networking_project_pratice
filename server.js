import net from 'node:net';

const server = net.createServer();

server.listen(3008, '127.0.0.1', () => {
  console.log('Open server on', server.address);
});
