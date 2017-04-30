import readInstructions from '../../src/parse-instructions'

// TODO type definition
const rev = require('git-rev-sync')

//
// Script to generate opcode constants for the
// C interpreter.
//
const constants = readInstructions()
  .map(({ mnemonic, opcode }) =>
    `static const int ${mnemonic.toUpperCase()} = ${opcode};`
  )

const C_CODE =
`/**
 * GENERATED BY build/gen-c-opcodes.ts
 * ${new Date().toUTCString()}
 * Revision ${rev.short()}
 **/
${constants.join('\n')}

/**
 * End generated file
 **/
`

process.stdout.write(C_CODE)
