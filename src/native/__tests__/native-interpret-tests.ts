import interpretNative from '..'

test('a valid program', () => {
  const PROGRAM = {
    code: new Uint8Array([0, 3, 0, 5, 0, 13, 1, 1]),
    stackSize: 2,
    globalSize: 0
  }

  const out = interpretNative({ code: PROGRAM.code, stackSize: 2 })
  expect(out).toEqual(21)
})

test('interpretNative throws if the argument is not a Program object', () => {
  function expectThrow (arg) {
    expect(() => interpretNative(arg))
      .toThrow(/expects a single Program argument/)
  }

  expectThrow()
  expectThrow({})
  expectThrow({ code: new Uint8Array([]) })
  expectThrow({ stackSize: 2 })
})
