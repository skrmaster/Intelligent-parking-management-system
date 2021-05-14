var mongoose = require('mongoose')
var Schema = mongoose.Schema

const conn = mongoose.createConnection('mongodb://localhost/admins', 
{
    useFindAndModify: false, 
    useCreateIndex: true , 
    useUnifiedTopology: true, 
    useNewUrlParser: true
})

var adminModel = new Schema({
    adminName: String,
    adminPwd: String,
    adminPhone: String,
    avatar: {
        type: String,
        default: 'default'
    },
    registerTime: {
        type: Date, default: Date.now
    }
})

module.exports = conn.model('adminuser', adminModel)
