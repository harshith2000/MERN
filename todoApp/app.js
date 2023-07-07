const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todoDB", {useNewUrlParser: true});

const itemSchema = {
  name: String
};

const Item = mongoose.model("Item", itemSchema);


const listSchema = {
  name: String, 
  items: [itemSchema]
};

const List = mongoose.model("List", listSchema);


app.get("/", async function(req, res){
  const day = date.getDate();
  await Item.find().then(function(items){
    res.render("list", {listTitle: day, todolist: items});
  });
});

app.get("/:customListName", async function(req, res){
  const customListName = _.capitalize(req.params.customListName);
  await List.findOne({name: customListName}).then(function(foundlist){
    if(!foundlist){
      const list = new List({
        name: customListName,
        items: []
      });
      list.save();
      res.redirect(`/${customListName}`);
    } else {
      res.render("list", {listTitle: customListName, todolist: foundlist.items});
    }
  });
})

app.post("/", async function(req, res){
  let newtodo = req.body.newtodo;
  let listName = req.body.typeOfList;
  if(newtodo === ""){
    res.redirect("/");
  } else {
    const item = new Item({
      name: newtodo
    });
    if(listName === date.getDate()){
      item.save();
      res.redirect("/");
    } else{
      await List.findOne({name: listName})
      .then(function(foundList){
        foundList.items.push(item);
        foundList.save();
        res.redirect("/" + listName);
      })
   }
  }
});


app.post("/delete", async function(req, res) {
  const checkedItem = req.body.checkbox;
  const listName = req.body.listName;
  if(listName === date.getDate()){
    await Item.findByIdAndRemove(checkedItem).then(function(){
      console.log("Deleted");
    });
    res.redirect("/");
  } else {
    await List.findOneAndUpdate({name: listName},{$pull : {items :{_id: checkedItem}}})
    .then(function(foundList, err){
      console.error(err);
      if(foundList){
        res.redirect("/" + listName);
      }
    });
  }
});



app.listen(3000,function(){
  console.log("Server started at port 3000");
})