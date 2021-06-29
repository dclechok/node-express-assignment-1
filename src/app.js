const express = require("express");
// const morgan = require('morgan');

const app = express();

// app.use(morgan('dev'));

app.get('/', (req, res, next) => {
    console.log('home');
});

app.get('/check/:zip', (req, res, next) => {
    const zipcode = req.params.zip;
    console.log(zipcode);
});

module.exports = app;