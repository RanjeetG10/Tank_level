const mysql = require('mysql');
const {connection} = require('./db');
const jwt = require('jsonwebtoken');
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


    const devices = require('./devices/devices');
    const hours_log = require('./hours_log/hours_log');
    const  logs = require('./logs.js/logs');
    const month_logs  = require('./month_logs/month_logs')
    const user = require('./user/user');
    const admin = require('./admin/admin');
    // const mqtt = require('./mqtt/datalogger')
       // const admin =require('./admin/admin')


    app.use('/devices', devices)
    app.use('/hours_log', hours_log)
   app.use ('/logs', logs)
    app.use('/month_logs', month_logs)
    app.use('/user', user)
    app.use('/admin', admin)
    // app.use('/mqtt', mqtt )
   
//    app.use('/admin', admin)


app.listen(port, () => {
    console.log ("listening on port " + port);
});

module.exports = { connection }