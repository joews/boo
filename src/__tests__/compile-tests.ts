/* eslint-env jest */
import parse from '../parse'
import compile from '../compile'

function testCompile (source: string) {
  test(source, () => {
    const parsed = parse(source)
    console.log(JSON.stringify(parsed))
    const compiled = compile(parsed)
    expect(compiled).toMatchSnapshot()
  })
}

testCompile("iconst 3")

testCompile(`
.globals 3
iconst 3
iconst 5
iadd
print
`)
