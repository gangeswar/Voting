const express = require('express');
const connection = require('../connection');

const router = express();

router.get('/',(req,res,next) => {
  let sql = "select * from image";
  connection.query(sql,(error,results) => {
    res.status(200).json(results);
  });
});

router.get('/:id',(req,res,next) => {
  let sql = `select * from image where _id = ${req.params.id}`;
  connection.query(sql,(error,results) => {
    res.status(200).json(results);
  });
});

router.post('/', (req,res,next) => {
  let data ={imagePath: req.body.imagePath};
  let sql = `insert into image set ?`;
   connection.query(sql, data, (error,result) => {
    if(error) {
      console.log(error);
    }
    res.send(result);
  });
});

router.put('/:id', (req,res,next) => {
  let data = {imagePath:req.body.imagePath};
  let sql = `update image set ?  where _id = ${req.params.id}`;
  connection.query(sql, data,(error,result) => {
    if(error) {
      console.log(error);
    }
    res.send(result);
  });
});

router.delete('/:id', (req,res,next) => {
  let sql = `delete from image where _id = ${req.params.id}`;
  connection.query(sql,(error,result) => {
    if(error) {
      console.log(error);
    }
    res.send(result);
  });
});

module.exports = router;