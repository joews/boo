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
testInterpret("add 2 numbers", { code: new Uint8Array([0, 3, 0, 5, 1]), stackSize: 2, globalSize: 0 }, 8)
