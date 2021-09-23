{
  "targets": [
    {
      "conditions": [
        ['OS=="mac"', {
          'cflags+': ['-fvisibility=hidden'],
          'xcode_settings': {
            'GCC_SYMBOLS_PRIVATE_EXTERN': 'YES', # -fvisibility=hidden
          },
          'libraries': ['<(module_root_dir)/macos-arm64/libgnparser.so'],
          "include_dirs": ["<(module_root_dir)/macos-arm64"],
          'postbuilds': [
            {
              'postbuild_name': 'Change libgnparser load path',
              'action': ['install_name_tool', '-change',  'libgnparser.so', '@loader_path/../../macos-arm64/libgnparser.so', '<(PRODUCT_DIR)/gnparser.node'],
            },
          ]
        }],

        ['OS=="linux"', {
          'cflags+': ['-fvisibility=hidden'],
          'libraries': ['<(module_root_dir)/linux/libgnparser.so'],
          "include_dirs": ["<(module_root_dir)/linux"],
        }],

      ],
      "sources": [ "gnparser.cc" ],
      "defines": [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
      "include_dirs": ["<!(node -p \"require('node-addon-api').include_dir\")"],
      "target_name": "gnparser",
    }
  ]
}