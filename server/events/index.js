//Handlers for socket.io
module.exports = io => {
    io.on("connection", socket => {
        console.log(`A user connected ${socket.id}`);
    });
};