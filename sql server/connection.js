const mysql = require('mysql');

const connection = mysql.createConnection({
   server:'sql12.freesqldatabase.com',
  user:'sql12253137',
  password:'4pdNgIjdW3',
  database:'sql12253137',
  port: '3306'
});

connection.connect((error) => {
  if(error) {
    console.log("connection failed");
  }
  else{
    console.log("connection successful");
  }
});

module.exports = connection;
