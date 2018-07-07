const express = require("express");
const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');

const router = express.Router();

const User = require('../model/UserSchema');

router.get('/', (req, res, next) => {
  User.aggregate([
    {
      $project:{
        password:0
      }
    }
  ]).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(500).json({
      error: err
    })
  });
});

router.post('/', (req, res, next) => {
  User.find({
    email_id: req.body.email_id
  }).then(user => {
    if (user.length) {
      return res.status(409).json({
        error: "user already exist"
      })
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err
          });
        } else {
          if (validator.isEmail(req.body.email_id) && (validator.isAlpha(req.body.user_name) && (req.body.user_name.length > 3 && req.body.user_name.length < 15)) && (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}/.test(req.body.password))) {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email_id: req.body.email_id,
              user_name: req.body.user_name,
              password: req.body.password
            });
            user.save().then(
              res.status(200).json({
                message: "successfully created"
              })
            ).catch(err => {
              res.status(500).json({
                error: err
              })
            });
          }
        }
      });
    }
  });
});

router.get('/:user_id', (req, res, next) => {
  User.findById(req.params.user_id).exec().then(result => {
    res.status(200).json({
      message: {
        _id: result._id,
        email_id: result.email_id,
        user_name: result.user_name,
        isadmin: result.isadmin
      }
    });
  }).catch(err => {
    res.status(500).json({
      error: "user does not exist"
    })
  });
});

router.put('/:user_id', (req, res, next) => {
  if(req.body.isadmin==1 || req.body.isadmin==0) {
    User.findByIdAndUpdate(req.params.user_id, req.body).then(result => {
      User.findOne({
        _id: req.params.user_id
      }).then(result => {
        res.status(200).json(result);
      });
    }).catch(err => {
      res.status(500).json({
        error: "Can't change as admin"
      })
    });
  } else {
    User.findById(req.params.user_id).then(result => {
      if (result.password.toString() == req.body.oldPassword.toString()) {
        User.findByIdAndUpdate(req.params.user_id, req.body).then(result => {
          User.findOne({
            _id: req.params.user_id
          }).then(result => {
            res.status(200).json(result);
          });
        }).catch(err => {
          res.status(500).json({
            error: "Current password does not same"
          })
        });
      } else {
        res.status(500).json({
          error: "Current password does not same"
        })
      }
    });
  }

});


router.delete('/:user_id', (req, res, next) => {
  User.remove({
    _id: req.params.user_id
  }).exec().then(result => {
    res.status(200).json({
      message: "user deleted"
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    })
  });
});


router.post('/login', (req, res, next) => {
  User.find().then(result => {
    result.map(user => {
      if ((user.email_id == req.body.email_id) && (user.password == req.body.password)) {
        if (user.isadmin) {
          res.status(200).json({
            message: user._id
          });
        } else {
          res.status(200).json({
            message: user._id
          });
        }
      }
    }).catch(
      res.status(500).json({
        error: "Invalid user"
      })
    );
  })
});


module.exports = router;
