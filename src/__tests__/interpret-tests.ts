/* eslint-env jest */
import { Program } from "../types";
import parse from "../parse";
import compile from "../compile";
import interpret from "../interpret";

function testInterpretBinary(name: string, program: Program, expected: any) {
  test(name, () => {
    const interpreted = interpret(program, { trace: true });
    expect(interpreted).toEqual(expected);
  });
}

function testInterpret(code: string, expected: any) {
  test(code, () => {
    const parsed = parse(code);
    // console.log(parsed)
    const compiled = compile(parsed);
    // console.log(compiled)
    const interpreted = interpret(compiled, { trace: true });
    expect(interpreted).toEqual(expected);
  });
}

// const_i32 3
// const_i32 5
// add_i32
testInterpretBinary(
  "add 2 numbers",
  {
    code: new Uint8Array([0x01, 3, 0x01, 5, 0x10]),
    stackSize: 2,
    globalSize: 0
  },
  8
);

// const_i32 2
// store_g_i32 0
// const_i32 3
// store_g_i32 1
// load_g_i32 0
// load_g_i32 1
// add
testInterpretBinary(
  "load and store",
  {
    code: new Uint8Array([
      0x01,
      2,
      0x60,
      0,
      0x01,
      3,
      0x60,
      1,
      0x61,
      0,
      0x61,
      1,
      0x10
    ]),
    stackSize: 2,
    globalSize: 2
  },
  5
);

testInterpret(
  `
const_i32 1
jmp skip
const_i32 2
add_i32
skip:
  const_i32 3
add_i32
`,
  4
);

testInterpret(
  `
const_i32 1
halt
const_i32 2
`,
  1
);

/*
i = 0
do:
  print i
  i = i + 1
while i != 3:
i
*/
testInterpret(
  `
.globals 1
const_i32 1
store_g_i32 0

next:

const_i32 1
load_g_i32 0
add_i32
store_g_i32 0

load_g_i32 0
const_i32 3
jne_i32 next
load_g_i32 0
`,
  3
);

testInterpret(
  `
const_i32 1
const_i32 1
eq_i32
`,
  1
);

testInterpret(
  `
const_i32 1
const_i32 2
eq_i32
`,
  0
);

testInterpret(
  `
const_i32 7
const_i32 2
ne_i32
`,
  1
);

testInterpret(
  `
const_i32 7
const_i32 7
ne_i32
`,
  0
);

testInterpret(
  `
const_i32 2
const_i32 1
lt_i32
`,
  1
);

testInterpret(
  `
const_i32 2
const_i32 2
lt_i32
`,
  0
);

testInterpret(
  `
const_i32 2
const_i32 1
lte_i32
`,
  1
);

testInterpret(
  `
const_i32 2
const_i32 2
lte_i32
`,
  1
);

testInterpret(
  `
const_i32 1
const_i32 2
gt_i32
`,
  1
);

testInterpret(
  `
const_i32 2
const_i32 2
gt_i32
`,
  0
);

testInterpret(
  `
const_i32 1
const_i32 2
gte_i32
`,
  1
);

testInterpret(
  `
const_i32 2
const_i32 2
gte_i32
`,
  1
);
