// State of an executing program
typedef struct {
  int sp;
  int ip;
  uint8_t* code;
  int code_length;
  int* stack;
  int stack_length;
} State;

void execute(State*);
void step(State*, int);
void trace(State*, int);
