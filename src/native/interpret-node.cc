// hello.cc
#include <node.h>

extern "C" {
  #include "./interpret.h"
}

namespace boo {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;
using v8::Uint8Array;
using v8::Integer;

void Interpret(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  // TODO check call arity and arg types
  Local<Object> program = args[0]->ToObject(isolate);
  Local<Uint8Array> jsCode = program->Get(String::NewFromUtf8(isolate, "code")).As<Uint8Array>();
  Local<Integer> jsStackSize = program->Get(String::NewFromUtf8(isolate, "stackSize"))->ToInteger();

  void *jsCodeData = jsCode->Buffer()->GetContents().Data();
  uint8_t *code = static_cast<uint8_t*>(jsCodeData);

  int64_t stackSize = jsStackSize->Value();

  // FIXME public API should be a small subset of State
  int stack[stackSize];
  State *state = (State*)malloc(sizeof(State));
  state->sp = -1;
  state->ip = 0;
  state->code_length = jsCode->Length();
  state->code = code;
  state->stack_length = stackSize;
  state->stack = stack;

  execute(state);

  int result = state->stack[state->sp];
  Local<Integer> jsResult = Integer::New(isolate, result);
  free(state);

  args.GetReturnValue().Set(jsResult);
}

void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "interpret", Interpret);
}

NODE_MODULE(addon, init)

}
