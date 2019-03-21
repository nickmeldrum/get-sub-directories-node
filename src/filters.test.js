const fs = require('fs-extra')
const path = require('path')
const listSubdirectories = require('../')
const { randomString, prepareTestDirectory, cleanTestDirectory } = require('./test.helpers')

describe('filters', () => {
  let testPath

  beforeEach(async () => {
    testPath = await prepareTestDirectory()
  })
  afterEach(async () => {
    await cleanTestDirectory(testPath)
  })

  test('when filter applied, only returns the 1 subdirectory that matches the filter', async () => {
    await fs.ensureDir(path.join(testPath, `foo${randomString()}`))
    await fs.ensureDir(path.join(testPath, `bar${randomString()}`))
    expect((await listSubdirectories({ path: testPath, filter: '^foo.*' })).length).toEqual(1)
  })

  test('when filter applied, returns the 3 subdirectories that matches the filter', async () => {
    await fs.ensureDir(path.join(testPath, `foo${randomString()}`))
    await fs.ensureDir(path.join(testPath, `foo${randomString()}`))
    await fs.ensureDir(path.join(testPath, `foo${randomString()}`))

    await fs.ensureDir(path.join(testPath, `bar${randomString()}foo`))
    await fs.ensureDir(path.join(testPath, `bar${randomString()}foo`))
    await fs.ensureDir(path.join(testPath, `bar${randomString()}foo`))

    expect((await listSubdirectories({ path: testPath, filter: '^foo.*' })).length).toEqual(3)
  })
})
