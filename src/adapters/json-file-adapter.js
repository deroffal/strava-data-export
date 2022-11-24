const fs = require("fs")
const env = require("./env");

const resourcesDirectory = env.getResourcesDirectory()

async function readFile(path) {
    return fs.promises.readFile(`${resourcesDirectory}/${path}`)
        .then(content => JSON.parse(content.toString()))
        .catch(reason => {
            console.error(reason)
            return null;
        })
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
    await fs.promises.writeFile(file, JSON.stringify(jsons), {flag: 'w'})
}

module.exports = {readFile, writeFile}
