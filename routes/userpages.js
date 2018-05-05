var express = require("express");
var router = express.Router();
var Userpage = require("../models/userpage");
var middleware = require("../middleware"); //automatically requires file since it's named index.js

//======================
//USERPAGES ROUTES
//======================

//INDEX Route

router.get("/", function(req, res)
{
    var noResults = null;
    
    if(req.query.search) //if user searched for profile
    {
        const namePattern = new RegExp(escapeRegex(req.query.search), 'gi');

        Userpage.find({name: namePattern}, function(err, userpages) //get and show userpages (plural) that match search
        {
           if(err)
           {
               console.log(err);
           }
           else
           {
               if(userpages < 1)
               {
                   noResults = "No userpages found that match your search. Please search again."
                   
               }
               res.render("userpages/index", {userpages: userpages, page: "userpages", noResults: noResults }); 
           }
        });
    }
    else //just display all userpages
    {
        Userpage.find({}, function(err, userpages)
        {
           if(err)
           {
               console.log(err);
           }
           else
           {
               res.render("userpages/index", {userpages: userpages, page: "userpages", noResults: noResults }); 
           }
        });
    }
    
});

//CREATE Route 

router.post("/", middleware.isLoggedIn, function(req, res)
{
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
       Userpage.create(newUserpage, function(err, newlyCreated)
       {
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

router.get("/new", middleware.isLoggedIn, function(req, res) 
{
   res.render("userpages/new"); 
});


//SHOW Route 

router.get("/:id", function(req, res) 
{
    Userpage.findById(req.params.id).populate("comments").exec(function(err, userpage) //get and show a userpage (singular)
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

router.put("/:id", middleware.checkUserpageOwnership, function(req, res)
{         //req.body.userpage is obj from views/userpage/edit.ejs 
  
    var newData = {name: req.body.userpage.name, image: req.body.userpage.image, description: req.body.userpage.description};
    Userpage.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, userpage)
    {
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/userpages/" + userpage._id);
        }
    });
  
   
});

//DESTROY Route
router.delete("/:id", middleware.checkUserpageOwnership, function(req, res)
{
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

//used for search in index route
//used to prevent ddos attacks by replacing escape chars with substring
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;