"bundle";
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
(function() {
var define = System.amdDefine;
;
(function() {
  function getDefaultOpts(simple) {
    'use strict';
    var defaultOptions = {
      omitExtraWLInCodeBlocks: {
        defaultValue: false,
        describe: 'Omit the default extra whiteline added to code blocks',
        type: 'boolean'
      },
      noHeaderId: {
        defaultValue: false,
        describe: 'Turn on/off generated header id',
        type: 'boolean'
      },
      prefixHeaderId: {
        defaultValue: false,
        describe: 'Specify a prefix to generated header ids',
        type: 'string'
      },
      ghCompatibleHeaderId: {
        defaultValue: false,
        describe: 'Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)',
        type: 'boolean'
      },
      headerLevelStart: {
        defaultValue: false,
        describe: 'The header blocks level start',
        type: 'integer'
      },
      parseImgDimensions: {
        defaultValue: false,
        describe: 'Turn on/off image dimension parsing',
        type: 'boolean'
      },
      simplifiedAutoLink: {
        defaultValue: false,
        describe: 'Turn on/off GFM autolink style',
        type: 'boolean'
      },
      excludeTrailingPunctuationFromURLs: {
        defaultValue: false,
        describe: 'Excludes trailing punctuation from links generated with autoLinking',
        type: 'boolean'
      },
      literalMidWordUnderscores: {
        defaultValue: false,
        describe: 'Parse midword underscores as literal underscores',
        type: 'boolean'
      },
      literalMidWordAsterisks: {
        defaultValue: false,
        describe: 'Parse midword asterisks as literal asterisks',
        type: 'boolean'
      },
      strikethrough: {
        defaultValue: false,
        describe: 'Turn on/off strikethrough support',
        type: 'boolean'
      },
      tables: {
        defaultValue: false,
        describe: 'Turn on/off tables support',
        type: 'boolean'
      },
      tablesHeaderId: {
        defaultValue: false,
        describe: 'Add an id to table headers',
        type: 'boolean'
      },
      ghCodeBlocks: {
        defaultValue: true,
        describe: 'Turn on/off GFM fenced code blocks support',
        type: 'boolean'
      },
      tasklists: {
        defaultValue: false,
        describe: 'Turn on/off GFM tasklist support',
        type: 'boolean'
      },
      smoothLivePreview: {
        defaultValue: false,
        describe: 'Prevents weird effects in live previews due to incomplete input',
        type: 'boolean'
      },
      smartIndentationFix: {
        defaultValue: false,
        description: 'Tries to smartly fix indentation in es6 strings',
        type: 'boolean'
      },
      disableForced4SpacesIndentedSublists: {
        defaultValue: false,
        description: 'Disables the requirement of indenting nested sublists by 4 spaces',
        type: 'boolean'
      },
      simpleLineBreaks: {
        defaultValue: false,
        description: 'Parses simple line breaks as <br> (GFM Style)',
        type: 'boolean'
      },
      requireSpaceBeforeHeadingText: {
        defaultValue: false,
        description: 'Makes adding a space between `#` and the header text mandatory (GFM Style)',
        type: 'boolean'
      },
      ghMentions: {
        defaultValue: false,
        description: 'Enables github @mentions',
        type: 'boolean'
      },
      ghMentionsLink: {
        defaultValue: 'https://github.com/{u}',
        description: 'Changes the link generated by @mentions. Only applies if ghMentions option is enabled.',
        type: 'string'
      },
      encodeEmails: {
        defaultValue: true,
        description: 'Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities',
        type: 'boolean'
      },
      openLinksInNewWindow: {
        defaultValue: false,
        description: 'Open all links in new windows',
        type: 'boolean'
      }
    };
    if (simple === false) {
      return JSON.parse(JSON.stringify(defaultOptions));
    }
    var ret = {};
    for (var opt in defaultOptions) {
      if (defaultOptions.hasOwnProperty(opt)) {
        ret[opt] = defaultOptions[opt].defaultValue;
      }
    }
    return ret;
  }
  function allOptionsOn() {
    'use strict';
    var options = getDefaultOpts(true),
        ret = {};
    for (var opt in options) {
      if (options.hasOwnProperty(opt)) {
        ret[opt] = true;
      }
    }
    return ret;
  }
  var showdown = {},
      parsers = {},
      extensions = {},
      globalOptions = getDefaultOpts(true),
      setFlavor = 'vanilla',
      flavor = {
        github: {
          omitExtraWLInCodeBlocks: true,
          simplifiedAutoLink: true,
          excludeTrailingPunctuationFromURLs: true,
          literalMidWordUnderscores: true,
          strikethrough: true,
          tables: true,
          tablesHeaderId: true,
          ghCodeBlocks: true,
          tasklists: true,
          disableForced4SpacesIndentedSublists: true,
          simpleLineBreaks: true,
          requireSpaceBeforeHeadingText: true,
          ghCompatibleHeaderId: true,
          ghMentions: true
        },
        original: {
          noHeaderId: true,
          ghCodeBlocks: false
        },
        ghost: {
          omitExtraWLInCodeBlocks: true,
          parseImgDimensions: true,
          simplifiedAutoLink: true,
          excludeTrailingPunctuationFromURLs: true,
          literalMidWordUnderscores: true,
          strikethrough: true,
          tables: true,
          tablesHeaderId: true,
          ghCodeBlocks: true,
          tasklists: true,
          smoothLivePreview: true,
          simpleLineBreaks: true,
          requireSpaceBeforeHeadingText: true,
          ghMentions: false,
          encodeEmails: true
        },
        vanilla: getDefaultOpts(true),
        allOn: allOptionsOn()
      };
  showdown.helper = {};
  showdown.extensions = {};
  showdown.setOption = function(key, value) {
    'use strict';
    globalOptions[key] = value;
    return this;
  };
  showdown.getOption = function(key) {
    'use strict';
    return globalOptions[key];
  };
  showdown.getOptions = function() {
    'use strict';
    return globalOptions;
  };
  showdown.resetOptions = function() {
    'use strict';
    globalOptions = getDefaultOpts(true);
  };
  showdown.setFlavor = function(name) {
    'use strict';
    if (!flavor.hasOwnProperty(name)) {
      throw Error(name + ' flavor was not found');
    }
    showdown.resetOptions();
    var preset = flavor[name];
    setFlavor = name;
    for (var option in preset) {
      if (preset.hasOwnProperty(option)) {
        globalOptions[option] = preset[option];
      }
    }
  };
  showdown.getFlavor = function() {
    'use strict';
    return setFlavor;
  };
  showdown.getFlavorOptions = function(name) {
    'use strict';
    if (flavor.hasOwnProperty(name)) {
      return flavor[name];
    }
  };
  showdown.getDefaultOptions = function(simple) {
    'use strict';
    return getDefaultOpts(simple);
  };
  showdown.subParser = function(name, func) {
    'use strict';
    if (showdown.helper.isString(name)) {
      if (typeof func !== 'undefined') {
        parsers[name] = func;
      } else {
        if (parsers.hasOwnProperty(name)) {
          return parsers[name];
        } else {
          throw Error('SubParser named ' + name + ' not registered!');
        }
      }
    }
  };
  showdown.extension = function(name, ext) {
    'use strict';
    if (!showdown.helper.isString(name)) {
      throw Error('Extension \'name\' must be a string');
    }
    name = showdown.helper.stdExtName(name);
    if (showdown.helper.isUndefined(ext)) {
      if (!extensions.hasOwnProperty(name)) {
        throw Error('Extension named ' + name + ' is not registered!');
      }
      return extensions[name];
    } else {
      if (typeof ext === 'function') {
        ext = ext();
      }
      if (!showdown.helper.isArray(ext)) {
        ext = [ext];
      }
      var validExtension = validate(ext, name);
      if (validExtension.valid) {
        extensions[name] = ext;
      } else {
        throw Error(validExtension.error);
      }
    }
  };
  showdown.getAllExtensions = function() {
    'use strict';
    return extensions;
  };
  showdown.removeExtension = function(name) {
    'use strict';
    delete extensions[name];
  };
  showdown.resetExtensions = function() {
    'use strict';
    extensions = {};
  };
  function validate(extension, name) {
    'use strict';
    var errMsg = (name) ? 'Error in ' + name + ' extension->' : 'Error in unnamed extension',
        ret = {
          valid: true,
          error: ''
        };
    if (!showdown.helper.isArray(extension)) {
      extension = [extension];
    }
    for (var i = 0; i < extension.length; ++i) {
      var baseMsg = errMsg + ' sub-extension ' + i + ': ',
          ext = extension[i];
      if (typeof ext !== 'object') {
        ret.valid = false;
        ret.error = baseMsg + 'must be an object, but ' + typeof ext + ' given';
        return ret;
      }
      if (!showdown.helper.isString(ext.type)) {
        ret.valid = false;
        ret.error = baseMsg + 'property "type" must be a string, but ' + typeof ext.type + ' given';
        return ret;
      }
      var type = ext.type = ext.type.toLowerCase();
      if (type === 'language') {
        type = ext.type = 'lang';
      }
      if (type === 'html') {
        type = ext.type = 'output';
      }
      if (type !== 'lang' && type !== 'output' && type !== 'listener') {
        ret.valid = false;
        ret.error = baseMsg + 'type ' + type + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"';
        return ret;
      }
      if (type === 'listener') {
        if (showdown.helper.isUndefined(ext.listeners)) {
          ret.valid = false;
          ret.error = baseMsg + '. Extensions of type "listener" must have a property called "listeners"';
          return ret;
        }
      } else {
        if (showdown.helper.isUndefined(ext.filter) && showdown.helper.isUndefined(ext.regex)) {
          ret.valid = false;
          ret.error = baseMsg + type + ' extensions must define either a "regex" property or a "filter" method';
          return ret;
        }
      }
      if (ext.listeners) {
        if (typeof ext.listeners !== 'object') {
          ret.valid = false;
          ret.error = baseMsg + '"listeners" property must be an object but ' + typeof ext.listeners + ' given';
          return ret;
        }
        for (var ln in ext.listeners) {
          if (ext.listeners.hasOwnProperty(ln)) {
            if (typeof ext.listeners[ln] !== 'function') {
              ret.valid = false;
              ret.error = baseMsg + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + ln + ' must be a function but ' + typeof ext.listeners[ln] + ' given';
              return ret;
            }
          }
        }
      }
      if (ext.filter) {
        if (typeof ext.filter !== 'function') {
          ret.valid = false;
          ret.error = baseMsg + '"filter" must be a function, but ' + typeof ext.filter + ' given';
          return ret;
        }
      } else if (ext.regex) {
        if (showdown.helper.isString(ext.regex)) {
          ext.regex = new RegExp(ext.regex, 'g');
        }
        if (!(ext.regex instanceof RegExp)) {
          ret.valid = false;
          ret.error = baseMsg + '"regex" property must either be a string or a RegExp object, but ' + typeof ext.regex + ' given';
          return ret;
        }
        if (showdown.helper.isUndefined(ext.replace)) {
          ret.valid = false;
          ret.error = baseMsg + '"regex" extensions must implement a replace string or function';
          return ret;
        }
      }
    }
    return ret;
  }
  showdown.validateExtension = function(ext) {
    'use strict';
    var validateExtension = validate(ext, null);
    if (!validateExtension.valid) {
      console.warn(validateExtension.error);
      return false;
    }
    return true;
  };
  if (!showdown.hasOwnProperty('helper')) {
    showdown.helper = {};
  }
  showdown.helper.isString = function(a) {
    'use strict';
    return (typeof a === 'string' || a instanceof String);
  };
  showdown.helper.isFunction = function(a) {
    'use strict';
    var getType = {};
    return a && getType.toString.call(a) === '[object Function]';
  };
  showdown.helper.isArray = function(a) {
    'use strict';
    return a.constructor === Array;
  };
  showdown.helper.isUndefined = function(value) {
    'use strict';
    return typeof value === 'undefined';
  };
  showdown.helper.forEach = function(obj, callback) {
    'use strict';
    if (showdown.helper.isUndefined(obj)) {
      throw new Error('obj param is required');
    }
    if (showdown.helper.isUndefined(callback)) {
      throw new Error('callback param is required');
    }
    if (!showdown.helper.isFunction(callback)) {
      throw new Error('callback param must be a function/closure');
    }
    if (typeof obj.forEach === 'function') {
      obj.forEach(callback);
    } else if (showdown.helper.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        callback(obj[i], i, obj);
      }
    } else if (typeof(obj) === 'object') {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          callback(obj[prop], prop, obj);
        }
      }
    } else {
      throw new Error('obj does not seem to be an array or an iterable object');
    }
  };
  showdown.helper.stdExtName = function(s) {
    'use strict';
    return s.replace(/[_?*+\/\\.^-]/g, '').replace(/\s/g, '').toLowerCase();
  };
  function escapeCharactersCallback(wholeMatch, m1) {
    'use strict';
    var charCodeToEscape = m1.charCodeAt(0);
    return '¨E' + charCodeToEscape + 'E';
  }
  showdown.helper.escapeCharactersCallback = escapeCharactersCallback;
  showdown.helper.escapeCharacters = function(text, charsToEscape, afterBackslash) {
    'use strict';
    var regexString = '([' + charsToEscape.replace(/([\[\]\\])/g, '\\$1') + '])';
    if (afterBackslash) {
      regexString = '\\\\' + regexString;
    }
    var regex = new RegExp(regexString, 'g');
    text = text.replace(regex, escapeCharactersCallback);
    return text;
  };
  var rgxFindMatchPos = function(str, left, right, flags) {
    'use strict';
    var f = flags || '',
        g = f.indexOf('g') > -1,
        x = new RegExp(left + '|' + right, 'g' + f.replace(/g/g, '')),
        l = new RegExp(left, f.replace(/g/g, '')),
        pos = [],
        t,
        s,
        m,
        start,
        end;
    do {
      t = 0;
      while ((m = x.exec(str))) {
        if (l.test(m[0])) {
          if (!(t++)) {
            s = x.lastIndex;
            start = s - m[0].length;
          }
        } else if (t) {
          if (!--t) {
            end = m.index + m[0].length;
            var obj = {
              left: {
                start: start,
                end: s
              },
              match: {
                start: s,
                end: m.index
              },
              right: {
                start: m.index,
                end: end
              },
              wholeMatch: {
                start: start,
                end: end
              }
            };
            pos.push(obj);
            if (!g) {
              return pos;
            }
          }
        }
      }
    } while (t && (x.lastIndex = s));
    return pos;
  };
  showdown.helper.matchRecursiveRegExp = function(str, left, right, flags) {
    'use strict';
    var matchPos = rgxFindMatchPos(str, left, right, flags),
        results = [];
    for (var i = 0; i < matchPos.length; ++i) {
      results.push([str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end), str.slice(matchPos[i].match.start, matchPos[i].match.end), str.slice(matchPos[i].left.start, matchPos[i].left.end), str.slice(matchPos[i].right.start, matchPos[i].right.end)]);
    }
    return results;
  };
  showdown.helper.replaceRecursiveRegExp = function(str, replacement, left, right, flags) {
    'use strict';
    if (!showdown.helper.isFunction(replacement)) {
      var repStr = replacement;
      replacement = function() {
        return repStr;
      };
    }
    var matchPos = rgxFindMatchPos(str, left, right, flags),
        finalStr = str,
        lng = matchPos.length;
    if (lng > 0) {
      var bits = [];
      if (matchPos[0].wholeMatch.start !== 0) {
        bits.push(str.slice(0, matchPos[0].wholeMatch.start));
      }
      for (var i = 0; i < lng; ++i) {
        bits.push(replacement(str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end), str.slice(matchPos[i].match.start, matchPos[i].match.end), str.slice(matchPos[i].left.start, matchPos[i].left.end), str.slice(matchPos[i].right.start, matchPos[i].right.end)));
        if (i < lng - 1) {
          bits.push(str.slice(matchPos[i].wholeMatch.end, matchPos[i + 1].wholeMatch.start));
        }
      }
      if (matchPos[lng - 1].wholeMatch.end < str.length) {
        bits.push(str.slice(matchPos[lng - 1].wholeMatch.end));
      }
      finalStr = bits.join('');
    }
    return finalStr;
  };
  showdown.helper.regexIndexOf = function(str, regex, fromIndex) {
    'use strict';
    if (!showdown.helper.isString(str)) {
      throw 'InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string';
    }
    if (regex instanceof RegExp === false) {
      throw 'InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp';
    }
    var indexOf = str.substring(fromIndex || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (fromIndex || 0)) : indexOf;
  };
  showdown.helper.splitAtIndex = function(str, index) {
    'use strict';
    if (!showdown.helper.isString(str)) {
      throw 'InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string';
    }
    return [str.substring(0, index), str.substring(index)];
  };
  showdown.helper.encodeEmailAddress = function(mail) {
    'use strict';
    var encode = [function(ch) {
      return '&#' + ch.charCodeAt(0) + ';';
    }, function(ch) {
      return '&#x' + ch.charCodeAt(0).toString(16) + ';';
    }, function(ch) {
      return ch;
    }];
    mail = mail.replace(/./g, function(ch) {
      if (ch === '@') {
        ch = encode[Math.floor(Math.random() * 2)](ch);
      } else {
        var r = Math.random();
        ch = (r > 0.9 ? encode[2](ch) : r > 0.45 ? encode[1](ch) : encode[0](ch));
      }
      return ch;
    });
    return mail;
  };
  if (typeof(console) === 'undefined') {
    console = {
      warn: function(msg) {
        'use strict';
        alert(msg);
      },
      log: function(msg) {
        'use strict';
        alert(msg);
      },
      error: function(msg) {
        'use strict';
        throw msg;
      }
    };
  }
  showdown.helper.regexes = {asteriskAndDash: /([*_])/g};
  showdown.Converter = function(converterOptions) {
    'use strict';
    var options = {},
        langExtensions = [],
        outputModifiers = [],
        listeners = {},
        setConvFlavor = setFlavor;
    _constructor();
    function _constructor() {
      converterOptions = converterOptions || {};
      for (var gOpt in globalOptions) {
        if (globalOptions.hasOwnProperty(gOpt)) {
          options[gOpt] = globalOptions[gOpt];
        }
      }
      if (typeof converterOptions === 'object') {
        for (var opt in converterOptions) {
          if (converterOptions.hasOwnProperty(opt)) {
            options[opt] = converterOptions[opt];
          }
        }
      } else {
        throw Error('Converter expects the passed parameter to be an object, but ' + typeof converterOptions + ' was passed instead.');
      }
      if (options.extensions) {
        showdown.helper.forEach(options.extensions, _parseExtension);
      }
    }
    function _parseExtension(ext, name) {
      name = name || null;
      if (showdown.helper.isString(ext)) {
        ext = showdown.helper.stdExtName(ext);
        name = ext;
        if (showdown.extensions[ext]) {
          console.warn('DEPRECATION WARNING: ' + ext + ' is an old extension that uses a deprecated loading method.' + 'Please inform the developer that the extension should be updated!');
          legacyExtensionLoading(showdown.extensions[ext], ext);
          return;
        } else if (!showdown.helper.isUndefined(extensions[ext])) {
          ext = extensions[ext];
        } else {
          throw Error('Extension "' + ext + '" could not be loaded. It was either not found or is not a valid extension.');
        }
      }
      if (typeof ext === 'function') {
        ext = ext();
      }
      if (!showdown.helper.isArray(ext)) {
        ext = [ext];
      }
      var validExt = validate(ext, name);
      if (!validExt.valid) {
        throw Error(validExt.error);
      }
      for (var i = 0; i < ext.length; ++i) {
        switch (ext[i].type) {
          case 'lang':
            langExtensions.push(ext[i]);
            break;
          case 'output':
            outputModifiers.push(ext[i]);
            break;
        }
        if (ext[i].hasOwnProperty('listeners')) {
          for (var ln in ext[i].listeners) {
            if (ext[i].listeners.hasOwnProperty(ln)) {
              listen(ln, ext[i].listeners[ln]);
            }
          }
        }
      }
    }
    function legacyExtensionLoading(ext, name) {
      if (typeof ext === 'function') {
        ext = ext(new showdown.Converter());
      }
      if (!showdown.helper.isArray(ext)) {
        ext = [ext];
      }
      var valid = validate(ext, name);
      if (!valid.valid) {
        throw Error(valid.error);
      }
      for (var i = 0; i < ext.length; ++i) {
        switch (ext[i].type) {
          case 'lang':
            langExtensions.push(ext[i]);
            break;
          case 'output':
            outputModifiers.push(ext[i]);
            break;
          default:
            throw Error('Extension loader error: Type unrecognized!!!');
        }
      }
    }
    function listen(name, callback) {
      if (!showdown.helper.isString(name)) {
        throw Error('Invalid argument in converter.listen() method: name must be a string, but ' + typeof name + ' given');
      }
      if (typeof callback !== 'function') {
        throw Error('Invalid argument in converter.listen() method: callback must be a function, but ' + typeof callback + ' given');
      }
      if (!listeners.hasOwnProperty(name)) {
        listeners[name] = [];
      }
      listeners[name].push(callback);
    }
    function rTrimInputText(text) {
      var rsp = text.match(/^\s*/)[0].length,
          rgx = new RegExp('^\\s{0,' + rsp + '}', 'gm');
      return text.replace(rgx, '');
    }
    this._dispatch = function dispatch(evtName, text, options, globals) {
      if (listeners.hasOwnProperty(evtName)) {
        for (var ei = 0; ei < listeners[evtName].length; ++ei) {
          var nText = listeners[evtName][ei](evtName, text, this, options, globals);
          if (nText && typeof nText !== 'undefined') {
            text = nText;
          }
        }
      }
      return text;
    };
    this.listen = function(name, callback) {
      listen(name, callback);
      return this;
    };
    this.makeHtml = function(text) {
      if (!text) {
        return text;
      }
      var globals = {
        gHtmlBlocks: [],
        gHtmlMdBlocks: [],
        gHtmlSpans: [],
        gUrls: {},
        gTitles: {},
        gDimensions: {},
        gListLevel: 0,
        hashLinkCounts: {},
        langExtensions: langExtensions,
        outputModifiers: outputModifiers,
        converter: this,
        ghCodeBlocks: []
      };
      text = text.replace(/¨/g, '¨T');
      text = text.replace(/\$/g, '¨D');
      text = text.replace(/\r\n/g, '\n');
      text = text.replace(/\r/g, '\n');
      text = text.replace(/\u00A0/g, ' ');
      if (options.smartIndentationFix) {
        text = rTrimInputText(text);
      }
      text = '\n\n' + text + '\n\n';
      text = showdown.subParser('detab')(text, options, globals);
      text = text.replace(/^[ \t]+$/mg, '');
      showdown.helper.forEach(langExtensions, function(ext) {
        text = showdown.subParser('runExtension')(ext, text, options, globals);
      });
      text = showdown.subParser('hashPreCodeTags')(text, options, globals);
      text = showdown.subParser('githubCodeBlocks')(text, options, globals);
      text = showdown.subParser('hashHTMLBlocks')(text, options, globals);
      text = showdown.subParser('hashCodeTags')(text, options, globals);
      text = showdown.subParser('stripLinkDefinitions')(text, options, globals);
      text = showdown.subParser('blockGamut')(text, options, globals);
      text = showdown.subParser('unhashHTMLSpans')(text, options, globals);
      text = showdown.subParser('unescapeSpecialChars')(text, options, globals);
      text = text.replace(/¨D/g, '$$');
      text = text.replace(/¨T/g, '¨');
      showdown.helper.forEach(outputModifiers, function(ext) {
        text = showdown.subParser('runExtension')(ext, text, options, globals);
      });
      return text;
    };
    this.setOption = function(key, value) {
      options[key] = value;
    };
    this.getOption = function(key) {
      return options[key];
    };
    this.getOptions = function() {
      return options;
    };
    this.addExtension = function(extension, name) {
      name = name || null;
      _parseExtension(extension, name);
    };
    this.useExtension = function(extensionName) {
      _parseExtension(extensionName);
    };
    this.setFlavor = function(name) {
      if (!flavor.hasOwnProperty(name)) {
        throw Error(name + ' flavor was not found');
      }
      var preset = flavor[name];
      setConvFlavor = name;
      for (var option in preset) {
        if (preset.hasOwnProperty(option)) {
          options[option] = preset[option];
        }
      }
    };
    this.getFlavor = function() {
      return setConvFlavor;
    };
    this.removeExtension = function(extension) {
      if (!showdown.helper.isArray(extension)) {
        extension = [extension];
      }
      for (var a = 0; a < extension.length; ++a) {
        var ext = extension[a];
        for (var i = 0; i < langExtensions.length; ++i) {
          if (langExtensions[i] === ext) {
            langExtensions[i].splice(i, 1);
          }
        }
        for (var ii = 0; ii < outputModifiers.length; ++i) {
          if (outputModifiers[ii] === ext) {
            outputModifiers[ii].splice(i, 1);
          }
        }
      }
    };
    this.getAllExtensions = function() {
      return {
        language: langExtensions,
        output: outputModifiers
      };
    };
  };
  showdown.subParser('anchors', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('anchors.before', text, options, globals);
    var writeAnchorTag = function(wholeMatch, linkText, linkId, url, m5, m6, title) {
      if (showdown.helper.isUndefined(title)) {
        title = '';
      }
      linkId = linkId.toLowerCase();
      if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
        url = '';
      } else if (!url) {
        if (!linkId) {
          linkId = linkText.toLowerCase().replace(/ ?\n/g, ' ');
        }
        url = '#' + linkId;
        if (!showdown.helper.isUndefined(globals.gUrls[linkId])) {
          url = globals.gUrls[linkId];
          if (!showdown.helper.isUndefined(globals.gTitles[linkId])) {
            title = globals.gTitles[linkId];
          }
        } else {
          return wholeMatch;
        }
      }
      url = url.replace(showdown.helper.regexes.asteriskAndDash, showdown.helper.escapeCharactersCallback);
      var result = '<a href="' + url + '"';
      if (title !== '' && title !== null) {
        title = title.replace(/"/g, '&quot;');
        title = title.replace(showdown.helper.regexes.asteriskAndDash, showdown.helper.escapeCharactersCallback);
        result += ' title="' + title + '"';
      }
      if (options.openLinksInNewWindow) {
        result += ' target="¨E95Eblank"';
      }
      result += '>' + linkText + '</a>';
      return result;
    };
    text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g, writeAnchorTag);
    text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g, writeAnchorTag);
    text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g, writeAnchorTag);
    text = text.replace(/\[([^\[\]]+)]()()()()()/g, writeAnchorTag);
    if (options.ghMentions) {
      text = text.replace(/(^|\s)(\\)?(@([a-z\d\-]+))(?=[.!?;,[\]()]|\s|$)/gmi, function(wm, st, escape, mentions, username) {
        if (escape === '\\') {
          return st + mentions;
        }
        if (!showdown.helper.isString(options.ghMentionsLink)) {
          throw new Error('ghMentionsLink option must be a string');
        }
        var lnk = options.ghMentionsLink.replace(/\{u}/g, username);
        return st + '<a href="' + lnk + '">' + mentions + '</a>';
      });
    }
    text = globals.converter._dispatch('anchors.after', text, options, globals);
    return text;
  });
  var simpleURLRegex = /\b(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+)()(?=\s|$)(?!["<>])/gi,
      simpleURLRegex2 = /\b(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]]?)(?=\s|$)(?!["<>])/gi,
      delimUrlRegex = /<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>/gi,
      simpleMailRegex = /(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gmi,
      delimMailRegex = /<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,
      replaceLink = function(options) {
        'use strict';
        return function(wm, link, m2, m3, trailingPunctuation) {
          var lnkTxt = link,
              append = '',
              target = '';
          if (/^www\./i.test(link)) {
            link = link.replace(/^www\./i, 'http://www.');
          }
          if (options.excludeTrailingPunctuationFromURLs && trailingPunctuation) {
            append = trailingPunctuation;
          }
          if (options.openLinksInNewWindow) {
            target = ' target="¨E95Eblank"';
          }
          return '<a href="' + link + '"' + target + '>' + lnkTxt + '</a>' + append;
        };
      },
      replaceMail = function(options, globals) {
        'use strict';
        return function(wholeMatch, b, mail) {
          var href = 'mailto:';
          b = b || '';
          mail = showdown.subParser('unescapeSpecialChars')(mail, options, globals);
          if (options.encodeEmails) {
            href = showdown.helper.encodeEmailAddress(href + mail);
            mail = showdown.helper.encodeEmailAddress(mail);
          } else {
            href = href + mail;
          }
          return b + '<a href="' + href + '">' + mail + '</a>';
        };
      };
  showdown.subParser('autoLinks', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('autoLinks.before', text, options, globals);
    text = text.replace(delimUrlRegex, replaceLink(options));
    text = text.replace(delimMailRegex, replaceMail(options, globals));
    text = globals.converter._dispatch('autoLinks.after', text, options, globals);
    return text;
  });
  showdown.subParser('simplifiedAutoLinks', function(text, options, globals) {
    'use strict';
    if (!options.simplifiedAutoLink) {
      return text;
    }
    text = globals.converter._dispatch('simplifiedAutoLinks.before', text, options, globals);
    if (options.excludeTrailingPunctuationFromURLs) {
      text = text.replace(simpleURLRegex2, replaceLink(options));
    } else {
      text = text.replace(simpleURLRegex, replaceLink(options));
    }
    text = text.replace(simpleMailRegex, replaceMail(options, globals));
    text = globals.converter._dispatch('simplifiedAutoLinks.after', text, options, globals);
    return text;
  });
  showdown.subParser('blockGamut', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('blockGamut.before', text, options, globals);
    text = showdown.subParser('blockQuotes')(text, options, globals);
    text = showdown.subParser('headers')(text, options, globals);
    text = showdown.subParser('horizontalRule')(text, options, globals);
    text = showdown.subParser('lists')(text, options, globals);
    text = showdown.subParser('codeBlocks')(text, options, globals);
    text = showdown.subParser('tables')(text, options, globals);
    text = showdown.subParser('hashHTMLBlocks')(text, options, globals);
    text = showdown.subParser('paragraphs')(text, options, globals);
    text = globals.converter._dispatch('blockGamut.after', text, options, globals);
    return text;
  });
  showdown.subParser('blockQuotes', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('blockQuotes.before', text, options, globals);
    text = text.replace(/((^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+)/gm, function(wholeMatch, m1) {
      var bq = m1;
      bq = bq.replace(/^[ \t]*>[ \t]?/gm, '¨0');
      bq = bq.replace(/¨0/g, '');
      bq = bq.replace(/^[ \t]+$/gm, '');
      bq = showdown.subParser('githubCodeBlocks')(bq, options, globals);
      bq = showdown.subParser('blockGamut')(bq, options, globals);
      bq = bq.replace(/(^|\n)/g, '$1  ');
      bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(wholeMatch, m1) {
        var pre = m1;
        pre = pre.replace(/^  /mg, '¨0');
        pre = pre.replace(/¨0/g, '');
        return pre;
      });
      return showdown.subParser('hashBlock')('<blockquote>\n' + bq + '\n</blockquote>', options, globals);
    });
    text = globals.converter._dispatch('blockQuotes.after', text, options, globals);
    return text;
  });
  showdown.subParser('codeBlocks', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('codeBlocks.before', text, options, globals);
    text += '¨0';
    var pattern = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g;
    text = text.replace(pattern, function(wholeMatch, m1, m2) {
      var codeblock = m1,
          nextChar = m2,
          end = '\n';
      codeblock = showdown.subParser('outdent')(codeblock, options, globals);
      codeblock = showdown.subParser('encodeCode')(codeblock, options, globals);
      codeblock = showdown.subParser('detab')(codeblock, options, globals);
      codeblock = codeblock.replace(/^\n+/g, '');
      codeblock = codeblock.replace(/\n+$/g, '');
      if (options.omitExtraWLInCodeBlocks) {
        end = '';
      }
      codeblock = '<pre><code>' + codeblock + end + '</code></pre>';
      return showdown.subParser('hashBlock')(codeblock, options, globals) + nextChar;
    });
    text = text.replace(/¨0/, '');
    text = globals.converter._dispatch('codeBlocks.after', text, options, globals);
    return text;
  });
  showdown.subParser('codeSpans', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('codeSpans.before', text, options, globals);
    if (typeof(text) === 'undefined') {
      text = '';
    }
    text = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function(wholeMatch, m1, m2, m3) {
      var c = m3;
      c = c.replace(/^([ \t]*)/g, '');
      c = c.replace(/[ \t]*$/g, '');
      c = showdown.subParser('encodeCode')(c, options, globals);
      return m1 + '<code>' + c + '</code>';
    });
    text = globals.converter._dispatch('codeSpans.after', text, options, globals);
    return text;
  });
  showdown.subParser('detab', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('detab.before', text, options, globals);
    text = text.replace(/\t(?=\t)/g, '    ');
    text = text.replace(/\t/g, '¨A¨B');
    text = text.replace(/¨B(.+?)¨A/g, function(wholeMatch, m1) {
      var leadingText = m1,
          numSpaces = 4 - leadingText.length % 4;
      for (var i = 0; i < numSpaces; i++) {
        leadingText += ' ';
      }
      return leadingText;
    });
    text = text.replace(/¨A/g, '    ');
    text = text.replace(/¨B/g, '');
    text = globals.converter._dispatch('detab.after', text, options, globals);
    return text;
  });
  showdown.subParser('encodeAmpsAndAngles', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('encodeAmpsAndAngles.before', text, options, globals);
    text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, '&amp;');
    text = text.replace(/<(?![a-z\/?$!])/gi, '&lt;');
    text = text.replace(/</g, '&lt;');
    text = text.replace(/>/g, '&gt;');
    text = globals.converter._dispatch('encodeAmpsAndAngles.after', text, options, globals);
    return text;
  });
  showdown.subParser('encodeBackslashEscapes', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('encodeBackslashEscapes.before', text, options, globals);
    text = text.replace(/\\(\\)/g, showdown.helper.escapeCharactersCallback);
    text = text.replace(/\\([`*_{}\[\]()>#+.!~=|-])/g, showdown.helper.escapeCharactersCallback);
    text = globals.converter._dispatch('encodeBackslashEscapes.after', text, options, globals);
    return text;
  });
  showdown.subParser('encodeCode', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('encodeCode.before', text, options, globals);
    text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/([*_{}\[\]\\=~-])/g, showdown.helper.escapeCharactersCallback);
    text = globals.converter._dispatch('encodeCode.after', text, options, globals);
    return text;
  });
  showdown.subParser('escapeSpecialCharsWithinTagAttributes', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('escapeSpecialCharsWithinTagAttributes.before', text, options, globals);
    var regex = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;
    text = text.replace(regex, function(wholeMatch) {
      return wholeMatch.replace(/(.)<\/?code>(?=.)/g, '$1`').replace(/([\\`*_~=|])/g, showdown.helper.escapeCharactersCallback);
    });
    text = globals.converter._dispatch('escapeSpecialCharsWithinTagAttributes.after', text, options, globals);
    return text;
  });
  showdown.subParser('githubCodeBlocks', function(text, options, globals) {
    'use strict';
    if (!options.ghCodeBlocks) {
      return text;
    }
    text = globals.converter._dispatch('githubCodeBlocks.before', text, options, globals);
    text += '¨0';
    text = text.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g, function(wholeMatch, language, codeblock) {
      var end = (options.omitExtraWLInCodeBlocks) ? '' : '\n';
      codeblock = showdown.subParser('encodeCode')(codeblock, options, globals);
      codeblock = showdown.subParser('detab')(codeblock, options, globals);
      codeblock = codeblock.replace(/^\n+/g, '');
      codeblock = codeblock.replace(/\n+$/g, '');
      codeblock = '<pre><code' + (language ? ' class="' + language + ' language-' + language + '"' : '') + '>' + codeblock + end + '</code></pre>';
      codeblock = showdown.subParser('hashBlock')(codeblock, options, globals);
      return '\n\n¨G' + (globals.ghCodeBlocks.push({
        text: wholeMatch,
        codeblock: codeblock
      }) - 1) + 'G\n\n';
    });
    text = text.replace(/¨0/, '');
    return globals.converter._dispatch('githubCodeBlocks.after', text, options, globals);
  });
  showdown.subParser('hashBlock', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('hashBlock.before', text, options, globals);
    text = text.replace(/(^\n+|\n+$)/g, '');
    text = '\n\n¨K' + (globals.gHtmlBlocks.push(text) - 1) + 'K\n\n';
    text = globals.converter._dispatch('hashBlock.after', text, options, globals);
    return text;
  });
  showdown.subParser('hashCodeTags', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('hashCodeTags.before', text, options, globals);
    var repFunc = function(wholeMatch, match, left, right) {
      var codeblock = left + showdown.subParser('encodeCode')(match, options, globals) + right;
      return '¨C' + (globals.gHtmlSpans.push(codeblock) - 1) + 'C';
    };
    text = showdown.helper.replaceRecursiveRegExp(text, repFunc, '<code\\b[^>]*>', '</code>', 'gim');
    text = globals.converter._dispatch('hashCodeTags.after', text, options, globals);
    return text;
  });
  showdown.subParser('hashElement', function(text, options, globals) {
    'use strict';
    return function(wholeMatch, m1) {
      var blockText = m1;
      blockText = blockText.replace(/\n\n/g, '\n');
      blockText = blockText.replace(/^\n/, '');
      blockText = blockText.replace(/\n+$/g, '');
      blockText = '\n\n¨K' + (globals.gHtmlBlocks.push(blockText) - 1) + 'K\n\n';
      return blockText;
    };
  });
  showdown.subParser('hashHTMLBlocks', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('hashHTMLBlocks.before', text, options, globals);
    var blockTags = ['pre', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'table', 'dl', 'ol', 'ul', 'script', 'noscript', 'form', 'fieldset', 'iframe', 'math', 'style', 'section', 'header', 'footer', 'nav', 'article', 'aside', 'address', 'audio', 'canvas', 'figure', 'hgroup', 'output', 'video', 'p'],
        repFunc = function(wholeMatch, match, left, right) {
          var txt = wholeMatch;
          if (left.search(/\bmarkdown\b/) !== -1) {
            txt = left + globals.converter.makeHtml(match) + right;
          }
          return '\n\n¨K' + (globals.gHtmlBlocks.push(txt) - 1) + 'K\n\n';
        };
    for (var i = 0; i < blockTags.length; ++i) {
      var opTagPos,
          rgx1 = new RegExp('^ {0,3}<' + blockTags[i] + '\\b[^>]*>', 'im'),
          patLeft = '<' + blockTags[i] + '\\b[^>]*>',
          patRight = '</' + blockTags[i] + '>';
      while ((opTagPos = showdown.helper.regexIndexOf(text, rgx1)) !== -1) {
        var subTexts = showdown.helper.splitAtIndex(text, opTagPos),
            newSubText1 = showdown.helper.replaceRecursiveRegExp(subTexts[1], repFunc, patLeft, patRight, 'im');
        if (newSubText1 === subTexts[1]) {
          break;
        }
        text = subTexts[0].concat(newSubText1);
      }
    }
    text = text.replace(/(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, showdown.subParser('hashElement')(text, options, globals));
    text = showdown.helper.replaceRecursiveRegExp(text, function(txt) {
      return '\n\n¨K' + (globals.gHtmlBlocks.push(txt) - 1) + 'K\n\n';
    }, '^ {0,3}<!--', '-->', 'gm');
    text = text.replace(/(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, showdown.subParser('hashElement')(text, options, globals));
    text = globals.converter._dispatch('hashHTMLBlocks.after', text, options, globals);
    return text;
  });
  showdown.subParser('hashHTMLSpans', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('hashHTMLSpans.before', text, options, globals);
    function hashHTMLSpan(html) {
      return '¨C' + (globals.gHtmlSpans.push(html) - 1) + 'C';
    }
    text = text.replace(/<[^>]+?\/>/gi, function(wm) {
      return hashHTMLSpan(wm);
    });
    text = text.replace(/<([^>]+?)>[\s\S]*?<\/\1>/g, function(wm) {
      return hashHTMLSpan(wm);
    });
    text = text.replace(/<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g, function(wm) {
      return hashHTMLSpan(wm);
    });
    text = text.replace(/<[^>]+?>/gi, function(wm) {
      return hashHTMLSpan(wm);
    });
    text = globals.converter._dispatch('hashHTMLSpans.after', text, options, globals);
    return text;
  });
  showdown.subParser('unhashHTMLSpans', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('unhashHTMLSpans.before', text, options, globals);
    for (var i = 0; i < globals.gHtmlSpans.length; ++i) {
      var repText = globals.gHtmlSpans[i],
          limit = 0;
      while (/¨C(\d+)C/.test(repText)) {
        var num = RegExp.$1;
        repText = repText.replace('¨C' + num + 'C', globals.gHtmlSpans[num]);
        if (limit === 10) {
          break;
        }
        ++limit;
      }
      text = text.replace('¨C' + i + 'C', repText);
    }
    text = globals.converter._dispatch('unhashHTMLSpans.after', text, options, globals);
    return text;
  });
  showdown.subParser('hashPreCodeTags', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('hashPreCodeTags.before', text, options, globals);
    var repFunc = function(wholeMatch, match, left, right) {
      var codeblock = left + showdown.subParser('encodeCode')(match, options, globals) + right;
      return '\n\n¨G' + (globals.ghCodeBlocks.push({
        text: wholeMatch,
        codeblock: codeblock
      }) - 1) + 'G\n\n';
    };
    text = showdown.helper.replaceRecursiveRegExp(text, repFunc, '^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>', '^ {0,3}</code>\\s*</pre>', 'gim');
    text = globals.converter._dispatch('hashPreCodeTags.after', text, options, globals);
    return text;
  });
  showdown.subParser('headers', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('headers.before', text, options, globals);
    var headerLevelStart = (isNaN(parseInt(options.headerLevelStart))) ? 1 : parseInt(options.headerLevelStart),
        ghHeaderId = options.ghCompatibleHeaderId,
        setextRegexH1 = (options.smoothLivePreview) ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm,
        setextRegexH2 = (options.smoothLivePreview) ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
    text = text.replace(setextRegexH1, function(wholeMatch, m1) {
      var spanGamut = showdown.subParser('spanGamut')(m1, options, globals),
          hID = (options.noHeaderId) ? '' : ' id="' + headerId(m1) + '"',
          hLevel = headerLevelStart,
          hashBlock = '<h' + hLevel + hID + '>' + spanGamut + '</h' + hLevel + '>';
      return showdown.subParser('hashBlock')(hashBlock, options, globals);
    });
    text = text.replace(setextRegexH2, function(matchFound, m1) {
      var spanGamut = showdown.subParser('spanGamut')(m1, options, globals),
          hID = (options.noHeaderId) ? '' : ' id="' + headerId(m1) + '"',
          hLevel = headerLevelStart + 1,
          hashBlock = '<h' + hLevel + hID + '>' + spanGamut + '</h' + hLevel + '>';
      return showdown.subParser('hashBlock')(hashBlock, options, globals);
    });
    var atxStyle = (options.requireSpaceBeforeHeadingText) ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;
    text = text.replace(atxStyle, function(wholeMatch, m1, m2) {
      var hText = m2;
      if (options.customizedHeaderId) {
        hText = m2.replace(/\s?\{([^{]+?)}\s*$/, '');
      }
      var span = showdown.subParser('spanGamut')(hText, options, globals),
          hID = (options.noHeaderId) ? '' : ' id="' + headerId(m2) + '"',
          hLevel = headerLevelStart - 1 + m1.length,
          header = '<h' + hLevel + hID + '>' + span + '</h' + hLevel + '>';
      return showdown.subParser('hashBlock')(header, options, globals);
    });
    function headerId(m) {
      var title;
      if (options.customizedHeaderId) {
        var match = m.match(/\{([^{]+?)}\s*$/);
        if (match && match[1]) {
          m = match[1];
        }
      }
      if (showdown.helper.isString(options.prefixHeaderId)) {
        title = options.prefixHeaderId + m;
      } else if (options.prefixHeaderId === true) {
        title = 'section ' + m;
      } else {
        title = m;
      }
      if (ghHeaderId) {
        title = title.replace(/ /g, '-').replace(/&amp;/g, '').replace(/¨T/g, '').replace(/¨D/g, '').replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g, '').toLowerCase();
      } else {
        title = title.replace(/[^\w]/g, '').toLowerCase();
      }
      if (globals.hashLinkCounts[title]) {
        title = title + '-' + (globals.hashLinkCounts[title]++);
      } else {
        globals.hashLinkCounts[title] = 1;
      }
      return title;
    }
    text = globals.converter._dispatch('headers.after', text, options, globals);
    return text;
  });
  showdown.subParser('horizontalRule', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('horizontalRule.before', text, options, globals);
    var key = showdown.subParser('hashBlock')('<hr />', options, globals);
    text = text.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm, key);
    text = text.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm, key);
    text = text.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm, key);
    text = globals.converter._dispatch('horizontalRule.after', text, options, globals);
    return text;
  });
  showdown.subParser('images', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('images.before', text, options, globals);
    var inlineRegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g,
        crazyRegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g,
        referenceRegExp = /!\[([^\]]*?)] ?(?:\n *)?\[(.*?)]()()()()()/g,
        refShortcutRegExp = /!\[([^\[\]]+)]()()()()()/g;
    function writeImageTag(wholeMatch, altText, linkId, url, width, height, m5, title) {
      var gUrls = globals.gUrls,
          gTitles = globals.gTitles,
          gDims = globals.gDimensions;
      linkId = linkId.toLowerCase();
      if (!title) {
        title = '';
      }
      if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
        url = '';
      } else if (url === '' || url === null) {
        if (linkId === '' || linkId === null) {
          linkId = altText.toLowerCase().replace(/ ?\n/g, ' ');
        }
        url = '#' + linkId;
        if (!showdown.helper.isUndefined(gUrls[linkId])) {
          url = gUrls[linkId];
          if (!showdown.helper.isUndefined(gTitles[linkId])) {
            title = gTitles[linkId];
          }
          if (!showdown.helper.isUndefined(gDims[linkId])) {
            width = gDims[linkId].width;
            height = gDims[linkId].height;
          }
        } else {
          return wholeMatch;
        }
      }
      altText = altText.replace(/"/g, '&quot;').replace(showdown.helper.regexes.asteriskAndDash, showdown.helper.escapeCharactersCallback);
      url = url.replace(showdown.helper.regexes.asteriskAndDash, showdown.helper.escapeCharactersCallback);
      var result = '<img src="' + url + '" alt="' + altText + '"';
      if (title) {
        title = title.replace(/"/g, '&quot;').replace(showdown.helper.regexes.asteriskAndDash, showdown.helper.escapeCharactersCallback);
        result += ' title="' + title + '"';
      }
      if (width && height) {
        width = (width === '*') ? 'auto' : width;
        height = (height === '*') ? 'auto' : height;
        result += ' width="' + width + '"';
        result += ' height="' + height + '"';
      }
      result += ' />';
      return result;
    }
    text = text.replace(referenceRegExp, writeImageTag);
    text = text.replace(crazyRegExp, writeImageTag);
    text = text.replace(inlineRegExp, writeImageTag);
    text = text.replace(refShortcutRegExp, writeImageTag);
    text = globals.converter._dispatch('images.after', text, options, globals);
    return text;
  });
  showdown.subParser('italicsAndBold', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('italicsAndBold.before', text, options, globals);
    function parseInside(txt, left, right) {
      if (options.simplifiedAutoLink) {
        txt = showdown.subParser('simplifiedAutoLinks')(txt, options, globals);
      }
      return left + txt + right;
    }
    if (options.literalMidWordUnderscores) {
      text = text.replace(/\b___(\S[\s\S]*)___\b/g, function(wm, txt) {
        return parseInside(txt, '<strong><em>', '</em></strong>');
      });
      text = text.replace(/\b__(\S[\s\S]*)__\b/g, function(wm, txt) {
        return parseInside(txt, '<strong>', '</strong>');
      });
      text = text.replace(/\b_(\S[\s\S]*?)_\b/g, function(wm, txt) {
        return parseInside(txt, '<em>', '</em>');
      });
    } else {
      text = text.replace(/___(\S[\s\S]*?)___/g, function(wm, m) {
        return (/\S$/.test(m)) ? parseInside(m, '<strong><em>', '</em></strong>') : wm;
      });
      text = text.replace(/__(\S[\s\S]*?)__/g, function(wm, m) {
        return (/\S$/.test(m)) ? parseInside(m, '<strong>', '</strong>') : wm;
      });
      text = text.replace(/_([^\s_][\s\S]*?)_/g, function(wm, m) {
        return (/\S$/.test(m)) ? parseInside(m, '<em>', '</em>') : wm;
      });
    }
    if (options.literalMidWordAsterisks) {
      text = text.trim().replace(/(?:^| +)\*{3}(\S[\s\S]*?)\*{3}(?: +|$)/g, function(wm, txt) {
        return parseInside(txt, ' <strong><em>', '</em></strong> ');
      });
      text = text.trim().replace(/(?:^| +)\*{2}(\S[\s\S]*?)\*{2}(?: +|$)/g, function(wm, txt) {
        return parseInside(txt, ' <strong>', '</strong> ');
      });
      text = text.trim().replace(/(?:^| +)\*{1}(\S[\s\S]*?)\*{1}(?: +|$)/g, function(wm, txt) {
        return parseInside(txt, ' <em>', '</em>' + (wm.slice(-1) === ' ' ? ' ' : ''));
      });
    } else {
      text = text.replace(/\*\*\*(\S[\s\S]*?)\*\*\*/g, function(wm, m) {
        return (/\S$/.test(m)) ? parseInside(m, '<strong><em>', '</em></strong>') : wm;
      });
      text = text.replace(/\*\*(\S[\s\S]*?)\*\*/g, function(wm, m) {
        return (/\S$/.test(m)) ? parseInside(m, '<strong>', '</strong>') : wm;
      });
      text = text.replace(/\*([^\s*][\s\S]*?)\*/g, function(wm, m) {
        return (/\S$/.test(m)) ? parseInside(m, '<em>', '</em>') : wm;
      });
    }
    text = globals.converter._dispatch('italicsAndBold.after', text, options, globals);
    return text;
  });
  showdown.subParser('lists', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('lists.before', text, options, globals);
    function processListItems(listStr, trimTrailing) {
      globals.gListLevel++;
      listStr = listStr.replace(/\n{2,}$/, '\n');
      listStr += '¨0';
      var rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm,
          isParagraphed = (/\n[ \t]*\n(?!¨0)/.test(listStr));
      if (options.disableForced4SpacesIndentedSublists) {
        rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm;
      }
      listStr = listStr.replace(rgx, function(wholeMatch, m1, m2, m3, m4, taskbtn, checked) {
        checked = (checked && checked.trim() !== '');
        var item = showdown.subParser('outdent')(m4, options, globals),
            bulletStyle = '';
        if (taskbtn && options.tasklists) {
          bulletStyle = ' class="task-list-item" style="list-style-type: none;"';
          item = item.replace(/^[ \t]*\[(x|X| )?]/m, function() {
            var otp = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
            if (checked) {
              otp += ' checked';
            }
            otp += '>';
            return otp;
          });
        }
        item = item.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g, function(wm2) {
          return '¨A' + wm2;
        });
        if (m1 || (item.search(/\n{2,}/) > -1)) {
          item = showdown.subParser('githubCodeBlocks')(item, options, globals);
          item = showdown.subParser('blockGamut')(item, options, globals);
        } else {
          item = showdown.subParser('lists')(item, options, globals);
          item = item.replace(/\n$/, '');
          item = showdown.subParser('hashHTMLBlocks')(item, options, globals);
          item = item.replace(/\n\n+/g, '\n\n');
          item = item.replace(/\n\n/g, '¨B');
          if (isParagraphed) {
            item = showdown.subParser('paragraphs')(item, options, globals);
          } else {
            item = showdown.subParser('spanGamut')(item, options, globals);
          }
          item = item.replace(/¨B/g, '\n\n');
        }
        item = item.replace('¨A', '');
        item = '<li' + bulletStyle + '>' + item + '</li>\n';
        return item;
      });
      listStr = listStr.replace(/¨0/g, '');
      globals.gListLevel--;
      if (trimTrailing) {
        listStr = listStr.replace(/\s+$/, '');
      }
      return listStr;
    }
    function parseConsecutiveLists(list, listType, trimTrailing) {
      var olRgx = (options.disableForced4SpacesIndentedSublists) ? /^ ?\d+\.[ \t]/gm : /^ {0,3}\d+\.[ \t]/gm,
          ulRgx = (options.disableForced4SpacesIndentedSublists) ? /^ ?[*+-][ \t]/gm : /^ {0,3}[*+-][ \t]/gm,
          counterRxg = (listType === 'ul') ? olRgx : ulRgx,
          result = '';
      if (list.search(counterRxg) !== -1) {
        (function parseCL(txt) {
          var pos = txt.search(counterRxg);
          if (pos !== -1) {
            result += '\n<' + listType + '>\n' + processListItems(txt.slice(0, pos), !!trimTrailing) + '</' + listType + '>\n';
            listType = (listType === 'ul') ? 'ol' : 'ul';
            counterRxg = (listType === 'ul') ? olRgx : ulRgx;
            parseCL(txt.slice(pos));
          } else {
            result += '\n<' + listType + '>\n' + processListItems(txt, !!trimTrailing) + '</' + listType + '>\n';
          }
        })(list);
      } else {
        result = '\n<' + listType + '>\n' + processListItems(list, !!trimTrailing) + '</' + listType + '>\n';
      }
      return result;
    }
    text += '¨0';
    if (globals.gListLevel) {
      text = text.replace(/^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, function(wholeMatch, list, m2) {
        var listType = (m2.search(/[*+-]/g) > -1) ? 'ul' : 'ol';
        return parseConsecutiveLists(list, listType, true);
      });
    } else {
      text = text.replace(/(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, function(wholeMatch, m1, list, m3) {
        var listType = (m3.search(/[*+-]/g) > -1) ? 'ul' : 'ol';
        return parseConsecutiveLists(list, listType, false);
      });
    }
    text = text.replace(/¨0/, '');
    text = globals.converter._dispatch('lists.after', text, options, globals);
    return text;
  });
  showdown.subParser('outdent', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('outdent.before', text, options, globals);
    text = text.replace(/^(\t|[ ]{1,4})/gm, '¨0');
    text = text.replace(/¨0/g, '');
    text = globals.converter._dispatch('outdent.after', text, options, globals);
    return text;
  });
  showdown.subParser('paragraphs', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('paragraphs.before', text, options, globals);
    text = text.replace(/^\n+/g, '');
    text = text.replace(/\n+$/g, '');
    var grafs = text.split(/\n{2,}/g),
        grafsOut = [],
        end = grafs.length;
    for (var i = 0; i < end; i++) {
      var str = grafs[i];
      if (str.search(/¨(K|G)(\d+)\1/g) >= 0) {
        grafsOut.push(str);
      } else if (str.search(/\S/) >= 0) {
        str = showdown.subParser('spanGamut')(str, options, globals);
        str = str.replace(/^([ \t]*)/g, '<p>');
        str += '</p>';
        grafsOut.push(str);
      }
    }
    end = grafsOut.length;
    for (i = 0; i < end; i++) {
      var blockText = '',
          grafsOutIt = grafsOut[i],
          codeFlag = false;
      while (/¨(K|G)(\d+)\1/.test(grafsOutIt)) {
        var delim = RegExp.$1,
            num = RegExp.$2;
        if (delim === 'K') {
          blockText = globals.gHtmlBlocks[num];
        } else {
          if (codeFlag) {
            blockText = showdown.subParser('encodeCode')(globals.ghCodeBlocks[num].text, options, globals);
          } else {
            blockText = globals.ghCodeBlocks[num].codeblock;
          }
        }
        blockText = blockText.replace(/\$/g, '$$$$');
        grafsOutIt = grafsOutIt.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/, blockText);
        if (/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(grafsOutIt)) {
          codeFlag = true;
        }
      }
      grafsOut[i] = grafsOutIt;
    }
    text = grafsOut.join('\n');
    text = text.replace(/^\n+/g, '');
    text = text.replace(/\n+$/g, '');
    return globals.converter._dispatch('paragraphs.after', text, options, globals);
  });
  showdown.subParser('runExtension', function(ext, text, options, globals) {
    'use strict';
    if (ext.filter) {
      text = ext.filter(text, globals.converter, options);
    } else if (ext.regex) {
      var re = ext.regex;
      if (!(re instanceof RegExp)) {
        re = new RegExp(re, 'g');
      }
      text = text.replace(re, ext.replace);
    }
    return text;
  });
  showdown.subParser('spanGamut', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('spanGamut.before', text, options, globals);
    text = showdown.subParser('codeSpans')(text, options, globals);
    text = showdown.subParser('escapeSpecialCharsWithinTagAttributes')(text, options, globals);
    text = showdown.subParser('encodeBackslashEscapes')(text, options, globals);
    text = showdown.subParser('images')(text, options, globals);
    text = showdown.subParser('anchors')(text, options, globals);
    text = showdown.subParser('autoLinks')(text, options, globals);
    text = showdown.subParser('italicsAndBold')(text, options, globals);
    text = showdown.subParser('strikethrough')(text, options, globals);
    text = showdown.subParser('simplifiedAutoLinks')(text, options, globals);
    text = showdown.subParser('hashHTMLSpans')(text, options, globals);
    text = showdown.subParser('encodeAmpsAndAngles')(text, options, globals);
    if (options.simpleLineBreaks) {
      text = text.replace(/\n/g, '<br />\n');
    } else {
      text = text.replace(/  +\n/g, '<br />\n');
    }
    text = globals.converter._dispatch('spanGamut.after', text, options, globals);
    return text;
  });
  showdown.subParser('strikethrough', function(text, options, globals) {
    'use strict';
    function parseInside(txt) {
      if (options.simplifiedAutoLink) {
        txt = showdown.subParser('simplifiedAutoLinks')(txt, options, globals);
      }
      return '<del>' + txt + '</del>';
    }
    if (options.strikethrough) {
      text = globals.converter._dispatch('strikethrough.before', text, options, globals);
      text = text.replace(/(?:~){2}([\s\S]+?)(?:~){2}/g, function(wm, txt) {
        return parseInside(txt);
      });
      text = globals.converter._dispatch('strikethrough.after', text, options, globals);
    }
    return text;
  });
  showdown.subParser('stripLinkDefinitions', function(text, options, globals) {
    'use strict';
    var regex = /^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm;
    text += '¨0';
    text = text.replace(regex, function(wholeMatch, linkId, url, width, height, blankLines, title) {
      linkId = linkId.toLowerCase();
      globals.gUrls[linkId] = showdown.subParser('encodeAmpsAndAngles')(url, options, globals);
      if (blankLines) {
        return blankLines + title;
      } else {
        if (title) {
          globals.gTitles[linkId] = title.replace(/"|'/g, '&quot;');
        }
        if (options.parseImgDimensions && width && height) {
          globals.gDimensions[linkId] = {
            width: width,
            height: height
          };
        }
      }
      return '';
    });
    text = text.replace(/¨0/, '');
    return text;
  });
  showdown.subParser('tables', function(text, options, globals) {
    'use strict';
    if (!options.tables) {
      return text;
    }
    var tableRgx = /^ {0,3}\|?.+\|.+\n[ \t]{0,3}\|?[ \t]*:?[ \t]*(?:-|=){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:-|=){2,}[\s\S]+?(?:\n\n|¨0)/gm;
    function parseStyles(sLine) {
      if (/^:[ \t]*--*$/.test(sLine)) {
        return ' style="text-align:left;"';
      } else if (/^--*[ \t]*:[ \t]*$/.test(sLine)) {
        return ' style="text-align:right;"';
      } else if (/^:[ \t]*--*[ \t]*:$/.test(sLine)) {
        return ' style="text-align:center;"';
      } else {
        return '';
      }
    }
    function parseHeaders(header, style) {
      var id = '';
      header = header.trim();
      if (options.tableHeaderId) {
        id = ' id="' + header.replace(/ /g, '_').toLowerCase() + '"';
      }
      header = showdown.subParser('spanGamut')(header, options, globals);
      return '<th' + id + style + '>' + header + '</th>\n';
    }
    function parseCells(cell, style) {
      var subText = showdown.subParser('spanGamut')(cell, options, globals);
      return '<td' + style + '>' + subText + '</td>\n';
    }
    function buildTable(headers, cells) {
      var tb = '<table>\n<thead>\n<tr>\n',
          tblLgn = headers.length;
      for (var i = 0; i < tblLgn; ++i) {
        tb += headers[i];
      }
      tb += '</tr>\n</thead>\n<tbody>\n';
      for (i = 0; i < cells.length; ++i) {
        tb += '<tr>\n';
        for (var ii = 0; ii < tblLgn; ++ii) {
          tb += cells[i][ii];
        }
        tb += '</tr>\n';
      }
      tb += '</tbody>\n</table>\n';
      return tb;
    }
    text = globals.converter._dispatch('tables.before', text, options, globals);
    text = text.replace(/\\(\|)/g, showdown.helper.escapeCharactersCallback);
    text = text.replace(tableRgx, function(rawTable) {
      var i,
          tableLines = rawTable.split('\n');
      for (i = 0; i < tableLines.length; ++i) {
        if (/^ {0,3}\|/.test(tableLines[i])) {
          tableLines[i] = tableLines[i].replace(/^ {0,3}\|/, '');
        }
        if (/\|[ \t]*$/.test(tableLines[i])) {
          tableLines[i] = tableLines[i].replace(/\|[ \t]*$/, '');
        }
      }
      var rawHeaders = tableLines[0].split('|').map(function(s) {
        return s.trim();
      }),
          rawStyles = tableLines[1].split('|').map(function(s) {
            return s.trim();
          }),
          rawCells = [],
          headers = [],
          styles = [],
          cells = [];
      tableLines.shift();
      tableLines.shift();
      for (i = 0; i < tableLines.length; ++i) {
        if (tableLines[i].trim() === '') {
          continue;
        }
        rawCells.push(tableLines[i].split('|').map(function(s) {
          return s.trim();
        }));
      }
      if (rawHeaders.length < rawStyles.length) {
        return rawTable;
      }
      for (i = 0; i < rawStyles.length; ++i) {
        styles.push(parseStyles(rawStyles[i]));
      }
      for (i = 0; i < rawHeaders.length; ++i) {
        if (showdown.helper.isUndefined(styles[i])) {
          styles[i] = '';
        }
        headers.push(parseHeaders(rawHeaders[i], styles[i]));
      }
      for (i = 0; i < rawCells.length; ++i) {
        var row = [];
        for (var ii = 0; ii < headers.length; ++ii) {
          if (showdown.helper.isUndefined(rawCells[i][ii])) {}
          row.push(parseCells(rawCells[i][ii], styles[ii]));
        }
        cells.push(row);
      }
      return buildTable(headers, cells);
    });
    text = globals.converter._dispatch('tables.after', text, options, globals);
    return text;
  });
  showdown.subParser('unescapeSpecialChars', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('unescapeSpecialChars.before', text, options, globals);
    text = text.replace(/¨E(\d+)E/g, function(wholeMatch, m1) {
      var charCodeToReplace = parseInt(m1);
      return String.fromCharCode(charCodeToReplace);
    });
    text = globals.converter._dispatch('unescapeSpecialChars.after', text, options, globals);
    return text;
  });
  var root = this;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = showdown;
  } else if (typeof define === 'function' && define.amd) {
    define("github:showdownjs/showdown@1.7.1/dist/showdown.js", [], function() {
      'use strict';
      return showdown;
    });
  } else {
    root.showdown = showdown;
  }
}).call(this);

})();
(function() {
var define = System.amdDefine;
define("github:showdownjs/showdown@1.7.1.js", ["github:showdownjs/showdown@1.7.1/dist/showdown.js"], function(main) {
  return main;
});

})();
System.registerDynamic("src-showdown/app/tests.js", ["github:showdownjs/showdown@1.7.1.js"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    var showdown = $__require("github:showdownjs/showdown@1.7.1.js");
    function convert(placeholder, markdown) {
        var converter = new showdown.Converter();
        var html = converter.makeHtml(markdown);
        var markdownContainer = placeholder.appendChild(document.createElement('pre'));
        var htmlContainer = placeholder.appendChild(document.createElement('pre'));
        var renderContainer = placeholder.appendChild(document.createElement('div'));
        markdownContainer.innerText = markdown;
        htmlContainer.innerText = html;
        renderContainer.innerHTML = html;
    }
    function test1(targetButton, placeholder) {
        var markdown = '#hello, markdown!';
        convert(placeholder, markdown);
    }
    exports.test1 = test1;
    function test2(targetButton, placeholder) {
        var markdown = "## \uAC1C\uC694\n* \uC81C\uBAA9 : TypeScript\n* \uBAA9\uD45C : TypeScript\uB97C \uC774\uC6A9\uD574\uC11C \uC6F9 \uD504\uB85C\uADF8\uB798\uBC0D\uC744 \uD560 \uC218 \uC788\uB2E4. \uC6F9 \uAC1C\uBC1C\uC790\uB77C\uBA74 \uC54C\uC544\uC57C \uD558\uB294 \uD544\uC218 \uC9C0\uC2DD\uC774 \uB418\uC5C8\uB2E4.\n\n----\n## \uC0C1\uC138 \uC124\uBA85\nTypeScript\uB294 \uCEF4\uD30C\uC77C \uACFC\uC815\uC744 \uD1B5\uD574\uC11C \uC790\uBC14\uC2A4\uD06C\uB9BD\uD2B8 \uCF54\uB4DC\uB97C \uC0DD\uC131\uD558\uC9C0\uB9CC \uC0C8\uB85C\uC6B4 \uC5B8\uC5B4\uAC00 \uC544\uB2C8\uB77C \uC790\uBC14\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uD655\uC7A5\uD558\uB294 \uBC29\uC2DD\uC73C\uB85C \uAD6C\uD604\uB418\uC5B4 \uC788\uC5B4\uC11C CoffeeScript \uCC98\uB7FC \uC0C8\uB85C\uC6B4 \uBB38\uBC95\uC744 \uC775\uD788\uC9C0 \uC54A\uC544\uB3C4 \uB41C\uB2E4.\n\n\uB2E4\uC74C\uC758 \uD2B9\uC9D5\uC744 \uAC16\uACE0 \uC788\uB2E4.\n\n* \uC815\uC801 \uD0C0\uC785 \uC9C0\uC6D0 : \uBAA8\uB4E0 \uBCC0\uC218\uC5D0 number, string, interface\uC640 \uAC19\uC740 \uD0C0\uC785\uC744 \uC9C0\uC815\uD560 \uC218 \uC788\uB2E4. TypeScript\uB97C \uC9C0\uC6D0\uD558\uB294 Visual Studio Code\uC640 \uAC19\uC740 \uD3B8\uC9D1\uAE30\uB294 \uCEF4\uD30C\uC77C \uD0C0\uC784\uC5D0 \uD0C0\uC785\uC744 \uC810\uAC80\uD558\uC5EC \uC0AC\uC804\uC5D0 \uC0C1\uB2F9\uD55C \uC624\uB958\uB97C \uC7A1\uC544\uB0B8\uB2E4. \uB7F0\uD0C0\uC784\uC5D0 \"\uC774\uB7F0 \uC18D\uC131 \uC5C6\uC2B5\uB2C8\uB2E4\"\uC640 \uAC19\uC740 \uB300\uBD80\uBD84\uC758 \uC624\uB958\uB97C \uC0AC\uC804\uC5D0 \uCC3E\uC544\uB0BC \uC218 \uC788\uAC8C \uD55C\uB2E4. \n\n* ES6\uC640 \uAC19\uC740 \uCD5C\uC2E0 \uAE30\uB2A5 : \uCD5C\uADFC\uC758 \uC790\uBC14\uC2A4\uD06C\uB9BD\uB294 ES2015, ES2016 \uB4F1\uACFC \uAC19\uC774 \uB9E4\uC6B0 \uBE68\uB9AC \uBC1C\uC804\uC744 \uD558\uACE0 \uC788\uB2E4. \uCD5C\uC2E0\uC758 \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD558\uACE0 \uC2F6\uC5B4\uB3C4 \uBE0C\uB77C\uC6B0\uC800 \uD638\uD658\uC131 \uB54C\uBB38\uC5D0 \uC0AC\uC6A9\uC744 \uAEBC\uB9AC\uAC8C \uB41C\uB2E4. TypeScript\uB294 \uCD5C\uC2E0\uC758 \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD558\uB354\uB77C\uB3C4 ES3, ES5\uC640 \uD638\uD658\uB418\uB294 \uCF54\uB4DC\uB85C \uBCC0\uD658\uC744 \uD574 \uC8FC\uAE30 \uB54C\uBB38\uC5D0 \uAC71\uC815\uC5C6\uC774 \uCD5C\uC2E0 \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC788\uB2E4. Babel\uC774 \uC81C\uACF5\uD558\uB294 \uAE30\uB2A5\uACFC \uC720\uC0AC\uD558\uB2E4.\n\n* Visual Studio Code\uC640 \uAC19\uC740 \uCD5C\uC2E0 \uB3C4\uAD6C\uC758 \uC9C0\uC6D0 : Visual Studio, Xcode, Eclipse \uB4F1\uC5D0\uC11C C++, Swift, Java \uC744 \uC0AC\uC6A9\uD560 \uB54C \uB204\uB838\uB358 \uCF54\uB4DC \uC790\uB3D9 \uC644\uC131, \uC548\uC804\uD55C \uB9AC\uD329\uD1A0\uB9C1 \uB4F1\uC758 \uC774\uC810\uC744 \uC790\uBC14\uC2A4\uD06C\uB9BD\uD2B8\uC5D0\uC11C\uB3C4 \uD65C\uC6A9\uD560 \uC218 \uC788\uAC8C \uB418\uC5C8\uB2E4. \uC774\uC81C \uB354 \uC774\uC0C1 \uC778\uC790\uB85C \uB118\uACA8\uC8FC\uC5B4\uC57C \uD560 \uC624\uBE0C\uC81D\uD2B8\uC758 \uD615\uD0DC \uD30C\uC545\uC5D0 \uC2DC\uAC04\uC744 \uC4F0\uC9C0 \uC54A\uC544\uB3C4 \uB41C\uB2E4.  \n\n* \uC131\uC219\uB3C4 : Angular, Ionic\uACFC \uAC19\uC740 \uD504\uB808\uC784\uC6CC\uD06C\uB294 TypeScript\uB85C \uC791\uC131\uC774 \uB418\uC5B4 \uC788\uC73C\uBA70 \uC720\uBA85 \uC790\uBC14\uC2A4\uD06C\uB9BD\uD2B8 \uB77C\uC774\uBE0C\uB7EC\uB9AC\uB3C4 TypeScript\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC788\uB3C4\uB85D \uC120\uC5B8(C\uC5D0\uC11C \uD5E4\uB354\uD30C\uC77C\uACFC \uC720\uC0AC)\uD30C\uC77C\uC744 \uC81C\uACF5\uD558\uACE0 \uC788\uB2E4.\n\nTypeScript\uB294 MS\uC5D0\uC11C \uAC1C\uBC1C\uC744 \uD588\uC73C\uBA70 \uC774\uBBF8 \uB2E4\uC591\uD55C \uC624\uD508\uC18C\uC2A4\uC5D0\uC11C \uCC44\uD0DD\uB418\uC5B4 \uD65C\uC6A9\uB418\uACE0 \uC788\uB2E4. \uAD6C\uAE00\uB3C4 \uC5BC\uB9C8\uC804\uC5D0 \uC0AC\uB0B4\uC5D0\uC11C \uC0AC\uC6A9\uD558\uB294 \uC8FC\uC694 \uC5B8\uC5B4\uB85C TypeScript\uB97C \uC9C0\uC815\uD588\uB2E4.\n\n\uC790\uBC14\uC2A4\uD06C\uB9BD\uD2B8\uC758 \uD65C\uC6A9\uB3C4\uB294 \uB2E8\uC21C \uC6F9\uC744 \uB118\uC5B4\uC11C \uC11C\uBC84, \uC571\uC758 \uC601\uC5ED\uAE4C\uC9C0 \uD655\uC7A5\uB418\uC5B4 \uAC00\uACE0 \uC788\uC73C\uBA70 TypeScript\uB294 \uC790\uBC14\uC2A4\uD06C\uB9BD\uD2B8 \uD504\uB85C\uADF8\uB798\uBC0D\uC744 \uC990\uAC81\uAC8C \uB9CC\uB4E4\uC5B4 \uC900\uB2E4.\n\n----\n## \uC120\uC218 \uC9C0\uC2DD\n\uC0AC\uC2E4\uC0C1 \uCD5C\uADFC \uC790\uBC14\uC2A4\uD06C\uB9BD\uD2B8\uB294 \uBAA8\uB4C8 \uAD6C\uC131\uC744 \uC774\uC6A9\uD558\uAE30 \uB54C\uBB38\uC5D0 \uC774\uC5D0 \uB300\uD55C \uC774\uD574\uAC00 \uC120\uD589\uB418\uC5B4\uC57C \uD55C\uB2E4. \uB300\uBD80\uBD84\uC758 \uB0B4\uC6A9\uC744 \uB3C4\uAD6C\uB098 \uB77C\uC774\uBE0C\uB7EC\uB9AC\uB97C \uC0AC\uC6A9\uD558\uB294 \uAC83\uC774\uAE30 \uB54C\uBB38\uC5D0 \uC2A4\uD130\uB514 \uC9C4\uD589 \uC911\uC5D0 \uD568\uAED8 \uD559\uC2B5\uD558\uBA74 \uCDA9\uBD84\uD560 \uAC83\uC73C\uB85C \uBCF8\uB2E4.\n\n* NPM : TypeScript \uC124\uCE58, \uB77C\uC774\uBE0C\uB7EC\uB9AC \uC124\uCE58 \uB4F1\uC5D0 \uC0AC\uC6A9\uD55C\uB2E4. Node\uB97C \uC124\uCE58\uD558\uBA74 \uD568\uAED8 \uC124\uCE58\uB41C\uB2E4.\n* \uBAA8\uB4C8 \uB85C\uB354 : \uCEF4\uD30C\uC77C \uD0C0\uC784\uC5D0 TypeScript\uAC00 \uBAA8\uB4C8\uC744 \uCC3E\uB354\uB77C\uB3C4 \uB7F0\uD0C0\uC784\uC5D0\uB294 \uBAA8\uB4C8 \uB85C\uB529\uAE4C\uC9C0 \uC790\uB3D9\uC73C\uB85C \uD574 \uC8FC\uB294 \uAC83\uC740 \uC544\uB2C8\uB2E4. \uADF8\uB798\uC11C [SystemJS](https://github.com/systemjs/systemjs)\uC640 \uAC19\uC740 \uBAA8\uB4C8 \uB85C\uB354\uB97C \uC0AC\uC6A9\uD574\uC57C \uD55C\uB2E4.\n\n----\n## \uCD94\uCC9C \uAD50\uC7AC\n\uAD00\uB828 \uCC45\uB4E4\uB3C4 \uCD9C\uAC04\uB418\uACE0 \uC788\uC9C0\uB9CC 1~2\uB144 \uC815\uB3C4 \uC9C0\uB09C \uB0B4\uC6A9\uC744 \uB2E4\uB8E8\uACE0 \uC788\uAE30 \uB54C\uBB38\uC5D0 \uC628\uB77C\uC778 \uC790\uB8CC\uB97C \uC911\uC2EC\uC73C\uB85C \uD559\uC2B5\uC744 \uD558\uB294 \uAC83\uC774 \uBC14\uB78C\uC9C1\uD558\uB2E4.\n\n### [\uACF5\uC2DD tutorial](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)\n### [\uACF5\uC2DD handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html)\n\n----\n## \uCC38\uACE0 \uC790\uB8CC\n### [TypeScript \uC8FC \uAC1C\uBC1C\uC790\uC758 \uC9C1\uC811 \uC124\uBA85](https://channel9.msdn.com/Events/Build/2017/B8088/player)\n\uD130\uBCF4 \uD30C\uC2A4\uCE7C, \uB378\uD30C\uC774, C# \uB4F1\uC758 \uC5B8\uC5B4\uB97C \uAC1C\uBC1C\uD55C \uC720\uBA85 \uAC1C\uBC1C\uC790\uC758 \uC9C1\uAC15\uC785\uB2C8\uB2E4. \uBE44\uB514\uC624\uB97C \uD55C \uBC88 \uBCF4\uBA74 \uC804\uCCB4\uC801\uC73C\uB85C \uD30C\uC545\uD558\uB294\uB370 \uB3C4\uC6C0\uC774 \uB429\uB2C8\uB2E4. \uC790\uB3D9 \uBC88\uC5ED \uAC19\uC9C0\uB9CC \uD55C\uAE00 \uC790\uB9C9\uB3C4 \uB098\uC624\uB124\uC694.\n\n### [\uB2E4\uC591\uD55C TypeScript \uC608\uC81C\uB4E4](https://github.com/thatseeyou/jspm-typescript-examples)\n'\uCD5C\uC2E0 \uC6F9 \uAC1C\uBC1C' \uAD50\uC721 \uACFC\uC815\uC5D0 \uD65C\uC6A9\uD558\uAE30 \uC704\uD574\uC11C \uC9C1\uC811 \uC791\uC131\uD55C \uCF54\uB4DC\uC774\uB2E4. \uB2E4\uC591\uD55C \uB77C\uC774\uBE0C\uB7EC\uB9AC\uB97C TypeScript\uC640 \uC5B4\uB5BB\uAC8C \uD568\uAED8 \uC0AC\uC6A9\uD560 \uC218 \uC788\uB294\uC9C0\uB97C \uD655\uC778\uD560 \uC218 \uC788\uC744 \uAC83\uC774\uB2E4.\n\n";
        convert(placeholder, markdown);
    }
    exports.test2 = test2;
});
System.registerDynamic("src-showdown/app/main.js", ["npm:domready@1.0.8.js", "npm:screenlog@0.2.2.js", "libs/testbutton.js", "src-showdown/app/tests.js"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    var domready = $__require("npm:domready@1.0.8.js");
    $__require("npm:screenlog@0.2.2.js");
    var testbutton_1 = $__require("libs/testbutton.js");
    var t = $__require("src-showdown/app/tests.js");
    var tests = [{ text: '---- clear log ----', action: screenLog.clear }, { text: 'basic', action: t.test1 }, { text: 'real sample', action: t.test2 }];
    domready(function () {
        screenLog.init({ autoScroll: true });
        testbutton_1.makeTestButtons(tests);
    });
});
//# sourceMappingURL=build.js.map