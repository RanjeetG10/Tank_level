const express = require ('express');
const router = express.Router();
const {connection} = require('../db')

router.use((req, res, next) => {
console.log('Times:', Date.now());
console.log('devices');
next();
},);




//Add Devices

router.post('/add_tank_level', (req, res) =>{
    const 
    {
        uuid,
        name,
        user_id,
        type,
        lat,
        lng,
        sensor_gap,
        ac,
        hmin,
        hmax
    } = req.body;


    const query = `INSERT INTO devices(uuid, name, user_id, type, lat, lng, sensor_gap, ac, hmin, hmax)VALUES (uuid(), ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    console.log(query);
     connection.query(query, [name, user_id, type, lat, lng, sensor_gap, ac, hmin, hmax],
         (error, result) => {
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
                        message: 'Device added',
                        data: result
                    }
                    res.status(200).send(resp)
                }

            });

  })

// UPDATE device
router.put('/update_tank_level_devices/:id', (req, res) => {
    const { id } = req.params;
    let sqlQuery = 'UPDATE new_tank_level_devices SET';
    let inputArray = [];
    Object.keys(req.body).forEach(key => {
        sqlQuery += key ? `${key} = ?,` : '';
        key ? inputArray.push(req.body[key]) : '';
    });

    sqlQuery += 'last_updated = NOW() WHERE id = ?'; //add last_updated to sql query
    inputArray.push(id);
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

  router.delete('/delete_tank_level_devices/:id', (req, res) => {
    const { id } = req.params;
    const sqlQuery =  `DELETE FROM devices WHERE id = ${req.params.id}`;


connection.query(sqlQuery, [id], (err, result) => {
    if (err){
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


//GET..

router.get('/get_tank_level_devices/:id', (req, res) => {
    const  { id }  = req.params;
    const sqlQuery = `SELECT * FROM devices WHERE id = ?`;
connection.query(sqlQuery, [id], (err, result)=> {
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