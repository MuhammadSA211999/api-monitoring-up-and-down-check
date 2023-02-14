// dependecies
const { hash, parseJSON } = require("../../helpers/utilities")
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
};

handlers.tokens.put = (requestedProperties, callback) = {

}
handlers.tokens.delete = (requestedProperties, callback) = {

}
module.exports = handler