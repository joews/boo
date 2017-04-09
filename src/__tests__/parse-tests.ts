/* eslint-env jest */
import parse from '../parse'

function testParse (source: string) {
  test(source, () => {
    // console.log(JSON.stringify(parse(source)))
    expect(parse(source)).toMatchSnapshot()
  })
}

testParse("iconst 3")
