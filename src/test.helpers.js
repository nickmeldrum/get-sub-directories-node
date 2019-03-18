const fs = require('fs-extra')
const path = require('path')

const randomString = () =>
  Math.random()
    .toString(36)
    .substring(7)

module.exports.prepareTestDirectory = async () => {
  const testPath = path.join(__dirname, `../tmp${randomString()}`)
  await fs.emptyDir(testPath)
  return testPath
}

module.exports.cleanTestDirectory = async testPath => fs.emptyDir(testPath)

module.exports.randomString = randomString
