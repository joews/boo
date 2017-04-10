export default function getInstructionByName(mnemonic) {
  const instruction = instructionsByMnemonic[mnemonic]
  if (instruction == null) {
    throw new Error(`Unknown instruction [${mnemonic}]`)
  }

  return instruction
}

// [mnemonic, outputCount, inputCount]
const instructions = [
  ["iconst", 1, 0],
  ["iadd", 0, 2],
  ["print", 0, 0]
]

const instructionsByMnemonic = { }
for (let i = 0; i < instructions.length; i ++) {
  const [mnemonic, argCount, returnCount] = instructions[i]
  instructionsByMnemonic[mnemonic] = { opcode: i, mnemonic, argCount, returnCount }
}
