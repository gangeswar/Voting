const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Home = require('../model/HomeSchema');

router.get('/', (req, res, next) => {
  Home.find().then(result => {
    res.status(200).json(result);
  }).catch(error => {
    res.status(500).json({
      error: error
    })
  });
});

router.post('/', (req, res, next) => {
  Home.find().then(homeObject => {
    const home = new Home({
      _id: new mongoose.Types.ObjectId(),
      image: req.body.image
    });
    home.save().then(result => {
      res.status(201).json(result)
    }).catch(error => {
      res.status(500).json({
        error: error
      })
    });
  })

});

router.get('/:imageId', (req, res, next) => {
  Home.findById(req.params.imageId).exec().then(result => {
    res.status(200).json({
      _id: result._id,
      image: result.image
    });
  }).catch(error => {
    res.status(500).json({
      error: "user does not exist"
    })
  });
});

router.put('/:imageId', (req, res, next) => {
  Home.findByIdAndUpdate(req.params.imageId, req.body).then(result => {
    Home.findOne({
      _id: req.params.imageId
    }).then(result => {
      res.status(200).json(result);
    });
  }).catch(error => {
    res.status(500).json({
      error: "user does not exist"
    })
  });
});


router.delete('/:imageId', (req, res, next) => {
  Home.remove({
    _id: req.params.imageId
  }).exec().then(result => {
    res.status(200).json({
      message: "user deleted"
    });
  }).catch(error => {
    res.status(500).json({
      error: error
    })
  });
});

module.exports = router;