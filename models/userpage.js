var mongoose = require("mongoose");

var userpageSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
   /*Owner: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }*/
});

module.exports = mongoose.model("Userpage", userpageSchema); 