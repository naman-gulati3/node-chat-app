var socket = io();
socket.on('connect',function(){
console.log('connected to server');
socket.emit('createmsg',{
    from:'Naman',
text:'hello sickboi'
});
});
socket.on('disconnect',function(){
console.log('disconnected from server');
});
socket.on('newmessage',function (){
console.log('new message');
});
