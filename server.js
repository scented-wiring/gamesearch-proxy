require("dotenv").config();
const express = require("express");
const request = require("request");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("", (req, res) => {
  res.send("Running");
});

app.get("/games", (req, res) => {
  res.send("Test");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
