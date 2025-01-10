const net = require('node:net');
const readline = require('readline/promises');

const PORT = 4020;
const HOST = '18.140.54.250';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let id;

const clearLine = (dir) => {
  return new Promise((resolve, rejects) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, rejects) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

//create TCP client
const socket = net.createConnection({ host: HOST, port: PORT }, async () => {
  console.log('Connected to the server');

  const ask = async () => {
    const message = await rl.question('Enter a message >');
    //move the cursor one line up
    await moveCursor(0, -1);
    //clear the cursor line that the cursor is in
    await clearLine(0);
    socket.write(`${id}-message-${message}`);
  };

  ask();

  socket.on('data', async (data) => {
    //log an empty line
    console.log();

    //move the cursor one line up
    await moveCursor(0, -1);

    //clear the current line that cursor just moved into
    await clearLine(0);

    if (data.toString('utf-8').substring(0, 2) === 'id') {
      //when we are getting the id...
      //everthing from the third character up until the end
      id = data.toString('utf-8').substring(3);

      console.log(`Your id is ${id}!\n`);
    } else {
      //when we are getting the message
      console.log(data.toString('utf-8'));
    }

    ask();
  });
});

socket.on('end', () => {
  console.log('Connection was ended');
});
