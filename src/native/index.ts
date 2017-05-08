import { Program } from '../types'
const bindings = require('bindings')('interpret.node')

export default function interpretNative (program: Program): number {
  return bindings.interpret(program)
}
