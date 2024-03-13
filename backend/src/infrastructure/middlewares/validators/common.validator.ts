const { validationResult } = require('express-validator')

export const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    let extractedErrors = '';
    errors.array().map(err => { extractedErrors = extractedErrors.concat([err.path] + ' ' + err.msg + '. ')})

    return res.status(422).json({
        error: extractedErrors,
    })
}
