const fs = require('fs')
const util = require('util')
const path = require('path')

module.exports = async directory => {
  const readdir = util.promisify(fs.readdir)
  const isDirectory = source => fs.lstatSync(source).isDirectory()
  const convertToFullDir = folder => path.join(directory, folder)
  const contents = await readdir(directory)
  return contents.map(convertToFullDir).filter(isDirectory)
}
