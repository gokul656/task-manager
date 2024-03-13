const { body, param } = require('express-validator')

export const taskValidation = () => {
    return [
        body('title').isLength({ min: 4 }).withMessage('must be at least 4 chars long'),
    ]
}

export const taskIdValidation = () => {
    return [
        param('id').exists().withMessage('must be valid task id'),
    ]
}

export const editTaskValidation = () => {
    return [
        body('title').isLength({ min: 4 }).withMessage('must be at least 4 chars long'),
        body('description').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
        body('id').isEmpty().withMessage('must be valid task id'),
    ]
}
