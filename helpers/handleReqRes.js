// module scaffolding 
const handler = {}
// dependecies
const url = require('url')
const { StringDecoder } = require('string_decoder')
const { routes } = require('../routes')
const { notFoundHandler } = require('../handlers/routesHandlers/notFoundHandler')

handler.handleReqRes = (req, res) => {
    const parsedUrl = url.parse(req.url, true)
    // console.log(parsedUrl);
    const path = parsedUrl.pathname
    const trimmedPath = path.replace(/^\/+|\/+$/g, '')
    const queryStringObj = parsedUrl.query
    const headersObj = req.headers;
    const methods = req.method.toLowerCase()

    const decoder = new StringDecoder('utf-8')
    let realData = ''
    const requestedProperties = {
        parsedUrl, headersObj, queryStringObj, path, trimmedPath, methods
    }
    const choosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler

    choosenHandler(requestedProperties, (statusCode, payload) => {
        const status = typeof statusCode === 'number' ? statusCode : 500
        const payloadData = typeof payload === 'object' ? payload : {}
        const payLoadString = JSON.stringify(payloadData)
        res.writeHead(statusCode)
        res.end(payLoadString)
    })
    req.on('data', (buffer) => {
        realData += decoder.write(buffer)
    })
    req.on('end', () => {
        realData += decoder.end()
        console.log(realData);
        res.end('Uptime API Monitoring Projects is Running')
    })
}
module.exports = handler