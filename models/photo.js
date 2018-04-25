var mongoose = require("mongoose");

var photoSchema = new mongoose.Schema({
   image: String,
   description: String,
   owner: {
         id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
         },
         username: String
   }
   
});

module.exports = mongoose.model("Photo", photoSchema); 