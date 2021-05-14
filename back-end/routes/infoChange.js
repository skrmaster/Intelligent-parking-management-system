var express = require('express')
var md5 = require('blueimp-md5')
var fs = require('fs')
var Admin = require('../models/admin')
var secret = require('../config/index')

var router = express.Router()

var verify = require('../middleware/tokenVerify')

router.post('/changInfo', verify, (req, res) => {
    let info = req.body
    Admin.find({adminName: `${info.newname}`}, (err, result) => {
        if (err) throw CHANGINFO_ERR
        if (result.length === 0) {
            Admin.find({adminName: `${info.oldname}`}, (err, result) => {
                if (err) throw CHANGINFO_ERR
                if (result) {
                    if (result.length === 0) {
                        res.status(500).send('服务器忙')
                    } else {
                        let newInfo = result[0]
                        newInfo.adminName = info.newname
                        newInfo.adminPwd = md5(info.newpwd, 'secret')
                        newInfo.avatar = info.avatar
                        
                        Admin.findOneAndUpdate({adminName: `${info.oldname}`}, newInfo, (err) => {
                            if (err) throw err
                            res.status(200).json({
                                err_code: 0
                            })
                        })
                    }
                }
            })
        } else {
            res.status(200).json({
                err_code: 2
            })
        }
    })
})

router.post('/delAccount', verify, (req, res) => {
    let name = req.body.name
    Admin.findOneAndDelete({adminName: `${name}`}, (err) => {
        if (err) throw err
        res.status(200).json({
            err_code: 0
        })
    })
})

module.exports = router
