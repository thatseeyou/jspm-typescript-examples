System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "github:*": "../jspm_packages/github/*",
    "npm:*": "../jspm_packages/npm/*"
  },

  map: {
    "css": "github:systemjs/plugin-css@0.1.32",
    "d3-selection": "npm:d3-selection@1.0.4",
    "jquery": "npm:jquery@2.2.4",
    "jquery-parallax.js": "npm:jquery-parallax.js@1.4.3",
    "parallax": "github:wagerfield/parallax@2.1.3",
    "npm:jquery-parallax.js@1.4.3": {
      "jquery": "npm:jquery@2.2.4"
    }
  }
});
