const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

//mongoose config
const mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/xiaomicommers';
mongoose.Promise('bluebird');
mongoose.connect(url, (err)=>{
    if(err) console.log(err);
    console.log('you are conected on url: ', url);
})

//file routes declar
var users = require('./routes/user');
var items = require('./routes/item');

//express declare
var app = express()

//cors and body-parser
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//router set
app.use('/api/user', users);
app.use('/api/item', items);

app.listen(process.env.PORT, ()=>{
    console.log('connection on port: ', process.env.PORT)
});

module.exports = app;
