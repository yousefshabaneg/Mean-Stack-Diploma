const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Home Page");
});

const json = path.join(__dirname, "data.json");
app.get("/json", (req, res) => {
  res.sendFile(json);
});

const myFile = path.join(__dirname, "data.html");
app.get("/data", (req, res) => {
  res.sendFile(myFile);
});

//Static Files without routes

const staticDir = path.join(__dirname, "static");
app.use(express.static(staticDir));

app.listen(port, () => {
  console.log("http://localhost:3000");
});
