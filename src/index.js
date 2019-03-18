const fs = require('fs')
const util = require('util')
const path = require('path')

function MoreArgumentsNeededError(numberRequired) {
  this.name = 'MoreArgumentsNeededError'
  this.message = `More arguments needed. Required: (${numberRequired})`
  Error.captureStackTrace(this, MoreArgumentsNeededError)
}
MoreArgumentsNeededError.prototype = new TypeError()

const validateArgs = directory => {
  if (directory === undefined) throw new MoreArgumentsNeededError(1)
}

module.exports = async directory => {
  validateArgs(directory)

  const readdir = util.promisify(fs.readdir)
  const isDirectory = source => fs.lstatSync(source).isDirectory()
  const convertToFullDir = folder => path.join(directory, folder)
  const contents = await readdir(directory)
  return contents.map(convertToFullDir).filter(isDirectory)
}

module.exports.MoreArgumentsNeededError = MoreArgumentsNeededError
