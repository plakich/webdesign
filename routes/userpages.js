var express = require("express");
var router = express.Router();
var Userpage = require("../models/userpage");

//======================
//USERPAGES ROUTES
//======================

//INDEX Route

router.get("/", function(req, res){
    res.send("You are here!");
    
});

//CREATE Route 

router.post("/", function(req, res){
       res.send("You are here!");
});

//NEW Route 

router.get("/new", function(req, res) {
   res.render("userpages/new"); 
});


//SHOW Route 

router.get("/:id", function(req, res) {
    res.send("You are here!");
});

module.exports = router;