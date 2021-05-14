var express = require('express')
var Order = require('../models/order')
var Park = require('../models/parkStatus')

var router = express.Router()

var verify = require('../middleware/tokenVerify')

const PARKIDCOUNT = 4 //车场总数
const PARKID = ['C1', 'C2', 'C3', 'C4'] //车场ID
const INOUTCARCOUNT = ['in', 'out', 'berth'] //进出车辆统计
const PICKMONEY = ['收费员1', '收费员2', '收费员3'] //收费员
const REASON = ['闯闸', '未知原因', '设备异常'] //异常原因
const TOTAL = 400

router.get('/datashow', verify, (req, res) => {
    let money = 0
    let emptyParkSpace = TOTAL
    let coupon = 0

    Order.find({}, (err, result) => {
        if (err) throw 'datashow err'
        if (result.length !== 0 ) {
            for (let i = 0; i < result.length; i++) {
                let rightOp = result[i].money.slice(1)
                money += rightOp * 1
                emptyParkSpace--
                if (result[i].coupon !== '0') {
                    coupon++
                }
                if (i === result.length - 1) {
                    res.status(200).json({
                        money: money,
                        emptyParkSpace: emptyParkSpace,
                        member: 30,
                        coupon: coupon,
                        visiter: 0
                    })
                }
            }
        }  
    })
})

router.get('/datashowMoney', verify, (req, res) => {
    let crash = 0
    let e_crash = 0
    let coupon = 0
    let coupon_count = 0

    Order.find({}, (err, result) => {
        if (err) throw FIND_ALL_ERR_IN_GET_DATASHOWMONGY
        if (result.length !== 0) {
            for (let i = 0; i < result.length; i++) {
                for (let key in result[i]) {
                    if (key === 'money') {
                        if (result[i]['payway'] === '现金') {
                            if (result[i]['coupon'] === '0') {
                                crash += result[i][key].slice(1) * 1
                            } else if (result[i]['coupon'] === '1') {
                                crash += result[i][key].slice(1) * 1 - 2
                                coupon += 2
                                coupon_count++
                            } else if (result[i]['coupon'] === '2') {
                                crash += result[i][key].slice(1) * 1 - 3
                                coupon += 3
                                coupon_count++
                            }
                        } else if (result[i]['payway'] === '在线支付') {
                            if (result[i]['coupon'] === '0') {
                                e_crash += result[i][key].slice(1) * 1
                            } else if (result[i]['coupon'] === '1') {
                                e_crash += result[i][key].slice(1) * 1 - 2
                                coupon += 2
                                coupon_count++
                            } else if (result[i]['coupon'] === '2') {
                                e_crash += result[i][key].slice(1) * 1 - 3
                                coupon += 3
                                coupon_count++
                            }                            
                        } else {

                        }
                    }
                }
                if (i === result.length - 1) {
                    let total = crash + e_crash + coupon
                    let crash_rate = Math.round((crash / total) * 100)
                    let e_crash_rate = Math.round((e_crash / total) * 100)
                    let coupon_rate = Math.round((coupon / total) * 100)
                    res.status(200).json({
                        err_code: 0,
                        crash: crash_rate,
                        e_crash: e_crash_rate,
                        coupon: coupon_rate
                    })
                }
            }
        }
    })
})

router.get('/datashowParkStatus', verify, (req, res) => {
    Order.find({}, (err,result) => {
        if (err) throw 'find Park Status'

        let defaultPark = []
        for (let j = 0; j < PARKID.length; j++) {
            defaultPark.push({ name: PARKID[j]})
        }
        Park.find({}, (err, result) => {
            if (err) throw err
            if (result.length === 0) {
                for (let i = 0; i < PARKIDCOUNT; i++) {
                    new Park(defaultPark[i]).save((err) => {
                        if (err) console.log('init Park defeat')
                    })
                }
            }
        })
        let park = {}
        for (let j = 0; j < PARKID.length; j++) {
            park[PARKID[j]] = 0
        }
        if (result.length !== 0) {
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < PARKID.length; j++) {
                    switch (result[i].parkId) {
                        case PARKID[j]:
                            park[PARKID[j]]++
                            break
                        default:
                            break
                    }
                }
                if (i === result.length - 1) {
                    for (let key in park) {
                        let data = {
                            status: 0,
                            name: '',
                            count: 0
                        }
                        if (park[key] > 0 && park[key] < 90) {
                            data.status = 0
                            data.name = key
                            data.count = park[key]
                            Park.updateOne({name: key}, data, err => {
                                if (err) console.log(err)
                            })
                        } else if (park[key] > 90 && park[key] < 100) {
                            data.status = 1
                            data.name = key
                            data.count = park[key]
                            Park.updateOne({name: key}, data, err => {
                                if (err) console.log(err)
                            })
                        } else {
                            data.status = 2
                            data.name = key
                            data.count = park[key]
                            Park.updateOne({name: key}, data, err => {
                                if (err) console.log(err)
                            })
                        }

                        if (key === 'C4') {
                            Park.find({}, (err, result) => {
                                if (err) throw 'park find err'
                                if (result !== 0) {
                                    res.status(200).json({
                                        err_code: 0,
                                        parkStatus: result
                                    })
                                }
                            })
                        }                   
                    }
                }
            }
        }
    })
})

router.get('/parkMoneyOrder', verify, (req, res) => {
    let park = {}
    for (let j = 0; j < PARKID.length; j++) {
        park[PARKID[j]] = 0
    }

    Order.find({}, (err, result) => {
        if (err) throw FIND_ALL_ORDER_ERR_IN_GET_PARKMONEYORDER
        if (result.length !== 0) {
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < PARKID.length; j++) {
                    switch (result[i].parkId) {
                        case PARKID[j]:
                            park[PARKID[j]] += result[i].money.slice(1) * 1
                            break
                        default:
                            break
                    }
                }
                if (i === result.length - 1) {
                    res.status(200).json({
                        err_code: 0,
                        parkMoney: park
                    })
                }
            }
        }
    })
})

router.get('/parkInOutStatistics', verify, (req, res) => {
    let now = new Date().getTime()
    let park = {}
    for (let i = 0; i < INOUTCARCOUNT.length; i++) {
        park[INOUTCARCOUNT[i]] = 0
    }

    Order.find({}, (err, result) => {
        if (err) throw FIND_ALL_ORDER_ERR_IN_GET_PARKINOUTSTATISTICS
        if (result.length !== 0) {
            for (let i = 0; i < result.length; i++) {
                for (let key in result[i]) {
                    if (key === 'start') {
                        let start = new Date(result[i][key]).getTime()
                        let end = new Date(result[i]['end']).getTime()
                        if (end >= start && end < now ) {
                            park['in']++
                            park['out']++
                        } else if (end >= start && start <= now && end >= now) {
                            park['in']++
                            park['berth']++
                        } else if (end >= start && start > now) {

                        }
                    }
                }
                if (i === result.length - 1) {
                    res.status(200).json({
                        err_code: 0,
                        num: park
                    })
                }
            }
        }
    })
})

router.get('/parkInCarInfo', verify, (req, res) => {
    let table = []
    let tmp = {
        passageway: '',
        time: '',
        carId: ''
    }
    Order.find().sort({_id: -1}).limit(4).find((err, result) => {
        if (err) throw FIND_ALL_ERR_IN_GET_PARKINCARINFO
        if (result.length !== 0) {
            for (let i = 0; i < result.length; i++) {
                for (let key in result[i]) {
                    if (key === 'start') {    
                        tmp.time = result[i][key].slice(10)
                    } else if (key === 'carId') {
                        tmp.carId = result[i][key]
                    } else if (key === 'inparkway') {
                        tmp.passageway = result[i][key]
                    }
                }
                table.push(tmp)
                tmp = {
                    passageway: '',
                    time: '',
                    carId: ''
                }
                if (i === result.length - 1) {
                    res.status(200).json({
                        err_code: 0,
                        table: table
                    })
                }
            }
        }
    })
})

router.get('/parkOutCarInfo', verify, (req, res) => {
    let table = []
    let tmp = {
        passageway: '',
        time: '',
        carId: ''
    }
    Order.find().sort({_id: -1}).limit(4).find((err, result) => {
        if (err) throw FIND_ALL_ERR_IN_GET_PARKINCARINFO
        if (result.length !== 0) {
            for (let i = 0; i < result.length; i++) {
                for (let key in result[i]) {
                    if (key === 'start') {    
                        tmp.time = result[i][key].slice(10)
                    }
                    if (key === 'carId') {
                        tmp.carId = result[i][key]
                    }
                    if (key === 'outparkway') {
                        tmp.passageway = result[i][key]
                    }
                }
                table.push(tmp)
                tmp = {
                    passageway: '',
                    time: '',
                    carId: ''
                }
                if (i === result.length - 1) {
                    res.status(200).json({
                        err_code: 0,
                        table: table
                    })
                }
            }
        }
    })
})

router.get('/parkAbnormalOp', verify, (req, res) => {
    let table = []
    let tmp = {
        passageway: '',
        time: '',
        who: '',
        reason: ''
    }
    Order.find({}, (err, result) => {
        if (err) throw FIND_ALL_ERR_IN_GET_PARKABNORMALOP
        if (result.length !== 0) {
            for (let i = 0; i < result.length; i++) {
                for (let key in result[i]) {
                    if (result[i][key] === '未支付') {
                        let j = Math.round(Math.random() * 2)

                        tmp.passageway = result[i].outparkway
                        tmp.time = result[i].end.slice(10)
                        tmp.reason = REASON[j]
                        tmp.who = PICKMONEY[j]

                        table.push(tmp)
                    } else {
                        continue
                    }
                }

                tmp = {
                    passageway: '',
                    time: '',
                    who: '',
                    reason: ''
                }
                if (i === result.length - 1) {
                    res.status(200).json({
                        err_code: 0,
                        table: table
                    })
                }
            }
        }
    })
})

router.get('/berthRate', (req, res) => {
    let now = new Date()
    let extra = 0
    let rate = {
        0: 0,
        2: 0,
        4: 0,
        6: 0,
        8: 0,
        10: 0,
        12: 0,
        14: 0,
        16: 0,
        18: 0,
        20: 0,
        22: 0,
        24: 0
    }
    let time = []
    Order.find({}, (err, result) => {
        if (err) throw FIND_ALL_ERR_IN_GET_BERTHRATE
        if (result.length !== 0) {
            for (let i = 0; i< result.length; i++) {
                for (let key in result[i]) {
                    if (key === 'start' || key === 'end') {
                        time.push(new Date(result[i][key]).getTime())
                    }
                }
                if (i === result.length - 1) {
                    for (let i = 0; i < time.length; i++) {
                        if (i % 2 - 1 === 0 && i !== 27) {
                            continue
                        } else {
                            if (new Date(time[i]).getDate() === now.getDate() && new Date(time[i+1]).getDate() === now.getDate() && 0 < new Date(time[i]).getHours() <= 1 && new Date(time[i]).getHours() < new Date(time[i+1]).getHours() <= 1) {
                                rate['2']++
                            } else if (new Date(time[i]).getDate() === now.getDate() && new Date(time[i+1]).getDate() === now.getDate() && 1 < new Date(time[i]).getHours() <= 3 && new Date(time[i]).getHours() < new Date(time[i+1]).getHours() <= 3) {
                                rate['4']++
                            } else if (new Date(time[i]).getDate() === now.getDate() && new Date(time[i+1]).getDate() === now.getDate() && 3 < new Date(time[i]).getHours() <= 5 && new Date(time[i]).getHours() < new Date(time[i+1]).getHours() <= 5) {
                                rate['6']++
                            } else if (new Date(time[i]).getDate() === now.getDate() && new Date(time[i+1]).getDate() === now.getDate() && 5 < new Date(time[i]).getHours() <= 7 && new Date(time[i]).getHours() < new Date(time[i+1]).getHours() <= 7) {
                                rate['8']++
                            } else if (new Date(time[i]).getDate() === now.getDate() && new Date(time[i+1]).getDate() === now.getDate() && 7 < new Date(time[i]).getHours() <= 9 && new Date(time[i]).getHours() < new Date(time[i+1]).getHours() <= 9) {
                                rate['10']++
                            } else if (new Date(time[i]).getDate() === now.getDate() && new Date(time[i+1]).getDate() === now.getDate() && 9 < new Date(time[i]).getHours() <= 11 && new Date(time[i]).getHours() < new Date(time[i+1]).getHours() <= 11) {
                                rate['12']++
                            } else if (new Date(time[i]).getDate() === now.getDate() && new Date(time[i+1]).getDate() === now.getDate() && 11 < new Date(time[i]).getHours() <= 13 && new Date(time[i]).getHours() < new Date(time[i+1]).getHours() <= 13) {
                                rate['14']++
                            } else if (new Date(time[i]).getDate() === now.getDate() && new Date(time[i+1]).getDate() === now.getDate() && 13 < new Date(time[i]).getHours() <= 15 && new Date(time[i]).getHours() < new Date(time[i+1]).getHours() <= 15) {
                                rate['16']++
                            } else if (new Date(time[i]).getDate() === now.getDate() && new Date(time[i+1]).getDate() === now.getDate() && 15 < new Date(time[i]).getHours() <= 17 && new Date(time[i]).getHours() < new Date(time[i+1]).getHours() <= 17) {
                                rate['18']++
                            } else if (new Date(time[i]).getDate() === now.getDate() && new Date(time[i+1]).getDate() === now.getDate() && 17 < new Date(time[i]).getHours() <= 19 && new Date(time[i]).getHours() < new Date(time[i+1]).getHours() <= 19) {
                                rate['20']++
                            } else if (new Date(time[i]).getDate() === now.getDate() && new Date(time[i+1]).getDate() === now.getDate() && 19 < new Date(time[i]).getHours() <= 21 && new Date(time[i]).getHours() < new Date(time[i+1]).getHours() <= 21) {
                                rate['22']++
                            } else if (new Date(time[i]).getDate() === now.getDate() && new Date(time[i+1]).getDate() === now.getDate() && 21 < new Date(time[i]).getHours() <= 23 && new Date(time[i]).getHours() < new Date(time[i+1]).getHours() <= 23) {
                                rate['24']++
                            } else {
                                extra++
                            }
                        }
                        if (i === time.length - 1) {
                            for (let key in rate) {
                                rate[key] = rate[key] / TOTAL
                                if (key === '24') {
                                    res.status(200).json({
                                        err_code: 0,
                                        rate: rate
                                    })
                                }
                            }
                        }
                    }
                }
            }
        }
    })
})

module.exports = router
