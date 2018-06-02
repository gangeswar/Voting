const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Questions = require('../model/questionsSchema');

router.get('/',(req, res, next) => {
    Questions.find().then(doc=>{
        res.status(200).json(doc);
    }).catch(err =>{
      res.status(500).json({error:err})
    });
});


router.post('/',(req, res, next) => {
  Questions.find({question: req.body.question}).then(ques=>{
    console.log(ques.length);
    if(ques.length >= 1)
    {

      return res.status(409).json({
        message: "Question already exist"
      })
    }
    else{
        const questions = new Questions({
        _id : new mongoose.Types.ObjectId(),
        question : req.body.question,
        start_date : req.body.start_date,
        end_date : req.body.end_date
      });
      questions.save().then( doc=> {
        res.status(201).json(doc)
      }).catch(err => {
        res.status(500).json({error:err
      })
    });
    }
  });
});

router.get('/:question_id',(req, res, next) =>{
    const id = req.params.question_id;
    Questions.findById(id).exec().then(doc =>{
      res.status(200).json(doc);
    }).catch(err =>{
      res.status(500).json({error:"question does not exist"})
    });
});

router.delete('/:question_id',(req, res, next) =>{
    const id = req.params.user_id;
    Questions.remove({_id: id}).exec().then(doc =>{
      res.status(200).json({message: "is delete"});
    }).catch(err =>{
      res.status(500).json({error: "Question does not exist for delete operation"})
    });
});



module.exports = router;
