const express = require ('express');
const router = express.Router();
const {connection} = require('../db');
const jwt = require('jsonwebtoken');
const pass = 'jejwhfjekk fejfhefejbe efehjefjhfbejff ffbefjefjhebfjhfbhfjjhgh';


router.use((req, res, next) => {
console.log('Times:', Date.now());
console.log('admin');
next();
},);

// router.post('/admin_login', (req, res) => {
//     const { username, password } = req.body;
//     connection.query('SELECT * FROM admin  WHERE username = ? AND password = ?', [username, password], (err, rows) => {
//         if (err) {
//             res.status(500).send({
//                 success: false,
//                 msg: err.sqlMessage,
//                 data: []
//             });
//         } else {
//             if (result.length > 0) {
//                 const jwtdata = {
//                     id: result[0].id,
//                     username: username,
//                     role: 'admin',
//                 };
//                 const token = jwt.sign(jwtdata, password, {
//                     expiresIn: '30d'
//                 });
//                 res.status(200).send({
//                     success: true,
//                     message: 'Login success',
//                     data: token
//                 });
//             } else {
//                 res.status(401).send({
//                     success: false,
//                     message: 'Login failed',
//                     data: []
//                 });
//             }




//         }
//     });
// });



router.post('/admin_login',
    (req, res) => {
        
            const username = req.body.username;
            const password = req.body.password;
            // console.log(username, password);
            const sql = `SELECT * FROM admin WHERE username = ? AND password = ?`;
            connection.query(sql, [username, password], (err, results) => {
                console.log(err, results);
                if (err) {
                    const resp = {
                        success: false,
                        message: 'Error: ' + err,
                        data: null
                    };
                    res.status(404).send(resp);
                } else if (results.length > 0) {
                    token = jwt.sign({
                        id: results[0].id,
                        username: results[0].username,
                        role: 'admin',
                    },
                        pass, { expiresIn: '1d' });

                    const resp = {
                        success: true,
                        message: 'login Success',
                        data: token
                    };
                    res.status(200).send(resp);
                } else {
                    const resp = {
                        success: false,
                        message: 'admin not found',
                        data: null
                    };
                    res.status(404).send(resp);
                }
            });

        }

);

router.post('/user_login',
    (req, res) => {
            const username = req.body.username;
            const password = req.body.password;
            // console.log(username, password);
            const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
            connection.query(sql, [username, password], (err, results) => {
                console.log(err, results);
                if (err) {
                    const resp = {
                        success: false,
                        message: 'Error: ' + err,
                        data: null
                    };
                    res.status(404).send(resp);
                } else if (results.length > 0) {
                    token = jwt.sign({
                        id: results[0].id,
                        username: results[0].username,
                        role: 'user',
                    },
                        pass, { expiresIn: '1d' });

                    const resp = {
                        success: true,
                        message: 'login Success',
                        data: token
                    };
                    res.status(200).send(resp);
                } else {
                    const resp = {
                        success: false,
                        message: 'admin not found',
                        data: null
                    };
                    res.status(404).send(resp);
                }
            });

        }

);

module.exports = router;
