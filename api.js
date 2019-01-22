const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const models = require('./models');
const dbConnection = require('./dbconnection');

var server = require('./server')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

let Chats = models.ChatsModel;

// Connect to the database
dbConnection.Connect();
server.init();

app.post("/chats", async (req, res) => {
    try {
        let chat = new Chats(req.body);
        await chat.save();
        res.sendStatus(202).send(chat._id);
        io.emit("chat", req.body);
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
});

// Post request on chats endpoind with ID parameter
app.post("/chats/:id", async (req, res) => {
    try {
        let chatsFound;
        let chat = Chats.find({_id: req.params.id}, (error, chats) => {
            chatsFound = chats;
        });
        if(chat){
            // We found a chat with the supplied ID
            let user1 = search(chatsFound.user1ID, connections);
            let user2 = search(chatsFound.user2ID, connections);
            // Are both users currently online?
            if( user1 && user2 ){
                // Then broadcast the message over sockets
                socket.broadcast.to(user1.socketID).emit('chat', req.body);
                socket.broadcast.to(user2.socketID).emit('chat', req.body);
            }
        }
        await Chats.findByIdAndUpdate(
            req.params.id,
            req.body,
            (err, chat) => {
                if(err) return res.status(500).send(err);
                return res.send(chat);
            }
        )
    } catch (error) {
        res.sendStatus(500)
        console.error(error)
    }
});

app.get("/chats", (req, res) => {
    Chats.find({}, (error, chats) => {
        res.send(chats)
    });
});

app.get("/chats/:id", (req, res) => {
    Chats.find({ _id: req.params.id}, (error, chats) => {
        console.log(req.params.id);
        console.log(chats);
        res.sendStatus(202).send(chats);
        res.send(chats)
    });
});

app.delete("/chats/:id", (req, res) => {
    Chats.deleteOne({ _id: req.params.id}, (error, chats) => {
        if(error){
            return res.status(error.statusCode).send({
                message: res.statusCode
            }); 
        }
        return res.status(202);
    });
});

process.on('exit', () => {
    dbConnection.Disconnect();
});

function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
}

