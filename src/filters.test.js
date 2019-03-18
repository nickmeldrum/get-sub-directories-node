const fs = require('fs-extra')
const path = require('path')
const getSubdirectories = require('../')

const testPath = path.join(__dirname, '../tmp')

const randomString = () =>
  Math.random()
    .toString(36)
    .substring(7)

describe('getSubDirectories', () => {
  beforeEach(async () => fs.emptyDir(testPath))
  afterEach(async () => fs.emptyDir(testPath))

  test('when filter applied, only returns the 1 subdirectory that matches the filter', async () => {
    await fs.ensureDir(path.join(testPath, `foo${randomString()}`))
    await fs.ensureDir(path.join(testPath, `bar${randomString()}`))
    expect((await getSubdirectories(testPath, { filter: '^foo.*' })).length).toEqual(1)
  })

  test('when filter applied, returns the 3 subdirectories that matches the filter', async () => {
    await fs.ensureDir(path.join(testPath, `foo${randomString()}`))
    await fs.ensureDir(path.join(testPath, `foo${randomString()}`))
    await fs.ensureDir(path.join(testPath, `foo${randomString()}`))

    await fs.ensureDir(path.join(testPath, `bar${randomString()}foo`))
    await fs.ensureDir(path.join(testPath, `bar${randomString()}foo`))
    await fs.ensureDir(path.join(testPath, `bar${randomString()}foo`))

    expect((await getSubdirectories(testPath, { filter: '^foo.*' })).length).toEqual(3)
  })
})
