var mongoose = require('mongoose')
var Schema = mongoose.Schema

const conn = mongoose.createConnection('mongodb://localhost/carOrders', 
{
    useFindAndModify: false, 
    useCreateIndex: true , 
    useUnifiedTopology: true, 
    useNewUrlParser: true
})

var orderModel = new Schema({
    index: String,
    carId: String,
    payStatus: String,
    parkId: {
        type: String,
        enum:['C1', 'C2', 'C3', 'C4']
    },
    inparkway: {
        type: String,
        enum: ['A1', 'A2', 'A3', 'A4']
    },
    outparkway: {
        type: String,
        enum: ['B1', 'B2', 'B3', 'B4']
    },
    payway: {
        type: String,
        enum: ['在线支付','现金', '无']
    },
    money: String,
    coupon: {
        type: String,
        enum: ['0', '1', '2'],
        default: '0'
    },
    start: String,
    end: String, 
})

module.exports = conn.model('Order', orderModel)
