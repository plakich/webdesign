var mongoose = require("mongoose");

var userpageSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   owner: {
         id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
         },
         username: String
   },
   comments: [
         {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Comment"
            
         }
       ],
   photos: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Photo"
         }
      ]
   
});

module.exports = mongoose.model("Userpage", userpageSchema); 