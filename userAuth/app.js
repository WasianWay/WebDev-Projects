var express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  app = express(),
  User = require("./models/user")

mongoose.connect("mongodb://localhost/userAuth", {useMongoClient: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
  secret: "Slythering Serpant",
  resave: false,
  saveUninitialized: false
}));
passport.use(new LocalStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get("/",function(req, res)
{
  res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res)
{
  res.render("secret");
});

//Auth Routes
app.get("/register", function(req, res)
{
  res.render("register");
});

app.post("/register", function(req, res)
{
  User.register(new User({username:req.body.username}), req.body.password, function(err, user)
{
  if(err){
    console.log(err);
    return res.render("register")
  }
    passport.authenticate("local")(req, res, function()
  {
    res.render("secret");
  });
})
});

//Login Routes
app.get("/login", function(req, res)
{
  res.render("login");
});
app.post("/login",passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}),function(req, res)
{

});

app.get("/logout", function(req, res)
{
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next)
{
  if(req.isAuthenticated())
  {
    return next();
  }
  res.redirect("/login");
}

app.listen(3000, function(){
  console.log("Server Running");
});
