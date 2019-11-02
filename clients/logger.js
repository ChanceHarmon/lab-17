'use strict';

const socket = require('socket.io-client');
const API_URL = 'http://localhost:3000';

const logConnection = socket.connect(`${API_URL}/log`);

logConnection.on('message', message => console.log(message));
logConnection.on('file-saved', message => console.log(message));
logConnection.on('error', message => console.log(message));