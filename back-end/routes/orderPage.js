var express = require('express')

var Order = require('../models/order')
var verify = require('../middleware/tokenVerify')
var excel = require('../utils/excel')
var router = express.Router()

router.get('/orderPage', verify, (req, res) => {
    Order.find().sort({_id: -1}).skip().limit().find((err, result) => {
        if (err) throw err
        res.status(200).json({
            err_code: 0,
            table: result
        })
    })
})

router.post('/orderPage', verify, (req, res) => {
    let newOrder = req.body
    if (newOrder.length === 0) {
        res.status(200).json({
            err_code: 1,
            message: '没有数据传入'
        })
    } else {
        Order.insertMany(newOrder, (err) => {
            if (err) {
                throw err
            }
            else {
                res.status(200).json({
                    err_code: 0
                })
            }
        })
    }
})

router.post('/orderDelete', verify, (req, res) => {
    let vaild = req.body

    Order.find({carId: `${vaild.carId}`, start: `${vaild.start}`}, (err, result) => {
        if (err) throw err
        Order.deleteOne(result[0], (err) => {
            if (err) throw err

            res.status(200).json({
                err_code: 0,
                message: 'ok!'
            })
        })
    })
})

router.post('/editOne', verify, (req, res) => {
    let idf = req.body._id
    Order.findById({_id: `${idf}`}, (err, result) => {
        if (err) throw FINDBYID_ERR
        if (result.length !== 0) {
            Order.findByIdAndUpdate(idf, req.body, (err) => {
                res.status(200).json({
                    err_code: 0
                })
            })
        }
    })
})

router.get('/exportXlsx', verify, (req, res) => {
    let data = JSON.parse(req.query.rowToExport)
    let allData = []
    if (data.length === 0) {
        Order.find({}, (err, result) => {
            if (err) console.log('export excel failure')
            if (result.length !== 0) {
                excel(result, 'orderList')
                res.status(200).json({
                    data: 'http://localhost:3000/public/download/orderList.xlsx'
                })
            }
        })
    } else {
        new Promise(resolve => {
            for (let i = 0; i < data.length; i++) {
                Order.find({_id: data[i]._id}, (err, result) => {
                    if (err) console.log('export excel failure')
                    if (result.length !== 0) {
                        allData.push(result[0])
                    }
                    if (i === data.length - 1) {
                        resolve(allData)
                    }
                })
            }
        }).then((allData) => {
                excel(allData, 'orderList')
                res.status(200).json({
                data: 'http://localhost:3000/public/download/orderList.xlsx'
            })
        }).catch(err => { throw err })
    }
})

router.get('/orderByTime', verify, (req, res) => {
    let way = req.query.way
    let later = []
    let tmp = []
    let last = []
    new Promise( resolve => {
        Order.find({}, (err, result) => {
            if (err) throw err
            if(result.length !== 0) {
                resolve(result)
            }
        })
    }).then(result => {
        for (let i = 0; i < result.length; i++) {
            way === 'in'
            ? later[new Date(result[i].start).getTime()] = result[i]
            : later[new Date(result[i].end).getTime()] = result[i]
        }
        for (let key in later) {
            tmp.push(key)
        }
        tmp.sort((a, b) => a - b)

        for (let i = 0; i < tmp.length; i++) {
            last[i] = later[tmp[i]]
        }
        res.status(200).json({
            data: last
        })

    }).catch(err => { throw err })
})

router.post('/searchMsg', verify, (req, res) => {
    let search = req.body.carId
    Order.find({carId: search}, (err, result) => {
        if (err) throw err
        if (result.length !== 0) {
            res.status(200).json({
                table: result
            })
        }
    })
})

module.exports = router
