const express = require("express");
const bodyParser= require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  let n1 = Number(req.body.num1);
  let n2 = Number(req.body.num2);
  let result = n1+n2;
  res.send("The result is :" + result);
});


app.get("/bmicalculator", function(req, res){
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", function(req, res){
  let w = parseFloat(req.body.weight);
  let h = parseFloat(req.body.height);
  let result = w/(h*h);
  console.log(result);
  res.send("Your BMI is :" + result.toString());
});

app.listen(3000, function(){
  console.log("Server started at port 3000!");
});