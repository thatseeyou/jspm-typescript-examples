import { cd, echo, pwd, ls, exec, test, rm } from 'shelljs';
import path = require('path');

// 1. cd docs
const projDir = path.dirname(path.dirname(require.main.filename));
cd(projDir + '/docs');

// 2. jspm bundle
if (process.argv.length > 2) {
    let arg = process.argv[2];
    if (arg == '--unbundle') {
        subRun(unbundle);
        // ls('-d', '*/').forEach(function (srcDir, index, array) {
        //     unbundle(srcDir);
        // });
    }
    else {
        let srcDir = arg + '/';
        bundle(srcDir);
    }
}
else {
    subRun(bundle);
    // ls('-d', '*/').forEach(function (srcDir, index, array) {
    //     bundle(srcDir);
    // });
}

function subRun(action:(subDir:string) => void) {
    ls('-d', 'src-*/').forEach(function (subDir, index, array) {
        action(subDir);
    });
}

function bundle(subDir:string) {
    let startModule=`./${subDir}app/main`;
    let buildJS=`./${subDir}build.js`;

    // jspm bundle ./src-parallax/app/main ./src-parallax/build.js )",
    exec(`../node_modules/.bin/jspm bundle ${startModule} ${buildJS}`);
}

function unbundle(subDir:string) {
    let buildJS=`./${subDir}build.js`;

    if (test('-f', buildJS)) {
        rm(buildJS);
    }
}
