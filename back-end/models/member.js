var mongoose = require('mongoose')
var Schema = mongoose.Schema

const conn = mongoose.createConnection('mongodb://localhost/memberList', 
{
    useFindAndModify: false, 
    useCreateIndex: true , 
    useUnifiedTopology: true, 
    useNewUrlParser: true
})

var memberModel = new Schema({
    id: String,
    carMaster: String,
    carId: String,
    phone: String,
    start: String,
    end: String,
    remarks: {
        type: String,
        default: '无'
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    buyDate: {
        type: Date,
        default: Date.now
    },
    carBrand: String,
    trafficRestriction: String,
    carPark: String,
    address: String,
    setMeal: String
})

module.exports = conn.model('Member', memberModel)
