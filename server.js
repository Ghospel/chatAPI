const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = 4001;

var connections = [];

function init(){
    io.on("connection", (socket) => {
        console.log(socket.id, " connected");
        let connection = {
            userID: 'placeholder',
            socketID: socket.id,
        }
        connections.push(connection);
    
        socket.on("disconnect", () => {
            // Remove the connection from the array
            connections.filter(connection => connection.socketID != socket.id);
        });
    });

    let server = http.listen(port, () => {
        console.log("Server listening on port ", server.address().port)
    });
}

module.exports.init = init;