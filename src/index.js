const fs = require('fs')
const util = require('util')
const path = require('path')
const flatten = require('array-flatten')

function MoreArgumentsNeededError(numberRequired) {
  this.name = 'MoreArgumentsNeededError'
  this.message = `More arguments needed. Required: (${numberRequired})`
  Error.captureStackTrace(this, MoreArgumentsNeededError)
}
MoreArgumentsNeededError.prototype = new Error()

const validateArgs = options => {
  // has number of arguments
  if (options === undefined) throw new MoreArgumentsNeededError(1)

  // arguments are of right type
  if (
    options === undefined ||
    options === null ||
    (typeof options !== 'string' && options.constructor !== Object)
  )
    throw new TypeError(
      'argument must be a path string or an options object containing a path string',
    )
  if (options.constructor === Object && typeof options.path !== 'string')
    throw new RangeError('options must contain a path string')
  if (options.filter !== undefined && typeof options.filter !== 'string')
    throw new TypeError('filter must be a string')
  if (options.maxDepth !== undefined && typeof options.maxDepth !== 'number')
    throw new TypeError('maxDepth must be a number')
  if (options.recursive !== undefined && typeof options.recursive !== 'boolean')
    throw new TypeError('recursive must be a boolean')

  // arguments are in the right range/ not overlapping
  if (
    options.maxDepth !== undefined &&
    (options.maxDepth <= 0 || !Number.isInteger(options.maxDepth))
  )
    throw new RangeError('maxDepth must be a non-negative non-zero integer')
  if (options.maxDepth !== undefined && options.recursive !== true)
    throw new RangeError('maxDepth only makes sense if recursive is set to true')
}

const listSubdirectories = async (options, currentLevel = 0) => {
  validateArgs(options)
  /* eslint-disable no-param-reassign */
  if (typeof options === 'string') options = { path: options }
  /* eslint-enable no-param-reassign */

  const readdir = util.promisify(fs.readdir)
  const isDirectory = source => fs.lstatSync(source).isDirectory()
  const byFilter =
    options.filter === undefined ? () => true : source => new RegExp(options.filter).test(source)
  const convertToFullDir = folder => path.join(options.path, folder)
  const levelContentNames = await readdir(options.path)
  const filteredLevelContentFullPaths = levelContentNames
    .filter(byFilter)
    .map(convertToFullDir)
    .filter(isDirectory)

  if (
    options.recursive &&
    ((options.maxDepth !== undefined && currentLevel < options.maxDepth - 1) ||
      options.maxDepth === undefined)
  ) {
    return filteredLevelContentFullPaths.concat(
      flatten(
        await Promise.all(
          filteredLevelContentFullPaths.map(async parentPath =>
            listSubdirectories({ ...options, path: parentPath }, currentLevel + 1),
          ),
        ),
      ),
    )
  }

  return filteredLevelContentFullPaths
}

module.exports = listSubdirectories

module.exports.MoreArgumentsNeededError = MoreArgumentsNeededError
