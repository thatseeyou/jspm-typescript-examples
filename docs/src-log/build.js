"bundle";
(function() {
var define = System.amdDefine;
(function() {
  var exportedLog,
      ffSupport,
      formats,
      getOrderedMatches,
      hasMatches,
      isFF,
      isIE,
      isOpera,
      isSafari,
      log,
      makeArray,
      operaSupport,
      safariSupport,
      stringToArgs,
      _log;
  if (!(window.console && window.console.log)) {
    return;
  }
  log = function() {
    var args;
    args = [];
    makeArray(arguments).forEach(function(arg) {
      if (typeof arg === 'string') {
        return args = args.concat(stringToArgs(arg));
      } else {
        return args.push(arg);
      }
    });
    return _log.apply(window, args);
  };
  _log = function() {
    return Function.prototype.apply.call(console.log, console, makeArray(arguments));
  };
  makeArray = function(arrayLikeThing) {
    return Array.prototype.slice.call(arrayLikeThing);
  };
  formats = [{
    regex: /\*([^\*]+)\*/,
    replacer: function(m, p1) {
      return "%c" + p1 + "%c";
    },
    styles: function() {
      return ['font-style: italic', ''];
    }
  }, {
    regex: /\_([^\_]+)\_/,
    replacer: function(m, p1) {
      return "%c" + p1 + "%c";
    },
    styles: function() {
      return ['font-weight: bold', ''];
    }
  }, {
    regex: /\`([^\`]+)\`/,
    replacer: function(m, p1) {
      return "%c" + p1 + "%c";
    },
    styles: function() {
      return ['background: rgb(255, 255, 219); padding: 1px 5px; border: 1px solid rgba(0, 0, 0, 0.1)', ''];
    }
  }, {
    regex: /\[c\=(?:\"|\')?((?:(?!(?:\"|\')\]).)*)(?:\"|\')?\]((?:(?!\[c\]).)*)\[c\]/,
    replacer: function(m, p1, p2) {
      return "%c" + p2 + "%c";
    },
    styles: function(match) {
      return [match[1], ''];
    }
  }];
  hasMatches = function(str) {
    var _hasMatches;
    _hasMatches = false;
    formats.forEach(function(format) {
      if (format.regex.test(str)) {
        return _hasMatches = true;
      }
    });
    return _hasMatches;
  };
  getOrderedMatches = function(str) {
    var matches;
    matches = [];
    formats.forEach(function(format) {
      var match;
      match = str.match(format.regex);
      if (match) {
        return matches.push({
          format: format,
          match: match
        });
      }
    });
    return matches.sort(function(a, b) {
      return a.match.index - b.match.index;
    });
  };
  stringToArgs = function(str) {
    var firstMatch,
        matches,
        styles;
    styles = [];
    while (hasMatches(str)) {
      matches = getOrderedMatches(str);
      firstMatch = matches[0];
      str = str.replace(firstMatch.format.regex, firstMatch.format.replacer);
      styles = styles.concat(firstMatch.format.styles(firstMatch.match));
    }
    return [str].concat(styles);
  };
  isSafari = function() {
    return /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
  };
  isOpera = function() {
    return /OPR/.test(navigator.userAgent) && /Opera/.test(navigator.vendor);
  };
  isFF = function() {
    return /Firefox/.test(navigator.userAgent);
  };
  isIE = function() {
    return /MSIE/.test(navigator.userAgent);
  };
  safariSupport = function() {
    var m;
    m = navigator.userAgent.match(/AppleWebKit\/(\d+)\.(\d+)(\.|\+|\s)/);
    if (!m) {
      return false;
    }
    return 537.38 <= parseInt(m[1], 10) + (parseInt(m[2], 10) / 100);
  };
  operaSupport = function() {
    var m;
    m = navigator.userAgent.match(/OPR\/(\d+)\./);
    if (!m) {
      return false;
    }
    return 15 <= parseInt(m[1], 10);
  };
  ffSupport = function() {
    return window.console.firebug || window.console.exception;
  };
  if (isIE() || (isFF() && !ffSupport()) || (isOpera() && !operaSupport()) || (isSafari() && !safariSupport())) {
    exportedLog = _log;
  } else {
    exportedLog = log;
  }
  exportedLog.l = _log;
  if (typeof define === 'function' && define.amd) {
    define("github:adamschwartz/log@0.3.0/log.js", [], function() {
      return exportedLog;
    });
  } else if (typeof exports !== 'undefined') {
    module.exports = exportedLog;
  } else {
    window.log = exportedLog;
  }
}).call(this);

})();
(function() {
var define = System.amdDefine;
define("github:adamschwartz/log@0.3.0.js", ["github:adamschwartz/log@0.3.0/log.js"], function(main) {
  return main;
});

})();
System.registerDynamic("src-log/app/main.js", ["github:adamschwartz/log@0.3.0.js"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    var log = $__require("github:adamschwartz/log@0.3.0.js");
    // excerpt from https://github.com/adamschwartz/log/blob/master/test.html
    log('[c="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; color: #fff; font-size: 20px; padding: 15px 20px; background: #444; border-radius: 4px; line-height: 100px; text-shadow: 0 1px #000"]Log Test Suite[c]');
    var codeStyle = 'background: rgb(255, 255, 219); padding: 1px 5px; border: 1px solid rgba(0, 0, 0, 0.1)';
    var bold = 'font-weight: bold';
    var italic = 'font-style: italic';
    var testHeaderStyle = 'font-weight: bold; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 13px; color: #444; padding: 8px 0; line-height: 40px';
    var testNumber = 1;
    var testHeader = function () {
        log.l('%cTest ' + testNumber++, testHeaderStyle);
    };
    testHeader();
    log('Expected:');
    log('%citalic%c and %cbold%c', italic, '', bold, '');
    log('Result:');
    log('*italic* and _bold_');
    testHeader();
    log.l('Expected:');
    log.l('%citalic%c and %cbold%c', italic, '', bold, '');
    log.l('Result:');
    log('*italic* and _bold_');
    testHeader();
    log.l('Expected:');
    log.l('%cbold (with parentheses)%c', bold, '');
    log.l('Result:');
    log('_bold (with parentheses)_');
    testHeader();
    log.l('Expected:');
    log.l('%citalic (with parentheses)%c', italic, '');
    log.l('Result:');
    log('*italic (with parentheses)*');
    testHeader();
    log.l('Expected:');
    log.l('%citalic%c and %cbold%c. %cthis is italic%c and %cthis is bold%c.', italic, '', bold, '', italic, '', bold, '');
    log.l('Result:');
    log('*italic* and _bold_. *this is italic* and _this is bold_.');
    testHeader();
    log.l('Expected:');
    log.l('this is bold link: %chttp://google.com%c', bold, '');
    log.l('Result:');
    log('this is bold link: _http://google.com_');
    testHeader();
    log.l('Expected:');
    log.l('%ca == b', codeStyle);
    log.l('Result:');
    log('`a == b`');
    testHeader();
    log.l('Expected:');
    log.l('%ca == (b + c)', codeStyle);
    log.l('Result:');
    log('`a == (b + c)`');
    testHeader();
    log.l('Expected:');
    log.l('%cred', 'color: red');
    log.l('Result:');
    log("[c=\"color:red\"]red[c]");
    testHeader();
    log.l('Expected:');
    log.l('%cred %cand %c[blue]', 'color: red', '', 'color: blue');
    log.l('Result:');
    log("[c=\"color:red\"]red[c] and [c=\'color:blue\'][blue][c]");
});
//# sourceMappingURL=build.js.map