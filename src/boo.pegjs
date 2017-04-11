start = program

program = instructions

instructions = eol* head:instruction tail:(eol+ i:instruction { return i })* eol* {
  return [head, ...tail]
}

instruction = mnemonic:mnemonic operands:(__ o:operand { return o })* {
  return { kind: "instruction", mnemonic, operands: operands || [] }
}

mnemonic = [a-z]+ { return text() }

operand = int

int = chars:[0-9]+ { return +text() }

// mandatory whitespace
__ = space+

// optional whitespace
_ = space*

space = [ \t]
eol = [\r\n]
