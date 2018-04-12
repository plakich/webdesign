var express = require("express");
var router = express.Router();
var Userpage = require("../models/userpage");
var middleware = require("../middleware"); //automatically requires file since it's named index.js

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
           res.render("userpages/index", {userpages: allUserpages, page: "userpages" }); 
       }
    });
});

//CREATE Route 

router.post("/", middleware.isLoggedIn, function(req, res){
   var name = req.body.name;            
   var image = req.body.image;
   var description = req.body.description;
   
   //owner can be different from name, since we 
   //leave the option open for users to name their page
   //something other than the name they use to sign up
   var owner = {
       id: req.user._id,
       username: req.user.username
   }
   
       var newUserpage = {name: name, image: image, description: description, owner: owner};
   
       // Create a new Userpage and save to DB
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

router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("userpages/new"); 
});


//SHOW Route 

router.get("/:id", function(req, res) 
{
    Userpage.findById(req.params.id).populate("comments").exec(function(err, userpage)
    {   
       if(err || !userpage)
       {
           console.log(err);
           res.redirect("back");
       }
       else
       {
           res.render("userpages/show", {userpage: userpage});
       }
    });
});

//EDIT Route

router.get("/:id/edit", middleware.checkUserpageOwnership, function(req, res)
{
    Userpage.findById(req.params.id, function(err, userpage)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("userpages/edit", {userpage: userpage});
        }
    });
    
})

//UPDATE Route

router.put("/:id", middleware.checkUserpageOwnership, function(req, res){         //req.body.userpage is obj from views/userpage/edit.ejs 
  
    var newData = {name: req.body.userpage.name, image: req.body.userpage.image, description: req.body.userpage.description};
    Userpage.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, userpage){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/userpages/" + userpage._id);
        }
    });
  
   
});

//DESTROY Route
router.delete("/:id", middleware.checkUserpageOwnership, function(req, res){
   Userpage.findByIdAndRemove(req.params.id, function(err){
       if(err)
       {
           res.redirect("/userpages");
       }
       else
       {
           res.redirect("/userpages");
       }
   });
});


module.exports = router;