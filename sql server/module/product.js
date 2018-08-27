const express = require('express');
const connection = require('../connection');

const router = express();

router.get('/',(req,res,next) => {
  let sql = "select * from product";
  connection.query(sql,(error,results) => {
    res.status(200).json(results);
  });
});

router.get('/:id',(req,res,next) => {
  let sql = `select * from product where _id = ${req.params.id}`;
  connection.query(sql,(error,results) => {
    res.status(200).json(results);
  });
});

router.post('/', (req,res,next) => {
  let data ={productName:req.body.productName, description:req.body.description, price:req.body.price, quantity:req.body.quantity, image: req.body.image};
  let sql = `insert into product set ?`;
   connection.query(sql, data, (error,result) => {
    if(error) {
      console.log(error);
    }
    res.send(result);
  });
});

router.put('/:id', (req,res,next) => {
  let data = {image:req.body.image};
  let sql = `update product set ?  where _id = ${req.params.id}`;
  connection.query(sql, data,(error,result) => {
    if(error) {
      console.log(error);
    }
    res.send(result);
  });
});

router.delete('/:id', (req,res,next) => {
  let sql = `delete from product where _id = ${req.params.id}`;
  connection.query(sql,(error,result) => {
    if(error) {
      console.log(error);
    }
    res.send(result);
  });
});

module.exports = router;