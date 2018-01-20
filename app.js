var express = require("express");
var app = express(); 
var request = require("request"); 
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res){
   res.send("Hello"); 
});

//listener
app.listen(process.env.PORT,process.env.IP,function(){
   console.log("The Server Has Started!"); 
});