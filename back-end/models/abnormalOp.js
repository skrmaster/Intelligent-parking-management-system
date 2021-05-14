var mongoose = require('mongoose')
var Schema = mongoose.Schema

var conn = mongoose.createConnection('mongodb://localhost/abnormalOp', 
{
    useFindAndModify: false, 
    useCreateIndex: true , 
    useUnifiedTopology: true, 
    useNewUrlParser: true
})

var abOp = new Schema({
    way: String,
    name: String,
    time: {
        type: Date,
        default: Date.now
    },
    reason: String
})

module.exports = conn.model('adnormalOrder', abOp)
