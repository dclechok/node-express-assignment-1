const express = require("express");
const validateZip = require("./middleware/validateZip");
const getZoos = require("./utils/getZoos");

const app = express();

app.get("/", (req, res, next) => {
  //home
  res.send("Home");
});

app.get("/check/:zip", validateZip, (req, res, next) => {
  const zip = req.params.zip;
  res.send(`${zip} exists in our records.`);
});

app.get("/zoos/:zip", validateZip, (req, res, next) => {
  const zip = req.params.zip;
  const zoosInZip = getZoos(zip).join("; ");
  res.send(`${zip} zoos: ${zoosInZip}`);
});

app.get("/zoos/all", (req, res) => {
  const admin = req.query.admin;
  res.send(admin);
});

app.use((err, req, res, next) => {
  res.send("That route could not be found!");
});

module.exports = app;
