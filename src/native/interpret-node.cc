// hello.cc
#include <node.h>

namespace boo {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;
using v8::Uint8Array;

void Interpret(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  // TODO check call arity and arg types
  Local<Object> program = args[0]->ToObject(isolate);
  Local<Uint8Array> jsCode = program->Get(String::NewFromUtf8(isolate, "code")).As<Uint8Array>();
  Local<Value> jsStackSize = program->Get(String::NewFromUtf8(isolate, "stackSize"));

  void *jsCodeData = jsCode->Buffer()->GetContents().Data();
  int8_t *code = static_cast<int8_t*>(jsCodeData);

  // check we can write to the JS typed array
  for (int i = 0; i < jsCode->Length(); i ++) {
    code[i] ++;
  }

  args.GetReturnValue().Set(jsCode);
}

void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "interpret", Interpret);
}

NODE_MODULE(addon, init)

}
