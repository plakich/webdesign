var express = require("express");
var app = express(),
    request = require("request"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"), 
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    session = require("express-session"),
    User = require("./models/user"),
    methodOverride = require("method-override");
    
    
    
//requiring routes
var userpageRoutes = require("./routes/userpages"),
    indexRoutes = require("./routes/index"),
    commentRoutes = require("./routes/comments"),
    photoRoutes = require("./routes/photos");


mongoose.connect("mongodb://localhost/over_hyped");


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method")); //for PUT and DELETE requests

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
app.use("/userpages/:id/comments", commentRoutes);
app.use("/userpages/:id/photos", photoRoutes);

//listener
app.listen(process.env.PORT,process.env.IP,function(){
   console.log("The Server Has Started!"); 
});