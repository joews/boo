//
// Assembler AST types
//
export type AstNode
  = HeaderNode
  | InstructionNode

export type HeaderNode = {
  kind: "header",
  globals: number
}

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
  stackSize: number,
  globalSize: number
}
