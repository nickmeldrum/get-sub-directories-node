const fs = require('fs-extra')
const path = require('path')
const getSubdirectories = require('../')
const { randomString, prepareTestDirectory, cleanTestDirectory } = require('./test.helpers')

describe('recursive', () => {
  let testPath

  beforeEach(async () => {
    testPath = await prepareTestDirectory()
  })
  afterEach(async () => {
    await cleanTestDirectory(testPath)
  })

  test('when recursive option set, will return all nested subdirectories', async () => {
    const level1 = randomString()
    const anotherLevel1 = randomString()

    const level2 = randomString()
    const anotherLevel2 = randomString()

    const level3 = randomString()

    await fs.ensureDir(path.join(testPath, level1))
    await fs.ensureDir(path.join(testPath, anotherLevel1))

    await fs.ensureDir(path.join(testPath, level1, level2))
    await fs.ensureDir(path.join(testPath, level1, anotherLevel2))

    await fs.ensureDir(path.join(testPath, level1, level2, randomString()))
    await fs.ensureDir(path.join(testPath, level1, anotherLevel2, level3))

    await fs.ensureDir(path.join(testPath, level1, anotherLevel2, level3, randomString()))

    expect((await getSubdirectories(testPath, { recursive: true })).length).toEqual(7)
  })

  test('when level set to 1 and only 1 level of directories will return them all', async () => {
    const level1 = randomString()
    const anotherLevel1 = randomString()

    await fs.ensureDir(path.join(testPath, level1))
    await fs.ensureDir(path.join(testPath, anotherLevel1))

    expect((await getSubdirectories(testPath, { levels: 1 })).length).toEqual(2)
  })

  test('when level set to 2, and only 2 levels of directories will return them all', async () => {
    const level1 = randomString()
    const anotherLevel1 = randomString()

    const level2 = randomString()
    const anotherLevel2 = randomString()

    await fs.ensureDir(path.join(testPath, level1))
    await fs.ensureDir(path.join(testPath, anotherLevel1))

    await fs.ensureDir(path.join(testPath, level1, level2))
    await fs.ensureDir(path.join(testPath, level1, anotherLevel2))

    expect((await getSubdirectories(testPath, { levels: 1 })).length).toEqual(4)
  })

  test('when level set to 3, and only 3 levels of directories will return them all', async () => {
    const level1 = randomString()
    const anotherLevel1 = randomString()

    const level2 = randomString()
    const anotherLevel2 = randomString()

    await fs.ensureDir(path.join(testPath, level1))
    await fs.ensureDir(path.join(testPath, anotherLevel1))

    await fs.ensureDir(path.join(testPath, level1, level2))
    await fs.ensureDir(path.join(testPath, level1, anotherLevel2))

    await fs.ensureDir(path.join(testPath, level1, level2, randomString()))
    await fs.ensureDir(path.join(testPath, level1, anotherLevel2, randomString()))

    expect((await getSubdirectories(testPath, { levels: 1 })).length).toEqual(6)
  })
})
