/* eslint-env jest */
import { Program } from '../types'
import interpret from '../interpret'

function testInterpret (name: string, program: Program, expected: any) {
  test(name, () => {
    const interpreted = interpret(program)
    expect(interpreted).toEqual(expected)
  })
}

// iconst 3
// iconst 5
// iadd
// testInterpret("add 2 numbers", { code: new Uint8Array([0, 3, 0, 5, 1]), stackSize: 2, globalSize: 0 }, 8)

// iconst 2
// gstore 0
// iconst 3
// gstore 1
// gload 0
// gload 1
// add
testInterpret("load and store", {
  code: new Uint8Array([0, 2, 3, 0, 0, 3, 3, 1, 4, 0, 4, 1, 1]),
  stackSize: 2,
  globalSize: 2
}, 5)
