const net = require('node:net');
const readline = require('readline/promises');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//create TCP client
const client = net.createConnection({ host: '127.0.0.1', port: 3008 }, () => {
  console.log('Connected to the server');

  const message = rl.question('Enter a message');
});

client.on('end', () => {
  console.log('Connection was ended');
});
