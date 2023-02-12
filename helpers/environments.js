const environments = {}
environments.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: 'fhgbvbvdsgsbdskjv'
}
environments.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'fhgbvbvdsgsbdskjvdbdb'
}

// determined which environments was passed from cli
const currentEnvironments = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'staging'

// select the environments from environments obj and export 
// export corresponding env obj pro/staging
const selectedEnvironments = typeof environments[currentEnvironments] === 'object' ? environments[currentEnvironments] : environments.staging
module.exports = selectedEnvironments