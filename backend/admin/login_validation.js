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
        check('org_id').not().isEmpty().withMessage('org_id, is required'),
        check('location_id').not().isEmpty().withMessage('org_location_id is required'),
        check('sys_id').not().isEmpty().withMessage('sys_id is required'),
        check('device_name').not().isEmpty().withMessage('device_name is required'),
        check('type_of_device').not().isEmpty().withMessage('type_of_device is required'),
        check('user_id').not().isEmpty().withMessage('user_id is required'),
        check('lat').not().isEmpty().withMessage('lat is required'),
        check('lng').not().isEmpty().withMessage('Lng is required'),
        check('a').not().isEmpty().withMessage('a is required'),
        check('b').not().isEmpty().withMessage('b is required'),
        check('hmin').not().isEmpty().withMessage('hmin is required'),
        check('hmax').not().isEmpty().withMessage('hmax is required')
    ]
    next();
}

module.exports = { user_login_validation, admin_login_validation, new_brwhms_validation };