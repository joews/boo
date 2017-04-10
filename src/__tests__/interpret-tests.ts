/* eslint-env jest */
import interpret from '../interpret'

function testInterpret (name: string, program: { code: number[], stackSize: number }, expected: any) {
  test(name, () => {
    const interpreted = interpret({ code: new Uint8Array(program.code), stackSize: program.stackSize })
    expect(interpreted).toEqual(expected)
  })
}

// iconst 3
// iconst 5
// iadd
testInterpret("add 2 numbers", { code: [0, 3, 0, 5, 1], stackSize: 2 }, 8)
