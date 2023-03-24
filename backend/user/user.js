const express = require("express");
const router = express.Router();
const { connection } = require("../db");

router.use((req, res, next) => {
    console.log("Times:", Date.now());
    console.log("user");
    next();
  });



//   ADD USERS
router.post("/add_user", (req, res) =>{
    const { first_name, last_name, email, username, password, mobile, address, is_active, last_updated } = 
    req.body;

    const query = `INSERT INTO users (first_name, last_name, email, username, password, mobile, address, is_active, last_updated)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
console.log(query);
connection.query(
    query,
    [first_name, last_name, email, username, password, mobile, address, is_active, last_updated],
    (error, result) => {
        if (error) {
            const resp ={
                success: false,
                message: " error " + error,
                data: null,
            };
            res.status(400).send(resp);
        } else{
            const resp = {
            success: true,
            message: "Device Added",
            data: result,
            };
            res.status(200).send(resp);
        }
    }
);
});



//   DELETE USERS
router.delete("/delete_user/:id",  (req, res) => {
    const { id } = req.params;
    const sqlQuery = `DELETE FROM users WHERE id = ${req.params.id}`;

    connection.query(sqlQuery, [id], (err, result) => {
        if (err) {
            const resp = {
                success: false,
                message: " error " + err,
                data: null,
            };
            res.status(400).send(resp);
        } else {
            const resp = {
success: true,
message: "USER DELETED Successfully",
data: result,
            };
            res.status(200).send(resp);
        }
    });
});



// GET USERS by id
router.get("/get_users/:id", (req, res) => {
    const { id } = req.params;
    const sqlQuery = `SELECT * FROM users WHERE id = ?`;
    connection.query(sqlQuery, [id], (err, result) => {
        if (err) {
            const resp = {
                success: false,
                message: "ERROR" + err,
                data: null,
            };
            res.status(400).send(resp);
        } else {
            const resp = {
                success: true,
                message: "Fetch Successfully",
                data: result,

            };
            res.status(200).send(resp);
        }
    });
});

// GET ALL USERS
router.get("/get_users", (req, res) => {
    const { id } = req.params;
    const sqlQuery = `SELECT * FROM users`;
    connection.query(sqlQuery, [id], (err, result) => {
        if (err) {
            const resp = {
                success: false,
                message: "ERROR" + err,
                data: null,
            };
            res.status(400).send(resp);
        } else {
            const resp = {
                success: true,
                message: "Fetch Successfully",
                data: result,

            };
            res.status(200).send(resp);
        }
    });
});



















module.exports = router;