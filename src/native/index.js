const bindings = require('bindings')('interpret.node')

module.exports = function interpretNative(program) {
  return bindings.interpret(program)
}
