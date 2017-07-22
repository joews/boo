start = instructions

instructions = space* head:instruction tail:(space+ o:instruction { return o })* space* {
  return [head, ...tail];
}

instruction = opcodeHex:opcode _ mnemonic:mnemonic _ argTypes:type_list ":" _ operandTypes:type_list _ "->" _ resultTypes:type_list {
  const opcode = parseInt(opcodeHex, 16);
  return { opcodeHex, opcode, mnemonic, argTypes, operandTypes, resultTypes }
}

opcode = "0x" [0-9a-f][0-9a-f] {
  return text()
}

mnemonic = [a-z0-9]+ {
  return text()
}

type = "label" / "int32" / "float64" / "string" / "boolean" / "void"

type_list
  = "()" { return [] }
  / "(" head:type tail:(", " t:type { return t })* ")" {
      return [head, ...tail]
    }

_ = " "
space = eol / comment
eol = [\r\n]
comment = "#" [^\r\n]*
