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
            makeTestButton(container, item.text, function (targetButton, placeholder) {
                console.log(">>> START of " + item.text);
                item.action(targetButton, placeholder);
                console.log("<<< END of " + item.text);
                console.log();
            });
        });
    }
    exports.makeTestButtons = makeTestButtons;
    function makeTestButton(parent, text, action) {
        var _this = this;
        // 1. make button
        var button = document.createElement('button');
        button.innerText = text;
        button.style.display = 'block';
        // 2. make placeholder below button
        var placeholder = document.createElement('div');
        // 3. append to parent
        parent.appendChild(button);
        parent.appendChild(placeholder);
        // 4. listen click event 
        button.addEventListener('click', function (event) {
            action(_this, placeholder);
        });
    }
});
System.registerDynamic("src-decorator/app/decorators.js", [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    function traceFactory(enable, prefix) {
        if (prefix === void 0) {
            prefix = '';
        }
        console.log('trace called');
        return function (target, propertyKey, descriptor) {
            console.log('inner trace called');
            // console.log('target =');
            // console.dir(target);
            // console.dir(target.constructor.prototype);
            // console.log('propertyKey =');
            // console.dir(propertyKey);
            // console.log('descriptor =');
            // console.dir(descriptor);
            if (enable == false) return;
            var orgMethod = descriptor.value;
            descriptor.value = function () {
                console.log(prefix + ">>> ENTER " + target.constructor.name + "::" + propertyKey);
                var retValue = orgMethod.apply(this, arguments);
                console.log(prefix + "<<< EXIT  " + target.constructor.name + "::" + propertyKey);
                return retValue;
            };
        };
    }
    exports.traceFactory = traceFactory;
    function trace(target, propertyKey, descriptor) {
        // console.log('trace2 called');
        // console.log('target =');
        // console.dir(target);
        // console.dir(target.constructor.prototype);
        // console.log('propertyKey =');
        // console.dir(propertyKey);
        // console.log('descriptor =');
        // console.dir(descriptor);
        var orgMethod = descriptor.value;
        descriptor.value = function () {
            console.log(">>> ENTER " + target.constructor.name + "::" + propertyKey);
            var retValue = orgMethod.apply(this, arguments);
            console.log("<<< EXIT  " + target.constructor.name + "::" + propertyKey);
            return retValue;
        };
    }
    exports.trace = trace;
    ;
});
System.registerDynamic("src-decorator/app/tests.js", ["src-decorator/app/decorators.js"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var decorators_1 = $__require("src-decorator/app/decorators.js");
    var ParentClass = /** @class */function () {
        function ParentClass() {
            this.p1 = 42;
        }
        ParentClass.prototype.iMethod0 = function (arg1) {
            console.log("DO something in iMethod0(" + arg1 + "). p1 = " + this.p1);
            return arg1;
        };
        ParentClass.prototype.iMethod1 = function (arg1) {
            console.log("DO something in iMethod1(" + arg1 + "). p1 = " + this.p1);
            return arg1;
        };
        ParentClass.prototype.iMethod2 = function (arg1) {
            console.log("DO something in iMethod2(" + arg1 + "). p1 = " + this.p1);
            return arg1;
        };
        ParentClass.prototype.iMethod3 = function (arg1) {
            console.log("DO something in iMethod3(" + arg1 + "). p1 = " + this.p1);
            return arg1;
        };
        __decorate([decorators_1.traceFactory(true), __metadata("design:type", Function), __metadata("design:paramtypes", [Number]), __metadata("design:returntype", void 0)], ParentClass.prototype, "iMethod1", null);
        __decorate([decorators_1.traceFactory(true, 'IMPORTANT! '), __metadata("design:type", Function), __metadata("design:paramtypes", [Number]), __metadata("design:returntype", void 0)], ParentClass.prototype, "iMethod2", null);
        __decorate([decorators_1.traceFactory(false), __metadata("design:type", Function), __metadata("design:paramtypes", [Number]), __metadata("design:returntype", void 0)], ParentClass.prototype, "iMethod3", null);
        return ParentClass;
    }();
    var ChildClass = /** @class */function (_super) {
        __extends(ChildClass, _super);
        function ChildClass() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.p1 = 100;
            return _this;
        }
        return ChildClass;
    }(ParentClass);
    var Parent2Class = /** @class */function () {
        function Parent2Class() {
            this.p1 = 42;
        }
        Parent2Class.prototype.iMethod1 = function (arg1) {
            console.log("DO something in iMethod1(" + arg1 + "). p1 = " + this.p1);
            return arg1;
        };
        __decorate([decorators_1.trace, __metadata("design:type", Function), __metadata("design:paramtypes", [Number]), __metadata("design:returntype", void 0)], Parent2Class.prototype, "iMethod1", null);
        return Parent2Class;
    }();
    function test1() {
        var parent = new ParentClass();
        parent.iMethod0(10);
        var ret1 = parent.iMethod1(10);
        console.log("return = " + ret1);
        parent.iMethod2(20);
        parent.iMethod3(30);
        console.log('------------');
        var child = new ChildClass();
        child.iMethod0(10);
        var ret2 = child.iMethod1(10);
        console.log("return = " + ret2);
        child.iMethod2(20);
        child.iMethod3(30);
    }
    exports.test1 = test1;
    function test2() {
        var parent = new Parent2Class();
        var ret1 = parent.iMethod1(10);
        console.log("return = " + ret1);
    }
    exports.test2 = test2;
});
System.registerDynamic("src-decorator/app/main.js", ["npm:domready@1.0.8.js", "npm:screenlog@0.2.2.js", "libs/testbutton.js", "src-decorator/app/tests.js"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    var domready = $__require("npm:domready@1.0.8.js");
    $__require("npm:screenlog@0.2.2.js");
    var testbutton_1 = $__require("libs/testbutton.js");
    var t = $__require("src-decorator/app/tests.js");
    var tests = [{ text: '---- clear log ----', action: screenLog.clear }, { text: 'test decorator factory', action: t.test1 }, { text: 'test decorator', action: t.test2 }];
    domready(function () {
        screenLog.init({ autoScroll: true });
        testbutton_1.makeTestButtons(tests);
    });
});
//# sourceMappingURL=build.js.map