//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

let posts = [];

const homeStartingContent = "Welcome to my blog!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const blogSchema = {
  title: String,
  post: String
};

const Blog = mongoose.model("Blog", blogSchema);


app.get("/", async function(req, res){
  await Blog.find().then(function(blogs){
    res.render("home", {homeContent: homeStartingContent, posts: blogs});
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.get("/posts", function(req, res){
  res.redirect("/");
});

app.get("/posts/:post", async function(req, res){
  let paramstitle = _.lowerCase(req.params.post);
  let flag = false;
  await Blog.find().then(function(blogs){
    blogs.forEach(function(blog){
      let dbBlogtitle = _.lowerCase(blog.title);
      if(dbBlogtitle == paramstitle) {
        flag = true;
        res.render("post", {title: blog.title, post: blog.post});
      };
    });
  })
  if(!flag) {
    res.send(`404! No ${req.params.post} blog found :(`);
  }
});



app.post("/", function(req, res){
  let title = req.body.title;
  let post = req.body.postContent;
  if(post.title === "" || post.post === "") {
    res.redirect("/compose");
  } 
  const blog = new Blog({
    title: title,
    post: post
  });
  blog.save();
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
