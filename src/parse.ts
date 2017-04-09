import { readFileSync } from 'fs'
import { join } from 'path'
import { generate } from 'pegjs'

const parserSource = readFileSync(join(__dirname, 'boo.pegjs'), 'utf8')
const parser = generate(parserSource)

export default function parse (source: string): any {
  const ast = parser.parse(source)
  // console.log(`TRACE parse: `, JSON.stringify(ast))
  return ast
}
