System.registerDynamic('npm:domready@1.0.8/ready.js', [], true, function ($__require, exports, module) {
  /* */
  "format cjs";
  /*!
    * domready (c) Dustin Diaz 2014 - License MIT
    */

  var global = this || self,
      GLOBAL = global;
  !function (name, definition) {

    if (typeof module != 'undefined') module.exports = definition();else if (typeof undefined == 'function' && typeof define.amd == 'object') define(definition);else this[name] = definition();
  }('domready', function () {

    var fns = [],
        listener,
        doc = document,
        hack = doc.documentElement.doScroll,
        domContentLoaded = 'DOMContentLoaded',
        loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);

    if (!loaded) doc.addEventListener(domContentLoaded, listener = function () {
      doc.removeEventListener(domContentLoaded, listener);
      loaded = 1;
      while (listener = fns.shift()) listener();
    });

    return function (fn) {
      loaded ? setTimeout(fn, 0) : fns.push(fn);
    };
  });
});
System.registerDynamic("npm:domready@1.0.8.js", ["npm:domready@1.0.8/ready.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("npm:domready@1.0.8/ready.js");
});
System.registerDynamic('src-promise/app/cases.js', [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    module.exports = function test() {
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
    };
});
System.registerDynamic("src-promise/app/emitter-observer.js", [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var count = 0;
    function emitter(resolve, reject) {
        setTimeout(function () {
            console.log("sent value: " + count);
            resolve(count++);
        }, 500);
        // setTimeout(()=> {
        //     reject(new Error('error at ' + count));
        // }, 2000)
    }
    ;
    function observer1_resolve(value) {
        console.log("[1] received value: " + value);
        return new Promise(emitter);
    }
    ;
    function observer1_reject(reason) {
        console.log("[1] received error: " + reason);
        return reason;
    }
    ;
    function observer2_resolve(value) {
        console.log("[2] received value: " + value);
        return new Promise(emitter);
    }
    ;
    function observer2_reject(reason) {
        console.log("[2] received error: " + reason);
        return reason;
    }
    ;
    module.exports = function test() {
        var queue1 = new Promise(emitter);
        var queue2 = queue1.then(observer1_resolve, observer1_reject);
        var queue3 = queue2.then(observer2_resolve, observer2_reject);
        var queue23 = queue1.then(observer1_resolve, observer1_reject).then(observer2_resolve, observer2_reject);
    };
});
System.registerDynamic('src-promise/app/eventlistener.js', [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    module.exports = function test() {
        var button = document.createElement('button');
        button.innerText = 'Click to resolve one-time promise';
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(button);
        var clickPromise = new Promise(function (resolve, reject) {
            button.addEventListener('click', function (event) {
                resolve(event);
            });
        });
        clickPromise.then(function (value) {
            console.log('1. first clicked');
        });
        clickPromise.then(function (value) {
            console.log('2. first clicked');
        });
        clickPromise.then(function (value) {
            console.log('3. first clicked');
        });
    };
});
System.registerDynamic("src-promise/app/main.js", ["npm:domready@1.0.8.js", "src-promise/app/cases.js", "src-promise/app/emitter-observer.js", "src-promise/app/eventlistener.js"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    var domready = $__require("npm:domready@1.0.8.js");
    var t1 = $__require("src-promise/app/cases.js");
    var t2 = $__require("src-promise/app/emitter-observer.js");
    var t3 = $__require("src-promise/app/eventlistener.js");
    domready(function () {
        setTimeout(function () {
            console.log('---- test1 ----');
            t1();
        }, 0);
        setTimeout(function () {
            console.log('---- test2 ----');
            t2();
        }, 2000);
        t3();
    });
});
//# sourceMappingURL=build.js.map