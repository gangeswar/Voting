const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const cors = require('cors');

app.use(cors());


const user = require('./module/user');
const product = require('./module/product');
const image = require('./module/home');
const payment = require('./module/payment');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api/user',user);
app.use('/api/product',product);
app.use('/api/image',image);
app.use('/api/payment',payment);

module.exports = app;