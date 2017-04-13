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

instruction = eol* label:label? mnemonic:mnemonic operands:(__ o:operand { return o })* {
  return {
    kind: "instruction",
    mnemonic, operands: operands || [],
    label: label || null
  }
}

mnemonic = [a-z]+ { return text() }
label_name = [a-z]+ { return text() }

label = name:label_name ":" ___ {
  return name
}

operand = int / label_name

int = chars:[0-9]+ { return +text() }

// mandatory whitespace
__ = space+

// optional whitespace
_ = space*

// mandatory space or EOL
___ = (space / eol)+

space = [ \t]
eol = [\r\n]
