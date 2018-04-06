// Import express and path modules.
var express = require("express");
var path = require("path");
// Create the express app.
var app = express();
// Define the static folder.
app.use(express.static(path.join(__dirname, "./static")));
// Setup ejs templating and define the views folder.
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// Root route to render the index.ejs view.
app.get('/', function(req, res) {
 res.render("index");
})
// Start Node server listening on port 8000.
var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  console.log("Client/socket is connected!");
  console.log("Client/socket id is: ", socket.id);
  // all the server socket code goes below

  // callback on server takes object 'data'. First parameter of socket.on() method is string that matches exactly with the name 
  // of the event emitted by server
  socket.on( "button_clicked", function (data){
    console.log( 'Someone clicked a button!  Reason: '  + data.reason);
    // emit event. First parameter is string with name of event that will be emited. This is how we define custom events.
    // Second parameter is JSON object. Socket connection allows us to pass JSON objects back and forth between client and server.
    // example of emitting event from server to client
    socket.emit( 'server_response', {response:  "sockets are the best!"});
	}) 
})