const worker = {}

//dependecies
const data = require('./data')

worker.gatherAllChecks = () => {
    data.list('checks', (err1, checks) => {
        if (!err1 && checks && checks.length > 0) {
            checks.forEach(check => {
                data.read('checks', check, (err2, checkData) => {
                    if (!err2 && checkData) {
                        const checkObject = parseJSON(checkData)
                        worker.validateCheckData(checkObject)
                    }
                    else {
                        console.log('No data found');

                    }
                })
            });
        }
        else {
            console.log('No cheks found to read');

        }
    })
}
worker.loop = () => {
    setInterval(() => {
        worker.gatherAllChecks()
    }, 1000 * 60)
}
worker.init = () => {
    // worker.loop()
    worker.gatherAllChecks()
}

module.exports = worker