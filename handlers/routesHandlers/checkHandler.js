// dependecies
const { hash, parseJSON } = require("../../helpers/utilities")
const data = require("../../lib/data")
const toke = require('./tokenHandler')
const handler = {}
handler.checkHandler = (requestedProperties, callback) => {
    const acceptedMethods = ['post', 'get', 'put', 'delete']
    if (acceptedMethods.indexOf(requestedProperties.methods) > -1) {
        handlers._check[requestedProperties.methods](requestedProperties, callback)
    }
    else {
        callback(405, {
            error: 'Its not accepted method'
        })

    }

}
const handlers = {}
handlers._check = {}
handlers._check.post = (requestedProperties, callback) = {
    const protocol = typeof (requestedProperties.body.protocol) === 'string' && ['http', 'https'].indexOf(requestedProperties.body.protocol) > -1 ? requestedProperties.body.protocol : false
    
    const url = typeof (requestedProperties.body.url) === 'string' && requestedProperties.body.url.length > 1 ? requestedProperties.body.url : false 

    const method = typeof (requestedProperties.body.method) === 'string' && ['get', 'post', 'put', 'delete'].indexOf(requestedProperties.body.method) > -1 ? requestedProperties.body.method : false
    
    const successCode = typeof (requestedProperties.body.successCode) === 'object' && requestedProperties.body.successCode instanceof Array ? requestedProperties.body.successCode : false

    const timeoutSec = typeof (requestedProperties.body.time) === 'number' && requestedProperties.body.time >= 1 && requestedProperties.body.time <= 5 && requestedProperties.body.time % 1 === 0 ? requestedProperties.body.time : false

    if(protocol&& url && method && successCode && timeoutSec) {
    const tokenId = typeof (requestedProperties.headersObj.token) === 'string' && requestedProperties.headersObj.token.length === 20 ? requestedProperties.headersObj.token : false
}
    else {
    callback(404, {
        error: 'You have request to your problem'
    })
}
}

handlers._user.get = (requestedProperties, callback) = {

}
handlers._user.put = (requestedProperties, callback) = {

}
handlers._user.delete = (requestedProperties, callback) = {

}
module.exports = handler