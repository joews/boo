/* eslint-env jest */
import interpret from '../interpret'

function testInterpret (name: string, code: number[], expected: any) {
  test(name, () => {
    const interpreted = interpret(new Uint8Array(code))
    expect(interpreted).toEqual(expected)
  })
}

// iconst 3
// iconst 5
// iadd
testInterpret("add 2 numbers", [0, 3, 0, 5, 1], 8)
