/* eslint-env jest */
import parse from '../parse'

function testParse (source: string) {
  test(source, () => {
    // console.log(JSON.stringify(parse(source)))
    expect(parse(source)).toMatchSnapshot()
  })
}

function testFails (source: string) {
  test(source, () => {
    expect(() => parse(source)).toThrowErrorMatchingSnapshot()
  })
}

testParse('iconst 3')

// a program needs at least one instruction
testFails('.globals 3')

testParse(`

.globals      2043543

iconst 3

`)

testParse(`
first: iconst 1
second:
iconst 2
third:
     iconst 3
`)
