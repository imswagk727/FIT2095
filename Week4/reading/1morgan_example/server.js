let express = require('express');
let morgan = require('morgan');
let app = express();
app.use(morgan('short')); // can be common or tiny or short
app.get('/', function (req, res) {
    res.send('Hello from FIT2095 server!')
});
app.listen(8080);

// let express = require("express");
// let app = express();
// app.use(function (req, res, next) {
//   req.timestamp = new Date().toISOString();
//   next();
// });