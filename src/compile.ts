import { Ast, AstNode, InstructionNode, Program } from './types'
import getOpcodeByName from './instructions'

// TODO instance state
let code: Uint8Array
let ip: number

// map labels to their decoded code address
let labels: { [label: string]: number }

// instructions can refer to labels that have not yet been defined.
// keep a map of labels to instructions that are waiting for the label's
// code address so that the address can be filled in ("backpatched") when
// we reach its declaration.
let labelForwardRefs: { [label: string]: number[] }

// AST pass to compile the given AST to machine code
export default function compile (ast: Ast): Program {
  ip = 0

  let [codeSize, stackSize, globalSize] = getCodeSize(ast)
  const codeBuffer = new ArrayBuffer(codeSize)
  code = new Uint8Array(codeBuffer)

  labels = {}
  labelForwardRefs = {}

  ast.forEach(visit)

  return {
    code,
    stackSize,
    globalSize
  }
}

// AST pass to compute the size of the compiled code
function getCodeSize (ast: Ast) {
  let codeSize = 0
  let globalSize = 0
  let currentStackSize = 0
  let maxStackSize = 0

  ast.forEach(node => {
    if (node.kind === 'instruction') {
      const { argTypes, operandTypes, resultTypes } = getOpcodeByName(node.mnemonic)

      codeSize += argTypes.length + 1
      currentStackSize -= operandTypes.length
      currentStackSize += resultTypes.length

      // TODO assert that stack length is >- 0
      maxStackSize = Math.max(maxStackSize, currentStackSize)

    } else if (node.kind === 'header') {
      globalSize = node.globals
    }
  })

  return [codeSize, maxStackSize, globalSize]
}

// AST visitor to return machine code for the given AST node
function visit (node: AstNode): void {
  switch (node.kind) {
    case 'instruction':
      return visitInstruction(node)
    case 'header':
      break
  }
}

function visitInstruction (node: InstructionNode) {
  const { opcode, argTypes } = getOpcodeByName(node.mnemonic)

  if (node.label) {
    resolveLabel(node)
  }

  const buffer = new ArrayBuffer(1 + argTypes.length)
  const view = new Uint8Array(buffer)

  view.set([opcode], 0)

  const operands = mapOperands(node)

  operands.forEach((operand: number, i: number) => {
    view.set([operand], i + 1)
  })

  code.set(view, ip)
  ip += view.length
}

// Return the byte form of the node's operands
// byte input: identity
// string/float/function input: TODO constant pool
// label input: map to label
function mapOperands (node: InstructionNode) {
  // TODO somehow switch on operand type, not instruction
  switch (node.mnemonic) {
    case 'jmp':
    case 'jne':
      return getLabelAddress(node.operands[0])
    default:
      return node.operands
  }
}

// Get the code address that `label` resolves to. If `label` has not yet been
// defined, add the current ip to the list of instructions to backpatch when
// we reach the label declaration and return a sentinel.
function getLabelAddress (label: string) {
  const address = labels[label]
  if (address) {
    return [labels[label]]
  } else {
    let refs = labelForwardRefs[label] || []
    refs.push(ip)
    labelForwardRefs[label] = refs
    return [-1]
  }
}

// Resolve the node's label to its code address (the current ip)
// If any instructions have referred to this label before now,
// backpatch their references
function resolveLabel (node: InstructionNode) {
  if (node.label) {
    labels[node.label] = ip

    const forwardRefs = labelForwardRefs[node.label]
    if (forwardRefs) {
      forwardRefs.forEach(ref => {
        code[ref + 1] = ip
      })
    }

    delete labelForwardRefs[node.label]
  }
}
