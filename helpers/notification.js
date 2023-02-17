const https = require('https')
const notification = {}
notification.sendTwilioSMS = (phone, msg, callback) => {
    const msg = typeof msg === 'string' && msg.trim().length > 0 && msg.trim().length <= 1600 ? msg : false
    const phone = typeof phone === 'string' && phone.trim().length === '11' ? msg : false
    if (msg && phone) {

    }
    else {
        callback('Something missing in your request')
    }
}

module.exports = notification