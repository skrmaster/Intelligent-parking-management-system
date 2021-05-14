var express = require('express')
var jwt = require('jsonwebtoken')
var md5 = require('blueimp-md5')

var Admin = require('../models/admin')
var secret = require('../config/index')

var router = express.Router()

router.post('/register', (req, res) => {
    let data = {
        adminName: req.body.name,
        adminPwd: md5(req.body.pass, 'secret'),
        adminPhone: req.body.phone
    }
    Admin.find({ adminName: `${data.adminName}` }, (err, result) => {
        if (err) res.status(500).send('r_save error')
        if (result.length === 0) {
            Admin.find({}, (err, result) => {
                if (err) throw res.status(500).send('r_save error')
                if (result.findIndex((item) => item.adminPhone === data.adminPhone) !== -1) {
                    res.status(200).json({
                        err_code: 1,
                        message: '手机号已注册'
                    })
                } else {
                    new Admin(data).save((err) => {
                        if (err) res.status(500).send('save error')
                        res.status(200).json({
                            err_code: 0,
                            data: 'ok'
                        })
                    })
                }
            })
        } else {
            if (result[0].adminName === data.adminName) {
                res.status(200).json({
                    err_code: 1,
                    message: '用户已注册'
                })
            } else {
                new Admin(data).save((err) => {
                    if (err) res.status(500).send('save error')
                    res.status(200).json({
                        err_code: 0,
                        data: 'ok'
                    })
                })
            }
        }   
    })
})

router.post('/login', (req, res) => {
    let name = req.body.username
    let pwd = md5(req.body.password, 'secret')
    Admin.find({ adminName: `${name}` }, (err, result) => {
        if (err) {
            res.status(500).send('server error')
        }
        if (result) {
            if ( result.length === 0) {
                res.status(200).json({
                    err_code: 1,
                    message: '用户不存在'
                })
            } else if (pwd !== result[0].adminPwd) {
                res.status(200).json({
                    err_code: 1,
                    message: '用户与密码不相互匹配'
                })
            } else {
                let token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 6),
                    name: name
                }, secret)

                res.status(200).json({
                    err_code: 0,
                    name: result[0].adminName,
                    token: token
                })
            }
        }
    })
})

module.exports = router
