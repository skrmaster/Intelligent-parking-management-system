var express = require('express')

var Member = require('../models/member')
var verify = require('../middleware/tokenVerify')

var router = express.Router()

router.get('/memberPage', (req, res) => {
    Member.find().sort({_id: -1}).skip().limit().find((err, result) => {
        if (err) throw err
        res.status(200).json({
            err_code: 0,
            table: result
        })
    })
})

router.post('/newMember', (req, res) => {
    let newMember = req.body
    if (newMember.length === 0) {
        res.status(200).json({
            err_code: 1,
            message: '没有数据传入'
        })
    } else {
        Member.insertMany(newMember, (err) => {
            if (err) {
                throw err
            } else {
                res.status(200).json({
                    err_code: 0
                })
            }
        })
    }
})

router.post('/memberDelete', verify, (req, res) => {
    let vaild = req.body

    Member.find({carId: `${vaild.carId}`, start: `${vaild.start}`}, (err, result) => {
        if (err) throw err
        Member.deleteOne(result[0], (err) => {
            if (err) throw err

            res.status(200).json({
                err_code: 0,
                message: 'ok!'
            })
        })
    })
})

module.exports = router
