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
        var button = document.createElement('button');
        button.innerText = text;
        button.style.display = 'block';
        var placeholder = document.createElement('div');
        parent.appendChild(button);
        parent.appendChild(placeholder);
        button.addEventListener('click', function (event) {
            action(_this, placeholder);
        });
    }
});
System.registerDynamic("src-reactive/app/creating.js", ["npm:rxjs@5.2.0/Observable.js", "npm:rxjs@5.2.0/Subject.js", "npm:rxjs@5.2.0/ReplaySubject.js", "npm:rxjs@5.2.0/add/observable/range.js", "npm:rxjs@5.2.0/add/observable/zip.js", "npm:rxjs@5.2.0/add/observable/merge.js", "npm:rxjs@5.2.0/add/observable/defer.js", "npm:rxjs@5.2.0/add/observable/interval.js", "npm:rxjs@5.2.0/add/operator/take.js", "src-reactive/app/helper.js"], true, function ($__require, exports, module) {
    "use strict";
    // alternative import method
    // import * as Rx from 'rxjs';
    // Rx.Observable.from(args);

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = $__require("npm:rxjs@5.2.0/Observable.js");
    var Subject_1 = $__require("npm:rxjs@5.2.0/Subject.js");
    var ReplaySubject_1 = $__require("npm:rxjs@5.2.0/ReplaySubject.js");
    $__require("npm:rxjs@5.2.0/add/observable/range.js");
    $__require("npm:rxjs@5.2.0/add/observable/zip.js");
    $__require("npm:rxjs@5.2.0/add/observable/merge.js");
    $__require("npm:rxjs@5.2.0/add/observable/defer.js");
    $__require("npm:rxjs@5.2.0/add/observable/interval.js");
    $__require("npm:rxjs@5.2.0/add/operator/take.js");
    var helper_1 = $__require("src-reactive/app/helper.js");
    function testCreate1() {
        /* Using a function */
        var source = Observable_1.Observable.create(function (observer) {
            console.log("2. > subscriber function called");
            console.log("3. > before next() called");
            observer.next(42);
            console.log("5. > after next() called");
            console.log("6. > before next() called");
            observer.next(43);
            console.log("8. > after next() called");
            console.log("9. > before complete() called");
            observer.complete();
            console.log("11. > after complete() called");
            // Note that this is optional, you do not have to return this if you require no cleanup
            return function () {
                console.log('12. disposed');
            };
        });
        console.log("1. Start subscribe");
        var subscription = source.subscribe(function (x) {
            console.log("4(7). observer Next: " + x);
        }, function (err) {
            console.log("observer Error: " + err);
        }, function () {
            console.log("10. observer Completed");
        });
        console.log("1. Start subscribe2");
        var subscription2 = source.subscribe(function (x) {
            console.log("4(7). observer2 Next: " + x);
        }, function (err) {
            console.log("observer2 Error: " + err);
        }, function () {
            console.log("10. observer2 Completed");
        });
    }
    exports.testCreate1 = testCreate1;
    function testCreate2() {
        /* Using a function */
        var source = Observable_1.Observable.create(function (observer) {
            var startCount = 42;
            console.log("2. > subscriber function called");
            console.log("3. > before next() called");
            observer.next(startCount++);
            console.log("5. > after next() called");
            setTimeout(function () {
                console.log("6. > before next() called");
                observer.next(startCount++);
                console.log("8. > after next() called");
                console.log("9. > before complete() called");
                observer.complete();
                console.log("12. > after complete() called");
            }, 1000);
            // Note that this is optional, you do not have to return this if you require no cleanup
            return function () {
                console.log('11. disposed');
            };
        });
        console.log("1. Start subscribe");
        var subscription = source.subscribe(function (x) {
            console.log("4(7). observer Next: " + x);
        }, function (err) {
            console.log("observer Error: " + err);
        }, function () {
            console.log("10. observer Completed");
        });
        console.log("1. Start subscribe2");
        var subscription2 = source.subscribe(function (x) {
            console.log("4(7). observer2 Next: " + x);
        }, function (err) {
            console.log("observer2 Error: " + err);
        }, function () {
            console.log("10. observer2 Completed");
        });
    }
    exports.testCreate2 = testCreate2;
    function testSubject1() {
        var myObservable = new Subject_1.Subject();
        myObservable.subscribe(function (value) {
            return console.log(value);
        });
        myObservable.next('after subscribe');
    }
    exports.testSubject1 = testSubject1;
    function testSubject2() {
        var myObservable = new Subject_1.Subject();
        myObservable.next('before subscribe');
        myObservable.subscribe(function (value) {
            return console.log(value);
        });
    }
    exports.testSubject2 = testSubject2;
    function testSubject3() {
        var myObservable = new Subject_1.Subject();
        myObservable.subscribe(function (value) {
            return console.log("1: " + value);
        });
        myObservable.subscribe(function (value) {
            return console.log("2: " + value);
        });
        myObservable.subscribe(function (value) {
            return console.log("3: " + value);
        });
        myObservable.next('multiple subscribe');
    }
    exports.testSubject3 = testSubject3;
    function testReplaySubject1() {
        var myObservable = new ReplaySubject_1.ReplaySubject();
        myObservable.next('before subscribe');
        myObservable.subscribe(function (value) {
            return console.log(value);
        });
    }
    exports.testReplaySubject1 = testReplaySubject1;
    function testReplaySubject2() {
        var myObservable = new ReplaySubject_1.ReplaySubject();
        myObservable.subscribe(function (value) {
            return console.log("1: " + value);
        });
        myObservable.next('multiple subscribe');
        myObservable.subscribe(function (value) {
            return console.log("2: " + value);
        });
        myObservable.subscribe(function (value) {
            return console.log("3: " + value);
        });
    }
    exports.testReplaySubject2 = testReplaySubject2;
    function testReplaySubject3() {
        var myObservable = new ReplaySubject_1.ReplaySubject();
        myObservable.subscribe(function (value) {
            return console.log("1: " + value);
        });
        myObservable.next('multiple subscribe');
        myObservable.complete();
        myObservable.subscribe(function (value) {
            return console.log("2: " + value);
        });
        myObservable.subscribe(function (value) {
            return console.log("3: " + value);
        });
    }
    exports.testReplaySubject3 = testReplaySubject3;
    function testReplaySubject4() {
        var myObservable = new ReplaySubject_1.ReplaySubject(2);
        myObservable.subscribe(function (value) {
            return console.log("1: " + value);
        });
        myObservable.next('multiple subscribe 1');
        myObservable.next('multiple subscribe 2');
        myObservable.next('multiple subscribe 3');
        myObservable.subscribe(function (value) {
            return console.log("2: " + value);
        });
        myObservable.subscribe(function (value) {
            return console.log("3: " + value);
        });
    }
    exports.testReplaySubject4 = testReplaySubject4;
    function testRange() {
        Observable_1.Observable.range(1, 3).subscribe(function (number) {
            return console.log("" + number);
        });
    }
    exports.testRange = testRange;
    function testZip(testButton, placeholder) {
        // 1. make left, right button
        var _a = ['left', 'right'].map(function (text) {
            var button = helper_1.buttonForTest(text, placeholder);
            return Observable_1.Observable.fromEvent(button, 'click');
        }),
            leftClickObservable = _a[0],
            rightClickObservable = _a[1];
        var zippedObservable = Observable_1.Observable.zip(leftClickObservable, rightClickObservable, function (leftClick, rightClick) {
            var leftTime = leftClick.timeStamp;
            var rightTime = rightClick.timeStamp;
            console.log("zip: " + (leftTime - rightTime));
            return [leftTime, rightTime];
        });
        zippedObservable.subscribe(function (value) {
            var leftTime = value[0],
                rightTime = value[1];
            console.log("subscribe1: " + (leftTime - rightTime));
        });
        zippedObservable.subscribe(function (value) {
            var leftTime = value[0],
                rightTime = value[1];
            console.log("subscribe2: " + (leftTime - rightTime));
        });
        zippedObservable.forEach(function (value) {
            var leftTime = value[0],
                rightTime = value[1];
            console.log("forEach: " + (leftTime - rightTime));
        });
    }
    exports.testZip = testZip;
    function testMerge(testButton, placeholder) {
        var key1Button = helper_1.buttonForTest('1', placeholder);
        var key1 = Observable_1.Observable.fromEvent(key1Button, 'click').map(function () {
            return 1;
        });
        var key2Button = helper_1.buttonForTest('2', placeholder);
        var key2 = Observable_1.Observable.fromEvent(key2Button, 'click').map(function () {
            return 2;
        });
        var key3Button = helper_1.buttonForTest('3', placeholder);
        var key3 = Observable_1.Observable.fromEvent(key3Button, 'click').map(function () {
            return 3;
        });
        Observable_1.Observable.merge(key1, key2, key3).scan(function (sum, current) {
            return sum * 10 + current;
        }, 0).subscribe(helper_1.simpleObserver('Digit'));
    }
    exports.testMerge = testMerge;
    function testDefer(testButton, placeholder) {
        var defered = Observable_1.Observable.defer(function () {
            console.log('defer called');
            return Observable_1.Observable.interval(500).take(5);
        });
        defered.subscribe(helper_1.simpleObserver('1'));
        defered.subscribe(helper_1.simpleObserver('2'));
    }
    exports.testDefer = testDefer;
});
System.registerDynamic("npm:rxjs@5.2.0/scheduler/QueueAction.js", ["npm:rxjs@5.2.0/scheduler/AsyncAction.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var AsyncAction_1 = $__require("npm:rxjs@5.2.0/scheduler/AsyncAction.js");
  var QueueAction = function (_super) {
    __extends(QueueAction, _super);
    function QueueAction(scheduler, work) {
      _super.call(this, scheduler, work);
      this.scheduler = scheduler;
      this.work = work;
    }
    QueueAction.prototype.schedule = function (state, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      if (delay > 0) {
        return _super.prototype.schedule.call(this, state, delay);
      }
      this.delay = delay;
      this.state = state;
      this.scheduler.flush(this);
      return this;
    };
    QueueAction.prototype.execute = function (state, delay) {
      return delay > 0 || this.closed ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
    };
    QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
        return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
      }
      return scheduler.flush(this);
    };
    return QueueAction;
  }(AsyncAction_1.AsyncAction);
  exports.QueueAction = QueueAction;
});
System.registerDynamic("npm:rxjs@5.2.0/scheduler/QueueScheduler.js", ["npm:rxjs@5.2.0/scheduler/AsyncScheduler.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var AsyncScheduler_1 = $__require("npm:rxjs@5.2.0/scheduler/AsyncScheduler.js");
  var QueueScheduler = function (_super) {
    __extends(QueueScheduler, _super);
    function QueueScheduler() {
      _super.apply(this, arguments);
    }
    return QueueScheduler;
  }(AsyncScheduler_1.AsyncScheduler);
  exports.QueueScheduler = QueueScheduler;
});
System.registerDynamic('npm:rxjs@5.2.0/scheduler/queue.js', ['npm:rxjs@5.2.0/scheduler/QueueAction.js', 'npm:rxjs@5.2.0/scheduler/QueueScheduler.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var QueueAction_1 = $__require('npm:rxjs@5.2.0/scheduler/QueueAction.js');
  var QueueScheduler_1 = $__require('npm:rxjs@5.2.0/scheduler/QueueScheduler.js');
  exports.queue = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);
});
System.registerDynamic('npm:rxjs@5.2.0/ReplaySubject.js', ['npm:rxjs@5.2.0/Subject.js', 'npm:rxjs@5.2.0/scheduler/queue.js', 'npm:rxjs@5.2.0/Subscription.js', 'npm:rxjs@5.2.0/operator/observeOn.js', 'npm:rxjs@5.2.0/util/ObjectUnsubscribedError.js', 'npm:rxjs@5.2.0/SubjectSubscription.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subject_1 = $__require('npm:rxjs@5.2.0/Subject.js');
  var queue_1 = $__require('npm:rxjs@5.2.0/scheduler/queue.js');
  var Subscription_1 = $__require('npm:rxjs@5.2.0/Subscription.js');
  var observeOn_1 = $__require('npm:rxjs@5.2.0/operator/observeOn.js');
  var ObjectUnsubscribedError_1 = $__require('npm:rxjs@5.2.0/util/ObjectUnsubscribedError.js');
  var SubjectSubscription_1 = $__require('npm:rxjs@5.2.0/SubjectSubscription.js');
  var ReplaySubject = function (_super) {
    __extends(ReplaySubject, _super);
    function ReplaySubject(bufferSize, windowTime, scheduler) {
      if (bufferSize === void 0) {
        bufferSize = Number.POSITIVE_INFINITY;
      }
      if (windowTime === void 0) {
        windowTime = Number.POSITIVE_INFINITY;
      }
      _super.call(this);
      this.scheduler = scheduler;
      this._events = [];
      this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
      this._windowTime = windowTime < 1 ? 1 : windowTime;
    }
    ReplaySubject.prototype.next = function (value) {
      var now = this._getNow();
      this._events.push(new ReplayEvent(now, value));
      this._trimBufferThenGetEvents();
      _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
      var _events = this._trimBufferThenGetEvents();
      var scheduler = this.scheduler;
      var subscription;
      if (this.closed) {
        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
      } else if (this.hasError) {
        subscription = Subscription_1.Subscription.EMPTY;
      } else if (this.isStopped) {
        subscription = Subscription_1.Subscription.EMPTY;
      } else {
        this.observers.push(subscriber);
        subscription = new SubjectSubscription_1.SubjectSubscription(this, subscriber);
      }
      if (scheduler) {
        subscriber.add(subscriber = new observeOn_1.ObserveOnSubscriber(subscriber, scheduler));
      }
      var len = _events.length;
      for (var i = 0; i < len && !subscriber.closed; i++) {
        subscriber.next(_events[i].value);
      }
      if (this.hasError) {
        subscriber.error(this.thrownError);
      } else if (this.isStopped) {
        subscriber.complete();
      }
      return subscription;
    };
    ReplaySubject.prototype._getNow = function () {
      return (this.scheduler || queue_1.queue).now();
    };
    ReplaySubject.prototype._trimBufferThenGetEvents = function () {
      var now = this._getNow();
      var _bufferSize = this._bufferSize;
      var _windowTime = this._windowTime;
      var _events = this._events;
      var eventsCount = _events.length;
      var spliceCount = 0;
      while (spliceCount < eventsCount) {
        if (now - _events[spliceCount].time < _windowTime) {
          break;
        }
        spliceCount++;
      }
      if (eventsCount > _bufferSize) {
        spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
      }
      if (spliceCount > 0) {
        _events.splice(0, spliceCount);
      }
      return _events;
    };
    return ReplaySubject;
  }(Subject_1.Subject);
  exports.ReplaySubject = ReplaySubject;
  var ReplayEvent = function () {
    function ReplayEvent(time, value) {
      this.time = time;
      this.value = value;
    }
    return ReplayEvent;
  }();
});
System.registerDynamic('npm:rxjs@5.2.0/operator/timestamp.js', ['npm:rxjs@5.2.0/Subscriber.js', 'npm:rxjs@5.2.0/scheduler/async.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('npm:rxjs@5.2.0/Subscriber.js');
  var async_1 = $__require('npm:rxjs@5.2.0/scheduler/async.js');
  function timestamp(scheduler) {
    if (scheduler === void 0) {
      scheduler = async_1.async;
    }
    return this.lift(new TimestampOperator(scheduler));
  }
  exports.timestamp = timestamp;
  var Timestamp = function () {
    function Timestamp(value, timestamp) {
      this.value = value;
      this.timestamp = timestamp;
    }
    return Timestamp;
  }();
  exports.Timestamp = Timestamp;
  ;
  var TimestampOperator = function () {
    function TimestampOperator(scheduler) {
      this.scheduler = scheduler;
    }
    TimestampOperator.prototype.call = function (observer, source) {
      return source.subscribe(new TimestampSubscriber(observer, this.scheduler));
    };
    return TimestampOperator;
  }();
  var TimestampSubscriber = function (_super) {
    __extends(TimestampSubscriber, _super);
    function TimestampSubscriber(destination, scheduler) {
      _super.call(this, destination);
      this.scheduler = scheduler;
    }
    TimestampSubscriber.prototype._next = function (value) {
      var now = this.scheduler.now();
      this.destination.next(new Timestamp(value, now));
    };
    return TimestampSubscriber;
  }(Subscriber_1.Subscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/timestamp.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/timestamp.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var timestamp_1 = $__require('npm:rxjs@5.2.0/operator/timestamp.js');
  Observable_1.Observable.prototype.timestamp = timestamp_1.timestamp;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/publish.js', ['npm:rxjs@5.2.0/Subject.js', 'npm:rxjs@5.2.0/operator/multicast.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Subject_1 = $__require('npm:rxjs@5.2.0/Subject.js');
  var multicast_1 = $__require('npm:rxjs@5.2.0/operator/multicast.js');
  function publish(selector) {
    return selector ? multicast_1.multicast.call(this, function () {
      return new Subject_1.Subject();
    }, selector) : multicast_1.multicast.call(this, new Subject_1.Subject());
  }
  exports.publish = publish;
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/publish.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/publish.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var publish_1 = $__require('npm:rxjs@5.2.0/operator/publish.js');
  Observable_1.Observable.prototype.publish = publish_1.publish;
});
System.registerDynamic("src-reactive/app/subject.js", ["npm:rxjs@5.2.0/Observable.js", "npm:rxjs@5.2.0/Subject.js", "npm:rxjs@5.2.0/ReplaySubject.js", "npm:rxjs@5.2.0/add/operator/multicast.js", "npm:rxjs@5.2.0/add/operator/timestamp.js", "npm:rxjs@5.2.0/add/operator/do.js", "npm:rxjs@5.2.0/add/operator/publish.js", "src-reactive/app/helper.js"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    // Rx.Observable.from(args);
    var Observable_1 = $__require("npm:rxjs@5.2.0/Observable.js");
    var Subject_1 = $__require("npm:rxjs@5.2.0/Subject.js");
    var ReplaySubject_1 = $__require("npm:rxjs@5.2.0/ReplaySubject.js");
    $__require("npm:rxjs@5.2.0/add/operator/multicast.js");
    $__require("npm:rxjs@5.2.0/add/operator/timestamp.js");
    $__require("npm:rxjs@5.2.0/add/operator/do.js");
    $__require("npm:rxjs@5.2.0/add/operator/publish.js");
    var helper_1 = $__require("src-reactive/app/helper.js");
    function testSubject1(testButton, placeholder) {
        var myObservable = new Subject_1.Subject();
        myObservable.subscribe(function (value) {
            return console.log(value);
        });
        myObservable.next('after subscribe');
    }
    exports.testSubject1 = testSubject1;
    function testSubject2(testButton, placeholder) {
        var myObservable = new Subject_1.Subject();
        myObservable.next('before subscribe');
        myObservable.subscribe(function (value) {
            return console.log(value);
        });
    }
    exports.testSubject2 = testSubject2;
    function testSubject3(testButton, placeholder) {
        var myObservable = new Subject_1.Subject();
        myObservable.subscribe(function (value) {
            return console.log("1: " + value);
        });
        myObservable.subscribe(function (value) {
            return console.log("2: " + value);
        });
        myObservable.subscribe(function (value) {
            return console.log("3: " + value);
        });
        myObservable.next('multiple subscribe');
    }
    exports.testSubject3 = testSubject3;
    function testReplaySubject1(testButton, placeholder) {
        var myObservable = new ReplaySubject_1.ReplaySubject();
        myObservable.next('before subscribe');
        myObservable.subscribe(function (value) {
            return console.log(value);
        });
    }
    exports.testReplaySubject1 = testReplaySubject1;
    function testReplaySubject2(testButton, placeholder) {
        var myObservable = new ReplaySubject_1.ReplaySubject();
        myObservable.subscribe(function (value) {
            return console.log("1: " + value);
        });
        myObservable.next('multiple subscribe');
        myObservable.subscribe(function (value) {
            return console.log("2: " + value);
        });
        myObservable.subscribe(function (value) {
            return console.log("3: " + value);
        });
    }
    exports.testReplaySubject2 = testReplaySubject2;
    function testReplaySubject3(testButton, placeholder) {
        var myObservable = new ReplaySubject_1.ReplaySubject();
        myObservable.subscribe(function (value) {
            return console.log("1: " + value);
        });
        myObservable.next('multiple subscribe');
        myObservable.complete();
        myObservable.subscribe(function (value) {
            return console.log("2: " + value);
        });
        myObservable.subscribe(function (value) {
            return console.log("3: " + value);
        });
    }
    exports.testReplaySubject3 = testReplaySubject3;
    function testReplaySubject4(testButton, placeholder) {
        var myObservable = new ReplaySubject_1.ReplaySubject(2);
        myObservable.subscribe(function (value) {
            return console.log("1: " + value);
        });
        myObservable.next('multiple subscribe 1');
        myObservable.next('multiple subscribe 2');
        myObservable.next('multiple subscribe 3');
        myObservable.subscribe(function (value) {
            return console.log("2: " + value);
        });
        myObservable.subscribe(function (value) {
            return console.log("3: " + value);
        });
    }
    exports.testReplaySubject4 = testReplaySubject4;
    function testMulticast(testButton, placeholder) {
        (function () {
            var button = helper_1.buttonForTest('Observable(num of handler = 2)', placeholder);
            var buttonObservable = Observable_1.Observable.fromEvent(button, 'click').do(function (value) {
                console.log('do Called');
            });
            buttonObservable.subscribe(helper_1.simpleObserver('click from Observable - 1'));
            buttonObservable.subscribe(helper_1.simpleObserver('click from Observable - 2'));
        })();
        (function () {
            var button = helper_1.buttonForTest('ConnectableObservable(num of handler = 1)', placeholder);
            var buttonObservable = Observable_1.Observable.fromEvent(button, 'click').do(function (value) {
                console.log('do Called');
            }).multicast(new Subject_1.Subject());
            buttonObservable.subscribe(helper_1.simpleObserver('click from ConnectableObservable - 1'));
            buttonObservable.subscribe(helper_1.simpleObserver('click from ConnectableObservable - 2'));
            buttonObservable.connect();
        })();
    }
    exports.testMulticast = testMulticast;
    function testMulticast2(testButton, placeholder) {
        var button = helper_1.buttonForTest('ConnectableObservable(num of handler = 1)', placeholder);
        var buttonObservable = Observable_1.Observable.fromEvent(button, 'click').do(function (ev) {
            console.log('do Called');
        }).multicast(new Subject_1.Subject());
        buttonObservable.map(function (ev) {
            return ev.target.innerText;
        }).subscribe(function (value) {
            return console.log("[1] click from " + value);
        });
        buttonObservable.map(function (ev) {
            return ev.target.innerText;
        }).subscribe(function (value) {
            return console.log("[2] click from " + value);
        });
        buttonObservable.connect();
    }
    exports.testMulticast2 = testMulticast2;
    function testMulticast3(testButton, placeholder) {
        var button = helper_1.buttonForTest('ConnectableObservable(num of handler = 1)', placeholder);
        var buttonObservable = Observable_1.Observable.fromEvent(button, 'click').do(function (ev) {
            console.log('do Called');
        }).multicast(new Subject_1.Subject()).refCount();
        buttonObservable.map(function (ev) {
            return ev.target.innerText;
        }).subscribe(function (value) {
            return console.log("[1] click from " + value);
        });
        buttonObservable.map(function (ev) {
            return ev.target.innerText;
        }).subscribe(function (value) {
            return console.log("[2] click from " + value);
        });
    }
    exports.testMulticast3 = testMulticast3;
    function testPublish(testButton, placeholder) {
        var button = helper_1.buttonForTest('ConnectableObservable(num of handler = 1)', placeholder);
        var buttonObservable = Observable_1.Observable.fromEvent(button, 'click').take(2).do(function (value) {
            console.log('do Called');
        }).publish().refCount();
        ;
        buttonObservable.subscribe(helper_1.simpleObserver('click from ConnectableObservable - 1'));
        buttonObservable.subscribe(helper_1.simpleObserver('click from ConnectableObservable - 2'));
    }
    exports.testPublish = testPublish;
});
System.registerDynamic('npm:rxjs@5.2.0/observable/IteratorObservable.js', ['npm:rxjs@5.2.0/util/root.js', 'npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/symbol/iterator.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var root_1 = $__require('npm:rxjs@5.2.0/util/root.js');
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var iterator_1 = $__require('npm:rxjs@5.2.0/symbol/iterator.js');
  var IteratorObservable = function (_super) {
    __extends(IteratorObservable, _super);
    function IteratorObservable(iterator, scheduler) {
      _super.call(this);
      this.scheduler = scheduler;
      if (iterator == null) {
        throw new Error('iterator cannot be null.');
      }
      this.iterator = getIterator(iterator);
    }
    IteratorObservable.create = function (iterator, scheduler) {
      return new IteratorObservable(iterator, scheduler);
    };
    IteratorObservable.dispatch = function (state) {
      var index = state.index,
          hasError = state.hasError,
          iterator = state.iterator,
          subscriber = state.subscriber;
      if (hasError) {
        subscriber.error(state.error);
        return;
      }
      var result = iterator.next();
      if (result.done) {
        subscriber.complete();
        return;
      }
      subscriber.next(result.value);
      state.index = index + 1;
      if (subscriber.closed) {
        if (typeof iterator.return === 'function') {
          iterator.return();
        }
        return;
      }
      this.schedule(state);
    };
    IteratorObservable.prototype._subscribe = function (subscriber) {
      var index = 0;
      var _a = this,
          iterator = _a.iterator,
          scheduler = _a.scheduler;
      if (scheduler) {
        return scheduler.schedule(IteratorObservable.dispatch, 0, {
          index: index,
          iterator: iterator,
          subscriber: subscriber
        });
      } else {
        do {
          var result = iterator.next();
          if (result.done) {
            subscriber.complete();
            break;
          } else {
            subscriber.next(result.value);
          }
          if (subscriber.closed) {
            if (typeof iterator.return === 'function') {
              iterator.return();
            }
            break;
          }
        } while (true);
      }
    };
    return IteratorObservable;
  }(Observable_1.Observable);
  exports.IteratorObservable = IteratorObservable;
  var StringIterator = function () {
    function StringIterator(str, idx, len) {
      if (idx === void 0) {
        idx = 0;
      }
      if (len === void 0) {
        len = str.length;
      }
      this.str = str;
      this.idx = idx;
      this.len = len;
    }
    StringIterator.prototype[iterator_1.$$iterator] = function () {
      return this;
    };
    StringIterator.prototype.next = function () {
      return this.idx < this.len ? {
        done: false,
        value: this.str.charAt(this.idx++)
      } : {
        done: true,
        value: undefined
      };
    };
    return StringIterator;
  }();
  var ArrayIterator = function () {
    function ArrayIterator(arr, idx, len) {
      if (idx === void 0) {
        idx = 0;
      }
      if (len === void 0) {
        len = toLength(arr);
      }
      this.arr = arr;
      this.idx = idx;
      this.len = len;
    }
    ArrayIterator.prototype[iterator_1.$$iterator] = function () {
      return this;
    };
    ArrayIterator.prototype.next = function () {
      return this.idx < this.len ? {
        done: false,
        value: this.arr[this.idx++]
      } : {
        done: true,
        value: undefined
      };
    };
    return ArrayIterator;
  }();
  function getIterator(obj) {
    var i = obj[iterator_1.$$iterator];
    if (!i && typeof obj === 'string') {
      return new StringIterator(obj);
    }
    if (!i && obj.length !== undefined) {
      return new ArrayIterator(obj);
    }
    if (!i) {
      throw new TypeError('object is not iterable');
    }
    return obj[iterator_1.$$iterator]();
  }
  var maxSafeInteger = Math.pow(2, 53) - 1;
  function toLength(o) {
    var len = +o.length;
    if (isNaN(len)) {
      return 0;
    }
    if (len === 0 || !numberIsFinite(len)) {
      return len;
    }
    len = sign(len) * Math.floor(Math.abs(len));
    if (len <= 0) {
      return 0;
    }
    if (len > maxSafeInteger) {
      return maxSafeInteger;
    }
    return len;
  }
  function numberIsFinite(value) {
    return typeof value === 'number' && root_1.root.isFinite(value);
  }
  function sign(value) {
    var valueAsNumber = +value;
    if (valueAsNumber === 0) {
      return valueAsNumber;
    }
    if (isNaN(valueAsNumber)) {
      return valueAsNumber;
    }
    return valueAsNumber < 0 ? -1 : 1;
  }
});
System.registerDynamic('npm:rxjs@5.2.0/observable/ArrayLikeObservable.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/observable/ScalarObservable.js', 'npm:rxjs@5.2.0/observable/EmptyObservable.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var ScalarObservable_1 = $__require('npm:rxjs@5.2.0/observable/ScalarObservable.js');
  var EmptyObservable_1 = $__require('npm:rxjs@5.2.0/observable/EmptyObservable.js');
  var ArrayLikeObservable = function (_super) {
    __extends(ArrayLikeObservable, _super);
    function ArrayLikeObservable(arrayLike, scheduler) {
      _super.call(this);
      this.arrayLike = arrayLike;
      this.scheduler = scheduler;
      if (!scheduler && arrayLike.length === 1) {
        this._isScalar = true;
        this.value = arrayLike[0];
      }
    }
    ArrayLikeObservable.create = function (arrayLike, scheduler) {
      var length = arrayLike.length;
      if (length === 0) {
        return new EmptyObservable_1.EmptyObservable();
      } else if (length === 1) {
        return new ScalarObservable_1.ScalarObservable(arrayLike[0], scheduler);
      } else {
        return new ArrayLikeObservable(arrayLike, scheduler);
      }
    };
    ArrayLikeObservable.dispatch = function (state) {
      var arrayLike = state.arrayLike,
          index = state.index,
          length = state.length,
          subscriber = state.subscriber;
      if (subscriber.closed) {
        return;
      }
      if (index >= length) {
        subscriber.complete();
        return;
      }
      subscriber.next(arrayLike[index]);
      state.index = index + 1;
      this.schedule(state);
    };
    ArrayLikeObservable.prototype._subscribe = function (subscriber) {
      var index = 0;
      var _a = this,
          arrayLike = _a.arrayLike,
          scheduler = _a.scheduler;
      var length = arrayLike.length;
      if (scheduler) {
        return scheduler.schedule(ArrayLikeObservable.dispatch, 0, {
          arrayLike: arrayLike,
          index: index,
          length: length,
          subscriber: subscriber
        });
      } else {
        for (var i = 0; i < length && !subscriber.closed; i++) {
          subscriber.next(arrayLike[i]);
        }
        subscriber.complete();
      }
    };
    return ArrayLikeObservable;
  }(Observable_1.Observable);
  exports.ArrayLikeObservable = ArrayLikeObservable;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/observeOn.js', ['npm:rxjs@5.2.0/Subscriber.js', 'npm:rxjs@5.2.0/Notification.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('npm:rxjs@5.2.0/Subscriber.js');
  var Notification_1 = $__require('npm:rxjs@5.2.0/Notification.js');
  function observeOn(scheduler, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return this.lift(new ObserveOnOperator(scheduler, delay));
  }
  exports.observeOn = observeOn;
  var ObserveOnOperator = function () {
    function ObserveOnOperator(scheduler, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      this.scheduler = scheduler;
      this.delay = delay;
    }
    ObserveOnOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
    };
    return ObserveOnOperator;
  }();
  exports.ObserveOnOperator = ObserveOnOperator;
  var ObserveOnSubscriber = function (_super) {
    __extends(ObserveOnSubscriber, _super);
    function ObserveOnSubscriber(destination, scheduler, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      _super.call(this, destination);
      this.scheduler = scheduler;
      this.delay = delay;
    }
    ObserveOnSubscriber.dispatch = function (arg) {
      var notification = arg.notification,
          destination = arg.destination;
      notification.observe(destination);
      this.unsubscribe();
    };
    ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
      this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
    };
    ObserveOnSubscriber.prototype._next = function (value) {
      this.scheduleMessage(Notification_1.Notification.createNext(value));
    };
    ObserveOnSubscriber.prototype._error = function (err) {
      this.scheduleMessage(Notification_1.Notification.createError(err));
    };
    ObserveOnSubscriber.prototype._complete = function () {
      this.scheduleMessage(Notification_1.Notification.createComplete());
    };
    return ObserveOnSubscriber;
  }(Subscriber_1.Subscriber);
  exports.ObserveOnSubscriber = ObserveOnSubscriber;
  var ObserveOnMessage = function () {
    function ObserveOnMessage(notification, destination) {
      this.notification = notification;
      this.destination = destination;
    }
    return ObserveOnMessage;
  }();
  exports.ObserveOnMessage = ObserveOnMessage;
});
System.registerDynamic('npm:rxjs@5.2.0/observable/FromObservable.js', ['npm:rxjs@5.2.0/util/isArray.js', 'npm:rxjs@5.2.0/util/isArrayLike.js', 'npm:rxjs@5.2.0/util/isPromise.js', 'npm:rxjs@5.2.0/observable/PromiseObservable.js', 'npm:rxjs@5.2.0/observable/IteratorObservable.js', 'npm:rxjs@5.2.0/observable/ArrayObservable.js', 'npm:rxjs@5.2.0/observable/ArrayLikeObservable.js', 'npm:rxjs@5.2.0/symbol/iterator.js', 'npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/observeOn.js', 'npm:rxjs@5.2.0/symbol/observable.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var isArray_1 = $__require('npm:rxjs@5.2.0/util/isArray.js');
  var isArrayLike_1 = $__require('npm:rxjs@5.2.0/util/isArrayLike.js');
  var isPromise_1 = $__require('npm:rxjs@5.2.0/util/isPromise.js');
  var PromiseObservable_1 = $__require('npm:rxjs@5.2.0/observable/PromiseObservable.js');
  var IteratorObservable_1 = $__require('npm:rxjs@5.2.0/observable/IteratorObservable.js');
  var ArrayObservable_1 = $__require('npm:rxjs@5.2.0/observable/ArrayObservable.js');
  var ArrayLikeObservable_1 = $__require('npm:rxjs@5.2.0/observable/ArrayLikeObservable.js');
  var iterator_1 = $__require('npm:rxjs@5.2.0/symbol/iterator.js');
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var observeOn_1 = $__require('npm:rxjs@5.2.0/operator/observeOn.js');
  var observable_1 = $__require('npm:rxjs@5.2.0/symbol/observable.js');
  var FromObservable = function (_super) {
    __extends(FromObservable, _super);
    function FromObservable(ish, scheduler) {
      _super.call(this, null);
      this.ish = ish;
      this.scheduler = scheduler;
    }
    FromObservable.create = function (ish, scheduler) {
      if (ish != null) {
        if (typeof ish[observable_1.$$observable] === 'function') {
          if (ish instanceof Observable_1.Observable && !scheduler) {
            return ish;
          }
          return new FromObservable(ish, scheduler);
        } else if (isArray_1.isArray(ish)) {
          return new ArrayObservable_1.ArrayObservable(ish, scheduler);
        } else if (isPromise_1.isPromise(ish)) {
          return new PromiseObservable_1.PromiseObservable(ish, scheduler);
        } else if (typeof ish[iterator_1.$$iterator] === 'function' || typeof ish === 'string') {
          return new IteratorObservable_1.IteratorObservable(ish, scheduler);
        } else if (isArrayLike_1.isArrayLike(ish)) {
          return new ArrayLikeObservable_1.ArrayLikeObservable(ish, scheduler);
        }
      }
      throw new TypeError((ish !== null && typeof ish || ish) + ' is not observable');
    };
    FromObservable.prototype._subscribe = function (subscriber) {
      var ish = this.ish;
      var scheduler = this.scheduler;
      if (scheduler == null) {
        return ish[observable_1.$$observable]().subscribe(subscriber);
      } else {
        return ish[observable_1.$$observable]().subscribe(new observeOn_1.ObserveOnSubscriber(subscriber, scheduler, 0));
      }
    };
    return FromObservable;
  }(Observable_1.Observable);
  exports.FromObservable = FromObservable;
});
System.registerDynamic("npm:rxjs@5.2.0/observable/from.js", ["npm:rxjs@5.2.0/observable/FromObservable.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var FromObservable_1 = $__require("npm:rxjs@5.2.0/observable/FromObservable.js");
  exports.from = FromObservable_1.FromObservable.create;
});
System.registerDynamic('npm:rxjs@5.2.0/add/observable/from.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/observable/from.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var from_1 = $__require('npm:rxjs@5.2.0/observable/from.js');
  Observable_1.Observable.from = from_1.from;
});
System.registerDynamic("src-reactive/app/converting.js", ["npm:rxjs@5.2.0/Observable.js", "npm:rxjs@5.2.0/add/observable/from.js"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = $__require("npm:rxjs@5.2.0/Observable.js");
    $__require("npm:rxjs@5.2.0/add/observable/from.js");
    function testFrom() {
        // case 1
        function f() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return Observable_1.Observable.from(args);
        }
        f(1, 2, 3).subscribe(function (x) {
            console.log('Next: ' + x);
        }, function (err) {
            console.log('Error: ' + err);
        }, function () {
            console.log('Completed');
        });
        // case 2
        Observable_1.Observable.from(['a', 'b', 'c']).subscribe(function (x) {
            console.log('Next: ' + x);
        }, function (err) {
            console.log('Error: ' + err);
        }, function () {
            console.log('Completed');
        });
    }
    exports.testFrom = testFrom;
});
System.registerDynamic("npm:rxjs@5.2.0/observable/of.js", ["npm:rxjs@5.2.0/observable/ArrayObservable.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var ArrayObservable_1 = $__require("npm:rxjs@5.2.0/observable/ArrayObservable.js");
  exports.of = ArrayObservable_1.ArrayObservable.of;
});
System.registerDynamic('npm:rxjs@5.2.0/add/observable/of.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/observable/of.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var of_1 = $__require('npm:rxjs@5.2.0/observable/of.js');
  Observable_1.Observable.of = of_1.of;
});
System.registerDynamic('npm:rxjs@5.2.0/observable/TimerObservable.js', ['npm:rxjs@5.2.0/util/isNumeric.js', 'npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/scheduler/async.js', 'npm:rxjs@5.2.0/util/isScheduler.js', 'npm:rxjs@5.2.0/util/isDate.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var isNumeric_1 = $__require('npm:rxjs@5.2.0/util/isNumeric.js');
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var async_1 = $__require('npm:rxjs@5.2.0/scheduler/async.js');
  var isScheduler_1 = $__require('npm:rxjs@5.2.0/util/isScheduler.js');
  var isDate_1 = $__require('npm:rxjs@5.2.0/util/isDate.js');
  var TimerObservable = function (_super) {
    __extends(TimerObservable, _super);
    function TimerObservable(dueTime, period, scheduler) {
      if (dueTime === void 0) {
        dueTime = 0;
      }
      _super.call(this);
      this.period = -1;
      this.dueTime = 0;
      if (isNumeric_1.isNumeric(period)) {
        this.period = Number(period) < 1 && 1 || Number(period);
      } else if (isScheduler_1.isScheduler(period)) {
        scheduler = period;
      }
      if (!isScheduler_1.isScheduler(scheduler)) {
        scheduler = async_1.async;
      }
      this.scheduler = scheduler;
      this.dueTime = isDate_1.isDate(dueTime) ? +dueTime - this.scheduler.now() : dueTime;
    }
    TimerObservable.create = function (initialDelay, period, scheduler) {
      if (initialDelay === void 0) {
        initialDelay = 0;
      }
      return new TimerObservable(initialDelay, period, scheduler);
    };
    TimerObservable.dispatch = function (state) {
      var index = state.index,
          period = state.period,
          subscriber = state.subscriber;
      var action = this;
      subscriber.next(index);
      if (subscriber.closed) {
        return;
      } else if (period === -1) {
        return subscriber.complete();
      }
      state.index = index + 1;
      action.schedule(state, period);
    };
    TimerObservable.prototype._subscribe = function (subscriber) {
      var index = 0;
      var _a = this,
          period = _a.period,
          dueTime = _a.dueTime,
          scheduler = _a.scheduler;
      return scheduler.schedule(TimerObservable.dispatch, dueTime, {
        index: index,
        period: period,
        subscriber: subscriber
      });
    };
    return TimerObservable;
  }(Observable_1.Observable);
  exports.TimerObservable = TimerObservable;
});
System.registerDynamic("npm:rxjs@5.2.0/observable/timer.js", ["npm:rxjs@5.2.0/observable/TimerObservable.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var TimerObservable_1 = $__require("npm:rxjs@5.2.0/observable/TimerObservable.js");
  exports.timer = TimerObservable_1.TimerObservable.create;
});
System.registerDynamic('npm:rxjs@5.2.0/add/observable/timer.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/observable/timer.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var timer_1 = $__require('npm:rxjs@5.2.0/observable/timer.js');
  Observable_1.Observable.timer = timer_1.timer;
});
System.registerDynamic("npm:rxjs@5.2.0/observable/ErrorObservable.js", ["npm:rxjs@5.2.0/Observable.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require("npm:rxjs@5.2.0/Observable.js");
  var ErrorObservable = function (_super) {
    __extends(ErrorObservable, _super);
    function ErrorObservable(error, scheduler) {
      _super.call(this);
      this.error = error;
      this.scheduler = scheduler;
    }
    ErrorObservable.create = function (error, scheduler) {
      return new ErrorObservable(error, scheduler);
    };
    ErrorObservable.dispatch = function (arg) {
      var error = arg.error,
          subscriber = arg.subscriber;
      subscriber.error(error);
    };
    ErrorObservable.prototype._subscribe = function (subscriber) {
      var error = this.error;
      var scheduler = this.scheduler;
      if (scheduler) {
        return scheduler.schedule(ErrorObservable.dispatch, 0, {
          error: error,
          subscriber: subscriber
        });
      } else {
        subscriber.error(error);
      }
    };
    return ErrorObservable;
  }(Observable_1.Observable);
  exports.ErrorObservable = ErrorObservable;
});
System.registerDynamic("npm:rxjs@5.2.0/observable/throw.js", ["npm:rxjs@5.2.0/observable/ErrorObservable.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var ErrorObservable_1 = $__require("npm:rxjs@5.2.0/observable/ErrorObservable.js");
  exports._throw = ErrorObservable_1.ErrorObservable.create;
});
System.registerDynamic('npm:rxjs@5.2.0/add/observable/throw.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/observable/throw.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var throw_1 = $__require('npm:rxjs@5.2.0/observable/throw.js');
  Observable_1.Observable.throw = throw_1._throw;
});
System.registerDynamic("npm:rxjs@5.2.0/observable/concat.js", ["npm:rxjs@5.2.0/operator/concat.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var concat_1 = $__require("npm:rxjs@5.2.0/operator/concat.js");
  exports.concat = concat_1.concatStatic;
});
System.registerDynamic('npm:rxjs@5.2.0/add/observable/concat.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/observable/concat.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var concat_1 = $__require('npm:rxjs@5.2.0/observable/concat.js');
  Observable_1.Observable.concat = concat_1.concat;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/timeInterval.js', ['npm:rxjs@5.2.0/Subscriber.js', 'npm:rxjs@5.2.0/scheduler/async.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('npm:rxjs@5.2.0/Subscriber.js');
  var async_1 = $__require('npm:rxjs@5.2.0/scheduler/async.js');
  function timeInterval(scheduler) {
    if (scheduler === void 0) {
      scheduler = async_1.async;
    }
    return this.lift(new TimeIntervalOperator(scheduler));
  }
  exports.timeInterval = timeInterval;
  var TimeInterval = function () {
    function TimeInterval(value, interval) {
      this.value = value;
      this.interval = interval;
    }
    return TimeInterval;
  }();
  exports.TimeInterval = TimeInterval;
  ;
  var TimeIntervalOperator = function () {
    function TimeIntervalOperator(scheduler) {
      this.scheduler = scheduler;
    }
    TimeIntervalOperator.prototype.call = function (observer, source) {
      return source.subscribe(new TimeIntervalSubscriber(observer, this.scheduler));
    };
    return TimeIntervalOperator;
  }();
  var TimeIntervalSubscriber = function (_super) {
    __extends(TimeIntervalSubscriber, _super);
    function TimeIntervalSubscriber(destination, scheduler) {
      _super.call(this, destination);
      this.scheduler = scheduler;
      this.lastTime = 0;
      this.lastTime = scheduler.now();
    }
    TimeIntervalSubscriber.prototype._next = function (value) {
      var now = this.scheduler.now();
      var span = now - this.lastTime;
      this.lastTime = now;
      this.destination.next(new TimeInterval(value, span));
    };
    return TimeIntervalSubscriber;
  }(Subscriber_1.Subscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/timeInterval.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/timeInterval.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var timeInterval_1 = $__require('npm:rxjs@5.2.0/operator/timeInterval.js');
  Observable_1.Observable.prototype.timeInterval = timeInterval_1.timeInterval;
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/mergeMapTo.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/mergeMapTo.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var mergeMapTo_1 = $__require('npm:rxjs@5.2.0/operator/mergeMapTo.js');
  Observable_1.Observable.prototype.flatMapTo = mergeMapTo_1.mergeMapTo;
  Observable_1.Observable.prototype.mergeMapTo = mergeMapTo_1.mergeMapTo;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/mergeMapTo.js', ['npm:rxjs@5.2.0/OuterSubscriber.js', 'npm:rxjs@5.2.0/util/subscribeToResult.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var OuterSubscriber_1 = $__require('npm:rxjs@5.2.0/OuterSubscriber.js');
  var subscribeToResult_1 = $__require('npm:rxjs@5.2.0/util/subscribeToResult.js');
  function mergeMapTo(innerObservable, resultSelector, concurrent) {
    if (concurrent === void 0) {
      concurrent = Number.POSITIVE_INFINITY;
    }
    if (typeof resultSelector === 'number') {
      concurrent = resultSelector;
      resultSelector = null;
    }
    return this.lift(new MergeMapToOperator(innerObservable, resultSelector, concurrent));
  }
  exports.mergeMapTo = mergeMapTo;
  var MergeMapToOperator = function () {
    function MergeMapToOperator(ish, resultSelector, concurrent) {
      if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
      }
      this.ish = ish;
      this.resultSelector = resultSelector;
      this.concurrent = concurrent;
    }
    MergeMapToOperator.prototype.call = function (observer, source) {
      return source.subscribe(new MergeMapToSubscriber(observer, this.ish, this.resultSelector, this.concurrent));
    };
    return MergeMapToOperator;
  }();
  exports.MergeMapToOperator = MergeMapToOperator;
  var MergeMapToSubscriber = function (_super) {
    __extends(MergeMapToSubscriber, _super);
    function MergeMapToSubscriber(destination, ish, resultSelector, concurrent) {
      if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
      }
      _super.call(this, destination);
      this.ish = ish;
      this.resultSelector = resultSelector;
      this.concurrent = concurrent;
      this.hasCompleted = false;
      this.buffer = [];
      this.active = 0;
      this.index = 0;
    }
    MergeMapToSubscriber.prototype._next = function (value) {
      if (this.active < this.concurrent) {
        var resultSelector = this.resultSelector;
        var index = this.index++;
        var ish = this.ish;
        var destination = this.destination;
        this.active++;
        this._innerSub(ish, destination, resultSelector, value, index);
      } else {
        this.buffer.push(value);
      }
    };
    MergeMapToSubscriber.prototype._innerSub = function (ish, destination, resultSelector, value, index) {
      this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
    };
    MergeMapToSubscriber.prototype._complete = function () {
      this.hasCompleted = true;
      if (this.active === 0 && this.buffer.length === 0) {
        this.destination.complete();
      }
    };
    MergeMapToSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      var _a = this,
          resultSelector = _a.resultSelector,
          destination = _a.destination;
      if (resultSelector) {
        this.trySelectResult(outerValue, innerValue, outerIndex, innerIndex);
      } else {
        destination.next(innerValue);
      }
    };
    MergeMapToSubscriber.prototype.trySelectResult = function (outerValue, innerValue, outerIndex, innerIndex) {
      var _a = this,
          resultSelector = _a.resultSelector,
          destination = _a.destination;
      var result;
      try {
        result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
      } catch (err) {
        destination.error(err);
        return;
      }
      destination.next(result);
    };
    MergeMapToSubscriber.prototype.notifyError = function (err) {
      this.destination.error(err);
    };
    MergeMapToSubscriber.prototype.notifyComplete = function (innerSub) {
      var buffer = this.buffer;
      this.remove(innerSub);
      this.active--;
      if (buffer.length > 0) {
        this._next(buffer.shift());
      } else if (this.active === 0 && this.hasCompleted) {
        this.destination.complete();
      }
    };
    return MergeMapToSubscriber;
  }(OuterSubscriber_1.OuterSubscriber);
  exports.MergeMapToSubscriber = MergeMapToSubscriber;
});
System.registerDynamic("npm:rxjs@5.2.0/operator/concatMapTo.js", ["npm:rxjs@5.2.0/operator/mergeMapTo.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var mergeMapTo_1 = $__require("npm:rxjs@5.2.0/operator/mergeMapTo.js");
  function concatMapTo(innerObservable, resultSelector) {
    return this.lift(new mergeMapTo_1.MergeMapToOperator(innerObservable, resultSelector, 1));
  }
  exports.concatMapTo = concatMapTo;
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/concatMapTo.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/concatMapTo.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var concatMapTo_1 = $__require('npm:rxjs@5.2.0/operator/concatMapTo.js');
  Observable_1.Observable.prototype.concatMapTo = concatMapTo_1.concatMapTo;
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/merge.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/merge.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var merge_1 = $__require('npm:rxjs@5.2.0/operator/merge.js');
  Observable_1.Observable.prototype.merge = merge_1.merge;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/buffer.js', ['npm:rxjs@5.2.0/OuterSubscriber.js', 'npm:rxjs@5.2.0/util/subscribeToResult.js', 'github:jspm/nodelibs-buffer@0.1.0.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (Buffer) {
    "use strict";

    var __extends = this && this.__extends || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var OuterSubscriber_1 = $__require('npm:rxjs@5.2.0/OuterSubscriber.js');
    var subscribeToResult_1 = $__require('npm:rxjs@5.2.0/util/subscribeToResult.js');
    function buffer(closingNotifier) {
      return this.lift(new BufferOperator(closingNotifier));
    }
    exports.buffer = buffer;
    var BufferOperator = function () {
      function BufferOperator(closingNotifier) {
        this.closingNotifier = closingNotifier;
      }
      BufferOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new BufferSubscriber(subscriber, this.closingNotifier));
      };
      return BufferOperator;
    }();
    var BufferSubscriber = function (_super) {
      __extends(BufferSubscriber, _super);
      function BufferSubscriber(destination, closingNotifier) {
        _super.call(this, destination);
        this.buffer = [];
        this.add(subscribeToResult_1.subscribeToResult(this, closingNotifier));
      }
      BufferSubscriber.prototype._next = function (value) {
        this.buffer.push(value);
      };
      BufferSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var buffer = this.buffer;
        this.buffer = [];
        this.destination.next(buffer);
      };
      return BufferSubscriber;
    }(OuterSubscriber_1.OuterSubscriber);
  })($__require('github:jspm/nodelibs-buffer@0.1.0.js').Buffer);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/buffer.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/buffer.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var buffer_1 = $__require('npm:rxjs@5.2.0/operator/buffer.js');
  Observable_1.Observable.prototype.buffer = buffer_1.buffer;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/bufferCount.js', ['npm:rxjs@5.2.0/Subscriber.js', 'github:jspm/nodelibs-buffer@0.1.0.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (Buffer) {
    "use strict";

    var __extends = this && this.__extends || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = $__require('npm:rxjs@5.2.0/Subscriber.js');
    function bufferCount(bufferSize, startBufferEvery) {
      if (startBufferEvery === void 0) {
        startBufferEvery = null;
      }
      return this.lift(new BufferCountOperator(bufferSize, startBufferEvery));
    }
    exports.bufferCount = bufferCount;
    var BufferCountOperator = function () {
      function BufferCountOperator(bufferSize, startBufferEvery) {
        this.bufferSize = bufferSize;
        this.startBufferEvery = startBufferEvery;
      }
      BufferCountOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new BufferCountSubscriber(subscriber, this.bufferSize, this.startBufferEvery));
      };
      return BufferCountOperator;
    }();
    var BufferCountSubscriber = function (_super) {
      __extends(BufferCountSubscriber, _super);
      function BufferCountSubscriber(destination, bufferSize, startBufferEvery) {
        _super.call(this, destination);
        this.bufferSize = bufferSize;
        this.startBufferEvery = startBufferEvery;
        this.buffers = [];
        this.count = 0;
      }
      BufferCountSubscriber.prototype._next = function (value) {
        var count = this.count++;
        var _a = this,
            destination = _a.destination,
            bufferSize = _a.bufferSize,
            startBufferEvery = _a.startBufferEvery,
            buffers = _a.buffers;
        var startOn = startBufferEvery == null ? bufferSize : startBufferEvery;
        if (count % startOn === 0) {
          buffers.push([]);
        }
        for (var i = buffers.length; i--;) {
          var buffer = buffers[i];
          buffer.push(value);
          if (buffer.length === bufferSize) {
            buffers.splice(i, 1);
            destination.next(buffer);
          }
        }
      };
      BufferCountSubscriber.prototype._complete = function () {
        var destination = this.destination;
        var buffers = this.buffers;
        while (buffers.length > 0) {
          var buffer = buffers.shift();
          if (buffer.length > 0) {
            destination.next(buffer);
          }
        }
        _super.prototype._complete.call(this);
      };
      return BufferCountSubscriber;
    }(Subscriber_1.Subscriber);
  })($__require('github:jspm/nodelibs-buffer@0.1.0.js').Buffer);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/bufferCount.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/bufferCount.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var bufferCount_1 = $__require('npm:rxjs@5.2.0/operator/bufferCount.js');
  Observable_1.Observable.prototype.bufferCount = bufferCount_1.bufferCount;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/bufferWhen.js', ['npm:rxjs@5.2.0/Subscription.js', 'npm:rxjs@5.2.0/util/tryCatch.js', 'npm:rxjs@5.2.0/util/errorObject.js', 'npm:rxjs@5.2.0/OuterSubscriber.js', 'npm:rxjs@5.2.0/util/subscribeToResult.js', 'github:jspm/nodelibs-buffer@0.1.0.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (Buffer, process) {
    "use strict";

    var __extends = this && this.__extends || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscription_1 = $__require('npm:rxjs@5.2.0/Subscription.js');
    var tryCatch_1 = $__require('npm:rxjs@5.2.0/util/tryCatch.js');
    var errorObject_1 = $__require('npm:rxjs@5.2.0/util/errorObject.js');
    var OuterSubscriber_1 = $__require('npm:rxjs@5.2.0/OuterSubscriber.js');
    var subscribeToResult_1 = $__require('npm:rxjs@5.2.0/util/subscribeToResult.js');
    function bufferWhen(closingSelector) {
      return this.lift(new BufferWhenOperator(closingSelector));
    }
    exports.bufferWhen = bufferWhen;
    var BufferWhenOperator = function () {
      function BufferWhenOperator(closingSelector) {
        this.closingSelector = closingSelector;
      }
      BufferWhenOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new BufferWhenSubscriber(subscriber, this.closingSelector));
      };
      return BufferWhenOperator;
    }();
    var BufferWhenSubscriber = function (_super) {
      __extends(BufferWhenSubscriber, _super);
      function BufferWhenSubscriber(destination, closingSelector) {
        _super.call(this, destination);
        this.closingSelector = closingSelector;
        this.subscribing = false;
        this.openBuffer();
      }
      BufferWhenSubscriber.prototype._next = function (value) {
        this.buffer.push(value);
      };
      BufferWhenSubscriber.prototype._complete = function () {
        var buffer = this.buffer;
        if (buffer) {
          this.destination.next(buffer);
        }
        _super.prototype._complete.call(this);
      };
      BufferWhenSubscriber.prototype._unsubscribe = function () {
        this.buffer = null;
        this.subscribing = false;
      };
      BufferWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.openBuffer();
      };
      BufferWhenSubscriber.prototype.notifyComplete = function () {
        if (this.subscribing) {
          this.complete();
        } else {
          this.openBuffer();
        }
      };
      BufferWhenSubscriber.prototype.openBuffer = function () {
        var closingSubscription = this.closingSubscription;
        if (closingSubscription) {
          this.remove(closingSubscription);
          closingSubscription.unsubscribe();
        }
        var buffer = this.buffer;
        if (this.buffer) {
          this.destination.next(buffer);
        }
        this.buffer = [];
        var closingNotifier = tryCatch_1.tryCatch(this.closingSelector)();
        if (closingNotifier === errorObject_1.errorObject) {
          this.error(errorObject_1.errorObject.e);
        } else {
          closingSubscription = new Subscription_1.Subscription();
          this.closingSubscription = closingSubscription;
          this.add(closingSubscription);
          this.subscribing = true;
          closingSubscription.add(subscribeToResult_1.subscribeToResult(this, closingNotifier));
          this.subscribing = false;
        }
      };
      return BufferWhenSubscriber;
    }(OuterSubscriber_1.OuterSubscriber);
  })($__require('github:jspm/nodelibs-buffer@0.1.0.js').Buffer, $__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/bufferWhen.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/bufferWhen.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var bufferWhen_1 = $__require('npm:rxjs@5.2.0/operator/bufferWhen.js');
  Observable_1.Observable.prototype.bufferWhen = bufferWhen_1.bufferWhen;
});
System.registerDynamic('npm:base64-js@0.0.8/lib/b64.js', [], true, function ($__require, exports, module) {
	var global = this || self,
	    GLOBAL = global;
	/* */
	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

		var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

		var PLUS = '+'.charCodeAt(0);
		var SLASH = '/'.charCodeAt(0);
		var NUMBER = '0'.charCodeAt(0);
		var LOWER = 'a'.charCodeAt(0);
		var UPPER = 'A'.charCodeAt(0);
		var PLUS_URL_SAFE = '-'.charCodeAt(0);
		var SLASH_URL_SAFE = '_'.charCodeAt(0);

		function decode(elt) {
			var code = elt.charCodeAt(0);
			if (code === PLUS || code === PLUS_URL_SAFE) return 62; // '+'
			if (code === SLASH || code === SLASH_URL_SAFE) return 63; // '/'
			if (code < NUMBER) return -1; //no match
			if (code < NUMBER + 10) return code - NUMBER + 26 + 26;
			if (code < UPPER + 26) return code - UPPER;
			if (code < LOWER + 26) return code - LOWER + 26;
		}

		function b64ToByteArray(b64) {
			var i, j, l, tmp, placeHolders, arr;

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4');
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length;
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0;

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders);

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length;

			var L = 0;

			function push(v) {
				arr[L++] = v;
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = decode(b64.charAt(i)) << 18 | decode(b64.charAt(i + 1)) << 12 | decode(b64.charAt(i + 2)) << 6 | decode(b64.charAt(i + 3));
				push((tmp & 0xFF0000) >> 16);
				push((tmp & 0xFF00) >> 8);
				push(tmp & 0xFF);
			}

			if (placeHolders === 2) {
				tmp = decode(b64.charAt(i)) << 2 | decode(b64.charAt(i + 1)) >> 4;
				push(tmp & 0xFF);
			} else if (placeHolders === 1) {
				tmp = decode(b64.charAt(i)) << 10 | decode(b64.charAt(i + 1)) << 4 | decode(b64.charAt(i + 2)) >> 2;
				push(tmp >> 8 & 0xFF);
				push(tmp & 0xFF);
			}

			return arr;
		}

		function uint8ToBase64(uint8) {
			var i,
			    extraBytes = uint8.length % 3,
			    // if we have 1 byte left, pad 2 bytes
			output = "",
			    temp,
			    length;

			function encode(num) {
				return lookup.charAt(num);
			}

			function tripletToBase64(num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F);
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
				output += tripletToBase64(temp);
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1];
					output += encode(temp >> 2);
					output += encode(temp << 4 & 0x3F);
					output += '==';
					break;
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + uint8[uint8.length - 1];
					output += encode(temp >> 10);
					output += encode(temp >> 4 & 0x3F);
					output += encode(temp << 2 & 0x3F);
					output += '=';
					break;
			}

			return output;
		}

		exports.toByteArray = b64ToByteArray;
		exports.fromByteArray = uint8ToBase64;
	})(typeof exports === 'undefined' ? this.base64js = {} : exports);
});
System.registerDynamic("npm:base64-js@0.0.8.js", ["npm:base64-js@0.0.8/lib/b64.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("npm:base64-js@0.0.8/lib/b64.js");
});
System.registerDynamic("npm:ieee754@1.1.8/index.js", [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  exports.read = function (buffer, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? nBytes - 1 : 0;
    var d = isLE ? -1 : 1;
    var s = buffer[offset + i];

    i += d;

    e = s & (1 << -nBits) - 1;
    s >>= -nBits;
    nBits += eLen;
    for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

    m = e & (1 << -nBits) - 1;
    e >>= -nBits;
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

    if (e === 0) {
      e = 1 - eBias;
    } else if (e === eMax) {
      return m ? NaN : (s ? -1 : 1) * Infinity;
    } else {
      m = m + Math.pow(2, mLen);
      e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
  };

  exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i = isLE ? 0 : nBytes - 1;
    var d = isLE ? 1 : -1;
    var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

    value = Math.abs(value);

    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0;
      e = eMax;
    } else {
      e = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c = Math.pow(2, -e)) < 1) {
        e--;
        c *= 2;
      }
      if (e + eBias >= 1) {
        value += rt / c;
      } else {
        value += rt * Math.pow(2, 1 - eBias);
      }
      if (value * c >= 2) {
        e++;
        c /= 2;
      }

      if (e + eBias >= eMax) {
        m = 0;
        e = eMax;
      } else if (e + eBias >= 1) {
        m = (value * c - 1) * Math.pow(2, mLen);
        e = e + eBias;
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
        e = 0;
      }
    }

    for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

    e = e << mLen | m;
    eLen += mLen;
    for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

    buffer[offset + i - d] |= s * 128;
  };
});
System.registerDynamic("npm:ieee754@1.1.8.js", ["npm:ieee754@1.1.8/index.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("npm:ieee754@1.1.8/index.js");
});
System.registerDynamic('npm:isarray@1.0.0/index.js', [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  var toString = {}.toString;

  module.exports = Array.isArray || function (arr) {
    return toString.call(arr) == '[object Array]';
  };
});
System.registerDynamic("npm:isarray@1.0.0.js", ["npm:isarray@1.0.0/index.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("npm:isarray@1.0.0/index.js");
});
System.registerDynamic('npm:buffer@3.6.0/index.js', ['npm:base64-js@0.0.8.js', 'npm:ieee754@1.1.8.js', 'npm:isarray@1.0.0.js'], true, function ($__require, exports, module) {
  /*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
   * @license  MIT
   */
  /* eslint-disable no-proto */

  'use strict';

  var global = this || self,
      GLOBAL = global;
  var base64 = $__require('npm:base64-js@0.0.8.js');
  var ieee754 = $__require('npm:ieee754@1.1.8.js');
  var isArray = $__require('npm:isarray@1.0.0.js');

  exports.Buffer = Buffer;
  exports.SlowBuffer = SlowBuffer;
  exports.INSPECT_MAX_BYTES = 50;
  Buffer.poolSize = 8192; // not used by this implementation

  var rootParent = {};

  /**
   * If `Buffer.TYPED_ARRAY_SUPPORT`:
   *   === true    Use Uint8Array implementation (fastest)
   *   === false   Use Object implementation (most compatible, even IE6)
   *
   * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
   * Opera 11.6+, iOS 4.2+.
   *
   * Due to various browser bugs, sometimes the Object implementation will be used even
   * when the browser supports typed arrays.
   *
   * Note:
   *
   *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
   *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
   *
   *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
   *     on objects.
   *
   *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
   *
   *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
   *     incorrect length in some situations.
  
   * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
   * get the Object implementation, which is slower but behaves correctly.
   */
  Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();

  function typedArraySupport() {
    function Bar() {}
    try {
      var arr = new Uint8Array(1);
      arr.foo = function () {
        return 42;
      };
      arr.constructor = Bar;
      return arr.foo() === 42 && // typed array instances can be augmented
      arr.constructor === Bar && // constructor can be set
      typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
      arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
    } catch (e) {
      return false;
    }
  }

  function kMaxLength() {
    return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
  }

  /**
   * Class: Buffer
   * =============
   *
   * The Buffer constructor returns instances of `Uint8Array` that are augmented
   * with function properties for all the node `Buffer` API functions. We use
   * `Uint8Array` so that square bracket notation works as expected -- it returns
   * a single octet.
   *
   * By augmenting the instances, we can avoid modifying the `Uint8Array`
   * prototype.
   */
  function Buffer(arg) {
    if (!(this instanceof Buffer)) {
      // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
      if (arguments.length > 1) return new Buffer(arg, arguments[1]);
      return new Buffer(arg);
    }

    if (!Buffer.TYPED_ARRAY_SUPPORT) {
      this.length = 0;
      this.parent = undefined;
    }

    // Common case.
    if (typeof arg === 'number') {
      return fromNumber(this, arg);
    }

    // Slightly less common case.
    if (typeof arg === 'string') {
      return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8');
    }

    // Unusual.
    return fromObject(this, arg);
  }

  function fromNumber(that, length) {
    that = allocate(that, length < 0 ? 0 : checked(length) | 0);
    if (!Buffer.TYPED_ARRAY_SUPPORT) {
      for (var i = 0; i < length; i++) {
        that[i] = 0;
      }
    }
    return that;
  }

  function fromString(that, string, encoding) {
    if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8';

    // Assumption: byteLength() return value is always < kMaxLength.
    var length = byteLength(string, encoding) | 0;
    that = allocate(that, length);

    that.write(string, encoding);
    return that;
  }

  function fromObject(that, object) {
    if (Buffer.isBuffer(object)) return fromBuffer(that, object);

    if (isArray(object)) return fromArray(that, object);

    if (object == null) {
      throw new TypeError('must start with number, buffer, array or string');
    }

    if (typeof ArrayBuffer !== 'undefined') {
      if (object.buffer instanceof ArrayBuffer) {
        return fromTypedArray(that, object);
      }
      if (object instanceof ArrayBuffer) {
        return fromArrayBuffer(that, object);
      }
    }

    if (object.length) return fromArrayLike(that, object);

    return fromJsonObject(that, object);
  }

  function fromBuffer(that, buffer) {
    var length = checked(buffer.length) | 0;
    that = allocate(that, length);
    buffer.copy(that, 0, 0, length);
    return that;
  }

  function fromArray(that, array) {
    var length = checked(array.length) | 0;
    that = allocate(that, length);
    for (var i = 0; i < length; i += 1) {
      that[i] = array[i] & 255;
    }
    return that;
  }

  // Duplicate of fromArray() to keep fromArray() monomorphic.
  function fromTypedArray(that, array) {
    var length = checked(array.length) | 0;
    that = allocate(that, length);
    // Truncating the elements is probably not what people expect from typed
    // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
    // of the old Buffer constructor.
    for (var i = 0; i < length; i += 1) {
      that[i] = array[i] & 255;
    }
    return that;
  }

  function fromArrayBuffer(that, array) {
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      // Return an augmented `Uint8Array` instance, for best performance
      array.byteLength;
      that = Buffer._augment(new Uint8Array(array));
    } else {
      // Fallback: Return an object instance of the Buffer class
      that = fromTypedArray(that, new Uint8Array(array));
    }
    return that;
  }

  function fromArrayLike(that, array) {
    var length = checked(array.length) | 0;
    that = allocate(that, length);
    for (var i = 0; i < length; i += 1) {
      that[i] = array[i] & 255;
    }
    return that;
  }

  // Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
  // Returns a zero-length buffer for inputs that don't conform to the spec.
  function fromJsonObject(that, object) {
    var array;
    var length = 0;

    if (object.type === 'Buffer' && isArray(object.data)) {
      array = object.data;
      length = checked(array.length) | 0;
    }
    that = allocate(that, length);

    for (var i = 0; i < length; i += 1) {
      that[i] = array[i] & 255;
    }
    return that;
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    Buffer.prototype.__proto__ = Uint8Array.prototype;
    Buffer.__proto__ = Uint8Array;
  } else {
    // pre-set for values that may exist in the future
    Buffer.prototype.length = undefined;
    Buffer.prototype.parent = undefined;
  }

  function allocate(that, length) {
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      // Return an augmented `Uint8Array` instance, for best performance
      that = Buffer._augment(new Uint8Array(length));
      that.__proto__ = Buffer.prototype;
    } else {
      // Fallback: Return an object instance of the Buffer class
      that.length = length;
      that._isBuffer = true;
    }

    var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1;
    if (fromPool) that.parent = rootParent;

    return that;
  }

  function checked(length) {
    // Note: cannot use `length < kMaxLength` here because that fails when
    // length is NaN (which is otherwise coerced to zero.)
    if (length >= kMaxLength()) {
      throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
    }
    return length | 0;
  }

  function SlowBuffer(subject, encoding) {
    if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding);

    var buf = new Buffer(subject, encoding);
    delete buf.parent;
    return buf;
  }

  Buffer.isBuffer = function isBuffer(b) {
    return !!(b != null && b._isBuffer);
  };

  Buffer.compare = function compare(a, b) {
    if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
      throw new TypeError('Arguments must be Buffers');
    }

    if (a === b) return 0;

    var x = a.length;
    var y = b.length;

    var i = 0;
    var len = Math.min(x, y);
    while (i < len) {
      if (a[i] !== b[i]) break;

      ++i;
    }

    if (i !== len) {
      x = a[i];
      y = b[i];
    }

    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
  };

  Buffer.isEncoding = function isEncoding(encoding) {
    switch (String(encoding).toLowerCase()) {
      case 'hex':
      case 'utf8':
      case 'utf-8':
      case 'ascii':
      case 'binary':
      case 'base64':
      case 'raw':
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return true;
      default:
        return false;
    }
  };

  Buffer.concat = function concat(list, length) {
    if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.');

    if (list.length === 0) {
      return new Buffer(0);
    }

    var i;
    if (length === undefined) {
      length = 0;
      for (i = 0; i < list.length; i++) {
        length += list[i].length;
      }
    }

    var buf = new Buffer(length);
    var pos = 0;
    for (i = 0; i < list.length; i++) {
      var item = list[i];
      item.copy(buf, pos);
      pos += item.length;
    }
    return buf;
  };

  function byteLength(string, encoding) {
    if (typeof string !== 'string') string = '' + string;

    var len = string.length;
    if (len === 0) return 0;

    // Use a for loop to avoid recursion
    var loweredCase = false;
    for (;;) {
      switch (encoding) {
        case 'ascii':
        case 'binary':
        // Deprecated
        case 'raw':
        case 'raws':
          return len;
        case 'utf8':
        case 'utf-8':
          return utf8ToBytes(string).length;
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return len * 2;
        case 'hex':
          return len >>> 1;
        case 'base64':
          return base64ToBytes(string).length;
        default:
          if (loweredCase) return utf8ToBytes(string).length; // assume utf8
          encoding = ('' + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer.byteLength = byteLength;

  function slowToString(encoding, start, end) {
    var loweredCase = false;

    start = start | 0;
    end = end === undefined || end === Infinity ? this.length : end | 0;

    if (!encoding) encoding = 'utf8';
    if (start < 0) start = 0;
    if (end > this.length) end = this.length;
    if (end <= start) return '';

    while (true) {
      switch (encoding) {
        case 'hex':
          return hexSlice(this, start, end);

        case 'utf8':
        case 'utf-8':
          return utf8Slice(this, start, end);

        case 'ascii':
          return asciiSlice(this, start, end);

        case 'binary':
          return binarySlice(this, start, end);

        case 'base64':
          return base64Slice(this, start, end);

        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return utf16leSlice(this, start, end);

        default:
          if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
          encoding = (encoding + '').toLowerCase();
          loweredCase = true;
      }
    }
  }

  Buffer.prototype.toString = function toString() {
    var length = this.length | 0;
    if (length === 0) return '';
    if (arguments.length === 0) return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
  };

  Buffer.prototype.equals = function equals(b) {
    if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
    if (this === b) return true;
    return Buffer.compare(this, b) === 0;
  };

  Buffer.prototype.inspect = function inspect() {
    var str = '';
    var max = exports.INSPECT_MAX_BYTES;
    if (this.length > 0) {
      str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
      if (this.length > max) str += ' ... ';
    }
    return '<Buffer ' + str + '>';
  };

  Buffer.prototype.compare = function compare(b) {
    if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
    if (this === b) return 0;
    return Buffer.compare(this, b);
  };

  Buffer.prototype.indexOf = function indexOf(val, byteOffset) {
    if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff;else if (byteOffset < -0x80000000) byteOffset = -0x80000000;
    byteOffset >>= 0;

    if (this.length === 0) return -1;
    if (byteOffset >= this.length) return -1;

    // Negative offsets start from the end of the buffer
    if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0);

    if (typeof val === 'string') {
      if (val.length === 0) return -1; // special case: looking for empty string always fails
      return String.prototype.indexOf.call(this, val, byteOffset);
    }
    if (Buffer.isBuffer(val)) {
      return arrayIndexOf(this, val, byteOffset);
    }
    if (typeof val === 'number') {
      if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
        return Uint8Array.prototype.indexOf.call(this, val, byteOffset);
      }
      return arrayIndexOf(this, [val], byteOffset);
    }

    function arrayIndexOf(arr, val, byteOffset) {
      var foundIndex = -1;
      for (var i = 0; byteOffset + i < arr.length; i++) {
        if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
          if (foundIndex === -1) foundIndex = i;
          if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex;
        } else {
          foundIndex = -1;
        }
      }
      return -1;
    }

    throw new TypeError('val must be string, number or Buffer');
  };

  // `get` is deprecated
  Buffer.prototype.get = function get(offset) {
    console.log('.get() is deprecated. Access using array indexes instead.');
    return this.readUInt8(offset);
  };

  // `set` is deprecated
  Buffer.prototype.set = function set(v, offset) {
    console.log('.set() is deprecated. Access using array indexes instead.');
    return this.writeUInt8(v, offset);
  };

  function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    var remaining = buf.length - offset;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }

    // must be an even number of digits
    var strLen = string.length;
    if (strLen % 2 !== 0) throw new Error('Invalid hex string');

    if (length > strLen / 2) {
      length = strLen / 2;
    }
    for (var i = 0; i < length; i++) {
      var parsed = parseInt(string.substr(i * 2, 2), 16);
      if (isNaN(parsed)) throw new Error('Invalid hex string');
      buf[offset + i] = parsed;
    }
    return i;
  }

  function utf8Write(buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
  }

  function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
  }

  function binaryWrite(buf, string, offset, length) {
    return asciiWrite(buf, string, offset, length);
  }

  function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
  }

  function ucs2Write(buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
  }

  Buffer.prototype.write = function write(string, offset, length, encoding) {
    // Buffer#write(string)
    if (offset === undefined) {
      encoding = 'utf8';
      length = this.length;
      offset = 0;
      // Buffer#write(string, encoding)
    } else if (length === undefined && typeof offset === 'string') {
      encoding = offset;
      length = this.length;
      offset = 0;
      // Buffer#write(string, offset[, length][, encoding])
    } else if (isFinite(offset)) {
      offset = offset | 0;
      if (isFinite(length)) {
        length = length | 0;
        if (encoding === undefined) encoding = 'utf8';
      } else {
        encoding = length;
        length = undefined;
      }
      // legacy write(string, encoding, offset, length) - remove in v0.13
    } else {
      var swap = encoding;
      encoding = offset;
      offset = length | 0;
      length = swap;
    }

    var remaining = this.length - offset;
    if (length === undefined || length > remaining) length = remaining;

    if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
      throw new RangeError('attempt to write outside buffer bounds');
    }

    if (!encoding) encoding = 'utf8';

    var loweredCase = false;
    for (;;) {
      switch (encoding) {
        case 'hex':
          return hexWrite(this, string, offset, length);

        case 'utf8':
        case 'utf-8':
          return utf8Write(this, string, offset, length);

        case 'ascii':
          return asciiWrite(this, string, offset, length);

        case 'binary':
          return binaryWrite(this, string, offset, length);

        case 'base64':
          // Warning: maxLength not taken into account in base64Write
          return base64Write(this, string, offset, length);

        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return ucs2Write(this, string, offset, length);

        default:
          if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
          encoding = ('' + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  };

  Buffer.prototype.toJSON = function toJSON() {
    return {
      type: 'Buffer',
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };

  function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) {
      return base64.fromByteArray(buf);
    } else {
      return base64.fromByteArray(buf.slice(start, end));
    }
  }

  function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    var res = [];

    var i = start;
    while (i < end) {
      var firstByte = buf[i];
      var codePoint = null;
      var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

      if (i + bytesPerSequence <= end) {
        var secondByte, thirdByte, fourthByte, tempCodePoint;

        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 0x80) {
              codePoint = firstByte;
            }
            break;
          case 2:
            secondByte = buf[i + 1];
            if ((secondByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
              if (tempCodePoint > 0x7F) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 3:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
              if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 4:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            fourthByte = buf[i + 3];
            if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
              if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                codePoint = tempCodePoint;
              }
            }
        }
      }

      if (codePoint === null) {
        // we did not generate a valid codePoint so insert a
        // replacement char (U+FFFD) and advance only 1 byte
        codePoint = 0xFFFD;
        bytesPerSequence = 1;
      } else if (codePoint > 0xFFFF) {
        // encode to utf16 (surrogate pair dance)
        codePoint -= 0x10000;
        res.push(codePoint >>> 10 & 0x3FF | 0xD800);
        codePoint = 0xDC00 | codePoint & 0x3FF;
      }

      res.push(codePoint);
      i += bytesPerSequence;
    }

    return decodeCodePointsArray(res);
  }

  // Based on http://stackoverflow.com/a/22747272/680742, the browser with
  // the lowest limit is Chrome, with 0x10000 args.
  // We go 1 magnitude less, for safety
  var MAX_ARGUMENTS_LENGTH = 0x1000;

  function decodeCodePointsArray(codePoints) {
    var len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
    }

    // Decode in chunks to avoid "call stack size exceeded".
    var res = '';
    var i = 0;
    while (i < len) {
      res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
    }
    return res;
  }

  function asciiSlice(buf, start, end) {
    var ret = '';
    end = Math.min(buf.length, end);

    for (var i = start; i < end; i++) {
      ret += String.fromCharCode(buf[i] & 0x7F);
    }
    return ret;
  }

  function binarySlice(buf, start, end) {
    var ret = '';
    end = Math.min(buf.length, end);

    for (var i = start; i < end; i++) {
      ret += String.fromCharCode(buf[i]);
    }
    return ret;
  }

  function hexSlice(buf, start, end) {
    var len = buf.length;

    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len) end = len;

    var out = '';
    for (var i = start; i < end; i++) {
      out += toHex(buf[i]);
    }
    return out;
  }

  function utf16leSlice(buf, start, end) {
    var bytes = buf.slice(start, end);
    var res = '';
    for (var i = 0; i < bytes.length; i += 2) {
      res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }
    return res;
  }

  Buffer.prototype.slice = function slice(start, end) {
    var len = this.length;
    start = ~~start;
    end = end === undefined ? len : ~~end;

    if (start < 0) {
      start += len;
      if (start < 0) start = 0;
    } else if (start > len) {
      start = len;
    }

    if (end < 0) {
      end += len;
      if (end < 0) end = 0;
    } else if (end > len) {
      end = len;
    }

    if (end < start) end = start;

    var newBuf;
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      newBuf = Buffer._augment(this.subarray(start, end));
    } else {
      var sliceLen = end - start;
      newBuf = new Buffer(sliceLen, undefined);
      for (var i = 0; i < sliceLen; i++) {
        newBuf[i] = this[i + start];
      }
    }

    if (newBuf.length) newBuf.parent = this.parent || this;

    return newBuf;
  };

  /*
   * Need to make sure that buffer isn't trying to write out of bounds.
   */
  function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
    if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
  }

  Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);

    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength && (mul *= 0x100)) {
      val += this[offset + i] * mul;
    }

    return val;
  };

  Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) {
      checkOffset(offset, byteLength, this.length);
    }

    var val = this[offset + --byteLength];
    var mul = 1;
    while (byteLength > 0 && (mul *= 0x100)) {
      val += this[offset + --byteLength] * mul;
    }

    return val;
  };

  Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 1, this.length);
    return this[offset];
  };

  Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] | this[offset + 1] << 8;
  };

  Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] << 8 | this[offset + 1];
  };

  Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
  };

  Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
  };

  Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);

    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength && (mul *= 0x100)) {
      val += this[offset + i] * mul;
    }
    mul *= 0x80;

    if (val >= mul) val -= Math.pow(2, 8 * byteLength);

    return val;
  };

  Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);

    var i = byteLength;
    var mul = 1;
    var val = this[offset + --i];
    while (i > 0 && (mul *= 0x100)) {
      val += this[offset + --i] * mul;
    }
    mul *= 0x80;

    if (val >= mul) val -= Math.pow(2, 8 * byteLength);

    return val;
  };

  Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 1, this.length);
    if (!(this[offset] & 0x80)) return this[offset];
    return (0xff - this[offset] + 1) * -1;
  };

  Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    var val = this[offset] | this[offset + 1] << 8;
    return val & 0x8000 ? val | 0xFFFF0000 : val;
  };

  Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    var val = this[offset + 1] | this[offset] << 8;
    return val & 0x8000 ? val | 0xFFFF0000 : val;
  };

  Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
  };

  Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
  };

  Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, true, 23, 4);
  };

  Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, false, 23, 4);
  };

  Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, true, 52, 8);
  };

  Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, false, 52, 8);
  };

  function checkInt(buf, value, offset, ext, max, min) {
    if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance');
    if (value > max || value < min) throw new RangeError('value is out of bounds');
    if (offset + ext > buf.length) throw new RangeError('index out of range');
  }

  Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0);

    var mul = 1;
    var i = 0;
    this[offset] = value & 0xFF;
    while (++i < byteLength && (mul *= 0x100)) {
      this[offset + i] = value / mul & 0xFF;
    }

    return offset + byteLength;
  };

  Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0);

    var i = byteLength - 1;
    var mul = 1;
    this[offset + i] = value & 0xFF;
    while (--i >= 0 && (mul *= 0x100)) {
      this[offset + i] = value / mul & 0xFF;
    }

    return offset + byteLength;
  };

  Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
    if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
    this[offset] = value & 0xff;
    return offset + 1;
  };

  function objectWriteUInt16(buf, value, offset, littleEndian) {
    if (value < 0) value = 0xffff + value + 1;
    for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
      buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
    }
  }

  Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value & 0xff;
      this[offset + 1] = value >>> 8;
    } else {
      objectWriteUInt16(this, value, offset, true);
    }
    return offset + 2;
  };

  Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value >>> 8;
      this[offset + 1] = value & 0xff;
    } else {
      objectWriteUInt16(this, value, offset, false);
    }
    return offset + 2;
  };

  function objectWriteUInt32(buf, value, offset, littleEndian) {
    if (value < 0) value = 0xffffffff + value + 1;
    for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
      buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
    }
  }

  Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 0xff;
    } else {
      objectWriteUInt32(this, value, offset, true);
    }
    return offset + 4;
  };

  Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 0xff;
    } else {
      objectWriteUInt32(this, value, offset, false);
    }
    return offset + 4;
  };

  Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1);

      checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }

    var i = 0;
    var mul = 1;
    var sub = value < 0 ? 1 : 0;
    this[offset] = value & 0xFF;
    while (++i < byteLength && (mul *= 0x100)) {
      this[offset + i] = (value / mul >> 0) - sub & 0xFF;
    }

    return offset + byteLength;
  };

  Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1);

      checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }

    var i = byteLength - 1;
    var mul = 1;
    var sub = value < 0 ? 1 : 0;
    this[offset + i] = value & 0xFF;
    while (--i >= 0 && (mul *= 0x100)) {
      this[offset + i] = (value / mul >> 0) - sub & 0xFF;
    }

    return offset + byteLength;
  };

  Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
    if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
    if (value < 0) value = 0xff + value + 1;
    this[offset] = value & 0xff;
    return offset + 1;
  };

  Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value & 0xff;
      this[offset + 1] = value >>> 8;
    } else {
      objectWriteUInt16(this, value, offset, true);
    }
    return offset + 2;
  };

  Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value >>> 8;
      this[offset + 1] = value & 0xff;
    } else {
      objectWriteUInt16(this, value, offset, false);
    }
    return offset + 2;
  };

  Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value & 0xff;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
    } else {
      objectWriteUInt32(this, value, offset, true);
    }
    return offset + 4;
  };

  Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    if (value < 0) value = 0xffffffff + value + 1;
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 0xff;
    } else {
      objectWriteUInt32(this, value, offset, false);
    }
    return offset + 4;
  };

  function checkIEEE754(buf, value, offset, ext, max, min) {
    if (value > max || value < min) throw new RangeError('value is out of bounds');
    if (offset + ext > buf.length) throw new RangeError('index out of range');
    if (offset < 0) throw new RangeError('index out of range');
  }

  function writeFloat(buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
    }
    ieee754.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
  }

  Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert);
  };

  Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert);
  };

  function writeDouble(buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
    }
    ieee754.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
  }

  Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert);
  };

  Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert);
  };

  // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
  Buffer.prototype.copy = function copy(target, targetStart, start, end) {
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start;

    // Copy 0 bytes; we're done
    if (end === start) return 0;
    if (target.length === 0 || this.length === 0) return 0;

    // Fatal error conditions
    if (targetStart < 0) {
      throw new RangeError('targetStart out of bounds');
    }
    if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
    if (end < 0) throw new RangeError('sourceEnd out of bounds');

    // Are we oob?
    if (end > this.length) end = this.length;
    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start;
    }

    var len = end - start;
    var i;

    if (this === target && start < targetStart && targetStart < end) {
      // descending copy from end
      for (i = len - 1; i >= 0; i--) {
        target[i + targetStart] = this[i + start];
      }
    } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
      // ascending copy from start
      for (i = 0; i < len; i++) {
        target[i + targetStart] = this[i + start];
      }
    } else {
      target._set(this.subarray(start, start + len), targetStart);
    }

    return len;
  };

  // fill(value, start=0, end=buffer.length)
  Buffer.prototype.fill = function fill(value, start, end) {
    if (!value) value = 0;
    if (!start) start = 0;
    if (!end) end = this.length;

    if (end < start) throw new RangeError('end < start');

    // Fill 0 bytes; we're done
    if (end === start) return;
    if (this.length === 0) return;

    if (start < 0 || start >= this.length) throw new RangeError('start out of bounds');
    if (end < 0 || end > this.length) throw new RangeError('end out of bounds');

    var i;
    if (typeof value === 'number') {
      for (i = start; i < end; i++) {
        this[i] = value;
      }
    } else {
      var bytes = utf8ToBytes(value.toString());
      var len = bytes.length;
      for (i = start; i < end; i++) {
        this[i] = bytes[i % len];
      }
    }

    return this;
  };

  /**
   * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
   * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
   */
  Buffer.prototype.toArrayBuffer = function toArrayBuffer() {
    if (typeof Uint8Array !== 'undefined') {
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        return new Buffer(this).buffer;
      } else {
        var buf = new Uint8Array(this.length);
        for (var i = 0, len = buf.length; i < len; i += 1) {
          buf[i] = this[i];
        }
        return buf.buffer;
      }
    } else {
      throw new TypeError('Buffer.toArrayBuffer not supported in this browser');
    }
  };

  // HELPER FUNCTIONS
  // ================

  var BP = Buffer.prototype;

  /**
   * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
   */
  Buffer._augment = function _augment(arr) {
    arr.constructor = Buffer;
    arr._isBuffer = true;

    // save reference to original Uint8Array set method before overwriting
    arr._set = arr.set;

    // deprecated
    arr.get = BP.get;
    arr.set = BP.set;

    arr.write = BP.write;
    arr.toString = BP.toString;
    arr.toLocaleString = BP.toString;
    arr.toJSON = BP.toJSON;
    arr.equals = BP.equals;
    arr.compare = BP.compare;
    arr.indexOf = BP.indexOf;
    arr.copy = BP.copy;
    arr.slice = BP.slice;
    arr.readUIntLE = BP.readUIntLE;
    arr.readUIntBE = BP.readUIntBE;
    arr.readUInt8 = BP.readUInt8;
    arr.readUInt16LE = BP.readUInt16LE;
    arr.readUInt16BE = BP.readUInt16BE;
    arr.readUInt32LE = BP.readUInt32LE;
    arr.readUInt32BE = BP.readUInt32BE;
    arr.readIntLE = BP.readIntLE;
    arr.readIntBE = BP.readIntBE;
    arr.readInt8 = BP.readInt8;
    arr.readInt16LE = BP.readInt16LE;
    arr.readInt16BE = BP.readInt16BE;
    arr.readInt32LE = BP.readInt32LE;
    arr.readInt32BE = BP.readInt32BE;
    arr.readFloatLE = BP.readFloatLE;
    arr.readFloatBE = BP.readFloatBE;
    arr.readDoubleLE = BP.readDoubleLE;
    arr.readDoubleBE = BP.readDoubleBE;
    arr.writeUInt8 = BP.writeUInt8;
    arr.writeUIntLE = BP.writeUIntLE;
    arr.writeUIntBE = BP.writeUIntBE;
    arr.writeUInt16LE = BP.writeUInt16LE;
    arr.writeUInt16BE = BP.writeUInt16BE;
    arr.writeUInt32LE = BP.writeUInt32LE;
    arr.writeUInt32BE = BP.writeUInt32BE;
    arr.writeIntLE = BP.writeIntLE;
    arr.writeIntBE = BP.writeIntBE;
    arr.writeInt8 = BP.writeInt8;
    arr.writeInt16LE = BP.writeInt16LE;
    arr.writeInt16BE = BP.writeInt16BE;
    arr.writeInt32LE = BP.writeInt32LE;
    arr.writeInt32BE = BP.writeInt32BE;
    arr.writeFloatLE = BP.writeFloatLE;
    arr.writeFloatBE = BP.writeFloatBE;
    arr.writeDoubleLE = BP.writeDoubleLE;
    arr.writeDoubleBE = BP.writeDoubleBE;
    arr.fill = BP.fill;
    arr.inspect = BP.inspect;
    arr.toArrayBuffer = BP.toArrayBuffer;

    return arr;
  };

  var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

  function base64clean(str) {
    // Node strips out invalid characters like \n and \t from the string, base64-js does not
    str = stringtrim(str).replace(INVALID_BASE64_RE, '');
    // Node converts strings with length < 2 to ''
    if (str.length < 2) return '';
    // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
    while (str.length % 4 !== 0) {
      str = str + '=';
    }
    return str;
  }

  function stringtrim(str) {
    if (str.trim) return str.trim();
    return str.replace(/^\s+|\s+$/g, '');
  }

  function toHex(n) {
    if (n < 16) return '0' + n.toString(16);
    return n.toString(16);
  }

  function utf8ToBytes(string, units) {
    units = units || Infinity;
    var codePoint;
    var length = string.length;
    var leadSurrogate = null;
    var bytes = [];

    for (var i = 0; i < length; i++) {
      codePoint = string.charCodeAt(i);

      // is surrogate component
      if (codePoint > 0xD7FF && codePoint < 0xE000) {
        // last char was a lead
        if (!leadSurrogate) {
          // no lead yet
          if (codePoint > 0xDBFF) {
            // unexpected trail
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
            continue;
          } else if (i + 1 === length) {
            // unpaired lead
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
            continue;
          }

          // valid lead
          leadSurrogate = codePoint;

          continue;
        }

        // 2 leads in a row
        if (codePoint < 0xDC00) {
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          leadSurrogate = codePoint;
          continue;
        }

        // valid surrogate pair
        codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
      } else if (leadSurrogate) {
        // valid bmp char, but last char was a lead
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
      }

      leadSurrogate = null;

      // encode utf8
      if (codePoint < 0x80) {
        if ((units -= 1) < 0) break;
        bytes.push(codePoint);
      } else if (codePoint < 0x800) {
        if ((units -= 2) < 0) break;
        bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
      } else if (codePoint < 0x10000) {
        if ((units -= 3) < 0) break;
        bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
      } else if (codePoint < 0x110000) {
        if ((units -= 4) < 0) break;
        bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
      } else {
        throw new Error('Invalid code point');
      }
    }

    return bytes;
  }

  function asciiToBytes(str) {
    var byteArray = [];
    for (var i = 0; i < str.length; i++) {
      // Node's code seems to be doing this and not & 0x7F..
      byteArray.push(str.charCodeAt(i) & 0xFF);
    }
    return byteArray;
  }

  function utf16leToBytes(str, units) {
    var c, hi, lo;
    var byteArray = [];
    for (var i = 0; i < str.length; i++) {
      if ((units -= 2) < 0) break;

      c = str.charCodeAt(i);
      hi = c >> 8;
      lo = c % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }

    return byteArray;
  }

  function base64ToBytes(str) {
    return base64.toByteArray(base64clean(str));
  }

  function blitBuffer(src, dst, offset, length) {
    for (var i = 0; i < length; i++) {
      if (i + offset >= dst.length || i >= src.length) break;
      dst[i + offset] = src[i];
    }
    return i;
  }
});
System.registerDynamic("npm:buffer@3.6.0.js", ["npm:buffer@3.6.0/index.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("npm:buffer@3.6.0/index.js");
});
System.registerDynamic('github:jspm/nodelibs-buffer@0.1.0/index.js', ['npm:buffer@3.6.0.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  module.exports = System._nodeRequire ? System._nodeRequire('buffer') : $__require('npm:buffer@3.6.0.js');
});
System.registerDynamic("github:jspm/nodelibs-buffer@0.1.0.js", ["github:jspm/nodelibs-buffer@0.1.0/index.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("github:jspm/nodelibs-buffer@0.1.0/index.js");
});
System.registerDynamic('npm:rxjs@5.2.0/operator/bufferToggle.js', ['npm:rxjs@5.2.0/Subscription.js', 'npm:rxjs@5.2.0/util/subscribeToResult.js', 'npm:rxjs@5.2.0/OuterSubscriber.js', 'github:jspm/nodelibs-buffer@0.1.0.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (Buffer) {
    "use strict";

    var __extends = this && this.__extends || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscription_1 = $__require('npm:rxjs@5.2.0/Subscription.js');
    var subscribeToResult_1 = $__require('npm:rxjs@5.2.0/util/subscribeToResult.js');
    var OuterSubscriber_1 = $__require('npm:rxjs@5.2.0/OuterSubscriber.js');
    function bufferToggle(openings, closingSelector) {
      return this.lift(new BufferToggleOperator(openings, closingSelector));
    }
    exports.bufferToggle = bufferToggle;
    var BufferToggleOperator = function () {
      function BufferToggleOperator(openings, closingSelector) {
        this.openings = openings;
        this.closingSelector = closingSelector;
      }
      BufferToggleOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new BufferToggleSubscriber(subscriber, this.openings, this.closingSelector));
      };
      return BufferToggleOperator;
    }();
    var BufferToggleSubscriber = function (_super) {
      __extends(BufferToggleSubscriber, _super);
      function BufferToggleSubscriber(destination, openings, closingSelector) {
        _super.call(this, destination);
        this.openings = openings;
        this.closingSelector = closingSelector;
        this.contexts = [];
        this.add(subscribeToResult_1.subscribeToResult(this, openings));
      }
      BufferToggleSubscriber.prototype._next = function (value) {
        var contexts = this.contexts;
        var len = contexts.length;
        for (var i = 0; i < len; i++) {
          contexts[i].buffer.push(value);
        }
      };
      BufferToggleSubscriber.prototype._error = function (err) {
        var contexts = this.contexts;
        while (contexts.length > 0) {
          var context = contexts.shift();
          context.subscription.unsubscribe();
          context.buffer = null;
          context.subscription = null;
        }
        this.contexts = null;
        _super.prototype._error.call(this, err);
      };
      BufferToggleSubscriber.prototype._complete = function () {
        var contexts = this.contexts;
        while (contexts.length > 0) {
          var context = contexts.shift();
          this.destination.next(context.buffer);
          context.subscription.unsubscribe();
          context.buffer = null;
          context.subscription = null;
        }
        this.contexts = null;
        _super.prototype._complete.call(this);
      };
      BufferToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        outerValue ? this.closeBuffer(outerValue) : this.openBuffer(innerValue);
      };
      BufferToggleSubscriber.prototype.notifyComplete = function (innerSub) {
        this.closeBuffer(innerSub.context);
      };
      BufferToggleSubscriber.prototype.openBuffer = function (value) {
        try {
          var closingSelector = this.closingSelector;
          var closingNotifier = closingSelector.call(this, value);
          if (closingNotifier) {
            this.trySubscribe(closingNotifier);
          }
        } catch (err) {
          this._error(err);
        }
      };
      BufferToggleSubscriber.prototype.closeBuffer = function (context) {
        var contexts = this.contexts;
        if (contexts && context) {
          var buffer = context.buffer,
              subscription = context.subscription;
          this.destination.next(buffer);
          contexts.splice(contexts.indexOf(context), 1);
          this.remove(subscription);
          subscription.unsubscribe();
        }
      };
      BufferToggleSubscriber.prototype.trySubscribe = function (closingNotifier) {
        var contexts = this.contexts;
        var buffer = [];
        var subscription = new Subscription_1.Subscription();
        var context = {
          buffer: buffer,
          subscription: subscription
        };
        contexts.push(context);
        var innerSubscription = subscribeToResult_1.subscribeToResult(this, closingNotifier, context);
        if (!innerSubscription || innerSubscription.closed) {
          this.closeBuffer(context);
        } else {
          innerSubscription.context = context;
          this.add(innerSubscription);
          subscription.add(innerSubscription);
        }
      };
      return BufferToggleSubscriber;
    }(OuterSubscriber_1.OuterSubscriber);
  })($__require('github:jspm/nodelibs-buffer@0.1.0.js').Buffer);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/bufferToggle.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/bufferToggle.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var bufferToggle_1 = $__require('npm:rxjs@5.2.0/operator/bufferToggle.js');
  Observable_1.Observable.prototype.bufferToggle = bufferToggle_1.bufferToggle;
});
System.registerDynamic("npm:rxjs@5.2.0/operator/pairwise.js", ["npm:rxjs@5.2.0/Subscriber.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require("npm:rxjs@5.2.0/Subscriber.js");
  function pairwise() {
    return this.lift(new PairwiseOperator());
  }
  exports.pairwise = pairwise;
  var PairwiseOperator = function () {
    function PairwiseOperator() {}
    PairwiseOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new PairwiseSubscriber(subscriber));
    };
    return PairwiseOperator;
  }();
  var PairwiseSubscriber = function (_super) {
    __extends(PairwiseSubscriber, _super);
    function PairwiseSubscriber(destination) {
      _super.call(this, destination);
      this.hasPrev = false;
    }
    PairwiseSubscriber.prototype._next = function (value) {
      if (this.hasPrev) {
        this.destination.next([this.prev, value]);
      } else {
        this.hasPrev = true;
      }
      this.prev = value;
    };
    return PairwiseSubscriber;
  }(Subscriber_1.Subscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/pairwise.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/pairwise.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var pairwise_1 = $__require('npm:rxjs@5.2.0/operator/pairwise.js');
  Observable_1.Observable.prototype.pairwise = pairwise_1.pairwise;
});
System.registerDynamic("npm:rxjs@5.2.0/util/not.js", [], true, function ($__require, exports, module) {
    /* */
    "use strict";

    var global = this || self,
        GLOBAL = global;
    function not(pred, thisArg) {
        function notPred() {
            return !notPred.pred.apply(notPred.thisArg, arguments);
        }
        notPred.pred = pred;
        notPred.thisArg = thisArg;
        return notPred;
    }
    exports.not = not;
    
});
System.registerDynamic('npm:rxjs@5.2.0/operator/partition.js', ['npm:rxjs@5.2.0/util/not.js', 'npm:rxjs@5.2.0/operator/filter.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var not_1 = $__require('npm:rxjs@5.2.0/util/not.js');
  var filter_1 = $__require('npm:rxjs@5.2.0/operator/filter.js');
  function partition(predicate, thisArg) {
    return [filter_1.filter.call(this, predicate, thisArg), filter_1.filter.call(this, not_1.not(predicate, thisArg))];
  }
  exports.partition = partition;
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/partition.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/partition.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var partition_1 = $__require('npm:rxjs@5.2.0/operator/partition.js');
  Observable_1.Observable.prototype.partition = partition_1.partition;
});
System.registerDynamic("npm:rxjs@5.2.0/operator/mapTo.js", ["npm:rxjs@5.2.0/Subscriber.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require("npm:rxjs@5.2.0/Subscriber.js");
  function mapTo(value) {
    return this.lift(new MapToOperator(value));
  }
  exports.mapTo = mapTo;
  var MapToOperator = function () {
    function MapToOperator(value) {
      this.value = value;
    }
    MapToOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new MapToSubscriber(subscriber, this.value));
    };
    return MapToOperator;
  }();
  var MapToSubscriber = function (_super) {
    __extends(MapToSubscriber, _super);
    function MapToSubscriber(destination, value) {
      _super.call(this, destination);
      this.value = value;
    }
    MapToSubscriber.prototype._next = function (x) {
      this.destination.next(this.value);
    };
    return MapToSubscriber;
  }(Subscriber_1.Subscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/mapTo.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/mapTo.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var mapTo_1 = $__require('npm:rxjs@5.2.0/operator/mapTo.js');
  Observable_1.Observable.prototype.mapTo = mapTo_1.mapTo;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/expand.js', ['npm:rxjs@5.2.0/util/tryCatch.js', 'npm:rxjs@5.2.0/util/errorObject.js', 'npm:rxjs@5.2.0/OuterSubscriber.js', 'npm:rxjs@5.2.0/util/subscribeToResult.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var tryCatch_1 = $__require('npm:rxjs@5.2.0/util/tryCatch.js');
  var errorObject_1 = $__require('npm:rxjs@5.2.0/util/errorObject.js');
  var OuterSubscriber_1 = $__require('npm:rxjs@5.2.0/OuterSubscriber.js');
  var subscribeToResult_1 = $__require('npm:rxjs@5.2.0/util/subscribeToResult.js');
  function expand(project, concurrent, scheduler) {
    if (concurrent === void 0) {
      concurrent = Number.POSITIVE_INFINITY;
    }
    if (scheduler === void 0) {
      scheduler = undefined;
    }
    concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
    return this.lift(new ExpandOperator(project, concurrent, scheduler));
  }
  exports.expand = expand;
  var ExpandOperator = function () {
    function ExpandOperator(project, concurrent, scheduler) {
      this.project = project;
      this.concurrent = concurrent;
      this.scheduler = scheduler;
    }
    ExpandOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new ExpandSubscriber(subscriber, this.project, this.concurrent, this.scheduler));
    };
    return ExpandOperator;
  }();
  exports.ExpandOperator = ExpandOperator;
  var ExpandSubscriber = function (_super) {
    __extends(ExpandSubscriber, _super);
    function ExpandSubscriber(destination, project, concurrent, scheduler) {
      _super.call(this, destination);
      this.project = project;
      this.concurrent = concurrent;
      this.scheduler = scheduler;
      this.index = 0;
      this.active = 0;
      this.hasCompleted = false;
      if (concurrent < Number.POSITIVE_INFINITY) {
        this.buffer = [];
      }
    }
    ExpandSubscriber.dispatch = function (arg) {
      var subscriber = arg.subscriber,
          result = arg.result,
          value = arg.value,
          index = arg.index;
      subscriber.subscribeToProjection(result, value, index);
    };
    ExpandSubscriber.prototype._next = function (value) {
      var destination = this.destination;
      if (destination.closed) {
        this._complete();
        return;
      }
      var index = this.index++;
      if (this.active < this.concurrent) {
        destination.next(value);
        var result = tryCatch_1.tryCatch(this.project)(value, index);
        if (result === errorObject_1.errorObject) {
          destination.error(errorObject_1.errorObject.e);
        } else if (!this.scheduler) {
          this.subscribeToProjection(result, value, index);
        } else {
          var state = {
            subscriber: this,
            result: result,
            value: value,
            index: index
          };
          this.add(this.scheduler.schedule(ExpandSubscriber.dispatch, 0, state));
        }
      } else {
        this.buffer.push(value);
      }
    };
    ExpandSubscriber.prototype.subscribeToProjection = function (result, value, index) {
      this.active++;
      this.add(subscribeToResult_1.subscribeToResult(this, result, value, index));
    };
    ExpandSubscriber.prototype._complete = function () {
      this.hasCompleted = true;
      if (this.hasCompleted && this.active === 0) {
        this.destination.complete();
      }
    };
    ExpandSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this._next(innerValue);
    };
    ExpandSubscriber.prototype.notifyComplete = function (innerSub) {
      var buffer = this.buffer;
      this.remove(innerSub);
      this.active--;
      if (buffer && buffer.length > 0) {
        this._next(buffer.shift());
      }
      if (this.hasCompleted && this.active === 0) {
        this.destination.complete();
      }
    };
    return ExpandSubscriber;
  }(OuterSubscriber_1.OuterSubscriber);
  exports.ExpandSubscriber = ExpandSubscriber;
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/expand.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/expand.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var expand_1 = $__require('npm:rxjs@5.2.0/operator/expand.js');
  Observable_1.Observable.prototype.expand = expand_1.expand;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/combineLatest.js', ['npm:rxjs@5.2.0/observable/ArrayObservable.js', 'npm:rxjs@5.2.0/util/isArray.js', 'npm:rxjs@5.2.0/OuterSubscriber.js', 'npm:rxjs@5.2.0/util/subscribeToResult.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var ArrayObservable_1 = $__require('npm:rxjs@5.2.0/observable/ArrayObservable.js');
  var isArray_1 = $__require('npm:rxjs@5.2.0/util/isArray.js');
  var OuterSubscriber_1 = $__require('npm:rxjs@5.2.0/OuterSubscriber.js');
  var subscribeToResult_1 = $__require('npm:rxjs@5.2.0/util/subscribeToResult.js');
  var none = {};
  function combineLatest() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    var project = null;
    if (typeof observables[observables.length - 1] === 'function') {
      project = observables.pop();
    }
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
      observables = observables[0].slice();
    }
    observables.unshift(this);
    return this.lift.call(new ArrayObservable_1.ArrayObservable(observables), new CombineLatestOperator(project));
  }
  exports.combineLatest = combineLatest;
  var CombineLatestOperator = function () {
    function CombineLatestOperator(project) {
      this.project = project;
    }
    CombineLatestOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new CombineLatestSubscriber(subscriber, this.project));
    };
    return CombineLatestOperator;
  }();
  exports.CombineLatestOperator = CombineLatestOperator;
  var CombineLatestSubscriber = function (_super) {
    __extends(CombineLatestSubscriber, _super);
    function CombineLatestSubscriber(destination, project) {
      _super.call(this, destination);
      this.project = project;
      this.active = 0;
      this.values = [];
      this.observables = [];
    }
    CombineLatestSubscriber.prototype._next = function (observable) {
      this.values.push(none);
      this.observables.push(observable);
    };
    CombineLatestSubscriber.prototype._complete = function () {
      var observables = this.observables;
      var len = observables.length;
      if (len === 0) {
        this.destination.complete();
      } else {
        this.active = len;
        this.toRespond = len;
        for (var i = 0; i < len; i++) {
          var observable = observables[i];
          this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
        }
      }
    };
    CombineLatestSubscriber.prototype.notifyComplete = function (unused) {
      if ((this.active -= 1) === 0) {
        this.destination.complete();
      }
    };
    CombineLatestSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      var values = this.values;
      var oldVal = values[outerIndex];
      var toRespond = !this.toRespond ? 0 : oldVal === none ? --this.toRespond : this.toRespond;
      values[outerIndex] = innerValue;
      if (toRespond === 0) {
        if (this.project) {
          this._tryProject(values);
        } else {
          this.destination.next(values.slice());
        }
      }
    };
    CombineLatestSubscriber.prototype._tryProject = function (values) {
      var result;
      try {
        result = this.project.apply(this, values);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this.destination.next(result);
    };
    return CombineLatestSubscriber;
  }(OuterSubscriber_1.OuterSubscriber);
  exports.CombineLatestSubscriber = CombineLatestSubscriber;
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/combineLatest.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/combineLatest.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var combineLatest_1 = $__require('npm:rxjs@5.2.0/operator/combineLatest.js');
  Observable_1.Observable.prototype.combineLatest = combineLatest_1.combineLatest;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/withLatestFrom.js', ['npm:rxjs@5.2.0/OuterSubscriber.js', 'npm:rxjs@5.2.0/util/subscribeToResult.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var OuterSubscriber_1 = $__require('npm:rxjs@5.2.0/OuterSubscriber.js');
  var subscribeToResult_1 = $__require('npm:rxjs@5.2.0/util/subscribeToResult.js');
  function withLatestFrom() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i - 0] = arguments[_i];
    }
    var project;
    if (typeof args[args.length - 1] === 'function') {
      project = args.pop();
    }
    var observables = args;
    return this.lift(new WithLatestFromOperator(observables, project));
  }
  exports.withLatestFrom = withLatestFrom;
  var WithLatestFromOperator = function () {
    function WithLatestFromOperator(observables, project) {
      this.observables = observables;
      this.project = project;
    }
    WithLatestFromOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new WithLatestFromSubscriber(subscriber, this.observables, this.project));
    };
    return WithLatestFromOperator;
  }();
  var WithLatestFromSubscriber = function (_super) {
    __extends(WithLatestFromSubscriber, _super);
    function WithLatestFromSubscriber(destination, observables, project) {
      _super.call(this, destination);
      this.observables = observables;
      this.project = project;
      this.toRespond = [];
      var len = observables.length;
      this.values = new Array(len);
      for (var i = 0; i < len; i++) {
        this.toRespond.push(i);
      }
      for (var i = 0; i < len; i++) {
        var observable = observables[i];
        this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
      }
    }
    WithLatestFromSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.values[outerIndex] = innerValue;
      var toRespond = this.toRespond;
      if (toRespond.length > 0) {
        var found = toRespond.indexOf(outerIndex);
        if (found !== -1) {
          toRespond.splice(found, 1);
        }
      }
    };
    WithLatestFromSubscriber.prototype.notifyComplete = function () {};
    WithLatestFromSubscriber.prototype._next = function (value) {
      if (this.toRespond.length === 0) {
        var args = [value].concat(this.values);
        if (this.project) {
          this._tryProject(args);
        } else {
          this.destination.next(args);
        }
      }
    };
    WithLatestFromSubscriber.prototype._tryProject = function (args) {
      var result;
      try {
        result = this.project.apply(this, args);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this.destination.next(result);
    };
    return WithLatestFromSubscriber;
  }(OuterSubscriber_1.OuterSubscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/withLatestFrom.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/withLatestFrom.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var withLatestFrom_1 = $__require('npm:rxjs@5.2.0/operator/withLatestFrom.js');
  Observable_1.Observable.prototype.withLatestFrom = withLatestFrom_1.withLatestFrom;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/debounce.js', ['npm:rxjs@5.2.0/OuterSubscriber.js', 'npm:rxjs@5.2.0/util/subscribeToResult.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var OuterSubscriber_1 = $__require('npm:rxjs@5.2.0/OuterSubscriber.js');
  var subscribeToResult_1 = $__require('npm:rxjs@5.2.0/util/subscribeToResult.js');
  function debounce(durationSelector) {
    return this.lift(new DebounceOperator(durationSelector));
  }
  exports.debounce = debounce;
  var DebounceOperator = function () {
    function DebounceOperator(durationSelector) {
      this.durationSelector = durationSelector;
    }
    DebounceOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new DebounceSubscriber(subscriber, this.durationSelector));
    };
    return DebounceOperator;
  }();
  var DebounceSubscriber = function (_super) {
    __extends(DebounceSubscriber, _super);
    function DebounceSubscriber(destination, durationSelector) {
      _super.call(this, destination);
      this.durationSelector = durationSelector;
      this.hasValue = false;
      this.durationSubscription = null;
    }
    DebounceSubscriber.prototype._next = function (value) {
      try {
        var result = this.durationSelector.call(this, value);
        if (result) {
          this._tryNext(value, result);
        }
      } catch (err) {
        this.destination.error(err);
      }
    };
    DebounceSubscriber.prototype._complete = function () {
      this.emitValue();
      this.destination.complete();
    };
    DebounceSubscriber.prototype._tryNext = function (value, duration) {
      var subscription = this.durationSubscription;
      this.value = value;
      this.hasValue = true;
      if (subscription) {
        subscription.unsubscribe();
        this.remove(subscription);
      }
      subscription = subscribeToResult_1.subscribeToResult(this, duration);
      if (!subscription.closed) {
        this.add(this.durationSubscription = subscription);
      }
    };
    DebounceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.emitValue();
    };
    DebounceSubscriber.prototype.notifyComplete = function () {
      this.emitValue();
    };
    DebounceSubscriber.prototype.emitValue = function () {
      if (this.hasValue) {
        var value = this.value;
        var subscription = this.durationSubscription;
        if (subscription) {
          this.durationSubscription = null;
          subscription.unsubscribe();
          this.remove(subscription);
        }
        this.value = null;
        this.hasValue = false;
        _super.prototype._next.call(this, value);
      }
    };
    return DebounceSubscriber;
  }(OuterSubscriber_1.OuterSubscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/debounce.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/debounce.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var debounce_1 = $__require('npm:rxjs@5.2.0/operator/debounce.js');
  Observable_1.Observable.prototype.debounce = debounce_1.debounce;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/sample.js', ['npm:rxjs@5.2.0/OuterSubscriber.js', 'npm:rxjs@5.2.0/util/subscribeToResult.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var OuterSubscriber_1 = $__require('npm:rxjs@5.2.0/OuterSubscriber.js');
  var subscribeToResult_1 = $__require('npm:rxjs@5.2.0/util/subscribeToResult.js');
  function sample(notifier) {
    return this.lift(new SampleOperator(notifier));
  }
  exports.sample = sample;
  var SampleOperator = function () {
    function SampleOperator(notifier) {
      this.notifier = notifier;
    }
    SampleOperator.prototype.call = function (subscriber, source) {
      var sampleSubscriber = new SampleSubscriber(subscriber);
      var subscription = source.subscribe(sampleSubscriber);
      subscription.add(subscribeToResult_1.subscribeToResult(sampleSubscriber, this.notifier));
      return subscription;
    };
    return SampleOperator;
  }();
  var SampleSubscriber = function (_super) {
    __extends(SampleSubscriber, _super);
    function SampleSubscriber() {
      _super.apply(this, arguments);
      this.hasValue = false;
    }
    SampleSubscriber.prototype._next = function (value) {
      this.value = value;
      this.hasValue = true;
    };
    SampleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.emitValue();
    };
    SampleSubscriber.prototype.notifyComplete = function () {
      this.emitValue();
    };
    SampleSubscriber.prototype.emitValue = function () {
      if (this.hasValue) {
        this.hasValue = false;
        this.destination.next(this.value);
      }
    };
    return SampleSubscriber;
  }(OuterSubscriber_1.OuterSubscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/sample.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/sample.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var sample_1 = $__require('npm:rxjs@5.2.0/operator/sample.js');
  Observable_1.Observable.prototype.sample = sample_1.sample;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/delayWhen.js', ['npm:rxjs@5.2.0/Subscriber.js', 'npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/OuterSubscriber.js', 'npm:rxjs@5.2.0/util/subscribeToResult.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('npm:rxjs@5.2.0/Subscriber.js');
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var OuterSubscriber_1 = $__require('npm:rxjs@5.2.0/OuterSubscriber.js');
  var subscribeToResult_1 = $__require('npm:rxjs@5.2.0/util/subscribeToResult.js');
  function delayWhen(delayDurationSelector, subscriptionDelay) {
    if (subscriptionDelay) {
      return new SubscriptionDelayObservable(this, subscriptionDelay).lift(new DelayWhenOperator(delayDurationSelector));
    }
    return this.lift(new DelayWhenOperator(delayDurationSelector));
  }
  exports.delayWhen = delayWhen;
  var DelayWhenOperator = function () {
    function DelayWhenOperator(delayDurationSelector) {
      this.delayDurationSelector = delayDurationSelector;
    }
    DelayWhenOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new DelayWhenSubscriber(subscriber, this.delayDurationSelector));
    };
    return DelayWhenOperator;
  }();
  var DelayWhenSubscriber = function (_super) {
    __extends(DelayWhenSubscriber, _super);
    function DelayWhenSubscriber(destination, delayDurationSelector) {
      _super.call(this, destination);
      this.delayDurationSelector = delayDurationSelector;
      this.completed = false;
      this.delayNotifierSubscriptions = [];
      this.values = [];
    }
    DelayWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.destination.next(outerValue);
      this.removeSubscription(innerSub);
      this.tryComplete();
    };
    DelayWhenSubscriber.prototype.notifyError = function (error, innerSub) {
      this._error(error);
    };
    DelayWhenSubscriber.prototype.notifyComplete = function (innerSub) {
      var value = this.removeSubscription(innerSub);
      if (value) {
        this.destination.next(value);
      }
      this.tryComplete();
    };
    DelayWhenSubscriber.prototype._next = function (value) {
      try {
        var delayNotifier = this.delayDurationSelector(value);
        if (delayNotifier) {
          this.tryDelay(delayNotifier, value);
        }
      } catch (err) {
        this.destination.error(err);
      }
    };
    DelayWhenSubscriber.prototype._complete = function () {
      this.completed = true;
      this.tryComplete();
    };
    DelayWhenSubscriber.prototype.removeSubscription = function (subscription) {
      subscription.unsubscribe();
      var subscriptionIdx = this.delayNotifierSubscriptions.indexOf(subscription);
      var value = null;
      if (subscriptionIdx !== -1) {
        value = this.values[subscriptionIdx];
        this.delayNotifierSubscriptions.splice(subscriptionIdx, 1);
        this.values.splice(subscriptionIdx, 1);
      }
      return value;
    };
    DelayWhenSubscriber.prototype.tryDelay = function (delayNotifier, value) {
      var notifierSubscription = subscribeToResult_1.subscribeToResult(this, delayNotifier, value);
      this.add(notifierSubscription);
      this.delayNotifierSubscriptions.push(notifierSubscription);
      this.values.push(value);
    };
    DelayWhenSubscriber.prototype.tryComplete = function () {
      if (this.completed && this.delayNotifierSubscriptions.length === 0) {
        this.destination.complete();
      }
    };
    return DelayWhenSubscriber;
  }(OuterSubscriber_1.OuterSubscriber);
  var SubscriptionDelayObservable = function (_super) {
    __extends(SubscriptionDelayObservable, _super);
    function SubscriptionDelayObservable(source, subscriptionDelay) {
      _super.call(this);
      this.source = source;
      this.subscriptionDelay = subscriptionDelay;
    }
    SubscriptionDelayObservable.prototype._subscribe = function (subscriber) {
      this.subscriptionDelay.subscribe(new SubscriptionDelaySubscriber(subscriber, this.source));
    };
    return SubscriptionDelayObservable;
  }(Observable_1.Observable);
  var SubscriptionDelaySubscriber = function (_super) {
    __extends(SubscriptionDelaySubscriber, _super);
    function SubscriptionDelaySubscriber(parent, source) {
      _super.call(this);
      this.parent = parent;
      this.source = source;
      this.sourceSubscribed = false;
    }
    SubscriptionDelaySubscriber.prototype._next = function (unused) {
      this.subscribeToSource();
    };
    SubscriptionDelaySubscriber.prototype._error = function (err) {
      this.unsubscribe();
      this.parent.error(err);
    };
    SubscriptionDelaySubscriber.prototype._complete = function () {
      this.subscribeToSource();
    };
    SubscriptionDelaySubscriber.prototype.subscribeToSource = function () {
      if (!this.sourceSubscribed) {
        this.sourceSubscribed = true;
        this.unsubscribe();
        this.source.subscribe(this.parent);
      }
    };
    return SubscriptionDelaySubscriber;
  }(Subscriber_1.Subscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/delayWhen.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/delayWhen.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var delayWhen_1 = $__require('npm:rxjs@5.2.0/operator/delayWhen.js');
  Observable_1.Observable.prototype.delayWhen = delayWhen_1.delayWhen;
});
System.registerDynamic("npm:rxjs@5.2.0/util/Set.js", ["npm:rxjs@5.2.0/util/root.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var root_1 = $__require("npm:rxjs@5.2.0/util/root.js");
  function minimalSetImpl() {
    return function () {
      function MinimalSet() {
        this._values = [];
      }
      MinimalSet.prototype.add = function (value) {
        if (!this.has(value)) {
          this._values.push(value);
        }
      };
      MinimalSet.prototype.has = function (value) {
        return this._values.indexOf(value) !== -1;
      };
      Object.defineProperty(MinimalSet.prototype, "size", {
        get: function () {
          return this._values.length;
        },
        enumerable: true,
        configurable: true
      });
      MinimalSet.prototype.clear = function () {
        this._values.length = 0;
      };
      return MinimalSet;
    }();
  }
  exports.minimalSetImpl = minimalSetImpl;
  exports.Set = root_1.root.Set || minimalSetImpl();
});
System.registerDynamic('npm:rxjs@5.2.0/operator/distinct.js', ['npm:rxjs@5.2.0/OuterSubscriber.js', 'npm:rxjs@5.2.0/util/subscribeToResult.js', 'npm:rxjs@5.2.0/util/Set.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var OuterSubscriber_1 = $__require('npm:rxjs@5.2.0/OuterSubscriber.js');
  var subscribeToResult_1 = $__require('npm:rxjs@5.2.0/util/subscribeToResult.js');
  var Set_1 = $__require('npm:rxjs@5.2.0/util/Set.js');
  function distinct(keySelector, flushes) {
    return this.lift(new DistinctOperator(keySelector, flushes));
  }
  exports.distinct = distinct;
  var DistinctOperator = function () {
    function DistinctOperator(keySelector, flushes) {
      this.keySelector = keySelector;
      this.flushes = flushes;
    }
    DistinctOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new DistinctSubscriber(subscriber, this.keySelector, this.flushes));
    };
    return DistinctOperator;
  }();
  var DistinctSubscriber = function (_super) {
    __extends(DistinctSubscriber, _super);
    function DistinctSubscriber(destination, keySelector, flushes) {
      _super.call(this, destination);
      this.keySelector = keySelector;
      this.values = new Set_1.Set();
      if (flushes) {
        this.add(subscribeToResult_1.subscribeToResult(this, flushes));
      }
    }
    DistinctSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.values.clear();
    };
    DistinctSubscriber.prototype.notifyError = function (error, innerSub) {
      this._error(error);
    };
    DistinctSubscriber.prototype._next = function (value) {
      if (this.keySelector) {
        this._useKeySelector(value);
      } else {
        this._finalizeNext(value, value);
      }
    };
    DistinctSubscriber.prototype._useKeySelector = function (value) {
      var key;
      var destination = this.destination;
      try {
        key = this.keySelector(value);
      } catch (err) {
        destination.error(err);
        return;
      }
      this._finalizeNext(key, value);
    };
    DistinctSubscriber.prototype._finalizeNext = function (key, value) {
      var values = this.values;
      if (!values.has(key)) {
        values.add(key);
        this.destination.next(value);
      }
    };
    return DistinctSubscriber;
  }(OuterSubscriber_1.OuterSubscriber);
  exports.DistinctSubscriber = DistinctSubscriber;
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/distinct.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/distinct.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var distinct_1 = $__require('npm:rxjs@5.2.0/operator/distinct.js');
  Observable_1.Observable.prototype.distinct = distinct_1.distinct;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/repeat.js', ['npm:rxjs@5.2.0/Subscriber.js', 'npm:rxjs@5.2.0/observable/EmptyObservable.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('npm:rxjs@5.2.0/Subscriber.js');
  var EmptyObservable_1 = $__require('npm:rxjs@5.2.0/observable/EmptyObservable.js');
  function repeat(count) {
    if (count === void 0) {
      count = -1;
    }
    if (count === 0) {
      return new EmptyObservable_1.EmptyObservable();
    } else if (count < 0) {
      return this.lift(new RepeatOperator(-1, this));
    } else {
      return this.lift(new RepeatOperator(count - 1, this));
    }
  }
  exports.repeat = repeat;
  var RepeatOperator = function () {
    function RepeatOperator(count, source) {
      this.count = count;
      this.source = source;
    }
    RepeatOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new RepeatSubscriber(subscriber, this.count, this.source));
    };
    return RepeatOperator;
  }();
  var RepeatSubscriber = function (_super) {
    __extends(RepeatSubscriber, _super);
    function RepeatSubscriber(destination, count, source) {
      _super.call(this, destination);
      this.count = count;
      this.source = source;
    }
    RepeatSubscriber.prototype.complete = function () {
      if (!this.isStopped) {
        var _a = this,
            source = _a.source,
            count = _a.count;
        if (count === 0) {
          return _super.prototype.complete.call(this);
        } else if (count > -1) {
          this.count = count - 1;
        }
        source.subscribe(this._unsubscribeAndRecycle());
      }
    };
    return RepeatSubscriber;
  }(Subscriber_1.Subscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/repeat.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/repeat.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var repeat_1 = $__require('npm:rxjs@5.2.0/operator/repeat.js');
  Observable_1.Observable.prototype.repeat = repeat_1.repeat;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/repeatWhen.js', ['npm:rxjs@5.2.0/Subject.js', 'npm:rxjs@5.2.0/util/tryCatch.js', 'npm:rxjs@5.2.0/util/errorObject.js', 'npm:rxjs@5.2.0/OuterSubscriber.js', 'npm:rxjs@5.2.0/util/subscribeToResult.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subject_1 = $__require('npm:rxjs@5.2.0/Subject.js');
  var tryCatch_1 = $__require('npm:rxjs@5.2.0/util/tryCatch.js');
  var errorObject_1 = $__require('npm:rxjs@5.2.0/util/errorObject.js');
  var OuterSubscriber_1 = $__require('npm:rxjs@5.2.0/OuterSubscriber.js');
  var subscribeToResult_1 = $__require('npm:rxjs@5.2.0/util/subscribeToResult.js');
  function repeatWhen(notifier) {
    return this.lift(new RepeatWhenOperator(notifier));
  }
  exports.repeatWhen = repeatWhen;
  var RepeatWhenOperator = function () {
    function RepeatWhenOperator(notifier) {
      this.notifier = notifier;
    }
    RepeatWhenOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new RepeatWhenSubscriber(subscriber, this.notifier, source));
    };
    return RepeatWhenOperator;
  }();
  var RepeatWhenSubscriber = function (_super) {
    __extends(RepeatWhenSubscriber, _super);
    function RepeatWhenSubscriber(destination, notifier, source) {
      _super.call(this, destination);
      this.notifier = notifier;
      this.source = source;
      this.sourceIsBeingSubscribedTo = true;
    }
    RepeatWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.sourceIsBeingSubscribedTo = true;
      this.source.subscribe(this);
    };
    RepeatWhenSubscriber.prototype.notifyComplete = function (innerSub) {
      if (this.sourceIsBeingSubscribedTo === false) {
        return _super.prototype.complete.call(this);
      }
    };
    RepeatWhenSubscriber.prototype.complete = function () {
      this.sourceIsBeingSubscribedTo = false;
      if (!this.isStopped) {
        if (!this.retries) {
          this.subscribeToRetries();
        } else if (this.retriesSubscription.closed) {
          return _super.prototype.complete.call(this);
        }
        this._unsubscribeAndRecycle();
        this.notifications.next();
      }
    };
    RepeatWhenSubscriber.prototype._unsubscribe = function () {
      var _a = this,
          notifications = _a.notifications,
          retriesSubscription = _a.retriesSubscription;
      if (notifications) {
        notifications.unsubscribe();
        this.notifications = null;
      }
      if (retriesSubscription) {
        retriesSubscription.unsubscribe();
        this.retriesSubscription = null;
      }
      this.retries = null;
    };
    RepeatWhenSubscriber.prototype._unsubscribeAndRecycle = function () {
      var _a = this,
          notifications = _a.notifications,
          retries = _a.retries,
          retriesSubscription = _a.retriesSubscription;
      this.notifications = null;
      this.retries = null;
      this.retriesSubscription = null;
      _super.prototype._unsubscribeAndRecycle.call(this);
      this.notifications = notifications;
      this.retries = retries;
      this.retriesSubscription = retriesSubscription;
      return this;
    };
    RepeatWhenSubscriber.prototype.subscribeToRetries = function () {
      this.notifications = new Subject_1.Subject();
      var retries = tryCatch_1.tryCatch(this.notifier)(this.notifications);
      if (retries === errorObject_1.errorObject) {
        return _super.prototype.complete.call(this);
      }
      this.retries = retries;
      this.retriesSubscription = subscribeToResult_1.subscribeToResult(this, retries);
    };
    return RepeatWhenSubscriber;
  }(OuterSubscriber_1.OuterSubscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/repeatWhen.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/repeatWhen.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var repeatWhen_1 = $__require('npm:rxjs@5.2.0/operator/repeatWhen.js');
  Observable_1.Observable.prototype.repeatWhen = repeatWhen_1.repeatWhen;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/window.js', ['npm:rxjs@5.2.0/Subject.js', 'npm:rxjs@5.2.0/OuterSubscriber.js', 'npm:rxjs@5.2.0/util/subscribeToResult.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subject_1 = $__require('npm:rxjs@5.2.0/Subject.js');
  var OuterSubscriber_1 = $__require('npm:rxjs@5.2.0/OuterSubscriber.js');
  var subscribeToResult_1 = $__require('npm:rxjs@5.2.0/util/subscribeToResult.js');
  function window(windowBoundaries) {
    return this.lift(new WindowOperator(windowBoundaries));
  }
  exports.window = window;
  var WindowOperator = function () {
    function WindowOperator(windowBoundaries) {
      this.windowBoundaries = windowBoundaries;
    }
    WindowOperator.prototype.call = function (subscriber, source) {
      var windowSubscriber = new WindowSubscriber(subscriber);
      var sourceSubscription = source.subscribe(windowSubscriber);
      if (!sourceSubscription.closed) {
        windowSubscriber.add(subscribeToResult_1.subscribeToResult(windowSubscriber, this.windowBoundaries));
      }
      return sourceSubscription;
    };
    return WindowOperator;
  }();
  var WindowSubscriber = function (_super) {
    __extends(WindowSubscriber, _super);
    function WindowSubscriber(destination) {
      _super.call(this, destination);
      this.window = new Subject_1.Subject();
      destination.next(this.window);
    }
    WindowSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.openWindow();
    };
    WindowSubscriber.prototype.notifyError = function (error, innerSub) {
      this._error(error);
    };
    WindowSubscriber.prototype.notifyComplete = function (innerSub) {
      this._complete();
    };
    WindowSubscriber.prototype._next = function (value) {
      this.window.next(value);
    };
    WindowSubscriber.prototype._error = function (err) {
      this.window.error(err);
      this.destination.error(err);
    };
    WindowSubscriber.prototype._complete = function () {
      this.window.complete();
      this.destination.complete();
    };
    WindowSubscriber.prototype._unsubscribe = function () {
      this.window = null;
    };
    WindowSubscriber.prototype.openWindow = function () {
      var prevWindow = this.window;
      if (prevWindow) {
        prevWindow.complete();
      }
      var destination = this.destination;
      var newWindow = this.window = new Subject_1.Subject();
      destination.next(newWindow);
    };
    return WindowSubscriber;
  }(OuterSubscriber_1.OuterSubscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/window.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/window.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var window_1 = $__require('npm:rxjs@5.2.0/operator/window.js');
  Observable_1.Observable.prototype.window = window_1.window;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/windowCount.js', ['npm:rxjs@5.2.0/Subscriber.js', 'npm:rxjs@5.2.0/Subject.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('npm:rxjs@5.2.0/Subscriber.js');
  var Subject_1 = $__require('npm:rxjs@5.2.0/Subject.js');
  function windowCount(windowSize, startWindowEvery) {
    if (startWindowEvery === void 0) {
      startWindowEvery = 0;
    }
    return this.lift(new WindowCountOperator(windowSize, startWindowEvery));
  }
  exports.windowCount = windowCount;
  var WindowCountOperator = function () {
    function WindowCountOperator(windowSize, startWindowEvery) {
      this.windowSize = windowSize;
      this.startWindowEvery = startWindowEvery;
    }
    WindowCountOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery));
    };
    return WindowCountOperator;
  }();
  var WindowCountSubscriber = function (_super) {
    __extends(WindowCountSubscriber, _super);
    function WindowCountSubscriber(destination, windowSize, startWindowEvery) {
      _super.call(this, destination);
      this.destination = destination;
      this.windowSize = windowSize;
      this.startWindowEvery = startWindowEvery;
      this.windows = [new Subject_1.Subject()];
      this.count = 0;
      destination.next(this.windows[0]);
    }
    WindowCountSubscriber.prototype._next = function (value) {
      var startWindowEvery = this.startWindowEvery > 0 ? this.startWindowEvery : this.windowSize;
      var destination = this.destination;
      var windowSize = this.windowSize;
      var windows = this.windows;
      var len = windows.length;
      for (var i = 0; i < len && !this.closed; i++) {
        windows[i].next(value);
      }
      var c = this.count - windowSize + 1;
      if (c >= 0 && c % startWindowEvery === 0 && !this.closed) {
        windows.shift().complete();
      }
      if (++this.count % startWindowEvery === 0 && !this.closed) {
        var window_1 = new Subject_1.Subject();
        windows.push(window_1);
        destination.next(window_1);
      }
    };
    WindowCountSubscriber.prototype._error = function (err) {
      var windows = this.windows;
      if (windows) {
        while (windows.length > 0 && !this.closed) {
          windows.shift().error(err);
        }
      }
      this.destination.error(err);
    };
    WindowCountSubscriber.prototype._complete = function () {
      var windows = this.windows;
      if (windows) {
        while (windows.length > 0 && !this.closed) {
          windows.shift().complete();
        }
      }
      this.destination.complete();
    };
    WindowCountSubscriber.prototype._unsubscribe = function () {
      this.count = 0;
      this.windows = null;
    };
    return WindowCountSubscriber;
  }(Subscriber_1.Subscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/windowCount.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/windowCount.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var windowCount_1 = $__require('npm:rxjs@5.2.0/operator/windowCount.js');
  Observable_1.Observable.prototype.windowCount = windowCount_1.windowCount;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/windowWhen.js', ['npm:rxjs@5.2.0/Subject.js', 'npm:rxjs@5.2.0/util/tryCatch.js', 'npm:rxjs@5.2.0/util/errorObject.js', 'npm:rxjs@5.2.0/OuterSubscriber.js', 'npm:rxjs@5.2.0/util/subscribeToResult.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subject_1 = $__require('npm:rxjs@5.2.0/Subject.js');
  var tryCatch_1 = $__require('npm:rxjs@5.2.0/util/tryCatch.js');
  var errorObject_1 = $__require('npm:rxjs@5.2.0/util/errorObject.js');
  var OuterSubscriber_1 = $__require('npm:rxjs@5.2.0/OuterSubscriber.js');
  var subscribeToResult_1 = $__require('npm:rxjs@5.2.0/util/subscribeToResult.js');
  function windowWhen(closingSelector) {
    return this.lift(new WindowOperator(closingSelector));
  }
  exports.windowWhen = windowWhen;
  var WindowOperator = function () {
    function WindowOperator(closingSelector) {
      this.closingSelector = closingSelector;
    }
    WindowOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new WindowSubscriber(subscriber, this.closingSelector));
    };
    return WindowOperator;
  }();
  var WindowSubscriber = function (_super) {
    __extends(WindowSubscriber, _super);
    function WindowSubscriber(destination, closingSelector) {
      _super.call(this, destination);
      this.destination = destination;
      this.closingSelector = closingSelector;
      this.openWindow();
    }
    WindowSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.openWindow(innerSub);
    };
    WindowSubscriber.prototype.notifyError = function (error, innerSub) {
      this._error(error);
    };
    WindowSubscriber.prototype.notifyComplete = function (innerSub) {
      this.openWindow(innerSub);
    };
    WindowSubscriber.prototype._next = function (value) {
      this.window.next(value);
    };
    WindowSubscriber.prototype._error = function (err) {
      this.window.error(err);
      this.destination.error(err);
      this.unsubscribeClosingNotification();
    };
    WindowSubscriber.prototype._complete = function () {
      this.window.complete();
      this.destination.complete();
      this.unsubscribeClosingNotification();
    };
    WindowSubscriber.prototype.unsubscribeClosingNotification = function () {
      if (this.closingNotification) {
        this.closingNotification.unsubscribe();
      }
    };
    WindowSubscriber.prototype.openWindow = function (innerSub) {
      if (innerSub === void 0) {
        innerSub = null;
      }
      if (innerSub) {
        this.remove(innerSub);
        innerSub.unsubscribe();
      }
      var prevWindow = this.window;
      if (prevWindow) {
        prevWindow.complete();
      }
      var window = this.window = new Subject_1.Subject();
      this.destination.next(window);
      var closingNotifier = tryCatch_1.tryCatch(this.closingSelector)();
      if (closingNotifier === errorObject_1.errorObject) {
        var err = errorObject_1.errorObject.e;
        this.destination.error(err);
        this.window.error(err);
      } else {
        this.add(this.closingNotification = subscribeToResult_1.subscribeToResult(this, closingNotifier));
      }
    };
    return WindowSubscriber;
  }(OuterSubscriber_1.OuterSubscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/windowWhen.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/windowWhen.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var windowWhen_1 = $__require('npm:rxjs@5.2.0/operator/windowWhen.js');
  Observable_1.Observable.prototype.windowWhen = windowWhen_1.windowWhen;
});
System.registerDynamic("npm:rxjs@5.2.0/util/MapPolyfill.js", [], true, function ($__require, exports, module) {
    /* */
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var MapPolyfill = function () {
        function MapPolyfill() {
            this.size = 0;
            this._values = [];
            this._keys = [];
        }
        MapPolyfill.prototype.get = function (key) {
            var i = this._keys.indexOf(key);
            return i === -1 ? undefined : this._values[i];
        };
        MapPolyfill.prototype.set = function (key, value) {
            var i = this._keys.indexOf(key);
            if (i === -1) {
                this._keys.push(key);
                this._values.push(value);
                this.size++;
            } else {
                this._values[i] = value;
            }
            return this;
        };
        MapPolyfill.prototype.delete = function (key) {
            var i = this._keys.indexOf(key);
            if (i === -1) {
                return false;
            }
            this._values.splice(i, 1);
            this._keys.splice(i, 1);
            this.size--;
            return true;
        };
        MapPolyfill.prototype.clear = function () {
            this._keys.length = 0;
            this._values.length = 0;
            this.size = 0;
        };
        MapPolyfill.prototype.forEach = function (cb, thisArg) {
            for (var i = 0; i < this.size; i++) {
                cb.call(thisArg, this._values[i], this._keys[i]);
            }
        };
        return MapPolyfill;
    }();
    exports.MapPolyfill = MapPolyfill;
    
});
System.registerDynamic('npm:rxjs@5.2.0/util/Map.js', ['npm:rxjs@5.2.0/util/root.js', 'npm:rxjs@5.2.0/util/MapPolyfill.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var root_1 = $__require('npm:rxjs@5.2.0/util/root.js');
  var MapPolyfill_1 = $__require('npm:rxjs@5.2.0/util/MapPolyfill.js');
  exports.Map = root_1.root.Map || function () {
    return MapPolyfill_1.MapPolyfill;
  }();
});
System.registerDynamic("npm:rxjs@5.2.0/util/FastMap.js", [], true, function ($__require, exports, module) {
    /* */
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var FastMap = function () {
        function FastMap() {
            this.values = {};
        }
        FastMap.prototype.delete = function (key) {
            this.values[key] = null;
            return true;
        };
        FastMap.prototype.set = function (key, value) {
            this.values[key] = value;
            return this;
        };
        FastMap.prototype.get = function (key) {
            return this.values[key];
        };
        FastMap.prototype.forEach = function (cb, thisArg) {
            var values = this.values;
            for (var key in values) {
                if (values.hasOwnProperty(key) && values[key] !== null) {
                    cb.call(thisArg, values[key], key);
                }
            }
        };
        FastMap.prototype.clear = function () {
            this.values = {};
        };
        return FastMap;
    }();
    exports.FastMap = FastMap;
    
});
System.registerDynamic('npm:rxjs@5.2.0/operator/groupBy.js', ['npm:rxjs@5.2.0/Subscriber.js', 'npm:rxjs@5.2.0/Subscription.js', 'npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/Subject.js', 'npm:rxjs@5.2.0/util/Map.js', 'npm:rxjs@5.2.0/util/FastMap.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('npm:rxjs@5.2.0/Subscriber.js');
  var Subscription_1 = $__require('npm:rxjs@5.2.0/Subscription.js');
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var Subject_1 = $__require('npm:rxjs@5.2.0/Subject.js');
  var Map_1 = $__require('npm:rxjs@5.2.0/util/Map.js');
  var FastMap_1 = $__require('npm:rxjs@5.2.0/util/FastMap.js');
  function groupBy(keySelector, elementSelector, durationSelector, subjectSelector) {
    return this.lift(new GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector));
  }
  exports.groupBy = groupBy;
  var GroupByOperator = function () {
    function GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector) {
      this.keySelector = keySelector;
      this.elementSelector = elementSelector;
      this.durationSelector = durationSelector;
      this.subjectSelector = subjectSelector;
    }
    GroupByOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new GroupBySubscriber(subscriber, this.keySelector, this.elementSelector, this.durationSelector, this.subjectSelector));
    };
    return GroupByOperator;
  }();
  var GroupBySubscriber = function (_super) {
    __extends(GroupBySubscriber, _super);
    function GroupBySubscriber(destination, keySelector, elementSelector, durationSelector, subjectSelector) {
      _super.call(this, destination);
      this.keySelector = keySelector;
      this.elementSelector = elementSelector;
      this.durationSelector = durationSelector;
      this.subjectSelector = subjectSelector;
      this.groups = null;
      this.attemptedToUnsubscribe = false;
      this.count = 0;
    }
    GroupBySubscriber.prototype._next = function (value) {
      var key;
      try {
        key = this.keySelector(value);
      } catch (err) {
        this.error(err);
        return;
      }
      this._group(value, key);
    };
    GroupBySubscriber.prototype._group = function (value, key) {
      var groups = this.groups;
      if (!groups) {
        groups = this.groups = typeof key === 'string' ? new FastMap_1.FastMap() : new Map_1.Map();
      }
      var group = groups.get(key);
      var element;
      if (this.elementSelector) {
        try {
          element = this.elementSelector(value);
        } catch (err) {
          this.error(err);
        }
      } else {
        element = value;
      }
      if (!group) {
        group = this.subjectSelector ? this.subjectSelector() : new Subject_1.Subject();
        groups.set(key, group);
        var groupedObservable = new GroupedObservable(key, group, this);
        this.destination.next(groupedObservable);
        if (this.durationSelector) {
          var duration = void 0;
          try {
            duration = this.durationSelector(new GroupedObservable(key, group));
          } catch (err) {
            this.error(err);
            return;
          }
          this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
        }
      }
      if (!group.closed) {
        group.next(element);
      }
    };
    GroupBySubscriber.prototype._error = function (err) {
      var groups = this.groups;
      if (groups) {
        groups.forEach(function (group, key) {
          group.error(err);
        });
        groups.clear();
      }
      this.destination.error(err);
    };
    GroupBySubscriber.prototype._complete = function () {
      var groups = this.groups;
      if (groups) {
        groups.forEach(function (group, key) {
          group.complete();
        });
        groups.clear();
      }
      this.destination.complete();
    };
    GroupBySubscriber.prototype.removeGroup = function (key) {
      this.groups.delete(key);
    };
    GroupBySubscriber.prototype.unsubscribe = function () {
      if (!this.closed) {
        this.attemptedToUnsubscribe = true;
        if (this.count === 0) {
          _super.prototype.unsubscribe.call(this);
        }
      }
    };
    return GroupBySubscriber;
  }(Subscriber_1.Subscriber);
  var GroupDurationSubscriber = function (_super) {
    __extends(GroupDurationSubscriber, _super);
    function GroupDurationSubscriber(key, group, parent) {
      _super.call(this);
      this.key = key;
      this.group = group;
      this.parent = parent;
    }
    GroupDurationSubscriber.prototype._next = function (value) {
      this._complete();
    };
    GroupDurationSubscriber.prototype._error = function (err) {
      var group = this.group;
      if (!group.closed) {
        group.error(err);
      }
      this.parent.removeGroup(this.key);
    };
    GroupDurationSubscriber.prototype._complete = function () {
      var group = this.group;
      if (!group.closed) {
        group.complete();
      }
      this.parent.removeGroup(this.key);
    };
    return GroupDurationSubscriber;
  }(Subscriber_1.Subscriber);
  var GroupedObservable = function (_super) {
    __extends(GroupedObservable, _super);
    function GroupedObservable(key, groupSubject, refCountSubscription) {
      _super.call(this);
      this.key = key;
      this.groupSubject = groupSubject;
      this.refCountSubscription = refCountSubscription;
    }
    GroupedObservable.prototype._subscribe = function (subscriber) {
      var subscription = new Subscription_1.Subscription();
      var _a = this,
          refCountSubscription = _a.refCountSubscription,
          groupSubject = _a.groupSubject;
      if (refCountSubscription && !refCountSubscription.closed) {
        subscription.add(new InnerRefCountSubscription(refCountSubscription));
      }
      subscription.add(groupSubject.subscribe(subscriber));
      return subscription;
    };
    return GroupedObservable;
  }(Observable_1.Observable);
  exports.GroupedObservable = GroupedObservable;
  var InnerRefCountSubscription = function (_super) {
    __extends(InnerRefCountSubscription, _super);
    function InnerRefCountSubscription(parent) {
      _super.call(this);
      this.parent = parent;
      parent.count++;
    }
    InnerRefCountSubscription.prototype.unsubscribe = function () {
      var parent = this.parent;
      if (!parent.closed && !this.closed) {
        _super.prototype.unsubscribe.call(this);
        parent.count -= 1;
        if (parent.count === 0 && parent.attemptedToUnsubscribe) {
          parent.unsubscribe();
        }
      }
    };
    return InnerRefCountSubscription;
  }(Subscription_1.Subscription);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/groupBy.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/groupBy.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var groupBy_1 = $__require('npm:rxjs@5.2.0/operator/groupBy.js');
  Observable_1.Observable.prototype.groupBy = groupBy_1.groupBy;
});
System.registerDynamic("npm:rxjs@5.2.0/operator/isEmpty.js", ["npm:rxjs@5.2.0/Subscriber.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require("npm:rxjs@5.2.0/Subscriber.js");
  function isEmpty() {
    return this.lift(new IsEmptyOperator());
  }
  exports.isEmpty = isEmpty;
  var IsEmptyOperator = function () {
    function IsEmptyOperator() {}
    IsEmptyOperator.prototype.call = function (observer, source) {
      return source.subscribe(new IsEmptySubscriber(observer));
    };
    return IsEmptyOperator;
  }();
  var IsEmptySubscriber = function (_super) {
    __extends(IsEmptySubscriber, _super);
    function IsEmptySubscriber(destination) {
      _super.call(this, destination);
    }
    IsEmptySubscriber.prototype.notifyComplete = function (isEmpty) {
      var destination = this.destination;
      destination.next(isEmpty);
      destination.complete();
    };
    IsEmptySubscriber.prototype._next = function (value) {
      this.notifyComplete(false);
    };
    IsEmptySubscriber.prototype._complete = function () {
      this.notifyComplete(true);
    };
    return IsEmptySubscriber;
  }(Subscriber_1.Subscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/isEmpty.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/isEmpty.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var isEmpty_1 = $__require('npm:rxjs@5.2.0/operator/isEmpty.js');
  Observable_1.Observable.prototype.isEmpty = isEmpty_1.isEmpty;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/ignoreElements.js', ['npm:rxjs@5.2.0/Subscriber.js', 'npm:rxjs@5.2.0/util/noop.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('npm:rxjs@5.2.0/Subscriber.js');
  var noop_1 = $__require('npm:rxjs@5.2.0/util/noop.js');
  function ignoreElements() {
    return this.lift(new IgnoreElementsOperator());
  }
  exports.ignoreElements = ignoreElements;
  ;
  var IgnoreElementsOperator = function () {
    function IgnoreElementsOperator() {}
    IgnoreElementsOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new IgnoreElementsSubscriber(subscriber));
    };
    return IgnoreElementsOperator;
  }();
  var IgnoreElementsSubscriber = function (_super) {
    __extends(IgnoreElementsSubscriber, _super);
    function IgnoreElementsSubscriber() {
      _super.apply(this, arguments);
    }
    IgnoreElementsSubscriber.prototype._next = function (unused) {
      noop_1.noop();
    };
    return IgnoreElementsSubscriber;
  }(Subscriber_1.Subscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/ignoreElements.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/ignoreElements.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var ignoreElements_1 = $__require('npm:rxjs@5.2.0/operator/ignoreElements.js');
  Observable_1.Observable.prototype.ignoreElements = ignoreElements_1.ignoreElements;
});
System.registerDynamic('npm:rxjs@5.2.0/util/EmptyError.js', [], true, function ($__require, exports, module) {
    /* */
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    /**
     * An error thrown when an Observable or a sequence was queried but has no
     * elements.
     *
     * @see {@link first}
     * @see {@link last}
     * @see {@link single}
     *
     * @class EmptyError
     */
    var EmptyError = function (_super) {
        __extends(EmptyError, _super);
        function EmptyError() {
            var err = _super.call(this, 'no elements in sequence');
            this.name = err.name = 'EmptyError';
            this.stack = err.stack;
            this.message = err.message;
        }
        return EmptyError;
    }(Error);
    exports.EmptyError = EmptyError;
    
});
System.registerDynamic('npm:rxjs@5.2.0/operator/single.js', ['npm:rxjs@5.2.0/Subscriber.js', 'npm:rxjs@5.2.0/util/EmptyError.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('npm:rxjs@5.2.0/Subscriber.js');
  var EmptyError_1 = $__require('npm:rxjs@5.2.0/util/EmptyError.js');
  function single(predicate) {
    return this.lift(new SingleOperator(predicate, this));
  }
  exports.single = single;
  var SingleOperator = function () {
    function SingleOperator(predicate, source) {
      this.predicate = predicate;
      this.source = source;
    }
    SingleOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new SingleSubscriber(subscriber, this.predicate, this.source));
    };
    return SingleOperator;
  }();
  var SingleSubscriber = function (_super) {
    __extends(SingleSubscriber, _super);
    function SingleSubscriber(destination, predicate, source) {
      _super.call(this, destination);
      this.predicate = predicate;
      this.source = source;
      this.seenValue = false;
      this.index = 0;
    }
    SingleSubscriber.prototype.applySingleValue = function (value) {
      if (this.seenValue) {
        this.destination.error('Sequence contains more than one element');
      } else {
        this.seenValue = true;
        this.singleValue = value;
      }
    };
    SingleSubscriber.prototype._next = function (value) {
      var index = this.index++;
      if (this.predicate) {
        this.tryNext(value, index);
      } else {
        this.applySingleValue(value);
      }
    };
    SingleSubscriber.prototype.tryNext = function (value, index) {
      try {
        if (this.predicate(value, index, this.source)) {
          this.applySingleValue(value);
        }
      } catch (err) {
        this.destination.error(err);
      }
    };
    SingleSubscriber.prototype._complete = function () {
      var destination = this.destination;
      if (this.index > 0) {
        destination.next(this.seenValue ? this.singleValue : undefined);
        destination.complete();
      } else {
        destination.error(new EmptyError_1.EmptyError());
      }
    };
    return SingleSubscriber;
  }(Subscriber_1.Subscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/single.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/single.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var single_1 = $__require('npm:rxjs@5.2.0/operator/single.js');
  Observable_1.Observable.prototype.single = single_1.single;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/race.js', ['npm:rxjs@5.2.0/util/isArray.js', 'npm:rxjs@5.2.0/observable/ArrayObservable.js', 'npm:rxjs@5.2.0/OuterSubscriber.js', 'npm:rxjs@5.2.0/util/subscribeToResult.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var isArray_1 = $__require('npm:rxjs@5.2.0/util/isArray.js');
  var ArrayObservable_1 = $__require('npm:rxjs@5.2.0/observable/ArrayObservable.js');
  var OuterSubscriber_1 = $__require('npm:rxjs@5.2.0/OuterSubscriber.js');
  var subscribeToResult_1 = $__require('npm:rxjs@5.2.0/util/subscribeToResult.js');
  function race() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
      observables = observables[0];
    }
    return this.lift.call(raceStatic.apply(void 0, [this].concat(observables)));
  }
  exports.race = race;
  function raceStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    if (observables.length === 1) {
      if (isArray_1.isArray(observables[0])) {
        observables = observables[0];
      } else {
        return observables[0];
      }
    }
    return new ArrayObservable_1.ArrayObservable(observables).lift(new RaceOperator());
  }
  exports.raceStatic = raceStatic;
  var RaceOperator = function () {
    function RaceOperator() {}
    RaceOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new RaceSubscriber(subscriber));
    };
    return RaceOperator;
  }();
  exports.RaceOperator = RaceOperator;
  var RaceSubscriber = function (_super) {
    __extends(RaceSubscriber, _super);
    function RaceSubscriber(destination) {
      _super.call(this, destination);
      this.hasFirst = false;
      this.observables = [];
      this.subscriptions = [];
    }
    RaceSubscriber.prototype._next = function (observable) {
      this.observables.push(observable);
    };
    RaceSubscriber.prototype._complete = function () {
      var observables = this.observables;
      var len = observables.length;
      if (len === 0) {
        this.destination.complete();
      } else {
        for (var i = 0; i < len && !this.hasFirst; i++) {
          var observable = observables[i];
          var subscription = subscribeToResult_1.subscribeToResult(this, observable, observable, i);
          if (this.subscriptions) {
            this.subscriptions.push(subscription);
          }
          this.add(subscription);
        }
        this.observables = null;
      }
    };
    RaceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      if (!this.hasFirst) {
        this.hasFirst = true;
        for (var i = 0; i < this.subscriptions.length; i++) {
          if (i !== outerIndex) {
            var subscription = this.subscriptions[i];
            subscription.unsubscribe();
            this.remove(subscription);
          }
        }
        this.subscriptions = null;
      }
      this.destination.next(innerValue);
    };
    return RaceSubscriber;
  }(OuterSubscriber_1.OuterSubscriber);
  exports.RaceSubscriber = RaceSubscriber;
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/race.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/race.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var race_1 = $__require('npm:rxjs@5.2.0/operator/race.js');
  Observable_1.Observable.prototype.race = race_1.race;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/timeoutWith.js', ['npm:rxjs@5.2.0/scheduler/async.js', 'npm:rxjs@5.2.0/util/isDate.js', 'npm:rxjs@5.2.0/OuterSubscriber.js', 'npm:rxjs@5.2.0/util/subscribeToResult.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var async_1 = $__require('npm:rxjs@5.2.0/scheduler/async.js');
  var isDate_1 = $__require('npm:rxjs@5.2.0/util/isDate.js');
  var OuterSubscriber_1 = $__require('npm:rxjs@5.2.0/OuterSubscriber.js');
  var subscribeToResult_1 = $__require('npm:rxjs@5.2.0/util/subscribeToResult.js');
  function timeoutWith(due, withObservable, scheduler) {
    if (scheduler === void 0) {
      scheduler = async_1.async;
    }
    var absoluteTimeout = isDate_1.isDate(due);
    var waitFor = absoluteTimeout ? +due - scheduler.now() : Math.abs(due);
    return this.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
  }
  exports.timeoutWith = timeoutWith;
  var TimeoutWithOperator = function () {
    function TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler) {
      this.waitFor = waitFor;
      this.absoluteTimeout = absoluteTimeout;
      this.withObservable = withObservable;
      this.scheduler = scheduler;
    }
    TimeoutWithOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new TimeoutWithSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler));
    };
    return TimeoutWithOperator;
  }();
  var TimeoutWithSubscriber = function (_super) {
    __extends(TimeoutWithSubscriber, _super);
    function TimeoutWithSubscriber(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
      _super.call(this);
      this.destination = destination;
      this.absoluteTimeout = absoluteTimeout;
      this.waitFor = waitFor;
      this.withObservable = withObservable;
      this.scheduler = scheduler;
      this.timeoutSubscription = undefined;
      this.index = 0;
      this._previousIndex = 0;
      this._hasCompleted = false;
      destination.add(this);
      this.scheduleTimeout();
    }
    Object.defineProperty(TimeoutWithSubscriber.prototype, "previousIndex", {
      get: function () {
        return this._previousIndex;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(TimeoutWithSubscriber.prototype, "hasCompleted", {
      get: function () {
        return this._hasCompleted;
      },
      enumerable: true,
      configurable: true
    });
    TimeoutWithSubscriber.dispatchTimeout = function (state) {
      var source = state.subscriber;
      var currentIndex = state.index;
      if (!source.hasCompleted && source.previousIndex === currentIndex) {
        source.handleTimeout();
      }
    };
    TimeoutWithSubscriber.prototype.scheduleTimeout = function () {
      var currentIndex = this.index;
      var timeoutState = {
        subscriber: this,
        index: currentIndex
      };
      this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, timeoutState);
      this.index++;
      this._previousIndex = currentIndex;
    };
    TimeoutWithSubscriber.prototype._next = function (value) {
      this.destination.next(value);
      if (!this.absoluteTimeout) {
        this.scheduleTimeout();
      }
    };
    TimeoutWithSubscriber.prototype._error = function (err) {
      this.destination.error(err);
      this._hasCompleted = true;
    };
    TimeoutWithSubscriber.prototype._complete = function () {
      this.destination.complete();
      this._hasCompleted = true;
    };
    TimeoutWithSubscriber.prototype.handleTimeout = function () {
      if (!this.closed) {
        var withObservable = this.withObservable;
        this.unsubscribe();
        this.destination.add(this.timeoutSubscription = subscribeToResult_1.subscribeToResult(this, withObservable));
      }
    };
    return TimeoutWithSubscriber;
  }(OuterSubscriber_1.OuterSubscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/timeoutWith.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/timeoutWith.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var timeoutWith_1 = $__require('npm:rxjs@5.2.0/operator/timeoutWith.js');
  Observable_1.Observable.prototype.timeoutWith = timeoutWith_1.timeoutWith;
});
System.registerDynamic("src-reactive/app/operator.js", ["src-reactive/app/helper.js", "npm:rxjs@5.2.0/Observable.js", "npm:rxjs@5.2.0/add/observable/of.js", "npm:rxjs@5.2.0/add/observable/interval.js", "npm:rxjs@5.2.0/add/observable/timer.js", "npm:rxjs@5.2.0/add/observable/empty.js", "npm:rxjs@5.2.0/add/observable/throw.js", "npm:rxjs@5.2.0/add/observable/concat.js", "npm:rxjs@5.2.0/add/observable/defer.js", "npm:rxjs@5.2.0/add/operator/pluck.js", "npm:rxjs@5.2.0/add/operator/delay.js", "npm:rxjs@5.2.0/add/operator/timeInterval.js", "npm:rxjs@5.2.0/add/operator/mergeMap.js", "npm:rxjs@5.2.0/add/operator/mergeMapTo.js", "npm:rxjs@5.2.0/add/operator/concatMap.js", "npm:rxjs@5.2.0/add/operator/concatMapTo.js", "npm:rxjs@5.2.0/add/operator/merge.js", "npm:rxjs@5.2.0/add/operator/buffer.js", "npm:rxjs@5.2.0/add/operator/bufferCount.js", "npm:rxjs@5.2.0/add/operator/bufferWhen.js", "npm:rxjs@5.2.0/add/operator/bufferToggle.js", "npm:rxjs@5.2.0/add/operator/pairwise.js", "npm:rxjs@5.2.0/add/operator/take.js", "npm:rxjs@5.2.0/add/operator/partition.js", "npm:rxjs@5.2.0/add/operator/mapTo.js", "npm:rxjs@5.2.0/add/operator/expand.js", "npm:rxjs@5.2.0/add/operator/combineLatest.js", "npm:rxjs@5.2.0/add/operator/withLatestFrom.js", "npm:rxjs@5.2.0/add/operator/audit.js", "npm:rxjs@5.2.0/add/operator/debounce.js", "npm:rxjs@5.2.0/add/operator/sample.js", "npm:rxjs@5.2.0/add/operator/delayWhen.js", "npm:rxjs@5.2.0/add/operator/distinct.js", "npm:rxjs@5.2.0/add/operator/repeat.js", "npm:rxjs@5.2.0/add/operator/repeatWhen.js", "npm:rxjs@5.2.0/add/operator/multicast.js", "npm:rxjs@5.2.0/add/operator/window.js", "npm:rxjs@5.2.0/add/operator/windowCount.js", "npm:rxjs@5.2.0/add/operator/windowWhen.js", "npm:rxjs@5.2.0/add/operator/groupBy.js", "npm:rxjs@5.2.0/add/operator/isEmpty.js", "npm:rxjs@5.2.0/add/operator/ignoreElements.js", "npm:rxjs@5.2.0/add/operator/single.js", "npm:rxjs@5.2.0/add/operator/race.js", "npm:rxjs@5.2.0/add/operator/timeoutWith.js"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    var helper_1 = $__require("src-reactive/app/helper.js");
    var Observable_1 = $__require("npm:rxjs@5.2.0/Observable.js");
    $__require("npm:rxjs@5.2.0/add/observable/of.js");
    $__require("npm:rxjs@5.2.0/add/observable/interval.js");
    $__require("npm:rxjs@5.2.0/add/observable/timer.js");
    $__require("npm:rxjs@5.2.0/add/observable/empty.js");
    $__require("npm:rxjs@5.2.0/add/observable/throw.js");
    $__require("npm:rxjs@5.2.0/add/observable/concat.js");
    $__require("npm:rxjs@5.2.0/add/observable/defer.js");
    $__require("npm:rxjs@5.2.0/add/operator/pluck.js");
    $__require("npm:rxjs@5.2.0/add/operator/delay.js");
    $__require("npm:rxjs@5.2.0/add/operator/timeInterval.js");
    $__require("npm:rxjs@5.2.0/add/operator/mergeMap.js"); // flatMap
    $__require("npm:rxjs@5.2.0/add/operator/mergeMapTo.js"); // flatMap
    $__require("npm:rxjs@5.2.0/add/operator/concatMap.js");
    $__require("npm:rxjs@5.2.0/add/operator/concatMapTo.js");
    $__require("npm:rxjs@5.2.0/add/operator/merge.js");
    $__require("npm:rxjs@5.2.0/add/operator/buffer.js");
    $__require("npm:rxjs@5.2.0/add/operator/bufferCount.js");
    $__require("npm:rxjs@5.2.0/add/operator/bufferWhen.js");
    $__require("npm:rxjs@5.2.0/add/operator/bufferToggle.js");
    $__require("npm:rxjs@5.2.0/add/operator/pairwise.js");
    $__require("npm:rxjs@5.2.0/add/operator/take.js");
    $__require("npm:rxjs@5.2.0/add/operator/partition.js");
    $__require("npm:rxjs@5.2.0/add/operator/mapTo.js");
    $__require("npm:rxjs@5.2.0/add/operator/expand.js");
    $__require("npm:rxjs@5.2.0/add/operator/combineLatest.js");
    $__require("npm:rxjs@5.2.0/add/operator/withLatestFrom.js");
    $__require("npm:rxjs@5.2.0/add/operator/audit.js");
    $__require("npm:rxjs@5.2.0/add/operator/debounce.js");
    $__require("npm:rxjs@5.2.0/add/operator/sample.js");
    $__require("npm:rxjs@5.2.0/add/operator/delayWhen.js");
    $__require("npm:rxjs@5.2.0/add/operator/distinct.js");
    $__require("npm:rxjs@5.2.0/add/operator/repeat.js");
    $__require("npm:rxjs@5.2.0/add/operator/repeatWhen.js");
    $__require("npm:rxjs@5.2.0/add/operator/multicast.js");
    $__require("npm:rxjs@5.2.0/add/operator/window.js");
    $__require("npm:rxjs@5.2.0/add/operator/windowCount.js");
    $__require("npm:rxjs@5.2.0/add/operator/windowWhen.js");
    $__require("npm:rxjs@5.2.0/add/operator/groupBy.js");
    $__require("npm:rxjs@5.2.0/add/operator/isEmpty.js");
    $__require("npm:rxjs@5.2.0/add/operator/ignoreElements.js");
    $__require("npm:rxjs@5.2.0/add/operator/single.js");
    $__require("npm:rxjs@5.2.0/add/operator/race.js");
    $__require("npm:rxjs@5.2.0/add/operator/timeoutWith.js");
    function testPluck(testButton, placeholder) {
        Observable_1.Observable.from([{ name: { first: 'jaein', last: 'moon' } }, { name: { first: 'cheolsu', last: 'ahn' } }, { name: { first: 'sangjeong', last: 'shim' } }]).pluck('name', 'first').subscribe(helper_1.simpleObserver('pluck'));
    }
    exports.testPluck = testPluck;
    function testMergeMap(testButton, placeholder) {
        Observable_1.Observable.interval(100).timeInterval().take(2).map(function (mainInterval) {
            return mainInterval.value;
        }).mergeMap(function (mainIndex) {
            return Observable_1.Observable.interval(1000).timeInterval().take(2).map(function (subInterval) {
                return {
                    main: mainIndex,
                    sub: subInterval.value
                };
            });
        }).subscribe(function (indexGroup) {
            return console.log(indexGroup.main + "/" + indexGroup.sub);
        });
    }
    exports.testMergeMap = testMergeMap;
    function testConcatMap(testButton, placeholder) {
        Observable_1.Observable.interval(100).timeInterval().take(2).map(function (mainInterval) {
            return mainInterval.value;
        }).concatMap(function (mainIndex) {
            return Observable_1.Observable.interval(1000).timeInterval().take(2).map(function (subInterval) {
                return {
                    main: mainIndex,
                    sub: subInterval.value
                };
            });
        }).subscribe(function (indexGroup) {
            return console.log(indexGroup.main + "/" + indexGroup.sub);
        });
    }
    exports.testConcatMap = testConcatMap;
    function testExpand(testButton, placeholder) {
        var button = helper_1.buttonForTest('1,,,2,,,4,,,', placeholder);
        var clicks = Observable_1.Observable.fromEvent(button, 'click');
        var powersOfTwo = clicks.map(function (value, index) {
            return [index, 1];
        }).expand(function (_a) {
            var index = _a[0],
                value = _a[1];
            console.log('expand called');
            return Observable_1.Observable.of([index, 2 * value]).filter(function (_a) {
                var index = _a[0],
                    value = _a[1];
                return value < 1024;
            }).delay(500);
        });
        powersOfTwo.subscribe(function (_a) {
            var index = _a[0],
                value = _a[1];
            return console.log(index + " - " + value);
        });
    }
    exports.testExpand = testExpand;
    function testMerge(testButton, placeholder) {
        var key1Button = helper_1.buttonForTest('1', placeholder);
        var key1 = Observable_1.Observable.fromEvent(key1Button, 'click').mapTo(1);
        var key2Button = helper_1.buttonForTest('2', placeholder);
        var key2 = Observable_1.Observable.fromEvent(key2Button, 'click').mapTo(2);
        var key3Button = helper_1.buttonForTest('3', placeholder);
        var key3 = Observable_1.Observable.fromEvent(key3Button, 'click').mapTo(3);
        // key1.merge<number, number>([key2, key3])
        key1.merge(key2, key3).scan(function (sum, current) {
            return sum * 10 + current;
        }, 0).subscribe(helper_1.simpleObserver('merge'));
    }
    exports.testMerge = testMerge;
    function testBuffer(testButton, placeholder) {
        var button = helper_1.buttonForTest('emit when down', placeholder);
        var down = Observable_1.Observable.fromEvent(button, 'mousedown');
        Observable_1.Observable.interval(200).buffer(down).subscribe(helper_1.simpleObserver('buffer'));
    }
    exports.testBuffer = testBuffer;
    function testBufferWhen(testButton, placeholder) {
        var button = helper_1.buttonForTest('emit when down', placeholder);
        var down = Observable_1.Observable.fromEvent(button, 'mousedown');
        Observable_1.Observable.interval(200).bufferWhen(function () {
            return down;
        }).subscribe(helper_1.simpleObserver('bufferWhen'));
    }
    exports.testBufferWhen = testBufferWhen;
    function testBufferToggle(testButton, placeholder) {
        var button = helper_1.buttonForTest('from mousedown to mouseup', placeholder);
        var down = Observable_1.Observable.fromEvent(button, 'mousedown');
        var up = Observable_1.Observable.fromEvent(button, 'mouseup');
        Observable_1.Observable.interval(200).bufferToggle(down, function () {
            return up;
        }).subscribe(helper_1.simpleObserver('bufferToggle'));
    }
    exports.testBufferToggle = testBufferToggle;
    function testPairwise(testButton, placeholder) {
        var series = Observable_1.Observable.of(1, 3, 5, 7, 9);
        series.bufferCount(2, 1).subscribe(function (value) {
            console.log("bufferCount(2,1): " + value[1] + " - " + value[0] + " = " + (value[1] - value[0]));
        });
        series.pairwise().subscribe(function (value) {
            console.log("pairwise:         " + value[1] + " - " + value[0] + " = " + (value[1] - value[0]));
        });
    }
    exports.testPairwise = testPairwise;
    function testPartition(testButton, placeholder) {
        var button = helper_1.buttonForTest('down to left, up to right', placeholder);
        var _a = Observable_1.Observable.interval(200).take(10).partition(function (value) {
            return value % 2 == 0 ? true : false;
        }),
            even = _a[0],
            odd = _a[1];
        even.subscribe(helper_1.simpleObserver('even'));
        odd.subscribe(helper_1.simpleObserver('odd'));
    }
    exports.testPartition = testPartition;
    function testCombineLatest(testButton, placeholder) {
        var input1 = helper_1.inputForTest('left trigger', placeholder);
        var input2 = helper_1.inputForTest('right trigger', placeholder);
        var inputOb1 = Observable_1.Observable.fromEvent(input1, 'input').map(function (ev) {
            return ev.target.value;
        });
        var inputOb2 = Observable_1.Observable.fromEvent(input2, 'input').map(function (ev) {
            return ev.target.value;
        });
        inputOb1.combineLatest(inputOb2, function (left, right) {
            return left + " + " + right;
        }).subscribe(helper_1.simpleObserver('combineLates'));
    }
    exports.testCombineLatest = testCombineLatest;
    function testWithLatestFrom(testButton, placeholder) {
        var input1 = helper_1.inputForTest('left only trigger', placeholder);
        var input2 = helper_1.inputForTest('right', placeholder);
        var inputOb1 = Observable_1.Observable.fromEvent(input1, 'input').map(function (ev) {
            return ev.target.value;
        });
        var inputOb2 = Observable_1.Observable.fromEvent(input2, 'input').map(function (ev) {
            return ev.target.value;
        });
        inputOb1.withLatestFrom(inputOb2, function (left, right) {
            return left + " + " + right;
        }).subscribe(function (value) {
            return console.log(value);
        });
    }
    exports.testWithLatestFrom = testWithLatestFrom;
    function testRace(testButton, placeholder) {
        var input1 = helper_1.inputForTest('left trigger', placeholder);
        var input2 = helper_1.inputForTest('right trigger', placeholder);
        var inputOb1 = Observable_1.Observable.fromEvent(input1, 'input').do(function (ev) {
            console.log('input1 to map');
        }).map(function (ev) {
            return ev.target.value;
        });
        var inputOb2 = Observable_1.Observable.fromEvent(input2, 'input').do(function (ev) {
            console.log('input2 to map');
        }).map(function (ev) {
            return ev.target.value;
        });
        inputOb1.race(inputOb2).subscribe(helper_1.simpleObserver('winner takes all'));
    }
    exports.testRace = testRace;
    function testDebounce(testButton, placeholder) {
        var button = helper_1.buttonForTest('emit last value', placeholder);
        var down = Observable_1.Observable.fromEvent(button, 'mousedown'); //.take(3);
        Observable_1.Observable.interval(1000).debounce(function (value) {
            console.log('debounce called');
            return down;
        }).subscribe(helper_1.simpleObserver('debounce'));
        Observable_1.Observable.interval(1000).audit(function (value) {
            console.log('new audit called');
            return down;
        }).subscribe(helper_1.simpleObserver('audit'));
        Observable_1.Observable.interval(1000).sample(down).subscribe(helper_1.simpleObserver('sample'));
        // main time line completed by down completition
        Observable_1.Observable.interval(1000).buffer(down).concatMap(function (numbers) {
            return numbers.length > 0 ? Observable_1.Observable.of(numbers[numbers.length - 1]) : Observable_1.Observable.empty();
        }).subscribe(helper_1.simpleObserver('buffer and last'));
    }
    exports.testDebounce = testDebounce;
    function testDelayWhen(testButton, placeholder) {
        var button = helper_1.buttonForTest('emit when down', placeholder);
        var down = Observable_1.Observable.fromEvent(button, 'mousedown');
        var delayedClicks = down.delayWhen(function (event) {
            console.log('duration selector called');
            //return Observable.interval(1000); // first event only is used
            return Observable_1.Observable.timer(1000);
        });
        delayedClicks.subscribe(helper_1.simpleObserver('delayWhen'));
    }
    exports.testDelayWhen = testDelayWhen;
    function testDistinct(testButton, placeholder) {
        Observable_1.Observable.of(1, 2, 1, 2, 1, 2).distinct().subscribe(helper_1.simpleObserver('distinct'));
    }
    exports.testDistinct = testDistinct;
    function testRepeat(testButton, placeholder) {
        var source = Observable_1.Observable.defer(function () {
            var delay = Math.floor(Math.random() * 400 + 100);
            console.log("defer called: delay = " + delay);
            return Observable_1.Observable.interval(delay).take(3);
        });
        source.repeat(3).subscribe(helper_1.simpleObserver('repeat'));
    }
    exports.testRepeat = testRepeat;
    function testRepeatWhen1(testButton, placeholder) {
        var button = helper_1.buttonForTest('resubscribe after source completed', placeholder);
        var down = Observable_1.Observable.fromEvent(button, 'mousedown').take(3);
        var source = Observable_1.Observable.defer(function () {
            var delay = Math.floor(Math.random() * 400 + 100);
            console.log("defer called: delay = " + delay);
            return Observable_1.Observable.interval(delay).take(3);
        });
        source.repeatWhen(function (notification) {
            console.log('notification:');
            console.log(notification);
            return down;
        }).subscribe(helper_1.simpleObserver('repeatWhen'));
    }
    exports.testRepeatWhen1 = testRepeatWhen1;
    function testRepeatWhen2(testButton, placeholder) {
        var button = helper_1.buttonForTest('resubscribe after source completed', placeholder);
        var down = Observable_1.Observable.fromEvent(button, 'mousedown').take(3);
        var source = Observable_1.Observable.concat(Observable_1.Observable.interval(500).take(3), Observable_1.Observable.throw('throw'));
        source.repeatWhen(function (notification) {
            console.log('notification:');
            console.log(notification);
            return down;
        }).subscribe(helper_1.simpleObserver('repeatWhen'));
    }
    exports.testRepeatWhen2 = testRepeatWhen2;
    function testWindow(testButton, placeholder) {
        var button = helper_1.buttonForTest('new window', placeholder);
        var down = Observable_1.Observable.fromEvent(button, 'mousedown').take(3);
        var source = Observable_1.Observable.interval(300);
        var windowed = source.window(down).mergeMap(function (value) {
            console.log('new Window');
            return value;
        });
        // .mergeAll();
        windowed.subscribe(helper_1.simpleObserver('window'));
    }
    exports.testWindow = testWindow;
    function testWindowWhen(testButton, placeholder) {
        var button = helper_1.buttonForTest('new window', placeholder);
        var down = Observable_1.Observable.fromEvent(button, 'mousedown').take(3);
        var source = Observable_1.Observable.interval(300);
        var windowed = source.windowWhen(function () {
            console.log('when close?');
            return down.take(1);
            // return down
        }).mergeMap(function (value) {
            console.log('new window');
            return value;
        });
        // .mergeAll();
        windowed.subscribe(helper_1.simpleObserver('window'));
    }
    exports.testWindowWhen = testWindowWhen;
    function testWindowCount1(testButton, placeholder) {
        var source = Observable_1.Observable.interval(300).take(10);
        var windowed = source.windowCount(5, 3).do(function (value) {
            return console.log('new window');
        }).mergeAll();
        // .mergeAll();
        windowed.subscribe(helper_1.simpleObserver('window'));
    }
    exports.testWindowCount1 = testWindowCount1;
    function testWindowCount2(testButton, placeholder) {
        var source = Observable_1.Observable.interval(300).take(10);
        var windowed = source.windowCount(3, 5).do(function (value) {
            return console.log('new window');
        }).mergeAll();
        // .mergeAll();
        windowed.subscribe(helper_1.simpleObserver('window'));
    }
    exports.testWindowCount2 = testWindowCount2;
    function testGroupBy(testButton, placeholder) {
        var source = Observable_1.Observable.interval(300).take(10);
        var grouped = source.groupBy(function (value) {
            return value % 3;
        }).map(function (value) {
            console.log("new grourp key = " + value.key);
            return value.take(2).map(function (innerValue) {
                return value.key + " / " + innerValue;
            });
        }).mergeAll();
        // .mergeAll();
        grouped.subscribe(helper_1.simpleObserver('groupBy'));
    }
    exports.testGroupBy = testGroupBy;
    function testIgnoreElements(testButton, placeholder) {
        var source = Observable_1.Observable.interval(300).take(3);
        var end = source.do(function (value) {
            return console.log("interval[" + value + "]");
        }).ignoreElements().isEmpty();
        end.subscribe(helper_1.simpleObserver('isEmpty'));
    }
    exports.testIgnoreElements = testIgnoreElements;
    function testSingle(testButton, placeholder) {
        var button1 = helper_1.buttonForTest('source', placeholder);
        var down = Observable_1.Observable.fromEvent(button1, 'mousedown');
        var button2 = helper_1.buttonForTest('complete', placeholder);
        var complete = Observable_1.Observable.fromEvent(button2, 'mousedown');
        var single = down.takeUntil(complete).single();
        single.subscribe(helper_1.simpleObserver('single'));
    }
    exports.testSingle = testSingle;
    function testTimeoutWith(testButton, placeholder) {
        var timeout = Observable_1.Observable.of(100).delay(2000).timeoutWith(1000, Observable_1.Observable.of(42)).subscribe(helper_1.simpleObserver('timeout'));
    }
    exports.testTimeoutWith = testTimeoutWith;
    function testRepeat2(testButton, placeholder) {
        var button1 = helper_1.buttonForTest('click', placeholder);
        var down = Observable_1.Observable.fromEvent(button1, 'mousedown');
        var merge = down.mergeMap(function (key) {
            var keyOb = Observable_1.Observable.of(key);
            var timeout = Observable_1.Observable.timer(1000).mergeMapTo(Observable_1.Observable.of(42).repeat(2)).takeUntil(down);
            return Observable_1.Observable.merge(keyOb, timeout);
        });
        merge.subscribe(helper_1.simpleObserver('repeat2'));
    }
    exports.testRepeat2 = testRepeat2;
});
System.registerDynamic("npm:rxjs@5.2.0/operator/filter.js", ["npm:rxjs@5.2.0/Subscriber.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require("npm:rxjs@5.2.0/Subscriber.js");
  function filter(predicate, thisArg) {
    return this.lift(new FilterOperator(predicate, thisArg));
  }
  exports.filter = filter;
  var FilterOperator = function () {
    function FilterOperator(predicate, thisArg) {
      this.predicate = predicate;
      this.thisArg = thisArg;
    }
    FilterOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
    };
    return FilterOperator;
  }();
  var FilterSubscriber = function (_super) {
    __extends(FilterSubscriber, _super);
    function FilterSubscriber(destination, predicate, thisArg) {
      _super.call(this, destination);
      this.predicate = predicate;
      this.thisArg = thisArg;
      this.count = 0;
      this.predicate = predicate;
    }
    FilterSubscriber.prototype._next = function (value) {
      var result;
      try {
        result = this.predicate.call(this.thisArg, value, this.count++);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      if (result) {
        this.destination.next(value);
      }
    };
    return FilterSubscriber;
  }(Subscriber_1.Subscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/filter.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/filter.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var filter_1 = $__require('npm:rxjs@5.2.0/operator/filter.js');
  Observable_1.Observable.prototype.filter = filter_1.filter;
});
System.registerDynamic("npm:rxjs@5.2.0/operator/concatAll.js", ["npm:rxjs@5.2.0/operator/mergeAll.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var mergeAll_1 = $__require("npm:rxjs@5.2.0/operator/mergeAll.js");
  function concatAll() {
    return this.lift(new mergeAll_1.MergeAllOperator(1));
  }
  exports.concatAll = concatAll;
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/concatAll.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/concatAll.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var concatAll_1 = $__require('npm:rxjs@5.2.0/operator/concatAll.js');
  Observable_1.Observable.prototype.concatAll = concatAll_1.concatAll;
});
System.registerDynamic("npm:rxjs@5.2.0/operator/concatMap.js", ["npm:rxjs@5.2.0/operator/mergeMap.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var mergeMap_1 = $__require("npm:rxjs@5.2.0/operator/mergeMap.js");
  function concatMap(project, resultSelector) {
    return this.lift(new mergeMap_1.MergeMapOperator(project, resultSelector, 1));
  }
  exports.concatMap = concatMap;
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/concatMap.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/concatMap.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var concatMap_1 = $__require('npm:rxjs@5.2.0/operator/concatMap.js');
  Observable_1.Observable.prototype.concatMap = concatMap_1.concatMap;
});
System.registerDynamic("npm:rxjs@5.2.0/operator/reduce.js", ["npm:rxjs@5.2.0/Subscriber.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require("npm:rxjs@5.2.0/Subscriber.js");
  function reduce(accumulator, seed) {
    var hasSeed = false;
    if (arguments.length >= 2) {
      hasSeed = true;
    }
    return this.lift(new ReduceOperator(accumulator, seed, hasSeed));
  }
  exports.reduce = reduce;
  var ReduceOperator = function () {
    function ReduceOperator(accumulator, seed, hasSeed) {
      if (hasSeed === void 0) {
        hasSeed = false;
      }
      this.accumulator = accumulator;
      this.seed = seed;
      this.hasSeed = hasSeed;
    }
    ReduceOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new ReduceSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
    };
    return ReduceOperator;
  }();
  exports.ReduceOperator = ReduceOperator;
  var ReduceSubscriber = function (_super) {
    __extends(ReduceSubscriber, _super);
    function ReduceSubscriber(destination, accumulator, seed, hasSeed) {
      _super.call(this, destination);
      this.accumulator = accumulator;
      this.hasSeed = hasSeed;
      this.index = 0;
      this.hasValue = false;
      this.acc = seed;
      if (!this.hasSeed) {
        this.index++;
      }
    }
    ReduceSubscriber.prototype._next = function (value) {
      if (this.hasValue || (this.hasValue = this.hasSeed)) {
        this._tryReduce(value);
      } else {
        this.acc = value;
        this.hasValue = true;
      }
    };
    ReduceSubscriber.prototype._tryReduce = function (value) {
      var result;
      try {
        result = this.accumulator(this.acc, value, this.index++);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this.acc = result;
    };
    ReduceSubscriber.prototype._complete = function () {
      if (this.hasValue || this.hasSeed) {
        this.destination.next(this.acc);
      }
      this.destination.complete();
    };
    return ReduceSubscriber;
  }(Subscriber_1.Subscriber);
  exports.ReduceSubscriber = ReduceSubscriber;
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/reduce.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/reduce.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var reduce_1 = $__require('npm:rxjs@5.2.0/operator/reduce.js');
  Observable_1.Observable.prototype.reduce = reduce_1.reduce;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/takeUntil.js', ['npm:rxjs@5.2.0/OuterSubscriber.js', 'npm:rxjs@5.2.0/util/subscribeToResult.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var OuterSubscriber_1 = $__require('npm:rxjs@5.2.0/OuterSubscriber.js');
  var subscribeToResult_1 = $__require('npm:rxjs@5.2.0/util/subscribeToResult.js');
  function takeUntil(notifier) {
    return this.lift(new TakeUntilOperator(notifier));
  }
  exports.takeUntil = takeUntil;
  var TakeUntilOperator = function () {
    function TakeUntilOperator(notifier) {
      this.notifier = notifier;
    }
    TakeUntilOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new TakeUntilSubscriber(subscriber, this.notifier));
    };
    return TakeUntilOperator;
  }();
  var TakeUntilSubscriber = function (_super) {
    __extends(TakeUntilSubscriber, _super);
    function TakeUntilSubscriber(destination, notifier) {
      _super.call(this, destination);
      this.notifier = notifier;
      this.add(subscribeToResult_1.subscribeToResult(this, notifier));
    }
    TakeUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.complete();
    };
    TakeUntilSubscriber.prototype.notifyComplete = function () {};
    return TakeUntilSubscriber;
  }(OuterSubscriber_1.OuterSubscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/takeUntil.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/takeUntil.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var takeUntil_1 = $__require('npm:rxjs@5.2.0/operator/takeUntil.js');
  Observable_1.Observable.prototype.takeUntil = takeUntil_1.takeUntil;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/throttleTime.js', ['npm:rxjs@5.2.0/Subscriber.js', 'npm:rxjs@5.2.0/scheduler/async.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    "use strict";

    var __extends = this && this.__extends || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1 = $__require('npm:rxjs@5.2.0/Subscriber.js');
    var async_1 = $__require('npm:rxjs@5.2.0/scheduler/async.js');
    function throttleTime(duration, scheduler) {
      if (scheduler === void 0) {
        scheduler = async_1.async;
      }
      return this.lift(new ThrottleTimeOperator(duration, scheduler));
    }
    exports.throttleTime = throttleTime;
    var ThrottleTimeOperator = function () {
      function ThrottleTimeOperator(duration, scheduler) {
        this.duration = duration;
        this.scheduler = scheduler;
      }
      ThrottleTimeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ThrottleTimeSubscriber(subscriber, this.duration, this.scheduler));
      };
      return ThrottleTimeOperator;
    }();
    var ThrottleTimeSubscriber = function (_super) {
      __extends(ThrottleTimeSubscriber, _super);
      function ThrottleTimeSubscriber(destination, duration, scheduler) {
        _super.call(this, destination);
        this.duration = duration;
        this.scheduler = scheduler;
      }
      ThrottleTimeSubscriber.prototype._next = function (value) {
        if (!this.throttled) {
          this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.duration, { subscriber: this }));
          this.destination.next(value);
        }
      };
      ThrottleTimeSubscriber.prototype.clearThrottle = function () {
        var throttled = this.throttled;
        if (throttled) {
          throttled.unsubscribe();
          this.remove(throttled);
          this.throttled = null;
        }
      };
      return ThrottleTimeSubscriber;
    }(Subscriber_1.Subscriber);
    function dispatchNext(arg) {
      var subscriber = arg.subscriber;
      subscriber.clearThrottle();
    }
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/throttleTime.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/throttleTime.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var throttleTime_1 = $__require('npm:rxjs@5.2.0/operator/throttleTime.js');
  Observable_1.Observable.prototype.throttleTime = throttleTime_1.throttleTime;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/distinctUntilChanged.js', ['npm:rxjs@5.2.0/Subscriber.js', 'npm:rxjs@5.2.0/util/tryCatch.js', 'npm:rxjs@5.2.0/util/errorObject.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('npm:rxjs@5.2.0/Subscriber.js');
  var tryCatch_1 = $__require('npm:rxjs@5.2.0/util/tryCatch.js');
  var errorObject_1 = $__require('npm:rxjs@5.2.0/util/errorObject.js');
  function distinctUntilChanged(compare, keySelector) {
    return this.lift(new DistinctUntilChangedOperator(compare, keySelector));
  }
  exports.distinctUntilChanged = distinctUntilChanged;
  var DistinctUntilChangedOperator = function () {
    function DistinctUntilChangedOperator(compare, keySelector) {
      this.compare = compare;
      this.keySelector = keySelector;
    }
    DistinctUntilChangedOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
    };
    return DistinctUntilChangedOperator;
  }();
  var DistinctUntilChangedSubscriber = function (_super) {
    __extends(DistinctUntilChangedSubscriber, _super);
    function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
      _super.call(this, destination);
      this.keySelector = keySelector;
      this.hasKey = false;
      if (typeof compare === 'function') {
        this.compare = compare;
      }
    }
    DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
      return x === y;
    };
    DistinctUntilChangedSubscriber.prototype._next = function (value) {
      var keySelector = this.keySelector;
      var key = value;
      if (keySelector) {
        key = tryCatch_1.tryCatch(this.keySelector)(value);
        if (key === errorObject_1.errorObject) {
          return this.destination.error(errorObject_1.errorObject.e);
        }
      }
      var result = false;
      if (this.hasKey) {
        result = tryCatch_1.tryCatch(this.compare)(this.key, key);
        if (result === errorObject_1.errorObject) {
          return this.destination.error(errorObject_1.errorObject.e);
        }
      } else {
        this.hasKey = true;
      }
      if (Boolean(result) === false) {
        this.key = key;
        this.destination.next(value);
      }
    };
    return DistinctUntilChangedSubscriber;
  }(Subscriber_1.Subscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/distinctUntilChanged.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/distinctUntilChanged.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var distinctUntilChanged_1 = $__require('npm:rxjs@5.2.0/operator/distinctUntilChanged.js');
  Observable_1.Observable.prototype.distinctUntilChanged = distinctUntilChanged_1.distinctUntilChanged;
});
System.registerDynamic("src-reactive/app/learnrx.js", ["npm:rxjs@5.2.0/Observable.js", "npm:rxjs@5.2.0/add/operator/filter.js", "npm:rxjs@5.2.0/add/operator/concatAll.js", "npm:rxjs@5.2.0/add/operator/concatMap.js", "npm:rxjs@5.2.0/add/operator/reduce.js", "npm:rxjs@5.2.0/add/operator/map.js", "npm:rxjs@5.2.0/add/observable/fromEvent.js", "npm:rxjs@5.2.0/add/operator/take.js", "npm:rxjs@5.2.0/add/operator/takeUntil.js", "npm:rxjs@5.2.0/add/operator/throttleTime.js", "npm:rxjs@5.2.0/add/operator/distinctUntilChanged.js", "npm:rxjs@5.2.0/add/operator/scan.js", "src-reactive/app/helper.js"], true, function ($__require, exports, module) {
    "use strict";
    // excerpt from http://reactivex.io/learnrx/

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    //import * as Rx from 'rxjs';
    var Observable_1 = $__require("npm:rxjs@5.2.0/Observable.js");
    //import { Subscription } from 'rxjs/Subscription';
    $__require("npm:rxjs@5.2.0/add/operator/filter.js");
    $__require("npm:rxjs@5.2.0/add/operator/concatAll.js");
    $__require("npm:rxjs@5.2.0/add/operator/concatMap.js");
    $__require("npm:rxjs@5.2.0/add/operator/reduce.js");
    $__require("npm:rxjs@5.2.0/add/operator/map.js");
    $__require("npm:rxjs@5.2.0/add/observable/fromEvent.js");
    $__require("npm:rxjs@5.2.0/add/operator/take.js");
    $__require("npm:rxjs@5.2.0/add/operator/takeUntil.js");
    $__require("npm:rxjs@5.2.0/add/operator/throttleTime.js");
    $__require("npm:rxjs@5.2.0/add/operator/distinctUntilChanged.js");
    $__require("npm:rxjs@5.2.0/add/operator/scan.js");
    var helper_1 = $__require("src-reactive/app/helper.js");
    function ex5() {
        var newReleases = [{
            "id": 70111470,
            "title": "Die Hard",
            "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": [4.0],
            "bookmark": []
        }, {
            "id": 654356453,
            "title": "Bad Boys",
            "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": [5.0],
            "bookmark": [{ id: 432534, time: 65876586 }]
        }, {
            "id": 65432445,
            "title": "The Chamber",
            "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": [4.0],
            "bookmark": []
        }, {
            "id": 675465,
            "title": "Fracture",
            "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": [5.0],
            "bookmark": [{ id: 432534, time: 65876586 }]
        }];
        var list = Observable_1.Observable.from(newReleases).map(function (video) {
            console.log("> map called");
            return {
                id: video.id,
                title: video.title
            };
        });
        console.log('BEFORE forEach');
        list.forEach(function (video) {
            console.log("Output1: " + video.id + ", " + video.title);
        });
        console.log('BEFORE PUSH');
        // array changed
        //newReleases.length -= 1;
        newReleases.push({
            "id": 675466,
            "title": "NEW",
            "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": [5.0],
            "bookmark": [{ id: 432534, time: 65876586 }]
        });
        list.forEach(function (video) {
            console.log("Output2: " + video.id + ", " + video.title);
        });
    }
    exports.ex5 = ex5;
    function ex8() {
        var newReleases = [{
            "id": 70111470,
            "title": "Die Hard",
            "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": 4.0,
            "bookmark": []
        }, {
            "id": 654356453,
            "title": "Bad Boys",
            "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": 5.0,
            "bookmark": [{ id: 432534, time: 65876586 }]
        }, {
            "id": 65432445,
            "title": "The Chamber",
            "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": 4.0,
            "bookmark": []
        }, {
            "id": 675465,
            "title": "Fracture",
            "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": 5.0,
            "bookmark": [{ id: 432534, time: 65876586 }]
        }];
        var filtered = Observable_1.Observable.from(newReleases).filter(function (video) {
            console.log("2. > filter (rating = " + video.rating + ") called");
            return video.rating === 5.0;
        }).map(function (video) {
            console.log("3. > map called");
            return video.id;
        });
        console.log("1. Start forEach");
        filtered.forEach(function (id) {
            console.log("4. Output2: " + id);
        });
    }
    exports.ex8 = ex8;
    function ex12() {
        var movieLists = [{
            name: "Instant Queue",
            videos: [{
                "id": 70111470,
                "title": "Die Hard",
                "boxarts": [{ width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" }, { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            }, {
                "id": 654356453,
                "title": "Bad Boys",
                "boxarts": [{ width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" }, { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }]
        }, {
            name: "New Releases",
            videos: [{
                "id": 65432445,
                "title": "The Chamber",
                "boxarts": [{ width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" }, { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            }, {
                "id": 675465,
                "title": "Fracture",
                "boxarts": [{ width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" }, { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" }, { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }]
        }];
        var list = Observable_1.Observable.from(movieLists).map(function (movieList) {
            console.log("2. > map(movieList) called");
            var ob1 = Observable_1.Observable.from(movieList.videos).map(function (video) {
                console.log("4. > map(video) called");
                var ob2 = Observable_1.Observable.from(video.boxarts).filter(function (boxart) {
                    console.log("6. > filter(width = " + boxart.width + ") called");
                    return boxart.width === 150;
                }).map(function (boxart) {
                    console.log("7. > map(boxart) called");
                    return { id: video.id, title: video.title, boxart: boxart.url };
                });
                console.log("5. < map(video) returned");
                return ob2;
            }).concatAll();
            console.log("3. < map(movieList) returned");
            return ob1;
        }).concatAll();
        console.log("1. Start forEach");
        list.forEach(function (item) {
            console.log("8. Output: " + item.id + ", " + item.title + ", ...");
        });
    }
    exports.ex12 = ex12;
    function ex14() {
        var movieLists = [{
            name: "Instant Queue",
            videos: [{
                "id": 70111470,
                "title": "Die Hard",
                "boxarts": [{ width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" }, { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            }, {
                "id": 654356453,
                "title": "Bad Boys",
                "boxarts": [{ width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" }, { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }]
        }, {
            name: "New Releases",
            videos: [{
                "id": 65432445,
                "title": "The Chamber",
                "boxarts": [{ width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" }, { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            }, {
                "id": 675465,
                "title": "Fracture",
                "boxarts": [{ width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" }, { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" }, { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }]
        }];
        var list = Observable_1.Observable.from(movieLists).concatMap(function (movieList) {
            console.log("2. > map(movieList) called");
            var ob1 = Observable_1.Observable.from(movieList.videos).concatMap(function (video) {
                console.log("4. > map(video) called");
                var ob2 = Observable_1.Observable.from(video.boxarts).filter(function (boxart) {
                    console.log("6. > filter(width = " + boxart.width + ") called");
                    return boxart.width === 150;
                }).map(function (boxart) {
                    console.log("7. > map(boxart) called");
                    return { id: video.id, title: video.title, boxart: boxart.url };
                });
                console.log("5. < map(video) returned");
                return ob2;
            });
            console.log("3. < map(movieList) returned");
            return ob1;
        });
        console.log("1. Start forEach");
        list.forEach(function (item) {
            console.log("8. Output: " + item.id + ", " + item.title + ", ...");
        });
    }
    exports.ex14 = ex14;
    function ex17() {
        var ratings = [2, 3, 1, 4, 5];
        // You should return an array containing only the largest rating. Remember that reduce always
        // returns an array with one item.
        var sorted = Observable_1.Observable.from(ratings).reduce(function (acc, cur) {
            // min
            if (acc.min > cur) {
                acc.min = cur;
            }
            // max
            if (acc.max < cur) {
                acc.max = cur;
            }
            return acc;
        }, { min: 1000, max: -1 }); // Complete this expression
        sorted.forEach(function (value) {
            console.log("min=" + value.min + ", max=" + value.max);
        });
    }
    exports.ex17 = ex17;
    function ex20() {
        var movieLists = [{
            name: "New Releases",
            videos: [{
                "id": 70111470,
                "title": "Die Hard",
                "boxarts": [{ width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" }, { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            }, {
                "id": 654356453,
                "title": "Bad Boys",
                "boxarts": [{ width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" }, { width: 140, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg" }],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }]
        }, {
            name: "Thrillers",
            videos: [{
                "id": 65432445,
                "title": "The Chamber",
                "boxarts": [{ width: 130, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg" }, { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            }, {
                "id": 675465,
                "title": "Fracture",
                "boxarts": [{ width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" }, { width: 120, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture120.jpg" }, { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }]
        }];
        // Use one or more concatMap, map, and reduce calls to create an array with the following items (order doesn't matter)
        // [
        //     {"id": 675465,"title": "Fracture","boxart":"http://cdn-0.nflximg.com/images/2891/Fracture120.jpg" },
        //     {"id": 65432445,"title": "The Chamber","boxart":"http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg" },
        //     {"id": 654356453,"title": "Bad Boys","boxart":"http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg" },
        //     {"id": 70111470,"title": "Die Hard","boxart":"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" }
        // ];
        var list = Observable_1.Observable.from(movieLists).concatMap(function (movieList) {
            console.log("2. > concatMap(movieList) called");
            var ob1 = Observable_1.Observable.from(movieList.videos).concatMap(function (video) {
                console.log("4. > concatMap(video) called");
                var ob2 = Observable_1.Observable.from(video.boxarts).reduce(function (acc, curr) {
                    console.log("6. > reduce called");
                    if (acc.width * acc.height < curr.width * curr.height) {
                        return acc;
                    } else {
                        return curr;
                    }
                }).map(function (boxart) {
                    console.log("7. > map(boxart) called");
                    return { id: video.id, title: video.title, boxart: boxart.url };
                });
                console.log("5. > concatMap(video) returned");
                return ob2;
            });
            console.log("3. < concatMap(movieList) returned");
            return ob1;
        });
        console.log("1. Start forEach");
        list.forEach(function (item) {
            console.log("8. Output: " + item.id + ", " + item.title + ", ...");
        });
    }
    exports.ex20 = ex20;
    function ex24() {
        var movieLists = [{
            name: "New Releases",
            videos: [{
                "id": 70111470,
                "title": "Die Hard",
                "boxarts": [{ width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" }, { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "interestingMoments": [{ type: "End", time: 213432 }, { type: "Start", time: 64534 }, { type: "Middle", time: 323133 }]
            }, {
                "id": 654356453,
                "title": "Bad Boys",
                "boxarts": [{ width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" }, { width: 140, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg" }],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "interestingMoments": [{ type: "End", time: 54654754 }, { type: "Start", time: 43524243 }, { type: "Middle", time: 6575665 }]
            }]
        }, {
            name: "Instant Queue",
            videos: [{
                "id": 65432445,
                "title": "The Chamber",
                "boxarts": [{ width: 130, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg" }, { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "interestingMoments": [{ type: "End", time: 132423 }, { type: "Start", time: 54637425 }, { type: "Middle", time: 3452343 }]
            }, {
                "id": 675465,
                "title": "Fracture",
                "boxarts": [{ width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" }, { width: 120, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture120.jpg" }, { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "interestingMoments": [{ type: "End", time: 45632456 }, { type: "Start", time: 234534 }, { type: "Middle", time: 3453434 }]
            }]
        }];
        //------------ COMPLETE THIS EXPRESSION --------------
        var list = Observable_1.Observable.from(movieLists).concatMap(function (movieList) {
            console.log("2. > concatMap(movieList) called");
            var ob0 = Observable_1.Observable.from(movieList.videos).concatMap(function (video) {
                console.log("4. > concatMap(video) called");
                var boxarts = Observable_1.Observable.from(video.boxarts).reduce(function (last, cur) {
                    console.log("6. > reduce() called");
                    return last.width > cur.width ? cur : last;
                });
                var interestingMoments = Observable_1.Observable.from(video.interestingMoments).filter(function (interestingMoment) {
                    console.log("7. > filter(interestingMoment) called");
                    return interestingMoment.type == 'Middle';
                });
                var ob1 = Observable_1.Observable.zip(boxarts, interestingMoments, function (boxart, interestingMoment) {
                    console.log("8. > zip() called");
                    return { id: video.id, title: video.title, time: interestingMoment.time, url: boxart.url };
                });
                console.log("5. < concatMap(video) return");
                return ob1;
            });
            console.log("3. < concatMap(movieList) return");
            return ob0;
        });
        console.log("1. START forEach");
        list.forEach(function (item) {
            console.log("9. id=" + item.id + ", title=" + item.title + ", time=" + item.time);
        });
    }
    exports.ex24 = ex24;
    function ex29(testButton, placeholder) {
        var button = helper_1.buttonForTest('for ex29: click this', placeholder);
        var buttonClicks = Observable_1.Observable.fromEvent(button, 'click');
        // In the case of an Observable, forEach returns a subscription object.
        var subscription = buttonClicks.subscribe(function (clickEvent) {
            console.log('Button was clicked. Stopping Traversal.');
            // Stop traversing the button clicks
            subscription.unsubscribe();
        });
    }
    exports.ex29 = ex29;
    function ex30(testButton, placeholder) {
        var button = helper_1.buttonForTest('for ex30: click this', placeholder);
        var buttonClicks = Observable_1.Observable.fromEvent(button, 'click');
        // Use take() to listen for only one button click
        // and unsubscribe.
        buttonClicks.take(1).forEach(function (clickEvent) {
            console.log('Button was clicked once. Stopping Traversal.');
        });
    }
    exports.ex30 = ex30;
    function ex33(testButton, placeholder) {
        var sprite = helper_1.buttonForTest('for ex33: drag this', placeholder);
        sprite.style.position = 'absolute';
        var spriteContainer = document.body;
        var spriteMouseDowns = Observable_1.Observable.fromEvent(sprite, "mousedown"),
            spriteContainerMouseMoves = Observable_1.Observable.fromEvent(spriteContainer, "mousemove"),
            spriteContainerMouseUps = Observable_1.Observable.fromEvent(spriteContainer, "mouseup"),
            spriteMouseDrags = spriteMouseDowns.concatMap(function (contactPoint) {
            console.log('2. > concatMap(contactPoint) called');
            // ...retrieve all the mouse move events on the sprite container...
            var dragPoint = spriteContainerMouseMoves.takeUntil(spriteContainerMouseUps).map(function (movePoint) {
                console.log('4. > map(movePoint) called');
                return {
                    pageX: movePoint.pageX - contactPoint.layerX,
                    pageY: movePoint.pageY - contactPoint.layerY
                };
            });
            console.log('3. < concatMap(contactPoint) returned');
            return dragPoint;
        });
        console.log('> 1. Start forEach');
        // For each mouse drag event, move the sprite to the absolute page position.
        spriteMouseDrags.forEach(function (dragPoint) {
            console.log('5. > forEach(dragPoint) called');
            sprite.style.left = dragPoint.pageX + "px";
            sprite.style.top = dragPoint.pageY + "px";
        });
    }
    exports.ex33 = ex33;
    function ex38(testButton, placeholder) {
        var button = helper_1.buttonForTest('for ex38: click this', placeholder);
        var buttonClicks = Observable_1.Observable.fromEvent(button, 'click');
        var clicks = buttonClicks.throttleTime(1000);
        clicks.forEach(function (click) {
            console.log("time: " + click.timeStamp + " - " + new Date(click.timeStamp));
        });
    }
    exports.ex38 = ex38;
    function ex40(testButton, placeholder) {
        var input = helper_1.inputForTest('for ex40', placeholder);
        var keyPresses = Observable_1.Observable.fromEvent(input, 'keypress');
        var strings = keyPresses.map(function (keyboardEvent) {
            console.log("2. > map(" + keyboardEvent.key + ") called");
            return keyboardEvent.key;
        }).filter(function (character) {
            console.log("3. > filter(" + character + ") called");
            return (/^[A-Za-z]$/.test(character)
            );
        }).distinctUntilChanged().scan(function (stringSoFar, character) {
            console.log("4. > scan(" + stringSoFar + ", " + character + ") called");
            return stringSoFar + character;
        }, '');
        console.log("1. Start forEach");
        strings.forEach(function (string) {
            console.log("5. " + string);
        });
    }
    exports.ex40 = ex40;
});
System.registerDynamic('npm:rxjs@5.2.0/observable/FromEventObservable.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/util/tryCatch.js', 'npm:rxjs@5.2.0/util/isFunction.js', 'npm:rxjs@5.2.0/util/errorObject.js', 'npm:rxjs@5.2.0/Subscription.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    "use strict";

    var __extends = this && this.__extends || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
    var tryCatch_1 = $__require('npm:rxjs@5.2.0/util/tryCatch.js');
    var isFunction_1 = $__require('npm:rxjs@5.2.0/util/isFunction.js');
    var errorObject_1 = $__require('npm:rxjs@5.2.0/util/errorObject.js');
    var Subscription_1 = $__require('npm:rxjs@5.2.0/Subscription.js');
    var toString = Object.prototype.toString;
    function isNodeStyleEventEmitter(sourceObj) {
      return !!sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
    }
    function isJQueryStyleEventEmitter(sourceObj) {
      return !!sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
    }
    function isNodeList(sourceObj) {
      return !!sourceObj && toString.call(sourceObj) === '[object NodeList]';
    }
    function isHTMLCollection(sourceObj) {
      return !!sourceObj && toString.call(sourceObj) === '[object HTMLCollection]';
    }
    function isEventTarget(sourceObj) {
      return !!sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
    }
    var FromEventObservable = function (_super) {
      __extends(FromEventObservable, _super);
      function FromEventObservable(sourceObj, eventName, selector, options) {
        _super.call(this);
        this.sourceObj = sourceObj;
        this.eventName = eventName;
        this.selector = selector;
        this.options = options;
      }
      FromEventObservable.create = function (target, eventName, options, selector) {
        if (isFunction_1.isFunction(options)) {
          selector = options;
          options = undefined;
        }
        return new FromEventObservable(target, eventName, selector, options);
      };
      FromEventObservable.setupSubscription = function (sourceObj, eventName, handler, subscriber, options) {
        var unsubscribe;
        if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
          for (var i = 0, len = sourceObj.length; i < len; i++) {
            FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
          }
        } else if (isEventTarget(sourceObj)) {
          var source_1 = sourceObj;
          sourceObj.addEventListener(eventName, handler, options);
          unsubscribe = function () {
            return source_1.removeEventListener(eventName, handler);
          };
        } else if (isJQueryStyleEventEmitter(sourceObj)) {
          var source_2 = sourceObj;
          sourceObj.on(eventName, handler);
          unsubscribe = function () {
            return source_2.off(eventName, handler);
          };
        } else if (isNodeStyleEventEmitter(sourceObj)) {
          var source_3 = sourceObj;
          sourceObj.addListener(eventName, handler);
          unsubscribe = function () {
            return source_3.removeListener(eventName, handler);
          };
        } else {
          throw new TypeError('Invalid event target');
        }
        subscriber.add(new Subscription_1.Subscription(unsubscribe));
      };
      FromEventObservable.prototype._subscribe = function (subscriber) {
        var sourceObj = this.sourceObj;
        var eventName = this.eventName;
        var options = this.options;
        var selector = this.selector;
        var handler = selector ? function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
          }
          var result = tryCatch_1.tryCatch(selector).apply(void 0, args);
          if (result === errorObject_1.errorObject) {
            subscriber.error(errorObject_1.errorObject.e);
          } else {
            subscriber.next(result);
          }
        } : function (e) {
          return subscriber.next(e);
        };
        FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber, options);
      };
      return FromEventObservable;
    }(Observable_1.Observable);
    exports.FromEventObservable = FromEventObservable;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic("npm:rxjs@5.2.0/observable/fromEvent.js", ["npm:rxjs@5.2.0/observable/FromEventObservable.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var FromEventObservable_1 = $__require("npm:rxjs@5.2.0/observable/FromEventObservable.js");
  exports.fromEvent = FromEventObservable_1.FromEventObservable.create;
});
System.registerDynamic('npm:rxjs@5.2.0/add/observable/fromEvent.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/observable/fromEvent.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var fromEvent_1 = $__require('npm:rxjs@5.2.0/observable/fromEvent.js');
  Observable_1.Observable.fromEvent = fromEvent_1.fromEvent;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/zip.js', ['npm:rxjs@5.2.0/observable/ArrayObservable.js', 'npm:rxjs@5.2.0/util/isArray.js', 'npm:rxjs@5.2.0/Subscriber.js', 'npm:rxjs@5.2.0/OuterSubscriber.js', 'npm:rxjs@5.2.0/util/subscribeToResult.js', 'npm:rxjs@5.2.0/symbol/iterator.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var ArrayObservable_1 = $__require('npm:rxjs@5.2.0/observable/ArrayObservable.js');
  var isArray_1 = $__require('npm:rxjs@5.2.0/util/isArray.js');
  var Subscriber_1 = $__require('npm:rxjs@5.2.0/Subscriber.js');
  var OuterSubscriber_1 = $__require('npm:rxjs@5.2.0/OuterSubscriber.js');
  var subscribeToResult_1 = $__require('npm:rxjs@5.2.0/util/subscribeToResult.js');
  var iterator_1 = $__require('npm:rxjs@5.2.0/symbol/iterator.js');
  function zipProto() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    return this.lift.call(zipStatic.apply(void 0, [this].concat(observables)));
  }
  exports.zipProto = zipProto;
  function zipStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    var project = observables[observables.length - 1];
    if (typeof project === 'function') {
      observables.pop();
    }
    return new ArrayObservable_1.ArrayObservable(observables).lift(new ZipOperator(project));
  }
  exports.zipStatic = zipStatic;
  var ZipOperator = function () {
    function ZipOperator(project) {
      this.project = project;
    }
    ZipOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new ZipSubscriber(subscriber, this.project));
    };
    return ZipOperator;
  }();
  exports.ZipOperator = ZipOperator;
  var ZipSubscriber = function (_super) {
    __extends(ZipSubscriber, _super);
    function ZipSubscriber(destination, project, values) {
      if (values === void 0) {
        values = Object.create(null);
      }
      _super.call(this, destination);
      this.iterators = [];
      this.active = 0;
      this.project = typeof project === 'function' ? project : null;
      this.values = values;
    }
    ZipSubscriber.prototype._next = function (value) {
      var iterators = this.iterators;
      if (isArray_1.isArray(value)) {
        iterators.push(new StaticArrayIterator(value));
      } else if (typeof value[iterator_1.$$iterator] === 'function') {
        iterators.push(new StaticIterator(value[iterator_1.$$iterator]()));
      } else {
        iterators.push(new ZipBufferIterator(this.destination, this, value));
      }
    };
    ZipSubscriber.prototype._complete = function () {
      var iterators = this.iterators;
      var len = iterators.length;
      this.active = len;
      for (var i = 0; i < len; i++) {
        var iterator = iterators[i];
        if (iterator.stillUnsubscribed) {
          this.add(iterator.subscribe(iterator, i));
        } else {
          this.active--;
        }
      }
    };
    ZipSubscriber.prototype.notifyInactive = function () {
      this.active--;
      if (this.active === 0) {
        this.destination.complete();
      }
    };
    ZipSubscriber.prototype.checkIterators = function () {
      var iterators = this.iterators;
      var len = iterators.length;
      var destination = this.destination;
      for (var i = 0; i < len; i++) {
        var iterator = iterators[i];
        if (typeof iterator.hasValue === 'function' && !iterator.hasValue()) {
          return;
        }
      }
      var shouldComplete = false;
      var args = [];
      for (var i = 0; i < len; i++) {
        var iterator = iterators[i];
        var result = iterator.next();
        if (iterator.hasCompleted()) {
          shouldComplete = true;
        }
        if (result.done) {
          destination.complete();
          return;
        }
        args.push(result.value);
      }
      if (this.project) {
        this._tryProject(args);
      } else {
        destination.next(args);
      }
      if (shouldComplete) {
        destination.complete();
      }
    };
    ZipSubscriber.prototype._tryProject = function (args) {
      var result;
      try {
        result = this.project.apply(this, args);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this.destination.next(result);
    };
    return ZipSubscriber;
  }(Subscriber_1.Subscriber);
  exports.ZipSubscriber = ZipSubscriber;
  var StaticIterator = function () {
    function StaticIterator(iterator) {
      this.iterator = iterator;
      this.nextResult = iterator.next();
    }
    StaticIterator.prototype.hasValue = function () {
      return true;
    };
    StaticIterator.prototype.next = function () {
      var result = this.nextResult;
      this.nextResult = this.iterator.next();
      return result;
    };
    StaticIterator.prototype.hasCompleted = function () {
      var nextResult = this.nextResult;
      return nextResult && nextResult.done;
    };
    return StaticIterator;
  }();
  var StaticArrayIterator = function () {
    function StaticArrayIterator(array) {
      this.array = array;
      this.index = 0;
      this.length = 0;
      this.length = array.length;
    }
    StaticArrayIterator.prototype[iterator_1.$$iterator] = function () {
      return this;
    };
    StaticArrayIterator.prototype.next = function (value) {
      var i = this.index++;
      var array = this.array;
      return i < this.length ? {
        value: array[i],
        done: false
      } : {
        value: null,
        done: true
      };
    };
    StaticArrayIterator.prototype.hasValue = function () {
      return this.array.length > this.index;
    };
    StaticArrayIterator.prototype.hasCompleted = function () {
      return this.array.length === this.index;
    };
    return StaticArrayIterator;
  }();
  var ZipBufferIterator = function (_super) {
    __extends(ZipBufferIterator, _super);
    function ZipBufferIterator(destination, parent, observable) {
      _super.call(this, destination);
      this.parent = parent;
      this.observable = observable;
      this.stillUnsubscribed = true;
      this.buffer = [];
      this.isComplete = false;
    }
    ZipBufferIterator.prototype[iterator_1.$$iterator] = function () {
      return this;
    };
    ZipBufferIterator.prototype.next = function () {
      var buffer = this.buffer;
      if (buffer.length === 0 && this.isComplete) {
        return {
          value: null,
          done: true
        };
      } else {
        return {
          value: buffer.shift(),
          done: false
        };
      }
    };
    ZipBufferIterator.prototype.hasValue = function () {
      return this.buffer.length > 0;
    };
    ZipBufferIterator.prototype.hasCompleted = function () {
      return this.buffer.length === 0 && this.isComplete;
    };
    ZipBufferIterator.prototype.notifyComplete = function () {
      if (this.buffer.length > 0) {
        this.isComplete = true;
        this.parent.notifyInactive();
      } else {
        this.destination.complete();
      }
    };
    ZipBufferIterator.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.buffer.push(innerValue);
      this.parent.checkIterators();
    };
    ZipBufferIterator.prototype.subscribe = function (value, index) {
      return subscribeToResult_1.subscribeToResult(this, this.observable, this, index);
    };
    return ZipBufferIterator;
  }(OuterSubscriber_1.OuterSubscriber);
});
System.registerDynamic("npm:rxjs@5.2.0/observable/zip.js", ["npm:rxjs@5.2.0/operator/zip.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var zip_1 = $__require("npm:rxjs@5.2.0/operator/zip.js");
  exports.zip = zip_1.zipStatic;
});
System.registerDynamic('npm:rxjs@5.2.0/add/observable/zip.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/observable/zip.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var zip_1 = $__require('npm:rxjs@5.2.0/observable/zip.js');
  Observable_1.Observable.zip = zip_1.zip;
});
System.registerDynamic('npm:rxjs@5.2.0/observable/DeferObservable.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/util/subscribeToResult.js', 'npm:rxjs@5.2.0/OuterSubscriber.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var subscribeToResult_1 = $__require('npm:rxjs@5.2.0/util/subscribeToResult.js');
  var OuterSubscriber_1 = $__require('npm:rxjs@5.2.0/OuterSubscriber.js');
  var DeferObservable = function (_super) {
    __extends(DeferObservable, _super);
    function DeferObservable(observableFactory) {
      _super.call(this);
      this.observableFactory = observableFactory;
    }
    DeferObservable.create = function (observableFactory) {
      return new DeferObservable(observableFactory);
    };
    DeferObservable.prototype._subscribe = function (subscriber) {
      return new DeferSubscriber(subscriber, this.observableFactory);
    };
    return DeferObservable;
  }(Observable_1.Observable);
  exports.DeferObservable = DeferObservable;
  var DeferSubscriber = function (_super) {
    __extends(DeferSubscriber, _super);
    function DeferSubscriber(destination, factory) {
      _super.call(this, destination);
      this.factory = factory;
      this.tryDefer();
    }
    DeferSubscriber.prototype.tryDefer = function () {
      try {
        this._callFactory();
      } catch (err) {
        this._error(err);
      }
    };
    DeferSubscriber.prototype._callFactory = function () {
      var result = this.factory();
      if (result) {
        this.add(subscribeToResult_1.subscribeToResult(this, result));
      }
    };
    return DeferSubscriber;
  }(OuterSubscriber_1.OuterSubscriber);
});
System.registerDynamic("npm:rxjs@5.2.0/observable/defer.js", ["npm:rxjs@5.2.0/observable/DeferObservable.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var DeferObservable_1 = $__require("npm:rxjs@5.2.0/observable/DeferObservable.js");
  exports.defer = DeferObservable_1.DeferObservable.create;
});
System.registerDynamic('npm:rxjs@5.2.0/add/observable/defer.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/observable/defer.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var defer_1 = $__require('npm:rxjs@5.2.0/observable/defer.js');
  Observable_1.Observable.defer = defer_1.defer;
});
System.registerDynamic('npm:rxjs@5.2.0/observable/PromiseObservable.js', ['npm:rxjs@5.2.0/util/root.js', 'npm:rxjs@5.2.0/Observable.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var root_1 = $__require('npm:rxjs@5.2.0/util/root.js');
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var PromiseObservable = function (_super) {
    __extends(PromiseObservable, _super);
    function PromiseObservable(promise, scheduler) {
      _super.call(this);
      this.promise = promise;
      this.scheduler = scheduler;
    }
    PromiseObservable.create = function (promise, scheduler) {
      return new PromiseObservable(promise, scheduler);
    };
    PromiseObservable.prototype._subscribe = function (subscriber) {
      var _this = this;
      var promise = this.promise;
      var scheduler = this.scheduler;
      if (scheduler == null) {
        if (this._isScalar) {
          if (!subscriber.closed) {
            subscriber.next(this.value);
            subscriber.complete();
          }
        } else {
          promise.then(function (value) {
            _this.value = value;
            _this._isScalar = true;
            if (!subscriber.closed) {
              subscriber.next(value);
              subscriber.complete();
            }
          }, function (err) {
            if (!subscriber.closed) {
              subscriber.error(err);
            }
          }).then(null, function (err) {
            root_1.root.setTimeout(function () {
              throw err;
            });
          });
        }
      } else {
        if (this._isScalar) {
          if (!subscriber.closed) {
            return scheduler.schedule(dispatchNext, 0, {
              value: this.value,
              subscriber: subscriber
            });
          }
        } else {
          promise.then(function (value) {
            _this.value = value;
            _this._isScalar = true;
            if (!subscriber.closed) {
              subscriber.add(scheduler.schedule(dispatchNext, 0, {
                value: value,
                subscriber: subscriber
              }));
            }
          }, function (err) {
            if (!subscriber.closed) {
              subscriber.add(scheduler.schedule(dispatchError, 0, {
                err: err,
                subscriber: subscriber
              }));
            }
          }).then(null, function (err) {
            root_1.root.setTimeout(function () {
              throw err;
            });
          });
        }
      }
    };
    return PromiseObservable;
  }(Observable_1.Observable);
  exports.PromiseObservable = PromiseObservable;
  function dispatchNext(arg) {
    var value = arg.value,
        subscriber = arg.subscriber;
    if (!subscriber.closed) {
      subscriber.next(value);
      subscriber.complete();
    }
  }
  function dispatchError(arg) {
    var err = arg.err,
        subscriber = arg.subscriber;
    if (!subscriber.closed) {
      subscriber.error(err);
    }
  }
});
System.registerDynamic("npm:rxjs@5.2.0/observable/fromPromise.js", ["npm:rxjs@5.2.0/observable/PromiseObservable.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var PromiseObservable_1 = $__require("npm:rxjs@5.2.0/observable/PromiseObservable.js");
  exports.fromPromise = PromiseObservable_1.PromiseObservable.create;
});
System.registerDynamic('npm:rxjs@5.2.0/add/observable/fromPromise.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/observable/fromPromise.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var fromPromise_1 = $__require('npm:rxjs@5.2.0/observable/fromPromise.js');
  Observable_1.Observable.fromPromise = fromPromise_1.fromPromise;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/pluck.js', ['npm:rxjs@5.2.0/operator/map.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var map_1 = $__require('npm:rxjs@5.2.0/operator/map.js');
  function pluck() {
    var properties = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      properties[_i - 0] = arguments[_i];
    }
    var length = properties.length;
    if (length === 0) {
      throw new Error('list of properties cannot be empty.');
    }
    return map_1.map.call(this, plucker(properties, length));
  }
  exports.pluck = pluck;
  function plucker(props, length) {
    var mapper = function (x) {
      var currentProp = x;
      for (var i = 0; i < length; i++) {
        var p = currentProp[props[i]];
        if (typeof p !== 'undefined') {
          currentProp = p;
        } else {
          return undefined;
        }
      }
      return currentProp;
    };
    return mapper;
  }
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/pluck.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/pluck.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var pluck_1 = $__require('npm:rxjs@5.2.0/operator/pluck.js');
  Observable_1.Observable.prototype.pluck = pluck_1.pluck;
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/mergeAll.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/mergeAll.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var mergeAll_1 = $__require('npm:rxjs@5.2.0/operator/mergeAll.js');
  Observable_1.Observable.prototype.mergeAll = mergeAll_1.mergeAll;
});
System.registerDynamic("npm:rxjs@5.2.0/operator/do.js", ["npm:rxjs@5.2.0/Subscriber.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require("npm:rxjs@5.2.0/Subscriber.js");
  function _do(nextOrObserver, error, complete) {
    return this.lift(new DoOperator(nextOrObserver, error, complete));
  }
  exports._do = _do;
  var DoOperator = function () {
    function DoOperator(nextOrObserver, error, complete) {
      this.nextOrObserver = nextOrObserver;
      this.error = error;
      this.complete = complete;
    }
    DoOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new DoSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
    };
    return DoOperator;
  }();
  var DoSubscriber = function (_super) {
    __extends(DoSubscriber, _super);
    function DoSubscriber(destination, nextOrObserver, error, complete) {
      _super.call(this, destination);
      var safeSubscriber = new Subscriber_1.Subscriber(nextOrObserver, error, complete);
      safeSubscriber.syncErrorThrowable = true;
      this.add(safeSubscriber);
      this.safeSubscriber = safeSubscriber;
    }
    DoSubscriber.prototype._next = function (value) {
      var safeSubscriber = this.safeSubscriber;
      safeSubscriber.next(value);
      if (safeSubscriber.syncErrorThrown) {
        this.destination.error(safeSubscriber.syncErrorValue);
      } else {
        this.destination.next(value);
      }
    };
    DoSubscriber.prototype._error = function (err) {
      var safeSubscriber = this.safeSubscriber;
      safeSubscriber.error(err);
      if (safeSubscriber.syncErrorThrown) {
        this.destination.error(safeSubscriber.syncErrorValue);
      } else {
        this.destination.error(err);
      }
    };
    DoSubscriber.prototype._complete = function () {
      var safeSubscriber = this.safeSubscriber;
      safeSubscriber.complete();
      if (safeSubscriber.syncErrorThrown) {
        this.destination.error(safeSubscriber.syncErrorValue);
      } else {
        this.destination.complete();
      }
    };
    return DoSubscriber;
  }(Subscriber_1.Subscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/do.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/do.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var do_1 = $__require('npm:rxjs@5.2.0/operator/do.js');
  Observable_1.Observable.prototype.do = do_1._do;
  Observable_1.Observable.prototype._do = do_1._do;
});
System.registerDynamic("npm:rxjs@5.2.0/util/isDate.js", [], true, function ($__require, exports, module) {
    /* */
    "use strict";

    var global = this || self,
        GLOBAL = global;
    function isDate(value) {
        return value instanceof Date && !isNaN(+value);
    }
    exports.isDate = isDate;
    
});
System.registerDynamic('npm:rxjs@5.2.0/operator/delay.js', ['npm:rxjs@5.2.0/scheduler/async.js', 'npm:rxjs@5.2.0/util/isDate.js', 'npm:rxjs@5.2.0/Subscriber.js', 'npm:rxjs@5.2.0/Notification.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var async_1 = $__require('npm:rxjs@5.2.0/scheduler/async.js');
  var isDate_1 = $__require('npm:rxjs@5.2.0/util/isDate.js');
  var Subscriber_1 = $__require('npm:rxjs@5.2.0/Subscriber.js');
  var Notification_1 = $__require('npm:rxjs@5.2.0/Notification.js');
  function delay(delay, scheduler) {
    if (scheduler === void 0) {
      scheduler = async_1.async;
    }
    var absoluteDelay = isDate_1.isDate(delay);
    var delayFor = absoluteDelay ? +delay - scheduler.now() : Math.abs(delay);
    return this.lift(new DelayOperator(delayFor, scheduler));
  }
  exports.delay = delay;
  var DelayOperator = function () {
    function DelayOperator(delay, scheduler) {
      this.delay = delay;
      this.scheduler = scheduler;
    }
    DelayOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new DelaySubscriber(subscriber, this.delay, this.scheduler));
    };
    return DelayOperator;
  }();
  var DelaySubscriber = function (_super) {
    __extends(DelaySubscriber, _super);
    function DelaySubscriber(destination, delay, scheduler) {
      _super.call(this, destination);
      this.delay = delay;
      this.scheduler = scheduler;
      this.queue = [];
      this.active = false;
      this.errored = false;
    }
    DelaySubscriber.dispatch = function (state) {
      var source = state.source;
      var queue = source.queue;
      var scheduler = state.scheduler;
      var destination = state.destination;
      while (queue.length > 0 && queue[0].time - scheduler.now() <= 0) {
        queue.shift().notification.observe(destination);
      }
      if (queue.length > 0) {
        var delay_1 = Math.max(0, queue[0].time - scheduler.now());
        this.schedule(state, delay_1);
      } else {
        source.active = false;
      }
    };
    DelaySubscriber.prototype._schedule = function (scheduler) {
      this.active = true;
      this.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
        source: this,
        destination: this.destination,
        scheduler: scheduler
      }));
    };
    DelaySubscriber.prototype.scheduleNotification = function (notification) {
      if (this.errored === true) {
        return;
      }
      var scheduler = this.scheduler;
      var message = new DelayMessage(scheduler.now() + this.delay, notification);
      this.queue.push(message);
      if (this.active === false) {
        this._schedule(scheduler);
      }
    };
    DelaySubscriber.prototype._next = function (value) {
      this.scheduleNotification(Notification_1.Notification.createNext(value));
    };
    DelaySubscriber.prototype._error = function (err) {
      this.errored = true;
      this.queue = [];
      this.destination.error(err);
    };
    DelaySubscriber.prototype._complete = function () {
      this.scheduleNotification(Notification_1.Notification.createComplete());
    };
    return DelaySubscriber;
  }(Subscriber_1.Subscriber);
  var DelayMessage = function () {
    function DelayMessage(time, notification) {
      this.time = time;
      this.notification = notification;
    }
    return DelayMessage;
  }();
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/delay.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/delay.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var delay_1 = $__require('npm:rxjs@5.2.0/operator/delay.js');
  Observable_1.Observable.prototype.delay = delay_1.delay;
});
System.registerDynamic('npm:rxjs@5.2.0/util/ArgumentOutOfRangeError.js', [], true, function ($__require, exports, module) {
    /* */
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    /**
     * An error thrown when an element was queried at a certain index of an
     * Observable, but no such index or position exists in that sequence.
     *
     * @see {@link elementAt}
     * @see {@link take}
     * @see {@link takeLast}
     *
     * @class ArgumentOutOfRangeError
     */
    var ArgumentOutOfRangeError = function (_super) {
        __extends(ArgumentOutOfRangeError, _super);
        function ArgumentOutOfRangeError() {
            var err = _super.call(this, 'argument out of range');
            this.name = err.name = 'ArgumentOutOfRangeError';
            this.stack = err.stack;
            this.message = err.message;
        }
        return ArgumentOutOfRangeError;
    }(Error);
    exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError;
    
});
System.registerDynamic('npm:rxjs@5.2.0/operator/take.js', ['npm:rxjs@5.2.0/Subscriber.js', 'npm:rxjs@5.2.0/util/ArgumentOutOfRangeError.js', 'npm:rxjs@5.2.0/observable/EmptyObservable.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('npm:rxjs@5.2.0/Subscriber.js');
  var ArgumentOutOfRangeError_1 = $__require('npm:rxjs@5.2.0/util/ArgumentOutOfRangeError.js');
  var EmptyObservable_1 = $__require('npm:rxjs@5.2.0/observable/EmptyObservable.js');
  function take(count) {
    if (count === 0) {
      return new EmptyObservable_1.EmptyObservable();
    } else {
      return this.lift(new TakeOperator(count));
    }
  }
  exports.take = take;
  var TakeOperator = function () {
    function TakeOperator(total) {
      this.total = total;
      if (this.total < 0) {
        throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError();
      }
    }
    TakeOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new TakeSubscriber(subscriber, this.total));
    };
    return TakeOperator;
  }();
  var TakeSubscriber = function (_super) {
    __extends(TakeSubscriber, _super);
    function TakeSubscriber(destination, total) {
      _super.call(this, destination);
      this.total = total;
      this.count = 0;
    }
    TakeSubscriber.prototype._next = function (value) {
      var total = this.total;
      var count = ++this.count;
      if (count <= total) {
        this.destination.next(value);
        if (count === total) {
          this.destination.complete();
          this.unsubscribe();
        }
      }
    };
    return TakeSubscriber;
  }(Subscriber_1.Subscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/take.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/take.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var take_1 = $__require('npm:rxjs@5.2.0/operator/take.js');
  Observable_1.Observable.prototype.take = take_1.take;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/share.js', ['npm:rxjs@5.2.0/operator/multicast.js', 'npm:rxjs@5.2.0/Subject.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var multicast_1 = $__require('npm:rxjs@5.2.0/operator/multicast.js');
  var Subject_1 = $__require('npm:rxjs@5.2.0/Subject.js');
  function shareSubjectFactory() {
    return new Subject_1.Subject();
  }
  function share() {
    return multicast_1.multicast.call(this, shareSubjectFactory).refCount();
  }
  exports.share = share;
  ;
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/share.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/share.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var share_1 = $__require('npm:rxjs@5.2.0/operator/share.js');
  Observable_1.Observable.prototype.share = share_1.share;
});
System.registerDynamic("src-reactive/app/playground.js", ["npm:rxjs@5.2.0/Observable.js", "npm:immutable@3.8.1.js", "npm:rxjs@5.2.0/add/observable/fromEvent.js", "npm:rxjs@5.2.0/add/observable/interval.js", "npm:rxjs@5.2.0/add/observable/zip.js", "npm:rxjs@5.2.0/add/observable/defer.js", "npm:rxjs@5.2.0/add/observable/fromPromise.js", "npm:rxjs@5.2.0/add/operator/pluck.js", "npm:rxjs@5.2.0/add/operator/map.js", "npm:rxjs@5.2.0/add/operator/mergeAll.js", "npm:rxjs@5.2.0/add/operator/do.js", "npm:rxjs@5.2.0/add/operator/delay.js", "npm:rxjs@5.2.0/add/operator/take.js", "npm:rxjs@5.2.0/add/operator/share.js", "src-reactive/app/helper.js"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = $__require("npm:rxjs@5.2.0/Observable.js");
    var immutable_1 = $__require("npm:immutable@3.8.1.js");
    $__require("npm:rxjs@5.2.0/add/observable/fromEvent.js");
    $__require("npm:rxjs@5.2.0/add/observable/interval.js");
    $__require("npm:rxjs@5.2.0/add/observable/zip.js");
    $__require("npm:rxjs@5.2.0/add/observable/defer.js");
    $__require("npm:rxjs@5.2.0/add/observable/fromPromise.js");
    $__require("npm:rxjs@5.2.0/add/operator/pluck.js");
    $__require("npm:rxjs@5.2.0/add/operator/map.js");
    $__require("npm:rxjs@5.2.0/add/operator/mergeAll.js");
    $__require("npm:rxjs@5.2.0/add/operator/do.js");
    $__require("npm:rxjs@5.2.0/add/operator/delay.js");
    $__require("npm:rxjs@5.2.0/add/operator/take.js");
    $__require("npm:rxjs@5.2.0/add/operator/share.js");
    var helper_1 = $__require("src-reactive/app/helper.js");
    function pluckAndZip() {
        var contacts = Observable_1.Observable.from([{
            name: {
                first: 'eunji',
                second: 'oh'
            },
            email: {
                home: 'eunji@home',
                work: 'eunji@work'
            }
        }, {
            name: {
                first: 'rahee',
                second: 'kang'
            },
            email: {
                home: 'rahee@home',
                work: 'rahee@work'
            }
        }]);
        var firsts = contacts.pluck('name', 'first');
        var homes = contacts.pluck('email', 'home');
        var merged = Observable_1.Observable.zip(firsts, homes, function (first, home) {
            return first + " - " + home + "'";
        });
        merged.subscribe(function (value) {
            return console.log("" + value);
        });
    }
    exports.pluckAndZip = pluckAndZip;
    // excerpt from http://reactivex.io/rxjs/manual/tutorial.html
    function stateStore(testButton, placeholder) {
        var increaseButton = helper_1.buttonForTest('increase', placeholder);
        var increase = Observable_1.Observable.fromEvent(increaseButton, 'click').map(function () {
            return function (state) {
                return Object.assign({}, state, { count: state.count + 1 });
            };
        });
        var decreaseButton = helper_1.buttonForTest('decrease', placeholder);
        var decrease = Observable_1.Observable.fromEvent(decreaseButton, 'click').map(function () {
            return function (state) {
                return Object.assign({}, state, { count: state.count - 1 });
            };
        });
        var inputElement = helper_1.inputForTest('input', placeholder);
        var input = Observable_1.Observable.fromEvent(inputElement, 'keyup').map(function (event) {
            //console.log(`keyup ${event.key}`);
            return function (state) {
                return Object.assign({}, state, { inputValue: event.target.value });
            };
        });
        // let state = increase.scan((state, changeFn) => changeFn(state), { count: 0 });
        // We merge the three state change producing observables
        var stateObservable = Observable_1.Observable.merge([increase, decrease, input]).mergeAll().scan(function (state, changeFn) {
            return changeFn(state);
        }, {
            count: 0,
            inputValue: '',
            isSecond: false
        });
        // We subscribe to state changes and update the DOM
        stateObservable.subscribe(function (state) {
            console.log("state1: " + state.count + ", inputValue1: " + state.inputValue);
            if (state.count > 5 && state.isSecond === false) {
                console.log("Start another subscribe");
                stateObservable.subscribe(function (state) {
                    console.log("state2: " + state.count + ", inputValue2: " + state.inputValue);
                });
                // undesiable: change back state
                state.isSecond = true;
            }
        });
    }
    exports.stateStore = stateStore;
    function immutableStore(testButton, placeholder) {
        // interface State {
        //     count:number;
        //     inputValue: string;
        //     isSecond: boolean;
        //     //[key:string]: any;
        // }
        var increaseButton = helper_1.buttonForTest('increase', placeholder);
        var increase = Observable_1.Observable.fromEvent(increaseButton, 'click').map(function (event) {
            return function (state) {
                return state.update('count', function (value) {
                    return value + 1;
                });
            };
        });
        var decreaseButton = helper_1.buttonForTest('decrease', placeholder);
        var decrease = Observable_1.Observable.fromEvent(decreaseButton, 'click').map(function (event) {
            return function (state) {
                return state.update('count', function (value) {
                    return value - 1;
                });
            };
        });
        var inputElement = helper_1.inputForTest('input', placeholder);
        var input = Observable_1.Observable.fromEvent(inputElement, 'keyup').map(function (event) {
            return function (state) {
                return state.update('inputValue', function () {
                    return event.target.value;
                });
            };
        });
        // let state = increase.scan((state, changeFn) => changeFn(state), { count: 0 });
        // We merge the three state change producing observables
        var stateObservable = Observable_1.Observable.merge(increase, decrease, input).scan(function (state, changeFn) {
            var newState = changeFn(state);
            if (newState.get('isSecond') === true && newState.get('fired') === false) {
                newState = newState.set('fired', true);
            }
            if (newState.get('count') > 5 && newState.get('isSecond') === false) {
                newState = newState.set('isSecond', true);
            }
            return newState;
        }, immutable_1.Map({
            count: 0,
            inputValue: '',
            isSecond: false,
            fired: false
        }));
        // We subscribe to state changes and update the DOM
        stateObservable.subscribe(function (state) {
            console.log("state1: " + state.get('count') + ", inputValue1: " + state.get('inputValue'));
            if (state.get('isSecond') === true && state.get('fired') === false) {
                console.log("Start another subscribe");
                stateObservable.subscribe(function (state) {
                    console.log("state2: " + state.get('count') + ", inputValue2: " + state.get('inputValue'));
                });
            }
        });
    }
    exports.immutableStore = immutableStore;
    function zipUnbalancedMultipath(testButton, placeholder) {
        var generator = Observable_1.Observable.interval(500).take(5).share();
        var path1 = generator.do(function () {
            console.log('path1: before map');
        }).map(function (value) {
            return value + 100;
        });
        var path2 = generator.do(function () {
            console.log('path2: before delay');
        }).delay(1000).do(function () {
            console.log('path2: after delay');
        });
        Observable_1.Observable.zip(path1, path2, function (value1, value2) {
            return value1 + " - " + value2;
        }).subscribe(helper_1.simpleObserver('zipped'));
    }
    exports.zipUnbalancedMultipath = zipUnbalancedMultipath;
    function fromPromise(testButton, placeholder) {
        function idExists(id) {
            return id === 'exist' ? true : false;
        }
        function deleteUser(id) {
            if (idExists(id)) {
                return Observable_1.Observable.fromPromise(Promise.resolve('delete user'));
            } else {
                return Observable_1.Observable.of('user not exist');
            }
        }
        deleteUser('exist').subscribe(function (value) {
            console.log(value);
        });
        deleteUser('not exist').subscribe(function (value) {
            console.log(value);
        });
    }
    exports.fromPromise = fromPromise;
    function fromPromise2(testButton, placeholder) {
        function idExists(id) {
            return id === 'exist' ? true : false;
        }
        function deleteUser(id) {
            Observable_1.Observable.defer(function () {
                if (idExists(id)) {
                    return Observable_1.Observable.fromPromise(Promise.resolve('delete user'));
                } else {
                    return Observable_1.Observable.of('user not exist');
                }
            }).subscribe(function (value) {
                console.log(value);
            });
        }
        deleteUser('exist');
        deleteUser('not exist');
    }
    exports.fromPromise2 = fromPromise2;
});
System.registerDynamic("npm:rxjs@5.2.0/observable/RangeObservable.js", ["npm:rxjs@5.2.0/Observable.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require("npm:rxjs@5.2.0/Observable.js");
  var RangeObservable = function (_super) {
    __extends(RangeObservable, _super);
    function RangeObservable(start, count, scheduler) {
      _super.call(this);
      this.start = start;
      this._count = count;
      this.scheduler = scheduler;
    }
    RangeObservable.create = function (start, count, scheduler) {
      if (start === void 0) {
        start = 0;
      }
      if (count === void 0) {
        count = 0;
      }
      return new RangeObservable(start, count, scheduler);
    };
    RangeObservable.dispatch = function (state) {
      var start = state.start,
          index = state.index,
          count = state.count,
          subscriber = state.subscriber;
      if (index >= count) {
        subscriber.complete();
        return;
      }
      subscriber.next(start);
      if (subscriber.closed) {
        return;
      }
      state.index = index + 1;
      state.start = start + 1;
      this.schedule(state);
    };
    RangeObservable.prototype._subscribe = function (subscriber) {
      var index = 0;
      var start = this.start;
      var count = this._count;
      var scheduler = this.scheduler;
      if (scheduler) {
        return scheduler.schedule(RangeObservable.dispatch, 0, {
          index: index,
          count: count,
          start: start,
          subscriber: subscriber
        });
      } else {
        do {
          if (index++ >= count) {
            subscriber.complete();
            break;
          }
          subscriber.next(start++);
          if (subscriber.closed) {
            break;
          }
        } while (true);
      }
    };
    return RangeObservable;
  }(Observable_1.Observable);
  exports.RangeObservable = RangeObservable;
});
System.registerDynamic("npm:rxjs@5.2.0/observable/range.js", ["npm:rxjs@5.2.0/observable/RangeObservable.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var RangeObservable_1 = $__require("npm:rxjs@5.2.0/observable/RangeObservable.js");
  exports.range = RangeObservable_1.RangeObservable.create;
});
System.registerDynamic('npm:rxjs@5.2.0/add/observable/range.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/observable/range.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var range_1 = $__require('npm:rxjs@5.2.0/observable/range.js');
  Observable_1.Observable.range = range_1.range;
});
System.registerDynamic("npm:rxjs@5.2.0/util/isNumeric.js", ["npm:rxjs@5.2.0/util/isArray.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var isArray_1 = $__require("npm:rxjs@5.2.0/util/isArray.js");
  function isNumeric(val) {
    return !isArray_1.isArray(val) && val - parseFloat(val) + 1 >= 0;
  }
  exports.isNumeric = isNumeric;
  ;
});
System.registerDynamic("npm:rxjs@5.2.0/scheduler/Action.js", ["npm:rxjs@5.2.0/Subscription.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscription_1 = $__require("npm:rxjs@5.2.0/Subscription.js");
  var Action = function (_super) {
    __extends(Action, _super);
    function Action(scheduler, work) {
      _super.call(this);
    }
    Action.prototype.schedule = function (state, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      return this;
    };
    return Action;
  }(Subscription_1.Subscription);
  exports.Action = Action;
});
System.registerDynamic('npm:rxjs@5.2.0/scheduler/AsyncAction.js', ['npm:rxjs@5.2.0/util/root.js', 'npm:rxjs@5.2.0/scheduler/Action.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var root_1 = $__require('npm:rxjs@5.2.0/util/root.js');
  var Action_1 = $__require('npm:rxjs@5.2.0/scheduler/Action.js');
  var AsyncAction = function (_super) {
    __extends(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
      _super.call(this, scheduler, work);
      this.scheduler = scheduler;
      this.work = work;
      this.pending = false;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      if (this.closed) {
        return this;
      }
      this.state = state;
      this.pending = true;
      var id = this.id;
      var scheduler = this.scheduler;
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, delay);
      }
      this.delay = delay;
      this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
      return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      return root_1.root.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      if (delay !== null && this.delay === delay) {
        return id;
      }
      return root_1.root.clearInterval(id) && undefined || undefined;
    };
    AsyncAction.prototype.execute = function (state, delay) {
      if (this.closed) {
        return new Error('executing a cancelled action');
      }
      this.pending = false;
      var error = this._execute(state, delay);
      if (error) {
        return error;
      } else if (this.pending === false && this.id != null) {
        this.id = this.recycleAsyncId(this.scheduler, this.id, null);
      }
    };
    AsyncAction.prototype._execute = function (state, delay) {
      var errored = false;
      var errorValue = undefined;
      try {
        this.work(state);
      } catch (e) {
        errored = true;
        errorValue = !!e && e || new Error(e);
      }
      if (errored) {
        this.unsubscribe();
        return errorValue;
      }
    };
    AsyncAction.prototype._unsubscribe = function () {
      var id = this.id;
      var scheduler = this.scheduler;
      var actions = scheduler.actions;
      var index = actions.indexOf(this);
      this.work = null;
      this.delay = null;
      this.state = null;
      this.pending = false;
      this.scheduler = null;
      if (index !== -1) {
        actions.splice(index, 1);
      }
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, null);
      }
    };
    return AsyncAction;
  }(Action_1.Action);
  exports.AsyncAction = AsyncAction;
});
System.registerDynamic("npm:rxjs@5.2.0/Scheduler.js", ["github:jspm/nodelibs-process@0.1.2.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    "use strict";

    var Scheduler = function () {
      function Scheduler(SchedulerAction, now) {
        if (now === void 0) {
          now = Scheduler.now;
        }
        this.SchedulerAction = SchedulerAction;
        this.now = now;
      }
      Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) {
          delay = 0;
        }
        return new this.SchedulerAction(this, work).schedule(state, delay);
      };
      Scheduler.now = Date.now ? Date.now : function () {
        return +new Date();
      };
      return Scheduler;
    }();
    exports.Scheduler = Scheduler;
  })($__require("github:jspm/nodelibs-process@0.1.2.js"));
});
System.registerDynamic("npm:rxjs@5.2.0/scheduler/AsyncScheduler.js", ["npm:rxjs@5.2.0/Scheduler.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Scheduler_1 = $__require("npm:rxjs@5.2.0/Scheduler.js");
  var AsyncScheduler = function (_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler() {
      _super.apply(this, arguments);
      this.actions = [];
      this.active = false;
      this.scheduled = undefined;
    }
    AsyncScheduler.prototype.flush = function (action) {
      var actions = this.actions;
      if (this.active) {
        actions.push(action);
        return;
      }
      var error;
      this.active = true;
      do {
        if (error = action.execute(action.state, action.delay)) {
          break;
        }
      } while (action = actions.shift());
      this.active = false;
      if (error) {
        while (action = actions.shift()) {
          action.unsubscribe();
        }
        throw error;
      }
    };
    return AsyncScheduler;
  }(Scheduler_1.Scheduler);
  exports.AsyncScheduler = AsyncScheduler;
});
System.registerDynamic('npm:rxjs@5.2.0/scheduler/async.js', ['npm:rxjs@5.2.0/scheduler/AsyncAction.js', 'npm:rxjs@5.2.0/scheduler/AsyncScheduler.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var AsyncAction_1 = $__require('npm:rxjs@5.2.0/scheduler/AsyncAction.js');
  var AsyncScheduler_1 = $__require('npm:rxjs@5.2.0/scheduler/AsyncScheduler.js');
  exports.async = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
});
System.registerDynamic('npm:rxjs@5.2.0/observable/IntervalObservable.js', ['npm:rxjs@5.2.0/util/isNumeric.js', 'npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/scheduler/async.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var isNumeric_1 = $__require('npm:rxjs@5.2.0/util/isNumeric.js');
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var async_1 = $__require('npm:rxjs@5.2.0/scheduler/async.js');
  var IntervalObservable = function (_super) {
    __extends(IntervalObservable, _super);
    function IntervalObservable(period, scheduler) {
      if (period === void 0) {
        period = 0;
      }
      if (scheduler === void 0) {
        scheduler = async_1.async;
      }
      _super.call(this);
      this.period = period;
      this.scheduler = scheduler;
      if (!isNumeric_1.isNumeric(period) || period < 0) {
        this.period = 0;
      }
      if (!scheduler || typeof scheduler.schedule !== 'function') {
        this.scheduler = async_1.async;
      }
    }
    IntervalObservable.create = function (period, scheduler) {
      if (period === void 0) {
        period = 0;
      }
      if (scheduler === void 0) {
        scheduler = async_1.async;
      }
      return new IntervalObservable(period, scheduler);
    };
    IntervalObservable.dispatch = function (state) {
      var index = state.index,
          subscriber = state.subscriber,
          period = state.period;
      subscriber.next(index);
      if (subscriber.closed) {
        return;
      }
      state.index += 1;
      this.schedule(state, period);
    };
    IntervalObservable.prototype._subscribe = function (subscriber) {
      var index = 0;
      var period = this.period;
      var scheduler = this.scheduler;
      subscriber.add(scheduler.schedule(IntervalObservable.dispatch, period, {
        index: index,
        subscriber: subscriber,
        period: period
      }));
    };
    return IntervalObservable;
  }(Observable_1.Observable);
  exports.IntervalObservable = IntervalObservable;
});
System.registerDynamic("npm:rxjs@5.2.0/observable/interval.js", ["npm:rxjs@5.2.0/observable/IntervalObservable.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var IntervalObservable_1 = $__require("npm:rxjs@5.2.0/observable/IntervalObservable.js");
  exports.interval = IntervalObservable_1.IntervalObservable.create;
});
System.registerDynamic('npm:rxjs@5.2.0/add/observable/interval.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/observable/interval.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var interval_1 = $__require('npm:rxjs@5.2.0/observable/interval.js');
  Observable_1.Observable.interval = interval_1.interval;
});
System.registerDynamic("npm:rxjs@5.2.0/util/noop.js", [], true, function ($__require, exports, module) {
  /* */
  "use strict";
  /* tslint:disable:no-empty */

  var global = this || self,
      GLOBAL = global;
  function noop() {}
  exports.noop = noop;
  
});
System.registerDynamic('npm:rxjs@5.2.0/observable/NeverObservable.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/util/noop.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var noop_1 = $__require('npm:rxjs@5.2.0/util/noop.js');
  var NeverObservable = function (_super) {
    __extends(NeverObservable, _super);
    function NeverObservable() {
      _super.call(this);
    }
    NeverObservable.create = function () {
      return new NeverObservable();
    };
    NeverObservable.prototype._subscribe = function (subscriber) {
      noop_1.noop();
    };
    return NeverObservable;
  }(Observable_1.Observable);
  exports.NeverObservable = NeverObservable;
});
System.registerDynamic("npm:rxjs@5.2.0/observable/never.js", ["npm:rxjs@5.2.0/observable/NeverObservable.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var NeverObservable_1 = $__require("npm:rxjs@5.2.0/observable/NeverObservable.js");
  exports.never = NeverObservable_1.NeverObservable.create;
});
System.registerDynamic('npm:rxjs@5.2.0/add/observable/never.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/observable/never.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var never_1 = $__require('npm:rxjs@5.2.0/observable/never.js');
  Observable_1.Observable.never = never_1.never;
});
System.registerDynamic("npm:rxjs@5.2.0/observable/empty.js", ["npm:rxjs@5.2.0/observable/EmptyObservable.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var EmptyObservable_1 = $__require("npm:rxjs@5.2.0/observable/EmptyObservable.js");
  exports.empty = EmptyObservable_1.EmptyObservable.create;
});
System.registerDynamic('npm:rxjs@5.2.0/add/observable/empty.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/observable/empty.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var empty_1 = $__require('npm:rxjs@5.2.0/observable/empty.js');
  Observable_1.Observable.empty = empty_1.empty;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/merge.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/observable/ArrayObservable.js', 'npm:rxjs@5.2.0/operator/mergeAll.js', 'npm:rxjs@5.2.0/util/isScheduler.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var ArrayObservable_1 = $__require('npm:rxjs@5.2.0/observable/ArrayObservable.js');
  var mergeAll_1 = $__require('npm:rxjs@5.2.0/operator/mergeAll.js');
  var isScheduler_1 = $__require('npm:rxjs@5.2.0/util/isScheduler.js');
  function merge() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    return this.lift.call(mergeStatic.apply(void 0, [this].concat(observables)));
  }
  exports.merge = merge;
  function mergeStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    var concurrent = Number.POSITIVE_INFINITY;
    var scheduler = null;
    var last = observables[observables.length - 1];
    if (isScheduler_1.isScheduler(last)) {
      scheduler = observables.pop();
      if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
        concurrent = observables.pop();
      }
    } else if (typeof last === 'number') {
      concurrent = observables.pop();
    }
    if (scheduler === null && observables.length === 1 && observables[0] instanceof Observable_1.Observable) {
      return observables[0];
    }
    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new mergeAll_1.MergeAllOperator(concurrent));
  }
  exports.mergeStatic = mergeStatic;
});
System.registerDynamic("npm:rxjs@5.2.0/observable/merge.js", ["npm:rxjs@5.2.0/operator/merge.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var merge_1 = $__require("npm:rxjs@5.2.0/operator/merge.js");
  exports.merge = merge_1.mergeStatic;
});
System.registerDynamic('npm:rxjs@5.2.0/add/observable/merge.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/observable/merge.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var merge_1 = $__require('npm:rxjs@5.2.0/observable/merge.js');
  Observable_1.Observable.merge = merge_1.merge;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/mergeMap.js', ['npm:rxjs@5.2.0/util/subscribeToResult.js', 'npm:rxjs@5.2.0/OuterSubscriber.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var subscribeToResult_1 = $__require('npm:rxjs@5.2.0/util/subscribeToResult.js');
  var OuterSubscriber_1 = $__require('npm:rxjs@5.2.0/OuterSubscriber.js');
  function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) {
      concurrent = Number.POSITIVE_INFINITY;
    }
    if (typeof resultSelector === 'number') {
      concurrent = resultSelector;
      resultSelector = null;
    }
    return this.lift(new MergeMapOperator(project, resultSelector, concurrent));
  }
  exports.mergeMap = mergeMap;
  var MergeMapOperator = function () {
    function MergeMapOperator(project, resultSelector, concurrent) {
      if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
      }
      this.project = project;
      this.resultSelector = resultSelector;
      this.concurrent = concurrent;
    }
    MergeMapOperator.prototype.call = function (observer, source) {
      return source.subscribe(new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent));
    };
    return MergeMapOperator;
  }();
  exports.MergeMapOperator = MergeMapOperator;
  var MergeMapSubscriber = function (_super) {
    __extends(MergeMapSubscriber, _super);
    function MergeMapSubscriber(destination, project, resultSelector, concurrent) {
      if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
      }
      _super.call(this, destination);
      this.project = project;
      this.resultSelector = resultSelector;
      this.concurrent = concurrent;
      this.hasCompleted = false;
      this.buffer = [];
      this.active = 0;
      this.index = 0;
    }
    MergeMapSubscriber.prototype._next = function (value) {
      if (this.active < this.concurrent) {
        this._tryNext(value);
      } else {
        this.buffer.push(value);
      }
    };
    MergeMapSubscriber.prototype._tryNext = function (value) {
      var result;
      var index = this.index++;
      try {
        result = this.project(value, index);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this.active++;
      this._innerSub(result, value, index);
    };
    MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
      this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
    };
    MergeMapSubscriber.prototype._complete = function () {
      this.hasCompleted = true;
      if (this.active === 0 && this.buffer.length === 0) {
        this.destination.complete();
      }
    };
    MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      if (this.resultSelector) {
        this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);
      } else {
        this.destination.next(innerValue);
      }
    };
    MergeMapSubscriber.prototype._notifyResultSelector = function (outerValue, innerValue, outerIndex, innerIndex) {
      var result;
      try {
        result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this.destination.next(result);
    };
    MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
      var buffer = this.buffer;
      this.remove(innerSub);
      this.active--;
      if (buffer.length > 0) {
        this._next(buffer.shift());
      } else if (this.active === 0 && this.hasCompleted) {
        this.destination.complete();
      }
    };
    return MergeMapSubscriber;
  }(OuterSubscriber_1.OuterSubscriber);
  exports.MergeMapSubscriber = MergeMapSubscriber;
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/mergeMap.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/mergeMap.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var mergeMap_1 = $__require('npm:rxjs@5.2.0/operator/mergeMap.js');
  Observable_1.Observable.prototype.mergeMap = mergeMap_1.mergeMap;
  Observable_1.Observable.prototype.flatMap = mergeMap_1.mergeMap;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/map.js', ['npm:rxjs@5.2.0/Subscriber.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('npm:rxjs@5.2.0/Subscriber.js');
  function map(project, thisArg) {
    if (typeof project !== 'function') {
      throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
    }
    return this.lift(new MapOperator(project, thisArg));
  }
  exports.map = map;
  var MapOperator = function () {
    function MapOperator(project, thisArg) {
      this.project = project;
      this.thisArg = thisArg;
    }
    MapOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
    };
    return MapOperator;
  }();
  exports.MapOperator = MapOperator;
  var MapSubscriber = function (_super) {
    __extends(MapSubscriber, _super);
    function MapSubscriber(destination, project, thisArg) {
      _super.call(this, destination);
      this.project = project;
      this.count = 0;
      this.thisArg = thisArg || this;
    }
    MapSubscriber.prototype._next = function (value) {
      var result;
      try {
        result = this.project.call(this.thisArg, value, this.count++);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this.destination.next(result);
    };
    return MapSubscriber;
  }(Subscriber_1.Subscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/map.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/map.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var map_1 = $__require('npm:rxjs@5.2.0/operator/map.js');
  Observable_1.Observable.prototype.map = map_1.map;
});
System.registerDynamic("npm:rxjs@5.2.0/operator/scan.js", ["npm:rxjs@5.2.0/Subscriber.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require("npm:rxjs@5.2.0/Subscriber.js");
  function scan(accumulator, seed) {
    var hasSeed = false;
    if (arguments.length >= 2) {
      hasSeed = true;
    }
    return this.lift(new ScanOperator(accumulator, seed, hasSeed));
  }
  exports.scan = scan;
  var ScanOperator = function () {
    function ScanOperator(accumulator, seed, hasSeed) {
      if (hasSeed === void 0) {
        hasSeed = false;
      }
      this.accumulator = accumulator;
      this.seed = seed;
      this.hasSeed = hasSeed;
    }
    ScanOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
    };
    return ScanOperator;
  }();
  var ScanSubscriber = function (_super) {
    __extends(ScanSubscriber, _super);
    function ScanSubscriber(destination, accumulator, _seed, hasSeed) {
      _super.call(this, destination);
      this.accumulator = accumulator;
      this._seed = _seed;
      this.hasSeed = hasSeed;
      this.index = 0;
    }
    Object.defineProperty(ScanSubscriber.prototype, "seed", {
      get: function () {
        return this._seed;
      },
      set: function (value) {
        this.hasSeed = true;
        this._seed = value;
      },
      enumerable: true,
      configurable: true
    });
    ScanSubscriber.prototype._next = function (value) {
      if (!this.hasSeed) {
        this.seed = value;
        this.destination.next(value);
      } else {
        return this._tryNext(value);
      }
    };
    ScanSubscriber.prototype._tryNext = function (value) {
      var index = this.index++;
      var result;
      try {
        result = this.accumulator(this.seed, value, index);
      } catch (err) {
        this.destination.error(err);
      }
      this.seed = result;
      this.destination.next(result);
    };
    return ScanSubscriber;
  }(Subscriber_1.Subscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/scan.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/scan.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var scan_1 = $__require('npm:rxjs@5.2.0/operator/scan.js');
  Observable_1.Observable.prototype.scan = scan_1.scan;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/audit.js', ['npm:rxjs@5.2.0/util/tryCatch.js', 'npm:rxjs@5.2.0/util/errorObject.js', 'npm:rxjs@5.2.0/OuterSubscriber.js', 'npm:rxjs@5.2.0/util/subscribeToResult.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    "use strict";

    var __extends = this && this.__extends || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var tryCatch_1 = $__require('npm:rxjs@5.2.0/util/tryCatch.js');
    var errorObject_1 = $__require('npm:rxjs@5.2.0/util/errorObject.js');
    var OuterSubscriber_1 = $__require('npm:rxjs@5.2.0/OuterSubscriber.js');
    var subscribeToResult_1 = $__require('npm:rxjs@5.2.0/util/subscribeToResult.js');
    function audit(durationSelector) {
      return this.lift(new AuditOperator(durationSelector));
    }
    exports.audit = audit;
    var AuditOperator = function () {
      function AuditOperator(durationSelector) {
        this.durationSelector = durationSelector;
      }
      AuditOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new AuditSubscriber(subscriber, this.durationSelector));
      };
      return AuditOperator;
    }();
    var AuditSubscriber = function (_super) {
      __extends(AuditSubscriber, _super);
      function AuditSubscriber(destination, durationSelector) {
        _super.call(this, destination);
        this.durationSelector = durationSelector;
        this.hasValue = false;
      }
      AuditSubscriber.prototype._next = function (value) {
        this.value = value;
        this.hasValue = true;
        if (!this.throttled) {
          var duration = tryCatch_1.tryCatch(this.durationSelector)(value);
          if (duration === errorObject_1.errorObject) {
            this.destination.error(errorObject_1.errorObject.e);
          } else {
            this.add(this.throttled = subscribeToResult_1.subscribeToResult(this, duration));
          }
        }
      };
      AuditSubscriber.prototype.clearThrottle = function () {
        var _a = this,
            value = _a.value,
            hasValue = _a.hasValue,
            throttled = _a.throttled;
        if (throttled) {
          this.remove(throttled);
          this.throttled = null;
          throttled.unsubscribe();
        }
        if (hasValue) {
          this.value = null;
          this.hasValue = false;
          this.destination.next(value);
        }
      };
      AuditSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
        this.clearThrottle();
      };
      AuditSubscriber.prototype.notifyComplete = function () {
        this.clearThrottle();
      };
      return AuditSubscriber;
    }(OuterSubscriber_1.OuterSubscriber);
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/audit.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/audit.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var audit_1 = $__require('npm:rxjs@5.2.0/operator/audit.js');
  Observable_1.Observable.prototype.audit = audit_1.audit;
});
System.registerDynamic("npm:rxjs@5.2.0/operator/count.js", ["npm:rxjs@5.2.0/Subscriber.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require("npm:rxjs@5.2.0/Subscriber.js");
  function count(predicate) {
    return this.lift(new CountOperator(predicate, this));
  }
  exports.count = count;
  var CountOperator = function () {
    function CountOperator(predicate, source) {
      this.predicate = predicate;
      this.source = source;
    }
    CountOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new CountSubscriber(subscriber, this.predicate, this.source));
    };
    return CountOperator;
  }();
  var CountSubscriber = function (_super) {
    __extends(CountSubscriber, _super);
    function CountSubscriber(destination, predicate, source) {
      _super.call(this, destination);
      this.predicate = predicate;
      this.source = source;
      this.count = 0;
      this.index = 0;
    }
    CountSubscriber.prototype._next = function (value) {
      if (this.predicate) {
        this._tryPredicate(value);
      } else {
        this.count++;
      }
    };
    CountSubscriber.prototype._tryPredicate = function (value) {
      var result;
      try {
        result = this.predicate(value, this.index++, this.source);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      if (result) {
        this.count++;
      }
    };
    CountSubscriber.prototype._complete = function () {
      this.destination.next(this.count);
      this.destination.complete();
    };
    return CountSubscriber;
  }(Subscriber_1.Subscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/count.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/count.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var count_1 = $__require('npm:rxjs@5.2.0/operator/count.js');
  Observable_1.Observable.prototype.count = count_1.count;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/materialize.js', ['npm:rxjs@5.2.0/Subscriber.js', 'npm:rxjs@5.2.0/Notification.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('npm:rxjs@5.2.0/Subscriber.js');
  var Notification_1 = $__require('npm:rxjs@5.2.0/Notification.js');
  function materialize() {
    return this.lift(new MaterializeOperator());
  }
  exports.materialize = materialize;
  var MaterializeOperator = function () {
    function MaterializeOperator() {}
    MaterializeOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new MaterializeSubscriber(subscriber));
    };
    return MaterializeOperator;
  }();
  var MaterializeSubscriber = function (_super) {
    __extends(MaterializeSubscriber, _super);
    function MaterializeSubscriber(destination) {
      _super.call(this, destination);
    }
    MaterializeSubscriber.prototype._next = function (value) {
      this.destination.next(Notification_1.Notification.createNext(value));
    };
    MaterializeSubscriber.prototype._error = function (err) {
      var destination = this.destination;
      destination.next(Notification_1.Notification.createError(err));
      destination.complete();
    };
    MaterializeSubscriber.prototype._complete = function () {
      var destination = this.destination;
      destination.next(Notification_1.Notification.createComplete());
      destination.complete();
    };
    return MaterializeSubscriber;
  }(Subscriber_1.Subscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/materialize.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/materialize.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var materialize_1 = $__require('npm:rxjs@5.2.0/operator/materialize.js');
  Observable_1.Observable.prototype.materialize = materialize_1.materialize;
});
System.registerDynamic("npm:rxjs@5.2.0/operator/dematerialize.js", ["npm:rxjs@5.2.0/Subscriber.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require("npm:rxjs@5.2.0/Subscriber.js");
  function dematerialize() {
    return this.lift(new DeMaterializeOperator());
  }
  exports.dematerialize = dematerialize;
  var DeMaterializeOperator = function () {
    function DeMaterializeOperator() {}
    DeMaterializeOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new DeMaterializeSubscriber(subscriber));
    };
    return DeMaterializeOperator;
  }();
  var DeMaterializeSubscriber = function (_super) {
    __extends(DeMaterializeSubscriber, _super);
    function DeMaterializeSubscriber(destination) {
      _super.call(this, destination);
    }
    DeMaterializeSubscriber.prototype._next = function (value) {
      value.observe(this.destination);
    };
    return DeMaterializeSubscriber;
  }(Subscriber_1.Subscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/dematerialize.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/dematerialize.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var dematerialize_1 = $__require('npm:rxjs@5.2.0/operator/dematerialize.js');
  Observable_1.Observable.prototype.dematerialize = dematerialize_1.dematerialize;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/mergeScan.js', ['npm:rxjs@5.2.0/util/tryCatch.js', 'npm:rxjs@5.2.0/util/errorObject.js', 'npm:rxjs@5.2.0/util/subscribeToResult.js', 'npm:rxjs@5.2.0/OuterSubscriber.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var tryCatch_1 = $__require('npm:rxjs@5.2.0/util/tryCatch.js');
  var errorObject_1 = $__require('npm:rxjs@5.2.0/util/errorObject.js');
  var subscribeToResult_1 = $__require('npm:rxjs@5.2.0/util/subscribeToResult.js');
  var OuterSubscriber_1 = $__require('npm:rxjs@5.2.0/OuterSubscriber.js');
  function mergeScan(accumulator, seed, concurrent) {
    if (concurrent === void 0) {
      concurrent = Number.POSITIVE_INFINITY;
    }
    return this.lift(new MergeScanOperator(accumulator, seed, concurrent));
  }
  exports.mergeScan = mergeScan;
  var MergeScanOperator = function () {
    function MergeScanOperator(accumulator, seed, concurrent) {
      this.accumulator = accumulator;
      this.seed = seed;
      this.concurrent = concurrent;
    }
    MergeScanOperator.prototype.call = function (subscriber, source) {
      return source.subscribe(new MergeScanSubscriber(subscriber, this.accumulator, this.seed, this.concurrent));
    };
    return MergeScanOperator;
  }();
  exports.MergeScanOperator = MergeScanOperator;
  var MergeScanSubscriber = function (_super) {
    __extends(MergeScanSubscriber, _super);
    function MergeScanSubscriber(destination, accumulator, acc, concurrent) {
      _super.call(this, destination);
      this.accumulator = accumulator;
      this.acc = acc;
      this.concurrent = concurrent;
      this.hasValue = false;
      this.hasCompleted = false;
      this.buffer = [];
      this.active = 0;
      this.index = 0;
    }
    MergeScanSubscriber.prototype._next = function (value) {
      if (this.active < this.concurrent) {
        var index = this.index++;
        var ish = tryCatch_1.tryCatch(this.accumulator)(this.acc, value);
        var destination = this.destination;
        if (ish === errorObject_1.errorObject) {
          destination.error(errorObject_1.errorObject.e);
        } else {
          this.active++;
          this._innerSub(ish, value, index);
        }
      } else {
        this.buffer.push(value);
      }
    };
    MergeScanSubscriber.prototype._innerSub = function (ish, value, index) {
      this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
    };
    MergeScanSubscriber.prototype._complete = function () {
      this.hasCompleted = true;
      if (this.active === 0 && this.buffer.length === 0) {
        if (this.hasValue === false) {
          this.destination.next(this.acc);
        }
        this.destination.complete();
      }
    };
    MergeScanSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      var destination = this.destination;
      this.acc = innerValue;
      this.hasValue = true;
      destination.next(innerValue);
    };
    MergeScanSubscriber.prototype.notifyComplete = function (innerSub) {
      var buffer = this.buffer;
      this.remove(innerSub);
      this.active--;
      if (buffer.length > 0) {
        this._next(buffer.shift());
      } else if (this.active === 0 && this.hasCompleted) {
        if (this.hasValue === false) {
          this.destination.next(this.acc);
        }
        this.destination.complete();
      }
    };
    return MergeScanSubscriber;
  }(OuterSubscriber_1.OuterSubscriber);
  exports.MergeScanSubscriber = MergeScanSubscriber;
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/mergeScan.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/mergeScan.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var mergeScan_1 = $__require('npm:rxjs@5.2.0/operator/mergeScan.js');
  Observable_1.Observable.prototype.mergeScan = mergeScan_1.mergeScan;
});
System.registerDynamic('npm:rxjs@5.2.0/util/ObjectUnsubscribedError.js', [], true, function ($__require, exports, module) {
    /* */
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    /**
     * An error thrown when an action is invalid because the object has been
     * unsubscribed.
     *
     * @see {@link Subject}
     * @see {@link BehaviorSubject}
     *
     * @class ObjectUnsubscribedError
     */
    var ObjectUnsubscribedError = function (_super) {
        __extends(ObjectUnsubscribedError, _super);
        function ObjectUnsubscribedError() {
            var err = _super.call(this, 'object unsubscribed');
            this.name = err.name = 'ObjectUnsubscribedError';
            this.stack = err.stack;
            this.message = err.message;
        }
        return ObjectUnsubscribedError;
    }(Error);
    exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
    
});
System.registerDynamic("npm:rxjs@5.2.0/SubjectSubscription.js", ["npm:rxjs@5.2.0/Subscription.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscription_1 = $__require("npm:rxjs@5.2.0/Subscription.js");
  var SubjectSubscription = function (_super) {
    __extends(SubjectSubscription, _super);
    function SubjectSubscription(subject, subscriber) {
      _super.call(this);
      this.subject = subject;
      this.subscriber = subscriber;
      this.closed = false;
    }
    SubjectSubscription.prototype.unsubscribe = function () {
      if (this.closed) {
        return;
      }
      this.closed = true;
      var subject = this.subject;
      var observers = subject.observers;
      this.subject = null;
      if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
        return;
      }
      var subscriberIndex = observers.indexOf(this.subscriber);
      if (subscriberIndex !== -1) {
        observers.splice(subscriberIndex, 1);
      }
    };
    return SubjectSubscription;
  }(Subscription_1.Subscription);
  exports.SubjectSubscription = SubjectSubscription;
});
System.registerDynamic('npm:rxjs@5.2.0/Subject.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/Subscriber.js', 'npm:rxjs@5.2.0/Subscription.js', 'npm:rxjs@5.2.0/util/ObjectUnsubscribedError.js', 'npm:rxjs@5.2.0/SubjectSubscription.js', 'npm:rxjs@5.2.0/symbol/rxSubscriber.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var Subscriber_1 = $__require('npm:rxjs@5.2.0/Subscriber.js');
  var Subscription_1 = $__require('npm:rxjs@5.2.0/Subscription.js');
  var ObjectUnsubscribedError_1 = $__require('npm:rxjs@5.2.0/util/ObjectUnsubscribedError.js');
  var SubjectSubscription_1 = $__require('npm:rxjs@5.2.0/SubjectSubscription.js');
  var rxSubscriber_1 = $__require('npm:rxjs@5.2.0/symbol/rxSubscriber.js');
  var SubjectSubscriber = function (_super) {
    __extends(SubjectSubscriber, _super);
    function SubjectSubscriber(destination) {
      _super.call(this, destination);
      this.destination = destination;
    }
    return SubjectSubscriber;
  }(Subscriber_1.Subscriber);
  exports.SubjectSubscriber = SubjectSubscriber;
  var Subject = function (_super) {
    __extends(Subject, _super);
    function Subject() {
      _super.call(this);
      this.observers = [];
      this.closed = false;
      this.isStopped = false;
      this.hasError = false;
      this.thrownError = null;
    }
    Subject.prototype[rxSubscriber_1.$$rxSubscriber] = function () {
      return new SubjectSubscriber(this);
    };
    Subject.prototype.lift = function (operator) {
      var subject = new AnonymousSubject(this, this);
      subject.operator = operator;
      return subject;
    };
    Subject.prototype.next = function (value) {
      if (this.closed) {
        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
      }
      if (!this.isStopped) {
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
          copy[i].next(value);
        }
      }
    };
    Subject.prototype.error = function (err) {
      if (this.closed) {
        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
      }
      this.hasError = true;
      this.thrownError = err;
      this.isStopped = true;
      var observers = this.observers;
      var len = observers.length;
      var copy = observers.slice();
      for (var i = 0; i < len; i++) {
        copy[i].error(err);
      }
      this.observers.length = 0;
    };
    Subject.prototype.complete = function () {
      if (this.closed) {
        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
      }
      this.isStopped = true;
      var observers = this.observers;
      var len = observers.length;
      var copy = observers.slice();
      for (var i = 0; i < len; i++) {
        copy[i].complete();
      }
      this.observers.length = 0;
    };
    Subject.prototype.unsubscribe = function () {
      this.isStopped = true;
      this.closed = true;
      this.observers = null;
    };
    Subject.prototype._trySubscribe = function (subscriber) {
      if (this.closed) {
        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
      } else {
        return _super.prototype._trySubscribe.call(this, subscriber);
      }
    };
    Subject.prototype._subscribe = function (subscriber) {
      if (this.closed) {
        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
      } else if (this.hasError) {
        subscriber.error(this.thrownError);
        return Subscription_1.Subscription.EMPTY;
      } else if (this.isStopped) {
        subscriber.complete();
        return Subscription_1.Subscription.EMPTY;
      } else {
        this.observers.push(subscriber);
        return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
      }
    };
    Subject.prototype.asObservable = function () {
      var observable = new Observable_1.Observable();
      observable.source = this;
      return observable;
    };
    Subject.create = function (destination, source) {
      return new AnonymousSubject(destination, source);
    };
    return Subject;
  }(Observable_1.Observable);
  exports.Subject = Subject;
  var AnonymousSubject = function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
      _super.call(this);
      this.destination = destination;
      this.source = source;
    }
    AnonymousSubject.prototype.next = function (value) {
      var destination = this.destination;
      if (destination && destination.next) {
        destination.next(value);
      }
    };
    AnonymousSubject.prototype.error = function (err) {
      var destination = this.destination;
      if (destination && destination.error) {
        this.destination.error(err);
      }
    };
    AnonymousSubject.prototype.complete = function () {
      var destination = this.destination;
      if (destination && destination.complete) {
        this.destination.complete();
      }
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
      var source = this.source;
      if (source) {
        return this.source.subscribe(subscriber);
      } else {
        return Subscription_1.Subscription.EMPTY;
      }
    };
    return AnonymousSubject;
  }(Subject);
  exports.AnonymousSubject = AnonymousSubject;
});
System.registerDynamic('npm:rxjs@5.2.0/observable/ConnectableObservable.js', ['npm:rxjs@5.2.0/Subject.js', 'npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/Subscriber.js', 'npm:rxjs@5.2.0/Subscription.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subject_1 = $__require('npm:rxjs@5.2.0/Subject.js');
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var Subscriber_1 = $__require('npm:rxjs@5.2.0/Subscriber.js');
  var Subscription_1 = $__require('npm:rxjs@5.2.0/Subscription.js');
  var ConnectableObservable = function (_super) {
    __extends(ConnectableObservable, _super);
    function ConnectableObservable(source, subjectFactory) {
      _super.call(this);
      this.source = source;
      this.subjectFactory = subjectFactory;
      this._refCount = 0;
    }
    ConnectableObservable.prototype._subscribe = function (subscriber) {
      return this.getSubject().subscribe(subscriber);
    };
    ConnectableObservable.prototype.getSubject = function () {
      var subject = this._subject;
      if (!subject || subject.isStopped) {
        this._subject = this.subjectFactory();
      }
      return this._subject;
    };
    ConnectableObservable.prototype.connect = function () {
      var connection = this._connection;
      if (!connection) {
        connection = this._connection = new Subscription_1.Subscription();
        connection.add(this.source.subscribe(new ConnectableSubscriber(this.getSubject(), this)));
        if (connection.closed) {
          this._connection = null;
          connection = Subscription_1.Subscription.EMPTY;
        } else {
          this._connection = connection;
        }
      }
      return connection;
    };
    ConnectableObservable.prototype.refCount = function () {
      return this.lift(new RefCountOperator(this));
    };
    return ConnectableObservable;
  }(Observable_1.Observable);
  exports.ConnectableObservable = ConnectableObservable;
  exports.connectableObservableDescriptor = {
    operator: { value: null },
    _refCount: {
      value: 0,
      writable: true
    },
    _subscribe: { value: ConnectableObservable.prototype._subscribe },
    getSubject: { value: ConnectableObservable.prototype.getSubject },
    connect: { value: ConnectableObservable.prototype.connect },
    refCount: { value: ConnectableObservable.prototype.refCount }
  };
  var ConnectableSubscriber = function (_super) {
    __extends(ConnectableSubscriber, _super);
    function ConnectableSubscriber(destination, connectable) {
      _super.call(this, destination);
      this.connectable = connectable;
    }
    ConnectableSubscriber.prototype._error = function (err) {
      this._unsubscribe();
      _super.prototype._error.call(this, err);
    };
    ConnectableSubscriber.prototype._complete = function () {
      this._unsubscribe();
      _super.prototype._complete.call(this);
    };
    ConnectableSubscriber.prototype._unsubscribe = function () {
      var connectable = this.connectable;
      if (connectable) {
        this.connectable = null;
        var connection = connectable._connection;
        connectable._refCount = 0;
        connectable._subject = null;
        connectable._connection = null;
        if (connection) {
          connection.unsubscribe();
        }
      }
    };
    return ConnectableSubscriber;
  }(Subject_1.SubjectSubscriber);
  var RefCountOperator = function () {
    function RefCountOperator(connectable) {
      this.connectable = connectable;
    }
    RefCountOperator.prototype.call = function (subscriber, source) {
      var connectable = this.connectable;
      connectable._refCount++;
      var refCounter = new RefCountSubscriber(subscriber, connectable);
      var subscription = source.subscribe(refCounter);
      if (!refCounter.closed) {
        refCounter.connection = connectable.connect();
      }
      return subscription;
    };
    return RefCountOperator;
  }();
  var RefCountSubscriber = function (_super) {
    __extends(RefCountSubscriber, _super);
    function RefCountSubscriber(destination, connectable) {
      _super.call(this, destination);
      this.connectable = connectable;
    }
    RefCountSubscriber.prototype._unsubscribe = function () {
      var connectable = this.connectable;
      if (!connectable) {
        this.connection = null;
        return;
      }
      this.connectable = null;
      var refCount = connectable._refCount;
      if (refCount <= 0) {
        this.connection = null;
        return;
      }
      connectable._refCount = refCount - 1;
      if (refCount > 1) {
        this.connection = null;
        return;
      }
      var connection = this.connection;
      var sharedConnection = connectable._connection;
      this.connection = null;
      if (sharedConnection && (!connection || sharedConnection === connection)) {
        sharedConnection.unsubscribe();
      }
    };
    return RefCountSubscriber;
  }(Subscriber_1.Subscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/operator/multicast.js', ['npm:rxjs@5.2.0/observable/ConnectableObservable.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var ConnectableObservable_1 = $__require('npm:rxjs@5.2.0/observable/ConnectableObservable.js');
  function multicast(subjectOrSubjectFactory, selector) {
    var subjectFactory;
    if (typeof subjectOrSubjectFactory === 'function') {
      subjectFactory = subjectOrSubjectFactory;
    } else {
      subjectFactory = function subjectFactory() {
        return subjectOrSubjectFactory;
      };
    }
    if (typeof selector === 'function') {
      return this.lift(new MulticastOperator(subjectFactory, selector));
    }
    var connectable = Object.create(this, ConnectableObservable_1.connectableObservableDescriptor);
    connectable.source = this;
    connectable.subjectFactory = subjectFactory;
    return connectable;
  }
  exports.multicast = multicast;
  var MulticastOperator = function () {
    function MulticastOperator(subjectFactory, selector) {
      this.subjectFactory = subjectFactory;
      this.selector = selector;
    }
    MulticastOperator.prototype.call = function (subscriber, source) {
      var selector = this.selector;
      var subject = this.subjectFactory();
      var subscription = selector(subject).subscribe(subscriber);
      subscription.add(source.subscribe(subject));
      return subscription;
    };
    return MulticastOperator;
  }();
  exports.MulticastOperator = MulticastOperator;
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/multicast.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/multicast.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var multicast_1 = $__require('npm:rxjs@5.2.0/operator/multicast.js');
  Observable_1.Observable.prototype.multicast = multicast_1.multicast;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/find.js', ['npm:rxjs@5.2.0/Subscriber.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('npm:rxjs@5.2.0/Subscriber.js');
  function find(predicate, thisArg) {
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate is not a function');
    }
    return this.lift(new FindValueOperator(predicate, this, false, thisArg));
  }
  exports.find = find;
  var FindValueOperator = function () {
    function FindValueOperator(predicate, source, yieldIndex, thisArg) {
      this.predicate = predicate;
      this.source = source;
      this.yieldIndex = yieldIndex;
      this.thisArg = thisArg;
    }
    FindValueOperator.prototype.call = function (observer, source) {
      return source.subscribe(new FindValueSubscriber(observer, this.predicate, this.source, this.yieldIndex, this.thisArg));
    };
    return FindValueOperator;
  }();
  exports.FindValueOperator = FindValueOperator;
  var FindValueSubscriber = function (_super) {
    __extends(FindValueSubscriber, _super);
    function FindValueSubscriber(destination, predicate, source, yieldIndex, thisArg) {
      _super.call(this, destination);
      this.predicate = predicate;
      this.source = source;
      this.yieldIndex = yieldIndex;
      this.thisArg = thisArg;
      this.index = 0;
    }
    FindValueSubscriber.prototype.notifyComplete = function (value) {
      var destination = this.destination;
      destination.next(value);
      destination.complete();
    };
    FindValueSubscriber.prototype._next = function (value) {
      var _a = this,
          predicate = _a.predicate,
          thisArg = _a.thisArg;
      var index = this.index++;
      try {
        var result = predicate.call(thisArg || this, value, index, this.source);
        if (result) {
          this.notifyComplete(this.yieldIndex ? index : value);
        }
      } catch (err) {
        this.destination.error(err);
      }
    };
    FindValueSubscriber.prototype._complete = function () {
      this.notifyComplete(this.yieldIndex ? -1 : undefined);
    };
    return FindValueSubscriber;
  }(Subscriber_1.Subscriber);
  exports.FindValueSubscriber = FindValueSubscriber;
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/find.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/find.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var find_1 = $__require('npm:rxjs@5.2.0/operator/find.js');
  Observable_1.Observable.prototype.find = find_1.find;
});
System.registerDynamic("npm:rxjs@5.2.0/observable/ScalarObservable.js", ["npm:rxjs@5.2.0/Observable.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require("npm:rxjs@5.2.0/Observable.js");
  var ScalarObservable = function (_super) {
    __extends(ScalarObservable, _super);
    function ScalarObservable(value, scheduler) {
      _super.call(this);
      this.value = value;
      this.scheduler = scheduler;
      this._isScalar = true;
      if (scheduler) {
        this._isScalar = false;
      }
    }
    ScalarObservable.create = function (value, scheduler) {
      return new ScalarObservable(value, scheduler);
    };
    ScalarObservable.dispatch = function (state) {
      var done = state.done,
          value = state.value,
          subscriber = state.subscriber;
      if (done) {
        subscriber.complete();
        return;
      }
      subscriber.next(value);
      if (subscriber.closed) {
        return;
      }
      state.done = true;
      this.schedule(state);
    };
    ScalarObservable.prototype._subscribe = function (subscriber) {
      var value = this.value;
      var scheduler = this.scheduler;
      if (scheduler) {
        return scheduler.schedule(ScalarObservable.dispatch, 0, {
          done: false,
          value: value,
          subscriber: subscriber
        });
      } else {
        subscriber.next(value);
        if (!subscriber.closed) {
          subscriber.complete();
        }
      }
    };
    return ScalarObservable;
  }(Observable_1.Observable);
  exports.ScalarObservable = ScalarObservable;
});
System.registerDynamic("npm:rxjs@5.2.0/observable/EmptyObservable.js", ["npm:rxjs@5.2.0/Observable.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require("npm:rxjs@5.2.0/Observable.js");
  var EmptyObservable = function (_super) {
    __extends(EmptyObservable, _super);
    function EmptyObservable(scheduler) {
      _super.call(this);
      this.scheduler = scheduler;
    }
    EmptyObservable.create = function (scheduler) {
      return new EmptyObservable(scheduler);
    };
    EmptyObservable.dispatch = function (arg) {
      var subscriber = arg.subscriber;
      subscriber.complete();
    };
    EmptyObservable.prototype._subscribe = function (subscriber) {
      var scheduler = this.scheduler;
      if (scheduler) {
        return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber });
      } else {
        subscriber.complete();
      }
    };
    return EmptyObservable;
  }(Observable_1.Observable);
  exports.EmptyObservable = EmptyObservable;
});
System.registerDynamic("npm:rxjs@5.2.0/util/isScheduler.js", [], true, function ($__require, exports, module) {
    /* */
    "use strict";

    var global = this || self,
        GLOBAL = global;
    function isScheduler(value) {
        return value && typeof value.schedule === 'function';
    }
    exports.isScheduler = isScheduler;
    
});
System.registerDynamic('npm:rxjs@5.2.0/observable/ArrayObservable.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/observable/ScalarObservable.js', 'npm:rxjs@5.2.0/observable/EmptyObservable.js', 'npm:rxjs@5.2.0/util/isScheduler.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var ScalarObservable_1 = $__require('npm:rxjs@5.2.0/observable/ScalarObservable.js');
  var EmptyObservable_1 = $__require('npm:rxjs@5.2.0/observable/EmptyObservable.js');
  var isScheduler_1 = $__require('npm:rxjs@5.2.0/util/isScheduler.js');
  var ArrayObservable = function (_super) {
    __extends(ArrayObservable, _super);
    function ArrayObservable(array, scheduler) {
      _super.call(this);
      this.array = array;
      this.scheduler = scheduler;
      if (!scheduler && array.length === 1) {
        this._isScalar = true;
        this.value = array[0];
      }
    }
    ArrayObservable.create = function (array, scheduler) {
      return new ArrayObservable(array, scheduler);
    };
    ArrayObservable.of = function () {
      var array = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        array[_i - 0] = arguments[_i];
      }
      var scheduler = array[array.length - 1];
      if (isScheduler_1.isScheduler(scheduler)) {
        array.pop();
      } else {
        scheduler = null;
      }
      var len = array.length;
      if (len > 1) {
        return new ArrayObservable(array, scheduler);
      } else if (len === 1) {
        return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
      } else {
        return new EmptyObservable_1.EmptyObservable(scheduler);
      }
    };
    ArrayObservable.dispatch = function (state) {
      var array = state.array,
          index = state.index,
          count = state.count,
          subscriber = state.subscriber;
      if (index >= count) {
        subscriber.complete();
        return;
      }
      subscriber.next(array[index]);
      if (subscriber.closed) {
        return;
      }
      state.index = index + 1;
      this.schedule(state);
    };
    ArrayObservable.prototype._subscribe = function (subscriber) {
      var index = 0;
      var array = this.array;
      var count = array.length;
      var scheduler = this.scheduler;
      if (scheduler) {
        return scheduler.schedule(ArrayObservable.dispatch, 0, {
          array: array,
          index: index,
          count: count,
          subscriber: subscriber
        });
      } else {
        for (var i = 0; i < count && !subscriber.closed; i++) {
          subscriber.next(array[i]);
        }
        subscriber.complete();
      }
    };
    return ArrayObservable;
  }(Observable_1.Observable);
  exports.ArrayObservable = ArrayObservable;
});
System.registerDynamic("npm:rxjs@5.2.0/OuterSubscriber.js", ["npm:rxjs@5.2.0/Subscriber.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require("npm:rxjs@5.2.0/Subscriber.js");
  var OuterSubscriber = function (_super) {
    __extends(OuterSubscriber, _super);
    function OuterSubscriber() {
      _super.apply(this, arguments);
    }
    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.destination.next(innerValue);
    };
    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
      this.destination.error(error);
    };
    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
      this.destination.complete();
    };
    return OuterSubscriber;
  }(Subscriber_1.Subscriber);
  exports.OuterSubscriber = OuterSubscriber;
});
System.registerDynamic("npm:rxjs@5.2.0/util/isArrayLike.js", [], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.isArrayLike = function (x) {
    return x && typeof x.length === 'number';
  };
  
});
System.registerDynamic('npm:rxjs@5.2.0/util/isPromise.js', [], true, function ($__require, exports, module) {
    /* */
    "use strict";

    var global = this || self,
        GLOBAL = global;
    function isPromise(value) {
        return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
    }
    exports.isPromise = isPromise;
    
});
System.registerDynamic('npm:rxjs@5.2.0/symbol/iterator.js', ['npm:rxjs@5.2.0/util/root.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var root_1 = $__require('npm:rxjs@5.2.0/util/root.js');
  function symbolIteratorPonyfill(root) {
    var Symbol = root.Symbol;
    if (typeof Symbol === 'function') {
      if (!Symbol.iterator) {
        Symbol.iterator = Symbol('iterator polyfill');
      }
      return Symbol.iterator;
    } else {
      var Set_1 = root.Set;
      if (Set_1 && typeof new Set_1()['@@iterator'] === 'function') {
        return '@@iterator';
      }
      var Map_1 = root.Map;
      if (Map_1) {
        var keys = Object.getOwnPropertyNames(Map_1.prototype);
        for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          if (key !== 'entries' && key !== 'size' && Map_1.prototype[key] === Map_1.prototype['entries']) {
            return key;
          }
        }
      }
      return '@@iterator';
    }
  }
  exports.symbolIteratorPonyfill = symbolIteratorPonyfill;
  exports.$$iterator = symbolIteratorPonyfill(root_1.root);
});
System.registerDynamic("npm:rxjs@5.2.0/InnerSubscriber.js", ["npm:rxjs@5.2.0/Subscriber.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require("npm:rxjs@5.2.0/Subscriber.js");
  var InnerSubscriber = function (_super) {
    __extends(InnerSubscriber, _super);
    function InnerSubscriber(parent, outerValue, outerIndex) {
      _super.call(this);
      this.parent = parent;
      this.outerValue = outerValue;
      this.outerIndex = outerIndex;
      this.index = 0;
    }
    InnerSubscriber.prototype._next = function (value) {
      this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    };
    InnerSubscriber.prototype._error = function (error) {
      this.parent.notifyError(error, this);
      this.unsubscribe();
    };
    InnerSubscriber.prototype._complete = function () {
      this.parent.notifyComplete(this);
      this.unsubscribe();
    };
    return InnerSubscriber;
  }(Subscriber_1.Subscriber);
  exports.InnerSubscriber = InnerSubscriber;
});
System.registerDynamic('npm:rxjs@5.2.0/util/subscribeToResult.js', ['npm:rxjs@5.2.0/util/root.js', 'npm:rxjs@5.2.0/util/isArrayLike.js', 'npm:rxjs@5.2.0/util/isPromise.js', 'npm:rxjs@5.2.0/util/isObject.js', 'npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/symbol/iterator.js', 'npm:rxjs@5.2.0/InnerSubscriber.js', 'npm:rxjs@5.2.0/symbol/observable.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var root_1 = $__require('npm:rxjs@5.2.0/util/root.js');
  var isArrayLike_1 = $__require('npm:rxjs@5.2.0/util/isArrayLike.js');
  var isPromise_1 = $__require('npm:rxjs@5.2.0/util/isPromise.js');
  var isObject_1 = $__require('npm:rxjs@5.2.0/util/isObject.js');
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var iterator_1 = $__require('npm:rxjs@5.2.0/symbol/iterator.js');
  var InnerSubscriber_1 = $__require('npm:rxjs@5.2.0/InnerSubscriber.js');
  var observable_1 = $__require('npm:rxjs@5.2.0/symbol/observable.js');
  function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    if (destination.closed) {
      return null;
    }
    if (result instanceof Observable_1.Observable) {
      if (result._isScalar) {
        destination.next(result.value);
        destination.complete();
        return null;
      } else {
        return result.subscribe(destination);
      }
    } else if (isArrayLike_1.isArrayLike(result)) {
      for (var i = 0, len = result.length; i < len && !destination.closed; i++) {
        destination.next(result[i]);
      }
      if (!destination.closed) {
        destination.complete();
      }
    } else if (isPromise_1.isPromise(result)) {
      result.then(function (value) {
        if (!destination.closed) {
          destination.next(value);
          destination.complete();
        }
      }, function (err) {
        return destination.error(err);
      }).then(null, function (err) {
        root_1.root.setTimeout(function () {
          throw err;
        });
      });
      return destination;
    } else if (result && typeof result[iterator_1.$$iterator] === 'function') {
      var iterator = result[iterator_1.$$iterator]();
      do {
        var item = iterator.next();
        if (item.done) {
          destination.complete();
          break;
        }
        destination.next(item.value);
        if (destination.closed) {
          break;
        }
      } while (true);
    } else if (result && typeof result[observable_1.$$observable] === 'function') {
      var obs = result[observable_1.$$observable]();
      if (typeof obs.subscribe !== 'function') {
        destination.error(new TypeError('Provided object does not correctly implement Symbol.observable'));
      } else {
        return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
      }
    } else {
      var value = isObject_1.isObject(result) ? 'an invalid object' : "'" + result + "'";
      var msg = "You provided " + value + " where a stream was expected." + ' You can provide an Observable, Promise, Array, or Iterable.';
      destination.error(new TypeError(msg));
    }
    return null;
  }
  exports.subscribeToResult = subscribeToResult;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/mergeAll.js', ['npm:rxjs@5.2.0/OuterSubscriber.js', 'npm:rxjs@5.2.0/util/subscribeToResult.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var OuterSubscriber_1 = $__require('npm:rxjs@5.2.0/OuterSubscriber.js');
  var subscribeToResult_1 = $__require('npm:rxjs@5.2.0/util/subscribeToResult.js');
  function mergeAll(concurrent) {
    if (concurrent === void 0) {
      concurrent = Number.POSITIVE_INFINITY;
    }
    return this.lift(new MergeAllOperator(concurrent));
  }
  exports.mergeAll = mergeAll;
  var MergeAllOperator = function () {
    function MergeAllOperator(concurrent) {
      this.concurrent = concurrent;
    }
    MergeAllOperator.prototype.call = function (observer, source) {
      return source.subscribe(new MergeAllSubscriber(observer, this.concurrent));
    };
    return MergeAllOperator;
  }();
  exports.MergeAllOperator = MergeAllOperator;
  var MergeAllSubscriber = function (_super) {
    __extends(MergeAllSubscriber, _super);
    function MergeAllSubscriber(destination, concurrent) {
      _super.call(this, destination);
      this.concurrent = concurrent;
      this.hasCompleted = false;
      this.buffer = [];
      this.active = 0;
    }
    MergeAllSubscriber.prototype._next = function (observable) {
      if (this.active < this.concurrent) {
        this.active++;
        this.add(subscribeToResult_1.subscribeToResult(this, observable));
      } else {
        this.buffer.push(observable);
      }
    };
    MergeAllSubscriber.prototype._complete = function () {
      this.hasCompleted = true;
      if (this.active === 0 && this.buffer.length === 0) {
        this.destination.complete();
      }
    };
    MergeAllSubscriber.prototype.notifyComplete = function (innerSub) {
      var buffer = this.buffer;
      this.remove(innerSub);
      this.active--;
      if (buffer.length > 0) {
        this._next(buffer.shift());
      } else if (this.active === 0 && this.hasCompleted) {
        this.destination.complete();
      }
    };
    return MergeAllSubscriber;
  }(OuterSubscriber_1.OuterSubscriber);
  exports.MergeAllSubscriber = MergeAllSubscriber;
});
System.registerDynamic('npm:rxjs@5.2.0/operator/concat.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/util/isScheduler.js', 'npm:rxjs@5.2.0/observable/ArrayObservable.js', 'npm:rxjs@5.2.0/operator/mergeAll.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var isScheduler_1 = $__require('npm:rxjs@5.2.0/util/isScheduler.js');
  var ArrayObservable_1 = $__require('npm:rxjs@5.2.0/observable/ArrayObservable.js');
  var mergeAll_1 = $__require('npm:rxjs@5.2.0/operator/mergeAll.js');
  function concat() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    return this.lift.call(concatStatic.apply(void 0, [this].concat(observables)));
  }
  exports.concat = concat;
  function concatStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    var scheduler = null;
    var args = observables;
    if (isScheduler_1.isScheduler(args[observables.length - 1])) {
      scheduler = args.pop();
    }
    if (scheduler === null && observables.length === 1 && observables[0] instanceof Observable_1.Observable) {
      return observables[0];
    }
    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new mergeAll_1.MergeAllOperator(1));
  }
  exports.concatStatic = concatStatic;
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/concat.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/concat.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var concat_1 = $__require('npm:rxjs@5.2.0/operator/concat.js');
  Observable_1.Observable.prototype.concat = concat_1.concat;
});
System.registerDynamic("npm:rxjs@5.2.0/operator/every.js", ["npm:rxjs@5.2.0/Subscriber.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require("npm:rxjs@5.2.0/Subscriber.js");
  function every(predicate, thisArg) {
    return this.lift(new EveryOperator(predicate, thisArg, this));
  }
  exports.every = every;
  var EveryOperator = function () {
    function EveryOperator(predicate, thisArg, source) {
      this.predicate = predicate;
      this.thisArg = thisArg;
      this.source = source;
    }
    EveryOperator.prototype.call = function (observer, source) {
      return source.subscribe(new EverySubscriber(observer, this.predicate, this.thisArg, this.source));
    };
    return EveryOperator;
  }();
  var EverySubscriber = function (_super) {
    __extends(EverySubscriber, _super);
    function EverySubscriber(destination, predicate, thisArg, source) {
      _super.call(this, destination);
      this.predicate = predicate;
      this.thisArg = thisArg;
      this.source = source;
      this.index = 0;
      this.thisArg = thisArg || this;
    }
    EverySubscriber.prototype.notifyComplete = function (everyValueMatch) {
      this.destination.next(everyValueMatch);
      this.destination.complete();
    };
    EverySubscriber.prototype._next = function (value) {
      var result = false;
      try {
        result = this.predicate.call(this.thisArg, value, this.index++, this.source);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      if (!result) {
        this.notifyComplete(false);
      }
    };
    EverySubscriber.prototype._complete = function () {
      this.notifyComplete(true);
    };
    return EverySubscriber;
  }(Subscriber_1.Subscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/add/operator/every.js', ['npm:rxjs@5.2.0/Observable.js', 'npm:rxjs@5.2.0/operator/every.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var every_1 = $__require('npm:rxjs@5.2.0/operator/every.js');
  Observable_1.Observable.prototype.every = every_1.every;
});
System.registerDynamic('npm:immutable@3.8.1/dist/immutable.js', [], true, function ($__require, exports, module) {
  /* */
  "format cjs";
  /**
   *  Copyright (c) 2014-2015, Facebook, Inc.
   *  All rights reserved.
   *
   *  This source code is licensed under the BSD-style license found in the
   *  LICENSE file in the root directory of this source tree. An additional grant
   *  of patent rights can be found in the PATENTS file in the same directory.
   */

  var global = this || self,
      GLOBAL = global;
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof undefined === 'function' && define.amd ? define(factory) : global.Immutable = factory();
  })(this, function () {
    'use strict';
    var SLICE$0 = Array.prototype.slice;

    function createClass(ctor, superClass) {
      if (superClass) {
        ctor.prototype = Object.create(superClass.prototype);
      }
      ctor.prototype.constructor = ctor;
    }

    function Iterable(value) {
      return isIterable(value) ? value : Seq(value);
    }

    createClass(KeyedIterable, Iterable);
    function KeyedIterable(value) {
      return isKeyed(value) ? value : KeyedSeq(value);
    }

    createClass(IndexedIterable, Iterable);
    function IndexedIterable(value) {
      return isIndexed(value) ? value : IndexedSeq(value);
    }

    createClass(SetIterable, Iterable);
    function SetIterable(value) {
      return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
    }

    function isIterable(maybeIterable) {
      return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
    }

    function isKeyed(maybeKeyed) {
      return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
    }

    function isIndexed(maybeIndexed) {
      return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
    }

    function isAssociative(maybeAssociative) {
      return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
    }

    function isOrdered(maybeOrdered) {
      return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
    }

    Iterable.isIterable = isIterable;
    Iterable.isKeyed = isKeyed;
    Iterable.isIndexed = isIndexed;
    Iterable.isAssociative = isAssociative;
    Iterable.isOrdered = isOrdered;

    Iterable.Keyed = KeyedIterable;
    Iterable.Indexed = IndexedIterable;
    Iterable.Set = SetIterable;

    var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
    var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
    var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
    var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

    // Used for setting prototype methods that IE8 chokes on.
    var DELETE = 'delete';

    // Constants describing the size of trie nodes.
    var SHIFT = 5; // Resulted in best performance after ______?
    var SIZE = 1 << SHIFT;
    var MASK = SIZE - 1;

    // A consistent shared value representing "not set" which equals nothing other
    // than itself, and nothing that could be provided externally.
    var NOT_SET = {};

    // Boolean references, Rough equivalent of `bool &`.
    var CHANGE_LENGTH = { value: false };
    var DID_ALTER = { value: false };

    function MakeRef(ref) {
      ref.value = false;
      return ref;
    }

    function SetRef(ref) {
      ref && (ref.value = true);
    }

    // A function which returns a value representing an "owner" for transient writes
    // to tries. The return value will only ever equal itself, and will not equal
    // the return of any subsequent call of this function.
    function OwnerID() {}

    // http://jsperf.com/copy-array-inline
    function arrCopy(arr, offset) {
      offset = offset || 0;
      var len = Math.max(0, arr.length - offset);
      var newArr = new Array(len);
      for (var ii = 0; ii < len; ii++) {
        newArr[ii] = arr[ii + offset];
      }
      return newArr;
    }

    function ensureSize(iter) {
      if (iter.size === undefined) {
        iter.size = iter.__iterate(returnTrue);
      }
      return iter.size;
    }

    function wrapIndex(iter, index) {
      // This implements "is array index" which the ECMAString spec defines as:
      //
      //     A String property name P is an array index if and only if
      //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
      //     to 2^32−1.
      //
      // http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
      if (typeof index !== 'number') {
        var uint32Index = index >>> 0; // N >>> 0 is shorthand for ToUint32
        if ('' + uint32Index !== index || uint32Index === 4294967295) {
          return NaN;
        }
        index = uint32Index;
      }
      return index < 0 ? ensureSize(iter) + index : index;
    }

    function returnTrue() {
      return true;
    }

    function wholeSlice(begin, end, size) {
      return (begin === 0 || size !== undefined && begin <= -size) && (end === undefined || size !== undefined && end >= size);
    }

    function resolveBegin(begin, size) {
      return resolveIndex(begin, size, 0);
    }

    function resolveEnd(end, size) {
      return resolveIndex(end, size, size);
    }

    function resolveIndex(index, size, defaultIndex) {
      return index === undefined ? defaultIndex : index < 0 ? Math.max(0, size + index) : size === undefined ? index : Math.min(size, index);
    }

    /* global Symbol */

    var ITERATE_KEYS = 0;
    var ITERATE_VALUES = 1;
    var ITERATE_ENTRIES = 2;

    var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator';

    var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;

    function Iterator(next) {
      this.next = next;
    }

    Iterator.prototype.toString = function () {
      return '[Iterator]';
    };

    Iterator.KEYS = ITERATE_KEYS;
    Iterator.VALUES = ITERATE_VALUES;
    Iterator.ENTRIES = ITERATE_ENTRIES;

    Iterator.prototype.inspect = Iterator.prototype.toSource = function () {
      return this.toString();
    };
    Iterator.prototype[ITERATOR_SYMBOL] = function () {
      return this;
    };

    function iteratorValue(type, k, v, iteratorResult) {
      var value = type === 0 ? k : type === 1 ? v : [k, v];
      iteratorResult ? iteratorResult.value = value : iteratorResult = {
        value: value, done: false
      };
      return iteratorResult;
    }

    function iteratorDone() {
      return { value: undefined, done: true };
    }

    function hasIterator(maybeIterable) {
      return !!getIteratorFn(maybeIterable);
    }

    function isIterator(maybeIterator) {
      return maybeIterator && typeof maybeIterator.next === 'function';
    }

    function getIterator(iterable) {
      var iteratorFn = getIteratorFn(iterable);
      return iteratorFn && iteratorFn.call(iterable);
    }

    function getIteratorFn(iterable) {
      var iteratorFn = iterable && (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL] || iterable[FAUX_ITERATOR_SYMBOL]);
      if (typeof iteratorFn === 'function') {
        return iteratorFn;
      }
    }

    function isArrayLike(value) {
      return value && typeof value.length === 'number';
    }

    createClass(Seq, Iterable);
    function Seq(value) {
      return value === null || value === undefined ? emptySequence() : isIterable(value) ? value.toSeq() : seqFromValue(value);
    }

    Seq.of = function () /*...values*/{
      return Seq(arguments);
    };

    Seq.prototype.toSeq = function () {
      return this;
    };

    Seq.prototype.toString = function () {
      return this.__toString('Seq {', '}');
    };

    Seq.prototype.cacheResult = function () {
      if (!this._cache && this.__iterateUncached) {
        this._cache = this.entrySeq().toArray();
        this.size = this._cache.length;
      }
      return this;
    };

    // abstract __iterateUncached(fn, reverse)

    Seq.prototype.__iterate = function (fn, reverse) {
      return seqIterate(this, fn, reverse, true);
    };

    // abstract __iteratorUncached(type, reverse)

    Seq.prototype.__iterator = function (type, reverse) {
      return seqIterator(this, type, reverse, true);
    };

    createClass(KeyedSeq, Seq);
    function KeyedSeq(value) {
      return value === null || value === undefined ? emptySequence().toKeyedSeq() : isIterable(value) ? isKeyed(value) ? value.toSeq() : value.fromEntrySeq() : keyedSeqFromValue(value);
    }

    KeyedSeq.prototype.toKeyedSeq = function () {
      return this;
    };

    createClass(IndexedSeq, Seq);
    function IndexedSeq(value) {
      return value === null || value === undefined ? emptySequence() : !isIterable(value) ? indexedSeqFromValue(value) : isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
    }

    IndexedSeq.of = function () /*...values*/{
      return IndexedSeq(arguments);
    };

    IndexedSeq.prototype.toIndexedSeq = function () {
      return this;
    };

    IndexedSeq.prototype.toString = function () {
      return this.__toString('Seq [', ']');
    };

    IndexedSeq.prototype.__iterate = function (fn, reverse) {
      return seqIterate(this, fn, reverse, false);
    };

    IndexedSeq.prototype.__iterator = function (type, reverse) {
      return seqIterator(this, type, reverse, false);
    };

    createClass(SetSeq, Seq);
    function SetSeq(value) {
      return (value === null || value === undefined ? emptySequence() : !isIterable(value) ? indexedSeqFromValue(value) : isKeyed(value) ? value.entrySeq() : value).toSetSeq();
    }

    SetSeq.of = function () /*...values*/{
      return SetSeq(arguments);
    };

    SetSeq.prototype.toSetSeq = function () {
      return this;
    };

    Seq.isSeq = isSeq;
    Seq.Keyed = KeyedSeq;
    Seq.Set = SetSeq;
    Seq.Indexed = IndexedSeq;

    var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

    Seq.prototype[IS_SEQ_SENTINEL] = true;

    createClass(ArraySeq, IndexedSeq);
    function ArraySeq(array) {
      this._array = array;
      this.size = array.length;
    }

    ArraySeq.prototype.get = function (index, notSetValue) {
      return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
    };

    ArraySeq.prototype.__iterate = function (fn, reverse) {
      var array = this._array;
      var maxIndex = array.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    ArraySeq.prototype.__iterator = function (type, reverse) {
      var array = this._array;
      var maxIndex = array.length - 1;
      var ii = 0;
      return new Iterator(function () {
        return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++]);
      });
    };

    createClass(ObjectSeq, KeyedSeq);
    function ObjectSeq(object) {
      var keys = Object.keys(object);
      this._object = object;
      this._keys = keys;
      this.size = keys.length;
    }

    ObjectSeq.prototype.get = function (key, notSetValue) {
      if (notSetValue !== undefined && !this.has(key)) {
        return notSetValue;
      }
      return this._object[key];
    };

    ObjectSeq.prototype.has = function (key) {
      return this._object.hasOwnProperty(key);
    };

    ObjectSeq.prototype.__iterate = function (fn, reverse) {
      var object = this._object;
      var keys = this._keys;
      var maxIndex = keys.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        var key = keys[reverse ? maxIndex - ii : ii];
        if (fn(object[key], key, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    ObjectSeq.prototype.__iterator = function (type, reverse) {
      var object = this._object;
      var keys = this._keys;
      var maxIndex = keys.length - 1;
      var ii = 0;
      return new Iterator(function () {
        var key = keys[reverse ? maxIndex - ii : ii];
        return ii++ > maxIndex ? iteratorDone() : iteratorValue(type, key, object[key]);
      });
    };

    ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;

    createClass(IterableSeq, IndexedSeq);
    function IterableSeq(iterable) {
      this._iterable = iterable;
      this.size = iterable.length || iterable.size;
    }

    IterableSeq.prototype.__iterateUncached = function (fn, reverse) {
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterable = this._iterable;
      var iterator = getIterator(iterable);
      var iterations = 0;
      if (isIterator(iterator)) {
        var step;
        while (!(step = iterator.next()).done) {
          if (fn(step.value, iterations++, this) === false) {
            break;
          }
        }
      }
      return iterations;
    };

    IterableSeq.prototype.__iteratorUncached = function (type, reverse) {
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterable = this._iterable;
      var iterator = getIterator(iterable);
      if (!isIterator(iterator)) {
        return new Iterator(iteratorDone);
      }
      var iterations = 0;
      return new Iterator(function () {
        var step = iterator.next();
        return step.done ? step : iteratorValue(type, iterations++, step.value);
      });
    };

    createClass(IteratorSeq, IndexedSeq);
    function IteratorSeq(iterator) {
      this._iterator = iterator;
      this._iteratorCache = [];
    }

    IteratorSeq.prototype.__iterateUncached = function (fn, reverse) {
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterator = this._iterator;
      var cache = this._iteratorCache;
      var iterations = 0;
      while (iterations < cache.length) {
        if (fn(cache[iterations], iterations++, this) === false) {
          return iterations;
        }
      }
      var step;
      while (!(step = iterator.next()).done) {
        var val = step.value;
        cache[iterations] = val;
        if (fn(val, iterations++, this) === false) {
          break;
        }
      }
      return iterations;
    };

    IteratorSeq.prototype.__iteratorUncached = function (type, reverse) {
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = this._iterator;
      var cache = this._iteratorCache;
      var iterations = 0;
      return new Iterator(function () {
        if (iterations >= cache.length) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          cache[iterations] = step.value;
        }
        return iteratorValue(type, iterations, cache[iterations++]);
      });
    };

    // # pragma Helper functions

    function isSeq(maybeSeq) {
      return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
    }

    var EMPTY_SEQ;

    function emptySequence() {
      return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
    }

    function keyedSeqFromValue(value) {
      var seq = Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() : isIterator(value) ? new IteratorSeq(value).fromEntrySeq() : hasIterator(value) ? new IterableSeq(value).fromEntrySeq() : typeof value === 'object' ? new ObjectSeq(value) : undefined;
      if (!seq) {
        throw new TypeError('Expected Array or iterable object of [k, v] entries, ' + 'or keyed object: ' + value);
      }
      return seq;
    }

    function indexedSeqFromValue(value) {
      var seq = maybeIndexedSeqFromValue(value);
      if (!seq) {
        throw new TypeError('Expected Array or iterable object of values: ' + value);
      }
      return seq;
    }

    function seqFromValue(value) {
      var seq = maybeIndexedSeqFromValue(value) || typeof value === 'object' && new ObjectSeq(value);
      if (!seq) {
        throw new TypeError('Expected Array or iterable object of values, or keyed object: ' + value);
      }
      return seq;
    }

    function maybeIndexedSeqFromValue(value) {
      return isArrayLike(value) ? new ArraySeq(value) : isIterator(value) ? new IteratorSeq(value) : hasIterator(value) ? new IterableSeq(value) : undefined;
    }

    function seqIterate(seq, fn, reverse, useKeys) {
      var cache = seq._cache;
      if (cache) {
        var maxIndex = cache.length - 1;
        for (var ii = 0; ii <= maxIndex; ii++) {
          var entry = cache[reverse ? maxIndex - ii : ii];
          if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
            return ii + 1;
          }
        }
        return ii;
      }
      return seq.__iterateUncached(fn, reverse);
    }

    function seqIterator(seq, type, reverse, useKeys) {
      var cache = seq._cache;
      if (cache) {
        var maxIndex = cache.length - 1;
        var ii = 0;
        return new Iterator(function () {
          var entry = cache[reverse ? maxIndex - ii : ii];
          return ii++ > maxIndex ? iteratorDone() : iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
        });
      }
      return seq.__iteratorUncached(type, reverse);
    }

    function fromJS(json, converter) {
      return converter ? fromJSWith(converter, json, '', { '': json }) : fromJSDefault(json);
    }

    function fromJSWith(converter, json, key, parentJSON) {
      if (Array.isArray(json)) {
        return converter.call(parentJSON, key, IndexedSeq(json).map(function (v, k) {
          return fromJSWith(converter, v, k, json);
        }));
      }
      if (isPlainObj(json)) {
        return converter.call(parentJSON, key, KeyedSeq(json).map(function (v, k) {
          return fromJSWith(converter, v, k, json);
        }));
      }
      return json;
    }

    function fromJSDefault(json) {
      if (Array.isArray(json)) {
        return IndexedSeq(json).map(fromJSDefault).toList();
      }
      if (isPlainObj(json)) {
        return KeyedSeq(json).map(fromJSDefault).toMap();
      }
      return json;
    }

    function isPlainObj(value) {
      return value && (value.constructor === Object || value.constructor === undefined);
    }

    /**
     * An extension of the "same-value" algorithm as [described for use by ES6 Map
     * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
     *
     * NaN is considered the same as NaN, however -0 and 0 are considered the same
     * value, which is different from the algorithm described by
     * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
     *
     * This is extended further to allow Objects to describe the values they
     * represent, by way of `valueOf` or `equals` (and `hashCode`).
     *
     * Note: because of this extension, the key equality of Immutable.Map and the
     * value equality of Immutable.Set will differ from ES6 Map and Set.
     *
     * ### Defining custom values
     *
     * The easiest way to describe the value an object represents is by implementing
     * `valueOf`. For example, `Date` represents a value by returning a unix
     * timestamp for `valueOf`:
     *
     *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
     *     var date2 = new Date(1234567890000);
     *     date1.valueOf(); // 1234567890000
     *     assert( date1 !== date2 );
     *     assert( Immutable.is( date1, date2 ) );
     *
     * Note: overriding `valueOf` may have other implications if you use this object
     * where JavaScript expects a primitive, such as implicit string coercion.
     *
     * For more complex types, especially collections, implementing `valueOf` may
     * not be performant. An alternative is to implement `equals` and `hashCode`.
     *
     * `equals` takes another object, presumably of similar type, and returns true
     * if the it is equal. Equality is symmetrical, so the same result should be
     * returned if this and the argument are flipped.
     *
     *     assert( a.equals(b) === b.equals(a) );
     *
     * `hashCode` returns a 32bit integer number representing the object which will
     * be used to determine how to store the value object in a Map or Set. You must
     * provide both or neither methods, one must not exist without the other.
     *
     * Also, an important relationship between these methods must be upheld: if two
     * values are equal, they *must* return the same hashCode. If the values are not
     * equal, they might have the same hashCode; this is called a hash collision,
     * and while undesirable for performance reasons, it is acceptable.
     *
     *     if (a.equals(b)) {
     *       assert( a.hashCode() === b.hashCode() );
     *     }
     *
     * All Immutable collections implement `equals` and `hashCode`.
     *
     */
    function is(valueA, valueB) {
      if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
        return true;
      }
      if (!valueA || !valueB) {
        return false;
      }
      if (typeof valueA.valueOf === 'function' && typeof valueB.valueOf === 'function') {
        valueA = valueA.valueOf();
        valueB = valueB.valueOf();
        if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
          return true;
        }
        if (!valueA || !valueB) {
          return false;
        }
      }
      if (typeof valueA.equals === 'function' && typeof valueB.equals === 'function' && valueA.equals(valueB)) {
        return true;
      }
      return false;
    }

    function deepEqual(a, b) {
      if (a === b) {
        return true;
      }

      if (!isIterable(b) || a.size !== undefined && b.size !== undefined && a.size !== b.size || a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash || isKeyed(a) !== isKeyed(b) || isIndexed(a) !== isIndexed(b) || isOrdered(a) !== isOrdered(b)) {
        return false;
      }

      if (a.size === 0 && b.size === 0) {
        return true;
      }

      var notAssociative = !isAssociative(a);

      if (isOrdered(a)) {
        var entries = a.entries();
        return b.every(function (v, k) {
          var entry = entries.next().value;
          return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
        }) && entries.next().done;
      }

      var flipped = false;

      if (a.size === undefined) {
        if (b.size === undefined) {
          if (typeof a.cacheResult === 'function') {
            a.cacheResult();
          }
        } else {
          flipped = true;
          var _ = a;
          a = b;
          b = _;
        }
      }

      var allEqual = true;
      var bSize = b.__iterate(function (v, k) {
        if (notAssociative ? !a.has(v) : flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
          allEqual = false;
          return false;
        }
      });

      return allEqual && a.size === bSize;
    }

    createClass(Repeat, IndexedSeq);

    function Repeat(value, times) {
      if (!(this instanceof Repeat)) {
        return new Repeat(value, times);
      }
      this._value = value;
      this.size = times === undefined ? Infinity : Math.max(0, times);
      if (this.size === 0) {
        if (EMPTY_REPEAT) {
          return EMPTY_REPEAT;
        }
        EMPTY_REPEAT = this;
      }
    }

    Repeat.prototype.toString = function () {
      if (this.size === 0) {
        return 'Repeat []';
      }
      return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
    };

    Repeat.prototype.get = function (index, notSetValue) {
      return this.has(index) ? this._value : notSetValue;
    };

    Repeat.prototype.includes = function (searchValue) {
      return is(this._value, searchValue);
    };

    Repeat.prototype.slice = function (begin, end) {
      var size = this.size;
      return wholeSlice(begin, end, size) ? this : new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
    };

    Repeat.prototype.reverse = function () {
      return this;
    };

    Repeat.prototype.indexOf = function (searchValue) {
      if (is(this._value, searchValue)) {
        return 0;
      }
      return -1;
    };

    Repeat.prototype.lastIndexOf = function (searchValue) {
      if (is(this._value, searchValue)) {
        return this.size;
      }
      return -1;
    };

    Repeat.prototype.__iterate = function (fn, reverse) {
      for (var ii = 0; ii < this.size; ii++) {
        if (fn(this._value, ii, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    Repeat.prototype.__iterator = function (type, reverse) {
      var this$0 = this;
      var ii = 0;
      return new Iterator(function () {
        return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone();
      });
    };

    Repeat.prototype.equals = function (other) {
      return other instanceof Repeat ? is(this._value, other._value) : deepEqual(other);
    };

    var EMPTY_REPEAT;

    function invariant(condition, error) {
      if (!condition) throw new Error(error);
    }

    createClass(Range, IndexedSeq);

    function Range(start, end, step) {
      if (!(this instanceof Range)) {
        return new Range(start, end, step);
      }
      invariant(step !== 0, 'Cannot step a Range by 0');
      start = start || 0;
      if (end === undefined) {
        end = Infinity;
      }
      step = step === undefined ? 1 : Math.abs(step);
      if (end < start) {
        step = -step;
      }
      this._start = start;
      this._end = end;
      this._step = step;
      this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
      if (this.size === 0) {
        if (EMPTY_RANGE) {
          return EMPTY_RANGE;
        }
        EMPTY_RANGE = this;
      }
    }

    Range.prototype.toString = function () {
      if (this.size === 0) {
        return 'Range []';
      }
      return 'Range [ ' + this._start + '...' + this._end + (this._step !== 1 ? ' by ' + this._step : '') + ' ]';
    };

    Range.prototype.get = function (index, notSetValue) {
      return this.has(index) ? this._start + wrapIndex(this, index) * this._step : notSetValue;
    };

    Range.prototype.includes = function (searchValue) {
      var possibleIndex = (searchValue - this._start) / this._step;
      return possibleIndex >= 0 && possibleIndex < this.size && possibleIndex === Math.floor(possibleIndex);
    };

    Range.prototype.slice = function (begin, end) {
      if (wholeSlice(begin, end, this.size)) {
        return this;
      }
      begin = resolveBegin(begin, this.size);
      end = resolveEnd(end, this.size);
      if (end <= begin) {
        return new Range(0, 0);
      }
      return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
    };

    Range.prototype.indexOf = function (searchValue) {
      var offsetValue = searchValue - this._start;
      if (offsetValue % this._step === 0) {
        var index = offsetValue / this._step;
        if (index >= 0 && index < this.size) {
          return index;
        }
      }
      return -1;
    };

    Range.prototype.lastIndexOf = function (searchValue) {
      return this.indexOf(searchValue);
    };

    Range.prototype.__iterate = function (fn, reverse) {
      var maxIndex = this.size - 1;
      var step = this._step;
      var value = reverse ? this._start + maxIndex * step : this._start;
      for (var ii = 0; ii <= maxIndex; ii++) {
        if (fn(value, ii, this) === false) {
          return ii + 1;
        }
        value += reverse ? -step : step;
      }
      return ii;
    };

    Range.prototype.__iterator = function (type, reverse) {
      var maxIndex = this.size - 1;
      var step = this._step;
      var value = reverse ? this._start + maxIndex * step : this._start;
      var ii = 0;
      return new Iterator(function () {
        var v = value;
        value += reverse ? -step : step;
        return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
      });
    };

    Range.prototype.equals = function (other) {
      return other instanceof Range ? this._start === other._start && this._end === other._end && this._step === other._step : deepEqual(this, other);
    };

    var EMPTY_RANGE;

    createClass(Collection, Iterable);
    function Collection() {
      throw TypeError('Abstract');
    }

    createClass(KeyedCollection, Collection);function KeyedCollection() {}

    createClass(IndexedCollection, Collection);function IndexedCollection() {}

    createClass(SetCollection, Collection);function SetCollection() {}

    Collection.Keyed = KeyedCollection;
    Collection.Indexed = IndexedCollection;
    Collection.Set = SetCollection;

    var imul = typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ? Math.imul : function imul(a, b) {
      a = a | 0; // int
      b = b | 0; // int
      var c = a & 0xffff;
      var d = b & 0xffff;
      // Shift by 0 fixes the sign on the high part.
      return c * d + ((a >>> 16) * d + c * (b >>> 16) << 16 >>> 0) | 0; // int
    };

    // v8 has an optimization for storing 31-bit signed numbers.
    // Values which have either 00 or 11 as the high order bits qualify.
    // This function drops the highest order bit in a signed number, maintaining
    // the sign bit.
    function smi(i32) {
      return i32 >>> 1 & 0x40000000 | i32 & 0xBFFFFFFF;
    }

    function hash(o) {
      if (o === false || o === null || o === undefined) {
        return 0;
      }
      if (typeof o.valueOf === 'function') {
        o = o.valueOf();
        if (o === false || o === null || o === undefined) {
          return 0;
        }
      }
      if (o === true) {
        return 1;
      }
      var type = typeof o;
      if (type === 'number') {
        if (o !== o || o === Infinity) {
          return 0;
        }
        var h = o | 0;
        if (h !== o) {
          h ^= o * 0xFFFFFFFF;
        }
        while (o > 0xFFFFFFFF) {
          o /= 0xFFFFFFFF;
          h ^= o;
        }
        return smi(h);
      }
      if (type === 'string') {
        return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
      }
      if (typeof o.hashCode === 'function') {
        return o.hashCode();
      }
      if (type === 'object') {
        return hashJSObj(o);
      }
      if (typeof o.toString === 'function') {
        return hashString(o.toString());
      }
      throw new Error('Value type ' + type + ' cannot be hashed.');
    }

    function cachedHashString(string) {
      var hash = stringHashCache[string];
      if (hash === undefined) {
        hash = hashString(string);
        if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
          STRING_HASH_CACHE_SIZE = 0;
          stringHashCache = {};
        }
        STRING_HASH_CACHE_SIZE++;
        stringHashCache[string] = hash;
      }
      return hash;
    }

    // http://jsperf.com/hashing-strings
    function hashString(string) {
      // This is the hash from JVM
      // The hash code for a string is computed as
      // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
      // where s[i] is the ith character of the string and n is the length of
      // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
      // (exclusive) by dropping high bits.
      var hash = 0;
      for (var ii = 0; ii < string.length; ii++) {
        hash = 31 * hash + string.charCodeAt(ii) | 0;
      }
      return smi(hash);
    }

    function hashJSObj(obj) {
      var hash;
      if (usingWeakMap) {
        hash = weakMap.get(obj);
        if (hash !== undefined) {
          return hash;
        }
      }

      hash = obj[UID_HASH_KEY];
      if (hash !== undefined) {
        return hash;
      }

      if (!canDefineProperty) {
        hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
        if (hash !== undefined) {
          return hash;
        }

        hash = getIENodeHash(obj);
        if (hash !== undefined) {
          return hash;
        }
      }

      hash = ++objHashUID;
      if (objHashUID & 0x40000000) {
        objHashUID = 0;
      }

      if (usingWeakMap) {
        weakMap.set(obj, hash);
      } else if (isExtensible !== undefined && isExtensible(obj) === false) {
        throw new Error('Non-extensible objects are not allowed as keys.');
      } else if (canDefineProperty) {
        Object.defineProperty(obj, UID_HASH_KEY, {
          'enumerable': false,
          'configurable': false,
          'writable': false,
          'value': hash
        });
      } else if (obj.propertyIsEnumerable !== undefined && obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
        // Since we can't define a non-enumerable property on the object
        // we'll hijack one of the less-used non-enumerable properties to
        // save our hash on it. Since this is a function it will not show up in
        // `JSON.stringify` which is what we want.
        obj.propertyIsEnumerable = function () {
          return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
        };
        obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
      } else if (obj.nodeType !== undefined) {
        // At this point we couldn't get the IE `uniqueID` to use as a hash
        // and we couldn't use a non-enumerable property to exploit the
        // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
        // itself.
        obj[UID_HASH_KEY] = hash;
      } else {
        throw new Error('Unable to set a non-enumerable property on object.');
      }

      return hash;
    }

    // Get references to ES5 object methods.
    var isExtensible = Object.isExtensible;

    // True if Object.defineProperty works as expected. IE8 fails this test.
    var canDefineProperty = function () {
      try {
        Object.defineProperty({}, '@', {});
        return true;
      } catch (e) {
        return false;
      }
    }();

    // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
    // and avoid memory leaks from the IE cloneNode bug.
    function getIENodeHash(node) {
      if (node && node.nodeType > 0) {
        switch (node.nodeType) {
          case 1:
            // Element
            return node.uniqueID;
          case 9:
            // Document
            return node.documentElement && node.documentElement.uniqueID;
        }
      }
    }

    // If possible, use a WeakMap.
    var usingWeakMap = typeof WeakMap === 'function';
    var weakMap;
    if (usingWeakMap) {
      weakMap = new WeakMap();
    }

    var objHashUID = 0;

    var UID_HASH_KEY = '__immutablehash__';
    if (typeof Symbol === 'function') {
      UID_HASH_KEY = Symbol(UID_HASH_KEY);
    }

    var STRING_HASH_CACHE_MIN_STRLEN = 16;
    var STRING_HASH_CACHE_MAX_SIZE = 255;
    var STRING_HASH_CACHE_SIZE = 0;
    var stringHashCache = {};

    function assertNotInfinite(size) {
      invariant(size !== Infinity, 'Cannot perform this action with an infinite size.');
    }

    createClass(Map, KeyedCollection);

    // @pragma Construction

    function Map(value) {
      return value === null || value === undefined ? emptyMap() : isMap(value) && !isOrdered(value) ? value : emptyMap().withMutations(function (map) {
        var iter = KeyedIterable(value);
        assertNotInfinite(iter.size);
        iter.forEach(function (v, k) {
          return map.set(k, v);
        });
      });
    }

    Map.of = function () {
      var keyValues = SLICE$0.call(arguments, 0);
      return emptyMap().withMutations(function (map) {
        for (var i = 0; i < keyValues.length; i += 2) {
          if (i + 1 >= keyValues.length) {
            throw new Error('Missing value for key: ' + keyValues[i]);
          }
          map.set(keyValues[i], keyValues[i + 1]);
        }
      });
    };

    Map.prototype.toString = function () {
      return this.__toString('Map {', '}');
    };

    // @pragma Access

    Map.prototype.get = function (k, notSetValue) {
      return this._root ? this._root.get(0, undefined, k, notSetValue) : notSetValue;
    };

    // @pragma Modification

    Map.prototype.set = function (k, v) {
      return updateMap(this, k, v);
    };

    Map.prototype.setIn = function (keyPath, v) {
      return this.updateIn(keyPath, NOT_SET, function () {
        return v;
      });
    };

    Map.prototype.remove = function (k) {
      return updateMap(this, k, NOT_SET);
    };

    Map.prototype.deleteIn = function (keyPath) {
      return this.updateIn(keyPath, function () {
        return NOT_SET;
      });
    };

    Map.prototype.update = function (k, notSetValue, updater) {
      return arguments.length === 1 ? k(this) : this.updateIn([k], notSetValue, updater);
    };

    Map.prototype.updateIn = function (keyPath, notSetValue, updater) {
      if (!updater) {
        updater = notSetValue;
        notSetValue = undefined;
      }
      var updatedValue = updateInDeepMap(this, forceIterator(keyPath), notSetValue, updater);
      return updatedValue === NOT_SET ? undefined : updatedValue;
    };

    Map.prototype.clear = function () {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._root = null;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyMap();
    };

    // @pragma Composition

    Map.prototype.merge = function () /*...iters*/{
      return mergeIntoMapWith(this, undefined, arguments);
    };

    Map.prototype.mergeWith = function (merger) {
      var iters = SLICE$0.call(arguments, 1);
      return mergeIntoMapWith(this, merger, iters);
    };

    Map.prototype.mergeIn = function (keyPath) {
      var iters = SLICE$0.call(arguments, 1);
      return this.updateIn(keyPath, emptyMap(), function (m) {
        return typeof m.merge === 'function' ? m.merge.apply(m, iters) : iters[iters.length - 1];
      });
    };

    Map.prototype.mergeDeep = function () /*...iters*/{
      return mergeIntoMapWith(this, deepMerger, arguments);
    };

    Map.prototype.mergeDeepWith = function (merger) {
      var iters = SLICE$0.call(arguments, 1);
      return mergeIntoMapWith(this, deepMergerWith(merger), iters);
    };

    Map.prototype.mergeDeepIn = function (keyPath) {
      var iters = SLICE$0.call(arguments, 1);
      return this.updateIn(keyPath, emptyMap(), function (m) {
        return typeof m.mergeDeep === 'function' ? m.mergeDeep.apply(m, iters) : iters[iters.length - 1];
      });
    };

    Map.prototype.sort = function (comparator) {
      // Late binding
      return OrderedMap(sortFactory(this, comparator));
    };

    Map.prototype.sortBy = function (mapper, comparator) {
      // Late binding
      return OrderedMap(sortFactory(this, comparator, mapper));
    };

    // @pragma Mutability

    Map.prototype.withMutations = function (fn) {
      var mutable = this.asMutable();
      fn(mutable);
      return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
    };

    Map.prototype.asMutable = function () {
      return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
    };

    Map.prototype.asImmutable = function () {
      return this.__ensureOwner();
    };

    Map.prototype.wasAltered = function () {
      return this.__altered;
    };

    Map.prototype.__iterator = function (type, reverse) {
      return new MapIterator(this, type, reverse);
    };

    Map.prototype.__iterate = function (fn, reverse) {
      var this$0 = this;
      var iterations = 0;
      this._root && this._root.iterate(function (entry) {
        iterations++;
        return fn(entry[1], entry[0], this$0);
      }, reverse);
      return iterations;
    };

    Map.prototype.__ensureOwner = function (ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeMap(this.size, this._root, ownerID, this.__hash);
    };

    function isMap(maybeMap) {
      return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
    }

    Map.isMap = isMap;

    var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

    var MapPrototype = Map.prototype;
    MapPrototype[IS_MAP_SENTINEL] = true;
    MapPrototype[DELETE] = MapPrototype.remove;
    MapPrototype.removeIn = MapPrototype.deleteIn;

    // #pragma Trie Nodes


    function ArrayMapNode(ownerID, entries) {
      this.ownerID = ownerID;
      this.entries = entries;
    }

    ArrayMapNode.prototype.get = function (shift, keyHash, key, notSetValue) {
      var entries = this.entries;
      for (var ii = 0, len = entries.length; ii < len; ii++) {
        if (is(key, entries[ii][0])) {
          return entries[ii][1];
        }
      }
      return notSetValue;
    };

    ArrayMapNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      var removed = value === NOT_SET;

      var entries = this.entries;
      var idx = 0;
      for (var len = entries.length; idx < len; idx++) {
        if (is(key, entries[idx][0])) {
          break;
        }
      }
      var exists = idx < len;

      if (exists ? entries[idx][1] === value : removed) {
        return this;
      }

      SetRef(didAlter);
      (removed || !exists) && SetRef(didChangeSize);

      if (removed && entries.length === 1) {
        return; // undefined
      }

      if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
        return createNodes(ownerID, entries, key, value);
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newEntries = isEditable ? entries : arrCopy(entries);

      if (exists) {
        if (removed) {
          idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
        } else {
          newEntries[idx] = [key, value];
        }
      } else {
        newEntries.push([key, value]);
      }

      if (isEditable) {
        this.entries = newEntries;
        return this;
      }

      return new ArrayMapNode(ownerID, newEntries);
    };

    function BitmapIndexedNode(ownerID, bitmap, nodes) {
      this.ownerID = ownerID;
      this.bitmap = bitmap;
      this.nodes = nodes;
    }

    BitmapIndexedNode.prototype.get = function (shift, keyHash, key, notSetValue) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var bit = 1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK);
      var bitmap = this.bitmap;
      return (bitmap & bit) === 0 ? notSetValue : this.nodes[popCount(bitmap & bit - 1)].get(shift + SHIFT, keyHash, key, notSetValue);
    };

    BitmapIndexedNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var bit = 1 << keyHashFrag;
      var bitmap = this.bitmap;
      var exists = (bitmap & bit) !== 0;

      if (!exists && value === NOT_SET) {
        return this;
      }

      var idx = popCount(bitmap & bit - 1);
      var nodes = this.nodes;
      var node = exists ? nodes[idx] : undefined;
      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

      if (newNode === node) {
        return this;
      }

      if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
        return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
      }

      if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
        return nodes[idx ^ 1];
      }

      if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
        return newNode;
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
      var newNodes = exists ? newNode ? setIn(nodes, idx, newNode, isEditable) : spliceOut(nodes, idx, isEditable) : spliceIn(nodes, idx, newNode, isEditable);

      if (isEditable) {
        this.bitmap = newBitmap;
        this.nodes = newNodes;
        return this;
      }

      return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
    };

    function HashArrayMapNode(ownerID, count, nodes) {
      this.ownerID = ownerID;
      this.count = count;
      this.nodes = nodes;
    }

    HashArrayMapNode.prototype.get = function (shift, keyHash, key, notSetValue) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var node = this.nodes[idx];
      return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
    };

    HashArrayMapNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var removed = value === NOT_SET;
      var nodes = this.nodes;
      var node = nodes[idx];

      if (removed && !node) {
        return this;
      }

      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
      if (newNode === node) {
        return this;
      }

      var newCount = this.count;
      if (!node) {
        newCount++;
      } else if (!newNode) {
        newCount--;
        if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
          return packNodes(ownerID, nodes, newCount, idx);
        }
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newNodes = setIn(nodes, idx, newNode, isEditable);

      if (isEditable) {
        this.count = newCount;
        this.nodes = newNodes;
        return this;
      }

      return new HashArrayMapNode(ownerID, newCount, newNodes);
    };

    function HashCollisionNode(ownerID, keyHash, entries) {
      this.ownerID = ownerID;
      this.keyHash = keyHash;
      this.entries = entries;
    }

    HashCollisionNode.prototype.get = function (shift, keyHash, key, notSetValue) {
      var entries = this.entries;
      for (var ii = 0, len = entries.length; ii < len; ii++) {
        if (is(key, entries[ii][0])) {
          return entries[ii][1];
        }
      }
      return notSetValue;
    };

    HashCollisionNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }

      var removed = value === NOT_SET;

      if (keyHash !== this.keyHash) {
        if (removed) {
          return this;
        }
        SetRef(didAlter);
        SetRef(didChangeSize);
        return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
      }

      var entries = this.entries;
      var idx = 0;
      for (var len = entries.length; idx < len; idx++) {
        if (is(key, entries[idx][0])) {
          break;
        }
      }
      var exists = idx < len;

      if (exists ? entries[idx][1] === value : removed) {
        return this;
      }

      SetRef(didAlter);
      (removed || !exists) && SetRef(didChangeSize);

      if (removed && len === 2) {
        return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newEntries = isEditable ? entries : arrCopy(entries);

      if (exists) {
        if (removed) {
          idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
        } else {
          newEntries[idx] = [key, value];
        }
      } else {
        newEntries.push([key, value]);
      }

      if (isEditable) {
        this.entries = newEntries;
        return this;
      }

      return new HashCollisionNode(ownerID, this.keyHash, newEntries);
    };

    function ValueNode(ownerID, keyHash, entry) {
      this.ownerID = ownerID;
      this.keyHash = keyHash;
      this.entry = entry;
    }

    ValueNode.prototype.get = function (shift, keyHash, key, notSetValue) {
      return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
    };

    ValueNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      var removed = value === NOT_SET;
      var keyMatch = is(key, this.entry[0]);
      if (keyMatch ? value === this.entry[1] : removed) {
        return this;
      }

      SetRef(didAlter);

      if (removed) {
        SetRef(didChangeSize);
        return; // undefined
      }

      if (keyMatch) {
        if (ownerID && ownerID === this.ownerID) {
          this.entry[1] = value;
          return this;
        }
        return new ValueNode(ownerID, this.keyHash, [key, value]);
      }

      SetRef(didChangeSize);
      return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
    };

    // #pragma Iterators

    ArrayMapNode.prototype.iterate = HashCollisionNode.prototype.iterate = function (fn, reverse) {
      var entries = this.entries;
      for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
        if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
          return false;
        }
      }
    };

    BitmapIndexedNode.prototype.iterate = HashArrayMapNode.prototype.iterate = function (fn, reverse) {
      var nodes = this.nodes;
      for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
        var node = nodes[reverse ? maxIndex - ii : ii];
        if (node && node.iterate(fn, reverse) === false) {
          return false;
        }
      }
    };

    ValueNode.prototype.iterate = function (fn, reverse) {
      return fn(this.entry);
    };

    createClass(MapIterator, Iterator);

    function MapIterator(map, type, reverse) {
      this._type = type;
      this._reverse = reverse;
      this._stack = map._root && mapIteratorFrame(map._root);
    }

    MapIterator.prototype.next = function () {
      var type = this._type;
      var stack = this._stack;
      while (stack) {
        var node = stack.node;
        var index = stack.index++;
        var maxIndex;
        if (node.entry) {
          if (index === 0) {
            return mapIteratorValue(type, node.entry);
          }
        } else if (node.entries) {
          maxIndex = node.entries.length - 1;
          if (index <= maxIndex) {
            return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
          }
        } else {
          maxIndex = node.nodes.length - 1;
          if (index <= maxIndex) {
            var subNode = node.nodes[this._reverse ? maxIndex - index : index];
            if (subNode) {
              if (subNode.entry) {
                return mapIteratorValue(type, subNode.entry);
              }
              stack = this._stack = mapIteratorFrame(subNode, stack);
            }
            continue;
          }
        }
        stack = this._stack = this._stack.__prev;
      }
      return iteratorDone();
    };

    function mapIteratorValue(type, entry) {
      return iteratorValue(type, entry[0], entry[1]);
    }

    function mapIteratorFrame(node, prev) {
      return {
        node: node,
        index: 0,
        __prev: prev
      };
    }

    function makeMap(size, root, ownerID, hash) {
      var map = Object.create(MapPrototype);
      map.size = size;
      map._root = root;
      map.__ownerID = ownerID;
      map.__hash = hash;
      map.__altered = false;
      return map;
    }

    var EMPTY_MAP;
    function emptyMap() {
      return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
    }

    function updateMap(map, k, v) {
      var newRoot;
      var newSize;
      if (!map._root) {
        if (v === NOT_SET) {
          return map;
        }
        newSize = 1;
        newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
      } else {
        var didChangeSize = MakeRef(CHANGE_LENGTH);
        var didAlter = MakeRef(DID_ALTER);
        newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
        if (!didAlter.value) {
          return map;
        }
        newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
      }
      if (map.__ownerID) {
        map.size = newSize;
        map._root = newRoot;
        map.__hash = undefined;
        map.__altered = true;
        return map;
      }
      return newRoot ? makeMap(newSize, newRoot) : emptyMap();
    }

    function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (!node) {
        if (value === NOT_SET) {
          return node;
        }
        SetRef(didAlter);
        SetRef(didChangeSize);
        return new ValueNode(ownerID, keyHash, [key, value]);
      }
      return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
    }

    function isLeafNode(node) {
      return node.constructor === ValueNode || node.constructor === HashCollisionNode;
    }

    function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
      if (node.keyHash === keyHash) {
        return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
      }

      var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
      var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

      var newNode;
      var nodes = idx1 === idx2 ? [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] : (newNode = new ValueNode(ownerID, keyHash, entry), idx1 < idx2 ? [node, newNode] : [newNode, node]);

      return new BitmapIndexedNode(ownerID, 1 << idx1 | 1 << idx2, nodes);
    }

    function createNodes(ownerID, entries, key, value) {
      if (!ownerID) {
        ownerID = new OwnerID();
      }
      var node = new ValueNode(ownerID, hash(key), [key, value]);
      for (var ii = 0; ii < entries.length; ii++) {
        var entry = entries[ii];
        node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
      }
      return node;
    }

    function packNodes(ownerID, nodes, count, excluding) {
      var bitmap = 0;
      var packedII = 0;
      var packedNodes = new Array(count);
      for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
        var node = nodes[ii];
        if (node !== undefined && ii !== excluding) {
          bitmap |= bit;
          packedNodes[packedII++] = node;
        }
      }
      return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
    }

    function expandNodes(ownerID, nodes, bitmap, including, node) {
      var count = 0;
      var expandedNodes = new Array(SIZE);
      for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
        expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
      }
      expandedNodes[including] = node;
      return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
    }

    function mergeIntoMapWith(map, merger, iterables) {
      var iters = [];
      for (var ii = 0; ii < iterables.length; ii++) {
        var value = iterables[ii];
        var iter = KeyedIterable(value);
        if (!isIterable(value)) {
          iter = iter.map(function (v) {
            return fromJS(v);
          });
        }
        iters.push(iter);
      }
      return mergeIntoCollectionWith(map, merger, iters);
    }

    function deepMerger(existing, value, key) {
      return existing && existing.mergeDeep && isIterable(value) ? existing.mergeDeep(value) : is(existing, value) ? existing : value;
    }

    function deepMergerWith(merger) {
      return function (existing, value, key) {
        if (existing && existing.mergeDeepWith && isIterable(value)) {
          return existing.mergeDeepWith(merger, value);
        }
        var nextValue = merger(existing, value, key);
        return is(existing, nextValue) ? existing : nextValue;
      };
    }

    function mergeIntoCollectionWith(collection, merger, iters) {
      iters = iters.filter(function (x) {
        return x.size !== 0;
      });
      if (iters.length === 0) {
        return collection;
      }
      if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
        return collection.constructor(iters[0]);
      }
      return collection.withMutations(function (collection) {
        var mergeIntoMap = merger ? function (value, key) {
          collection.update(key, NOT_SET, function (existing) {
            return existing === NOT_SET ? value : merger(existing, value, key);
          });
        } : function (value, key) {
          collection.set(key, value);
        };
        for (var ii = 0; ii < iters.length; ii++) {
          iters[ii].forEach(mergeIntoMap);
        }
      });
    }

    function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
      var isNotSet = existing === NOT_SET;
      var step = keyPathIter.next();
      if (step.done) {
        var existingValue = isNotSet ? notSetValue : existing;
        var newValue = updater(existingValue);
        return newValue === existingValue ? existing : newValue;
      }
      invariant(isNotSet || existing && existing.set, 'invalid keyPath');
      var key = step.value;
      var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
      var nextUpdated = updateInDeepMap(nextExisting, keyPathIter, notSetValue, updater);
      return nextUpdated === nextExisting ? existing : nextUpdated === NOT_SET ? existing.remove(key) : (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
    }

    function popCount(x) {
      x = x - (x >> 1 & 0x55555555);
      x = (x & 0x33333333) + (x >> 2 & 0x33333333);
      x = x + (x >> 4) & 0x0f0f0f0f;
      x = x + (x >> 8);
      x = x + (x >> 16);
      return x & 0x7f;
    }

    function setIn(array, idx, val, canEdit) {
      var newArray = canEdit ? array : arrCopy(array);
      newArray[idx] = val;
      return newArray;
    }

    function spliceIn(array, idx, val, canEdit) {
      var newLen = array.length + 1;
      if (canEdit && idx + 1 === newLen) {
        array[idx] = val;
        return array;
      }
      var newArray = new Array(newLen);
      var after = 0;
      for (var ii = 0; ii < newLen; ii++) {
        if (ii === idx) {
          newArray[ii] = val;
          after = -1;
        } else {
          newArray[ii] = array[ii + after];
        }
      }
      return newArray;
    }

    function spliceOut(array, idx, canEdit) {
      var newLen = array.length - 1;
      if (canEdit && idx === newLen) {
        array.pop();
        return array;
      }
      var newArray = new Array(newLen);
      var after = 0;
      for (var ii = 0; ii < newLen; ii++) {
        if (ii === idx) {
          after = 1;
        }
        newArray[ii] = array[ii + after];
      }
      return newArray;
    }

    var MAX_ARRAY_MAP_SIZE = SIZE / 4;
    var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
    var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

    createClass(List, IndexedCollection);

    // @pragma Construction

    function List(value) {
      var empty = emptyList();
      if (value === null || value === undefined) {
        return empty;
      }
      if (isList(value)) {
        return value;
      }
      var iter = IndexedIterable(value);
      var size = iter.size;
      if (size === 0) {
        return empty;
      }
      assertNotInfinite(size);
      if (size > 0 && size < SIZE) {
        return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
      }
      return empty.withMutations(function (list) {
        list.setSize(size);
        iter.forEach(function (v, i) {
          return list.set(i, v);
        });
      });
    }

    List.of = function () /*...values*/{
      return this(arguments);
    };

    List.prototype.toString = function () {
      return this.__toString('List [', ']');
    };

    // @pragma Access

    List.prototype.get = function (index, notSetValue) {
      index = wrapIndex(this, index);
      if (index >= 0 && index < this.size) {
        index += this._origin;
        var node = listNodeFor(this, index);
        return node && node.array[index & MASK];
      }
      return notSetValue;
    };

    // @pragma Modification

    List.prototype.set = function (index, value) {
      return updateList(this, index, value);
    };

    List.prototype.remove = function (index) {
      return !this.has(index) ? this : index === 0 ? this.shift() : index === this.size - 1 ? this.pop() : this.splice(index, 1);
    };

    List.prototype.insert = function (index, value) {
      return this.splice(index, 0, value);
    };

    List.prototype.clear = function () {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = this._origin = this._capacity = 0;
        this._level = SHIFT;
        this._root = this._tail = null;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyList();
    };

    List.prototype.push = function () /*...values*/{
      var values = arguments;
      var oldSize = this.size;
      return this.withMutations(function (list) {
        setListBounds(list, 0, oldSize + values.length);
        for (var ii = 0; ii < values.length; ii++) {
          list.set(oldSize + ii, values[ii]);
        }
      });
    };

    List.prototype.pop = function () {
      return setListBounds(this, 0, -1);
    };

    List.prototype.unshift = function () /*...values*/{
      var values = arguments;
      return this.withMutations(function (list) {
        setListBounds(list, -values.length);
        for (var ii = 0; ii < values.length; ii++) {
          list.set(ii, values[ii]);
        }
      });
    };

    List.prototype.shift = function () {
      return setListBounds(this, 1);
    };

    // @pragma Composition

    List.prototype.merge = function () /*...iters*/{
      return mergeIntoListWith(this, undefined, arguments);
    };

    List.prototype.mergeWith = function (merger) {
      var iters = SLICE$0.call(arguments, 1);
      return mergeIntoListWith(this, merger, iters);
    };

    List.prototype.mergeDeep = function () /*...iters*/{
      return mergeIntoListWith(this, deepMerger, arguments);
    };

    List.prototype.mergeDeepWith = function (merger) {
      var iters = SLICE$0.call(arguments, 1);
      return mergeIntoListWith(this, deepMergerWith(merger), iters);
    };

    List.prototype.setSize = function (size) {
      return setListBounds(this, 0, size);
    };

    // @pragma Iteration

    List.prototype.slice = function (begin, end) {
      var size = this.size;
      if (wholeSlice(begin, end, size)) {
        return this;
      }
      return setListBounds(this, resolveBegin(begin, size), resolveEnd(end, size));
    };

    List.prototype.__iterator = function (type, reverse) {
      var index = 0;
      var values = iterateList(this, reverse);
      return new Iterator(function () {
        var value = values();
        return value === DONE ? iteratorDone() : iteratorValue(type, index++, value);
      });
    };

    List.prototype.__iterate = function (fn, reverse) {
      var index = 0;
      var values = iterateList(this, reverse);
      var value;
      while ((value = values()) !== DONE) {
        if (fn(value, index++, this) === false) {
          break;
        }
      }
      return index;
    };

    List.prototype.__ensureOwner = function (ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        return this;
      }
      return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
    };

    function isList(maybeList) {
      return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
    }

    List.isList = isList;

    var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

    var ListPrototype = List.prototype;
    ListPrototype[IS_LIST_SENTINEL] = true;
    ListPrototype[DELETE] = ListPrototype.remove;
    ListPrototype.setIn = MapPrototype.setIn;
    ListPrototype.deleteIn = ListPrototype.removeIn = MapPrototype.removeIn;
    ListPrototype.update = MapPrototype.update;
    ListPrototype.updateIn = MapPrototype.updateIn;
    ListPrototype.mergeIn = MapPrototype.mergeIn;
    ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
    ListPrototype.withMutations = MapPrototype.withMutations;
    ListPrototype.asMutable = MapPrototype.asMutable;
    ListPrototype.asImmutable = MapPrototype.asImmutable;
    ListPrototype.wasAltered = MapPrototype.wasAltered;

    function VNode(array, ownerID) {
      this.array = array;
      this.ownerID = ownerID;
    }

    // TODO: seems like these methods are very similar

    VNode.prototype.removeBefore = function (ownerID, level, index) {
      if (index === level ? 1 << level : 0 || this.array.length === 0) {
        return this;
      }
      var originIndex = index >>> level & MASK;
      if (originIndex >= this.array.length) {
        return new VNode([], ownerID);
      }
      var removingFirst = originIndex === 0;
      var newChild;
      if (level > 0) {
        var oldChild = this.array[originIndex];
        newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
        if (newChild === oldChild && removingFirst) {
          return this;
        }
      }
      if (removingFirst && !newChild) {
        return this;
      }
      var editable = editableVNode(this, ownerID);
      if (!removingFirst) {
        for (var ii = 0; ii < originIndex; ii++) {
          editable.array[ii] = undefined;
        }
      }
      if (newChild) {
        editable.array[originIndex] = newChild;
      }
      return editable;
    };

    VNode.prototype.removeAfter = function (ownerID, level, index) {
      if (index === (level ? 1 << level : 0) || this.array.length === 0) {
        return this;
      }
      var sizeIndex = index - 1 >>> level & MASK;
      if (sizeIndex >= this.array.length) {
        return this;
      }

      var newChild;
      if (level > 0) {
        var oldChild = this.array[sizeIndex];
        newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
        if (newChild === oldChild && sizeIndex === this.array.length - 1) {
          return this;
        }
      }

      var editable = editableVNode(this, ownerID);
      editable.array.splice(sizeIndex + 1);
      if (newChild) {
        editable.array[sizeIndex] = newChild;
      }
      return editable;
    };

    var DONE = {};

    function iterateList(list, reverse) {
      var left = list._origin;
      var right = list._capacity;
      var tailPos = getTailOffset(right);
      var tail = list._tail;

      return iterateNodeOrLeaf(list._root, list._level, 0);

      function iterateNodeOrLeaf(node, level, offset) {
        return level === 0 ? iterateLeaf(node, offset) : iterateNode(node, level, offset);
      }

      function iterateLeaf(node, offset) {
        var array = offset === tailPos ? tail && tail.array : node && node.array;
        var from = offset > left ? 0 : left - offset;
        var to = right - offset;
        if (to > SIZE) {
          to = SIZE;
        }
        return function () {
          if (from === to) {
            return DONE;
          }
          var idx = reverse ? --to : from++;
          return array && array[idx];
        };
      }

      function iterateNode(node, level, offset) {
        var values;
        var array = node && node.array;
        var from = offset > left ? 0 : left - offset >> level;
        var to = (right - offset >> level) + 1;
        if (to > SIZE) {
          to = SIZE;
        }
        return function () {
          do {
            if (values) {
              var value = values();
              if (value !== DONE) {
                return value;
              }
              values = null;
            }
            if (from === to) {
              return DONE;
            }
            var idx = reverse ? --to : from++;
            values = iterateNodeOrLeaf(array && array[idx], level - SHIFT, offset + (idx << level));
          } while (true);
        };
      }
    }

    function makeList(origin, capacity, level, root, tail, ownerID, hash) {
      var list = Object.create(ListPrototype);
      list.size = capacity - origin;
      list._origin = origin;
      list._capacity = capacity;
      list._level = level;
      list._root = root;
      list._tail = tail;
      list.__ownerID = ownerID;
      list.__hash = hash;
      list.__altered = false;
      return list;
    }

    var EMPTY_LIST;
    function emptyList() {
      return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
    }

    function updateList(list, index, value) {
      index = wrapIndex(list, index);

      if (index !== index) {
        return list;
      }

      if (index >= list.size || index < 0) {
        return list.withMutations(function (list) {
          index < 0 ? setListBounds(list, index).set(0, value) : setListBounds(list, 0, index + 1).set(index, value);
        });
      }

      index += list._origin;

      var newTail = list._tail;
      var newRoot = list._root;
      var didAlter = MakeRef(DID_ALTER);
      if (index >= getTailOffset(list._capacity)) {
        newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
      } else {
        newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
      }

      if (!didAlter.value) {
        return list;
      }

      if (list.__ownerID) {
        list._root = newRoot;
        list._tail = newTail;
        list.__hash = undefined;
        list.__altered = true;
        return list;
      }
      return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
    }

    function updateVNode(node, ownerID, level, index, value, didAlter) {
      var idx = index >>> level & MASK;
      var nodeHas = node && idx < node.array.length;
      if (!nodeHas && value === undefined) {
        return node;
      }

      var newNode;

      if (level > 0) {
        var lowerNode = node && node.array[idx];
        var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
        if (newLowerNode === lowerNode) {
          return node;
        }
        newNode = editableVNode(node, ownerID);
        newNode.array[idx] = newLowerNode;
        return newNode;
      }

      if (nodeHas && node.array[idx] === value) {
        return node;
      }

      SetRef(didAlter);

      newNode = editableVNode(node, ownerID);
      if (value === undefined && idx === newNode.array.length - 1) {
        newNode.array.pop();
      } else {
        newNode.array[idx] = value;
      }
      return newNode;
    }

    function editableVNode(node, ownerID) {
      if (ownerID && node && ownerID === node.ownerID) {
        return node;
      }
      return new VNode(node ? node.array.slice() : [], ownerID);
    }

    function listNodeFor(list, rawIndex) {
      if (rawIndex >= getTailOffset(list._capacity)) {
        return list._tail;
      }
      if (rawIndex < 1 << list._level + SHIFT) {
        var node = list._root;
        var level = list._level;
        while (node && level > 0) {
          node = node.array[rawIndex >>> level & MASK];
          level -= SHIFT;
        }
        return node;
      }
    }

    function setListBounds(list, begin, end) {
      // Sanitize begin & end using this shorthand for ToInt32(argument)
      // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
      if (begin !== undefined) {
        begin = begin | 0;
      }
      if (end !== undefined) {
        end = end | 0;
      }
      var owner = list.__ownerID || new OwnerID();
      var oldOrigin = list._origin;
      var oldCapacity = list._capacity;
      var newOrigin = oldOrigin + begin;
      var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
      if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
        return list;
      }

      // If it's going to end after it starts, it's empty.
      if (newOrigin >= newCapacity) {
        return list.clear();
      }

      var newLevel = list._level;
      var newRoot = list._root;

      // New origin might need creating a higher root.
      var offsetShift = 0;
      while (newOrigin + offsetShift < 0) {
        newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
        newLevel += SHIFT;
        offsetShift += 1 << newLevel;
      }
      if (offsetShift) {
        newOrigin += offsetShift;
        oldOrigin += offsetShift;
        newCapacity += offsetShift;
        oldCapacity += offsetShift;
      }

      var oldTailOffset = getTailOffset(oldCapacity);
      var newTailOffset = getTailOffset(newCapacity);

      // New size might need creating a higher root.
      while (newTailOffset >= 1 << newLevel + SHIFT) {
        newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
        newLevel += SHIFT;
      }

      // Locate or create the new tail.
      var oldTail = list._tail;
      var newTail = newTailOffset < oldTailOffset ? listNodeFor(list, newCapacity - 1) : newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

      // Merge Tail into tree.
      if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
        newRoot = editableVNode(newRoot, owner);
        var node = newRoot;
        for (var level = newLevel; level > SHIFT; level -= SHIFT) {
          var idx = oldTailOffset >>> level & MASK;
          node = node.array[idx] = editableVNode(node.array[idx], owner);
        }
        node.array[oldTailOffset >>> SHIFT & MASK] = oldTail;
      }

      // If the size has been reduced, there's a chance the tail needs to be trimmed.
      if (newCapacity < oldCapacity) {
        newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
      }

      // If the new origin is within the tail, then we do not need a root.
      if (newOrigin >= newTailOffset) {
        newOrigin -= newTailOffset;
        newCapacity -= newTailOffset;
        newLevel = SHIFT;
        newRoot = null;
        newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

        // Otherwise, if the root has been trimmed, garbage collect.
      } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
        offsetShift = 0;

        // Identify the new top root node of the subtree of the old root.
        while (newRoot) {
          var beginIndex = newOrigin >>> newLevel & MASK;
          if (beginIndex !== newTailOffset >>> newLevel & MASK) {
            break;
          }
          if (beginIndex) {
            offsetShift += (1 << newLevel) * beginIndex;
          }
          newLevel -= SHIFT;
          newRoot = newRoot.array[beginIndex];
        }

        // Trim the new sides of the new root.
        if (newRoot && newOrigin > oldOrigin) {
          newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
        }
        if (newRoot && newTailOffset < oldTailOffset) {
          newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
        }
        if (offsetShift) {
          newOrigin -= offsetShift;
          newCapacity -= offsetShift;
        }
      }

      if (list.__ownerID) {
        list.size = newCapacity - newOrigin;
        list._origin = newOrigin;
        list._capacity = newCapacity;
        list._level = newLevel;
        list._root = newRoot;
        list._tail = newTail;
        list.__hash = undefined;
        list.__altered = true;
        return list;
      }
      return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
    }

    function mergeIntoListWith(list, merger, iterables) {
      var iters = [];
      var maxSize = 0;
      for (var ii = 0; ii < iterables.length; ii++) {
        var value = iterables[ii];
        var iter = IndexedIterable(value);
        if (iter.size > maxSize) {
          maxSize = iter.size;
        }
        if (!isIterable(value)) {
          iter = iter.map(function (v) {
            return fromJS(v);
          });
        }
        iters.push(iter);
      }
      if (maxSize > list.size) {
        list = list.setSize(maxSize);
      }
      return mergeIntoCollectionWith(list, merger, iters);
    }

    function getTailOffset(size) {
      return size < SIZE ? 0 : size - 1 >>> SHIFT << SHIFT;
    }

    createClass(OrderedMap, Map);

    // @pragma Construction

    function OrderedMap(value) {
      return value === null || value === undefined ? emptyOrderedMap() : isOrderedMap(value) ? value : emptyOrderedMap().withMutations(function (map) {
        var iter = KeyedIterable(value);
        assertNotInfinite(iter.size);
        iter.forEach(function (v, k) {
          return map.set(k, v);
        });
      });
    }

    OrderedMap.of = function () /*...values*/{
      return this(arguments);
    };

    OrderedMap.prototype.toString = function () {
      return this.__toString('OrderedMap {', '}');
    };

    // @pragma Access

    OrderedMap.prototype.get = function (k, notSetValue) {
      var index = this._map.get(k);
      return index !== undefined ? this._list.get(index)[1] : notSetValue;
    };

    // @pragma Modification

    OrderedMap.prototype.clear = function () {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._map.clear();
        this._list.clear();
        return this;
      }
      return emptyOrderedMap();
    };

    OrderedMap.prototype.set = function (k, v) {
      return updateOrderedMap(this, k, v);
    };

    OrderedMap.prototype.remove = function (k) {
      return updateOrderedMap(this, k, NOT_SET);
    };

    OrderedMap.prototype.wasAltered = function () {
      return this._map.wasAltered() || this._list.wasAltered();
    };

    OrderedMap.prototype.__iterate = function (fn, reverse) {
      var this$0 = this;
      return this._list.__iterate(function (entry) {
        return entry && fn(entry[1], entry[0], this$0);
      }, reverse);
    };

    OrderedMap.prototype.__iterator = function (type, reverse) {
      return this._list.fromEntrySeq().__iterator(type, reverse);
    };

    OrderedMap.prototype.__ensureOwner = function (ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map.__ensureOwner(ownerID);
      var newList = this._list.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        this._list = newList;
        return this;
      }
      return makeOrderedMap(newMap, newList, ownerID, this.__hash);
    };

    function isOrderedMap(maybeOrderedMap) {
      return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
    }

    OrderedMap.isOrderedMap = isOrderedMap;

    OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
    OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;

    function makeOrderedMap(map, list, ownerID, hash) {
      var omap = Object.create(OrderedMap.prototype);
      omap.size = map ? map.size : 0;
      omap._map = map;
      omap._list = list;
      omap.__ownerID = ownerID;
      omap.__hash = hash;
      return omap;
    }

    var EMPTY_ORDERED_MAP;
    function emptyOrderedMap() {
      return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
    }

    function updateOrderedMap(omap, k, v) {
      var map = omap._map;
      var list = omap._list;
      var i = map.get(k);
      var has = i !== undefined;
      var newMap;
      var newList;
      if (v === NOT_SET) {
        // removed
        if (!has) {
          return omap;
        }
        if (list.size >= SIZE && list.size >= map.size * 2) {
          newList = list.filter(function (entry, idx) {
            return entry !== undefined && i !== idx;
          });
          newMap = newList.toKeyedSeq().map(function (entry) {
            return entry[0];
          }).flip().toMap();
          if (omap.__ownerID) {
            newMap.__ownerID = newList.__ownerID = omap.__ownerID;
          }
        } else {
          newMap = map.remove(k);
          newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
        }
      } else {
        if (has) {
          if (v === list.get(i)[1]) {
            return omap;
          }
          newMap = map;
          newList = list.set(i, [k, v]);
        } else {
          newMap = map.set(k, list.size);
          newList = list.set(list.size, [k, v]);
        }
      }
      if (omap.__ownerID) {
        omap.size = newMap.size;
        omap._map = newMap;
        omap._list = newList;
        omap.__hash = undefined;
        return omap;
      }
      return makeOrderedMap(newMap, newList);
    }

    createClass(ToKeyedSequence, KeyedSeq);
    function ToKeyedSequence(indexed, useKeys) {
      this._iter = indexed;
      this._useKeys = useKeys;
      this.size = indexed.size;
    }

    ToKeyedSequence.prototype.get = function (key, notSetValue) {
      return this._iter.get(key, notSetValue);
    };

    ToKeyedSequence.prototype.has = function (key) {
      return this._iter.has(key);
    };

    ToKeyedSequence.prototype.valueSeq = function () {
      return this._iter.valueSeq();
    };

    ToKeyedSequence.prototype.reverse = function () {
      var this$0 = this;
      var reversedSequence = reverseFactory(this, true);
      if (!this._useKeys) {
        reversedSequence.valueSeq = function () {
          return this$0._iter.toSeq().reverse();
        };
      }
      return reversedSequence;
    };

    ToKeyedSequence.prototype.map = function (mapper, context) {
      var this$0 = this;
      var mappedSequence = mapFactory(this, mapper, context);
      if (!this._useKeys) {
        mappedSequence.valueSeq = function () {
          return this$0._iter.toSeq().map(mapper, context);
        };
      }
      return mappedSequence;
    };

    ToKeyedSequence.prototype.__iterate = function (fn, reverse) {
      var this$0 = this;
      var ii;
      return this._iter.__iterate(this._useKeys ? function (v, k) {
        return fn(v, k, this$0);
      } : (ii = reverse ? resolveSize(this) : 0, function (v) {
        return fn(v, reverse ? --ii : ii++, this$0);
      }), reverse);
    };

    ToKeyedSequence.prototype.__iterator = function (type, reverse) {
      if (this._useKeys) {
        return this._iter.__iterator(type, reverse);
      }
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      var ii = reverse ? resolveSize(this) : 0;
      return new Iterator(function () {
        var step = iterator.next();
        return step.done ? step : iteratorValue(type, reverse ? --ii : ii++, step.value, step);
      });
    };

    ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;

    createClass(ToIndexedSequence, IndexedSeq);
    function ToIndexedSequence(iter) {
      this._iter = iter;
      this.size = iter.size;
    }

    ToIndexedSequence.prototype.includes = function (value) {
      return this._iter.includes(value);
    };

    ToIndexedSequence.prototype.__iterate = function (fn, reverse) {
      var this$0 = this;
      var iterations = 0;
      return this._iter.__iterate(function (v) {
        return fn(v, iterations++, this$0);
      }, reverse);
    };

    ToIndexedSequence.prototype.__iterator = function (type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      var iterations = 0;
      return new Iterator(function () {
        var step = iterator.next();
        return step.done ? step : iteratorValue(type, iterations++, step.value, step);
      });
    };

    createClass(ToSetSequence, SetSeq);
    function ToSetSequence(iter) {
      this._iter = iter;
      this.size = iter.size;
    }

    ToSetSequence.prototype.has = function (key) {
      return this._iter.includes(key);
    };

    ToSetSequence.prototype.__iterate = function (fn, reverse) {
      var this$0 = this;
      return this._iter.__iterate(function (v) {
        return fn(v, v, this$0);
      }, reverse);
    };

    ToSetSequence.prototype.__iterator = function (type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      return new Iterator(function () {
        var step = iterator.next();
        return step.done ? step : iteratorValue(type, step.value, step.value, step);
      });
    };

    createClass(FromEntriesSequence, KeyedSeq);
    function FromEntriesSequence(entries) {
      this._iter = entries;
      this.size = entries.size;
    }

    FromEntriesSequence.prototype.entrySeq = function () {
      return this._iter.toSeq();
    };

    FromEntriesSequence.prototype.__iterate = function (fn, reverse) {
      var this$0 = this;
      return this._iter.__iterate(function (entry) {
        // Check if entry exists first so array access doesn't throw for holes
        // in the parent iteration.
        if (entry) {
          validateEntry(entry);
          var indexedIterable = isIterable(entry);
          return fn(indexedIterable ? entry.get(1) : entry[1], indexedIterable ? entry.get(0) : entry[0], this$0);
        }
      }, reverse);
    };

    FromEntriesSequence.prototype.__iterator = function (type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      return new Iterator(function () {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          // Check if entry exists first so array access doesn't throw for holes
          // in the parent iteration.
          if (entry) {
            validateEntry(entry);
            var indexedIterable = isIterable(entry);
            return iteratorValue(type, indexedIterable ? entry.get(0) : entry[0], indexedIterable ? entry.get(1) : entry[1], step);
          }
        }
      });
    };

    ToIndexedSequence.prototype.cacheResult = ToKeyedSequence.prototype.cacheResult = ToSetSequence.prototype.cacheResult = FromEntriesSequence.prototype.cacheResult = cacheResultThrough;

    function flipFactory(iterable) {
      var flipSequence = makeSequence(iterable);
      flipSequence._iter = iterable;
      flipSequence.size = iterable.size;
      flipSequence.flip = function () {
        return iterable;
      };
      flipSequence.reverse = function () {
        var reversedSequence = iterable.reverse.apply(this); // super.reverse()
        reversedSequence.flip = function () {
          return iterable.reverse();
        };
        return reversedSequence;
      };
      flipSequence.has = function (key) {
        return iterable.includes(key);
      };
      flipSequence.includes = function (key) {
        return iterable.has(key);
      };
      flipSequence.cacheResult = cacheResultThrough;
      flipSequence.__iterateUncached = function (fn, reverse) {
        var this$0 = this;
        return iterable.__iterate(function (v, k) {
          return fn(k, v, this$0) !== false;
        }, reverse);
      };
      flipSequence.__iteratorUncached = function (type, reverse) {
        if (type === ITERATE_ENTRIES) {
          var iterator = iterable.__iterator(type, reverse);
          return new Iterator(function () {
            var step = iterator.next();
            if (!step.done) {
              var k = step.value[0];
              step.value[0] = step.value[1];
              step.value[1] = k;
            }
            return step;
          });
        }
        return iterable.__iterator(type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES, reverse);
      };
      return flipSequence;
    }

    function mapFactory(iterable, mapper, context) {
      var mappedSequence = makeSequence(iterable);
      mappedSequence.size = iterable.size;
      mappedSequence.has = function (key) {
        return iterable.has(key);
      };
      mappedSequence.get = function (key, notSetValue) {
        var v = iterable.get(key, NOT_SET);
        return v === NOT_SET ? notSetValue : mapper.call(context, v, key, iterable);
      };
      mappedSequence.__iterateUncached = function (fn, reverse) {
        var this$0 = this;
        return iterable.__iterate(function (v, k, c) {
          return fn(mapper.call(context, v, k, c), k, this$0) !== false;
        }, reverse);
      };
      mappedSequence.__iteratorUncached = function (type, reverse) {
        var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
        return new Iterator(function () {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          var key = entry[0];
          return iteratorValue(type, key, mapper.call(context, entry[1], key, iterable), step);
        });
      };
      return mappedSequence;
    }

    function reverseFactory(iterable, useKeys) {
      var reversedSequence = makeSequence(iterable);
      reversedSequence._iter = iterable;
      reversedSequence.size = iterable.size;
      reversedSequence.reverse = function () {
        return iterable;
      };
      if (iterable.flip) {
        reversedSequence.flip = function () {
          var flipSequence = flipFactory(iterable);
          flipSequence.reverse = function () {
            return iterable.flip();
          };
          return flipSequence;
        };
      }
      reversedSequence.get = function (key, notSetValue) {
        return iterable.get(useKeys ? key : -1 - key, notSetValue);
      };
      reversedSequence.has = function (key) {
        return iterable.has(useKeys ? key : -1 - key);
      };
      reversedSequence.includes = function (value) {
        return iterable.includes(value);
      };
      reversedSequence.cacheResult = cacheResultThrough;
      reversedSequence.__iterate = function (fn, reverse) {
        var this$0 = this;
        return iterable.__iterate(function (v, k) {
          return fn(v, k, this$0);
        }, !reverse);
      };
      reversedSequence.__iterator = function (type, reverse) {
        return iterable.__iterator(type, !reverse);
      };
      return reversedSequence;
    }

    function filterFactory(iterable, predicate, context, useKeys) {
      var filterSequence = makeSequence(iterable);
      if (useKeys) {
        filterSequence.has = function (key) {
          var v = iterable.get(key, NOT_SET);
          return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
        };
        filterSequence.get = function (key, notSetValue) {
          var v = iterable.get(key, NOT_SET);
          return v !== NOT_SET && predicate.call(context, v, key, iterable) ? v : notSetValue;
        };
      }
      filterSequence.__iterateUncached = function (fn, reverse) {
        var this$0 = this;
        var iterations = 0;
        iterable.__iterate(function (v, k, c) {
          if (predicate.call(context, v, k, c)) {
            iterations++;
            return fn(v, useKeys ? k : iterations - 1, this$0);
          }
        }, reverse);
        return iterations;
      };
      filterSequence.__iteratorUncached = function (type, reverse) {
        var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
        var iterations = 0;
        return new Iterator(function () {
          while (true) {
            var step = iterator.next();
            if (step.done) {
              return step;
            }
            var entry = step.value;
            var key = entry[0];
            var value = entry[1];
            if (predicate.call(context, value, key, iterable)) {
              return iteratorValue(type, useKeys ? key : iterations++, value, step);
            }
          }
        });
      };
      return filterSequence;
    }

    function countByFactory(iterable, grouper, context) {
      var groups = Map().asMutable();
      iterable.__iterate(function (v, k) {
        groups.update(grouper.call(context, v, k, iterable), 0, function (a) {
          return a + 1;
        });
      });
      return groups.asImmutable();
    }

    function groupByFactory(iterable, grouper, context) {
      var isKeyedIter = isKeyed(iterable);
      var groups = (isOrdered(iterable) ? OrderedMap() : Map()).asMutable();
      iterable.__iterate(function (v, k) {
        groups.update(grouper.call(context, v, k, iterable), function (a) {
          return a = a || [], a.push(isKeyedIter ? [k, v] : v), a;
        });
      });
      var coerce = iterableClass(iterable);
      return groups.map(function (arr) {
        return reify(iterable, coerce(arr));
      });
    }

    function sliceFactory(iterable, begin, end, useKeys) {
      var originalSize = iterable.size;

      // Sanitize begin & end using this shorthand for ToInt32(argument)
      // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
      if (begin !== undefined) {
        begin = begin | 0;
      }
      if (end !== undefined) {
        if (end === Infinity) {
          end = originalSize;
        } else {
          end = end | 0;
        }
      }

      if (wholeSlice(begin, end, originalSize)) {
        return iterable;
      }

      var resolvedBegin = resolveBegin(begin, originalSize);
      var resolvedEnd = resolveEnd(end, originalSize);

      // begin or end will be NaN if they were provided as negative numbers and
      // this iterable's size is unknown. In that case, cache first so there is
      // a known size and these do not resolve to NaN.
      if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
        return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
      }

      // Note: resolvedEnd is undefined when the original sequence's length is
      // unknown and this slice did not supply an end and should contain all
      // elements after resolvedBegin.
      // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
      var resolvedSize = resolvedEnd - resolvedBegin;
      var sliceSize;
      if (resolvedSize === resolvedSize) {
        sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
      }

      var sliceSeq = makeSequence(iterable);

      // If iterable.size is undefined, the size of the realized sliceSeq is
      // unknown at this point unless the number of items to slice is 0
      sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || undefined;

      if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
        sliceSeq.get = function (index, notSetValue) {
          index = wrapIndex(this, index);
          return index >= 0 && index < sliceSize ? iterable.get(index + resolvedBegin, notSetValue) : notSetValue;
        };
      }

      sliceSeq.__iterateUncached = function (fn, reverse) {
        var this$0 = this;
        if (sliceSize === 0) {
          return 0;
        }
        if (reverse) {
          return this.cacheResult().__iterate(fn, reverse);
        }
        var skipped = 0;
        var isSkipping = true;
        var iterations = 0;
        iterable.__iterate(function (v, k) {
          if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
            iterations++;
            return fn(v, useKeys ? k : iterations - 1, this$0) !== false && iterations !== sliceSize;
          }
        });
        return iterations;
      };

      sliceSeq.__iteratorUncached = function (type, reverse) {
        if (sliceSize !== 0 && reverse) {
          return this.cacheResult().__iterator(type, reverse);
        }
        // Don't bother instantiating parent iterator if taking 0.
        var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);
        var skipped = 0;
        var iterations = 0;
        return new Iterator(function () {
          while (skipped++ < resolvedBegin) {
            iterator.next();
          }
          if (++iterations > sliceSize) {
            return iteratorDone();
          }
          var step = iterator.next();
          if (useKeys || type === ITERATE_VALUES) {
            return step;
          } else if (type === ITERATE_KEYS) {
            return iteratorValue(type, iterations - 1, undefined, step);
          } else {
            return iteratorValue(type, iterations - 1, step.value[1], step);
          }
        });
      };

      return sliceSeq;
    }

    function takeWhileFactory(iterable, predicate, context) {
      var takeSequence = makeSequence(iterable);
      takeSequence.__iterateUncached = function (fn, reverse) {
        var this$0 = this;
        if (reverse) {
          return this.cacheResult().__iterate(fn, reverse);
        }
        var iterations = 0;
        iterable.__iterate(function (v, k, c) {
          return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0);
        });
        return iterations;
      };
      takeSequence.__iteratorUncached = function (type, reverse) {
        var this$0 = this;
        if (reverse) {
          return this.cacheResult().__iterator(type, reverse);
        }
        var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
        var iterating = true;
        return new Iterator(function () {
          if (!iterating) {
            return iteratorDone();
          }
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          var k = entry[0];
          var v = entry[1];
          if (!predicate.call(context, v, k, this$0)) {
            iterating = false;
            return iteratorDone();
          }
          return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
        });
      };
      return takeSequence;
    }

    function skipWhileFactory(iterable, predicate, context, useKeys) {
      var skipSequence = makeSequence(iterable);
      skipSequence.__iterateUncached = function (fn, reverse) {
        var this$0 = this;
        if (reverse) {
          return this.cacheResult().__iterate(fn, reverse);
        }
        var isSkipping = true;
        var iterations = 0;
        iterable.__iterate(function (v, k, c) {
          if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
            iterations++;
            return fn(v, useKeys ? k : iterations - 1, this$0);
          }
        });
        return iterations;
      };
      skipSequence.__iteratorUncached = function (type, reverse) {
        var this$0 = this;
        if (reverse) {
          return this.cacheResult().__iterator(type, reverse);
        }
        var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
        var skipping = true;
        var iterations = 0;
        return new Iterator(function () {
          var step, k, v;
          do {
            step = iterator.next();
            if (step.done) {
              if (useKeys || type === ITERATE_VALUES) {
                return step;
              } else if (type === ITERATE_KEYS) {
                return iteratorValue(type, iterations++, undefined, step);
              } else {
                return iteratorValue(type, iterations++, step.value[1], step);
              }
            }
            var entry = step.value;
            k = entry[0];
            v = entry[1];
            skipping && (skipping = predicate.call(context, v, k, this$0));
          } while (skipping);
          return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
        });
      };
      return skipSequence;
    }

    function concatFactory(iterable, values) {
      var isKeyedIterable = isKeyed(iterable);
      var iters = [iterable].concat(values).map(function (v) {
        if (!isIterable(v)) {
          v = isKeyedIterable ? keyedSeqFromValue(v) : indexedSeqFromValue(Array.isArray(v) ? v : [v]);
        } else if (isKeyedIterable) {
          v = KeyedIterable(v);
        }
        return v;
      }).filter(function (v) {
        return v.size !== 0;
      });

      if (iters.length === 0) {
        return iterable;
      }

      if (iters.length === 1) {
        var singleton = iters[0];
        if (singleton === iterable || isKeyedIterable && isKeyed(singleton) || isIndexed(iterable) && isIndexed(singleton)) {
          return singleton;
        }
      }

      var concatSeq = new ArraySeq(iters);
      if (isKeyedIterable) {
        concatSeq = concatSeq.toKeyedSeq();
      } else if (!isIndexed(iterable)) {
        concatSeq = concatSeq.toSetSeq();
      }
      concatSeq = concatSeq.flatten(true);
      concatSeq.size = iters.reduce(function (sum, seq) {
        if (sum !== undefined) {
          var size = seq.size;
          if (size !== undefined) {
            return sum + size;
          }
        }
      }, 0);
      return concatSeq;
    }

    function flattenFactory(iterable, depth, useKeys) {
      var flatSequence = makeSequence(iterable);
      flatSequence.__iterateUncached = function (fn, reverse) {
        var iterations = 0;
        var stopped = false;
        function flatDeep(iter, currentDepth) {
          var this$0 = this;
          iter.__iterate(function (v, k) {
            if ((!depth || currentDepth < depth) && isIterable(v)) {
              flatDeep(v, currentDepth + 1);
            } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
              stopped = true;
            }
            return !stopped;
          }, reverse);
        }
        flatDeep(iterable, 0);
        return iterations;
      };
      flatSequence.__iteratorUncached = function (type, reverse) {
        var iterator = iterable.__iterator(type, reverse);
        var stack = [];
        var iterations = 0;
        return new Iterator(function () {
          while (iterator) {
            var step = iterator.next();
            if (step.done !== false) {
              iterator = stack.pop();
              continue;
            }
            var v = step.value;
            if (type === ITERATE_ENTRIES) {
              v = v[1];
            }
            if ((!depth || stack.length < depth) && isIterable(v)) {
              stack.push(iterator);
              iterator = v.__iterator(type, reverse);
            } else {
              return useKeys ? step : iteratorValue(type, iterations++, v, step);
            }
          }
          return iteratorDone();
        });
      };
      return flatSequence;
    }

    function flatMapFactory(iterable, mapper, context) {
      var coerce = iterableClass(iterable);
      return iterable.toSeq().map(function (v, k) {
        return coerce(mapper.call(context, v, k, iterable));
      }).flatten(true);
    }

    function interposeFactory(iterable, separator) {
      var interposedSequence = makeSequence(iterable);
      interposedSequence.size = iterable.size && iterable.size * 2 - 1;
      interposedSequence.__iterateUncached = function (fn, reverse) {
        var this$0 = this;
        var iterations = 0;
        iterable.__iterate(function (v, k) {
          return (!iterations || fn(separator, iterations++, this$0) !== false) && fn(v, iterations++, this$0) !== false;
        }, reverse);
        return iterations;
      };
      interposedSequence.__iteratorUncached = function (type, reverse) {
        var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
        var iterations = 0;
        var step;
        return new Iterator(function () {
          if (!step || iterations % 2) {
            step = iterator.next();
            if (step.done) {
              return step;
            }
          }
          return iterations % 2 ? iteratorValue(type, iterations++, separator) : iteratorValue(type, iterations++, step.value, step);
        });
      };
      return interposedSequence;
    }

    function sortFactory(iterable, comparator, mapper) {
      if (!comparator) {
        comparator = defaultComparator;
      }
      var isKeyedIterable = isKeyed(iterable);
      var index = 0;
      var entries = iterable.toSeq().map(function (v, k) {
        return [k, v, index++, mapper ? mapper(v, k, iterable) : v];
      }).toArray();
      entries.sort(function (a, b) {
        return comparator(a[3], b[3]) || a[2] - b[2];
      }).forEach(isKeyedIterable ? function (v, i) {
        entries[i].length = 2;
      } : function (v, i) {
        entries[i] = v[1];
      });
      return isKeyedIterable ? KeyedSeq(entries) : isIndexed(iterable) ? IndexedSeq(entries) : SetSeq(entries);
    }

    function maxFactory(iterable, comparator, mapper) {
      if (!comparator) {
        comparator = defaultComparator;
      }
      if (mapper) {
        var entry = iterable.toSeq().map(function (v, k) {
          return [v, mapper(v, k, iterable)];
        }).reduce(function (a, b) {
          return maxCompare(comparator, a[1], b[1]) ? b : a;
        });
        return entry && entry[0];
      } else {
        return iterable.reduce(function (a, b) {
          return maxCompare(comparator, a, b) ? b : a;
        });
      }
    }

    function maxCompare(comparator, a, b) {
      var comp = comparator(b, a);
      // b is considered the new max if the comparator declares them equal, but
      // they are not equal and b is in fact a nullish value.
      return comp === 0 && b !== a && (b === undefined || b === null || b !== b) || comp > 0;
    }

    function zipWithFactory(keyIter, zipper, iters) {
      var zipSequence = makeSequence(keyIter);
      zipSequence.size = new ArraySeq(iters).map(function (i) {
        return i.size;
      }).min();
      // Note: this a generic base implementation of __iterate in terms of
      // __iterator which may be more generically useful in the future.
      zipSequence.__iterate = function (fn, reverse) {
        /* generic:
        var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
        var step;
        var iterations = 0;
        while (!(step = iterator.next()).done) {
          iterations++;
          if (fn(step.value[1], step.value[0], this) === false) {
            break;
          }
        }
        return iterations;
        */
        // indexed:
        var iterator = this.__iterator(ITERATE_VALUES, reverse);
        var step;
        var iterations = 0;
        while (!(step = iterator.next()).done) {
          if (fn(step.value, iterations++, this) === false) {
            break;
          }
        }
        return iterations;
      };
      zipSequence.__iteratorUncached = function (type, reverse) {
        var iterators = iters.map(function (i) {
          return i = Iterable(i), getIterator(reverse ? i.reverse() : i);
        });
        var iterations = 0;
        var isDone = false;
        return new Iterator(function () {
          var steps;
          if (!isDone) {
            steps = iterators.map(function (i) {
              return i.next();
            });
            isDone = steps.some(function (s) {
              return s.done;
            });
          }
          if (isDone) {
            return iteratorDone();
          }
          return iteratorValue(type, iterations++, zipper.apply(null, steps.map(function (s) {
            return s.value;
          })));
        });
      };
      return zipSequence;
    }

    // #pragma Helper Functions

    function reify(iter, seq) {
      return isSeq(iter) ? seq : iter.constructor(seq);
    }

    function validateEntry(entry) {
      if (entry !== Object(entry)) {
        throw new TypeError('Expected [K, V] tuple: ' + entry);
      }
    }

    function resolveSize(iter) {
      assertNotInfinite(iter.size);
      return ensureSize(iter);
    }

    function iterableClass(iterable) {
      return isKeyed(iterable) ? KeyedIterable : isIndexed(iterable) ? IndexedIterable : SetIterable;
    }

    function makeSequence(iterable) {
      return Object.create((isKeyed(iterable) ? KeyedSeq : isIndexed(iterable) ? IndexedSeq : SetSeq).prototype);
    }

    function cacheResultThrough() {
      if (this._iter.cacheResult) {
        this._iter.cacheResult();
        this.size = this._iter.size;
        return this;
      } else {
        return Seq.prototype.cacheResult.call(this);
      }
    }

    function defaultComparator(a, b) {
      return a > b ? 1 : a < b ? -1 : 0;
    }

    function forceIterator(keyPath) {
      var iter = getIterator(keyPath);
      if (!iter) {
        // Array might not be iterable in this environment, so we need a fallback
        // to our wrapped type.
        if (!isArrayLike(keyPath)) {
          throw new TypeError('Expected iterable or array-like: ' + keyPath);
        }
        iter = getIterator(Iterable(keyPath));
      }
      return iter;
    }

    createClass(Record, KeyedCollection);

    function Record(defaultValues, name) {
      var hasInitialized;

      var RecordType = function Record(values) {
        if (values instanceof RecordType) {
          return values;
        }
        if (!(this instanceof RecordType)) {
          return new RecordType(values);
        }
        if (!hasInitialized) {
          hasInitialized = true;
          var keys = Object.keys(defaultValues);
          setProps(RecordTypePrototype, keys);
          RecordTypePrototype.size = keys.length;
          RecordTypePrototype._name = name;
          RecordTypePrototype._keys = keys;
          RecordTypePrototype._defaultValues = defaultValues;
        }
        this._map = Map(values);
      };

      var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
      RecordTypePrototype.constructor = RecordType;

      return RecordType;
    }

    Record.prototype.toString = function () {
      return this.__toString(recordName(this) + ' {', '}');
    };

    // @pragma Access

    Record.prototype.has = function (k) {
      return this._defaultValues.hasOwnProperty(k);
    };

    Record.prototype.get = function (k, notSetValue) {
      if (!this.has(k)) {
        return notSetValue;
      }
      var defaultVal = this._defaultValues[k];
      return this._map ? this._map.get(k, defaultVal) : defaultVal;
    };

    // @pragma Modification

    Record.prototype.clear = function () {
      if (this.__ownerID) {
        this._map && this._map.clear();
        return this;
      }
      var RecordType = this.constructor;
      return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));
    };

    Record.prototype.set = function (k, v) {
      if (!this.has(k)) {
        throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
      }
      if (this._map && !this._map.has(k)) {
        var defaultVal = this._defaultValues[k];
        if (v === defaultVal) {
          return this;
        }
      }
      var newMap = this._map && this._map.set(k, v);
      if (this.__ownerID || newMap === this._map) {
        return this;
      }
      return makeRecord(this, newMap);
    };

    Record.prototype.remove = function (k) {
      if (!this.has(k)) {
        return this;
      }
      var newMap = this._map && this._map.remove(k);
      if (this.__ownerID || newMap === this._map) {
        return this;
      }
      return makeRecord(this, newMap);
    };

    Record.prototype.wasAltered = function () {
      return this._map.wasAltered();
    };

    Record.prototype.__iterator = function (type, reverse) {
      var this$0 = this;
      return KeyedIterable(this._defaultValues).map(function (_, k) {
        return this$0.get(k);
      }).__iterator(type, reverse);
    };

    Record.prototype.__iterate = function (fn, reverse) {
      var this$0 = this;
      return KeyedIterable(this._defaultValues).map(function (_, k) {
        return this$0.get(k);
      }).__iterate(fn, reverse);
    };

    Record.prototype.__ensureOwner = function (ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map && this._map.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        return this;
      }
      return makeRecord(this, newMap, ownerID);
    };

    var RecordPrototype = Record.prototype;
    RecordPrototype[DELETE] = RecordPrototype.remove;
    RecordPrototype.deleteIn = RecordPrototype.removeIn = MapPrototype.removeIn;
    RecordPrototype.merge = MapPrototype.merge;
    RecordPrototype.mergeWith = MapPrototype.mergeWith;
    RecordPrototype.mergeIn = MapPrototype.mergeIn;
    RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
    RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
    RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
    RecordPrototype.setIn = MapPrototype.setIn;
    RecordPrototype.update = MapPrototype.update;
    RecordPrototype.updateIn = MapPrototype.updateIn;
    RecordPrototype.withMutations = MapPrototype.withMutations;
    RecordPrototype.asMutable = MapPrototype.asMutable;
    RecordPrototype.asImmutable = MapPrototype.asImmutable;

    function makeRecord(likeRecord, map, ownerID) {
      var record = Object.create(Object.getPrototypeOf(likeRecord));
      record._map = map;
      record.__ownerID = ownerID;
      return record;
    }

    function recordName(record) {
      return record._name || record.constructor.name || 'Record';
    }

    function setProps(prototype, names) {
      try {
        names.forEach(setProp.bind(undefined, prototype));
      } catch (error) {
        // Object.defineProperty failed. Probably IE8.
      }
    }

    function setProp(prototype, name) {
      Object.defineProperty(prototype, name, {
        get: function () {
          return this.get(name);
        },
        set: function (value) {
          invariant(this.__ownerID, 'Cannot set on an immutable record.');
          this.set(name, value);
        }
      });
    }

    createClass(Set, SetCollection);

    // @pragma Construction

    function Set(value) {
      return value === null || value === undefined ? emptySet() : isSet(value) && !isOrdered(value) ? value : emptySet().withMutations(function (set) {
        var iter = SetIterable(value);
        assertNotInfinite(iter.size);
        iter.forEach(function (v) {
          return set.add(v);
        });
      });
    }

    Set.of = function () /*...values*/{
      return this(arguments);
    };

    Set.fromKeys = function (value) {
      return this(KeyedIterable(value).keySeq());
    };

    Set.prototype.toString = function () {
      return this.__toString('Set {', '}');
    };

    // @pragma Access

    Set.prototype.has = function (value) {
      return this._map.has(value);
    };

    // @pragma Modification

    Set.prototype.add = function (value) {
      return updateSet(this, this._map.set(value, true));
    };

    Set.prototype.remove = function (value) {
      return updateSet(this, this._map.remove(value));
    };

    Set.prototype.clear = function () {
      return updateSet(this, this._map.clear());
    };

    // @pragma Composition

    Set.prototype.union = function () {
      var iters = SLICE$0.call(arguments, 0);
      iters = iters.filter(function (x) {
        return x.size !== 0;
      });
      if (iters.length === 0) {
        return this;
      }
      if (this.size === 0 && !this.__ownerID && iters.length === 1) {
        return this.constructor(iters[0]);
      }
      return this.withMutations(function (set) {
        for (var ii = 0; ii < iters.length; ii++) {
          SetIterable(iters[ii]).forEach(function (value) {
            return set.add(value);
          });
        }
      });
    };

    Set.prototype.intersect = function () {
      var iters = SLICE$0.call(arguments, 0);
      if (iters.length === 0) {
        return this;
      }
      iters = iters.map(function (iter) {
        return SetIterable(iter);
      });
      var originalSet = this;
      return this.withMutations(function (set) {
        originalSet.forEach(function (value) {
          if (!iters.every(function (iter) {
            return iter.includes(value);
          })) {
            set.remove(value);
          }
        });
      });
    };

    Set.prototype.subtract = function () {
      var iters = SLICE$0.call(arguments, 0);
      if (iters.length === 0) {
        return this;
      }
      iters = iters.map(function (iter) {
        return SetIterable(iter);
      });
      var originalSet = this;
      return this.withMutations(function (set) {
        originalSet.forEach(function (value) {
          if (iters.some(function (iter) {
            return iter.includes(value);
          })) {
            set.remove(value);
          }
        });
      });
    };

    Set.prototype.merge = function () {
      return this.union.apply(this, arguments);
    };

    Set.prototype.mergeWith = function (merger) {
      var iters = SLICE$0.call(arguments, 1);
      return this.union.apply(this, iters);
    };

    Set.prototype.sort = function (comparator) {
      // Late binding
      return OrderedSet(sortFactory(this, comparator));
    };

    Set.prototype.sortBy = function (mapper, comparator) {
      // Late binding
      return OrderedSet(sortFactory(this, comparator, mapper));
    };

    Set.prototype.wasAltered = function () {
      return this._map.wasAltered();
    };

    Set.prototype.__iterate = function (fn, reverse) {
      var this$0 = this;
      return this._map.__iterate(function (_, k) {
        return fn(k, k, this$0);
      }, reverse);
    };

    Set.prototype.__iterator = function (type, reverse) {
      return this._map.map(function (_, k) {
        return k;
      }).__iterator(type, reverse);
    };

    Set.prototype.__ensureOwner = function (ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        return this;
      }
      return this.__make(newMap, ownerID);
    };

    function isSet(maybeSet) {
      return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
    }

    Set.isSet = isSet;

    var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

    var SetPrototype = Set.prototype;
    SetPrototype[IS_SET_SENTINEL] = true;
    SetPrototype[DELETE] = SetPrototype.remove;
    SetPrototype.mergeDeep = SetPrototype.merge;
    SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
    SetPrototype.withMutations = MapPrototype.withMutations;
    SetPrototype.asMutable = MapPrototype.asMutable;
    SetPrototype.asImmutable = MapPrototype.asImmutable;

    SetPrototype.__empty = emptySet;
    SetPrototype.__make = makeSet;

    function updateSet(set, newMap) {
      if (set.__ownerID) {
        set.size = newMap.size;
        set._map = newMap;
        return set;
      }
      return newMap === set._map ? set : newMap.size === 0 ? set.__empty() : set.__make(newMap);
    }

    function makeSet(map, ownerID) {
      var set = Object.create(SetPrototype);
      set.size = map ? map.size : 0;
      set._map = map;
      set.__ownerID = ownerID;
      return set;
    }

    var EMPTY_SET;
    function emptySet() {
      return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
    }

    createClass(OrderedSet, Set);

    // @pragma Construction

    function OrderedSet(value) {
      return value === null || value === undefined ? emptyOrderedSet() : isOrderedSet(value) ? value : emptyOrderedSet().withMutations(function (set) {
        var iter = SetIterable(value);
        assertNotInfinite(iter.size);
        iter.forEach(function (v) {
          return set.add(v);
        });
      });
    }

    OrderedSet.of = function () /*...values*/{
      return this(arguments);
    };

    OrderedSet.fromKeys = function (value) {
      return this(KeyedIterable(value).keySeq());
    };

    OrderedSet.prototype.toString = function () {
      return this.__toString('OrderedSet {', '}');
    };

    function isOrderedSet(maybeOrderedSet) {
      return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
    }

    OrderedSet.isOrderedSet = isOrderedSet;

    var OrderedSetPrototype = OrderedSet.prototype;
    OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;

    OrderedSetPrototype.__empty = emptyOrderedSet;
    OrderedSetPrototype.__make = makeOrderedSet;

    function makeOrderedSet(map, ownerID) {
      var set = Object.create(OrderedSetPrototype);
      set.size = map ? map.size : 0;
      set._map = map;
      set.__ownerID = ownerID;
      return set;
    }

    var EMPTY_ORDERED_SET;
    function emptyOrderedSet() {
      return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
    }

    createClass(Stack, IndexedCollection);

    // @pragma Construction

    function Stack(value) {
      return value === null || value === undefined ? emptyStack() : isStack(value) ? value : emptyStack().unshiftAll(value);
    }

    Stack.of = function () /*...values*/{
      return this(arguments);
    };

    Stack.prototype.toString = function () {
      return this.__toString('Stack [', ']');
    };

    // @pragma Access

    Stack.prototype.get = function (index, notSetValue) {
      var head = this._head;
      index = wrapIndex(this, index);
      while (head && index--) {
        head = head.next;
      }
      return head ? head.value : notSetValue;
    };

    Stack.prototype.peek = function () {
      return this._head && this._head.value;
    };

    // @pragma Modification

    Stack.prototype.push = function () /*...values*/{
      if (arguments.length === 0) {
        return this;
      }
      var newSize = this.size + arguments.length;
      var head = this._head;
      for (var ii = arguments.length - 1; ii >= 0; ii--) {
        head = {
          value: arguments[ii],
          next: head
        };
      }
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    Stack.prototype.pushAll = function (iter) {
      iter = IndexedIterable(iter);
      if (iter.size === 0) {
        return this;
      }
      assertNotInfinite(iter.size);
      var newSize = this.size;
      var head = this._head;
      iter.reverse().forEach(function (value) {
        newSize++;
        head = {
          value: value,
          next: head
        };
      });
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    Stack.prototype.pop = function () {
      return this.slice(1);
    };

    Stack.prototype.unshift = function () /*...values*/{
      return this.push.apply(this, arguments);
    };

    Stack.prototype.unshiftAll = function (iter) {
      return this.pushAll(iter);
    };

    Stack.prototype.shift = function () {
      return this.pop.apply(this, arguments);
    };

    Stack.prototype.clear = function () {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._head = undefined;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyStack();
    };

    Stack.prototype.slice = function (begin, end) {
      if (wholeSlice(begin, end, this.size)) {
        return this;
      }
      var resolvedBegin = resolveBegin(begin, this.size);
      var resolvedEnd = resolveEnd(end, this.size);
      if (resolvedEnd !== this.size) {
        // super.slice(begin, end);
        return IndexedCollection.prototype.slice.call(this, begin, end);
      }
      var newSize = this.size - resolvedBegin;
      var head = this._head;
      while (resolvedBegin--) {
        head = head.next;
      }
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    // @pragma Mutability

    Stack.prototype.__ensureOwner = function (ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeStack(this.size, this._head, ownerID, this.__hash);
    };

    // @pragma Iteration

    Stack.prototype.__iterate = function (fn, reverse) {
      if (reverse) {
        return this.reverse().__iterate(fn);
      }
      var iterations = 0;
      var node = this._head;
      while (node) {
        if (fn(node.value, iterations++, this) === false) {
          break;
        }
        node = node.next;
      }
      return iterations;
    };

    Stack.prototype.__iterator = function (type, reverse) {
      if (reverse) {
        return this.reverse().__iterator(type);
      }
      var iterations = 0;
      var node = this._head;
      return new Iterator(function () {
        if (node) {
          var value = node.value;
          node = node.next;
          return iteratorValue(type, iterations++, value);
        }
        return iteratorDone();
      });
    };

    function isStack(maybeStack) {
      return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
    }

    Stack.isStack = isStack;

    var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

    var StackPrototype = Stack.prototype;
    StackPrototype[IS_STACK_SENTINEL] = true;
    StackPrototype.withMutations = MapPrototype.withMutations;
    StackPrototype.asMutable = MapPrototype.asMutable;
    StackPrototype.asImmutable = MapPrototype.asImmutable;
    StackPrototype.wasAltered = MapPrototype.wasAltered;

    function makeStack(size, head, ownerID, hash) {
      var map = Object.create(StackPrototype);
      map.size = size;
      map._head = head;
      map.__ownerID = ownerID;
      map.__hash = hash;
      map.__altered = false;
      return map;
    }

    var EMPTY_STACK;
    function emptyStack() {
      return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
    }

    /**
     * Contributes additional methods to a constructor
     */
    function mixin(ctor, methods) {
      var keyCopier = function (key) {
        ctor.prototype[key] = methods[key];
      };
      Object.keys(methods).forEach(keyCopier);
      Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(methods).forEach(keyCopier);
      return ctor;
    }

    Iterable.Iterator = Iterator;

    mixin(Iterable, {

      // ### Conversion to other types

      toArray: function () {
        assertNotInfinite(this.size);
        var array = new Array(this.size || 0);
        this.valueSeq().__iterate(function (v, i) {
          array[i] = v;
        });
        return array;
      },

      toIndexedSeq: function () {
        return new ToIndexedSequence(this);
      },

      toJS: function () {
        return this.toSeq().map(function (value) {
          return value && typeof value.toJS === 'function' ? value.toJS() : value;
        }).__toJS();
      },

      toJSON: function () {
        return this.toSeq().map(function (value) {
          return value && typeof value.toJSON === 'function' ? value.toJSON() : value;
        }).__toJS();
      },

      toKeyedSeq: function () {
        return new ToKeyedSequence(this, true);
      },

      toMap: function () {
        // Use Late Binding here to solve the circular dependency.
        return Map(this.toKeyedSeq());
      },

      toObject: function () {
        assertNotInfinite(this.size);
        var object = {};
        this.__iterate(function (v, k) {
          object[k] = v;
        });
        return object;
      },

      toOrderedMap: function () {
        // Use Late Binding here to solve the circular dependency.
        return OrderedMap(this.toKeyedSeq());
      },

      toOrderedSet: function () {
        // Use Late Binding here to solve the circular dependency.
        return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
      },

      toSet: function () {
        // Use Late Binding here to solve the circular dependency.
        return Set(isKeyed(this) ? this.valueSeq() : this);
      },

      toSetSeq: function () {
        return new ToSetSequence(this);
      },

      toSeq: function () {
        return isIndexed(this) ? this.toIndexedSeq() : isKeyed(this) ? this.toKeyedSeq() : this.toSetSeq();
      },

      toStack: function () {
        // Use Late Binding here to solve the circular dependency.
        return Stack(isKeyed(this) ? this.valueSeq() : this);
      },

      toList: function () {
        // Use Late Binding here to solve the circular dependency.
        return List(isKeyed(this) ? this.valueSeq() : this);
      },

      // ### Common JavaScript methods and properties

      toString: function () {
        return '[Iterable]';
      },

      __toString: function (head, tail) {
        if (this.size === 0) {
          return head + tail;
        }
        return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
      },

      // ### ES6 Collection methods (ES6 Array and Map)

      concat: function () {
        var values = SLICE$0.call(arguments, 0);
        return reify(this, concatFactory(this, values));
      },

      includes: function (searchValue) {
        return this.some(function (value) {
          return is(value, searchValue);
        });
      },

      entries: function () {
        return this.__iterator(ITERATE_ENTRIES);
      },

      every: function (predicate, context) {
        assertNotInfinite(this.size);
        var returnValue = true;
        this.__iterate(function (v, k, c) {
          if (!predicate.call(context, v, k, c)) {
            returnValue = false;
            return false;
          }
        });
        return returnValue;
      },

      filter: function (predicate, context) {
        return reify(this, filterFactory(this, predicate, context, true));
      },

      find: function (predicate, context, notSetValue) {
        var entry = this.findEntry(predicate, context);
        return entry ? entry[1] : notSetValue;
      },

      forEach: function (sideEffect, context) {
        assertNotInfinite(this.size);
        return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
      },

      join: function (separator) {
        assertNotInfinite(this.size);
        separator = separator !== undefined ? '' + separator : ',';
        var joined = '';
        var isFirst = true;
        this.__iterate(function (v) {
          isFirst ? isFirst = false : joined += separator;
          joined += v !== null && v !== undefined ? v.toString() : '';
        });
        return joined;
      },

      keys: function () {
        return this.__iterator(ITERATE_KEYS);
      },

      map: function (mapper, context) {
        return reify(this, mapFactory(this, mapper, context));
      },

      reduce: function (reducer, initialReduction, context) {
        assertNotInfinite(this.size);
        var reduction;
        var useFirst;
        if (arguments.length < 2) {
          useFirst = true;
        } else {
          reduction = initialReduction;
        }
        this.__iterate(function (v, k, c) {
          if (useFirst) {
            useFirst = false;
            reduction = v;
          } else {
            reduction = reducer.call(context, reduction, v, k, c);
          }
        });
        return reduction;
      },

      reduceRight: function (reducer, initialReduction, context) {
        var reversed = this.toKeyedSeq().reverse();
        return reversed.reduce.apply(reversed, arguments);
      },

      reverse: function () {
        return reify(this, reverseFactory(this, true));
      },

      slice: function (begin, end) {
        return reify(this, sliceFactory(this, begin, end, true));
      },

      some: function (predicate, context) {
        return !this.every(not(predicate), context);
      },

      sort: function (comparator) {
        return reify(this, sortFactory(this, comparator));
      },

      values: function () {
        return this.__iterator(ITERATE_VALUES);
      },

      // ### More sequential methods

      butLast: function () {
        return this.slice(0, -1);
      },

      isEmpty: function () {
        return this.size !== undefined ? this.size === 0 : !this.some(function () {
          return true;
        });
      },

      count: function (predicate, context) {
        return ensureSize(predicate ? this.toSeq().filter(predicate, context) : this);
      },

      countBy: function (grouper, context) {
        return countByFactory(this, grouper, context);
      },

      equals: function (other) {
        return deepEqual(this, other);
      },

      entrySeq: function () {
        var iterable = this;
        if (iterable._cache) {
          // We cache as an entries array, so we can just return the cache!
          return new ArraySeq(iterable._cache);
        }
        var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
        entriesSequence.fromEntrySeq = function () {
          return iterable.toSeq();
        };
        return entriesSequence;
      },

      filterNot: function (predicate, context) {
        return this.filter(not(predicate), context);
      },

      findEntry: function (predicate, context, notSetValue) {
        var found = notSetValue;
        this.__iterate(function (v, k, c) {
          if (predicate.call(context, v, k, c)) {
            found = [k, v];
            return false;
          }
        });
        return found;
      },

      findKey: function (predicate, context) {
        var entry = this.findEntry(predicate, context);
        return entry && entry[0];
      },

      findLast: function (predicate, context, notSetValue) {
        return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
      },

      findLastEntry: function (predicate, context, notSetValue) {
        return this.toKeyedSeq().reverse().findEntry(predicate, context, notSetValue);
      },

      findLastKey: function (predicate, context) {
        return this.toKeyedSeq().reverse().findKey(predicate, context);
      },

      first: function () {
        return this.find(returnTrue);
      },

      flatMap: function (mapper, context) {
        return reify(this, flatMapFactory(this, mapper, context));
      },

      flatten: function (depth) {
        return reify(this, flattenFactory(this, depth, true));
      },

      fromEntrySeq: function () {
        return new FromEntriesSequence(this);
      },

      get: function (searchKey, notSetValue) {
        return this.find(function (_, key) {
          return is(key, searchKey);
        }, undefined, notSetValue);
      },

      getIn: function (searchKeyPath, notSetValue) {
        var nested = this;
        // Note: in an ES6 environment, we would prefer:
        // for (var key of searchKeyPath) {
        var iter = forceIterator(searchKeyPath);
        var step;
        while (!(step = iter.next()).done) {
          var key = step.value;
          nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
          if (nested === NOT_SET) {
            return notSetValue;
          }
        }
        return nested;
      },

      groupBy: function (grouper, context) {
        return groupByFactory(this, grouper, context);
      },

      has: function (searchKey) {
        return this.get(searchKey, NOT_SET) !== NOT_SET;
      },

      hasIn: function (searchKeyPath) {
        return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
      },

      isSubset: function (iter) {
        iter = typeof iter.includes === 'function' ? iter : Iterable(iter);
        return this.every(function (value) {
          return iter.includes(value);
        });
      },

      isSuperset: function (iter) {
        iter = typeof iter.isSubset === 'function' ? iter : Iterable(iter);
        return iter.isSubset(this);
      },

      keyOf: function (searchValue) {
        return this.findKey(function (value) {
          return is(value, searchValue);
        });
      },

      keySeq: function () {
        return this.toSeq().map(keyMapper).toIndexedSeq();
      },

      last: function () {
        return this.toSeq().reverse().first();
      },

      lastKeyOf: function (searchValue) {
        return this.toKeyedSeq().reverse().keyOf(searchValue);
      },

      max: function (comparator) {
        return maxFactory(this, comparator);
      },

      maxBy: function (mapper, comparator) {
        return maxFactory(this, comparator, mapper);
      },

      min: function (comparator) {
        return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
      },

      minBy: function (mapper, comparator) {
        return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
      },

      rest: function () {
        return this.slice(1);
      },

      skip: function (amount) {
        return this.slice(Math.max(0, amount));
      },

      skipLast: function (amount) {
        return reify(this, this.toSeq().reverse().skip(amount).reverse());
      },

      skipWhile: function (predicate, context) {
        return reify(this, skipWhileFactory(this, predicate, context, true));
      },

      skipUntil: function (predicate, context) {
        return this.skipWhile(not(predicate), context);
      },

      sortBy: function (mapper, comparator) {
        return reify(this, sortFactory(this, comparator, mapper));
      },

      take: function (amount) {
        return this.slice(0, Math.max(0, amount));
      },

      takeLast: function (amount) {
        return reify(this, this.toSeq().reverse().take(amount).reverse());
      },

      takeWhile: function (predicate, context) {
        return reify(this, takeWhileFactory(this, predicate, context));
      },

      takeUntil: function (predicate, context) {
        return this.takeWhile(not(predicate), context);
      },

      valueSeq: function () {
        return this.toIndexedSeq();
      },

      // ### Hashable Object

      hashCode: function () {
        return this.__hash || (this.__hash = hashIterable(this));
      }

      // ### Internal

      // abstract __iterate(fn, reverse)

      // abstract __iterator(type, reverse)
    });

    // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
    // var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
    // var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
    // var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

    var IterablePrototype = Iterable.prototype;
    IterablePrototype[IS_ITERABLE_SENTINEL] = true;
    IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
    IterablePrototype.__toJS = IterablePrototype.toArray;
    IterablePrototype.__toStringMapper = quoteString;
    IterablePrototype.inspect = IterablePrototype.toSource = function () {
      return this.toString();
    };
    IterablePrototype.chain = IterablePrototype.flatMap;
    IterablePrototype.contains = IterablePrototype.includes;

    mixin(KeyedIterable, {

      // ### More sequential methods

      flip: function () {
        return reify(this, flipFactory(this));
      },

      mapEntries: function (mapper, context) {
        var this$0 = this;
        var iterations = 0;
        return reify(this, this.toSeq().map(function (v, k) {
          return mapper.call(context, [k, v], iterations++, this$0);
        }).fromEntrySeq());
      },

      mapKeys: function (mapper, context) {
        var this$0 = this;
        return reify(this, this.toSeq().flip().map(function (k, v) {
          return mapper.call(context, k, v, this$0);
        }).flip());
      }

    });

    var KeyedIterablePrototype = KeyedIterable.prototype;
    KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
    KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
    KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
    KeyedIterablePrototype.__toStringMapper = function (v, k) {
      return JSON.stringify(k) + ': ' + quoteString(v);
    };

    mixin(IndexedIterable, {

      // ### Conversion to other types

      toKeyedSeq: function () {
        return new ToKeyedSequence(this, false);
      },

      // ### ES6 Collection methods (ES6 Array and Map)

      filter: function (predicate, context) {
        return reify(this, filterFactory(this, predicate, context, false));
      },

      findIndex: function (predicate, context) {
        var entry = this.findEntry(predicate, context);
        return entry ? entry[0] : -1;
      },

      indexOf: function (searchValue) {
        var key = this.keyOf(searchValue);
        return key === undefined ? -1 : key;
      },

      lastIndexOf: function (searchValue) {
        var key = this.lastKeyOf(searchValue);
        return key === undefined ? -1 : key;
      },

      reverse: function () {
        return reify(this, reverseFactory(this, false));
      },

      slice: function (begin, end) {
        return reify(this, sliceFactory(this, begin, end, false));
      },

      splice: function (index, removeNum /*, ...values*/) {
        var numArgs = arguments.length;
        removeNum = Math.max(removeNum | 0, 0);
        if (numArgs === 0 || numArgs === 2 && !removeNum) {
          return this;
        }
        // If index is negative, it should resolve relative to the size of the
        // collection. However size may be expensive to compute if not cached, so
        // only call count() if the number is in fact negative.
        index = resolveBegin(index, index < 0 ? this.count() : this.size);
        var spliced = this.slice(0, index);
        return reify(this, numArgs === 1 ? spliced : spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum)));
      },

      // ### More collection methods

      findLastIndex: function (predicate, context) {
        var entry = this.findLastEntry(predicate, context);
        return entry ? entry[0] : -1;
      },

      first: function () {
        return this.get(0);
      },

      flatten: function (depth) {
        return reify(this, flattenFactory(this, depth, false));
      },

      get: function (index, notSetValue) {
        index = wrapIndex(this, index);
        return index < 0 || this.size === Infinity || this.size !== undefined && index > this.size ? notSetValue : this.find(function (_, key) {
          return key === index;
        }, undefined, notSetValue);
      },

      has: function (index) {
        index = wrapIndex(this, index);
        return index >= 0 && (this.size !== undefined ? this.size === Infinity || index < this.size : this.indexOf(index) !== -1);
      },

      interpose: function (separator) {
        return reify(this, interposeFactory(this, separator));
      },

      interleave: function () /*...iterables*/{
        var iterables = [this].concat(arrCopy(arguments));
        var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
        var interleaved = zipped.flatten(true);
        if (zipped.size) {
          interleaved.size = zipped.size * iterables.length;
        }
        return reify(this, interleaved);
      },

      keySeq: function () {
        return Range(0, this.size);
      },

      last: function () {
        return this.get(-1);
      },

      skipWhile: function (predicate, context) {
        return reify(this, skipWhileFactory(this, predicate, context, false));
      },

      zip: function () /*, ...iterables */{
        var iterables = [this].concat(arrCopy(arguments));
        return reify(this, zipWithFactory(this, defaultZipper, iterables));
      },

      zipWith: function (zipper /*, ...iterables */) {
        var iterables = arrCopy(arguments);
        iterables[0] = this;
        return reify(this, zipWithFactory(this, zipper, iterables));
      }

    });

    IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
    IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;

    mixin(SetIterable, {

      // ### ES6 Collection methods (ES6 Array and Map)

      get: function (value, notSetValue) {
        return this.has(value) ? value : notSetValue;
      },

      includes: function (value) {
        return this.has(value);
      },

      // ### More sequential methods

      keySeq: function () {
        return this.valueSeq();
      }

    });

    SetIterable.prototype.has = IterablePrototype.includes;
    SetIterable.prototype.contains = SetIterable.prototype.includes;

    // Mixin subclasses

    mixin(KeyedSeq, KeyedIterable.prototype);
    mixin(IndexedSeq, IndexedIterable.prototype);
    mixin(SetSeq, SetIterable.prototype);

    mixin(KeyedCollection, KeyedIterable.prototype);
    mixin(IndexedCollection, IndexedIterable.prototype);
    mixin(SetCollection, SetIterable.prototype);

    // #pragma Helper functions

    function keyMapper(v, k) {
      return k;
    }

    function entryMapper(v, k) {
      return [k, v];
    }

    function not(predicate) {
      return function () {
        return !predicate.apply(this, arguments);
      };
    }

    function neg(predicate) {
      return function () {
        return -predicate.apply(this, arguments);
      };
    }

    function quoteString(value) {
      return typeof value === 'string' ? JSON.stringify(value) : String(value);
    }

    function defaultZipper() {
      return arrCopy(arguments);
    }

    function defaultNegComparator(a, b) {
      return a < b ? 1 : a > b ? -1 : 0;
    }

    function hashIterable(iterable) {
      if (iterable.size === Infinity) {
        return 0;
      }
      var ordered = isOrdered(iterable);
      var keyed = isKeyed(iterable);
      var h = ordered ? 1 : 0;
      var size = iterable.__iterate(keyed ? ordered ? function (v, k) {
        h = 31 * h + hashMerge(hash(v), hash(k)) | 0;
      } : function (v, k) {
        h = h + hashMerge(hash(v), hash(k)) | 0;
      } : ordered ? function (v) {
        h = 31 * h + hash(v) | 0;
      } : function (v) {
        h = h + hash(v) | 0;
      });
      return murmurHashOfSize(size, h);
    }

    function murmurHashOfSize(size, h) {
      h = imul(h, 0xCC9E2D51);
      h = imul(h << 15 | h >>> -15, 0x1B873593);
      h = imul(h << 13 | h >>> -13, 5);
      h = (h + 0xE6546B64 | 0) ^ size;
      h = imul(h ^ h >>> 16, 0x85EBCA6B);
      h = imul(h ^ h >>> 13, 0xC2B2AE35);
      h = smi(h ^ h >>> 16);
      return h;
    }

    function hashMerge(a, b) {
      return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int
    }

    var Immutable = {

      Iterable: Iterable,

      Seq: Seq,
      Collection: Collection,
      Map: Map,
      OrderedMap: OrderedMap,
      List: List,
      Stack: Stack,
      Set: Set,
      OrderedSet: OrderedSet,

      Record: Record,
      Range: Range,
      Repeat: Repeat,

      is: is,
      fromJS: fromJS

    };

    return Immutable;
  });
});
System.registerDynamic("npm:immutable@3.8.1.js", ["npm:immutable@3.8.1/dist/immutable.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("npm:immutable@3.8.1/dist/immutable.js");
});
System.registerDynamic("src-reactive/app/asscan.js", ["npm:rxjs@5.2.0/Observable.js", "npm:rxjs@5.2.0/Subject.js", "npm:rxjs@5.2.0/add/observable/range.js", "npm:rxjs@5.2.0/add/observable/interval.js", "npm:rxjs@5.2.0/add/observable/never.js", "npm:rxjs@5.2.0/add/observable/empty.js", "npm:rxjs@5.2.0/add/observable/merge.js", "npm:rxjs@5.2.0/add/operator/mergeMap.js", "npm:rxjs@5.2.0/add/operator/map.js", "npm:rxjs@5.2.0/add/operator/scan.js", "npm:rxjs@5.2.0/add/operator/audit.js", "npm:rxjs@5.2.0/add/operator/count.js", "npm:rxjs@5.2.0/add/operator/materialize.js", "npm:rxjs@5.2.0/add/operator/dematerialize.js", "npm:rxjs@5.2.0/add/operator/mergeScan.js", "npm:rxjs@5.2.0/add/operator/multicast.js", "npm:rxjs@5.2.0/add/operator/find.js", "npm:rxjs@5.2.0/add/operator/concat.js", "npm:rxjs@5.2.0/add/operator/every.js", "npm:immutable@3.8.1.js", "src-reactive/app/helper.js"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    var Observable_1 = $__require("npm:rxjs@5.2.0/Observable.js");
    var Subject_1 = $__require("npm:rxjs@5.2.0/Subject.js");
    $__require("npm:rxjs@5.2.0/add/observable/range.js");
    $__require("npm:rxjs@5.2.0/add/observable/interval.js");
    $__require("npm:rxjs@5.2.0/add/observable/never.js");
    $__require("npm:rxjs@5.2.0/add/observable/empty.js");
    $__require("npm:rxjs@5.2.0/add/observable/merge.js");
    $__require("npm:rxjs@5.2.0/add/operator/mergeMap.js");
    $__require("npm:rxjs@5.2.0/add/operator/map.js");
    $__require("npm:rxjs@5.2.0/add/operator/scan.js");
    $__require("npm:rxjs@5.2.0/add/operator/audit.js");
    $__require("npm:rxjs@5.2.0/add/operator/count.js");
    $__require("npm:rxjs@5.2.0/add/operator/materialize.js");
    $__require("npm:rxjs@5.2.0/add/operator/dematerialize.js");
    $__require("npm:rxjs@5.2.0/add/operator/mergeScan.js");
    $__require("npm:rxjs@5.2.0/add/operator/multicast.js");
    $__require("npm:rxjs@5.2.0/add/operator/find.js");
    $__require("npm:rxjs@5.2.0/add/operator/concat.js");
    $__require("npm:rxjs@5.2.0/add/operator/every.js");
    var immutable_1 = $__require("npm:immutable@3.8.1.js");
    var helper_1 = $__require("src-reactive/app/helper.js");
    function mapAsScan(testButton, placeholder) {
        var numbers = Observable_1.Observable.range(1, 3);
        var doubleAsMap = numbers.map(function (value) {
            return value * 2;
        });
        var doubleAsScan = numbers.scan(function (ignore, value) {
            return value * 2;
        }, undefined);
        doubleAsMap.subscribe(helper_1.simpleObserver('map'));
        doubleAsScan.subscribe(helper_1.simpleObserver('scan'));
    }
    exports.mapAsScan = mapAsScan;
    function bufferAsScan1(testButton, placeholder) {
        var generator = Observable_1.Observable.interval(500);
        var clicks = Observable_1.Observable.fromEvent(helper_1.buttonForTest('flush', placeholder), 'click');
        var asBuffer = generator.buffer(clicks);
        var asScan = Observable_1.Observable.merge(generator, clicks.mapTo('flush')).scan(function (state, value) {
            if (state.nextflush) {
                state.storage = [];
                state.nextflush = false;
            }
            if (value === 'flush') {
                state.nextflush = true;
            } else {
                state.storage.push(value);
            }
            return state;
        }, { nextflush: false, storage: [] }).mergeMap(function (state) {
            return state.nextflush ? Observable_1.Observable.of(state.storage) : Observable_1.Observable.empty();
        });
        asBuffer.subscribe(helper_1.simpleObserver('buffer'));
        asScan.subscribe(helper_1.simpleObserver('scan'));
    }
    exports.bufferAsScan1 = bufferAsScan1;
    function bufferAsScan2(testButton, placeholder) {
        var generator = Observable_1.Observable.interval(500);
        var clicks = Observable_1.Observable.fromEvent(helper_1.buttonForTest('flush', placeholder), 'click');
        var asBuffer = generator.buffer(clicks);
        var asScan = Observable_1.Observable.merge(generator.map(function (value) {
            return function (state) {
                state.storage.push(value);
            };
        }), clicks.map(function (value) {
            return function (state) {
                state.nextflush = true;
            };
        })).scan(function (state, changeFn) {
            if (state.nextflush) {
                state.storage = [];
                state.nextflush = false;
            }
            changeFn(state);
            return state;
        }, { nextflush: false, storage: [] }).mergeMap(function (state) {
            return state.nextflush ? Observable_1.Observable.of(state.storage) : Observable_1.Observable.empty();
        });
        asBuffer.subscribe(helper_1.simpleObserver('buffer'));
        asScan.subscribe(helper_1.simpleObserver('scan'));
    }
    exports.bufferAsScan2 = bufferAsScan2;
    function auditAsScan(testButton, placeholder) {
        var generator = Observable_1.Observable.interval(500);
        var clicks = Observable_1.Observable.fromEvent(helper_1.buttonForTest('sampleing latest', placeholder), 'click');
        var asAudit = generator.audit(function (value) {
            return clicks;
        });
        var asScan1 = Observable_1.Observable.merge(generator, clicks.mapTo('sample')).scan(function (state, value) {
            if (state.nextflush) {
                state.nextflush = false;
                state.last = null;
            }
            if (value === 'sample') {
                state.nextflush = true;
            } else {
                state.last = value;
            }
            return state;
        }, { nextflush: false, last: null }).mergeMap(function (state) {
            return state.nextflush && state.last !== null ? Observable_1.Observable.of(state.last) : Observable_1.Observable.empty();
        });
        var selector = generator.mergeMap(function (value) {
            return clicks.mapTo('sample');
        });
        var asScan2 = Observable_1.Observable.merge(generator, selector).scan(function (state, value) {
            if (state.nextflush) {
                state.nextflush = false;
                state.last = null;
            }
            if (value === 'sample') {
                state.nextflush = true;
            } else {
                state.last = value;
            }
            return state;
        }, { nextflush: false, last: null }).mergeMap(function (state) {
            return state.nextflush && state.last !== null ? Observable_1.Observable.of(state.last) : Observable_1.Observable.empty();
        });
        asAudit.subscribe(helper_1.simpleObserver('audit'));
        asScan1.subscribe(helper_1.simpleObserver('scan1'));
        asScan2.subscribe(helper_1.simpleObserver('scan2'));
    }
    exports.auditAsScan = auditAsScan;
    function countAsScan(testButton, placeholder) {
        var generator = Observable_1.Observable.interval(500).take(3);
        var asCount = generator.count();
        var asScan = generator.materialize().scan(function (state, value) {
            if (value.kind === 'C') state.isLast = true;else if (value.kind === 'N') state.count += 1;
            return state;
        }, { count: 0, isLast: false }).mergeMap(function (state) {
            return state.isLast ? Observable_1.Observable.of(state.count) : Observable_1.Observable.empty();
        });
        asCount.subscribe(helper_1.simpleObserver('count'));
        asScan.subscribe(helper_1.simpleObserver('scan'));
    }
    exports.countAsScan = countAsScan;
    function filterAsScan(testButton, placeholder) {
        var generator = Observable_1.Observable.interval(200).take(10);
        var asFilter = generator.filter(function (value) {
            return value % 2 == 0 ? true : false;
        });
        var asScan = generator.mergeScan(function (ignore, value) {
            return value % 2 == 0 ? Observable_1.Observable.of(value) : Observable_1.Observable.empty();
        }, null);
        asFilter.subscribe(helper_1.simpleObserver('filter'));
        asScan.subscribe(helper_1.simpleObserver('scan'));
    }
    exports.filterAsScan = filterAsScan;
    function distinctAsScan(testButton, placeholder) {
        var generator = Observable_1.Observable.interval(100).map(function (ignore) {
            return Math.floor(Math.random() * 10);
        }).take(20).multicast(new Subject_1.Subject()).refCount();
        var asDistinct = generator.distinct();
        var asScan = generator.scan(function (state, value) {
            if (state.isNew) {
                state.isNew = false;
                state.newValue = undefined;
            }
            var immutableValue = immutable_1.fromJS(value);
            if (!state.storage.has(immutableValue)) {
                state.storage = state.storage.add(immutableValue);
                state.newValue = value;
                state.isNew = true;
            }
            return state;
        }, { isNew: false, newValue: undefined, storage: immutable_1.Set() }).mergeMap(function (state) {
            return state.isNew ? Observable_1.Observable.of(state.newValue) : Observable_1.Observable.empty();
        });
        asDistinct.subscribe(helper_1.simpleObserver('distinct'));
        asScan.subscribe(helper_1.simpleObserver('scan'));
    }
    exports.distinctAsScan = distinctAsScan;
    function findAsScan(testButton, placeholder) {
        var generator = Observable_1.Observable.interval(200);
        var asFind = generator.find(function (value) {
            return value > 5 ? true : false;
        });
        var asScan = generator.mergeScan(function (ignore, value) {
            // let complete = Notification.createComplete();
            // return Observable.merge(Observable.of(value), Observable.of(complete).dematerialize())
            return value > 5 ? Observable_1.Observable.of(value) : Observable_1.Observable.empty();
        }, null).do(function (value) {
            return console.log('do called');
        });
        // .take(1)
        asFind.subscribe(helper_1.simpleObserver('find'));
        asScan.subscribe(helper_1.simpleObserver('scan'));
    }
    exports.findAsScan = findAsScan;
    function isEmptyAsScan(testButton, placeholder) {
        var generator = Observable_1.Observable.interval(200).do(function (value) {
            return console.log("interval[" + value + "]");
        }).take(3).ignoreElements();
        var asIsEmpty = generator.isEmpty();
        var asScan = generator.scan(function (isEmpty, value) {
            return false;
        }, true).every(function (isEmpty) {
            return isEmpty;
        });
        asIsEmpty.subscribe(helper_1.simpleObserver('isEmpty'));
        asScan.subscribe(helper_1.simpleObserver('reduce'));
    }
    exports.isEmptyAsScan = isEmptyAsScan;
});
System.registerDynamic("npm:rxjs@5.2.0/util/isArray.js", [], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.isArray = Array.isArray || function (x) {
    return x && typeof x.length === 'number';
  };
  
});
System.registerDynamic("npm:rxjs@5.2.0/util/isObject.js", [], true, function ($__require, exports, module) {
    /* */
    "use strict";

    var global = this || self,
        GLOBAL = global;
    function isObject(x) {
        return x != null && typeof x === 'object';
    }
    exports.isObject = isObject;
    
});
System.registerDynamic("npm:rxjs@5.2.0/util/isFunction.js", [], true, function ($__require, exports, module) {
    /* */
    "use strict";

    var global = this || self,
        GLOBAL = global;
    function isFunction(x) {
        return typeof x === 'function';
    }
    exports.isFunction = isFunction;
    
});
System.registerDynamic("npm:rxjs@5.2.0/util/tryCatch.js", ["npm:rxjs@5.2.0/util/errorObject.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var errorObject_1 = $__require("npm:rxjs@5.2.0/util/errorObject.js");
  var tryCatchTarget;
  function tryCatcher() {
    try {
      return tryCatchTarget.apply(this, arguments);
    } catch (e) {
      errorObject_1.errorObject.e = e;
      return errorObject_1.errorObject;
    }
  }
  function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
  }
  exports.tryCatch = tryCatch;
  ;
});
System.registerDynamic("npm:rxjs@5.2.0/util/errorObject.js", [], true, function ($__require, exports, module) {
  /* */
  "use strict";
  // typeof any so that it we don't have to cast when comparing a result to the error object

  var global = this || self,
      GLOBAL = global;
  exports.errorObject = { e: {} };
  
});
System.registerDynamic("npm:rxjs@5.2.0/util/UnsubscriptionError.js", [], true, function ($__require, exports, module) {
    /* */
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    /**
     * An error thrown when one or more errors have occurred during the
     * `unsubscribe` of a {@link Subscription}.
     */
    var UnsubscriptionError = function (_super) {
        __extends(UnsubscriptionError, _super);
        function UnsubscriptionError(errors) {
            _super.call(this);
            this.errors = errors;
            var err = Error.call(this, errors ? errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) {
                return i + 1 + ") " + err.toString();
            }).join('\n  ') : '');
            this.name = err.name = 'UnsubscriptionError';
            this.stack = err.stack;
            this.message = err.message;
        }
        return UnsubscriptionError;
    }(Error);
    exports.UnsubscriptionError = UnsubscriptionError;
    
});
System.registerDynamic('npm:process@0.11.9/browser.js', [], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    // shim for using process in browser
    var process = module.exports = {};

    // cached from whatever global is present so that test runners that stub it
    // don't break things.  But we need to wrap it in a try catch in case it is
    // wrapped in strict mode code which doesn't define any globals.  It's inside a
    // function because try/catches deoptimize in certain engines.

    var cachedSetTimeout;
    var cachedClearTimeout;

    function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
    }
    function defaultClearTimeout() {
        throw new Error('clearTimeout has not been defined');
    }
    (function () {
        try {
            if (typeof setTimeout === 'function') {
                cachedSetTimeout = setTimeout;
            } else {
                cachedSetTimeout = defaultSetTimout;
            }
        } catch (e) {
            cachedSetTimeout = defaultSetTimout;
        }
        try {
            if (typeof clearTimeout === 'function') {
                cachedClearTimeout = clearTimeout;
            } else {
                cachedClearTimeout = defaultClearTimeout;
            }
        } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
        }
    })();
    function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
            //normal enviroments in sane situations
            return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
        }
        try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedSetTimeout(fun, 0);
        } catch (e) {
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                return cachedSetTimeout.call(null, fun, 0);
            } catch (e) {
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                return cachedSetTimeout.call(this, fun, 0);
            }
        }
    }
    function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
            //normal enviroments in sane situations
            return clearTimeout(marker);
        }
        // if clearTimeout wasn't available but was latter defined
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
        }
        try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedClearTimeout(marker);
        } catch (e) {
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                return cachedClearTimeout.call(null, marker);
            } catch (e) {
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                return cachedClearTimeout.call(this, marker);
            }
        }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;

    function cleanUpNextTick() {
        if (!draining || !currentQueue) {
            return;
        }
        draining = false;
        if (currentQueue.length) {
            queue = currentQueue.concat(queue);
        } else {
            queueIndex = -1;
        }
        if (queue.length) {
            drainQueue();
        }
    }

    function drainQueue() {
        if (draining) {
            return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;

        var len = queue.length;
        while (len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
                if (currentQueue) {
                    currentQueue[queueIndex].run();
                }
            }
            queueIndex = -1;
            len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
    }

    process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                args[i - 1] = arguments[i];
            }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
        }
    };

    // v8 likes predictible objects
    function Item(fun, array) {
        this.fun = fun;
        this.array = array;
    }
    Item.prototype.run = function () {
        this.fun.apply(null, this.array);
    };
    process.title = 'browser';
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = ''; // empty string to avoid regexp issues
    process.versions = {};

    function noop() {}

    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;

    process.binding = function (name) {
        throw new Error('process.binding is not supported');
    };

    process.cwd = function () {
        return '/';
    };
    process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
    };
    process.umask = function () {
        return 0;
    };
});
System.registerDynamic("npm:process@0.11.9.js", ["npm:process@0.11.9/browser.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("npm:process@0.11.9/browser.js");
});
System.registerDynamic('github:jspm/nodelibs-process@0.1.2/index.js', ['npm:process@0.11.9.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = System._nodeRequire ? process : $__require('npm:process@0.11.9.js');
});
System.registerDynamic("github:jspm/nodelibs-process@0.1.2.js", ["github:jspm/nodelibs-process@0.1.2/index.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("github:jspm/nodelibs-process@0.1.2/index.js");
});
System.registerDynamic('npm:rxjs@5.2.0/Subscription.js', ['npm:rxjs@5.2.0/util/isArray.js', 'npm:rxjs@5.2.0/util/isObject.js', 'npm:rxjs@5.2.0/util/isFunction.js', 'npm:rxjs@5.2.0/util/tryCatch.js', 'npm:rxjs@5.2.0/util/errorObject.js', 'npm:rxjs@5.2.0/util/UnsubscriptionError.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    "use strict";

    var isArray_1 = $__require('npm:rxjs@5.2.0/util/isArray.js');
    var isObject_1 = $__require('npm:rxjs@5.2.0/util/isObject.js');
    var isFunction_1 = $__require('npm:rxjs@5.2.0/util/isFunction.js');
    var tryCatch_1 = $__require('npm:rxjs@5.2.0/util/tryCatch.js');
    var errorObject_1 = $__require('npm:rxjs@5.2.0/util/errorObject.js');
    var UnsubscriptionError_1 = $__require('npm:rxjs@5.2.0/util/UnsubscriptionError.js');
    var Subscription = function () {
      function Subscription(unsubscribe) {
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
          this._unsubscribe = unsubscribe;
        }
      }
      Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
          return;
        }
        var _a = this,
            _parent = _a._parent,
            _parents = _a._parents,
            _unsubscribe = _a._unsubscribe,
            _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        while (_parent) {
          _parent.remove(this);
          _parent = ++index < len && _parents[index] || null;
        }
        if (isFunction_1.isFunction(_unsubscribe)) {
          var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
          if (trial === errorObject_1.errorObject) {
            hasErrors = true;
            errors = errors || (errorObject_1.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ? flattenUnsubscriptionErrors(errorObject_1.errorObject.e.errors) : [errorObject_1.errorObject.e]);
          }
        }
        if (isArray_1.isArray(_subscriptions)) {
          index = -1;
          len = _subscriptions.length;
          while (++index < len) {
            var sub = _subscriptions[index];
            if (isObject_1.isObject(sub)) {
              var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
              if (trial === errorObject_1.errorObject) {
                hasErrors = true;
                errors = errors || [];
                var err = errorObject_1.errorObject.e;
                if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                  errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                } else {
                  errors.push(err);
                }
              }
            }
          }
        }
        if (hasErrors) {
          throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
      };
      Subscription.prototype.add = function (teardown) {
        if (!teardown || teardown === Subscription.EMPTY) {
          return Subscription.EMPTY;
        }
        if (teardown === this) {
          return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
          case 'function':
            subscription = new Subscription(teardown);
          case 'object':
            if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
              return subscription;
            } else if (this.closed) {
              subscription.unsubscribe();
              return subscription;
            } else if (typeof subscription._addParent !== 'function') {
              var tmp = subscription;
              subscription = new Subscription();
              subscription._subscriptions = [tmp];
            }
            break;
          default:
            throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
      };
      Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
          var subscriptionIndex = subscriptions.indexOf(subscription);
          if (subscriptionIndex !== -1) {
            subscriptions.splice(subscriptionIndex, 1);
          }
        }
      };
      Subscription.prototype._addParent = function (parent) {
        var _a = this,
            _parent = _a._parent,
            _parents = _a._parents;
        if (!_parent || _parent === parent) {
          this._parent = parent;
        } else if (!_parents) {
          this._parents = [parent];
        } else if (_parents.indexOf(parent) === -1) {
          _parents.push(parent);
        }
      };
      Subscription.EMPTY = function (empty) {
        empty.closed = true;
        return empty;
      }(new Subscription());
      return Subscription;
    }();
    exports.Subscription = Subscription;
    function flattenUnsubscriptionErrors(errors) {
      return errors.reduce(function (errs, err) {
        return errs.concat(err instanceof UnsubscriptionError_1.UnsubscriptionError ? err.errors : err);
      }, []);
    }
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
});
System.registerDynamic('npm:rxjs@5.2.0/Subscriber.js', ['npm:rxjs@5.2.0/util/isFunction.js', 'npm:rxjs@5.2.0/Subscription.js', 'npm:rxjs@5.2.0/Observer.js', 'npm:rxjs@5.2.0/symbol/rxSubscriber.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var __extends = this && this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var isFunction_1 = $__require('npm:rxjs@5.2.0/util/isFunction.js');
  var Subscription_1 = $__require('npm:rxjs@5.2.0/Subscription.js');
  var Observer_1 = $__require('npm:rxjs@5.2.0/Observer.js');
  var rxSubscriber_1 = $__require('npm:rxjs@5.2.0/symbol/rxSubscriber.js');
  var Subscriber = function (_super) {
    __extends(Subscriber, _super);
    function Subscriber(destinationOrNext, error, complete) {
      _super.call(this);
      this.syncErrorValue = null;
      this.syncErrorThrown = false;
      this.syncErrorThrowable = false;
      this.isStopped = false;
      switch (arguments.length) {
        case 0:
          this.destination = Observer_1.empty;
          break;
        case 1:
          if (!destinationOrNext) {
            this.destination = Observer_1.empty;
            break;
          }
          if (typeof destinationOrNext === 'object') {
            if (destinationOrNext instanceof Subscriber) {
              this.destination = destinationOrNext;
              this.destination.add(this);
            } else {
              this.syncErrorThrowable = true;
              this.destination = new SafeSubscriber(this, destinationOrNext);
            }
            break;
          }
        default:
          this.syncErrorThrowable = true;
          this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
          break;
      }
    }
    Subscriber.prototype[rxSubscriber_1.$$rxSubscriber] = function () {
      return this;
    };
    Subscriber.create = function (next, error, complete) {
      var subscriber = new Subscriber(next, error, complete);
      subscriber.syncErrorThrowable = false;
      return subscriber;
    };
    Subscriber.prototype.next = function (value) {
      if (!this.isStopped) {
        this._next(value);
      }
    };
    Subscriber.prototype.error = function (err) {
      if (!this.isStopped) {
        this.isStopped = true;
        this._error(err);
      }
    };
    Subscriber.prototype.complete = function () {
      if (!this.isStopped) {
        this.isStopped = true;
        this._complete();
      }
    };
    Subscriber.prototype.unsubscribe = function () {
      if (this.closed) {
        return;
      }
      this.isStopped = true;
      _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
      this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
      this.destination.error(err);
      this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
      this.destination.complete();
      this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
      var _a = this,
          _parent = _a._parent,
          _parents = _a._parents;
      this._parent = null;
      this._parents = null;
      this.unsubscribe();
      this.closed = false;
      this.isStopped = false;
      this._parent = _parent;
      this._parents = _parents;
      return this;
    };
    return Subscriber;
  }(Subscription_1.Subscription);
  exports.Subscriber = Subscriber;
  var SafeSubscriber = function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
      _super.call(this);
      this._parentSubscriber = _parentSubscriber;
      var next;
      var context = this;
      if (isFunction_1.isFunction(observerOrNext)) {
        next = observerOrNext;
      } else if (observerOrNext) {
        context = observerOrNext;
        next = observerOrNext.next;
        error = observerOrNext.error;
        complete = observerOrNext.complete;
        if (isFunction_1.isFunction(context.unsubscribe)) {
          this.add(context.unsubscribe.bind(context));
        }
        context.unsubscribe = this.unsubscribe.bind(this);
      }
      this._context = context;
      this._next = next;
      this._error = error;
      this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
      if (!this.isStopped && this._next) {
        var _parentSubscriber = this._parentSubscriber;
        if (!_parentSubscriber.syncErrorThrowable) {
          this.__tryOrUnsub(this._next, value);
        } else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
          this.unsubscribe();
        }
      }
    };
    SafeSubscriber.prototype.error = function (err) {
      if (!this.isStopped) {
        var _parentSubscriber = this._parentSubscriber;
        if (this._error) {
          if (!_parentSubscriber.syncErrorThrowable) {
            this.__tryOrUnsub(this._error, err);
            this.unsubscribe();
          } else {
            this.__tryOrSetError(_parentSubscriber, this._error, err);
            this.unsubscribe();
          }
        } else if (!_parentSubscriber.syncErrorThrowable) {
          this.unsubscribe();
          throw err;
        } else {
          _parentSubscriber.syncErrorValue = err;
          _parentSubscriber.syncErrorThrown = true;
          this.unsubscribe();
        }
      }
    };
    SafeSubscriber.prototype.complete = function () {
      if (!this.isStopped) {
        var _parentSubscriber = this._parentSubscriber;
        if (this._complete) {
          if (!_parentSubscriber.syncErrorThrowable) {
            this.__tryOrUnsub(this._complete);
            this.unsubscribe();
          } else {
            this.__tryOrSetError(_parentSubscriber, this._complete);
            this.unsubscribe();
          }
        } else {
          this.unsubscribe();
        }
      }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
      try {
        fn.call(this._context, value);
      } catch (err) {
        this.unsubscribe();
        throw err;
      }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
      try {
        fn.call(this._context, value);
      } catch (err) {
        parent.syncErrorValue = err;
        parent.syncErrorThrown = true;
        return true;
      }
      return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
      var _parentSubscriber = this._parentSubscriber;
      this._context = null;
      this._parentSubscriber = null;
      _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
  }(Subscriber);
});
System.registerDynamic('npm:rxjs@5.2.0/symbol/rxSubscriber.js', ['npm:rxjs@5.2.0/util/root.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var root_1 = $__require('npm:rxjs@5.2.0/util/root.js');
  var Symbol = root_1.root.Symbol;
  exports.$$rxSubscriber = typeof Symbol === 'function' && typeof Symbol.for === 'function' ? Symbol.for('rxSubscriber') : '@@rxSubscriber';
});
System.registerDynamic("npm:rxjs@5.2.0/Observer.js", [], true, function ($__require, exports, module) {
    /* */
    "use strict";

    var global = this || self,
        GLOBAL = global;
    exports.empty = {
        closed: true,
        next: function (value) {},
        error: function (err) {
            throw err;
        },
        complete: function () {}
    };
    
});
System.registerDynamic('npm:rxjs@5.2.0/util/toSubscriber.js', ['npm:rxjs@5.2.0/Subscriber.js', 'npm:rxjs@5.2.0/symbol/rxSubscriber.js', 'npm:rxjs@5.2.0/Observer.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Subscriber_1 = $__require('npm:rxjs@5.2.0/Subscriber.js');
  var rxSubscriber_1 = $__require('npm:rxjs@5.2.0/symbol/rxSubscriber.js');
  var Observer_1 = $__require('npm:rxjs@5.2.0/Observer.js');
  function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
      if (nextOrObserver instanceof Subscriber_1.Subscriber) {
        return nextOrObserver;
      }
      if (nextOrObserver[rxSubscriber_1.$$rxSubscriber]) {
        return nextOrObserver[rxSubscriber_1.$$rxSubscriber]();
      }
    }
    if (!nextOrObserver && !error && !complete) {
      return new Subscriber_1.Subscriber(Observer_1.empty);
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
  }
  exports.toSubscriber = toSubscriber;
});
System.registerDynamic('npm:rxjs@5.2.0/util/root.js', [], true, function ($__require, exports, module) {
    /* */
    "use strict";
    /**
     * window: browser in DOM main thread
     * self: browser in WebWorker
     * global: Node.js/other
     */

    var global = this || self,
        GLOBAL = global;
    exports.root = typeof window == 'object' && window.window === window && window || typeof self == 'object' && self.self === self && self || typeof global == 'object' && global.global === global && global;
    if (!exports.root) {
        throw new Error('RxJS could not find any global context (window, self, global)');
    }
    
});
System.registerDynamic('npm:rxjs@5.2.0/symbol/observable.js', ['npm:rxjs@5.2.0/util/root.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var root_1 = $__require('npm:rxjs@5.2.0/util/root.js');
  function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
      if (Symbol.observable) {
        $$observable = Symbol.observable;
      } else {
        $$observable = Symbol('observable');
        Symbol.observable = $$observable;
      }
    } else {
      $$observable = '@@observable';
    }
    return $$observable;
  }
  exports.getSymbolObservable = getSymbolObservable;
  exports.$$observable = getSymbolObservable(root_1.root);
});
System.registerDynamic('npm:rxjs@5.2.0/Observable.js', ['npm:rxjs@5.2.0/util/root.js', 'npm:rxjs@5.2.0/util/toSubscriber.js', 'npm:rxjs@5.2.0/symbol/observable.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var root_1 = $__require('npm:rxjs@5.2.0/util/root.js');
  var toSubscriber_1 = $__require('npm:rxjs@5.2.0/util/toSubscriber.js');
  var observable_1 = $__require('npm:rxjs@5.2.0/symbol/observable.js');
  var Observable = function () {
    function Observable(subscribe) {
      this._isScalar = false;
      if (subscribe) {
        this._subscribe = subscribe;
      }
    }
    Observable.prototype.lift = function (operator) {
      var observable = new Observable();
      observable.source = this;
      observable.operator = operator;
      return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
      var operator = this.operator;
      var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
      if (operator) {
        operator.call(sink, this.source);
      } else {
        sink.add(this._trySubscribe(sink));
      }
      if (sink.syncErrorThrowable) {
        sink.syncErrorThrowable = false;
        if (sink.syncErrorThrown) {
          throw sink.syncErrorValue;
        }
      }
      return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
      try {
        return this._subscribe(sink);
      } catch (err) {
        sink.syncErrorThrown = true;
        sink.syncErrorValue = err;
        sink.error(err);
      }
    };
    Observable.prototype.forEach = function (next, PromiseCtor) {
      var _this = this;
      if (!PromiseCtor) {
        if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
          PromiseCtor = root_1.root.Rx.config.Promise;
        } else if (root_1.root.Promise) {
          PromiseCtor = root_1.root.Promise;
        }
      }
      if (!PromiseCtor) {
        throw new Error('no Promise impl found');
      }
      return new PromiseCtor(function (resolve, reject) {
        var subscription = _this.subscribe(function (value) {
          if (subscription) {
            try {
              next(value);
            } catch (err) {
              reject(err);
              subscription.unsubscribe();
            }
          } else {
            next(value);
          }
        }, reject, resolve);
      });
    };
    Observable.prototype._subscribe = function (subscriber) {
      return this.source.subscribe(subscriber);
    };
    Observable.prototype[observable_1.$$observable] = function () {
      return this;
    };
    Observable.create = function (subscribe) {
      return new Observable(subscribe);
    };
    return Observable;
  }();
  exports.Observable = Observable;
});
System.registerDynamic('npm:rxjs@5.2.0/Notification.js', ['npm:rxjs@5.2.0/Observable.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.2.0/Observable.js');
  var Notification = function () {
    function Notification(kind, value, error) {
      this.kind = kind;
      this.value = value;
      this.error = error;
      this.hasValue = kind === 'N';
    }
    Notification.prototype.observe = function (observer) {
      switch (this.kind) {
        case 'N':
          return observer.next && observer.next(this.value);
        case 'E':
          return observer.error && observer.error(this.error);
        case 'C':
          return observer.complete && observer.complete();
      }
    };
    Notification.prototype.do = function (next, error, complete) {
      var kind = this.kind;
      switch (kind) {
        case 'N':
          return next && next(this.value);
        case 'E':
          return error && error(this.error);
        case 'C':
          return complete && complete();
      }
    };
    Notification.prototype.accept = function (nextOrObserver, error, complete) {
      if (nextOrObserver && typeof nextOrObserver.next === 'function') {
        return this.observe(nextOrObserver);
      } else {
        return this.do(nextOrObserver, error, complete);
      }
    };
    Notification.prototype.toObservable = function () {
      var kind = this.kind;
      switch (kind) {
        case 'N':
          return Observable_1.Observable.of(this.value);
        case 'E':
          return Observable_1.Observable.throw(this.error);
        case 'C':
          return Observable_1.Observable.empty();
      }
      throw new Error('unexpected notification kind value');
    };
    Notification.createNext = function (value) {
      if (typeof value !== 'undefined') {
        return new Notification('N', value);
      }
      return this.undefinedValueNotification;
    };
    Notification.createError = function (err) {
      return new Notification('E', undefined, err);
    };
    Notification.createComplete = function () {
      return this.completeNotification;
    };
    Notification.completeNotification = new Notification('C');
    Notification.undefinedValueNotification = new Notification('N', undefined);
    return Notification;
  }();
  exports.Notification = Notification;
});
System.registerDynamic("src-reactive/app/helper.js", [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    function buttonForTest(text, parent) {
        var button = document.createElement('button');
        button.innerText = text;
        button.style.height = '80px';
        var p = parent ? parent : document.body;
        p.appendChild(button);
        return button;
    }
    exports.buttonForTest = buttonForTest;
    function inputForTest(label, parent) {
        var labelEl = document.createElement('label');
        labelEl.innerText = label;
        var inputEl = document.createElement('input');
        labelEl.appendChild(inputEl);
        var p = parent ? parent : document.body;
        p.appendChild(labelEl);
        return inputEl;
    }
    exports.inputForTest = inputForTest;
    function simpleObserver(prefix) {
        return {
            next: function (value) {
                console.log(prefix + ": NEXT:");
                console.log(value);
            },
            error: function (err) {
                console.log(prefix + ": ERROR:");
                console.log(err);
            },
            complete: function () {
                return console.log(prefix + ": Completed");
            }
        };
    }
    exports.simpleObserver = simpleObserver;
});
System.registerDynamic("src-reactive/app/notification.js", ["npm:rxjs@5.2.0/Notification.js", "src-reactive/app/helper.js"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    var Notification_1 = $__require("npm:rxjs@5.2.0/Notification.js");
    var helper_1 = $__require("src-reactive/app/helper.js");
    function testNotification1() {
        var next = Notification_1.Notification.createNext(10);
        var complete = Notification_1.Notification.createComplete();
        // no complete
        var observer = helper_1.simpleObserver('observe');
        next.observe(observer);
        complete.observe(observer);
        var ten = next.toObservable();
        ten.subscribe(helper_1.simpleObserver('toObservable'));
    }
    exports.testNotification1 = testNotification1;
});
System.registerDynamic("src-reactive/app/main.js", ["npm:domready@1.0.8.js", "npm:screenlog@0.2.2.js", "libs/testbutton.js", "src-reactive/app/creating.js", "src-reactive/app/subject.js", "src-reactive/app/converting.js", "src-reactive/app/operator.js", "src-reactive/app/learnrx.js", "src-reactive/app/playground.js", "src-reactive/app/asscan.js", "src-reactive/app/notification.js"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    var domready = $__require("npm:domready@1.0.8.js");
    $__require("npm:screenlog@0.2.2.js");
    var testbutton_1 = $__require("libs/testbutton.js");
    var creating = $__require("src-reactive/app/creating.js");
    var subject = $__require("src-reactive/app/subject.js");
    var converting = $__require("src-reactive/app/converting.js");
    var operator = $__require("src-reactive/app/operator.js");
    var learnrx = $__require("src-reactive/app/learnrx.js");
    var playground = $__require("src-reactive/app/playground.js");
    var asscan = $__require("src-reactive/app/asscan.js");
    var notification = $__require("src-reactive/app/notification.js");
    var tests = [{ text: '---- clear log ----', action: screenLog.clear }, { text: 'converting: add/observable/from', action: converting.testFrom }, { text: 'creating:   add/observable/create - 1', action: creating.testCreate1 }, { text: 'creating:   add/observable/create - 2', action: creating.testCreate2 }, { text: 'creating:   Merge', action: creating.testMerge }, { text: 'creating:   add/observable/range', action: creating.testRange }, { text: 'creating:   add/observable/zip', action: creating.testZip }, { text: 'creating:   add/observable/defer', action: creating.testDefer }, { text: 'subject:   Subject - 1', action: subject.testSubject1 }, { text: 'subject:   Subject - 2', action: subject.testSubject2 }, { text: 'subject:   Subject - 3', action: subject.testSubject3 }, { text: 'subject:   ReplaySubject - 1', action: subject.testReplaySubject1 }, { text: 'subject:   ReplaySubject - 2', action: subject.testReplaySubject2 }, { text: 'subject:   ReplaySubject - 3', action: subject.testReplaySubject3 }, { text: 'subject:   ReplaySubject - 4', action: subject.testReplaySubject4 }, { text: 'subject:   multicast Observable', action: subject.testMulticast }, { text: 'subject:   refCount()', action: subject.testMulticast3 }, { text: 'subject:   publish()', action: subject.testPublish }, { text: 'operator:   add/operator/pluck', action: operator.testPluck }, { text: 'operator:   add/operator/mergeMap', action: operator.testMergeMap }, { text: 'operator:   add/operator/concatMap', action: operator.testConcatMap }, { text: 'operator:   add/operator/expand', action: operator.testExpand }, { text: 'operator:   add/operator/merge', action: operator.testMerge }, { text: 'operator:   add/operator/buffer', action: operator.testBuffer }, { text: 'operator:   add/operator/bufferWhen', action: operator.testBufferWhen }, { text: 'operator:   add/operator/bufferToggle', action: operator.testBufferToggle }, { text: 'operator:   add/operator/pairwise', action: operator.testPairwise }, { text: 'operator:   add/operator/partition', action: operator.testPartition }, { text: 'operator:   add/operator/combineLatest', action: operator.testCombineLatest }, { text: 'operator:   add/operator/withLatestFrom', action: operator.testWithLatestFrom }, { text: 'operator:   add/operator/race', action: operator.testRace }, { text: 'operator:   add/operator/debounce', action: operator.testDebounce }, { text: 'operator:   add/operator/delayWhen', action: operator.testDelayWhen }, { text: 'operator:   add/operator/distinct', action: operator.testDistinct }, { text: 'operator:   add/operator/repeat', action: operator.testRepeat }, { text: 'operator:   add/operator/repeat - 2', action: operator.testRepeat2 }, { text: 'operator:   add/operator/repeatWhen - complete', action: operator.testRepeatWhen1 }, { text: 'operator:   add/operator/repeatWhen - error', action: operator.testRepeatWhen2 }, { text: 'operator:   add/operator/window', action: operator.testWindow }, { text: 'operator:   add/operator/windowWhen', action: operator.testWindowWhen }, { text: 'operator:   add/operator/windowCount(5,3)', action: operator.testWindowCount1 }, { text: 'operator:   add/operator/windowCount(3,5)', action: operator.testWindowCount2 }, { text: 'operator:   add/operator/groupBy', action: operator.testGroupBy }, { text: 'operator:   add/operator/ignoreElements, isEmpty', action: operator.testIgnoreElements }, { text: 'operator:   add/operator/single', action: operator.testSingle }, { text: 'operator:   add/operator/timeoutWith', action: operator.testTimeoutWith }, { text: 'as scan:   map as scan', action: asscan.mapAsScan }, { text: 'as scan:   buffer as scan 1', action: asscan.bufferAsScan1 }, { text: 'as scan:   buffer as scan 2', action: asscan.bufferAsScan2 }, { text: 'as scan:   audit as scan', action: asscan.auditAsScan }, { text: 'as scan:   count as scan', action: asscan.countAsScan }, { text: 'as scan:   filter as scan', action: asscan.filterAsScan }, { text: 'as scan:   distinct as scan', action: asscan.distinctAsScan }, { text: 'as scan:   find as scan', action: asscan.findAsScan }, { text: 'as scan:   isEmpty as scan', action: asscan.isEmptyAsScan }, { text: 'notification:   observe vs. toObservable', action: notification.testNotification1 }, { text: 'learnrx: ex5 - map', action: learnrx.ex5 }, { text: 'learnrx: ex8 - filter', action: learnrx.ex8 }, { text: 'learnrx: ex12 - concatAll', action: learnrx.ex12 }, { text: 'learnrx: ex14 - concatMap', action: learnrx.ex14 }, { text: 'learnrx: ex17 - reduce', action: learnrx.ex17 }, { text: 'learnrx: ex20 - reduce', action: learnrx.ex20 }, { text: 'learnrx: ex24 - zip', action: learnrx.ex24 }, { text: 'learnrx: ex29 - unsubscribe', action: learnrx.ex29 }, { text: 'learnrx: ex30 - take', action: learnrx.ex30 }, { text: 'learnrx: ex33 - takeUntil', action: learnrx.ex33 }, { text: 'learnrx: ex38 - throttle', action: learnrx.ex38 }, { text: 'learnrx: ex40 - distinctUntilChanged', action: learnrx.ex40 }, { text: 'playground: pluck and zip', action: playground.pluckAndZip }, { text: 'playground: stateStore', action: playground.stateStore }, { text: 'playground: immutableStore', action: playground.immutableStore }, { text: 'playground: unbalanced path', action: playground.zipUnbalancedMultipath }, { text: 'playground: fromPromise', action: playground.fromPromise }, { text: 'playground: fromPromise & defer', action: playground.fromPromise2 }];
    domready(function () {
        screenLog.init({ autoScroll: true });
        testbutton_1.makeTestButtons(tests);
    });
});
//# sourceMappingURL=build.js.map