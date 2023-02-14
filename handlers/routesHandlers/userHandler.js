// dependecies
const { hash } = require("../../helpers/utilities")
const data = require("../../lib/data")

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

    }
    else{
        callback(400, {
            error:'request is not valid'
        })
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

// handlers._user.put = (requestedProperties, callback) = {

// }
// handlers._user.delete = (requestedProperties, callback) = {

// }
module.exports = handler