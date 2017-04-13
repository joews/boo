import { instruction } from "./types"

export default function getInstructionByName(mnemonic: string) {
  const instruction = instructionsByMnemonic[mnemonic]
  if (instruction == null) {
    throw new Error(`Unknown instruction [${mnemonic}]`)
  }

  return instruction
}

// [mnemonic, argCount, returnCount]
type instructionShorthand = [string, number, number]

const instructions: instructionShorthand[] = [
  ["iconst", 1, 0],
  ["iadd", 0, 2],
  ["print", 0, 0],
  ["gstore", 1, 0],
  ["gload", 1, 1],
  ["jmp", 1, 0]
]

// Export mnemonic -> instruction map via getInstructionByName
// so we can throw at band instructions at assemble time
const instructionsByMnemonic: { [mnemonic:string]: instruction } = {}

// Export opcode -> mnemonic map directly to save a function call
// at interpret time
export const mnemonicsByOpcode: { [i:number]: string } = {}

for (let i = 0; i < instructions.length; i ++) {
  const [mnemonic, argCount, returnCount] = instructions[i]
  instructionsByMnemonic[mnemonic] = { opcode: i, mnemonic, argCount, returnCount }
}

for (let i = 0; i < instructions.length; i ++) {
  const [mnemonic] = instructions[i]
  mnemonicsByOpcode[i] = mnemonic
}
