import { Ast, AstNode, InstructionNode, Program } from "./types"
import getOpcodeByName from "./instructions"

// TODO instance state
let code: Uint8Array
let next: number

// AST pass to compile the given AST to machine code
export default function compile (ast: Ast): Program {
  next = 0;

  let [codeSize, stackSize, globalSize] = getCodeSize(ast)
  const codeBuffer = new ArrayBuffer(codeSize)
  code = new Uint8Array(codeBuffer)

  ast.forEach(visit)

  return {
    code,
    stackSize,
    globalSize
  }
}

// AST pass to compute the size of the compiled code
function getCodeSize(ast: Ast) {
  let codeSize = 0
  let globalSize = 0
  let currentStackSize = 0
  let maxStackSize = 0

  ast.forEach(node => {
    if (node.kind === "instruction") {
      const { argCount, returnCount } = getOpcodeByName(node.mnemonic)
      codeSize = codeSize + argCount + 1

      currentStackSize += argCount
      maxStackSize = Math.max(maxStackSize, currentStackSize)
      currentStackSize -= returnCount
    } else if (node.kind === "header") {
      globalSize = node.globals
    }
  })

  return [codeSize, maxStackSize, globalSize]
}

// AST visitor to return machine code for the given AST node
function visit (node: AstNode): void {
  switch (node.kind) {
    case "instruction":
      return visitInstruction(node)
    case "header":
      break
  }
}

function visitInstruction(node: InstructionNode) {
  const { opcode, argCount } = getOpcodeByName(node.mnemonic)
  const buffer = new ArrayBuffer(1 + argCount)
  const view = new Uint8Array(buffer);

  view.set([opcode], 0)

  // assume all operands are byte for now
  node.operands.forEach((operand: number, i: number) => {
    view.set([operand], i + 1)
  })

  code.set(view, next)
  next += view.length
}
