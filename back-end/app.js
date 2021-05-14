var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')

var sign = require('./routes/sign')
var infoChange = require('./routes/infoChange')
var orderPage = require('./routes/orderPage')
var personal = require('./routes/personal')
var datacenter = require('./routes/datacenter')
var memberPage = require('./routes/memberPage')

var app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/public', express.static(path.join(__dirname, './public/')))

app.use(sign)
app.use(infoChange)
app.use(orderPage)
app.use(personal)
app.use(datacenter)
app.use(memberPage)

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With')
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8")
    next()
})

app.listen('3000', (err) => {
    if (err) throw err
    console.log('running in 3000······')
})

module.exports = app
