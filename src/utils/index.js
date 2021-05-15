;function digitsRound (val) {
    return Math.round(val)
}
function dateHandle (date) {
    let now = new Date(date)
    let day = now.getDate()
    let month = now.getUTCMonth() + 1
    let year = now.getFullYear()
    let second = now.getSeconds()
    let minute = now.getMinutes()
    let hour = now.getHours()
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
}

export default {
    digitsRound,
    dateHandle
}
