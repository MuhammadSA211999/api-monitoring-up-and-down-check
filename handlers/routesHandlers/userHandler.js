// dependecies
const { hash, parseJSON } = require("../../helpers/utilities")
const data = require("../../lib/data")
const toke = require('./tokenHandler')
const handler = {}
handler.userHandler = (requestedProperties, callback) => {
    const acceptedMethods = ['post', 'get', 'put', 'delete']
    if (acceptedMethods.indexOf(requestedProperties.methods) > -1) {
        handlers.users[requestedProperties.methods](requestedProperties, callback)
    }
    else {
        callback(405, {
            error: 'Its not accepted method'
        })

    }

}
const handlers = {}
handlers.users = {}
handlers.users.get = (requestedProperties, callback) = {
    const phone = typeof (requestedProperties.body.phone) === 'string' && requestedProperties.body.phone.trim().length === 11 ? requestedProperties.body.phone : false   
    if(phone) {
        const tokenId = requestedProperties.headersObj.token === 'string'
        tokenHandler._token.verify(tokenId, phone, (isVerify > {
            if(isVerify) {
                data.read('users', phone, (err1, user) => {
                    if (!err1 && user) {
                        const u = { ...parseJSON(user) }
                        delete u.password
                        callback(200, {

                            message: `Your user is => ${u}`
                        })
                    }
                    else {
                        callback(500, {
                            error: 'could not found the user'
                        })
                    }
                })
            }
            else{
                callback(400, {
                    error:'request is not valid'
                })
            }
        }
        }


}
handler.users.post = (requestedProperties, callback) = {
    const firstName = typeof (requestedProperties.body.firstName) === 'string' && requestedProperties.body.firstName.trim().length > 0 ? requestedProperties.body.firstName : false
   const lastName = typeof (requestedProperties.body.lastName) === 'string' && requestedProperties.body.lastName.trim().length > 0 ? requestedProperties.body.lastName : false
   const phone = typeof (requestedProperties.body.phone) === 'string' && requestedProperties.body.phone.trim().length === 11 ? requestedProperties.body.phone : false
   const password = typeof (requestedProperties.body.password) === 'string' && requestedProperties.body.password.trim().length === 11 ? requestedProperties.body.password : false
   const tosAgree = typeof (requestedProperties.body.tosAgree) === 'boolean' && requestedProperties.body.tosAgree.trim() == 'true' ? requestedProperties.body.tosAgree : false

   if(firstName&& lastName && phone && password && tosAgree) {
    //make sure that the user does not exist in db or file sys
    data.read('users', phone, (err1, user) => {
        // err1 =true mean user file nai, create korte hobe 
        if (err1) {
            const userObj = {
                firstName, lastName, phone, tosAgree, password: hash(password)
            }
            //   user create to db 
            data.create('users', phone, userObj, (err2) => {
                if (!err2) {
                    callback(200, {
                        message: 'successfully created user'
                    })
                }
                else {
                    callback(500, {
                        error: 'could not create the user, server side error'
                    })
                }
            })
        }
        else {
            callback(500,
                { error: 'Could not create. The user may alraedy exist' })
        }
    })
}
   else {
    callback(400, {
        erro: 'Problem in your request'
    })
}
};

handlers._user.put = (requestedProperties, callback) = {
    const firstName = typeof (requestedProperties.body.firstName) === 'string' && requestedProperties.body.firstName.trim().length > 0 ? requestedProperties.body.firstName : false
   const lastName = typeof (requestedProperties.body.lastName) === 'string' && requestedProperties.body.lastName.trim().length > 0 ? requestedProperties.body.lastName : false
   const phone = typeof (requestedProperties.body.phone) === 'string' && requestedProperties.body.phone.trim().length === 11 ? requestedProperties.body.phone : false
   const password = typeof (requestedProperties.body.password) === 'string' && requestedProperties.body.password.trim().length === 11 ? requestedProperties.body.password : false

   if(phone) {
        if (firstName || lastName || password) {
            data.read('users', phone, (err1, userData) => {
                if (!err1 && userData) {
                    const user = { ...parseJSON(userData) }
                    if (firstName) {
                        user.firstName = firstName
                    }
                    if (lastName) {
                        user.lastName = lastName
                    }
                    if (password) {
                        user.password = hash(password)
                    }
                    data.update('users', phone, user, (err) => {
                        if (!err) {
                            callback(200, {
                                message: 'successfully updated'
                            })
                        }
                        else {
                            callback(400, {
                                error: 'server side error'
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
                error: 'Nothing to changed'
            })
        }
    }
   else{
        callback(400, {
            error:'Request in your problem'
    })
    }
}
handlers._user.delete = (requestedProperties, callback) = {
    const phone = typeof (requestedProperties.queryStringObj.phone) === 'string' && requestedProperties.queryStringObj.phone.trim().length === 11 ? requestedProperties.queryStringObj.phone : false
    if(phone) {
        data.read('users', phone, (err, user) => {
            if (!err && user) {
                data.delete('users', phone, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: 'data deleted successfully'
                        })
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
        })
    }
    else{
        callback(404, {
            error:'problem to yor request'
        })
    }
}
module.exports = handler