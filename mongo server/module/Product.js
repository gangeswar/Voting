const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Product = require('../model/ProductSchema');

router.get('/', (req, res, next) => {
  Product.find().then(result => {
    res.status(200).json(result);
  }).catch(error => {
    res.status(500).json({
      error: error
    })
  });
});

router.post('/', (req, res, next) => {
  Product.find().then(productObject => {
    const products = new Product({
      _id: new mongoose.Types.ObjectId(),
      productName: req.body.productName,
      quantity: req.body.quantity,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image
    });
    products.save().then(result => {
      res.status(201).json(result)
    }).catch(error => {
      res.status(500).json({
        error: error
      })
    });
  })


});

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId).exec().then(result => {
    res.status(200).json({
      _id: result._id,
      productName: result.productName,
      quantity: result.quantity,
      price: result.price,
      description: result.description,
      image: result.image
    });
  }).catch(error => {
    res.status(500).json({
      error: "product does not exist"
    })
  });
});

router.put('/:productId', (req, res, next) => {
  Product.findByIdAndUpdate(req.params.productId, req.body).then(result => {
    Product.findOne({
      _id: req.params.productId
    }).then(result => {
      res.status(200).json(result);
    });
  }).catch(error => {
    res.status(500).json({
      error: "product does not exist"
    })
  });
});


router.delete('/:productId', (req, res, next) => {
  Product.remove({
    _id: req.params.productId
  }).exec().then(result => {
    res.status(200).json({
      message: "product deleted"
    });
  }).catch(error => {
    res.status(500).json({
      error: error
    })
  });
});

module.exports = router;