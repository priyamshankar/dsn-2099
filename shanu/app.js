const express = require("express");
const bodyParser = require("body-parser");
// const mongoose = require('mongoose'); right now i am not gonna setup mongoose
const ejs = require("ejs");
// const _ = require("lodash");


// Setting up our application
const app = express();

// setting up ejs
app.set('view engine', 'ejs');

// setting up bodyparser to take input from the user.
app.use(bodyParser.urlencoded({ extended: true }));

// setting up the folder public to fetch the static files.
app.use(express.static("public"));

// connection to mongoose local server 27017 with database name as digiDiaryDB
// mongoose.connect('mongodb://localhost:27017/digiDiaryDB');


// Making a schema to store the user credential, having two parts
// -> blog title
// -> blogPost, what user will write
/*
const postSchema = {
    title: String,
    content: String
};
*/

// Creating a collection model for the new schema created:
// the collection name would be => posts, here we need to input in singular format.
// we need to include the schema which is gonna be the postSchema created above.
// const Post = mongoose.model("Post", postSchema); we will use it in later stage


/********************************* */

/*
// Home Page
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

// About Page
const aboutContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

// Contact Page
const contactContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

*/
/********************************* */




app.get("/", function (req, res) {

  res.render("timeline");


  // Post.find({}, function (err, posts) 
  // {
  //   res.render("home", { startingContent: homeStartingContent, posts: posts });
  // });

});

app.get("/calendar", function(req, res){

  res.render("calendar");

});

app.get("/expenses", function(req, res){

  res.render("expenses");

});

app.get("/blog", function(req, res){

  res.render("jayant");

});


/*

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});



app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});



app.get("/compose", function (req, res) {
  res.render("compose");
});



app.post("/compose", function (req, res) {

  // stored the new post according to the postSchema 
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  // saved the post to the collections 
  post.save(function(err){
    if(!err){
      // Then redirected to the base server.
      res.redirect("/");
    }
  });

});



app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    if(!err)
    {
      res.render("post", { postTitle: post.title, postContent: post.content });
    }
  });

});

*/

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});