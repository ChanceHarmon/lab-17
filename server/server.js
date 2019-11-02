'use strict';

const server = require('socket.io')(3000);
const events = require('./events');

server.on('connection', socket => {
  console.log('Server on', socket.id);
  socket.emit('message', 'Connected to server');

  socket.on('file-saved', message => {
    console.log('File Saved', message);
    events.emit('file-saved', message);
    socket.emit('file-saved', message);
  });

  socket.on('error', message => {
    console.log('Error', message);
    events.emit('error', message);
    socket.emit('error', message);
  });

  socket.on('disconnect', () => {
    console.log('Server disconnected', socket.id);
  });
});

const logger = server.of('/log');

logger.on('connection', socket => {
  console.log('Logger on', socket.id);
  socket.emit('message', 'Connected to Logger');

  events.on('message', message => socket.emit('message', `${new Date(Date.now())} Message: ${message}`));
  events.on('file-saved', message => socket.emit('file-saved', `${new Date(Date.now())} File Saved: ${message}`));
  events.on('error', message => socket.emit('error', `${new Date(Date.now())} Server Error: ${message}`));

  socket.on('disconnect', () => {
    console.log('Logger disconnected', socket.id);
  });
});