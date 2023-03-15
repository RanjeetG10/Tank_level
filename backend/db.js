const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Tank_Level'
})

connection.connect(function (err)  {
    if (err) console.error(err);
    console.log('database connected successfully')
    
})

module.exports = {connection}