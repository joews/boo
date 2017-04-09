start = program

program = instruction

instruction = opcode:opcode operands:(__ o:operand { return o })* {
  return { opcode, operands: operands || [] }
}

opcode = [a-z]+ { return text() }

operand = int

int = chars:[0-9]+ { return +text() }

// mandatory whitespace
__ = space+

// optional whitespace
_ = space*

space = [ \t]
eol = [\r\n]+
