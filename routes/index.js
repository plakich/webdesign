var express = require("express");
var router = express.Router();
var User = require("../models/user"); 
var passport = require("passport");


// ROOT Route 
router.get("/", function(req, res)
{
   res.render("home"); 
});

router.get("/about", function(req, res) 
{
    res.render("about");
    
})
//AUTH Routes

router.get("/register", function(req, res)
{

    res.render("register");
});

router.post("/register", function(req, res)
{
    var newUser = new User({username: req.body.username, isAdmin: false, hasProfile: false});
    User.register(newUser, req.body.password, function(err, user) //register() takes care of hash/salt for password
    { 
        if(err)
        {
            console.log(err); 
            var msg = err.message;
            return res.render("register", {msg: msg, pass: req.body.password}); //pass in obj so fields don't get reset on view reload
        }
        
        passport.authenticate("local")(req, res, function()
        {
           res.redirect("/userpages"); 
        });
    });  
});

router.get("/login", function(req, res)
{
   var errors; 
   
   if ( req.session.messages )
   {
        errors = "Invalid username or password";
   }
   req.session.messages = undefined;
   
   res.render("login", { loginErrors: errors });

});

router.post("/login", passport.authenticate("local", 
{
    successRedirect: "/userpages",
    failureRedirect: "/login",
    failureMessage: "Invalid username or password" 
    
}), function(req, res)
{
    //emtpy
});

router.get("/logout", function(req, res) 
{
   req.logout(); 
   res.redirect("/userpages"); 
});

module.exports = router; 