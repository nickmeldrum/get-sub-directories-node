const fs = require('fs')
const util = require('util')
const path = require('path')

function MoreArgumentsNeededError(numberRequired) {
  this.name = 'MoreArgumentsNeededError'
  this.message = `More arguments needed. Required: (${numberRequired})`
  Error.captureStackTrace(this, MoreArgumentsNeededError)
}
MoreArgumentsNeededError.prototype = new Error()

const validateArgs = (directory, options) => {
  // has number of arguments
  if (directory === undefined) throw new MoreArgumentsNeededError(1)

  // arguments are of right type
  if (typeof directory !== 'string') throw new TypeError('directory must be a string')
  if (typeof options !== 'object') throw new TypeError('options must be an object')
  if (options.filter !== undefined && typeof options.filter !== 'string')
    throw new TypeError('filter must be a string')
  if (options.levels !== undefined && typeof options.levels !== 'number')
    throw new TypeError('levels must be a number')
  if (options.recursive !== undefined && typeof options.recursive !== 'boolean')
    throw new TypeError('recursive must be a boolean')

  // arguments are in the right range/ not overlapping
  if (options.levels !== undefined && (options.levels <= 0 || !Number.isInteger(options.levels)))
    throw new RangeError('levels must be a non-negative non-zero integer')
  if (options.levels !== undefined && options.recursive !== undefined)
    throw new RangeError(
      'please specify one of: levels | recursive. We cannot correctly interpret your wishes when both are specified',
    )
}

module.exports = async (directory, options = {}) => {
  validateArgs(directory, options)

  const readdir = util.promisify(fs.readdir)
  const isDirectory = source => fs.lstatSync(source).isDirectory()
  const byFilter =
    options.filter === undefined ? () => true : source => new RegExp(options.filter).test(source)
  const convertToFullDir = folder => path.join(directory, folder)
  const contents = await readdir(directory)
  return contents
    .filter(byFilter)
    .map(convertToFullDir)
    .filter(isDirectory)
}

module.exports.MoreArgumentsNeededError = MoreArgumentsNeededError
