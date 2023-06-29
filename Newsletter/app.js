const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  let firstName = req.body.fName;
  let lastName = req.body.lName;
  let emailID = req.body.emailid;
  console.log(firstName);
  console.log(lastName);
  console.log(emailID);
});

app.listen(3000, function(){
  console.log("server is running on port 3000");
});


// 3e1c1894c4118d5dfb1ba10585792ae9-us21

// 7eb3a42aa9