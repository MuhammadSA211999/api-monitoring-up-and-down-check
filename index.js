// dependecies
const http = require('http')
const url = require('url')
const { StringDecoder } = require('string_decoder')
const { handleReqRes } = require('./helpers/handleReqRes')

// app object, module scaffolding 
const app = {}
//app configuration
app.config = {
    port: 3000
}

// create the server 
app.createServer = () => {
    const server = http.createServer(app.handleReRes)
    server.listen(app.config.port, () => {
        console.log(`server is successfully connected to port ${app.config.port}`);

    })

}
// handle Request, Response 
app.handleReRes = handleReqRes

// start the server
app.createServer()