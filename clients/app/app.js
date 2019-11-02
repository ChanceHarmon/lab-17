'use strict';

const events = require('../../events');
const fileManager = require('./fileManager');
const socket = require('socket.io-client');
const API_URL = 'http://localhost:3000';
const connection = socket.connect(API_URL);

events.on('file-created', fileManager.readFile);
events.on('file-read', fileManager.changeCase);
events.on('file-edited', fileManager.writeFile);
events.on('file-saved', message => generalConnection.emit('file-saved', message));
events.on('error', error => generalConnection.emit('error', error));
connection.on('message', message => console.log('Message:', message));
connection.on('file-saved', message => console.log('File Saved:', message));
connection.on('error', message => console.log('Server Error:', message));

fileManager.initFile();