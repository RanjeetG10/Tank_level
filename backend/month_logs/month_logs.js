const express = require('express');
const router = express.Router();
const { connection} = require('../db')


router.use((req, res, next) => {
   console.log('Times:', Date.now());
   console.log('month_logs');
   next();
},);



//GET DETAILS OF Month logs
router.get('/get_tank_level_month_logs', (req, res) =>{
    const sqlQuery = `SELECT * FROM month_logs`;
connection.query(sqlQuery,(err, result)=> {
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