const yargs = require('yargs/yargs')
const {hideBin} = require('yargs/helpers')
const argv = yargs(hideBin(process.argv))
    .usage('Usage: $0 [options]')
    .alias('t', 'target')
    .nargs('t', 1)
    .describe('t', 'target directory for exported data')
    .demandOption(['t'])
    .argv;


function getToken() {
    let token = process.env['STRAVA_ACCESS_TOKEN']
    if (!token) {
        throw new Error("Please provide a value for env STRAVA_ACCESS_TOKEN !")
    }
    return token;
}

function getResourcesDirectory() {
    return argv.target
}

module.exports = {getToken, getResourcesDirectory}
