// const { response } = require('express');
// const express = require ('express');
// const router = express.Router();
// const {connection} = require('../db');


// router.use((req, res, next) => {
// console.log('Times:', Date.now());
// console.log('admin');
// next();
// },);

// router.post('/user_login', function (req, res) {
//         var username = req.body.username;
//         var password = req.body.password;
//    if (username && password) {
//     query = `SELECT * FROM username WHERE username = "${username}"`;

//     database.query(query, function (error, data){
//         if (data.length > 0) {
// for(var count = 0; count < data.length; count++) 
// {
//     if (data.length > 0){
//         for(var count =0; count < data.length; count++){
//             if (data[count].user_password == password)
//             {
//               request.session.username =data[count].username;

//               response.redirect("/");
//             }
//             else {
//                 response.send('Incorrect Password');
//             }
//         }
//     }
// }

//         }

//         else {
//             response.send('Incorrect username or password');
//         }
//         response.end();
//     });
//    }
// else {
//     response.send('Please Enter USERNAME and PASSWORD');
//     response.end();
// }

// });



// module.exports = router;
