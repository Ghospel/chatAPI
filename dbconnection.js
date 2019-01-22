const mongoose = require("mongoose");
const conString = "mongodb://test:YLn4YG543GbrTn6@ds145923.mlab.com:45923/huizingdb";

function Connect(){
    mongoose.connect(conString, {useNewUrlParser: true}, (err) => {
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