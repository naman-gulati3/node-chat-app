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
    socket.on('createmsg',(message)=>{
        console.log('createmsg',message);
        io.emit('newmessage',{
            from:message.from,
            text:message.text
            });
            socket.emit('newmessage',{
from:'Admin',
text:'Welcome to the chat app'
            });
            socket.broadcast.emit('newmessage',{
from:'Admin',
text:'new user has joined'
            });
        // socket.broadcast.emit('newmessage',{
        //     from:message.from,
        //   text:message.text,
        //   createdAt : new Date().getHours()
        // });
        });

   
  
    socket.on('disconnect',function(){
console.log('user disconnected');
    });

    });


server.listen(port,function(){
console.log(`server is up on port ${port}`);
});