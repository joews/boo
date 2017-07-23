import readInstructions from "./parse-instructions";
import { Instruction } from "./types";

const instructions: Instruction[] = readInstructions();

export default function getInstructionByName(mnemonic: string) {
  const instruction = instructionsByMnemonic[mnemonic];
  if (instruction == null) {
    throw new Error(`Unknown instruction [${mnemonic}]`);
  }

  return instruction;
}

// Export mnemonic -> instruction map via getInstructionByName
// so we can throw at band instructions at assemble time
const instructionsByMnemonic: { [mnemonic: string]: Instruction } = {};

// Export opcode -> mnemonic map directly to save a function call
// at interpret time
export const mnemonicsByOpcode: { [i: number]: string } = {};

for (let i = 0; i < instructions.length; i++) {
  instructionsByMnemonic[instructions[i].mnemonic] = instructions[i];
}

for (let i = 0; i < instructions.length; i++) {
  const { mnemonic, opcode } = instructions[i];
  mnemonicsByOpcode[opcode] = mnemonic;
}
