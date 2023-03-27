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
            .isLength({ min: 0 })
            .withMessage('Password must be 0 digit')
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
            .isLength({ min: 3 })
            .withMessage('Password must be 6 digit')
    ]
    next();
}

module.exports = { user_login_validation, admin_login_validation };