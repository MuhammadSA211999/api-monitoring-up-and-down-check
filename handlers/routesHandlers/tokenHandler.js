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
    const id = typeof requestedProperties.queryStringObj.id === 'string' && requestedProperties.queryStringObj.id.length === 20 ? requestedProperties.queryStringObj.id : false 
    if(id) {
        data.read('tokens', id, (err, token) => {
            if (!err && token) {
                const tokenObj = { ...parseJSON(token) }
                callback(200, {
                    message: `Your token is ${tokenObj}`
                })
            }
            else {
                callback(500, {
                    message: `Your token can not found`
                })
            }
        })
    }

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
                    hashPass, id: tokenId, expires
                }
                data.create('tokens', tokenId, tokenObj, (err) => {
                    if (!err) {
                        callback(200, {
                            message: 'token created successfully'
                        })
                    }
                    else {
                        callback(500, {
                            message: 'could not create token'
                        })
                    }
                })

            }
            else {
                return false
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
    const id = typeof requestedProperties.body.id === 'string' && requestedProperties.body.id.trim().length === 20 ? requestedProperties.body.id : false
   const extend = typeof requestedProperties.body.extend === 'boolean' && requestedProperties.body.id === 'true' ? true : false

   if(id&& extend) {
    data.read('tokens', id, (err1, token) => {
        if (!err1) {
            const tokenObj = { ...parseJSON(token) }
            //    const expires=tokenObj.expires<Date.now()?true:false
            if (tokenObj.expires > Date.now()) {
                // tokenObj.expires>Date.now() mean token have time, extend the time
                tokenObj.expires = Date.now() + 60 * 60 * 1000
                data.update('tokens', id, tokenObj, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: 'successfully update the token'
                        })
                    }
                    else {
                        callback(500, {
                            error: 'error occured to update the token'
                        })
                    }
                })
            }
            else {

            }
        }
        else {

        }
    })
}
   else {

}
}
handlers.tokens.delete = (requestedProperties, callback) = {
    const id = typeof requestedProperties.body.id === 'string' && requestedProperties.body.id.trim().length === 20 ? requestedProperties.body.id : false   
    if(id) {
        data.delete('tokens', id, (err) => {
            if (!err) {
                callback(200, {
                    message: 'deleted the token successfully'
                })
            }
            else {
                callback(500, {
                    message: 'error occured to deleted the token'
                })
            }
        })
    }
}
handler._token.verify = (id, phone, callback) => {
    data.read('tokens', id, (err1, token) => {
        if (!err && token) {
            const tokenObj = { ...parseJSON(token) }
            if (tokenObj.phone === phone && tokenObj.expires > Date.now()) {
                callback(true)
            }
            else {
                callback(false)
            }
        }
        else {
            callback(false)
        }

    })
}
module.exports = handler