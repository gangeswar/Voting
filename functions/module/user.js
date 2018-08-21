const express = require('express');
const connection = require('../connection');

const router = express();

router.get('/',(req,res,next) => {
  let sql = "select * from user";
  connection.query(sql,(error,results) => {
    res.status(200).json(results);
  });
});

router.get('/:id',(req,res,next) => {
  let sql = `select * from user where _id = ${req.params.id}`;
  connection.query(sql,(error,results) => {
    res.status(200).json(results);
  });
});

router.post('/', (req,res,next) => {
  let data ={name:req.body.name, emailId:req.body.emailId, password:req.body.password, mobileNumber:req.body.mobileNumber};
  let sql = `insert into user set ?`;
   connection.query(sql, data, (error,result) => {
    if(error) {
      res.send(error);
    }
    res.send(result);
  });
});

router.put('/:id', (req,res,next) => {
  let data = {password:req.body.password, mobileNumber:req.body.mobileNumber};
  let sql = `update user set ?  where _id = ${req.params.id}`;
  connection.query(sql, data,(error,result) => {
    if(error) {
      console.log(error);
    }
    res.send(result);
  });
});

router.delete('/:id', (req,res,next) => {
  let sql = `delete from user where _id = ${req.params.id}`;
  connection.query(sql,(error,result) => {
    if(error) {
      res.send(error);
    }
    res.send(result);
  });
});

module.exports = router;