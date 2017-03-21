System.registerDynamic('src-promise/app/main.js', [], false, function ($__require, $__exports, $__module) {
    var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal($__module.id, null, null);

    (function ($__global) {
        var p1 = $__global['p1'],
            p2 = $__global['p2'],
            p3 = $__global['p3'];
        var p1 = new Promise(function (resolve, reject) {
            console.log('p1: RUN resolve');
            resolve(100);
        });
        p1.then(function (value) {
            console.log('p1:return value: ' + value);return value + 1;
        }).then(function (value) {
            console.log('p1:return value -> then: ' + value);
        });
        p1.then(function (value) {
            console.log('p1:return undefined:' + value);
        }).then(function (value) {
            console.log('p1:return undefined -> then: ' + value);
        });
        p1.then(function (value) {
            console.log('p1:return Promise: ' + value);return Promise.resolve(value + 1);
        }).then(function (value) {
            console.log('p1:return Promise -> then: ' + value);
        });
        console.log('p1: END OF DEFINITION');
        var p2 = new Promise(function (resolve, reject) {
            window.setTimeout(function () {
                console.log('p2: RUN resolve');resolve(100);
            }, 1000);
        });
        p2.then(function (value) {
            console.log('p2:return value: ' + value);return value + 1;
        }).then(function (value) {
            console.log('p2:return value -> then: ' + value);
        });
        p2.then(function (value) {
            console.log('p2:return value: ' + value);return value + 1;
        }).catch(function (reason) {
            console.log('p2:MUST NOT CALLED');
        }).then(function (value) {
            console.log('p2:return value -> catch -> then: ' + value);
        });
        console.log('p2: END OF DEFINITION');
        var p3 = new Promise(function (resolve, reject) {
            try {
                throw new Error('intened exception');
            } catch (e) {
                reject(e);
            }
        });
        p3.then(function (value) {
            return value;
        }, function (reason) {
            console.log('p3:reject return undefined: ' + reason);
        }).then(function (value) {
            console.log('p3:reject return undefined -> then: ' + value);
        }, function (reason) {
            console.log('p3:reject return undeined -> reject: ' + reason);
        });
        p3.then(function (value) {
            return value;
        }, function (reason) {
            console.log('p3:reject return reject: ' + reason);return Promise.reject(reason);
        }).then(function (value) {
            console.log('p3:reject return reject -> then: ' + value);
        }, function (reason) {
            console.log('p3:reject return reject -> reject: ' + reason);
        });
        p3.then(function (value) {
            return value;
        }).catch(function (reason) {
            console.log('p3:catch return undefined : ' + reason);
        }).then(function (reason) {
            console.log('p3:catch return undeined -> then: ' + reason);
        });
        p3.then(function (value) {
            return value;
        }).catch(function (reason) {
            console.log('p3:catch return reject: ' + reason);return Promise.reject(reason);
        }).catch(function (reason) {
            console.log('p3:catch return reject -> catch: ' + reason);
        });
        console.log('p3: END OF DEFINITION');
        $__global['p1'] = p1;
        $__global['p2'] = p2;
        $__global['p3'] = p3;
    })(this);

    return _retrieveGlobal();
});
//# sourceMappingURL=build.js.map