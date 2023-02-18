const worker = {}

//dependecies
const data = require('./data')
const url = require('url')
const http = require('http')
const https = require('https')

worker.validateCheckData = (checkObject) => {
    const orginalCheck = checkObject
    if (orginalCheck && orginalCheck.id) {
        orginalCheck.state = typeof (orginalCheck.state) === 'string' && ['up', 'down'].indexOf(orginalCheck.state) ? orginalCheck.state : 'down'
        orginalCheck.lastChecked = typeof (orginalCheck.lastChecked) === 'number' && orginalCheck.lastChecked > 0 ? orginalCheck.lastChecked : false
        //pass check to next process
        worker.performCheck(orginalCheck)
    }
    else {
        console.log('Check is invalid');

    }


}

worker.performCheck = (checkObject) => {
    //prepare the initial check outcome 
    const outcomeCheck = {
        error: false,
        responseCode: false
    }
    //track the response 
    let outcomeSent = false

    const parsedUrl = url.parse(checkObject.protocol + '://' + checkObject.url, true)
    const { path, hostName } = parsedUrl
    const requestDetails = {
        path, hostName, method: parsedUrl.method.toUpperCase(), protocol: checkObject.protocol
    }
    const userProtocol = checkObject.protocol === 'http' ? http : https
    // userProtocol mean http or https 
    const req = userProtocol.request(requestDetails, (res) => {
        const status = res.statusCode
        if (!outcomeSent) {
            worker.processCheckOutCome(checkObject, outcomeCheck)
            outcomeSent = true
        }
    })
    req.on('error', (e) => {
        const errorOutCome = {
            error: true,
            value: e
        }
        if (!outcomeSent) {
            worker.processCheckOutCome(checkObject, errorOutCome)
            outcomeSent = true
        }
    })
    req.on('timeout', () => {
        const timeoutOutCome = {
            error: true,
            value: 'timeout'
        }
        if (!outcomeSent) {
            worker.processCheckOutCome(checkObject, timeoutOutCome)
            outcomeSent = true
        }
    })
}

worker.processCheckOutCome = (checkObject, timeoutOutCome) => {
    const state = timeoutOutCome.error && timeoutOutCome.responseCode && checkObject.successCode.indexOf(timeoutOutCome.responseCode) > -1 ? 'up' : 'down'
    const alertWanted = !!(checkObject.lastChecked && checkObject.state !== state)
    let newCheckData = checkObject
    newCheckData.state = state
    newCheckData.lastChecked = Date.now()
    data.update('checks', newCheckData.id, newCheckData, (err) => {
        if (!err) {
            worker.alertUserBySMSAboutStateChanged(newCheckData)
        }
        else {
            console.log('Error trying to save check data');

        }
    })
}
// send notification sms to user abou state changed 
worker.alertUserBySMSAboutStateChanged = (newCheckData) => {

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