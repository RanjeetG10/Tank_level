const mysql = require('mysql');
const {connection} = require('./db');
const express = require('express');
const app = express(); 

const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
const port = 5100; 


app.get('/', (req, res) =>{
    res.send('hello World')
    });









app.listen(port, () => {
    console.log ("listening on port " + port);
});

module.exports = { connection }