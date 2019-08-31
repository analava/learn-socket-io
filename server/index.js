const express = require('express');
const app = express();
const socketIo = require('socket.io');
const http = require('http');
const server = http.createServer(app);

const io= module.exports.io = socketIo(server);
const socketManager = require('./SocketManager');
io.on('connection',socketManager);

const PORT = process.env.PORT || 3231



server.listen(PORT, () => {
    console.log("Connected to port:" + PORT);
})