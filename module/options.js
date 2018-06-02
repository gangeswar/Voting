const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Options = require('../model/optionsSchema');

router.get('/',(req, res, next) => {
    Options.find().then(doc=>{
        res.status(200).json(doc);
    }).catch(err =>{
      res.status(500).json({error:err})
    });
});


router.post('/',(req, res, next) => {
  Options.find({option: req.body.option}).then(opt=>{
    if(opt.length >= 1)
    {
      return res.status(409).json({
        message: "option already exist"
      })
    }
    else{
        const options = new Options({
        _id : new mongoose.Types.ObjectId(),
        question_id : req.body.question_id,
        option : req.body.option
      });
      options.save().then( doc=> {
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
    Options.findById(id).exec().then(doc =>{
      res.status(200).json(doc);
    }).catch(err =>{
      res.status(500).json({error:"option does not exist"})
    });
});

router.delete('/:user_id',(req, res, next) =>{
    const id = req.params.user_id;
    Options.remove({_id: id}).exec().then(doc =>{
      res.status(200).json({message: "is delete"});
    }).catch(err =>{
      res.status(500).json({error:"option does not exist for delete operation"})
    });
});



module.exports = router;
