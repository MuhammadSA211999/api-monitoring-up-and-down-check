const { sampleHandler } = require("./handlers/routesHandlers/sampleHandler")
const { userHandler } = require('./handlers/routesHandlers')

const handler = {}
handler.routes = {
    sample: sampleHandler,
    user: userHandler.userHandler,
    check: checkHandler
}

module.exports = handler 