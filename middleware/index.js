//middlewares

var Userpage = require("../models/userpage");

var middlewareObj = {
    
    isLoggedIn: function(req, res, next)
    {
        if( req.isAuthenticated() )
        {
            return next(); //call next middleware
        }
        
        res.redirect("/login" + "?msg=" + "Please login first");
    }
}

module.exports = middlewareObj;