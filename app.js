var express = require("express");
var app = express(),
    request = require("request"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"); 
    
//requiring routes
var userpageRoutes = require("./routes/userpages"),
    indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/over_hyped");


app.set("view engine", "ejs");
app.use(express.static("public")); //may have to change to dirname + public and also add one for partials
app.use(bodyParser.urlencoded({extended: true}));



app.use("/", indexRoutes); 
app.use("/userpages", userpageRoutes);  

//listener
app.listen(process.env.PORT,process.env.IP,function(){
   console.log("The Server Has Started!"); 
});