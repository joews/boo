import { readFileSync } from 'fs'
import { join } from 'path'
import { generate } from 'pegjs'
import { Ast } from './types'

const parserSource = readFileSync(join(__dirname, 'boo.pegjs'), 'utf8')
const parser = generate(parserSource)

export default function parse (source: string): Ast {
  const ast = parser.parse(source) as Ast
  // console.log(`TRACE parse: `, JSON.stringify(ast))
  return ast
}
