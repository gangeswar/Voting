const express = require("express");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const user = require("./module/user");
const question = require("./module/questions");
const option = require("./module/options");

const app = express();

app.use(morgan("dev"));


mongoose.connect('mongodb://127.0.0.1/my_database',{
  useMongoClient : true
});

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use('/api/user',user);
app.use('/api/question',question);
app.use('/api/option',option);
app.use('/api',option);


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origins", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if(req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH");
        return res.status(200).json({});
    }
    next();
})


app.use((req, res, next) =>{
  const error = new Error("404:page not found");
  error.status=404;
  next(error);
});

app.use((error, req, res, next) =>{
  res.status(error.status || 500);
  res.json({
      error:{
          message:error.message
      }
  });
});


module.exports = app
