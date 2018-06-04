const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const router = express.Router();

const User = require('../model/userSchema');

router.get('/',(req, res, next) => {
    User.find().then(doc=>{
        res.status(200).json(doc);
    }).catch(err =>{
      res.status(500).json({error:err})
    });
});

router.post('/',(req, res, next) => {
  User.find({email_id: req.body.email_id}).then(user=>{
    console.log(user.length);
    if(user.length >= 1)
    {
      return res.status(409).json({
        message: "email_id already exist"
      })
    }
    else{
        bcrypt.hash(req.body.password, 10, (err, hash)=>
        {
        if(err)
        {
          return res.status(500).json({error:err});
        }
        else{
        const user = new User({
        _id : new mongoose.Types.ObjectId(),
        email_id : req.body.email_id,
        user_name : req.body.user_name,
        password : hash
      });
      user.save().then( doc=> {
        res.status(201).json(doc)
      }).catch(err => {
        res.status(500).json({error:err
      })
    });
    }
  });
  }
  });
});

router.get('/:user_id',(req, res, next) =>{
    const id = req.params.user_id;
    User.findById(id).exec().then(doc =>{
      res.status(200).json(doc);
    }).catch(err =>{
      res.status(500).json({error:"user does not exist"})
    });
});

router.put('/:user_id',(req, res, next) =>{
  const id = req.params.user_id;
  User.findByIdAndUpdate({_id: id},req.body).exec().then(doc =>{
    User.findOne({_id: id}).then(doc =>{
      res.status(200).json(doc);
    });
  }).catch(err =>{
    res.status(500).json({error:"user does not exist"})
  });
});


router.delete('/:user_id',(req, res, next) =>{
    const id = req.params.user_id;
    User.remove({_id: id}).exec().then(doc =>{
        res.status(200).json({message:"deleted"});
    }).catch(err =>{
      res.status(500).json({error:err})
    });
});


router.post('/login', (req, res, next) =>{
  User.find().then(doc=>{
    for (var i of doc)
    {
      if(i.user_name==req.body.user_name)
      {
        if(i.password ==req.body.password)
        {
          res.status(200).json({message:"successfully login"});
        }
      }
    }
  }).catch(err =>{
        res.status(500).json({error:"not a valid user"});
  });
});

module.exports = router;
