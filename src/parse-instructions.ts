import { readFileSync } from "fs";
import { join } from "path";
import { generate } from "pegjs";
import { Instruction } from "./types";

const parserSource = readFileSync(
  join(__dirname, "instructions.pegjs"),
  "utf8"
);
const parser = generate(parserSource);
const instructions = readFileSync(join(__dirname, "boo.instructions"), "utf8");

export default function read(): Instruction[] {
  return parse(instructions);
}

export function parse(source: string): Instruction[] {
  const instructions = parser.parse(source) as Instruction[];
  // console.log(`TRACE parse instructions: `, JSON.stringify(instructions));
  return instructions;
}
