/* eslint-env jest */
import { Program } from '../types'
import parse from "../parse"
import compile from "../compile"
import interpret from '../interpret'

function testInterpretBinary (name: string, program: Program, expected: any) {
  test(name, () => {
    const interpreted = interpret(program, { trace: true })
    expect(interpreted).toEqual(expected)
  })
}

function testInterpret (code: string, expected: any) {
  test(code, () => {
    const parsed = parse(code)
    // console.log(parsed)
    const compiled = compile(parsed)
    // console.log(compiled)
    const interpreted = interpret(compiled, { trace: true })
    expect(interpreted).toEqual(expected)
  })
}

// iconst 3
// iconst 5
// iadd
testInterpretBinary("add 2 numbers", { code: new Uint8Array([0, 3, 0, 5, 1]), stackSize: 2, globalSize: 0 }, 8)

// iconst 2
// gstore 0
// iconst 3
// gstore 1
// gload 0
// gload 1
// add
testInterpretBinary("load and store", {
  code: new Uint8Array([0, 2, 3, 0, 0, 3, 3, 1, 4, 0, 4, 1, 1]),
  stackSize: 2,
  globalSize: 2
}, 5)

testInterpret(`
iconst 1
jmp skip
iconst 2
iadd
skip:
  iconst 3
iadd
`, 4)

testInterpret(`
iconst 1
halt
iconst 2
`, 1)

/*
i = 0
do:
  print i
  i = i + 1
while i != 3:
i
*/
testInterpret(`
.globals 1
iconst 1
gstore 0

next:

iconst 1
gload 0
iadd
gstore 0

gload 0
iconst 3
jne next
gload 0
`, 3)
