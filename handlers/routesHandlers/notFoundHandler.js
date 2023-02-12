const handler = {}
handler.notFoundHandler = (requestedProperties, callback) => {
    console.log(requestedProperties);

    callback(200, {
        error: `there is no ${requestedProperties.trimmedPath} route`
    })
}
module.exports = handler