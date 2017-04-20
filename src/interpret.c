#include <stdio.h>
#include <stdlib.h>

// State of an executing program
typedef struct {
  int sp;
  int ip;
  int* code;
  int code_length;
  int* stack;
  int stack_length;
} State;

void execute(State* state);
void step(State* state, int opcode);
void trace(State* state, int opcode);

int main(void) {
  // TODO variable input
  int code_length = 6;
  int stack_length = 2;

  // iconst 7
  // iconst 5
  // add
  // print
  int code[] = { 0, 7, 0, 5, 1, 2 };
  int stack[stack_length];
  // end input

  State* state = malloc(sizeof(state));
  state->sp = -1;
  state->ip = 0;

  // TODO from input
  state->code_length = code_length;
  state->code = code;
  state->stack_length = stack_length;
  state->stack = stack;

  execute(state);
  return 0;
}

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
