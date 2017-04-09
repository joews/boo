export default function getInstructionByName(mnemonic) {
  const instruction = instructionsByMnemonic[mnemonic]
  if (instruction == null) {
    throw new Error(`Unknown instruction [${mnemonic}]`)
  }

  return instruction
}

const instructions = [
  ["iconst", 1],
  ["iadd", 0],
  ["print", 0]
]

const instructionsByMnemonic = { }
for (let i = 0; i < instructions.length; i ++) {
  const [mnemonic, argCount] = instructions[i]
  instructionsByMnemonic[mnemonic] = { opcode: i, mnemonic, argCount }
}
