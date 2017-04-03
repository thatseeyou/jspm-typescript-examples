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
System.registerDynamic('npm:screenlog@0.2.2/screenlog.js', [], true, function ($__require, exports, module) {
	/* */
	"format cjs";

	var global = this || self,
	    GLOBAL = global;
	(function () {

		var logEl,
		    isInitialized = false,
		    _console = {}; // backup console obj to contain references of overridden fns.
		_options = {
			bgColor: 'black',
			logColor: 'lightgreen',
			infoColor: 'blue',
			warnColor: 'orange',
			errorColor: 'red',
			freeConsole: false,
			css: '',
			autoScroll: true
		};

		function createElement(tag, css) {
			var element = document.createElement(tag);
			element.style.cssText = css;
			return element;
		}

		function createPanel() {
			var div = createElement('div', 'z-index:2147483647;font-family:Helvetica,Arial,sans-serif;font-size:10px;font-weight:bold;padding:5px;text-align:left;opacity:0.8;position:fixed;right:0;top:0;min-width:200px;max-height:50vh;overflow:auto;background:' + _options.bgColor + ';' + _options.css);
			return div;
		}

		function genericLogger(color) {
			return function () {
				var el = createElement('div', 'line-height:18px;min-height:18px;background:' + (logEl.children.length % 2 ? 'rgba(255,255,255,0.1)' : '') + ';color:' + color); // zebra lines
				var val = [].slice.call(arguments).reduce(function (prev, arg) {
					return prev + ' ' + (typeof arg === "object" ? JSON.stringify(arg) : arg);
				}, '');
				el.textContent = val;

				logEl.appendChild(el);

				// Scroll to last element, if autoScroll option is set.
				if (_options.autoScroll) {
					logEl.scrollTop = logEl.scrollHeight - logEl.clientHeight;
				}
			};
		}

		function clear() {
			logEl.innerHTML = '';
		}

		function log() {
			return genericLogger(_options.logColor).apply(null, arguments);
		}

		function info() {
			return genericLogger(_options.infoColor).apply(null, arguments);
		}

		function warn() {
			return genericLogger(_options.warnColor).apply(null, arguments);
		}

		function error() {
			return genericLogger(_options.errorColor).apply(null, arguments);
		}

		function setOptions(options) {
			for (var i in options) if (options.hasOwnProperty(i) && _options.hasOwnProperty(i)) {
				_options[i] = options[i];
			}
		}

		function init(options) {
			if (isInitialized) {
				return;
			}

			isInitialized = true;

			if (options) {
				setOptions(options);
			}

			logEl = createPanel();
			document.body.appendChild(logEl);

			if (!_options.freeConsole) {
				// Backup actual fns to keep it working together
				_console.log = console.log;
				_console.clear = console.clear;
				_console.info = console.info;
				_console.warn = console.warn;
				_console.error = console.error;
				console.log = originalFnCallDecorator(log, 'log');
				console.clear = originalFnCallDecorator(clear, 'clear');
				console.info = originalFnCallDecorator(info, 'info');
				console.warn = originalFnCallDecorator(warn, 'warn');
				console.error = originalFnCallDecorator(error, 'error');
			}
		}

		function destroy() {
			isInitialized = false;
			console.log = _console.log;
			console.clear = _console.clear;
			console.info = _console.info;
			console.warn = _console.warn;
			console.error = _console.error;
			logEl.remove();
		}

		/**
   * Checking if isInitialized is set
   */
		function checkInitialized() {
			if (!isInitialized) {
				throw 'You need to call `screenLog.init()` first.';
			}
		}

		/**
   * Decorator for checking if isInitialized is set
   * @param  {Function} fn Fn to decorate
   * @return {Function}      Decorated fn.
   */
		function checkInitDecorator(fn) {
			return function () {
				checkInitialized();
				return fn.apply(this, arguments);
			};
		}

		/**
   * Decorator for calling the original console's fn at the end of
   * our overridden fn definitions.
   * @param  {Function} fn Fn to decorate
   * @param  {string} fn Name of original function
   * @return {Function}      Decorated fn.
   */
		function originalFnCallDecorator(fn, fnName) {
			return function () {
				fn.apply(this, arguments);
				if (typeof _console[fnName] === 'function') {
					_console[fnName].apply(console, arguments);
				}
			};
		}

		// Public API
		window.screenLog = {
			init: init,
			log: originalFnCallDecorator(checkInitDecorator(log), 'log'),
			clear: originalFnCallDecorator(checkInitDecorator(clear), 'clear'),
			info: originalFnCallDecorator(checkInitDecorator(clear), 'info'),
			warn: originalFnCallDecorator(checkInitDecorator(warn), 'warn'),
			error: originalFnCallDecorator(checkInitDecorator(error), 'error'),
			destroy: checkInitDecorator(destroy)
		};
	})();
});
System.registerDynamic("npm:screenlog@0.2.2.js", ["npm:screenlog@0.2.2/screenlog.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("npm:screenlog@0.2.2/screenlog.js");
});
System.registerDynamic("libs/testbutton.js", [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    function makeTestButtons(items) {
        var container = document.getElementById('test-buttons');
        items.forEach(function (item) {
            makeTestButton(container, item.text, function (targetButton) {
                console.log(">>> START of " + item.text);
                item.action(targetButton);
                console.log("<<< END of " + item.text);
                console.log();
            });
        });
    }
    exports.makeTestButtons = makeTestButtons;
    function makeTestButton(parent, text, action) {
        var _this = this;
        var button = document.createElement('button');
        button.innerText = text;
        button.style.display = 'block';
        parent.appendChild(button);
        button.addEventListener('click', function (event) {
            action(_this);
        });
    }
});
System.registerDynamic("src-promise/app/cases.js", [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    function test1() {
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
    }
    exports.test1 = test1;
    function test2() {
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
    }
    exports.test2 = test2;
    function test3() {
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
    }
    exports.test3 = test3;
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
System.registerDynamic("src-promise/app/eventlistener.js", [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    function test1() {
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
            return Promise.resolve(value);
        });
        clickPromise.then(function (value) {
            console.log('2. first clicked');
        });
        clickPromise.then(function (value) {
            console.log('3. first clicked');
        });
    }
    exports.test1 = test1;
    function test2() {
        var button = document.createElement('button');
        button.innerText = 'Click to resolve one-time promise';
        document.body.appendChild(button);
        button.addEventListener('click', function (event) {
            var clickPromise = new Promise(function (resolve, reject) {
                resolve(event);
            });
            clickPromise.then(observer1);
            clickPromise.then(observer2);
            clickPromise.then(observer3);
        });
        function observer1(value) {
            console.log('1. first clicked');
        }
        function observer2(value) {
            console.log('2. first clicked');
        }
        function observer3(value) {
            console.log('3. first clicked');
        }
    }
    exports.test2 = test2;
});
System.registerDynamic("src-promise/app/function2promise.js", [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    function add(left, right) {
        return left + right;
    }
    function fn2promise(fn) {
        var input = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            input[_i - 1] = arguments[_i];
        }
        var pipe = new Promise(function open(stdout /* resolve */, stderr /* reject */) {
            var output = fn.apply(this, input);
            try {
                console.log(output + " sent");
                stdout(output);
            } catch (e) {
                stderr(e);
            }
        });
        return pipe;
    }
    module.exports = function test() {
        var output = add(10, 20);
        console.log("output is " + output);
        var p1 = fn2promise(add, 10, 20);
        p1.then(function (value) {
            console.log(value + " received");
        });
        var p2 = fn2promise(add, 1, 2);
        p2.then(function (value) {
            console.log(value + " received");
            return fn2promise(add, value, 3);
        }).then(function (value) {
            console.log(value + " received");
            return fn2promise(add, value, 4);
        }).then(function (value) {
            console.log(value + " received");
            return value + 5;
        }).then(function (value) {
            /* nothing received */
            console.log(value + " received");
        });
    };
});
System.registerDynamic("src-promise/app/main.js", ["npm:domready@1.0.8.js", "npm:screenlog@0.2.2.js", "libs/testbutton.js", "src-promise/app/cases.js", "src-promise/app/emitter-observer.js", "src-promise/app/eventlistener.js", "src-promise/app/function2promise.js"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    var domready = $__require("npm:domready@1.0.8.js");
    $__require("npm:screenlog@0.2.2.js");
    var testbutton_1 = $__require("libs/testbutton.js");
    var cases = $__require("src-promise/app/cases.js");
    var t2 = $__require("src-promise/app/emitter-observer.js");
    var t3 = $__require("src-promise/app/eventlistener.js");
    var t4 = $__require("src-promise/app/function2promise.js");
    var tests = [{ text: '---- clear log ----', action: screenLog.clear }, { text: 'simple cases - 1', action: cases.test1 }, { text: 'simple cases - 2', action: cases.test2 }, { text: 'simple cases - 3', action: cases.test3 }, { text: 'emitter-observer', action: t2 }, { text: 'function to promise', action: t4 }, { text: 'eventlistener to one-time promise', action: t3.test1 }, { text: 'eventlistener to continuous promise', action: t3.test2 }];
    domready(function () {
        screenLog.init({ autoScroll: true });
        testbutton_1.makeTestButtons(tests);
    });
});
//# sourceMappingURL=build.js.map