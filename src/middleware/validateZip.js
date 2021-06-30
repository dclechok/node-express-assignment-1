const getZoos = require("../utils/getZoos");

//router-leve middleware
//check zip code in records

function validateZip(req, res, next) {
  let zip = req.params.zip;
  const aZip = Number(zip);
  if (zip.length != 5 || isNaN(aZip)) res.send(`Zip (${zip}) is invalid!`);
  if (!getZoos(zip)) {
    res.send(`${zip} does not exist in our records.`);
  } else if (getZoos(zip).length < 1) {
    res.send(`${zip} has no zoos.`);
  } else {
    next();
  }
}

module.exports = validateZip;
