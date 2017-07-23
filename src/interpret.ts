import { Program } from "./types";
import { mnemonicsByOpcode } from "./instructions";

////// TODO instance state

// code memory and instructioon pointer
// ip points to the next instruction to execute
let code: Uint8Array;
let ip: number;

// stack data memory and stack pointer
// sp points to the last address in the stack
let operandStack: Uint8Array;
let sp: number;

let globals: Uint8Array;

let shouldTrace: boolean;
////// TODO end instance state

interface Options {
  trace: boolean;
}

export default function interpret(
  compiledProgram: Program,
  options: Options = { trace: false }
): number {
  code = compiledProgram.code;
  ip = 0;
  sp = -1;

  const operandBuffer = new ArrayBuffer(compiledProgram.stackSize);
  operandStack = new Uint8Array(operandBuffer);

  globals = new Uint8Array(compiledProgram.globalSize);

  shouldTrace = options.trace;
  if (shouldTrace) {
    traceStart();
  }

  while (ip < code.length) {
    visit();
  }

  // the value of a program is the value of the last expression
  return operandStack[sp];
}

function visit(): void {
  const opcode = code[ip++];
  const mnemonic = mnemonicsByOpcode[opcode];

  if (shouldTrace) {
    trace(opcode, mnemonic);
  }

  switch (mnemonic) {
    case "load_g_i32":
      return push(globals[code[ip++]]);
    case "store_g_i32":
      globals[code[ip++]] = pop();
      break;
    case "const_i32":
      return push(code[ip++]);
    case "add_i32":
      return push(pop() + pop());
    case "print_i32":
      return console.log(pop());
    case "jmp":
      ip = code[ip++];
      break;
    case "halt":
      ip = code.length;
      break;
    case "jne_i32":
      const label = code[ip++];
      if (pop() !== pop()) {
        ip = label;
      }
      break;
    case "eq_i32":
      return push(+(pop() === pop()));
    case "ne_i32":
      return push(+(pop() !== pop()));
    case "lt_i32":
      return push(+(pop() < pop()));
    case "gt_i32":
      return push(+(pop() > pop()));
    case "lte_i32":
      return push(+(pop() <= pop()));
    case "gte_i32":
      return push(+(pop() >= pop()));
    default:
      throw new Error("bad opcode " + mnemonic);
  }
}

function push(byte: number): void {
  operandStack[++sp] = byte & 0xff;
}

function pop(): number {
  return operandStack[sp--];
}

function traceStart() {
  console.log(
    `TRACE NEW PROGRAM with code size: ${code.length}, stack size: ${operandStack.length}, globals: ${globals.length}`
  );
}

function trace(opcode: number, mnemonic: string) {
  // show the defined region of the stack only
  let stack = [];
  for (let i = 0; i <= sp; i++) {
    stack[i] = operandStack[i];
  }

  console.log(
    `TRACE ${mnemonic}(${opcode})@${ip -
      1}\t\tstack [${stack}] \tglobals [${globals}]`
  );
}
