const interpretNative = require('.')

const PROGRAM = {
  code: new Uint8Array([0, 3, 0, 5, 0, 13, 1, 1]),
  stackSize: 2,
  globalSize: 0
}

const out = interpretNative({ code: PROGRAM.code, stackSize: 2 })
console.log(out)
