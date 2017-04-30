#include <stdlib.h>
#include <stdio.h>
#include "./interpret.h"

#ifndef UNIT_TESTS

int main(void) {
  // TODO

  // iconst 7
  // iconst 5
  // add
  // print
  int code_length = 6;
  int code[] = { 0, 7, 0, 5, 1, 2 };

  int stack_length = 2;
  int stack[stack_length];

  State* state = malloc(sizeof(state));
  state->sp = -1;
  state->ip = 0;

  state->code_length = code_length;
  state->code = code;
  state->stack_length = stack_length;
  state->stack = stack;

  execute(state);
}

#endif
