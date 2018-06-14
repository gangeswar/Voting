const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Options = require('../model/optionsSchema');

router.post('/question/:question_id/option',(req, res, next) => {
  const que_id = req.params.question_id;
  Options.find( { question_id:que_id } ).exec().then(doc =>{
      Options.find({question_id:que_id, option: req.body.option }).then(opt=>{
            const options = new Options({
            _id : new mongoose.Types.ObjectId(),
            question_id : que_id,
            option : req.body.option
          });
          options.save().then( doc=> {
            res.status(201).json(doc)
          }).catch(err => {
            res.status(500).json({error:err
          })
        });
      });
    });
});

router.get('/question/:question_id/option',(req, res, next) =>{
    const id = req.params.question_id;
    Options.find({question_id:id}).exec().then(doc =>{
      res.status(200).json(doc);
    }).catch(err =>{
      res.status(500).json({error:"option does not exist"})
    });
});


router.get('/question/:question_id/option/:option_id',(req, res, next) =>{
    const que_id = req.params.question_id;
    const opt_id = req.params.option_id;

    Options.find({question_id:que_id}).exec().then(doc =>{
      Options.findById(opt_id).exec().then(doc =>{
        res.status(200).json(doc);
      });
    }).catch(err =>{
      res.status(500).json({error:"option does not exist"})
    });
});

router.put('/question/:question_id/option/:option_id',(req, res, next) =>{
  const que_id = req.params.question_id;
  const opt_id = req.params.option_id;
  Options.find({question_id:que_id}).exec().then(doc =>{
  Options.findByIdAndUpdate({_id: opt_id},req.body).exec().then(doc =>{
    Options.findOne({_id: opt_id}).then(doc =>{
      res.status(200).json(doc);
    });
  });
  }).catch(err =>{
    res.status(500).json({error:"user does not exist"})
  });
});

router.delete('/question/:question_id/option/:option_id',(req, res, next) =>{
    const que_id = req.params.question_id;
    const opt_id = req.params.option_id;
    Options.find({question_id:que_id}).exec().then(doc =>{
      Options.remove({_id: opt_id}).exec().then(doc =>{
        res.status(200).json({message: "is delete"});
      });
    }).catch(err =>{
      res.status(500).json({error:"option does not exist for delete operation"})
    });
});



module.exports = router;
