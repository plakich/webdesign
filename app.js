var express = require("express");
var app = express(),
    request = require("request"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"), 
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    session = require("express-session"),
    User = require("./models/user");
    
//requiring routes
var userpageRoutes = require("./routes/userpages"),
    indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/over_hyped");


app.set("view engine", "ejs");
app.use(express.static("public")); //may have to change to dirname + public and also add one for partials
app.use(bodyParser.urlencoded({extended: true}));

//Configure Passport
app.use(session({
    secret: "the biggest most secretest secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());     //see https://stackoverflow.com/questions/19268812/do-i-implement-serialize-and-deserialize-nodesjs-passport-redisstore
passport.deserializeUser(User.deserializeUser()); //3rd post for diagram of serialize and deserialize process


app.use(function(req, res, next){
    //res.locals.currentUser will now equal req.user. this is important because inside templates 
    //i.e. views, there's no access to route specific variables like req.user
    res.locals.currentUser = req.user; 
    next(); 
});


app.use("/", indexRoutes); 
app.use("/userpages", userpageRoutes);  

//listener
app.listen(process.env.PORT,process.env.IP,function(){
   console.log("The Server Has Started!"); 
});