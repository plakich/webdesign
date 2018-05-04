//middlewares

var Userpage = require("../models/userpage");
var Comment = require("../models/comment");
var Photo = require("../models/photo");

var middlewareObj = {
    
    isLoggedIn: function(req, res, next)
    {
        if( req.isAuthenticated() )
        {
            return next(); //call next middleware
        }
        
        res.redirect("/login" + "?msg=" + "Please login first");
    },
    checkUserpageOwnership: function(req, res, next)
    {
        if(req.isAuthenticated())
        {
            Userpage.findById(req.params.id, function(err, userpage){
                if(err || !userpage) //if error or no user page with id exists
                {
                    res.redirect("back");
                }
                else
                { //does user own this userpage?
                    //basically, this is checking if the id of the userpage found (that was received when this route was accesed) 
                    //matches the currently logged in user's id (req.user._id), if so they can edit userpage because it's theirs
                    if( userpage.owner.id.equals(req.user._id)) //equals here is mongoose method since userpage.author.id is mongoose object and user._id is string
                    {                                                  //so we need a method to compare them; can't use === 
                        next();
                    }
                    else
                    {
                        
                        res.redirect("back");
                    }
                    
                }
            });
        }
        else
        {
            res.redirect("back");
        }
    },
    checkCommentOwnership: function(req, res, next) 
    {
        if(req.isAuthenticated())
        {
            Comment.findById(req.params.comment_id, function(err, comment)
            {
                if(err || !comment)
                {
                    res.redirect("back");
                }
                else
                { //does user own comment?
                    //basically, we're checking if the id of the coment found (that was received when this route was accesed) 
                    //matches the currently logged in user's id (req.user._id), if so they can edit comment because it's their's
                    if(comment.owner.id.equals(req.user._id)) //equals here is mongoose method since comment.owner.id is mongoose object and user._id is string
                    {                                                  //so we need a method to compare them; can't use === 
                        next();                                        //passport is the one that stores id in req.user
                    }
                    else
                    {
                        res.redirect("back");
                    }
                    
                }
            });
        }
        else
        {
            res.redirect("back");
        }
        
    },
    checkPhotoOwnership: function(req, res, next) 
    {
        if(req.isAuthenticated())
        {
            Photo.findById(req.params.photo_id, function(err, photo)
            {
                if(err || !photo)
                {
                    res.redirect("back");
                }
                else
                { //does user own photo?
                    //basically, we're checking if the id of the photo found (that was received when this route was accesed thru req.params..) 
                    //matches the currently logged in user's id (req.user._id), if so they can edit photo because it's their's
                    if(photo.owner.id.equals(req.user._id)) //equals here is mongoose method since photo.owner.id is mongoose object and user._id is string
                    {                                                  //so we need a method to compare them; can't use === 
                        next();                                        //passport is the one that stores id in req.user
                    }
                    else
                    {
                        res.redirect("back");
                    }
                    
                }
            });
        }
        else
        {
            res.redirect("back");
        }
        
    }
}

module.exports = middlewareObj;