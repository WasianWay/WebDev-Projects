var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var friends =[
  "Tony", "Peter", "Marc", "Laura", "Polly", "George", "Mary"
];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req,res){
  res.render("home");
});

app.get("/friends", function(req,res)
{
  res.render("friends", {friends: friends});
});

app.post("/addFriend", function(req, res)
{
  var newFriend = req.body.newFriend;
  friends.push(newFriend);
  res.redirect("/friends");
});

app.listen(3000, function()
{
  console.log("Server Online");
});
