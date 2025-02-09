//Handlers for socket.io
const connect = require('./connect');
const manageCollab = require('./manageCollab');
const message = require('./message');
const notification = require('./notification');
const Chats = require('./Chats');
module.exports = (io) => {
  io.on('connection', (socket) => {
    connect(io, socket);
    message(io, socket);
    notification(io, socket);
    manageCollab(io, socket);
    Chats(io, socket);
    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });
  io.engine.on('connection_error', (err) => {
    console.log(err.req); // the request object
    console.log(err.code); // the error code, for example 1
    console.log(err.message); // the error message, for example "Session ID unknown"
    console.log(err.context); // some additional error context
  });
};
