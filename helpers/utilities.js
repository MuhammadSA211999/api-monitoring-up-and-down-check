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
utilities.createARandomCharacter = (strLength) => {
    let length;
    length = typeof strLength === 'number' && length > 19 ? strLength : false
    if (length) {
        const possibleCharacter = 'qwertyuiioplkjhgfdsazcvbnm1234567890><';
        let output;
        for (let i = 1; i <= length, i += 1) {
            const randomCharacter = possibleCharacter.charAt(Math.floor(Math.random() * possibleCharacter.length))
            output += randomCharacter
        }
        return output
    }
    return false
}

module.exports = utilities