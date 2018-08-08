var socket = io();

function scrolltobottom(){
  var messages = jQuery('#messages');
  var newmessages=messages.children('li:last-child')
var clientheight = messages.prop('clientHeight');
var scrollTop = messages.prop('scrollTop');
var scrollHeight = messages.prop('scrolltHeight');
var newmessageheight = newmessages.innerHeight();
var lastmessageheight = newmessages.prev().innerHeight();


if(clientheight+scrollTop+newmessageheight+lastmessageheight>=scrollHeight)
{
  messages.scrollTop(scrollHeight);
}
}
socket.on('connect', function () {
  var params = jQuery.deparam(window.location.search);
  socket.emit('join',params,function(err){
if(err){
  alert(err);
window.location.href='/';
}else{
console.log('no error');
}
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});
socket.on('updateuserlist',function(users){
var ul = jQuery('<ol></ol>');
users.forEach(function(user){
ul.append(jQuery('<li></li>').text(user));
});
jQuery('#users').html(ul);
});


socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{
  text:message.text,
  from:message.from,
  createdAt:formattedTime
  });
  jQuery('#messages').append(html);
  scrolltobottom();

//   var li = jQuery('<li></li>');
//   li.text(`${message.from} ${formattedTime}: ${message.text}`);

//   jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template,{
from: message.from,
createdAt:formattedTime,
url:message.url
  });
 
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
  jQuery('#messages').append(html);
  scrolltobottom();
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
var messagetextbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    
  text: messagetextbox.val()
  }, function () {
messagetextbox.val('')
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

locationButton.attr('disabled','disabled');
  navigator.geolocation.getCurrentPosition(function (position) {
      locationButton.removeAttr('disabled');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled');
    alert('Unable to fetch location.');
    
  });
});
