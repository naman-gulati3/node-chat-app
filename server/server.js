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
    console.log('new user connected');
    socket.emit('newmessage',{
        from:'John',
        text:'hello naman sup?',
        createdAt:321
});
socket.on('createmsg',(message)=>{
    console.log('createmsg',message);

    });
  
   
  
    socket.on('disconnect',function(){
console.log('user disconnected');
    });

    });


server.listen(port,function(){
console.log(`server is up on port ${port}`);
});