// TODO instance state
// TODO typed arrays with ip/sp position registers
let codeStack: Uint8Array
let ip = 0

let operandStack: number[] = []

export default function interpret(code: Uint8Array) {
  codeStack = code
  ip = 0

  // TODO halt instruction
  while (ip < code.length) {
    visit()
  }

  // the value of a program is the value of the last expression
  return operandStack[0]
}

function visit () {
  console.log("IP", ip)
  const opcode = codeStack[ip++]
  console.log("OPCODE:", opcode)
  console.log("CODE STACK:", codeStack)
  console.log("OP STACK", operandStack)

  // TODO manage opcodes
  switch (opcode) {
    case 0: // iconst
      console.log("iconst of ", codeStack[ip])
      return operandStack.push(codeStack[ip ++])
    case 1: // iadd
      console.log("add")
      const result = operandStack.pop() + operandStack.pop()
      return operandStack.push(result)
    case 2: // print
      console.log("print")
      return console.log(operandStack.pop())
    default:
      throw new Error("bad opcode " + opcode)
  }
}
