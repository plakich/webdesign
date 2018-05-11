var express = require("express");
var router = express.Router({mergeParams: true}); //the merge params obj is so we can access :id from route, else it doesn't get passed to photos.js from app.js
var Userpage = require("../models/userpage");
var Photo = require("../models/photo");
var middleware = require("../middleware");

//================
//Photoblog Routes
//================

//INDEX ROUTE

router.get("/", function(req, res) 
{
    //have to use Userpage because userpage model contains array of photos (i.e., the photoblog itself)
    Userpage.findById(req.params.id).populate("photos").exec(function(err, userpage)
    {
        if(err)
        {
            console.log(err);
        }
        else //render view to display all photos
        {
            res.render("photos/index", {userpage: userpage});
        }
    });
    
});

router.get("/new", middleware.isLoggedIn, middleware.checkUserpageOwnership, function(req, res)
{
   Userpage.findById(req.params.id, function(err, userpage)
   {
       if(err)
       {
           console.log(err);
       }
       else
       {
           res.render("photos/new", {userpage: userpage});
       }
   });
});

router.post("/", middleware.isLoggedIn, middleware.checkUserpageOwnership, function(req, res)
{
    Userpage.findById(req.params.id, function(err, userpage)
    {
        if(err || !userpage)
        {
            res.redirect("back");
        }
        else
        {
            Photo.create(req.body.photo, function(err, photo)
            {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                     photo.owner.id = userpage._id; //make sure user islogged in before post photo
                     photo.owner.name = userpage.name;
                     //save photo
                     photo.save();
                     userpage.photos.push(photo._id); //each userpage has photos arrary (see userpage.js) and this pushes new photo from the create into the array
                     userpage.save();
    
                     
                     console.log(photo);
                     console.log('\n\n');
                     console.log(userpage);
                     
                     res.redirect("/userpages/" + userpage._id + "/photos");
                }
            });
        }
    });
});

//EDIT ROUTE
router.get("/:photo_id/edit", middleware.checkUserpageOwnership, function(req, res) 
{
    Userpage.findById(req.params.id, function(err, userpage)
    {
        if(err || !userpage)
        {
            res.redirect("back");
        }
        else
        {
            Photo.findById(req.params.photo_id, function(err, photo)
            {
                if(err)
                {
                    res.redirect("back");
                }
                else
                {
                    res.render("photos/edit", {userpage: userpage, photo: photo});
                }
            });
        }
    });
});

//COMMENT UPDATE ROUTE
router.put("/:photo_id", middleware.checkUserpageOwnership, function(req, res) 
{
    Photo.findByIdAndUpdate(req.params.photo_id, req.body.photo, function(err, photo) //..AndUpdate(photo id to replace, what to replace it with, callback)
    {
        if(err)
        {
            res.redirect("back");
        }
        else //redirect back to userpage show page
        {
            res.redirect("/userpages/" + req.params.id + "/photos");
        }
    });
});

//DESTROY/DELETE ROUTE
router.delete("/:photo_id", middleware.checkUserpageOwnership, function(req, res)
{
    Photo.findByIdAndRemove(req.params.photo_id, function(err)
    {
       if(err)
       {
           console.log(err);
           res.redirect("back");
       }
       else
       {
           res.redirect("/userpages/" + req.params.id + "/photos");
       }
    });
    
});

module.exports = router; 