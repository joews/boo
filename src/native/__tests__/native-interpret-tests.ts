import interpretNative from '..'
import { Program } from '../../types'

test('interpretNative interprets a valid program', () => {
  const PROGRAM = {
    code: new Uint8Array([0, 3, 0, 5, 0, 13, 1, 1]),
    stackSize: 2,
    globalSize: 0
  }

  const out = interpretNative({ code: PROGRAM.code, stackSize: 2, globalSize: 0 })
  expect(out).toEqual(21)
})

test('interpretNative throws if the argument is not a Program object', () => {
  function expectThrow (arg: any) {
    expect(() => {
      interpretNative(arg as Program)
    })
    .toThrowError(/expects a single Program argument/)
  }

  expectThrow(null)
  expectThrow({})
  expectThrow({ code: new Uint8Array([]) })
  expectThrow({ stackSize: 2 })
})
