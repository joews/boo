start = program

program = header:header? instructions:instructions {
  if (header) {
    instructions.unshift(header)
  }

  return instructions
}

header = eol* ".globals" __ globals:int eol* {
  return { kind: "header", globals }
}

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
