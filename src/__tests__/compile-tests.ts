/* eslint-env jest */
import parse from "../parse";
import compile from "../compile";

function testCompile(source: string) {
  test(source, () => {
    const parsed = parse(source);
    // console.log(JSON.stringify(parsed))
    const compiled = compile(parsed);
    // console.log(compiled)
    expect(compiled).toMatchSnapshot();
  });
}

testCompile("const_i32 3");

testCompile(`
.globals 3
const_i32 3
const_i32 5
add_i32
print_i32
`);

testCompile(`
first: const_i32 1
print_i32
second: const_i32 2
third: const_i32 3
add_i32
`);

testCompile(`
const_i32 1
jmp skip
const_i32 2
add_i32
skip:
  const_i32 3
add_i32
`);
