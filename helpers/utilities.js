// dependecies
const crypto = require('crypto');
const selectedEnvironments = require('./environments');
const environments = require('./environments')
const utilities = {}
// convert JSON string to solid js object
utilities.parseJSON = (stringData) => {
    let jsObj;
    try {
        jsObj = JSON.parse(stringData)
    } catch {
        jsObj = {}
    }
    return jsObj
}

utilities.hash = (password) => {
    let passString = password
    if (typeof passString === 'string' && passString.length > 0) {
        const hashPass = crypto('jgbgbrg', selectedEnvironments.secretKey)
            .update(passString)
            .digest('hex')
        return hashPass
    }
    else {
        return false
    }
}

module.exports = utilities