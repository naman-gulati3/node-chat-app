const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {isrealstring} = require('./utils/validation');
var {users} = require('./utils/users');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new users();
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.on('join',(params,callback)=>{
    if(!isrealstring(params.name)||!isrealstring(params.room)){
      return callback('Name and Room name are required');
    }
    socket.join(params.room);
    users.removeuser(socket.id);
    users.addUser(socket.id,params.name,params.room);
    io.to(params.room).emit('updateuserlist',users.getuserlist(params.room));
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));


callback();
});
  socket.on('createMessage', (message, callback) => {
  var user = users.getuser(socket.id);
  if(user && isrealstring(message.text)){
    io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
  }
    
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getuser(socket.id);
    if(user){
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
    
  });

  socket.on('disconnect', () => {
    var user = users.removeuser(socket.id);
    if(user){
      io.to(user.room).emit('updateuserlist',users.getuserlist(user.room));
      io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`));
    
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
