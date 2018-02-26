var express = require("express");
var router = express.Router({mergeParams: true}); //the merge params obj is so we can access :id from route, else it doesn't get passed to comments.js from app.js
var Userpage = require("../models/userpage");
var Comment = require("../models/comment");

//========================
//COMMENTS ROUTES
//========================

//CREATE ROUTE

router.post("/", function(req, res) 
{
    console.log('here');
     Userpage.findById(req.params.id, function(err, userpage) 
     {
       if(err)
       {
           console.log(err);
           res.redirect("/userpages");
       }
       else
       {
          Comment.create(req.body.comment, function(err, comment)
          {
             if(err)
             {
                 console.log(err);
             }
             else
             {
                 //add username and id to comment
                 comment.author.id = req.user._id;
                 comment.author.username = req.user.username; 
                 //save comment
                 comment.save(); 
                 userpage.comments.push(comment); //each userpage has comments arrary (see userpage.js) and this pushes new comment from the create into the array
                 userpage.save();
                 console.log(comment);
                 
                 if(req.xhr)
                 {
                     res.json(comment);
                 }
                 else 
                 {
                     res.redirect("/userpages/" + userpage._id);

                 }
                 
             }
           });
        }
     });
    
});

module.exports = router;