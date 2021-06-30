const express = require("express");
const validateZip = require("./middleware/validateZip");
const getZoos = require("./utils/getZoos");

const app = express();

app.get("/", (req, res, next) => {
  //home
  res.send("Home");
});

const checkZoo = (req, res, next) => {
  //router-leve middleware
  //check zip code in records
  const zip = req.params.zip;
  if (!getZoos(zip) || zip.length != 5) {
    res.send(`${zip} does not exist in our records.`);
  } else if (getZoos(zip).length < 1) {
    res.send(`${zip} has no zoos.`);
  } else {
    next();
  }
};

app.get("/check/:zip", checkZoo, (req, res, next) => {
  const zip = req.params.zip;
  res.send(`${zip} exists in our records.`);
});

app.get("/zoos/:zip", checkZoo, (req, res, next) => {
  const zip = req.params.zip;
  const zoosInZip = getZoos(zip).join("; ");
  res.send(`${zip} zoos: ${zoosInZip}`);
});

app.get("/zoos/all", (req, res) => {
  const admin = req.query.admin;
  res.send(admin);
});

app.use((err, req, res, next) => {
  res.send(err);
});

module.exports = app;
