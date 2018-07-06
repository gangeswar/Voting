const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Options = require('../model/OptionsSchema');

router.post('/question/:question_id/option', (req, res, next) => {
  const options = new Options({
    _id: new mongoose.Types.ObjectId(),
    question_id: req.params.question_id,
    option: req.body.option
  });
  options.save().then(result => {
    res.status(201).json(result)
  }).catch(err => {
    res.status(500).json({
      error: err
    })
  });
});

router.get('/question/:question_id/option', (req, res, next) => {
  Options.find({
    question_id: req.params.question_id
  }).exec().then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(500).json({
      error: "option does not exist"
    })
  });
});


router.get('/question/:question_id/option/:option_id', (req, res, next) => {
  Options.find({
    question_id: req.params.question_id
  }).exec().then(result => {
    Options.findById(req.params.option_id).exec().then(result => {
      res.status(200).json(result);
    });
  }).catch(err => {
    res.status(500).json({
      error: "option does not exist"
    })
  });
});

router.put('/option/:option_id', (req, res, next) => {
  Options.findByIdAndUpdate({
    _id: req.params.option_id
  }, req.body).exec().then(result => {
    Options.findOne({
      _id: req.params.option_id
    }).then(result => {
      res.status(200).json(result);
    });
  }).catch(err => {
    res.status(500).json({
      error: "user does not exist"
    })
});
});

router.delete('/option/:option_id', (req, res, next) => {
  Options.remove({
    _id: req.params.option_id
  }).exec().then(result => {
    res.status(200).json({
      message: "is delete"
    });
  }).catch(err => {
    res.status(500).json({
      error: "user does not exist"
  })
});
});


module.exports = router;
