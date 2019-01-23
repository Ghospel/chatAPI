require('dotenv').config();
const mongoose = require("mongoose");

function Connect(){
    mongoose.connect(process.env.DB, {useNewUrlParser: true}, (err) => {
    if(err){
            throw(err);
        }
        console.log("Database connection established")
    });
}

function Disconnect(){
    mongoose.disconnect();
}

module.exports.Connect = Connect;
module.exports.Disconnect = Disconnect;