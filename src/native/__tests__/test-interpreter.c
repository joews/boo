#include <stdio.h>
#include "../../../lib/tinytest.h"
#include "../interpret.h"

void test_e2e() {

  // iconst 7
  // iconst 5
  // add
  int code_length = 5;
  uint8_t code[] = { 0, 7, 0, 5, 1 };

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
  ASSERT_EQUALS(12, state->stack[0]);
}

int main(void)
{
  RUN(test_e2e);
  return TEST_REPORT();
}
