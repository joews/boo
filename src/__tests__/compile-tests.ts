/* eslint-env jest */
import parse from '../parse'
import compile from '../compile'

function testCompile (source: string) {
  test(source, () => {
    const parsed = parse(source)
    // console.log(JSON.stringify(parsed))
    const compiled = compile(parsed)
    // console.log(compiled)
    expect(compiled).toMatchSnapshot()
  })
}

testCompile('iconst 3')

testCompile(`
.globals 3
iconst 3
iconst 5
iadd
print
`)

testCompile(`
first: iconst 1
print
second: iconst 2
third: iconst 3
iadd
`)

testCompile(`
iconst 1
jmp skip
iconst 2
iadd
skip:
  iconst 3
iadd
`)
