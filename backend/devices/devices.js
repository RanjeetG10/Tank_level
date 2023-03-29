const express = require("express");
const router = express.Router();
const { connection } = require("../db");
const {verifyToken, checkadmin, checkuser} = require("../middleware/jwt");
const { new_brwhms_validation } = require("../admin/login_validation")
const bodyparser = require('body-parser');
const jsonParser = bodyparser.json();


router.use((req, res, next) => {
  console.log("Times:", Date.now());
  console.log("devices");
  next();
},[verifyToken]);

//Add Devices

router.post("/add_tank_level", [checkadmin], new_brwhms_validation(), (req, res) => {
  const {  name, user_id, type, lat, lng, sensor_gap, ac, hmin, hmax, location } =
    req.body;

  const query = `INSERT INTO devices(uuid, name, user_id, type, lat, lng, sensor_gap, ac, hmin, hmax, location)VALUES (uuid(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  console.log(query);
  connection.query(
    query,
    [name, user_id, type, lat, lng, sensor_gap, ac, hmin, hmax, location],
    (error, result) => {
      if (error) {
        const resp = {
          success: false,
          message: " error " + error,
          data: null,
        };
        res.status(400).send(resp);
      } else {
        const resp = {
          success: true,
          message: "Device added",
          data: result,
        };
        res.status(200).send(resp);
      }
    }
  );
});

// UPDATE device
// router.put("update_tank_level_devices/:id", (req,res) => {
//     const { name, user_id, type, lat, lng, sensor_gap, ac, hmin, hmax } =
  
//     req.body;
   

//     const query = `INSERT INTO devices(name, user_id, type, lat, lng, sensor_gap, ac, hmin, hmax)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) WHERE ID = ?`;
//   console.log(query);

//   connection.query( (error, result) => {
//       if (error) {
//         const resp = {
//           success: false,
//           message: " error " + error,
//           data: null,
//         };
//         res.status(400).send(resp);
//       } else {
//         const resp = {
//           success: true,
//           message: "Device added",
//           data: result,
//         };
//         res.status(200).send(resp);
//       }
//     }
//   );

// });

router.put('/update_devices/:id', (req, res) => {
  const { id } = req.params;
  let sqlQuery = 'UPDATE devices SET';
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

//DELETE

router.delete("/delete_tank_level_devices/:id", [checkadmin], (req, res) => {
  const { id } = req.params;
  const sqlQuery = `DELETE FROM devices WHERE id = ${req.params.id}`;

  connection.query(sqlQuery, [id], (err, result) => {
    if (err) {
      const resp = {
        success: false,
        message: "Error" + err,
        data: null,
      };
      res.status(400).send(resp);
    } else {
      const resp = {
        success: true,
        message: "Details deleted successfully",
        data: result,
      };
      res.status(200).send(resp);
    }
  });
});

//GET..
router.get("/get_tank_level_devices/:id", [checkadmin], [checkuser], (req, res) => {
  const user_id = req.decoded.id;
  const sqlQuery = `SELECT * FROM devices WHERE user_id = ${user_id}`;
  connection.query(sqlQuery, [user_id], (err, result) => {
    if (err) {
      const resp = {
        success: false,
        message: "Error" + err,
        data: null,
      };
      res.status(400).send(resp);
    } else {
      const resp = {
        success: true,
        message: "Details fetched successfully",
        data: result,
      };
      res.status(200).send(resp);
    }
  });
});

module.exports = router;
