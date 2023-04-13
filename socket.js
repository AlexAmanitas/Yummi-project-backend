const { Server } = require('socket.io');
const { createServer } = require('https');

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', socket => {
  console.log('Socket Conection');
});

module.exports = io;
