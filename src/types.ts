//
// Assembler AST types
//
export type AstNode
  = InstructionNode

export type InstructionNode = {
  kind: "instruction",
  mnemonic: string,
  operands: any[]
}

export type Ast = AstNode[]

//
// Compiled program
//
export type Program = {
  code: Uint8Array,
  stackSize: number
}
