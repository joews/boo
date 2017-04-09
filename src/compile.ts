import getOpcodeByName from "./instructions"

// AST pass to compile the given AST to machine code
export default function compile (ast: any) {
  let next = 0;

  let codeSize = getCodeSize(ast)

  const buffer = new ArrayBuffer(codeSize)
  const machineCode = new Uint8Array(buffer);

  ast.forEach(node => {
    const bytes = visit(node)
    machineCode.set(bytes, next)
    next += bytes.length
  })

  return buffer
}

// AST pass to compute the size of the compiled code
function getCodeSize(ast: any) {
  let size = 0
  ast.forEach(node => {
    const { argCount } = getOpcodeByName(node.mnemonic)
    size = size + argCount + 1
  })

  return size
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
