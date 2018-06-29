const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const port = process.env.PORT || 3000;
var publicpath = path.join(__dirname + '/../public');
console.log(publicpath);
var app = express();
var server = http.createServer(app)
var io = socketio(server);
app.use(express.static(publicpath));
io.on('connection',(socket)=>{
    socket.on('disconnect',()=>{
console.log('user disconnected');
    });
console.log('new user connected');
});
server.listen(port,()=>{
console.log(`server is up on port ${port}`);
});