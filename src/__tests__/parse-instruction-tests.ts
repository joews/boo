/* eslint-env jest */
import { parse, default as read } from '../parse-instructions'

function testParse (source: string) {
  test(source, () => {
    // console.log(JSON.stringify(parse(source)))
    expect(parse(source)).toMatchSnapshot()
  })
}

testParse('0x00 noop (): () -> ()')
testParse('0x10 iadd (): (int32, int32) -> (int32)')
testParse('0x20 jmp (label): () -> ()')

test('read all instructions', () => {
  const instructions = read()
  // console.log(JSON.stringify(instructions, null, 2))

  expect(instructions).toMatchSnapshot()
})
