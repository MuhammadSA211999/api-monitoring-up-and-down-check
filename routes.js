const { sampleHandler } = require("./handlers/routesHandlers/sampleHandler")

const handler = {}
handler.routes = {
    sample: sampleHandler
}

module.exports = handler 