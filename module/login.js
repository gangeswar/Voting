const express = require("express");

const router = express.Router();

const Login = require("../model/loginSchema")

router.get('/',(req, res, next) =>{
    res.status(200).json({
      message:"login work"
    });
});

router.post('/',(req, res, next) =>{
  
});

router.get('/:user_id',(req, res, next) =>{
    var id = req.params.user_id;
    if(id==1)
    {
    res.status(200).json({
      message:"login success"
    });
  }
  else {
      res.status(200).json({
        message:"not a valid user"
      });
  }
});

module.exports = router;
