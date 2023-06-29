const express = require("express");
const bodyParser= require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
  const cityName = req.body.cityName;
  const apikey = "6daaac2be53fe8579433bea8bd5a7b0c";
  const units = "metric"; 
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + apike + "&units=" + units;
  console.log(url);
  https.get(url, function(response){
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const weatherDescription = weatherData.weather[0].description;
      res.write('<head><meta charset="utf-8"></head>');
      res.write("Description: " + weatherDescription);
      res.write("Temperature: " + weatherData.main.temp);
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write('<img src="' + imageURL + '">');
      res.send();
    })
  })
});


app.listen(3000, () => {
  console.log("Server started at port 3000"); 
})

