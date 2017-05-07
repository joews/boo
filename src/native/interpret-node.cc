// hello.cc
#include <node.h>

namespace boo {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void Interpret(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  // TODO check call arity and arg types
  Local<Object> program = args[0]->ToObject(isolate);
  Local<Value> code = program->Get(String::NewFromUtf8(isolate, "code"));
  Local<Value> stackSize = program->Get(String::NewFromUtf8(isolate, "stackSize"));

  // TODO do the thing

  args.GetReturnValue().Set(code);
}

void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "interpret", Interpret);
}

NODE_MODULE(addon, init)

}
