var express = require("express");
var router = express.Router({mergeParams: true}); //the merge params obj is so we can access :id from route, else it doesn't get passed to comments.js from app.js
var Userpage = require("../models/userpage");
var Photo = require("../models/photo");
var middleware = require("../middleware");

//================
//Photoblog Routes
//================

//INDEX ROUTE

router.get("/", function(req, res) 
{
    Photo.find({}, function(err, photos)
    {
        if(err)
        {
            console.log(err);
        }
        else //render view to display all photos
        {
            res.render("photos/index", {photos: photos});
        }
    });
    
});

module.exports = router; 