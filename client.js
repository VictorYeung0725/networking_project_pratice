const { rejects } = require('node:assert');
const net = require('node:net');
const { resolve } = require('node:path');
const readline = require('readline/promises');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (dir) => {
  return new Promise((resolve, rejects) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

//create TCP client
const socket = net.createConnection(
  { host: '127.0.0.1', port: 3008 },
  async () => {
    console.log('Connected to the server');

    const ask = async () => {
      const message = await rl.question('Enter a message >');
      //clear the current line that the cursor is in
      await clearLine(0);
      socket.write(message);
    };

    ask();
  }
);

socket.on('data', (data) => {
  console.log(data.toString('utf-8'));
});
socket.on('end', () => {
  console.log('Connection was ended');
});
