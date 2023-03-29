const { check } = require('express-validator');

function user_login_validation(){
    return [
        check('username')
        .not()
        .isEmpty()
        .withMessage('username is required'),
        check('password')
            .not()
            .isEmpty()
            .withMessage('Password is required')
            .isLength({ min: 5 })
            .withMessage('Password must be 5 digit')
    ]
    next();
}


function admin_login_validation() {
    return [
        check('username')
            .not()
            .isEmpty()
            .withMessage('username is required'),
        check('password')
            .not()
            .isEmpty()
            .withMessage('Password is required')
            .isLength({ min: 5 })
            .withMessage('Password must be 5 digit')
    ]
    next();
}


function new_brwhms_validation() {
    return [
        check('name').not().isEmpty().withMessage('name, is required'),
        check('user_id').not().isEmpty().withMessage('user_id is required'),
        check('type').not().isEmpty().withMessage('type is required'),
        check('lat').not().isEmpty().withMessage('lat is required'),
        check('lng').not().isEmpty().withMessage('Lng is required'),
        check('sensor_gap').not().isEmpty().withMessage('sensor_gap is required'),
        check('ac').not().isEmpty().withMessage('ac is required'),
        check('hmin').not().isEmpty().withMessage('hmin is required'),
        check('hmax').not().isEmpty().withMessage('hmax is required'),
        check('location').not().isEmpty().withMessage('location is required')
    ] 
    next();
}

module.exports = { user_login_validation, admin_login_validation, new_brwhms_validation };