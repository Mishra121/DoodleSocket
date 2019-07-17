var express = require('express'),
    http = require('http'),
    socketIo = require('socket.io');
    
var app = express();
app.use(express.static(__dirname + '/public'));

// start webserver on port 8080
var server = http.createServer(app);
var io = socketIo.listen(server);
server.listen(8080);
console.log("Server running on 127.0.0.1:8080");

// array of all lines drawn
var line_history = [];

// event-handler for new incoming connections
io.on('connection', function(socket){

   // Sending all lines drawn in history to the new user
   for(var i in line_history) {
       socket.emit('draw_line', { line: line_history[i]});
   } 

    // add handler for message type "draw_line"
   socket.on('draw_line', function(data) {
       line_history.push(data.line);
       io.emit('draw_line', { line: data.line });
   });
});

