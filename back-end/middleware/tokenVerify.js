var jwt = require('jsonwebtoken')
var secret = require('../config/index')

var verify = (req, res, next) => {
    let authorization = req.get('Authorization')
    if (authorization === '' || authorization === undefined) {
        res.status(401).json({
            err_code: 10,
            message: 'no token!'
        })
    } else {
        let token = authorization.split(' ')[1]
        jwt.verify(token, secret, (err) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    res.status(401).json({
                        err_code: 11,
                        message: 'token expried!'
                    })
                } else {
                    res.status(401).json({
                        err_code: 12,
                        message: 'token illgon!'
                    })
                }
            } else {
                next()
            }
        })
    }
}

module.exports = verify
