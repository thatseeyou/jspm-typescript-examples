"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shelljs_1 = require("shelljs");
var path = require("path");
// 1. cd docs
var projDir = path.dirname(path.dirname(require.main.filename));
shelljs_1.cd(projDir + '/docs');
// 2. jspm bundle
if (process.argv.length > 2) {
    var arg = process.argv[2];
    if (arg == '--unbundle') {
        subRun(unbundle);
        // ls('-d', '*/').forEach(function (srcDir, index, array) {
        //     unbundle(srcDir);
        // });
    }
    else {
        var srcDir = arg + '/';
        bundle(srcDir);
    }
}
else {
    subRun(bundle);
    // ls('-d', '*/').forEach(function (srcDir, index, array) {
    //     bundle(srcDir);
    // });
}
function subRun(action) {
    shelljs_1.ls('-d', '*/').forEach(function (subDir, index, array) {
        action(subDir);
    });
}
function bundle(subDir) {
    var startModule = "./" + subDir + "app/main";
    var buildJS = "./" + subDir + "build.js";
    // jspm bundle ./src-parallax/app/main ./src-parallax/build.js )",
    shelljs_1.exec("../node_modules/.bin/jspm bundle " + startModule + " " + buildJS);
}
function unbundle(subDir) {
    var buildJS = "./" + subDir + "build.js";
    if (shelljs_1.test('-f', buildJS)) {
        shelljs_1.rm(buildJS);
    }
}
//# sourceMappingURL=bundle.js.map