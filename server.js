const net = require('net');
const fs = require('node:fs/promises');

const server = net.createServer(() => {
  console.log('server created');
});

let filehandle, fileStream;

server.on('connection', (socket) => {
  console.log('New Connection!');

  socket.on('data', async (data) => {
    filehandle = await fs.open(`storage/text.txt`, 'w');
    fileStream = filehandle.createWriteStream();

    //Writing to our destination file
    fileStream.write(data);
  });

  socket.on('end', () => {
    console.log('Connection ended');
    filehandle.close();
  });
});

server.listen(5050, '::1', () => {
  console.log('Uploader server opened on', server.address());
});
