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
System.registerDynamic("src-notification-center/app/notificatoncenter.js", [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSNotificationCenter = function () {
        function NSNotificationCenter() {
            this.useCapture = true;
            this.el = document;
        }
        NSNotificationCenter.defaultCenter = function () {
            return NSNotificationCenter.nc === null ? new NSNotificationCenter() : NSNotificationCenter.nc;
        };
        NSNotificationCenter.prototype.addObserver = function (name, observer) {
            // add an appropriate event listener
            var listener = function (e) {
                observer(e.type, e.detail);
                e.stopPropagation();
            };
            this.el.addEventListener(name, listener, this.useCapture);
            return listener;
        };
        NSNotificationCenter.prototype.removeObserver = function (name, listener) {
            this.el.removeEventListener(name, listener, this.useCapture);
        };
        NSNotificationCenter.prototype.post = function (name, userInfo) {
            // create and dispatch the event
            var event = new CustomEvent(name, {
                detail: userInfo
            });
            this.el.dispatchEvent(event);
        };
        return NSNotificationCenter;
    }();
    NSNotificationCenter.nc = null;
    exports.NSNotificationCenter = NSNotificationCenter;
});
System.registerDynamic("src-notification-center/app/tests.js", ["src-notification-center/app/notificatoncenter.js"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    var notificatoncenter_1 = $__require("src-notification-center/app/notificatoncenter.js");
    var eventString = 'evString';
    var eventObject = 'evObject';
    var listeners = [];
    function addObservers() {
        var listener1 = notificatoncenter_1.NSNotificationCenter.defaultCenter().addObserver(eventString, stringObserver1);
        listeners.push({ name: eventString, listener: listener1 });
        console.log('add stringObserver1');
        var listener2 = notificatoncenter_1.NSNotificationCenter.defaultCenter().addObserver(eventString, stringObserver2);
        listeners.push({ name: eventString, listener: listener2 });
        console.log('add stringObserver2');
        var listener3 = notificatoncenter_1.NSNotificationCenter.defaultCenter().addObserver(eventObject, objectObserver);
        listeners.push({ name: eventObject, listener: listener3 });
        console.log('add objectObserver');
    }
    exports.addObservers = addObservers;
    function removeObservers() {
        listeners.forEach(function (value) {
            console.log("remove " + value.name);
            notificatoncenter_1.NSNotificationCenter.defaultCenter().removeObserver(value.name, value.listener);
        });
    }
    exports.removeObservers = removeObservers;
    function postString() {
        console.log('post eventString with \'userInfo\'');
        notificatoncenter_1.NSNotificationCenter.defaultCenter().post(eventString, 'userInfo');
    }
    exports.postString = postString;
    function postObject() {
        console.log('post eventObject with object');
        notificatoncenter_1.NSNotificationCenter.defaultCenter().post(eventObject, { a: '123' });
    }
    exports.postObject = postObject;
    function stringObserver1(name, value) {
        console.log("[stringObserver1] event '" + name + "' received with " + value);
    }
    function stringObserver2(name, value) {
        console.log("[stringObserver2] event '" + name + "' received with " + value);
    }
    function objectObserver(name, value) {
        console.log("[objectObserver] event '" + name + "' received with " + value.a);
    }
});
System.registerDynamic("src-notification-center/app/main.js", ["npm:domready@1.0.8.js", "npm:screenlog@0.2.2.js", "libs/testbutton.js", "src-notification-center/app/tests.js"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    var domready = $__require("npm:domready@1.0.8.js");
    $__require("npm:screenlog@0.2.2.js");
    var testbutton_1 = $__require("libs/testbutton.js");
    var notification = $__require("src-notification-center/app/tests.js");
    var tests = [{ text: '---- clear log ----', action: screenLog.clear }, { text: 'add observers', action: notification.addObservers }, { text: 'post string ', action: notification.postString }, { text: 'post object', action: notification.postObject }, { text: 'remove all observers', action: notification.removeObservers }];
    domready(function () {
        screenLog.init({ autoScroll: true });
        testbutton_1.makeTestButtons(tests);
    });
});
//# sourceMappingURL=build.js.map