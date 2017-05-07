const interpretNative = require('.')

const PROGRAM = {
  code: new Uint8Array([0, 3, 0, 5, 1]),
  stackSize: 2,
  globalSize: 0
}

const out = interpretNative(PROGRAM)
console.log(out)
