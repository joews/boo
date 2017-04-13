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

export default function interpret(compiledProgram: Program): number {
  code = compiledProgram.code
  ip = 0
  sp = -1

  const operandBuffer = new ArrayBuffer(compiledProgram.stackSize)
  operandStack = new Uint8Array(operandBuffer)

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
  console.log(`TRACE op ${opcode} ${mnemonic} @${ip}\tstack [${operandStack}]`)

  switch (mnemonic) {
    case "iconst":
      console.log("TRACE - iconst ", code[ip])
      return push(code[ip ++])
    case "iadd":
      const a = pop()
      const b = pop()
      console.log(`TRACE - add ${a} + ${b}`)
      return push(a + b)
    case "print":
      console.log("TRACE - print")
      return console.log(pop())
    default:
      throw new Error("bad opcode " + opcode)
  }
}


function push(byte: number): void {
  console.log(`TRACE - push sp @ ${sp}`)
  operandStack[++sp] = byte & 0xff
}

function pop(): number {
  console.log(`TRACE - pop sp @ ${sp}`)
  return operandStack[sp--]
}
