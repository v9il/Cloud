const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 99999,
});
const os = require('os');
const tag = 'DEFAULT';

const clientData = {
  tag: tag,
  username: process.env.USERNAME,
  ram: Math.ceil(os.totalmem() / Math.pow(1024, 3)),
  cpu: os.cpus()[0].model,
  os: process.env.OS,
};

socket.on('connect', () => {
  socket.emit('client_join', clientData);
});

socket.on('request_data', () => {
  socket.emit('client_join', clientData);
});
