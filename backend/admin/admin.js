const express = require("express");
const router = express.Router();
const { connection } = require("../db");
const jwt = require("jsonwebtoken");
const pass = "jejwhfjekk fejfhefejbe efehjefjhfbejff ffbefjefjhebfjhfbhfjjhgh";
const { validationResult } = require("express-validator");
const {verifyToken, checkadmin, checkuser} = require("../middleware/jwt");
const {admin_login_validation, user_login_validation} = require("./login_validation");

router.use((req, res, next) => {
  console.log("Times:", Date.now());
  console.log("admin");
  next();
});

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

router.post("/admin_login", admin_login_validation(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const resp = {
      success: false,
      message: "Error",
      data: errors.array(),
    };
    res.status(400).send(resp);
  } else {
    const username = req.body.username;
    const password = req.body.password;

    const sql = `SELECT * FROM admin WHERE username = ? AND password = ?`;
    connection.query(sql, [username, password], (err, results) => {
      console.log(err, results);
      if (err) {
        const resp = {
          success: false,
          message: "Error: " + err,
          data: null,
        };
        res.status(404).send(resp);
      } else if (results.length > 0) {
        token = jwt.sign(
          {
            id: results[0].id,
            username: results[0].username,
            role: "admin",
          },
          pass,
          { expiresIn: "1d" }
        );

        const resp = {
          success: true,
          message: "login Success",
          data: token,
        };
        res.status(200).send(resp);
      } else {
        const resp = {
          success: false,
          message: "admin not found",
          data: null,

        };
        res.status(404).send(resp);
      }
    });
  }
});

router.post("/user_login", user_login_validation(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const resp = {
      success: false,
      message: "Error",
      data: errors.array(),
    };
    res.status(400).send(resp);
  } else {
    const username = req.body.username;
    const password = req.body.password;

    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    connection.query(sql, [username, password], (err, results) => {
      console.log(err, results);
      if (err) {
        const resp = {
          success: false,
          message: "Error: " + err,
          data: null,
        };
        res.status(404).send(resp);
      } else if (results.length > 0) {
        token = jwt.sign(
          {
            id: results[0].id,
            username: results[0].username,
            role: "user",
          },
          pass,
          { expiresIn: "1d" }
        );

        const resp = {
          success: true,
          message: "login Success",
          data: token,
        };
        res.status(200).send(resp);
      } else {
        const resp = {
          success: false,
          message: "admin not found",
          data: null,
        };
        res.status(404).send(resp);
      }
    });
  }
});



// ADD ADMIN

router.post('/add_admin', [checkadmin], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const resp = {
            success: false,
            message: 'Error',
            data: errors.array()
        };
        res.status(400).send(resp)
    } else {
        
        const { first_name,
            last_name,
            email,
            username,
            password,
            mobile,
            address,
            is_active,
        last_updated } = req.body;
        const query = `INSERT INTO admin (first_name, last_name, email, username, password, mobile, address, is_active, last_updated)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        connection.query(query, [first_name, last_name, email, username, password, mobile, address, is_active, last_updated], (error, result) => {
            if (error) {
                const resp = {
                    success: false,
                    message: ' error ' + error,
                    data: null
                }
                res.status(400).send(resp)
            } else {
                const resp = {
                    success: true,
                    message: 'admin data added',
                    data: result
                }
                res.status(200).send(resp)
            }

        });
    }
});


//update admin by id API

router.put('/update_admin/:id', [checkadmin], (req, res) => {
    const { id } = req.params;
    let sqlQuery = 'UPDATE admin SET';
    let inputArray = []; //created array to store input values
    Object.keys(req.body).forEach(key => { //loop through all the keys in req.body
        sqlQuery += key ? ` ${key} = ?, ` : ''; //if key is not empty, add it to sql query
        key ? inputArray.push(req.body[key]) : ''; //if key is not empty, add it to inputArray
    });
    sqlQuery += ' last_updated = NOW() WHERE id = ?'; //add last_updated to sql query
    inputArray.push(id); //add id to inputArray
    //console.log(sqlQuery); //print sql query
    // console.log(inputArray); //print inputArray
    connection.query(sqlQuery, inputArray, (err, result) => {
        if (err) {
            const resp = {
                success: false,
                message: 'Error' + err,
                data: null
            };
            res.status(400).send(resp)
        } else {
            const resp = {
                success: true,
                message: 'Details updated successfully',
                data: result
            };
            res.status(200).send(resp)
        }
    });
});


//delete admin by id API

router.delete('/delete_admin/:id', [checkadmin], (req, res) => {
    const { id } = req.params; //got id from URL parameter
    // const sqlQuery = `DELETE FROM admin WHERE id = ?`; //created sql query
    const sqlQuery = `DELETE FROM adminp WHERE id = ${req.params.id}`;
    connection.query(sqlQuery, [id], (err, result) => {
        if (err) {
            const resp = {
                success: false,
                message: 'Error' + err,
                data: null
            };
            res.status(400).send(resp)
        } else {
            const resp = {
                success: true,
                message: 'Details deleted successfully',
                data: result
            };
            res.status(200).send(resp)
        }
    });
});

//get all admin API

router.get('/get_all_admin', [checkadmin], (req, res) => {
    
    const sqlQuery = `SELECT * FROM admin`;
    connection.query(sqlQuery, (err, result) => {
        if (err) {
            const resp = {
                success: false,
                message: 'Error' + err,
                data: null
            };
            res.status(400).send(resp)
        } else {
            const resp = {
                success: true,
                message: 'Details fetched successfully',
                data: result
            };
            res.status(200).send(resp)
        }
    });
});

//get admin by id API

router.get('/get_admin/:id', [checkadmin], (req, res) => {
    const { id } = req.params;
    const sqlQuery = `SELECT * FROM admin WHERE id = ${req.params.id}`
    connection.query(sqlQuery, [id], (err, result) => {
        if (err) {
            const resp = {
                success: false,
                message: 'Error' + err,
                data: null
            };
            res.status(400).send(resp)
        } else {
            const resp = {
                success: true,
                message: 'Details fetched successfully',
                data: result
            };
            res.status(200).send(resp)
        }
    });
});







module.exports = router;
