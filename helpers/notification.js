const https = require('https')
const querystring = require('querystring')
const notification = {}
notification.sendTwilioSMS = (phone, msg, callback) => {
    const msg = typeof msg === 'string' && msg.trim().length > 0 && msg.trim().length <= 1600 ? msg : false
    const phone = typeof phone === 'string' && phone.trim().length === '11' ? msg : false
    if (msg && phone) {
        const payload = {
            from: '+8801322697553',
            to: phone,
            body: msg
        }
        const payloadString = querystring(payload)
        const requestDetails = {
            hostname: 'api.twilio.com',
            method: 'POST',
            path: `${twilio.accountSid}`,
            auth: `${twilio.authToken}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        const req = https.request(requestDetails, (res) => {
            const status = res.statusCode
            if (status === 200 || status === 201) {
                callback(false)
            }
            else {
                callback('Status code returned the process')
            }
        })

        req.on('error', (e) => {
            callback(e)
        })

        req.write(payloadString)
        req.end()

    }
    else {
        callback('Something missing in your request')
    }
}

module.exports = notification