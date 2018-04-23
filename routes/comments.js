var express = require("express");
var router = express.Router({mergeParams: true}); //the merge params obj is so we can access :id from route, else it doesn't get passed to comments.js from app.js
var Userpage = require("../models/userpage");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//========================
//COMMENTS ROUTES
//========================

//CREATE ROUTE

router.post("/", middleware.isLoggedIn, function(req, res) 
{
    
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
             console.log(comment);
             if(err)
             {
                 console.log(err);
             }
             else
             {
                 //add username and id to comment
                 comment.owner.id = req.user._id;
                 comment.owner.username = req.user.username;
                 comment.text = comment.text.trim(); //trim newlines and spaces so comment box area is of manageable size
                 //save comment
                 comment.save();
                 userpage.comments.push(comment._id); //each userpage has comments arrary (see userpage.js) and this pushes new comment from the create into the array
                 userpage.save();

                 
                 console.log(comment);
                 console.log('\n');
                 console.log(userpage);
                 
                 if(req.xhr)
                 {
                     res.json(comment);
                 }
                 else //shouldn't ever make it here
                 {
                     res.redirect("/userpages/" + userpage._id);

                 }
                 
             }
           });
         }
     });
    
});

//EDIT ROUTE
router.get("/:comment_id/edit", function(req, res) 
{
    Userpage.findById(req.params.id, function(err, userpage)
    {
        if(err || !userpage)
        {
            res.redirect("back");
        }
        else
        {
            Comment.findById(req.params.comment_id, function(err, comment)
            {
                if(err)
                {
                    res.redirect("back");
                }
                else
                {
                    res.render("comments/edit", {userpage: userpage, comment: comment});
                }
            });
        }
    });
});

module.exports = router;