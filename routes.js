const { sampleHandler } = require("./handlers/routesHandlers/sampleHandler")
const userHandler = require('./handlers/routesHandlers/userHandler')

const handler = {}
handler.routes = {
    sample: sampleHandler,
    user: userHandler.userHandler
}

module.exports = handler 