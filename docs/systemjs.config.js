System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "github:*": "../jspm_packages/github/*",
    "npm:*": "../jspm_packages/npm/*"
  },

  map: {
    "adamschwartz/log": "github:adamschwartz/log@0.3.0",
    "bxslider": "npm:bxslider@4.2.11",
    "chartist": "npm:chartist@0.10.1",
    "codemirror": "npm:codemirror@5.25.0",
    "css": "github:systemjs/plugin-css@0.1.32",
    "d3-selection": "npm:d3-selection@1.0.4",
    "decimal.js": "github:MikeMcl/decimal.js@7.2.0",
    "domready": "npm:domready@1.0.8",
    "immutable": "npm:immutable@3.8.1",
    "jquery": "npm:jquery@2.2.4",
    "jquery-parallax.js": "npm:jquery-parallax.js@1.4.3",
    "log": "github:adamschwartz/log@0.3.0",
    "parallax": "github:wagerfield/parallax@2.1.3",
    "rxjs": "npm:rxjs@5.4.2",
    "screenlog": "npm:screenlog@0.2.2",
    "showdown": "github:showdownjs/showdown@1.7.1",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.1": {
      "buffer": "npm:buffer@5.0.6"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.10"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:buffer@5.0.6": {
      "base64-js": "npm:base64-js@1.2.1",
      "ieee754": "npm:ieee754@1.1.8"
    },
    "npm:bxslider@4.2.11": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:codemirror@5.25.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:jquery-parallax.js@1.4.3": {
      "jquery": "npm:jquery@2.2.4"
    },
    "npm:process@0.11.10": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:rxjs@5.4.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "symbol-observable": "npm:symbol-observable@1.0.4"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    }
  }
});
