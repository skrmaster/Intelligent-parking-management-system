var fs = require('fs')
var path = require('path')

var secret = fs.readFileSync(path.join(__dirname, './secretKey.pem'), 'utf-8', (err, data) => {
    if (err) throw err
    return data
})

module.exports = secret
