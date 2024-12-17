//Handlers for socket.io
const connect = require('./connect');
const manageCollab = require('./manageCollab');
const message = require('./message');
const notification = require('./notification');
module.exports = io => {
    io.on("connection", socket => {
        connect(io,socket);
        message(io,socket);
        notification(io,socket);
        manageCollab(io,socket);
        socket.on("disconnect", () => {
        });
    });
};