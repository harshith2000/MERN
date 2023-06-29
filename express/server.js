import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello there!");
});

app.get("/contact", (req, res) => {
  res.send("I'm currently out of town!");
});

app.get("/about", (req, res) => {
  res.send("You know me!");
});

app.listen(3000, () => {
  console.log("server started at 3000");
})