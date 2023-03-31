const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://fm.bulfro.com:20011', {
    username: '123456789012345',
    password: 'a3ff'
});

const mysql = require('mysql');
const connecttion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tank_level'
});

connecttion.connect((err) => {
    if (err) console.log(err);
    else console.log('Connected to MySQL server');
});

client.on('connect', () => {
    console.log('Connected to MQTT broker');
    const query = `SELECT uuid FROM devices`;
    connecttion.query(query, (err, result) => {
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
    const param = data.slice(-4);
    const sql = `INSERT INTO logs(uuid, level, water_level, water_avail, water_percent) values ((SELECT id FROM devices WHERE uuid = ?), ?, ?, ?, ?)`;
    connecttion.query(sql, [uuid, ...param], (err, result) => {
        if (err) console.log(err);
        else console.log(result);
    });
});