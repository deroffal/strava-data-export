const fsPromise = require("fs/promises")
const fs = require("fs")
const env = require("./env");

const resourcesDirectory = env.getResourcesDirectory()

async function readFile(path) {
    let path1 = `${resourcesDirectory}/${path}`;
    fs.readFileSync("../strava-data-export/data2/2022/athlete_activities.json")
    let promise = fs.readFileSync(path1);
    return fsPromise.readFile(path1)
        .then(content => JSON.parse(content.toString()))
        .catch(_ => [])
}

async function writeFile(jsons, fileName) {
    let directory = resourcesDirectory
    if (fileName.includes("/")) {
        directory = `${resourcesDirectory}/${fileName.substring(0, fileName.lastIndexOf("/"))}`
    }
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, {recursive: true})

    }
    let file = `${directory}/${fileName.substring(fileName.lastIndexOf("/") + 1)}`
    await fsPromise.writeFile(file, JSON.stringify(jsons), {flag: 'w'})
}

module.exports = {readFile, writeFile}
