//Handlers for socket.io
const connect = require('./connect');
const message = require('./message');
module.exports = io => {
    io.on("connection", socket => {
        console.log(`A user connected ${socket.id}`);
        connect(io,socket);
        message(io,socket);
    });
};