const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Signup = require('../model/signupSchema');

router.get('/',(req, res, next) => {
    Signup.find().then(doc=>{
        res.status(200).json(doc);
    }).catch(err =>{
      res.status(500).json({error:err})
    });
});


router.post('/',(req, res, next) => {
  Signup.find({email_id: req.body.email_id}).then(user=>{
    console.log(user.length);
    if(user.length >= 1)
    {
      return res.status(409).json({
        message: "email_id already exist"
      })
    }
    else{
        const signup = new Signup({
        _id : new mongoose.Types.ObjectId(),
        email_id : req.body.email_id,
        user_name : req.body.user_name,
        password : req.body.password
      });
      signup.save().then( doc=> {
        res.status(201).json(doc)
      }).catch(err => {
        res.status(500).json({error:err
      })
    });

    }
  });

});

router.get('/:user_id',(req, res, next) =>{
    const id = req.params.user_id;
    Signup.findById(id).exec().then(doc =>{
      res.status(200).json(doc);
    }).catch(err =>{
      res.status(500).json({error:"user does not exist"})
    });
});

router.delete('/:user_id',(req, res, next) =>{
    const id = req.params.user_id;
    Signup.remove({_id: id}).exec().then(doc =>{
        res.status(200).json({message:"deleted"});
    }).catch(err =>{
      res.status(500).json({error:err})
    });
});



module.exports = router;
