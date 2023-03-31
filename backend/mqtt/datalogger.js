const express = require('express');
const router = express.Router();
const { connection} = require('../db')
const mqtt = require('mqtt');



const client = mqtt.connect('mqtt://fm.bulfro.com:20011', {
    username: '123456789012345',
    password: 'a3ff'
});

// connection.connect((err) => {
//     if (err) console.error(err);
//     else console.log('connected to mySQL server');
// });

client.on ('connect', () => {
    console.log('Connected to MQTT broker');
    const query = `select uuid FROM devices`
    connection.query(query, (err, result) => {
        if (err) console.log(err);
        else {
            result.forEach((device) => {
                client.subscribe(`bulfro/btlm/${device.uuid}/data`);
            });
        }
    });
});

client.on('message', (topic, message) => {
    const uuid = topic.split('/')[2];
    const data = JSON.parse(message.toString());
    console.log(uuid, data);
    const sql = `INSERT INTO logs (uuid, level, water_level, water_avail, water_percent) values ((SELECT id FROM devices WHERE uuid = ?), ?, ?, ?, ?)`;
    connecttion.query(sql, [uuid, ...data], (err, result) => {
        if (err) console.log(err);
        else console.log(result);
    });
});



module.exports = router;