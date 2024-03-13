const { body } = require('express-validator')

export const loginValidation = () => {
    return [
        body('email').trim().isEmail().withMessage('Must be a valid email'),
        body('password').trim().isLength({ min: 5 }).withMessage('Must be at least 5 chars long'),
    ]
}

export const registerValidation = () => {
    return [
        body('email').trim().isEmail().withMessage('must be a valid email'),
        body('password').trim().isLength({ min: 5 }).withMessage('Must be at least 5 chars long'),
    ]
}