const express = require("express");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
var cors = require('cors');

const user = require("./module/User");
const question = require("./module/Questions");
const option = require("./module/Options");

const app = express();

app.use(morgan("dev"));
app.use(cors());

mongoose.connect('mongodb://127.0.0.1/my_database', {
  useMongoClient: true
});

app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());

app.use('/api/user', user);
app.use('/api/question', question);
app.use('/api', option);


app.use((req, res, next) => {
  const error = new Error("404:page not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


module.exports = app
