const express = require("express");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
var cors = require('cors');

const user = require("./module/User");
const home = require("./module/Home");
const product = require("./module/Product");
const config = require("./config.json")

const app = express();

app.use(morgan("dev"));
app.use(cors());

mongoose.connect(config.mongo.dbconnect, { useNewUrlParser: true });

app.use(bodyparser.json());

app.use('/api/user', user);
app.use('/api/product', product);
app.use('/api/image', home);


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
