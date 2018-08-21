const mysql = require('mysql');

const connection = mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'aspire@123',
  database:'shopping'
});

connection.connect((error) => {
  if(error) {
    console.log("connection failed");
  }
  console.log("connection successful");
});

module.exports = connection;
