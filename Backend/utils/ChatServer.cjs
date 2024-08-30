const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for new messages from clients
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);  // Broadcast message to all clients
  });

  // Listen for typing indicator
  socket.on('typing', (user) => {
    socket.broadcast.emit('typing', user);  // Broadcast typing indicator
  });

  socket.on('stop typing', (user) => {
    socket.broadcast.emit('stop typing', user);  // Stop typing indicator
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
