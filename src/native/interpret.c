#include <stdio.h>
#include <stdlib.h>
#include "interpret.h"
#include "opcodes.h"

void execute(State* state) {
  while(state->ip < state->code_length) {
    int opcode = state->code[state->ip++];
    trace(state, opcode);
    step(state, opcode);
  }

  printf("done\n");
}

void step(State* state, int opcode) {
  int a, b;

  switch(opcode) {
    case ICONST:
      state->stack[++state->sp] = state->code[state->ip++];
      break;
    case IADD:
      a = state->stack[state->sp--];
      b = state->stack[state->sp--];
      state->stack[++state->sp] = a + b;
      break;
    case PRINT:
      printf("%d\n", state->stack[state->sp--]);
      break;
    case EQ:
      a = state->stack[state->sp--];
      b = state->stack[state->sp--];
      state->stack[++state->sp] = a == b;
      break;
    case NE:
      a = state->stack[state->sp--];
      b = state->stack[state->sp--];
      state->stack[++state->sp] = a != b;
      break;
    case LT:
      a = state->stack[state->sp--];
      b = state->stack[state->sp--];
      state->stack[++state->sp] = a < b;
      break;
    case GT:
      a = state->stack[state->sp--];
      b = state->stack[state->sp--];
      state->stack[++state->sp] = a > b;
      break;
    case LTE:
      a = state->stack[state->sp--];
      b = state->stack[state->sp--];
      state->stack[++state->sp] = a <= b;
      break;
    case GTE:
      a = state->stack[state->sp--];
      b = state->stack[state->sp--];
      state->stack[++state->sp] = a >= b;
      break;
    default:
      fprintf(stderr, "Unknown opcode %d", opcode);
      exit(1);
  }
}

void trace(State* state, int opcode) {
  printf("[TRACE] %d@%d", opcode, state->ip - 1);

  printf("\t\tstack [");
  for (int i = 0; i < state->sp; i ++) {
    printf("%d,", state->stack[i]);
  }
  printf("%d]\n", state->stack[state->sp]);
}
