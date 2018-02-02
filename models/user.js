var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
   username: String,
   password: String,
   isAdmin: false,
   hasProfile: false
});

UserSchema.plugin(passportLocalMongoose); //for authenticate, serialize and deserialze methods 
                                          //needed for passport. 

module.exports= mongoose.model("User", UserSchema); 
