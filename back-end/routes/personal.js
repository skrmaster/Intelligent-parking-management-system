var express = require('express')
var Admin = require('../models/admin')

var router = express.Router()

var verify = require('../middleware/tokenVerify')

router.get('/avatarGet', verify, (req, res) => {
    let key = req.query.key
    Admin.find({adminName: key}, (err, result) => {
        if (err) throw err
        if (result.length !== 0) {
            result[0].avatar === undefined
            ? res.status(200).json({
                avatar: 'default'
            })
            : res.status(200).json({
                avatar: result[0].avatar
            })
        }
    })
})

router.get('/registerTime', verify, (req, res) => {
    let key = req.query.key
    Admin.find({adminName: key}, (err, result) => {
        if (err) throw err
        if (result.length !== 0) {
            result[0].registerTime === undefined
            ? res.status(200).json({
                registerTime: '0000'
            })
            : res.status(200).json({
                registerTime: result[0].registerTime
            })
        }
    })
})

module.exports = router
