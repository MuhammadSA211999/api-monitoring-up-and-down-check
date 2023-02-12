// dependecies
const http = require('http')
const url = require('url')
const { StringDecoder } = require('string_decoder')
const { handleReqRes } = require('./helpers/handleReqRes')
const selectedEnvironments = require('./helpers/environments')
const data = require('./lib/data')

// app object, module scaffolding 
const app = {}
//app configuration
app.config = {
    port: 3000
}

// testing file system for create,read,update and delete
// data creating
// data.create('test', 'newFile', { name: 'muhammad sa', age: '35 year' }, (error) => {
//     console.log(error);
// })

// data reading
// data.read('test', 'newFile', (response) => {
//     console.log(response);
// })
// // data updating
// data.update('test', 'newFile', { name: 'addel fatih', age: '30' }, (response) => {
//     console.log(response);
// })

// data deleting
// data.delete('test', 'newFile', (response) => {
//     console.log(response);
// })


// create the server 
app.createServer = () => {
    const server = http.createServer(app.handleReRes)
    server.listen(selectedEnvironments.port, () => {
        console.log(`server is successfully connected to port ${selectedEnvironments.port}`);

    })

}
// handle Request, Response 
app.handleReRes = handleReqRes

// start the server
app.createServer()