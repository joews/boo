import getOpcodeByName from "./instructions"

// AST pass to compile the given AST to machine code
export default function compile (ast: any) {
  let next = 0;

  let [codeSize, stackSize] = getCodeSize(ast)
  const codeBuffer = new ArrayBuffer(codeSize)
  const code = new Uint8Array(codeBuffer)

  ast.forEach(node => {
    const bytes = visit(node)
    code.set(bytes, next)
    next += bytes.length
  })

  return {
    code: codeBuffer,
    stackSize
  }
}

// AST pass to compute the size of the compiled code
function getCodeSize(ast: any) {
  let codeSize = 0
  let currentStackSize = 0
  let maxStackSize = 0

  ast.forEach(node => {
    const { argCount, returnCount } = getOpcodeByName(node.mnemonic)
    codeSize = codeSize + argCount + 1

    currentStackSize += argCount
    maxStackSize = Math.max(maxStackSize, currentStackSize)
    currentStackSize -= returnCount
  })

  return [codeSize, maxStackSize]
}

// AST visitor to return machine code for the given AST node
function visit (node: any): Uint8Array {
  const { opcode, argCount } = getOpcodeByName(node.mnemonic)
  const buffer = new ArrayBuffer(1 + argCount)
  const view = new Uint8Array(buffer);

  view.set([opcode], 0)

  // assume all operands are byte for now
  node.operands.forEach((operand, i) => {
    view.set([operand], i + 1)
  })

  return view
}
