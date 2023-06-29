const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

let todos = [];
let workTodo = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function(req, res){
  const day = date.getDate();
  res.render("list", {listTitle: day, todolist: todos});
});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work list", todolist: workTodo});
});

app.post("/", function(req, res){
  let newtodo = req.body.newtodo;
  if(req.body.typeOfList === "Work list"){
    workTodo.push(newtodo);
    res.redirect("/work");
  } else {
    todos.push(newtodo);
    res.redirect("/");
  }
});


app.post("/delete", function(req, res) {
  const checkedItemId = req.body.checkbox;
  if(workTodo.includes(checkedItemId)){
    workTodo.splice(checkedItemId,1);
  } else if(todos.includes(checkedItemId)) {
    todos.splice(checkedItemId,1);
  }
});

app.get("/about", function(req, res){
  res.render("about");
});



app.listen(3000,function(){
  console.log("Server started at port 3000");
})