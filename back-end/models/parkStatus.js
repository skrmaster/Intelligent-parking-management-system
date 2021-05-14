var mongoose = require('mongoose')
var Schema = mongoose.Schema

var conn = mongoose.createConnection('mongodb://localhost/parkStatus', 
{
    useFindAndModify: false, 
    useCreateIndex: true , 
    useUnifiedTopology: true, 
    useNewUrlParser: true
})

var imitate = new Schema({
    name: {
        type: String,
        default: '测试机'
    },
    status: {
        type: Number,
        enum: [0, 1, 2],
        default: 0
    },
    count: {
        type: Number,
        default: 0
    }
})

module.exports = conn.model('park', imitate)
