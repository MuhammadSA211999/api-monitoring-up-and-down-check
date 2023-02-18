const worker = {}

worker.gatherAllChecks = () => {

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