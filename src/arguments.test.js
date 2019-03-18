const getSubdirectories = require('../')

const { MoreArgumentsNeededError } = getSubdirectories

describe('getSubDirectories', () => {
  test('no arguments throws more arguments needed', async () => {
    expect.assertions(1)
    await expect(getSubdirectories()).rejects.toThrow(MoreArgumentsNeededError)
  })

  test('More arguments needed Error shows the required number required in the message', () => {
    expect.assertions(1)
    try {
      throw new MoreArgumentsNeededError(42)
    } catch (e) {
      expect(e.message).toEqual('More arguments needed. Required: (42)')
    }
  })

  test('More arguments needed Error has the originating function at the top of the stack', async () => {
    expect.assertions(1)
    try {
      await getSubdirectories()
    } catch (e) {
      expect(e.stack.split('\n')[1]).toMatch('at validateArgs')
    }
  })

  test('if directory argument is not a string, a TypeError is thrown', async () => {
    expect.assertions(1)
    await expect(getSubdirectories(1)).rejects.toThrow(TypeError)
  })

  test('if directory argument is not string, the message explains which argument is incorrect', async () => {
    expect.assertions(1)
    await expect(getSubdirectories(1)).rejects.toThrow('directory must be a string')
  })

  test('if options argument is not an object, a TypeError is thrown', async () => {
    expect.assertions(1)
    await expect(getSubdirectories('.', 1)).rejects.toThrow(TypeError)
  })

  test('if options argument is not an object, the message explains which argument is incorrect', async () => {
    expect.assertions(1)
    await expect(getSubdirectories('.', 1)).rejects.toThrow('options must be an object')
  })

  test('if filter option is not a string, a TypeError is thrown', async () => {
    expect.assertions(1)
    await expect(getSubdirectories('.', { filter: 1 })).rejects.toThrow(TypeError)
  })

  test('if filter option is not a string, the message explains which argument is incorrect', async () => {
    expect.assertions(1)
    await expect(getSubdirectories('.', { filter: 1 })).rejects.toThrow('filter must be a string')
  })

  test('if levels option is not a number, a TypeError is thrown', async () => {
    expect.assertions(1)
    await expect(getSubdirectories('.', { levels: 'fdas' })).rejects.toThrow(TypeError)
  })

  test('if levels option is not a number, the message explains which argument is incorrect', async () => {
    expect.assertions(1)
    await expect(getSubdirectories('.', { levels: 'fdas' })).rejects.toThrow(
      'levels must be a number',
    )
  })

  test('if recursive option is not a boolean, a TypeError is thrown', async () => {
    expect.assertions(1)
    await expect(getSubdirectories('.', { recursive: 'fdas' })).rejects.toThrow(TypeError)
  })

  test('if recursive option is not a boolean, the message explains which argument is incorrect', async () => {
    expect.assertions(1)
    await expect(getSubdirectories('.', { recursive: 'fdas' })).rejects.toThrow(
      'recursive must be a boolean',
    )
  })

  test('if levels option is zero, a RangeError is thrown', async () => {
    expect.assertions(1)
    await expect(getSubdirectories('.', { levels: 0 })).rejects.toThrow(RangeError)
  })

  test('if levels option is zero, the message explains why the argument is out of range', async () => {
    expect.assertions(1)
    await expect(getSubdirectories('.', { levels: 0 })).rejects.toThrow(
      'levels must be a non-negative non-zero integer',
    )
  })

  test('if levels option is negative, a RangeError is thrown', async () => {
    expect.assertions(1)
    await expect(getSubdirectories('.', { levels: -5 })).rejects.toThrow(RangeError)
  })

  test('if levels option is a floating point, a RangeError is thrown', async () => {
    expect.assertions(1)
    await expect(getSubdirectories('.', { levels: 3.14 })).rejects.toThrow(RangeError)
  })

  test('if levels option and recursive option are specified, a RangeError is thrown', async () => {
    expect.assertions(1)
    await expect(getSubdirectories('.', { levels: 3, recursive: true })).rejects.toThrow(RangeError)
  })

  test('if levels option and recursive option are specified, the message explains why this is invalid', async () => {
    expect.assertions(1)
    await expect(getSubdirectories('.', { levels: 3, recursive: true })).rejects.toThrow(
      'please specify one of: levels | recursive. We cannot correctly interpret your wishes when both are specified',
    )
  })
})
