$(document).ready(function (){
    const socket = io(); //..................................1
    socket.on('greeting', function (data) { //.......................4
        console.log(data.msg); //.........................5
        socket.emit('thankyou', { msg: 'Thank you for connecting me! -Client' }); //6
    });

    //Query DOM
    let message = document.getElementById('message');
    let handle = document.getElementById('handle');
    let btn = document.getElementById('send');
    let output = document.getElementById('output');
    let feedback = document.getElementById('feedback');

    //Emit Events
    btn.addEventListener("click", function() {
        socket.emit("chat", {
            message: message.value,
            handle: handle.value,
        });
    });
    message.addEventListener("keypress", function() {
        socket.emit("typing", handle.value); //...........emits name of person typing
    });

    //Listen for Events
    socket.on("chat", function(data) {
        feedback.innerHTML = "";
        output.innerHTML += "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
    });
    socket.on("typing", function(data) {
        feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
    });

});