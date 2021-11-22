#include <napi.h>
#include <iostream>
#include <vector>

#ifdef __cplusplus
extern "C" {
#endif

  #include <libgnparser.h>

#ifdef __cplusplus
}
#endif

char format[] = "compact";

Napi::Value GNParseToString(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 3) {
    Napi::TypeError::New(env, "Wrong number of arguments: 3 arguments are required")
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  if (!info[0].IsString()) {
    Napi::TypeError::New(env, "Wrong arguments: a string is required").ThrowAsJavaScriptException();
    return env.Null();
  }

  int details = info[1].As<Napi::Boolean>() ? 1 : 0;
  int cultivars = info[2].As<Napi::Boolean>() ? 1 : 0;
  int diaereses = info[3].As<Napi::Boolean>() ? 1 : 0;

  std::string str = info[0].ToString().Utf8Value();
  char* name = const_cast<char*>(str.c_str());

  const char* res = ParseToString(name, format, details, cultivars, diaereses);
  return Napi::String::New(env, res);

}

Napi::Value GNParseAryToString(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 3) {
    Napi::TypeError::New(env, "Wrong number of arguments: 3 arguments are required")
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  if (!info[0].IsArray()) {
    Napi::TypeError::New(env, "Wrong arguments: an array is required").ThrowAsJavaScriptException();
    return env.Null();
  }

  int details = info[1].As<Napi::Boolean>() ? 1 : 0;
  int cultivars = info[2].As<Napi::Boolean>() ? 1 : 0;
  int diaereses = info[3].As<Napi::Boolean>() ? 1 : 0;

  const Napi::Array nArr = info[0].As<Napi::Array>();
  char* names[nArr.Length()];

  for (uint32_t i = 0, len = nArr.Length(); i < len; i++) {
    std::string str = nArr.Get(i).ToString().Utf8Value();
    char* word = strcpy(new char[str.length() + 1], str.c_str());
    names[i] = word;
  }

  const char* res = ParseAryToString(names, nArr.Length(), format, details, cultivars, diaereses);

  return Napi::String::New(env, res);
}


Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "parseToString"),
              Napi::Function::New(env, GNParseToString));
  exports.Set(Napi::String::New(env, "parseArrayToString"),
              Napi::Function::New(env, GNParseAryToString));
  return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)