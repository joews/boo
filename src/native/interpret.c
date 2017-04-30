#include <stdio.h>
#include <stdlib.h>
#include "interpret.h"

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
    case 0: // iconst
      state->stack[++state->sp] = state->code[state->ip++];
      break;
    case 1: // add
      a = state->stack[state->sp--];
      b = state->stack[state->sp--];
      state->stack[++state->sp] = a + b;
      break;
    case 2: // printf
      printf("%d\n", state->stack[state->sp--]);
      break;
    case 8: // eq
      a = state->stack[state->sp--];
      b = state->stack[state->sp--];
      state->stack[++state->sp] = a == b;
      break;
    case 9: // ne
      a = state->stack[state->sp--];
      b = state->stack[state->sp--];
      state->stack[++state->sp] = a != b;
      break;
    case 10: // lt
      a = state->stack[state->sp--];
      b = state->stack[state->sp--];
      state->stack[++state->sp] = a < b;
      break;
    case 11: // gt
      a = state->stack[state->sp--];
      b = state->stack[state->sp--];
      state->stack[++state->sp] = a > b;
      break;
    case 12: // lte
      a = state->stack[state->sp--];
      b = state->stack[state->sp--];
      state->stack[++state->sp] = a <= b;
      break;
    case 13: // gte
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
