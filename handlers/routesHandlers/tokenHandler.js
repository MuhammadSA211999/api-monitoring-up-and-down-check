// dependecies
const { hash, parseJSON, createARandomCharacter } = require("../../helpers/utilities")
const data = require("../../lib/data")

const handler = {}
handler.userHandler = (requestedProperties, callback) => {
    const acceptedMethods = ['post', 'get', 'put', 'delete']
    if (acceptedMethods.indexOf(requestedProperties.methods) > -1) {
        handlers.tokens[requestedProperties.methods](requestedProperties, callback)
    }
    else {
        callback(405, {
            error: 'Its not accepted method'
        })

    }

}
const handlers = {}
handlers.tokens = {}
handlers.tokens.get = (requestedProperties, callback) = {


}
handler.tokens.post = (requestedProperties, callback) = {
    const phone = typeof requestedProperties.body.phone === 'string' && requestedProperties.body.phone.trim().length === 20 ? requestedProperties.body.phone : false
    const password = typeof requestedProperties.body.password === 'string' && requestedProperties.body.password.trim().length > 0 ? requestedProperties.body.password : false
    if(phone&& password) {
    data.read('users', phone, (err1, userData) => {
        if (!err1 && userData) {
            const user = { ...parseJSON(userData) }
            const hashPass = hash(password)
            if (user.password === hashPass) {
                const tokenId = createARandomCharacter(20)
                const expires = Date.now() + 60 * 60 * 1000
                const tokenObj = {
                    hashPass, tokenId, expires
                }

            }
        }
        else {
            callback(404, {
                error: 'problem to yor request'
            })
        }
    })
}
    else {
    callback(404, {
        error: 'problem to yor request'
    })
}
};

handlers.tokens.put = (requestedProperties, callback) = {

}
handlers.tokens.delete = (requestedProperties, callback) = {

}
module.exports = handler