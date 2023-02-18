const worker = {}

//dependecies
const data = require('./data')

worker.validateCheckData = (checkObject) => {
    const orginalCheck = checkObject
    if (orginalCheck && orginalCheck.id) {
        orginalCheck.state = typeof (orginalCheck.state) === 'string' && ['up', 'down'].indexOf(orginalCheck.state) ? orginalCheck.state : 'down'
        orginalCheck.lastChecked = typeof (orginalCheck.lastChecked) === 'number' && orginalCheck.lastChecked > 0 ? orginalCheck.lastChecked : false
        //pass check to next process
        worker.perform(orginalCheck)
    }
    else {
        console.log('Check is invalid');

    }


}
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