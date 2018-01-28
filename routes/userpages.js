var express = require("express");
var router = express.Router();
var Userpage = require("../models/userpage");

//======================
//USERPAGES ROUTES
//======================

//INDEX Route

router.get("/", function(req, res){
    Userpage.find({}, function(err, allUserpages){
       if(err)
       {
           console.log(err);
       }
       else
       {
           res.render("userpages/index", {userpages: allUserpages, page: "userpages" }); //get rid of currentuser later and put in app.js
       }
    });
});

//CREATE Route 

router.post("/", function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   /*var author = {
       id: req.user._id,
       username: req.user.username
   }*/
   
       var newUserpage = {name: name, image: image, description: description};
   
       // Create a new campground and save to DB
       Userpage.create(newUserpage, function(err, newlyCreated){
           if(err)
           {
               console.log(err);
           }
           else
           {
               console.log(newlyCreated);
               res.redirect("/userpages"); 
           }
        });
});

//NEW Route 

router.get("/new", function(req, res) {
   res.render("userpages/new"); 
});


//SHOW Route 

router.get("/:id", function(req, res) {
    Userpage.findById(req.params.id, function(err, foundUserpage){
       if(err || !foundUserpage)
       {
           console.log(err);
           res.redirect("back");
       }
       else
       {
           res.render("userpages/show", {userpage:foundUserpage});
       }
    });
});

module.exports = router;