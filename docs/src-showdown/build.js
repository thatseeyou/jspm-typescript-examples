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
        describe: 'Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic \'section-\' prefix',
        type: 'string'
      },
      rawPrefixHeaderId: {
        defaultValue: false,
        describe: 'Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix)',
        type: 'boolean'
      },
      ghCompatibleHeaderId: {
        defaultValue: false,
        describe: 'Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)',
        type: 'boolean'
      },
      rawHeaderId: {
        defaultValue: false,
        describe: 'Remove only spaces, \' and " from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids',
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
      },
      backslashEscapesHTMLTags: {
        defaultValue: false,
        description: 'Support for HTML Tag escaping. ex: \<div>foo\</div>',
        type: 'boolean'
      },
      emoji: {
        defaultValue: false,
        description: 'Enable emoji support. Ex: `this is a :smile: emoji`',
        type: 'boolean'
      },
      underline: {
        defaultValue: false,
        description: 'Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled, underscores no longer parses into `<em>` and `<strong>`',
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
          ghMentions: true,
          backslashEscapesHTMLTags: true,
          emoji: true
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
    return Array.isArray(a);
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
  showdown.helper.regexes = {asteriskDashAndColon: /([*_:~])/g};
  showdown.helper.emojis = {
    '+1': '\ud83d\udc4d',
    '-1': '\ud83d\udc4e',
    '100': '\ud83d\udcaf',
    '1234': '\ud83d\udd22',
    '1st_place_medal': '\ud83e\udd47',
    '2nd_place_medal': '\ud83e\udd48',
    '3rd_place_medal': '\ud83e\udd49',
    '8ball': '\ud83c\udfb1',
    'a': '\ud83c\udd70\ufe0f',
    'ab': '\ud83c\udd8e',
    'abc': '\ud83d\udd24',
    'abcd': '\ud83d\udd21',
    'accept': '\ud83c\ude51',
    'aerial_tramway': '\ud83d\udea1',
    'airplane': '\u2708\ufe0f',
    'alarm_clock': '\u23f0',
    'alembic': '\u2697\ufe0f',
    'alien': '\ud83d\udc7d',
    'ambulance': '\ud83d\ude91',
    'amphora': '\ud83c\udffa',
    'anchor': '\u2693\ufe0f',
    'angel': '\ud83d\udc7c',
    'anger': '\ud83d\udca2',
    'angry': '\ud83d\ude20',
    'anguished': '\ud83d\ude27',
    'ant': '\ud83d\udc1c',
    'apple': '\ud83c\udf4e',
    'aquarius': '\u2652\ufe0f',
    'aries': '\u2648\ufe0f',
    'arrow_backward': '\u25c0\ufe0f',
    'arrow_double_down': '\u23ec',
    'arrow_double_up': '\u23eb',
    'arrow_down': '\u2b07\ufe0f',
    'arrow_down_small': '\ud83d\udd3d',
    'arrow_forward': '\u25b6\ufe0f',
    'arrow_heading_down': '\u2935\ufe0f',
    'arrow_heading_up': '\u2934\ufe0f',
    'arrow_left': '\u2b05\ufe0f',
    'arrow_lower_left': '\u2199\ufe0f',
    'arrow_lower_right': '\u2198\ufe0f',
    'arrow_right': '\u27a1\ufe0f',
    'arrow_right_hook': '\u21aa\ufe0f',
    'arrow_up': '\u2b06\ufe0f',
    'arrow_up_down': '\u2195\ufe0f',
    'arrow_up_small': '\ud83d\udd3c',
    'arrow_upper_left': '\u2196\ufe0f',
    'arrow_upper_right': '\u2197\ufe0f',
    'arrows_clockwise': '\ud83d\udd03',
    'arrows_counterclockwise': '\ud83d\udd04',
    'art': '\ud83c\udfa8',
    'articulated_lorry': '\ud83d\ude9b',
    'artificial_satellite': '\ud83d\udef0',
    'astonished': '\ud83d\ude32',
    'athletic_shoe': '\ud83d\udc5f',
    'atm': '\ud83c\udfe7',
    'atom_symbol': '\u269b\ufe0f',
    'avocado': '\ud83e\udd51',
    'b': '\ud83c\udd71\ufe0f',
    'baby': '\ud83d\udc76',
    'baby_bottle': '\ud83c\udf7c',
    'baby_chick': '\ud83d\udc24',
    'baby_symbol': '\ud83d\udebc',
    'back': '\ud83d\udd19',
    'bacon': '\ud83e\udd53',
    'badminton': '\ud83c\udff8',
    'baggage_claim': '\ud83d\udec4',
    'baguette_bread': '\ud83e\udd56',
    'balance_scale': '\u2696\ufe0f',
    'balloon': '\ud83c\udf88',
    'ballot_box': '\ud83d\uddf3',
    'ballot_box_with_check': '\u2611\ufe0f',
    'bamboo': '\ud83c\udf8d',
    'banana': '\ud83c\udf4c',
    'bangbang': '\u203c\ufe0f',
    'bank': '\ud83c\udfe6',
    'bar_chart': '\ud83d\udcca',
    'barber': '\ud83d\udc88',
    'baseball': '\u26be\ufe0f',
    'basketball': '\ud83c\udfc0',
    'basketball_man': '\u26f9\ufe0f',
    'basketball_woman': '\u26f9\ufe0f&zwj;\u2640\ufe0f',
    'bat': '\ud83e\udd87',
    'bath': '\ud83d\udec0',
    'bathtub': '\ud83d\udec1',
    'battery': '\ud83d\udd0b',
    'beach_umbrella': '\ud83c\udfd6',
    'bear': '\ud83d\udc3b',
    'bed': '\ud83d\udecf',
    'bee': '\ud83d\udc1d',
    'beer': '\ud83c\udf7a',
    'beers': '\ud83c\udf7b',
    'beetle': '\ud83d\udc1e',
    'beginner': '\ud83d\udd30',
    'bell': '\ud83d\udd14',
    'bellhop_bell': '\ud83d\udece',
    'bento': '\ud83c\udf71',
    'biking_man': '\ud83d\udeb4',
    'bike': '\ud83d\udeb2',
    'biking_woman': '\ud83d\udeb4&zwj;\u2640\ufe0f',
    'bikini': '\ud83d\udc59',
    'biohazard': '\u2623\ufe0f',
    'bird': '\ud83d\udc26',
    'birthday': '\ud83c\udf82',
    'black_circle': '\u26ab\ufe0f',
    'black_flag': '\ud83c\udff4',
    'black_heart': '\ud83d\udda4',
    'black_joker': '\ud83c\udccf',
    'black_large_square': '\u2b1b\ufe0f',
    'black_medium_small_square': '\u25fe\ufe0f',
    'black_medium_square': '\u25fc\ufe0f',
    'black_nib': '\u2712\ufe0f',
    'black_small_square': '\u25aa\ufe0f',
    'black_square_button': '\ud83d\udd32',
    'blonde_man': '\ud83d\udc71',
    'blonde_woman': '\ud83d\udc71&zwj;\u2640\ufe0f',
    'blossom': '\ud83c\udf3c',
    'blowfish': '\ud83d\udc21',
    'blue_book': '\ud83d\udcd8',
    'blue_car': '\ud83d\ude99',
    'blue_heart': '\ud83d\udc99',
    'blush': '\ud83d\ude0a',
    'boar': '\ud83d\udc17',
    'boat': '\u26f5\ufe0f',
    'bomb': '\ud83d\udca3',
    'book': '\ud83d\udcd6',
    'bookmark': '\ud83d\udd16',
    'bookmark_tabs': '\ud83d\udcd1',
    'books': '\ud83d\udcda',
    'boom': '\ud83d\udca5',
    'boot': '\ud83d\udc62',
    'bouquet': '\ud83d\udc90',
    'bowing_man': '\ud83d\ude47',
    'bow_and_arrow': '\ud83c\udff9',
    'bowing_woman': '\ud83d\ude47&zwj;\u2640\ufe0f',
    'bowling': '\ud83c\udfb3',
    'boxing_glove': '\ud83e\udd4a',
    'boy': '\ud83d\udc66',
    'bread': '\ud83c\udf5e',
    'bride_with_veil': '\ud83d\udc70',
    'bridge_at_night': '\ud83c\udf09',
    'briefcase': '\ud83d\udcbc',
    'broken_heart': '\ud83d\udc94',
    'bug': '\ud83d\udc1b',
    'building_construction': '\ud83c\udfd7',
    'bulb': '\ud83d\udca1',
    'bullettrain_front': '\ud83d\ude85',
    'bullettrain_side': '\ud83d\ude84',
    'burrito': '\ud83c\udf2f',
    'bus': '\ud83d\ude8c',
    'business_suit_levitating': '\ud83d\udd74',
    'busstop': '\ud83d\ude8f',
    'bust_in_silhouette': '\ud83d\udc64',
    'busts_in_silhouette': '\ud83d\udc65',
    'butterfly': '\ud83e\udd8b',
    'cactus': '\ud83c\udf35',
    'cake': '\ud83c\udf70',
    'calendar': '\ud83d\udcc6',
    'call_me_hand': '\ud83e\udd19',
    'calling': '\ud83d\udcf2',
    'camel': '\ud83d\udc2b',
    'camera': '\ud83d\udcf7',
    'camera_flash': '\ud83d\udcf8',
    'camping': '\ud83c\udfd5',
    'cancer': '\u264b\ufe0f',
    'candle': '\ud83d\udd6f',
    'candy': '\ud83c\udf6c',
    'canoe': '\ud83d\udef6',
    'capital_abcd': '\ud83d\udd20',
    'capricorn': '\u2651\ufe0f',
    'car': '\ud83d\ude97',
    'card_file_box': '\ud83d\uddc3',
    'card_index': '\ud83d\udcc7',
    'card_index_dividers': '\ud83d\uddc2',
    'carousel_horse': '\ud83c\udfa0',
    'carrot': '\ud83e\udd55',
    'cat': '\ud83d\udc31',
    'cat2': '\ud83d\udc08',
    'cd': '\ud83d\udcbf',
    'chains': '\u26d3',
    'champagne': '\ud83c\udf7e',
    'chart': '\ud83d\udcb9',
    'chart_with_downwards_trend': '\ud83d\udcc9',
    'chart_with_upwards_trend': '\ud83d\udcc8',
    'checkered_flag': '\ud83c\udfc1',
    'cheese': '\ud83e\uddc0',
    'cherries': '\ud83c\udf52',
    'cherry_blossom': '\ud83c\udf38',
    'chestnut': '\ud83c\udf30',
    'chicken': '\ud83d\udc14',
    'children_crossing': '\ud83d\udeb8',
    'chipmunk': '\ud83d\udc3f',
    'chocolate_bar': '\ud83c\udf6b',
    'christmas_tree': '\ud83c\udf84',
    'church': '\u26ea\ufe0f',
    'cinema': '\ud83c\udfa6',
    'circus_tent': '\ud83c\udfaa',
    'city_sunrise': '\ud83c\udf07',
    'city_sunset': '\ud83c\udf06',
    'cityscape': '\ud83c\udfd9',
    'cl': '\ud83c\udd91',
    'clamp': '\ud83d\udddc',
    'clap': '\ud83d\udc4f',
    'clapper': '\ud83c\udfac',
    'classical_building': '\ud83c\udfdb',
    'clinking_glasses': '\ud83e\udd42',
    'clipboard': '\ud83d\udccb',
    'clock1': '\ud83d\udd50',
    'clock10': '\ud83d\udd59',
    'clock1030': '\ud83d\udd65',
    'clock11': '\ud83d\udd5a',
    'clock1130': '\ud83d\udd66',
    'clock12': '\ud83d\udd5b',
    'clock1230': '\ud83d\udd67',
    'clock130': '\ud83d\udd5c',
    'clock2': '\ud83d\udd51',
    'clock230': '\ud83d\udd5d',
    'clock3': '\ud83d\udd52',
    'clock330': '\ud83d\udd5e',
    'clock4': '\ud83d\udd53',
    'clock430': '\ud83d\udd5f',
    'clock5': '\ud83d\udd54',
    'clock530': '\ud83d\udd60',
    'clock6': '\ud83d\udd55',
    'clock630': '\ud83d\udd61',
    'clock7': '\ud83d\udd56',
    'clock730': '\ud83d\udd62',
    'clock8': '\ud83d\udd57',
    'clock830': '\ud83d\udd63',
    'clock9': '\ud83d\udd58',
    'clock930': '\ud83d\udd64',
    'closed_book': '\ud83d\udcd5',
    'closed_lock_with_key': '\ud83d\udd10',
    'closed_umbrella': '\ud83c\udf02',
    'cloud': '\u2601\ufe0f',
    'cloud_with_lightning': '\ud83c\udf29',
    'cloud_with_lightning_and_rain': '\u26c8',
    'cloud_with_rain': '\ud83c\udf27',
    'cloud_with_snow': '\ud83c\udf28',
    'clown_face': '\ud83e\udd21',
    'clubs': '\u2663\ufe0f',
    'cocktail': '\ud83c\udf78',
    'coffee': '\u2615\ufe0f',
    'coffin': '\u26b0\ufe0f',
    'cold_sweat': '\ud83d\ude30',
    'comet': '\u2604\ufe0f',
    'computer': '\ud83d\udcbb',
    'computer_mouse': '\ud83d\uddb1',
    'confetti_ball': '\ud83c\udf8a',
    'confounded': '\ud83d\ude16',
    'confused': '\ud83d\ude15',
    'congratulations': '\u3297\ufe0f',
    'construction': '\ud83d\udea7',
    'construction_worker_man': '\ud83d\udc77',
    'construction_worker_woman': '\ud83d\udc77&zwj;\u2640\ufe0f',
    'control_knobs': '\ud83c\udf9b',
    'convenience_store': '\ud83c\udfea',
    'cookie': '\ud83c\udf6a',
    'cool': '\ud83c\udd92',
    'policeman': '\ud83d\udc6e',
    'copyright': '\u00a9\ufe0f',
    'corn': '\ud83c\udf3d',
    'couch_and_lamp': '\ud83d\udecb',
    'couple': '\ud83d\udc6b',
    'couple_with_heart_woman_man': '\ud83d\udc91',
    'couple_with_heart_man_man': '\ud83d\udc68&zwj;\u2764\ufe0f&zwj;\ud83d\udc68',
    'couple_with_heart_woman_woman': '\ud83d\udc69&zwj;\u2764\ufe0f&zwj;\ud83d\udc69',
    'couplekiss_man_man': '\ud83d\udc68&zwj;\u2764\ufe0f&zwj;\ud83d\udc8b&zwj;\ud83d\udc68',
    'couplekiss_man_woman': '\ud83d\udc8f',
    'couplekiss_woman_woman': '\ud83d\udc69&zwj;\u2764\ufe0f&zwj;\ud83d\udc8b&zwj;\ud83d\udc69',
    'cow': '\ud83d\udc2e',
    'cow2': '\ud83d\udc04',
    'cowboy_hat_face': '\ud83e\udd20',
    'crab': '\ud83e\udd80',
    'crayon': '\ud83d\udd8d',
    'credit_card': '\ud83d\udcb3',
    'crescent_moon': '\ud83c\udf19',
    'cricket': '\ud83c\udfcf',
    'crocodile': '\ud83d\udc0a',
    'croissant': '\ud83e\udd50',
    'crossed_fingers': '\ud83e\udd1e',
    'crossed_flags': '\ud83c\udf8c',
    'crossed_swords': '\u2694\ufe0f',
    'crown': '\ud83d\udc51',
    'cry': '\ud83d\ude22',
    'crying_cat_face': '\ud83d\ude3f',
    'crystal_ball': '\ud83d\udd2e',
    'cucumber': '\ud83e\udd52',
    'cupid': '\ud83d\udc98',
    'curly_loop': '\u27b0',
    'currency_exchange': '\ud83d\udcb1',
    'curry': '\ud83c\udf5b',
    'custard': '\ud83c\udf6e',
    'customs': '\ud83d\udec3',
    'cyclone': '\ud83c\udf00',
    'dagger': '\ud83d\udde1',
    'dancer': '\ud83d\udc83',
    'dancing_women': '\ud83d\udc6f',
    'dancing_men': '\ud83d\udc6f&zwj;\u2642\ufe0f',
    'dango': '\ud83c\udf61',
    'dark_sunglasses': '\ud83d\udd76',
    'dart': '\ud83c\udfaf',
    'dash': '\ud83d\udca8',
    'date': '\ud83d\udcc5',
    'deciduous_tree': '\ud83c\udf33',
    'deer': '\ud83e\udd8c',
    'department_store': '\ud83c\udfec',
    'derelict_house': '\ud83c\udfda',
    'desert': '\ud83c\udfdc',
    'desert_island': '\ud83c\udfdd',
    'desktop_computer': '\ud83d\udda5',
    'male_detective': '\ud83d\udd75\ufe0f',
    'diamond_shape_with_a_dot_inside': '\ud83d\udca0',
    'diamonds': '\u2666\ufe0f',
    'disappointed': '\ud83d\ude1e',
    'disappointed_relieved': '\ud83d\ude25',
    'dizzy': '\ud83d\udcab',
    'dizzy_face': '\ud83d\ude35',
    'do_not_litter': '\ud83d\udeaf',
    'dog': '\ud83d\udc36',
    'dog2': '\ud83d\udc15',
    'dollar': '\ud83d\udcb5',
    'dolls': '\ud83c\udf8e',
    'dolphin': '\ud83d\udc2c',
    'door': '\ud83d\udeaa',
    'doughnut': '\ud83c\udf69',
    'dove': '\ud83d\udd4a',
    'dragon': '\ud83d\udc09',
    'dragon_face': '\ud83d\udc32',
    'dress': '\ud83d\udc57',
    'dromedary_camel': '\ud83d\udc2a',
    'drooling_face': '\ud83e\udd24',
    'droplet': '\ud83d\udca7',
    'drum': '\ud83e\udd41',
    'duck': '\ud83e\udd86',
    'dvd': '\ud83d\udcc0',
    'e-mail': '\ud83d\udce7',
    'eagle': '\ud83e\udd85',
    'ear': '\ud83d\udc42',
    'ear_of_rice': '\ud83c\udf3e',
    'earth_africa': '\ud83c\udf0d',
    'earth_americas': '\ud83c\udf0e',
    'earth_asia': '\ud83c\udf0f',
    'egg': '\ud83e\udd5a',
    'eggplant': '\ud83c\udf46',
    'eight_pointed_black_star': '\u2734\ufe0f',
    'eight_spoked_asterisk': '\u2733\ufe0f',
    'electric_plug': '\ud83d\udd0c',
    'elephant': '\ud83d\udc18',
    'email': '\u2709\ufe0f',
    'end': '\ud83d\udd1a',
    'envelope_with_arrow': '\ud83d\udce9',
    'euro': '\ud83d\udcb6',
    'european_castle': '\ud83c\udff0',
    'european_post_office': '\ud83c\udfe4',
    'evergreen_tree': '\ud83c\udf32',
    'exclamation': '\u2757\ufe0f',
    'expressionless': '\ud83d\ude11',
    'eye': '\ud83d\udc41',
    'eye_speech_bubble': '\ud83d\udc41&zwj;\ud83d\udde8',
    'eyeglasses': '\ud83d\udc53',
    'eyes': '\ud83d\udc40',
    'face_with_head_bandage': '\ud83e\udd15',
    'face_with_thermometer': '\ud83e\udd12',
    'fist_oncoming': '\ud83d\udc4a',
    'factory': '\ud83c\udfed',
    'fallen_leaf': '\ud83c\udf42',
    'family_man_woman_boy': '\ud83d\udc6a',
    'family_man_boy': '\ud83d\udc68&zwj;\ud83d\udc66',
    'family_man_boy_boy': '\ud83d\udc68&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
    'family_man_girl': '\ud83d\udc68&zwj;\ud83d\udc67',
    'family_man_girl_boy': '\ud83d\udc68&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
    'family_man_girl_girl': '\ud83d\udc68&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
    'family_man_man_boy': '\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc66',
    'family_man_man_boy_boy': '\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
    'family_man_man_girl': '\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc67',
    'family_man_man_girl_boy': '\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
    'family_man_man_girl_girl': '\ud83d\udc68&zwj;\ud83d\udc68&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
    'family_man_woman_boy_boy': '\ud83d\udc68&zwj;\ud83d\udc69&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
    'family_man_woman_girl': '\ud83d\udc68&zwj;\ud83d\udc69&zwj;\ud83d\udc67',
    'family_man_woman_girl_boy': '\ud83d\udc68&zwj;\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
    'family_man_woman_girl_girl': '\ud83d\udc68&zwj;\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
    'family_woman_boy': '\ud83d\udc69&zwj;\ud83d\udc66',
    'family_woman_boy_boy': '\ud83d\udc69&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
    'family_woman_girl': '\ud83d\udc69&zwj;\ud83d\udc67',
    'family_woman_girl_boy': '\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
    'family_woman_girl_girl': '\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
    'family_woman_woman_boy': '\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc66',
    'family_woman_woman_boy_boy': '\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc66&zwj;\ud83d\udc66',
    'family_woman_woman_girl': '\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc67',
    'family_woman_woman_girl_boy': '\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc66',
    'family_woman_woman_girl_girl': '\ud83d\udc69&zwj;\ud83d\udc69&zwj;\ud83d\udc67&zwj;\ud83d\udc67',
    'fast_forward': '\u23e9',
    'fax': '\ud83d\udce0',
    'fearful': '\ud83d\ude28',
    'feet': '\ud83d\udc3e',
    'female_detective': '\ud83d\udd75\ufe0f&zwj;\u2640\ufe0f',
    'ferris_wheel': '\ud83c\udfa1',
    'ferry': '\u26f4',
    'field_hockey': '\ud83c\udfd1',
    'file_cabinet': '\ud83d\uddc4',
    'file_folder': '\ud83d\udcc1',
    'film_projector': '\ud83d\udcfd',
    'film_strip': '\ud83c\udf9e',
    'fire': '\ud83d\udd25',
    'fire_engine': '\ud83d\ude92',
    'fireworks': '\ud83c\udf86',
    'first_quarter_moon': '\ud83c\udf13',
    'first_quarter_moon_with_face': '\ud83c\udf1b',
    'fish': '\ud83d\udc1f',
    'fish_cake': '\ud83c\udf65',
    'fishing_pole_and_fish': '\ud83c\udfa3',
    'fist_raised': '\u270a',
    'fist_left': '\ud83e\udd1b',
    'fist_right': '\ud83e\udd1c',
    'flags': '\ud83c\udf8f',
    'flashlight': '\ud83d\udd26',
    'fleur_de_lis': '\u269c\ufe0f',
    'flight_arrival': '\ud83d\udeec',
    'flight_departure': '\ud83d\udeeb',
    'floppy_disk': '\ud83d\udcbe',
    'flower_playing_cards': '\ud83c\udfb4',
    'flushed': '\ud83d\ude33',
    'fog': '\ud83c\udf2b',
    'foggy': '\ud83c\udf01',
    'football': '\ud83c\udfc8',
    'footprints': '\ud83d\udc63',
    'fork_and_knife': '\ud83c\udf74',
    'fountain': '\u26f2\ufe0f',
    'fountain_pen': '\ud83d\udd8b',
    'four_leaf_clover': '\ud83c\udf40',
    'fox_face': '\ud83e\udd8a',
    'framed_picture': '\ud83d\uddbc',
    'free': '\ud83c\udd93',
    'fried_egg': '\ud83c\udf73',
    'fried_shrimp': '\ud83c\udf64',
    'fries': '\ud83c\udf5f',
    'frog': '\ud83d\udc38',
    'frowning': '\ud83d\ude26',
    'frowning_face': '\u2639\ufe0f',
    'frowning_man': '\ud83d\ude4d&zwj;\u2642\ufe0f',
    'frowning_woman': '\ud83d\ude4d',
    'middle_finger': '\ud83d\udd95',
    'fuelpump': '\u26fd\ufe0f',
    'full_moon': '\ud83c\udf15',
    'full_moon_with_face': '\ud83c\udf1d',
    'funeral_urn': '\u26b1\ufe0f',
    'game_die': '\ud83c\udfb2',
    'gear': '\u2699\ufe0f',
    'gem': '\ud83d\udc8e',
    'gemini': '\u264a\ufe0f',
    'ghost': '\ud83d\udc7b',
    'gift': '\ud83c\udf81',
    'gift_heart': '\ud83d\udc9d',
    'girl': '\ud83d\udc67',
    'globe_with_meridians': '\ud83c\udf10',
    'goal_net': '\ud83e\udd45',
    'goat': '\ud83d\udc10',
    'golf': '\u26f3\ufe0f',
    'golfing_man': '\ud83c\udfcc\ufe0f',
    'golfing_woman': '\ud83c\udfcc\ufe0f&zwj;\u2640\ufe0f',
    'gorilla': '\ud83e\udd8d',
    'grapes': '\ud83c\udf47',
    'green_apple': '\ud83c\udf4f',
    'green_book': '\ud83d\udcd7',
    'green_heart': '\ud83d\udc9a',
    'green_salad': '\ud83e\udd57',
    'grey_exclamation': '\u2755',
    'grey_question': '\u2754',
    'grimacing': '\ud83d\ude2c',
    'grin': '\ud83d\ude01',
    'grinning': '\ud83d\ude00',
    'guardsman': '\ud83d\udc82',
    'guardswoman': '\ud83d\udc82&zwj;\u2640\ufe0f',
    'guitar': '\ud83c\udfb8',
    'gun': '\ud83d\udd2b',
    'haircut_woman': '\ud83d\udc87',
    'haircut_man': '\ud83d\udc87&zwj;\u2642\ufe0f',
    'hamburger': '\ud83c\udf54',
    'hammer': '\ud83d\udd28',
    'hammer_and_pick': '\u2692',
    'hammer_and_wrench': '\ud83d\udee0',
    'hamster': '\ud83d\udc39',
    'hand': '\u270b',
    'handbag': '\ud83d\udc5c',
    'handshake': '\ud83e\udd1d',
    'hankey': '\ud83d\udca9',
    'hatched_chick': '\ud83d\udc25',
    'hatching_chick': '\ud83d\udc23',
    'headphones': '\ud83c\udfa7',
    'hear_no_evil': '\ud83d\ude49',
    'heart': '\u2764\ufe0f',
    'heart_decoration': '\ud83d\udc9f',
    'heart_eyes': '\ud83d\ude0d',
    'heart_eyes_cat': '\ud83d\ude3b',
    'heartbeat': '\ud83d\udc93',
    'heartpulse': '\ud83d\udc97',
    'hearts': '\u2665\ufe0f',
    'heavy_check_mark': '\u2714\ufe0f',
    'heavy_division_sign': '\u2797',
    'heavy_dollar_sign': '\ud83d\udcb2',
    'heavy_heart_exclamation': '\u2763\ufe0f',
    'heavy_minus_sign': '\u2796',
    'heavy_multiplication_x': '\u2716\ufe0f',
    'heavy_plus_sign': '\u2795',
    'helicopter': '\ud83d\ude81',
    'herb': '\ud83c\udf3f',
    'hibiscus': '\ud83c\udf3a',
    'high_brightness': '\ud83d\udd06',
    'high_heel': '\ud83d\udc60',
    'hocho': '\ud83d\udd2a',
    'hole': '\ud83d\udd73',
    'honey_pot': '\ud83c\udf6f',
    'horse': '\ud83d\udc34',
    'horse_racing': '\ud83c\udfc7',
    'hospital': '\ud83c\udfe5',
    'hot_pepper': '\ud83c\udf36',
    'hotdog': '\ud83c\udf2d',
    'hotel': '\ud83c\udfe8',
    'hotsprings': '\u2668\ufe0f',
    'hourglass': '\u231b\ufe0f',
    'hourglass_flowing_sand': '\u23f3',
    'house': '\ud83c\udfe0',
    'house_with_garden': '\ud83c\udfe1',
    'houses': '\ud83c\udfd8',
    'hugs': '\ud83e\udd17',
    'hushed': '\ud83d\ude2f',
    'ice_cream': '\ud83c\udf68',
    'ice_hockey': '\ud83c\udfd2',
    'ice_skate': '\u26f8',
    'icecream': '\ud83c\udf66',
    'id': '\ud83c\udd94',
    'ideograph_advantage': '\ud83c\ude50',
    'imp': '\ud83d\udc7f',
    'inbox_tray': '\ud83d\udce5',
    'incoming_envelope': '\ud83d\udce8',
    'tipping_hand_woman': '\ud83d\udc81',
    'information_source': '\u2139\ufe0f',
    'innocent': '\ud83d\ude07',
    'interrobang': '\u2049\ufe0f',
    'iphone': '\ud83d\udcf1',
    'izakaya_lantern': '\ud83c\udfee',
    'jack_o_lantern': '\ud83c\udf83',
    'japan': '\ud83d\uddfe',
    'japanese_castle': '\ud83c\udfef',
    'japanese_goblin': '\ud83d\udc7a',
    'japanese_ogre': '\ud83d\udc79',
    'jeans': '\ud83d\udc56',
    'joy': '\ud83d\ude02',
    'joy_cat': '\ud83d\ude39',
    'joystick': '\ud83d\udd79',
    'kaaba': '\ud83d\udd4b',
    'key': '\ud83d\udd11',
    'keyboard': '\u2328\ufe0f',
    'keycap_ten': '\ud83d\udd1f',
    'kick_scooter': '\ud83d\udef4',
    'kimono': '\ud83d\udc58',
    'kiss': '\ud83d\udc8b',
    'kissing': '\ud83d\ude17',
    'kissing_cat': '\ud83d\ude3d',
    'kissing_closed_eyes': '\ud83d\ude1a',
    'kissing_heart': '\ud83d\ude18',
    'kissing_smiling_eyes': '\ud83d\ude19',
    'kiwi_fruit': '\ud83e\udd5d',
    'koala': '\ud83d\udc28',
    'koko': '\ud83c\ude01',
    'label': '\ud83c\udff7',
    'large_blue_circle': '\ud83d\udd35',
    'large_blue_diamond': '\ud83d\udd37',
    'large_orange_diamond': '\ud83d\udd36',
    'last_quarter_moon': '\ud83c\udf17',
    'last_quarter_moon_with_face': '\ud83c\udf1c',
    'latin_cross': '\u271d\ufe0f',
    'laughing': '\ud83d\ude06',
    'leaves': '\ud83c\udf43',
    'ledger': '\ud83d\udcd2',
    'left_luggage': '\ud83d\udec5',
    'left_right_arrow': '\u2194\ufe0f',
    'leftwards_arrow_with_hook': '\u21a9\ufe0f',
    'lemon': '\ud83c\udf4b',
    'leo': '\u264c\ufe0f',
    'leopard': '\ud83d\udc06',
    'level_slider': '\ud83c\udf9a',
    'libra': '\u264e\ufe0f',
    'light_rail': '\ud83d\ude88',
    'link': '\ud83d\udd17',
    'lion': '\ud83e\udd81',
    'lips': '\ud83d\udc44',
    'lipstick': '\ud83d\udc84',
    'lizard': '\ud83e\udd8e',
    'lock': '\ud83d\udd12',
    'lock_with_ink_pen': '\ud83d\udd0f',
    'lollipop': '\ud83c\udf6d',
    'loop': '\u27bf',
    'loud_sound': '\ud83d\udd0a',
    'loudspeaker': '\ud83d\udce2',
    'love_hotel': '\ud83c\udfe9',
    'love_letter': '\ud83d\udc8c',
    'low_brightness': '\ud83d\udd05',
    'lying_face': '\ud83e\udd25',
    'm': '\u24c2\ufe0f',
    'mag': '\ud83d\udd0d',
    'mag_right': '\ud83d\udd0e',
    'mahjong': '\ud83c\udc04\ufe0f',
    'mailbox': '\ud83d\udceb',
    'mailbox_closed': '\ud83d\udcea',
    'mailbox_with_mail': '\ud83d\udcec',
    'mailbox_with_no_mail': '\ud83d\udced',
    'man': '\ud83d\udc68',
    'man_artist': '\ud83d\udc68&zwj;\ud83c\udfa8',
    'man_astronaut': '\ud83d\udc68&zwj;\ud83d\ude80',
    'man_cartwheeling': '\ud83e\udd38&zwj;\u2642\ufe0f',
    'man_cook': '\ud83d\udc68&zwj;\ud83c\udf73',
    'man_dancing': '\ud83d\udd7a',
    'man_facepalming': '\ud83e\udd26&zwj;\u2642\ufe0f',
    'man_factory_worker': '\ud83d\udc68&zwj;\ud83c\udfed',
    'man_farmer': '\ud83d\udc68&zwj;\ud83c\udf3e',
    'man_firefighter': '\ud83d\udc68&zwj;\ud83d\ude92',
    'man_health_worker': '\ud83d\udc68&zwj;\u2695\ufe0f',
    'man_in_tuxedo': '\ud83e\udd35',
    'man_judge': '\ud83d\udc68&zwj;\u2696\ufe0f',
    'man_juggling': '\ud83e\udd39&zwj;\u2642\ufe0f',
    'man_mechanic': '\ud83d\udc68&zwj;\ud83d\udd27',
    'man_office_worker': '\ud83d\udc68&zwj;\ud83d\udcbc',
    'man_pilot': '\ud83d\udc68&zwj;\u2708\ufe0f',
    'man_playing_handball': '\ud83e\udd3e&zwj;\u2642\ufe0f',
    'man_playing_water_polo': '\ud83e\udd3d&zwj;\u2642\ufe0f',
    'man_scientist': '\ud83d\udc68&zwj;\ud83d\udd2c',
    'man_shrugging': '\ud83e\udd37&zwj;\u2642\ufe0f',
    'man_singer': '\ud83d\udc68&zwj;\ud83c\udfa4',
    'man_student': '\ud83d\udc68&zwj;\ud83c\udf93',
    'man_teacher': '\ud83d\udc68&zwj;\ud83c\udfeb',
    'man_technologist': '\ud83d\udc68&zwj;\ud83d\udcbb',
    'man_with_gua_pi_mao': '\ud83d\udc72',
    'man_with_turban': '\ud83d\udc73',
    'tangerine': '\ud83c\udf4a',
    'mans_shoe': '\ud83d\udc5e',
    'mantelpiece_clock': '\ud83d\udd70',
    'maple_leaf': '\ud83c\udf41',
    'martial_arts_uniform': '\ud83e\udd4b',
    'mask': '\ud83d\ude37',
    'massage_woman': '\ud83d\udc86',
    'massage_man': '\ud83d\udc86&zwj;\u2642\ufe0f',
    'meat_on_bone': '\ud83c\udf56',
    'medal_military': '\ud83c\udf96',
    'medal_sports': '\ud83c\udfc5',
    'mega': '\ud83d\udce3',
    'melon': '\ud83c\udf48',
    'memo': '\ud83d\udcdd',
    'men_wrestling': '\ud83e\udd3c&zwj;\u2642\ufe0f',
    'menorah': '\ud83d\udd4e',
    'mens': '\ud83d\udeb9',
    'metal': '\ud83e\udd18',
    'metro': '\ud83d\ude87',
    'microphone': '\ud83c\udfa4',
    'microscope': '\ud83d\udd2c',
    'milk_glass': '\ud83e\udd5b',
    'milky_way': '\ud83c\udf0c',
    'minibus': '\ud83d\ude90',
    'minidisc': '\ud83d\udcbd',
    'mobile_phone_off': '\ud83d\udcf4',
    'money_mouth_face': '\ud83e\udd11',
    'money_with_wings': '\ud83d\udcb8',
    'moneybag': '\ud83d\udcb0',
    'monkey': '\ud83d\udc12',
    'monkey_face': '\ud83d\udc35',
    'monorail': '\ud83d\ude9d',
    'moon': '\ud83c\udf14',
    'mortar_board': '\ud83c\udf93',
    'mosque': '\ud83d\udd4c',
    'motor_boat': '\ud83d\udee5',
    'motor_scooter': '\ud83d\udef5',
    'motorcycle': '\ud83c\udfcd',
    'motorway': '\ud83d\udee3',
    'mount_fuji': '\ud83d\uddfb',
    'mountain': '\u26f0',
    'mountain_biking_man': '\ud83d\udeb5',
    'mountain_biking_woman': '\ud83d\udeb5&zwj;\u2640\ufe0f',
    'mountain_cableway': '\ud83d\udea0',
    'mountain_railway': '\ud83d\ude9e',
    'mountain_snow': '\ud83c\udfd4',
    'mouse': '\ud83d\udc2d',
    'mouse2': '\ud83d\udc01',
    'movie_camera': '\ud83c\udfa5',
    'moyai': '\ud83d\uddff',
    'mrs_claus': '\ud83e\udd36',
    'muscle': '\ud83d\udcaa',
    'mushroom': '\ud83c\udf44',
    'musical_keyboard': '\ud83c\udfb9',
    'musical_note': '\ud83c\udfb5',
    'musical_score': '\ud83c\udfbc',
    'mute': '\ud83d\udd07',
    'nail_care': '\ud83d\udc85',
    'name_badge': '\ud83d\udcdb',
    'national_park': '\ud83c\udfde',
    'nauseated_face': '\ud83e\udd22',
    'necktie': '\ud83d\udc54',
    'negative_squared_cross_mark': '\u274e',
    'nerd_face': '\ud83e\udd13',
    'neutral_face': '\ud83d\ude10',
    'new': '\ud83c\udd95',
    'new_moon': '\ud83c\udf11',
    'new_moon_with_face': '\ud83c\udf1a',
    'newspaper': '\ud83d\udcf0',
    'newspaper_roll': '\ud83d\uddde',
    'next_track_button': '\u23ed',
    'ng': '\ud83c\udd96',
    'no_good_man': '\ud83d\ude45&zwj;\u2642\ufe0f',
    'no_good_woman': '\ud83d\ude45',
    'night_with_stars': '\ud83c\udf03',
    'no_bell': '\ud83d\udd15',
    'no_bicycles': '\ud83d\udeb3',
    'no_entry': '\u26d4\ufe0f',
    'no_entry_sign': '\ud83d\udeab',
    'no_mobile_phones': '\ud83d\udcf5',
    'no_mouth': '\ud83d\ude36',
    'no_pedestrians': '\ud83d\udeb7',
    'no_smoking': '\ud83d\udead',
    'non-potable_water': '\ud83d\udeb1',
    'nose': '\ud83d\udc43',
    'notebook': '\ud83d\udcd3',
    'notebook_with_decorative_cover': '\ud83d\udcd4',
    'notes': '\ud83c\udfb6',
    'nut_and_bolt': '\ud83d\udd29',
    'o': '\u2b55\ufe0f',
    'o2': '\ud83c\udd7e\ufe0f',
    'ocean': '\ud83c\udf0a',
    'octopus': '\ud83d\udc19',
    'oden': '\ud83c\udf62',
    'office': '\ud83c\udfe2',
    'oil_drum': '\ud83d\udee2',
    'ok': '\ud83c\udd97',
    'ok_hand': '\ud83d\udc4c',
    'ok_man': '\ud83d\ude46&zwj;\u2642\ufe0f',
    'ok_woman': '\ud83d\ude46',
    'old_key': '\ud83d\udddd',
    'older_man': '\ud83d\udc74',
    'older_woman': '\ud83d\udc75',
    'om': '\ud83d\udd49',
    'on': '\ud83d\udd1b',
    'oncoming_automobile': '\ud83d\ude98',
    'oncoming_bus': '\ud83d\ude8d',
    'oncoming_police_car': '\ud83d\ude94',
    'oncoming_taxi': '\ud83d\ude96',
    'open_file_folder': '\ud83d\udcc2',
    'open_hands': '\ud83d\udc50',
    'open_mouth': '\ud83d\ude2e',
    'open_umbrella': '\u2602\ufe0f',
    'ophiuchus': '\u26ce',
    'orange_book': '\ud83d\udcd9',
    'orthodox_cross': '\u2626\ufe0f',
    'outbox_tray': '\ud83d\udce4',
    'owl': '\ud83e\udd89',
    'ox': '\ud83d\udc02',
    'package': '\ud83d\udce6',
    'page_facing_up': '\ud83d\udcc4',
    'page_with_curl': '\ud83d\udcc3',
    'pager': '\ud83d\udcdf',
    'paintbrush': '\ud83d\udd8c',
    'palm_tree': '\ud83c\udf34',
    'pancakes': '\ud83e\udd5e',
    'panda_face': '\ud83d\udc3c',
    'paperclip': '\ud83d\udcce',
    'paperclips': '\ud83d\udd87',
    'parasol_on_ground': '\u26f1',
    'parking': '\ud83c\udd7f\ufe0f',
    'part_alternation_mark': '\u303d\ufe0f',
    'partly_sunny': '\u26c5\ufe0f',
    'passenger_ship': '\ud83d\udef3',
    'passport_control': '\ud83d\udec2',
    'pause_button': '\u23f8',
    'peace_symbol': '\u262e\ufe0f',
    'peach': '\ud83c\udf51',
    'peanuts': '\ud83e\udd5c',
    'pear': '\ud83c\udf50',
    'pen': '\ud83d\udd8a',
    'pencil2': '\u270f\ufe0f',
    'penguin': '\ud83d\udc27',
    'pensive': '\ud83d\ude14',
    'performing_arts': '\ud83c\udfad',
    'persevere': '\ud83d\ude23',
    'person_fencing': '\ud83e\udd3a',
    'pouting_woman': '\ud83d\ude4e',
    'phone': '\u260e\ufe0f',
    'pick': '\u26cf',
    'pig': '\ud83d\udc37',
    'pig2': '\ud83d\udc16',
    'pig_nose': '\ud83d\udc3d',
    'pill': '\ud83d\udc8a',
    'pineapple': '\ud83c\udf4d',
    'ping_pong': '\ud83c\udfd3',
    'pisces': '\u2653\ufe0f',
    'pizza': '\ud83c\udf55',
    'place_of_worship': '\ud83d\uded0',
    'plate_with_cutlery': '\ud83c\udf7d',
    'play_or_pause_button': '\u23ef',
    'point_down': '\ud83d\udc47',
    'point_left': '\ud83d\udc48',
    'point_right': '\ud83d\udc49',
    'point_up': '\u261d\ufe0f',
    'point_up_2': '\ud83d\udc46',
    'police_car': '\ud83d\ude93',
    'policewoman': '\ud83d\udc6e&zwj;\u2640\ufe0f',
    'poodle': '\ud83d\udc29',
    'popcorn': '\ud83c\udf7f',
    'post_office': '\ud83c\udfe3',
    'postal_horn': '\ud83d\udcef',
    'postbox': '\ud83d\udcee',
    'potable_water': '\ud83d\udeb0',
    'potato': '\ud83e\udd54',
    'pouch': '\ud83d\udc5d',
    'poultry_leg': '\ud83c\udf57',
    'pound': '\ud83d\udcb7',
    'rage': '\ud83d\ude21',
    'pouting_cat': '\ud83d\ude3e',
    'pouting_man': '\ud83d\ude4e&zwj;\u2642\ufe0f',
    'pray': '\ud83d\ude4f',
    'prayer_beads': '\ud83d\udcff',
    'pregnant_woman': '\ud83e\udd30',
    'previous_track_button': '\u23ee',
    'prince': '\ud83e\udd34',
    'princess': '\ud83d\udc78',
    'printer': '\ud83d\udda8',
    'purple_heart': '\ud83d\udc9c',
    'purse': '\ud83d\udc5b',
    'pushpin': '\ud83d\udccc',
    'put_litter_in_its_place': '\ud83d\udeae',
    'question': '\u2753',
    'rabbit': '\ud83d\udc30',
    'rabbit2': '\ud83d\udc07',
    'racehorse': '\ud83d\udc0e',
    'racing_car': '\ud83c\udfce',
    'radio': '\ud83d\udcfb',
    'radio_button': '\ud83d\udd18',
    'radioactive': '\u2622\ufe0f',
    'railway_car': '\ud83d\ude83',
    'railway_track': '\ud83d\udee4',
    'rainbow': '\ud83c\udf08',
    'rainbow_flag': '\ud83c\udff3\ufe0f&zwj;\ud83c\udf08',
    'raised_back_of_hand': '\ud83e\udd1a',
    'raised_hand_with_fingers_splayed': '\ud83d\udd90',
    'raised_hands': '\ud83d\ude4c',
    'raising_hand_woman': '\ud83d\ude4b',
    'raising_hand_man': '\ud83d\ude4b&zwj;\u2642\ufe0f',
    'ram': '\ud83d\udc0f',
    'ramen': '\ud83c\udf5c',
    'rat': '\ud83d\udc00',
    'record_button': '\u23fa',
    'recycle': '\u267b\ufe0f',
    'red_circle': '\ud83d\udd34',
    'registered': '\u00ae\ufe0f',
    'relaxed': '\u263a\ufe0f',
    'relieved': '\ud83d\ude0c',
    'reminder_ribbon': '\ud83c\udf97',
    'repeat': '\ud83d\udd01',
    'repeat_one': '\ud83d\udd02',
    'rescue_worker_helmet': '\u26d1',
    'restroom': '\ud83d\udebb',
    'revolving_hearts': '\ud83d\udc9e',
    'rewind': '\u23ea',
    'rhinoceros': '\ud83e\udd8f',
    'ribbon': '\ud83c\udf80',
    'rice': '\ud83c\udf5a',
    'rice_ball': '\ud83c\udf59',
    'rice_cracker': '\ud83c\udf58',
    'rice_scene': '\ud83c\udf91',
    'right_anger_bubble': '\ud83d\uddef',
    'ring': '\ud83d\udc8d',
    'robot': '\ud83e\udd16',
    'rocket': '\ud83d\ude80',
    'rofl': '\ud83e\udd23',
    'roll_eyes': '\ud83d\ude44',
    'roller_coaster': '\ud83c\udfa2',
    'rooster': '\ud83d\udc13',
    'rose': '\ud83c\udf39',
    'rosette': '\ud83c\udff5',
    'rotating_light': '\ud83d\udea8',
    'round_pushpin': '\ud83d\udccd',
    'rowing_man': '\ud83d\udea3',
    'rowing_woman': '\ud83d\udea3&zwj;\u2640\ufe0f',
    'rugby_football': '\ud83c\udfc9',
    'running_man': '\ud83c\udfc3',
    'running_shirt_with_sash': '\ud83c\udfbd',
    'running_woman': '\ud83c\udfc3&zwj;\u2640\ufe0f',
    'sa': '\ud83c\ude02\ufe0f',
    'sagittarius': '\u2650\ufe0f',
    'sake': '\ud83c\udf76',
    'sandal': '\ud83d\udc61',
    'santa': '\ud83c\udf85',
    'satellite': '\ud83d\udce1',
    'saxophone': '\ud83c\udfb7',
    'school': '\ud83c\udfeb',
    'school_satchel': '\ud83c\udf92',
    'scissors': '\u2702\ufe0f',
    'scorpion': '\ud83e\udd82',
    'scorpius': '\u264f\ufe0f',
    'scream': '\ud83d\ude31',
    'scream_cat': '\ud83d\ude40',
    'scroll': '\ud83d\udcdc',
    'seat': '\ud83d\udcba',
    'secret': '\u3299\ufe0f',
    'see_no_evil': '\ud83d\ude48',
    'seedling': '\ud83c\udf31',
    'selfie': '\ud83e\udd33',
    'shallow_pan_of_food': '\ud83e\udd58',
    'shamrock': '\u2618\ufe0f',
    'shark': '\ud83e\udd88',
    'shaved_ice': '\ud83c\udf67',
    'sheep': '\ud83d\udc11',
    'shell': '\ud83d\udc1a',
    'shield': '\ud83d\udee1',
    'shinto_shrine': '\u26e9',
    'ship': '\ud83d\udea2',
    'shirt': '\ud83d\udc55',
    'shopping': '\ud83d\udecd',
    'shopping_cart': '\ud83d\uded2',
    'shower': '\ud83d\udebf',
    'shrimp': '\ud83e\udd90',
    'signal_strength': '\ud83d\udcf6',
    'six_pointed_star': '\ud83d\udd2f',
    'ski': '\ud83c\udfbf',
    'skier': '\u26f7',
    'skull': '\ud83d\udc80',
    'skull_and_crossbones': '\u2620\ufe0f',
    'sleeping': '\ud83d\ude34',
    'sleeping_bed': '\ud83d\udecc',
    'sleepy': '\ud83d\ude2a',
    'slightly_frowning_face': '\ud83d\ude41',
    'slightly_smiling_face': '\ud83d\ude42',
    'slot_machine': '\ud83c\udfb0',
    'small_airplane': '\ud83d\udee9',
    'small_blue_diamond': '\ud83d\udd39',
    'small_orange_diamond': '\ud83d\udd38',
    'small_red_triangle': '\ud83d\udd3a',
    'small_red_triangle_down': '\ud83d\udd3b',
    'smile': '\ud83d\ude04',
    'smile_cat': '\ud83d\ude38',
    'smiley': '\ud83d\ude03',
    'smiley_cat': '\ud83d\ude3a',
    'smiling_imp': '\ud83d\ude08',
    'smirk': '\ud83d\ude0f',
    'smirk_cat': '\ud83d\ude3c',
    'smoking': '\ud83d\udeac',
    'snail': '\ud83d\udc0c',
    'snake': '\ud83d\udc0d',
    'sneezing_face': '\ud83e\udd27',
    'snowboarder': '\ud83c\udfc2',
    'snowflake': '\u2744\ufe0f',
    'snowman': '\u26c4\ufe0f',
    'snowman_with_snow': '\u2603\ufe0f',
    'sob': '\ud83d\ude2d',
    'soccer': '\u26bd\ufe0f',
    'soon': '\ud83d\udd1c',
    'sos': '\ud83c\udd98',
    'sound': '\ud83d\udd09',
    'space_invader': '\ud83d\udc7e',
    'spades': '\u2660\ufe0f',
    'spaghetti': '\ud83c\udf5d',
    'sparkle': '\u2747\ufe0f',
    'sparkler': '\ud83c\udf87',
    'sparkles': '\u2728',
    'sparkling_heart': '\ud83d\udc96',
    'speak_no_evil': '\ud83d\ude4a',
    'speaker': '\ud83d\udd08',
    'speaking_head': '\ud83d\udde3',
    'speech_balloon': '\ud83d\udcac',
    'speedboat': '\ud83d\udea4',
    'spider': '\ud83d\udd77',
    'spider_web': '\ud83d\udd78',
    'spiral_calendar': '\ud83d\uddd3',
    'spiral_notepad': '\ud83d\uddd2',
    'spoon': '\ud83e\udd44',
    'squid': '\ud83e\udd91',
    'stadium': '\ud83c\udfdf',
    'star': '\u2b50\ufe0f',
    'star2': '\ud83c\udf1f',
    'star_and_crescent': '\u262a\ufe0f',
    'star_of_david': '\u2721\ufe0f',
    'stars': '\ud83c\udf20',
    'station': '\ud83d\ude89',
    'statue_of_liberty': '\ud83d\uddfd',
    'steam_locomotive': '\ud83d\ude82',
    'stew': '\ud83c\udf72',
    'stop_button': '\u23f9',
    'stop_sign': '\ud83d\uded1',
    'stopwatch': '\u23f1',
    'straight_ruler': '\ud83d\udccf',
    'strawberry': '\ud83c\udf53',
    'stuck_out_tongue': '\ud83d\ude1b',
    'stuck_out_tongue_closed_eyes': '\ud83d\ude1d',
    'stuck_out_tongue_winking_eye': '\ud83d\ude1c',
    'studio_microphone': '\ud83c\udf99',
    'stuffed_flatbread': '\ud83e\udd59',
    'sun_behind_large_cloud': '\ud83c\udf25',
    'sun_behind_rain_cloud': '\ud83c\udf26',
    'sun_behind_small_cloud': '\ud83c\udf24',
    'sun_with_face': '\ud83c\udf1e',
    'sunflower': '\ud83c\udf3b',
    'sunglasses': '\ud83d\ude0e',
    'sunny': '\u2600\ufe0f',
    'sunrise': '\ud83c\udf05',
    'sunrise_over_mountains': '\ud83c\udf04',
    'surfing_man': '\ud83c\udfc4',
    'surfing_woman': '\ud83c\udfc4&zwj;\u2640\ufe0f',
    'sushi': '\ud83c\udf63',
    'suspension_railway': '\ud83d\ude9f',
    'sweat': '\ud83d\ude13',
    'sweat_drops': '\ud83d\udca6',
    'sweat_smile': '\ud83d\ude05',
    'sweet_potato': '\ud83c\udf60',
    'swimming_man': '\ud83c\udfca',
    'swimming_woman': '\ud83c\udfca&zwj;\u2640\ufe0f',
    'symbols': '\ud83d\udd23',
    'synagogue': '\ud83d\udd4d',
    'syringe': '\ud83d\udc89',
    'taco': '\ud83c\udf2e',
    'tada': '\ud83c\udf89',
    'tanabata_tree': '\ud83c\udf8b',
    'taurus': '\u2649\ufe0f',
    'taxi': '\ud83d\ude95',
    'tea': '\ud83c\udf75',
    'telephone_receiver': '\ud83d\udcde',
    'telescope': '\ud83d\udd2d',
    'tennis': '\ud83c\udfbe',
    'tent': '\u26fa\ufe0f',
    'thermometer': '\ud83c\udf21',
    'thinking': '\ud83e\udd14',
    'thought_balloon': '\ud83d\udcad',
    'ticket': '\ud83c\udfab',
    'tickets': '\ud83c\udf9f',
    'tiger': '\ud83d\udc2f',
    'tiger2': '\ud83d\udc05',
    'timer_clock': '\u23f2',
    'tipping_hand_man': '\ud83d\udc81&zwj;\u2642\ufe0f',
    'tired_face': '\ud83d\ude2b',
    'tm': '\u2122\ufe0f',
    'toilet': '\ud83d\udebd',
    'tokyo_tower': '\ud83d\uddfc',
    'tomato': '\ud83c\udf45',
    'tongue': '\ud83d\udc45',
    'top': '\ud83d\udd1d',
    'tophat': '\ud83c\udfa9',
    'tornado': '\ud83c\udf2a',
    'trackball': '\ud83d\uddb2',
    'tractor': '\ud83d\ude9c',
    'traffic_light': '\ud83d\udea5',
    'train': '\ud83d\ude8b',
    'train2': '\ud83d\ude86',
    'tram': '\ud83d\ude8a',
    'triangular_flag_on_post': '\ud83d\udea9',
    'triangular_ruler': '\ud83d\udcd0',
    'trident': '\ud83d\udd31',
    'triumph': '\ud83d\ude24',
    'trolleybus': '\ud83d\ude8e',
    'trophy': '\ud83c\udfc6',
    'tropical_drink': '\ud83c\udf79',
    'tropical_fish': '\ud83d\udc20',
    'truck': '\ud83d\ude9a',
    'trumpet': '\ud83c\udfba',
    'tulip': '\ud83c\udf37',
    'tumbler_glass': '\ud83e\udd43',
    'turkey': '\ud83e\udd83',
    'turtle': '\ud83d\udc22',
    'tv': '\ud83d\udcfa',
    'twisted_rightwards_arrows': '\ud83d\udd00',
    'two_hearts': '\ud83d\udc95',
    'two_men_holding_hands': '\ud83d\udc6c',
    'two_women_holding_hands': '\ud83d\udc6d',
    'u5272': '\ud83c\ude39',
    'u5408': '\ud83c\ude34',
    'u55b6': '\ud83c\ude3a',
    'u6307': '\ud83c\ude2f\ufe0f',
    'u6708': '\ud83c\ude37\ufe0f',
    'u6709': '\ud83c\ude36',
    'u6e80': '\ud83c\ude35',
    'u7121': '\ud83c\ude1a\ufe0f',
    'u7533': '\ud83c\ude38',
    'u7981': '\ud83c\ude32',
    'u7a7a': '\ud83c\ude33',
    'umbrella': '\u2614\ufe0f',
    'unamused': '\ud83d\ude12',
    'underage': '\ud83d\udd1e',
    'unicorn': '\ud83e\udd84',
    'unlock': '\ud83d\udd13',
    'up': '\ud83c\udd99',
    'upside_down_face': '\ud83d\ude43',
    'v': '\u270c\ufe0f',
    'vertical_traffic_light': '\ud83d\udea6',
    'vhs': '\ud83d\udcfc',
    'vibration_mode': '\ud83d\udcf3',
    'video_camera': '\ud83d\udcf9',
    'video_game': '\ud83c\udfae',
    'violin': '\ud83c\udfbb',
    'virgo': '\u264d\ufe0f',
    'volcano': '\ud83c\udf0b',
    'volleyball': '\ud83c\udfd0',
    'vs': '\ud83c\udd9a',
    'vulcan_salute': '\ud83d\udd96',
    'walking_man': '\ud83d\udeb6',
    'walking_woman': '\ud83d\udeb6&zwj;\u2640\ufe0f',
    'waning_crescent_moon': '\ud83c\udf18',
    'waning_gibbous_moon': '\ud83c\udf16',
    'warning': '\u26a0\ufe0f',
    'wastebasket': '\ud83d\uddd1',
    'watch': '\u231a\ufe0f',
    'water_buffalo': '\ud83d\udc03',
    'watermelon': '\ud83c\udf49',
    'wave': '\ud83d\udc4b',
    'wavy_dash': '\u3030\ufe0f',
    'waxing_crescent_moon': '\ud83c\udf12',
    'wc': '\ud83d\udebe',
    'weary': '\ud83d\ude29',
    'wedding': '\ud83d\udc92',
    'weight_lifting_man': '\ud83c\udfcb\ufe0f',
    'weight_lifting_woman': '\ud83c\udfcb\ufe0f&zwj;\u2640\ufe0f',
    'whale': '\ud83d\udc33',
    'whale2': '\ud83d\udc0b',
    'wheel_of_dharma': '\u2638\ufe0f',
    'wheelchair': '\u267f\ufe0f',
    'white_check_mark': '\u2705',
    'white_circle': '\u26aa\ufe0f',
    'white_flag': '\ud83c\udff3\ufe0f',
    'white_flower': '\ud83d\udcae',
    'white_large_square': '\u2b1c\ufe0f',
    'white_medium_small_square': '\u25fd\ufe0f',
    'white_medium_square': '\u25fb\ufe0f',
    'white_small_square': '\u25ab\ufe0f',
    'white_square_button': '\ud83d\udd33',
    'wilted_flower': '\ud83e\udd40',
    'wind_chime': '\ud83c\udf90',
    'wind_face': '\ud83c\udf2c',
    'wine_glass': '\ud83c\udf77',
    'wink': '\ud83d\ude09',
    'wolf': '\ud83d\udc3a',
    'woman': '\ud83d\udc69',
    'woman_artist': '\ud83d\udc69&zwj;\ud83c\udfa8',
    'woman_astronaut': '\ud83d\udc69&zwj;\ud83d\ude80',
    'woman_cartwheeling': '\ud83e\udd38&zwj;\u2640\ufe0f',
    'woman_cook': '\ud83d\udc69&zwj;\ud83c\udf73',
    'woman_facepalming': '\ud83e\udd26&zwj;\u2640\ufe0f',
    'woman_factory_worker': '\ud83d\udc69&zwj;\ud83c\udfed',
    'woman_farmer': '\ud83d\udc69&zwj;\ud83c\udf3e',
    'woman_firefighter': '\ud83d\udc69&zwj;\ud83d\ude92',
    'woman_health_worker': '\ud83d\udc69&zwj;\u2695\ufe0f',
    'woman_judge': '\ud83d\udc69&zwj;\u2696\ufe0f',
    'woman_juggling': '\ud83e\udd39&zwj;\u2640\ufe0f',
    'woman_mechanic': '\ud83d\udc69&zwj;\ud83d\udd27',
    'woman_office_worker': '\ud83d\udc69&zwj;\ud83d\udcbc',
    'woman_pilot': '\ud83d\udc69&zwj;\u2708\ufe0f',
    'woman_playing_handball': '\ud83e\udd3e&zwj;\u2640\ufe0f',
    'woman_playing_water_polo': '\ud83e\udd3d&zwj;\u2640\ufe0f',
    'woman_scientist': '\ud83d\udc69&zwj;\ud83d\udd2c',
    'woman_shrugging': '\ud83e\udd37&zwj;\u2640\ufe0f',
    'woman_singer': '\ud83d\udc69&zwj;\ud83c\udfa4',
    'woman_student': '\ud83d\udc69&zwj;\ud83c\udf93',
    'woman_teacher': '\ud83d\udc69&zwj;\ud83c\udfeb',
    'woman_technologist': '\ud83d\udc69&zwj;\ud83d\udcbb',
    'woman_with_turban': '\ud83d\udc73&zwj;\u2640\ufe0f',
    'womans_clothes': '\ud83d\udc5a',
    'womans_hat': '\ud83d\udc52',
    'women_wrestling': '\ud83e\udd3c&zwj;\u2640\ufe0f',
    'womens': '\ud83d\udeba',
    'world_map': '\ud83d\uddfa',
    'worried': '\ud83d\ude1f',
    'wrench': '\ud83d\udd27',
    'writing_hand': '\u270d\ufe0f',
    'x': '\u274c',
    'yellow_heart': '\ud83d\udc9b',
    'yen': '\ud83d\udcb4',
    'yin_yang': '\u262f\ufe0f',
    'yum': '\ud83d\ude0b',
    'zap': '\u26a1\ufe0f',
    'zipper_mouth_face': '\ud83e\udd10',
    'zzz': '\ud83d\udca4',
    'octocat': '<img width="20" height="20" align="absmiddle" src="data:image/png;base64,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">',
    'showdown': '<img width="20" height="20" align="absmiddle" src="data:image/png;base64,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/GMzLdsAAECtaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzA2NyA3OS4xNTc3NDcsIDIwMTUvMDMvMzAtMjM6NDA6NDIgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTUtMDEtMTVUMjE6MDE6MTlaPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxNy0xMC0yNFQxMzozMTozMCswMTowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTctMTAtMjRUMTM6MzE6MzArMDE6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8cGhvdG9zaG9wOkNvbG9yTW9kZT4zPC9waG90b3Nob3A6Q29sb3JNb2RlPgogICAgICAgICA8cGhvdG9zaG9wOklDQ1Byb2ZpbGU+c1JHQiBJRUM2MTk2Ni0yLjE8L3Bob3Rvc2hvcDpJQ0NQcm9maWxlPgogICAgICAgICA8cGhvdG9zaG9wOlRleHRMYXllcnM+CiAgICAgICAgICAgIDxyZGY6QmFnPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+UyAtPC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD5TIC08L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpCYWc+CiAgICAgICAgIDwvcGhvdG9zaG9wOlRleHRMYXllcnM+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6N2NkMzQxNzctOWYyZi0yNDRiLWEyYjQtMzU1MzJkY2Y1MWJiPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6M2E1YzgxYmYtYjhiNy0xMWU3LTk0NDktYTQ2MzdlZjJkNjMzPC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6NjBDNUFFNjVGNjlDRTQxMTk0NUE4NTVFM0JDQTdFRUI8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6NjBDNUFFNjVGNjlDRTQxMTk0NUE4NTVFM0JDQTdFRUI8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTUtMDEtMTVUMjE6MDE6MTlaPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ODZjNjBkMGQtOGY0Yy01ZTRlLWEwMjQtODI4ZWQyNTIwZDc3PC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTEwLTI0VDEzOjMxOjMwKzAxOjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jb252ZXJ0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+ZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZzwvc3RFdnQ6cGFyYW1ldGVycz4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmRlcml2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+Y29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmc8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjdjZDM0MTc3LTlmMmYtMjQ0Yi1hMmI0LTM1NTMyZGNmNTFiYjwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNy0xMC0yNFQxMzozMTozMCswMTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L3htcE1NOkhpc3Rvcnk+CiAgICAgICAgIDx4bXBNTTpEZXJpdmVkRnJvbSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgIDxzdFJlZjppbnN0YW5jZUlEPnhtcC5paWQ6ODZjNjBkMGQtOGY0Yy01ZTRlLWEwMjQtODI4ZWQyNTIwZDc3PC9zdFJlZjppbnN0YW5jZUlEPgogICAgICAgICAgICA8c3RSZWY6ZG9jdW1lbnRJRD54bXAuZGlkOjYwQzVBRTY1RjY5Q0U0MTE5NDVBODU1RTNCQ0E3RUVCPC9zdFJlZjpkb2N1bWVudElEPgogICAgICAgICAgICA8c3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6NjBDNUFFNjVGNjlDRTQxMTk0NUE4NTVFM0JDQTdFRUI8L3N0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRnJvbT4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+NjQ8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+NjQ8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pse7bzcAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAA1JJREFUeNrsm1+OmlAUhz+aeS9dwZggJn1AnRUMO6jpBgZXULuC2hWUWUGZBTSxKyiuoA4mfUBMnB04K5g+9DihRBHlyh/lJLwIXLgf99xzzu9etZeXFy7Z3nDh1gBoAFy4XeVtQNO0zNcapmUDfUBPnFoBfhQGq6IBaHmjwD4Ahmk5wAD4kKG5J8CNwsAFaHe6DvA9cc0wCgOv8gDka3vA9RHNPgo0D7hNnJtGYWBXxgV2dH4MfMnRRA+Y1WIO2NJ5F/ikoKm3tYsChmkNFHW+fmHQMC1dfHaXPQP3wM1yMdc2B/AOGALTWobBmI1Shu0UGCwX83XyRBQGawHntTtdG5gUNfxVu4CTNqNv6/wWGL7kCc+1AmCYVisl3I2ydD4GYZUCs7IjoLXrxHIx9w9tLAqDCfBwDrXAY457x+cAoCfuwRGjYFUnAGk+PsjR7s8Dn1VeLWCYVlpDw+VivjVHSHt+u9PVJbzGzZXQWTkAkz0V31fATUaEsjVJlQBs4FeGcteLgzgbAALBA+4y3voAeJL8nA0AHfClnM1qm1HhnYUidCSE+KzvSSJUTwAxCOMcpfETMFYpfRUKIAbCFhC3OTJJJwqDWS0BxED0JZ4Pjix1P2+E0loCSMBwyK4S/xc1ojBwag8gMU84cvTKGgmlAYhngu1O9xAXuVE5J1QCQCz3bwHuHvdQui5QKQAxEO6eEKpsFCgTRSXkvdoxSlBMCxhJJbgrrbZRtHCiShN0pRB6PeQ3ckBw2K0oKXMBVYJIP+Nvh9qulFivGoBt1lLQxowT2ykBXCfnhZIglgYACWmqXQv+baioBYCeiCQHm+QEg1O7RhF7hO4OhSAhcJKSFU7qBGADwZeqMMuXn6TUBw8qlaMrirNb4LdhWlP+SWD+cjFfxTpuS2GUpik+o3jFSEkqbJiWn0P0OMSGqlWiOu0TvD+FRHZKAE+oW+cfRmEwqlsesJJEJs8y91QqP+9UL6lqEtz2gpuNEY5sm9sIHln2DRa2aFKGJtiXkZEMiWtgVvRKUSUFkSKt2S7fAGgAXLYpmQQXf36MUChTZdUa2u8/rkvPA6Tz30r4eH3ybcBS5gJ6SaNXb+aABkA1AMxKenclBZLW/He4cYEGwEXb3wEASelexk6LIIIAAAAASUVORK5CYII=">'
  };
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
      url = url.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
      var result = '<a href="' + url + '"';
      if (title !== '' && title !== null) {
        title = title.replace(/"/g, '&quot;');
        title = title.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
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
        var lnk = options.ghMentionsLink.replace(/\{u}/g, username),
            target = '';
        if (options.openLinksInNewWindow) {
          target = ' target="¨E95Eblank"';
        }
        return st + '<a href="' + lnk + '"' + target + '>' + mentions + '</a>';
      });
    }
    text = globals.converter._dispatch('anchors.after', text, options, globals);
    return text;
  });
  var simpleURLRegex = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+?\.[^'">\s]+?)()(\1)?(?=\s|$)(?!["<>])/gi,
      simpleURLRegex2 = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]])?(\1)?(?=\s|$)(?!["<>])/gi,
      delimUrlRegex = /()<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>()/gi,
      simpleMailRegex = /(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gmi,
      delimMailRegex = /<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,
      replaceLink = function(options) {
        'use strict';
        return function(wm, leadingMagicChars, link, m2, m3, trailingPunctuation, trailingMagicChars) {
          link = link.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
          var lnkTxt = link,
              append = '',
              target = '',
              lmc = leadingMagicChars || '',
              tmc = trailingMagicChars || '';
          if (/^www\./i.test(link)) {
            link = link.replace(/^www\./i, 'http://www.');
          }
          if (options.excludeTrailingPunctuationFromURLs && trailingPunctuation) {
            append = trailingPunctuation;
          }
          if (options.openLinksInNewWindow) {
            target = ' target="¨E95Eblank"';
          }
          return lmc + '<a href="' + link + '"' + target + '>' + lnkTxt + '</a>' + append + tmc;
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
  showdown.subParser('ellipsis', function(text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('ellipsis.before', text, options, globals);
    text = text.replace(/\.\.\./g, '…');
    text = globals.converter._dispatch('ellipsis.after', text, options, globals);
    return text;
  });
  showdown.subParser('emoji', function(text, options, globals) {
    'use strict';
    if (!options.emoji) {
      return text;
    }
    text = globals.converter._dispatch('emoji.before', text, options, globals);
    var emojiRgx = /:([\S]+?):/g;
    text = text.replace(emojiRgx, function(wm, emojiCode) {
      if (showdown.helper.emojis.hasOwnProperty(emojiCode)) {
        return showdown.helper.emojis[emojiCode];
      }
      return wm;
    });
    text = globals.converter._dispatch('emoji.after', text, options, globals);
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
    var tags = /<\/?[a-z\d_:-]+(?:[\s]+[\s\S]+?)?>/gi,
        comments = /<!(--(?:(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>/gi;
    text = text.replace(tags, function(wholeMatch) {
      return wholeMatch.replace(/(.)<\/?code>(?=.)/g, '$1`').replace(/([\\`*_~=|])/g, showdown.helper.escapeCharactersCallback);
    });
    text = text.replace(comments, function(wholeMatch) {
      return wholeMatch.replace(/([\\`*_~=|])/g, showdown.helper.escapeCharactersCallback);
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
    if (options.backslashEscapesHTMLTags) {
      text = text.replace(/\\<(\/?[^>]+?)>/g, function(wm, inside) {
        return '&lt;' + inside + '&gt;';
      });
    }
    for (var i = 0; i < blockTags.length; ++i) {
      var opTagPos,
          rgx1 = new RegExp('^ {0,3}(<' + blockTags[i] + '\\b[^>]*>)', 'im'),
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
      var title,
          prefix;
      if (options.customizedHeaderId) {
        var match = m.match(/\{([^{]+?)}\s*$/);
        if (match && match[1]) {
          m = match[1];
        }
      }
      title = m;
      if (showdown.helper.isString(options.prefixHeaderId)) {
        prefix = options.prefixHeaderId;
      } else if (options.prefixHeaderId === true) {
        prefix = 'section-';
      } else {
        prefix = '';
      }
      if (!options.rawPrefixHeaderId) {
        title = prefix + title;
      }
      if (options.ghCompatibleHeaderId) {
        title = title.replace(/ /g, '-').replace(/&amp;/g, '').replace(/¨T/g, '').replace(/¨D/g, '').replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g, '').toLowerCase();
      } else if (options.rawHeaderId) {
        title = title.replace(/ /g, '-').replace(/&amp;/g, '&').replace(/¨T/g, '¨').replace(/¨D/g, '$').replace(/["']/g, '-').toLowerCase();
      } else {
        title = title.replace(/[^\w]/g, '').toLowerCase();
      }
      if (options.rawPrefixHeaderId) {
        title = prefix + title;
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
        base64RegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g,
        referenceRegExp = /!\[([^\]]*?)] ?(?:\n *)?\[([\s\S]*?)]()()()()()/g,
        refShortcutRegExp = /!\[([^\[\]]+)]()()()()()/g;
    function writeImageTagBase64(wholeMatch, altText, linkId, url, width, height, m5, title) {
      url = url.replace(/\s/g, '');
      return writeImageTag(wholeMatch, altText, linkId, url, width, height, m5, title);
    }
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
      altText = altText.replace(/"/g, '&quot;').replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
      url = url.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
      var result = '<img src="' + url + '" alt="' + altText + '"';
      if (title) {
        title = title.replace(/"/g, '&quot;').replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
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
    text = text.replace(base64RegExp, writeImageTagBase64);
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
      text = text.trim().replace(/(^| )\*{3}(\S[\s\S]*?)\*{3}([ ,;!?.]|$)/g, function(wm, lead, txt, trail) {
        return parseInside(txt, lead + '<strong><em>', '</em></strong>' + trail);
      });
      text = text.trim().replace(/(^| )\*{2}(\S[\s\S]*?)\*{2}([ ,;!?.]|$)/g, function(wm, lead, txt, trail) {
        return parseInside(txt, lead + '<strong>', '</strong>' + trail);
      });
      text = text.trim().replace(/(^| )\*(\S[\s\S]*?)\*([ ,;!?.]|$)/g, function(wm, lead, txt, trail) {
        return parseInside(txt, lead + '<em>', '</em>' + trail);
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
          if (isParagraphed) {
            item = showdown.subParser('paragraphs')(item, options, globals);
          } else {
            item = showdown.subParser('spanGamut')(item, options, globals);
          }
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
    function styleStartNumber(list, listType) {
      if (listType === 'ol') {
        var res = list.match(/^ *(\d+)\./);
        if (res && res[1] !== '1') {
          return ' start="' + res[1] + '"';
        }
      }
      return '';
    }
    function parseConsecutiveLists(list, listType, trimTrailing) {
      var olRgx = (options.disableForced4SpacesIndentedSublists) ? /^ ?\d+\.[ \t]/gm : /^ {0,3}\d+\.[ \t]/gm,
          ulRgx = (options.disableForced4SpacesIndentedSublists) ? /^ ?[*+-][ \t]/gm : /^ {0,3}[*+-][ \t]/gm,
          counterRxg = (listType === 'ul') ? olRgx : ulRgx,
          result = '';
      if (list.search(counterRxg) !== -1) {
        (function parseCL(txt) {
          var pos = txt.search(counterRxg),
              style = styleStartNumber(list, listType);
          if (pos !== -1) {
            result += '\n<' + listType + style + '>\n' + processListItems(txt.slice(0, pos), !!trimTrailing) + '</' + listType + '>\n';
            listType = (listType === 'ul') ? 'ol' : 'ul';
            counterRxg = (listType === 'ul') ? olRgx : ulRgx;
            parseCL(txt.slice(pos));
          } else {
            result += '\n<' + listType + style + '>\n' + processListItems(txt, !!trimTrailing) + '</' + listType + '>\n';
          }
        })(list);
      } else {
        var style = styleStartNumber(list, listType);
        result = '\n<' + listType + style + '>\n' + processListItems(list, !!trimTrailing) + '</' + listType + '>\n';
      }
      return result;
    }
    text = globals.converter._dispatch('lists.before', text, options, globals);
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
    text = showdown.subParser('simplifiedAutoLinks')(text, options, globals);
    text = showdown.subParser('emoji')(text, options, globals);
    text = showdown.subParser('underline')(text, options, globals);
    text = showdown.subParser('italicsAndBold')(text, options, globals);
    text = showdown.subParser('strikethrough')(text, options, globals);
    text = showdown.subParser('ellipsis')(text, options, globals);
    text = showdown.subParser('hashHTMLSpans')(text, options, globals);
    text = showdown.subParser('encodeAmpsAndAngles')(text, options, globals);
    if (options.simpleLineBreaks) {
      if (!/\n\n¨K/.test(text)) {
        text = text.replace(/\n+/g, '<br />\n');
      }
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
    var regex = /^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm,
        base64Regex = /^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n\n|(?=¨0)|(?=\n\[))/gm;
    text += '¨0';
    var replaceFunc = function(wholeMatch, linkId, url, width, height, blankLines, title) {
      linkId = linkId.toLowerCase();
      if (url.match(/^data:.+?\/.+?;base64,/)) {
        globals.gUrls[linkId] = url.replace(/\s/g, '');
      } else {
        globals.gUrls[linkId] = showdown.subParser('encodeAmpsAndAngles')(url, options, globals);
      }
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
    };
    text = text.replace(base64Regex, replaceFunc);
    text = text.replace(regex, replaceFunc);
    text = text.replace(/¨0/, '');
    return text;
  });
  showdown.subParser('tables', function(text, options, globals) {
    'use strict';
    if (!options.tables) {
      return text;
    }
    var tableRgx = /^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|<ol|<ul|¨0)/gm,
        singeColTblRgx = /^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|<ol|<ul|¨0)/gm;
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
      if (options.tablesHeaderId || options.tableHeaderId) {
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
    function parseTable(rawTable) {
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
    }
    function hackFixTableFollowedByList(rawTable) {
      var lastChars = rawTable.slice(-3);
      if (lastChars === '<ol' || lastChars === '<ul') {
        rawTable = rawTable.slice(0, -3) + '\n\n' + rawTable.slice(-3);
      }
      return rawTable;
    }
    text = globals.converter._dispatch('tables.before', text, options, globals);
    text = text.replace(/\\(\|)/g, showdown.helper.escapeCharactersCallback);
    text = text.replace(tableRgx, hackFixTableFollowedByList);
    text = text.replace(singeColTblRgx, hackFixTableFollowedByList);
    text = text.replace(tableRgx, parseTable);
    text = text.replace(singeColTblRgx, parseTable);
    text = globals.converter._dispatch('tables.after', text, options, globals);
    return text;
  });
  showdown.subParser('underline', function(text, options, globals) {
    'use strict';
    if (!options.underline) {
      return text;
    }
    text = globals.converter._dispatch('underline.before', text, options, globals);
    if (options.literalMidWordUnderscores) {
      text = text.replace(/\b_?__(\S[\s\S]*)___?\b/g, function(wm, txt) {
        return '<u>' + txt + '</u>';
      });
    } else {
      text = text.replace(/_?__(\S[\s\S]*?)___?/g, function(wm, m) {
        return (/\S$/.test(m)) ? '<u>' + m + '</u>' : wm;
      });
    }
    text = text.replace(/(_)/g, showdown.helper.escapeCharactersCallback);
    text = globals.converter._dispatch('underline.after', text, options, globals);
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
  if (typeof define === 'function' && define.amd) {
    define("github:showdownjs/showdown@1.8.1/dist/showdown.js", [], function() {
      'use strict';
      return showdown;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = showdown;
  } else {
    root.showdown = showdown;
  }
}).call(this);

})();
(function() {
var define = System.amdDefine;
define("github:showdownjs/showdown@1.8.1.js", ["github:showdownjs/showdown@1.8.1/dist/showdown.js"], function(main) {
  return main;
});

})();
System.registerDynamic("src-showdown/app/tests.js", ["github:showdownjs/showdown@1.8.1.js"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    var showdown = $__require("github:showdownjs/showdown@1.8.1.js");
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