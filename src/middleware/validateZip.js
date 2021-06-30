const getZoos = require("../utils/getZoos");

  //router-leve middleware
  //check zip code in records

function validateZip(req, res, next) {
    const zip = req.params.zip;
  if (!getZoos(zip) || zip.length != 5) {
      console.log('hello');
    res.send(`${zip} does not exist in our records.`);
  } else if (getZoos(zip).length < 1) {
    res.send(`${zip} has no zoos.`);
  } else {
    next();
  }
}

module.exports = validateZip;
