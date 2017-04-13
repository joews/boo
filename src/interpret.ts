import { Program } from "./types"
import { mnemonicsByOpcode } from "./instructions"
// TODO instance state

// code memory and instructioon pointer
// ip points to the next instruction to execute
let code: Uint8Array
let ip: number

// stack data memory and stack pointer
// sp points to the last address in the stack
let operandStack: Uint8Array
let sp: number

let globals: Uint8Array

export default function interpret(compiledProgram: Program): number {
  code = compiledProgram.code
  ip = 0
  sp = -1

  const operandBuffer = new ArrayBuffer(compiledProgram.stackSize)
  operandStack = new Uint8Array(operandBuffer)

  globals = new Uint8Array(compiledProgram.globalSize)

  // TODO halt instruction
  while (ip < code.length) {
    visit()
  }

  // the value of a program is the value of the last expression
  return operandStack[0]
}

function visit(): void {
  const opcode = code[ip++]
  const mnemonic = mnemonicsByOpcode[opcode]

  // TODO flag
  trace(opcode, mnemonic)

  switch (mnemonic) {
    case "gload":
      return push(globals[code[ip++]])
    case "gstore":
      globals[code[ip++]] = pop()
      break
    case "iconst":
      return push(code[ip++])
    case "iadd":
      return push(pop() + pop())
    case "print":
      return console.log(pop())
    case "jmp":
      ip = code[ip++]
      break
    default:
      throw new Error("bad opcode " + opcode)
  }
}

function push(byte: number): void {
  operandStack[++sp] = byte & 0xff
}

function pop(): number {
  return operandStack[sp--]
}

function trace(opcode: number, mnemonic: string) {
  // show the defined region of the stack only
  let stack = []
  for (let i = 0; i <= sp; i ++) {
    stack[i] = operandStack[i]
  }

  console.log(`TRACE ${mnemonic}(${opcode})@${ip - 1}\t\tstack [${stack}] \tglobals [${globals}]`)
}
