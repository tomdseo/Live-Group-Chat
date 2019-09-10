//................................................Express Setup
const express = require("express");
const socket = require("socket.io");
const app = express();
// app.use(express.static(__dirname + "/public"));

const server = app.listen(1337, () => console.log("suhhh dude 1337"));

//.................................................Socket Setup
const io = socket(server);

io.on('connection', function(socket) { //..................................2
    socket.emit('greeting', {msg: 'Greetings, from server Node, brought to you by Sockets! -Server',}); //..........3
    socket.on('thankyou', function(data) { //........................7
        console.log(data.msg); //.......................8
    });

    //......................................Listen for Events
    socket.on("chat", function(data) {
        io.sockets.emit("chat", data); //.............Emit Event
    });

    socket.on("typing", function(data) {
        socket.broadcast.emit("typing", data); //.............Emit Event
    });
});

//.................................................EJS Setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/static"));

//.................................................Routes Setup
app.get('/', (req, res) => {
    res.render('index');
});