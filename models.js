const mongoose = require("mongoose");

const Message = new mongoose.Schema({
    message: String,
    from: String,
});

const ChatSchema = new mongoose.Schema({
    user1ID: String,
    user2ID: String, 
    messages: [Message]
});

var Chats = mongoose.model("Chats", ChatSchema);

exports.ChatsModel = Chats;
exports.Message = Message;
exports.ChatSchema = ChatSchema;