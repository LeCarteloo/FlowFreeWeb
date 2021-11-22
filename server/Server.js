const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
// app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static('client'));

// Run when client connects
io.on('connection', socket => {
  console.log('Client connected');

  // Emit message to client that connects
  socket.emit('message', 'Test message');

  // Broadcast message to everyone except client that connected
  socket.broadcast.emit('message', `Client ${socket.id} connected`);

  // Runs when client disconnects
  socket.on('disconnect', () => {
  // Emit message to all connected clients
    io.emit('message',`Client ${socket.id} disconnected`);
  });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () =>
console.log(`Server listening on port ${PORT}`));
