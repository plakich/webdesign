var express = require("express");
var router = express.Router();
var User = require("../models/user"); 


// ROOT Route 
router.get("/", function(req, res){
   res.render("home"); 
});

//==================
//AUTH Routes
//==================

module.exports = router; 