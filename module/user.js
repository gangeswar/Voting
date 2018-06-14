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
        error: "user already exist"
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
        password : req.body.password
      });
      user.save().then(
          res.status(200).json({message :"successfully created"})
      ).catch(err => {
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
      res.status(200).json({
         message:{
        _id:doc._id,
        email_id:doc.email_id,
        user_name:doc.user_name,
        isadmin:doc.isadmin
      }
      });
    }).catch(err =>{
      res.status(500).json({error:"user does not exist"})
    });
});

router.put('/:user_id',(req, res, next) =>{
  const id = req.params.user_id;
  User.find({_id: id}).exec().then(doc =>{
    if(doc.user_id == id)
    {
      User.findByIdAndUpdate({_id: id},req.body).then(doc1 =>{
        console.log(doc1);
        res.status(200).json(doc1);
    }).catch(err =>{
      res.status(500).json({error:"user does not exist"})
    });
  }
  else{
      res.status(500).json({error:"Current password can't same"});
    }
  }).catch(err =>{
    res.status(500).json({error:"user does not exist"})
  });
});


router.delete('/:user_id',(req, res, next) =>{
    const id = req.params.user_id;
    User.remove({_id: id}).exec().then(doc =>{
        res.status(200).json({message:"user deleted"});
    }).catch(err =>{
      res.status(500).json({error:err})
    });
});


router.post('/login', (req, res, next) =>{

  User.find().then(doc=> { doc.map(user=>{
  if((user.email_id==req.body.email_id) && (user.password==req.body.password) )
    {
      if(user.isadmin)
      {
          res.status(200).json({message:user._id});
        }
      else{
        res.status(200).json({message:user._id});
      }
    }
  }).catch(
  res.status(500).json({error:"Invalid user"})
);
})
});

module.exports = router;
