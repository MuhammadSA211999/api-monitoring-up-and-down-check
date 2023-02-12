const handler = {}
handler.sampleHandler = (requestedProperties, callback) => {
    callback(200, {
        message: 'this is sample handler'
    })
}
module.exports = handler