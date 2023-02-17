// dependecies
const { hash, parseJSON, createARandomCharacter } = require("../../helpers/utilities")
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

    //lookup the token for verification
    data.read('tokens', tokenId, (err1, tokenData) => {
        if (!err1 && tokenData) {
            const tokenObj = { ...parseJSON(tokenData) }
            const phone = tokenObj.phone
            // lookup the users
            data.read('users', phone, (err2, userData) => {
                if (!err2 && userData) {
                    const user = { ...parseJSON(userData) }
                    tokenHandler.token._verify(tokenId, phone, (isValid) => {
                        if (isValid) {
                            const checks = typeof user.checks === 'object' && user.checks instanceof Array ? user.checks : []
                            if (checks.length < 5) {
                                const checkObj = {
                                    checkId = createARandomCharacter(20),
                                    phone: phone,
                                    protocol: protocol,
                                    method: method,
                                    url: url,
                                    successCode: successCode,
                                    timeoutSec
                                }
                                data.create('checks', checkId, checkObj, (err2) => {
                                    if (!err2) {
                                        userObj.checks.push(checkId)
                                        // update the user file
                                        data.update('users', phone, userObj, (err3) => {
                                            if (!err3) {
                                                callback(200, {
                                                    message: 'successfully update the the users'
                                                })
                                            }
                                            else {
                                                callback(500, {
                                                    error: 'something went wrong'
                                                })
                                            }
                                    else {
                                                callback(500, {
                                                    error: 'something went wrong'
                                                })
                                            }
                                        })
                                    }
                                    else {
                                        callback(401, {
                                            error: 'could not create the check'
                                        })
                                    }
                                })
                            }
                            else {
                                callback(401, {
                                    error: 'You has already reached the checks limit'
                                })
                            }

                        }
                        else {
                            callback(500, {
                                error: 'token is not valid'
                            })
                        }
                    })
                }
                else {
                    callback(500, {
                        error: 'server side problem'
                    })
                }
            })
        }
        else {
            callback(403, {
                error: 'authentication failed'
            })
        }
    })
}
    else {
    callback(404, {
        error: 'You have request to your problem'
    })
}
}

handlers._check.get = (requestedProperties, callback) = {
    const id = typeof (requestedProperties.queryStringObject.id) === 'string' && requestedProperties.queryStringObject.id.length === 20 ? requestedProperties.queryStringObject.id : false  
    if(id) {
        data.read('checks', id, (err1, check) => {
            if (!err1 && checkData) {
                const checkObj = parseJSON(checkData)
                const tokenId = typeof (requestedProperties.headersObj.token) === 'string' && requestedProperties.headersObj.token.length === 20 ? requestedProperties.headersObj.token : false
                if (tokenId) {
                    tokenHandler._token.verify(tokenId, checkObj.phone, (isValid) => {
                        if (isValid) {
                            callback(200, { checkObj: checkObj })
                        }
                        else {
                            callback(500, {
                                error: 'server side error'
                            })
                        }
                    })
                }
                else {

                }
            }
            else {
                callback(404, {
                    error: 'could not found the check'
                })
            }
        })
    }
    else{

    }

}
handlers._check.put = (requestedProperties, callback) = {

    const id = typeof (requestedProperties.queryStringObject.id) === 'string' && requestedProperties.queryStringObject.id.length === 20 ? requestedProperties.queryStringObject.id : false 

    const protocol = typeof (requestedProperties.body.protocol) === 'string' && ['http', 'https'].indexOf(requestedProperties.body.protocol) > -1 ? requestedProperties.body.protocol : false
    
    const url = typeof (requestedProperties.body.url) === 'string' && requestedProperties.body.url.length > 1 ? requestedProperties.body.url : false 

    const method = typeof (requestedProperties.body.method) === 'string' && ['get', 'post', 'put', 'delete'].indexOf(requestedProperties.body.method) > -1 ? requestedProperties.body.method : false
    
    const successCode = typeof (requestedProperties.body.successCode) === 'object' && requestedProperties.body.successCode instanceof Array ? requestedProperties.body.successCode : false

    const timeoutSec = typeof (requestedProperties.body.time) === 'number' && requestedProperties.body.time >= 1 && requestedProperties.body.time <= 5 && requestedProperties.body.time % 1 === 0 ? requestedProperties.body.time : false

    if(id) {
        if (protocol || url || method || timeoutSec || successCode) {

            const tokenId = typeof (requestedProperties.headersObj.token) === 'string' && requestedProperties.headersObj.token.length === 20 ? requestedProperties.headersObj.token 
        
        data.read('cheaks', id, (err1, checkData) => {
                if (!err1 && checkData) {
                    const cheackObj = parseJSON(checkData)
                    tokenHandler._token.verif(tokenId, checkObj.phone, (isValid) => {
                        if (isValid) {
                            if (protocol) {
                                cheackObj.protocol = protocol
                            }
                            if (url) {
                                cheackObj.url = url
                            }
                            if (successCode) {
                                cheackObj.successCode = successCode
                            }
                            if (method) {
                                cheackObj.method = method
                            }
                            if (timeoutSec) {
                                cheackObj.timeoutSec = timeoutSec
                            }
                            data.update('checks', id, tokenObj, (err4) => {
                                if (!err4) {
                                    callback(200, {
                                        message: 'successfully update the cheack'
                                    })
                                }
                                else {
                                    callback(500, {
                                        error: 'could not update the cheack'
                                    })
                                }
                            })
                        }
                        else {
                            callback(403, {
                                error: 'unauthorized request'
                            })
                        }
                    })
                }
                else {

                }
            })
        }
        else {
            callback(400, {
                error: 'You have request to your problem'
            })
        }
    }
    else{
        callback(400, {
            error:'You have request to your problem'
        })
    }
}
handlers._check.delete = (requestedProperties, callback) = {

}
module.exports = handler