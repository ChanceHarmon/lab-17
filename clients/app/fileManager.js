'use strict';

const fse = require('fs-extra');
const events = require('../../events');

module.exports = {};

module.exports.initFile = () => {
  let file = null;
  if (process.argv.slice(2).shift()) {
    file = process.argv.slice(2).shift();
    events.emit('file-created', file);
  } else events.emit('error', 'Error creating file');
};

module.exports.readFile = (file) => {
  return fse.readFile(file)
    .then(fileData => {
      events.emit('file-read', file, fileData);
    })
    .catch(error => {
      events.emit('error', error);
    });
};

module.exports.changeCase = (file, fileData) => {
  let unBuffered = fileData.toString().toUpperCase();
  let edit = Buffer.from(unBuffered);
  events.emit('file-edited', file, edit);
};

module.exports.writeFile = (file, edit) => {
  return fse.writeFile(file, edit)
    .then(() => {
      events.emit('file-saved', 'File saved.');
    })
    .catch(error => {
      events.emit('error', error);
    });
};