const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const User = require('../model/UserSchema');

router.get('/', (req, res, next) => {
  User.aggregate([
    {
      $project: {
        password: 0
      }
    }
  ]).then(result => {
    res.status(200).json(result);
  }).catch(error => {
    res.status(500).json({
      error: error
    })
  });
});

router.post('/signup', (req, res, next) => {
  User.find({
    emailId: req.body.emailId
  }).then(userObject => {
    if (userObject.length) {
      return res.status(409).json({
        message: "user already exist"
      })
    } else {
      const users = new User({
        _id: new mongoose.Types.ObjectId(),
        userName: req.body.userName,
        password: req.body.password,
        emailId: req.body.emailId
      });
      users.save().then(result => {
        res.status(201).json(result)
      }).catch(error => {
        res.status(500).json({
          error: error
        })
      });
    }
  });
});

router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId).exec().then(result => {
    res.status(200).json({
      _id: result._id,
      userName: req.body.userName,
      emailId: req.body.emailId
    });
  }).catch(err => {
    res.status(500).json({
      error: "user does not exist"
    })
  });
});

router.put('/:userId', (req, res, next) => {
  User.findByIdAndUpdate(req.params.userId, req.body).then(result => {
    User.findOne({
      _id: req.params.userId
    }).then(result => {
      res.status(200).json(result);
    });
  }).catch(error => {
    res.status(500).json({
      error: "user does not exist"
    })
  });
});


router.delete('/:userId', (req, res, next) => {
  User.remove({
    _id: req.params.userId
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

router.post('/login', (req, res, next) => {
  User.find().then(result => {
    result.map(user => {
      if ((user.emailId == req.body.emailId) && (user.password == req.body.password)) {
        res.status(200).json({
          message: user._id
        });
      }
    }).catch(
      res.status(500).json({
        error: "Invalid user"
      })
    );
  })
});


module.exports = router;
