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
System.registerDynamic("src-reactive-calculator/css/calculator.css!github:systemjs/plugin-css@0.1.36.js", [], false, function ($__require, $__exports, $__module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal($__module.id, null, null);

  (function ($__global) {})(this);

  return _retrieveGlobal();
});
(function() {
var define = System.amdDefine;
;
(function(globalScope) {
  'use strict';
  var EXP_LIMIT = 9e15,
      MAX_DIGITS = 1e9,
      NUMERALS = '0123456789abcdef',
      LN10 = '2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058',
      PI = '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789',
      Decimal = {
        precision: 20,
        rounding: 4,
        modulo: 1,
        toExpNeg: -7,
        toExpPos: 21,
        minE: -EXP_LIMIT,
        maxE: EXP_LIMIT,
        crypto: false
      },
      inexact,
      noConflict,
      quadrant,
      external = true,
      decimalError = '[DecimalError] ',
      invalidArgument = decimalError + 'Invalid argument: ',
      precisionLimitExceeded = decimalError + 'Precision limit exceeded',
      cryptoUnavailable = decimalError + 'crypto unavailable',
      mathfloor = Math.floor,
      mathpow = Math.pow,
      isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,
      isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,
      isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,
      isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
      BASE = 1e7,
      LOG_BASE = 7,
      MAX_SAFE_INTEGER = 9007199254740991,
      LN10_PRECISION = LN10.length - 1,
      PI_PRECISION = PI.length - 1,
      P = {};
  P.absoluteValue = P.abs = function() {
    var x = new this.constructor(this);
    if (x.s < 0)
      x.s = 1;
    return finalise(x);
  };
  P.ceil = function() {
    return finalise(new this.constructor(this), this.e + 1, 2);
  };
  P.comparedTo = P.cmp = function(y) {
    var i,
        j,
        xdL,
        ydL,
        x = this,
        xd = x.d,
        yd = (y = new x.constructor(y)).d,
        xs = x.s,
        ys = y.s;
    if (!xd || !yd) {
      return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1;
    }
    if (!xd[0] || !yd[0])
      return xd[0] ? xs : yd[0] ? -ys : 0;
    if (xs !== ys)
      return xs;
    if (x.e !== y.e)
      return x.e > y.e ^ xs < 0 ? 1 : -1;
    xdL = xd.length;
    ydL = yd.length;
    for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
      if (xd[i] !== yd[i])
        return xd[i] > yd[i] ^ xs < 0 ? 1 : -1;
    }
    return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
  };
  P.cosine = P.cos = function() {
    var pr,
        rm,
        x = this,
        Ctor = x.constructor;
    if (!x.d)
      return new Ctor(NaN);
    if (!x.d[0])
      return new Ctor(1);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
    Ctor.rounding = 1;
    x = cosine(Ctor, toLessThanHalfPi(Ctor, x));
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return finalise(quadrant == 2 || quadrant == 3 ? x.neg() : x, pr, rm, true);
  };
  P.cubeRoot = P.cbrt = function() {
    var e,
        m,
        n,
        r,
        rep,
        s,
        sd,
        t,
        t3,
        t3plusx,
        x = this,
        Ctor = x.constructor;
    if (!x.isFinite() || x.isZero())
      return new Ctor(x);
    external = false;
    s = x.s * Math.pow(x.s * x, 1 / 3);
    if (!s || Math.abs(s) == 1 / 0) {
      n = digitsToString(x.d);
      e = x.e;
      if (s = (e - n.length + 1) % 3)
        n += (s == 1 || s == -2 ? '0' : '00');
      s = Math.pow(n, 1 / 3);
      e = mathfloor((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2));
      if (s == 1 / 0) {
        n = '5e' + e;
      } else {
        n = s.toExponential();
        n = n.slice(0, n.indexOf('e') + 1) + e;
      }
      r = new Ctor(n);
      r.s = x.s;
    } else {
      r = new Ctor(s.toString());
    }
    sd = (e = Ctor.precision) + 3;
    for (; ; ) {
      t = r;
      t3 = t.times(t).times(t);
      t3plusx = t3.plus(x);
      r = divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1);
      if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
        n = n.slice(sd - 3, sd + 1);
        if (n == '9999' || !rep && n == '4999') {
          if (!rep) {
            finalise(t, e + 1, 0);
            if (t.times(t).times(t).eq(x)) {
              r = t;
              break;
            }
          }
          sd += 4;
          rep = 1;
        } else {
          if (!+n || !+n.slice(1) && n.charAt(0) == '5') {
            finalise(r, e + 1, 1);
            m = !r.times(r).times(r).eq(x);
          }
          break;
        }
      }
    }
    external = true;
    return finalise(r, e, Ctor.rounding, m);
  };
  P.decimalPlaces = P.dp = function() {
    var w,
        d = this.d,
        n = NaN;
    if (d) {
      w = d.length - 1;
      n = (w - mathfloor(this.e / LOG_BASE)) * LOG_BASE;
      w = d[w];
      if (w)
        for (; w % 10 == 0; w /= 10)
          n--;
      if (n < 0)
        n = 0;
    }
    return n;
  };
  P.dividedBy = P.div = function(y) {
    return divide(this, new this.constructor(y));
  };
  P.dividedToIntegerBy = P.divToInt = function(y) {
    var x = this,
        Ctor = x.constructor;
    return finalise(divide(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding);
  };
  P.equals = P.eq = function(y) {
    return this.cmp(y) === 0;
  };
  P.floor = function() {
    return finalise(new this.constructor(this), this.e + 1, 3);
  };
  P.greaterThan = P.gt = function(y) {
    return this.cmp(y) > 0;
  };
  P.greaterThanOrEqualTo = P.gte = function(y) {
    var k = this.cmp(y);
    return k == 1 || k === 0;
  };
  P.hyperbolicCosine = P.cosh = function() {
    var k,
        n,
        pr,
        rm,
        len,
        x = this,
        Ctor = x.constructor,
        one = new Ctor(1);
    if (!x.isFinite())
      return new Ctor(x.s ? 1 / 0 : NaN);
    if (x.isZero())
      return one;
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
    Ctor.rounding = 1;
    len = x.d.length;
    if (len < 32) {
      k = Math.ceil(len / 3);
      n = Math.pow(4, -k).toString();
    } else {
      k = 16;
      n = '2.3283064365386962890625e-10';
    }
    x = taylorSeries(Ctor, 1, x.times(n), new Ctor(1), true);
    var cosh2_x,
        i = k,
        d8 = new Ctor(8);
    for (; i--; ) {
      cosh2_x = x.times(x);
      x = one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
    }
    return finalise(x, Ctor.precision = pr, Ctor.rounding = rm, true);
  };
  P.hyperbolicSine = P.sinh = function() {
    var k,
        pr,
        rm,
        len,
        x = this,
        Ctor = x.constructor;
    if (!x.isFinite() || x.isZero())
      return new Ctor(x);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
    Ctor.rounding = 1;
    len = x.d.length;
    if (len < 3) {
      x = taylorSeries(Ctor, 2, x, x, true);
    } else {
      k = 1.4 * Math.sqrt(len);
      k = k > 16 ? 16 : k | 0;
      x = x.times(Math.pow(5, -k));
      x = taylorSeries(Ctor, 2, x, x, true);
      var sinh2_x,
          d5 = new Ctor(5),
          d16 = new Ctor(16),
          d20 = new Ctor(20);
      for (; k--; ) {
        sinh2_x = x.times(x);
        x = x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
      }
    }
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return finalise(x, pr, rm, true);
  };
  P.hyperbolicTangent = P.tanh = function() {
    var pr,
        rm,
        x = this,
        Ctor = x.constructor;
    if (!x.isFinite())
      return new Ctor(x.s);
    if (x.isZero())
      return new Ctor(x);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + 7;
    Ctor.rounding = 1;
    return divide(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm);
  };
  P.inverseCosine = P.acos = function() {
    var halfPi,
        x = this,
        Ctor = x.constructor,
        k = x.abs().cmp(1),
        pr = Ctor.precision,
        rm = Ctor.rounding;
    if (k !== -1) {
      return k === 0 ? x.isNeg() ? getPi(Ctor, pr, rm) : new Ctor(0) : new Ctor(NaN);
    }
    if (x.isZero())
      return getPi(Ctor, pr + 4, rm).times(0.5);
    Ctor.precision = pr + 6;
    Ctor.rounding = 1;
    x = x.asin();
    halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return halfPi.minus(x);
  };
  P.inverseHyperbolicCosine = P.acosh = function() {
    var pr,
        rm,
        x = this,
        Ctor = x.constructor;
    if (x.lte(1))
      return new Ctor(x.eq(1) ? 0 : NaN);
    if (!x.isFinite())
      return new Ctor(x);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(Math.abs(x.e), x.sd()) + 4;
    Ctor.rounding = 1;
    external = false;
    x = x.times(x).minus(1).sqrt().plus(x);
    external = true;
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return x.ln();
  };
  P.inverseHyperbolicSine = P.asinh = function() {
    var pr,
        rm,
        x = this,
        Ctor = x.constructor;
    if (!x.isFinite() || x.isZero())
      return new Ctor(x);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + 2 * Math.max(Math.abs(x.e), x.sd()) + 6;
    Ctor.rounding = 1;
    external = false;
    x = x.times(x).plus(1).sqrt().plus(x);
    external = true;
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return x.ln();
  };
  P.inverseHyperbolicTangent = P.atanh = function() {
    var pr,
        rm,
        wpr,
        xsd,
        x = this,
        Ctor = x.constructor;
    if (!x.isFinite())
      return new Ctor(NaN);
    if (x.e >= 0)
      return new Ctor(x.abs().eq(1) ? x.s / 0 : x.isZero() ? x : NaN);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    xsd = x.sd();
    if (Math.max(xsd, pr) < 2 * -x.e - 1)
      return finalise(new Ctor(x), pr, rm, true);
    Ctor.precision = wpr = xsd - x.e;
    x = divide(x.plus(1), new Ctor(1).minus(x), wpr + pr, 1);
    Ctor.precision = pr + 4;
    Ctor.rounding = 1;
    x = x.ln();
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return x.times(0.5);
  };
  P.inverseSine = P.asin = function() {
    var halfPi,
        k,
        pr,
        rm,
        x = this,
        Ctor = x.constructor;
    if (x.isZero())
      return new Ctor(x);
    k = x.abs().cmp(1);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    if (k !== -1) {
      if (k === 0) {
        halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
        halfPi.s = x.s;
        return halfPi;
      }
      return new Ctor(NaN);
    }
    Ctor.precision = pr + 6;
    Ctor.rounding = 1;
    x = x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return x.times(2);
  };
  P.inverseTangent = P.atan = function() {
    var i,
        j,
        k,
        n,
        px,
        t,
        r,
        wpr,
        x2,
        x = this,
        Ctor = x.constructor,
        pr = Ctor.precision,
        rm = Ctor.rounding;
    if (!x.isFinite()) {
      if (!x.s)
        return new Ctor(NaN);
      if (pr + 4 <= PI_PRECISION) {
        r = getPi(Ctor, pr + 4, rm).times(0.5);
        r.s = x.s;
        return r;
      }
    } else if (x.isZero()) {
      return new Ctor(x);
    } else if (x.abs().eq(1) && pr + 4 <= PI_PRECISION) {
      r = getPi(Ctor, pr + 4, rm).times(0.25);
      r.s = x.s;
      return r;
    }
    Ctor.precision = wpr = pr + 10;
    Ctor.rounding = 1;
    k = Math.min(28, wpr / LOG_BASE + 2 | 0);
    for (i = k; i; --i)
      x = x.div(x.times(x).plus(1).sqrt().plus(1));
    external = false;
    j = Math.ceil(wpr / LOG_BASE);
    n = 1;
    x2 = x.times(x);
    r = new Ctor(x);
    px = x;
    for (; i !== -1; ) {
      px = px.times(x2);
      t = r.minus(px.div(n += 2));
      px = px.times(x2);
      r = t.plus(px.div(n += 2));
      if (r.d[j] !== void 0)
        for (i = j; r.d[i] === t.d[i] && i--; )
          ;
    }
    if (k)
      r = r.times(2 << (k - 1));
    external = true;
    return finalise(r, Ctor.precision = pr, Ctor.rounding = rm, true);
  };
  P.isFinite = function() {
    return !!this.d;
  };
  P.isInteger = P.isInt = function() {
    return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
  };
  P.isNaN = function() {
    return !this.s;
  };
  P.isNegative = P.isNeg = function() {
    return this.s < 0;
  };
  P.isPositive = P.isPos = function() {
    return this.s > 0;
  };
  P.isZero = function() {
    return !!this.d && this.d[0] === 0;
  };
  P.lessThan = P.lt = function(y) {
    return this.cmp(y) < 0;
  };
  P.lessThanOrEqualTo = P.lte = function(y) {
    return this.cmp(y) < 1;
  };
  P.logarithm = P.log = function(base) {
    var isBase10,
        d,
        denominator,
        k,
        inf,
        num,
        sd,
        r,
        arg = this,
        Ctor = arg.constructor,
        pr = Ctor.precision,
        rm = Ctor.rounding,
        guard = 5;
    if (base == null) {
      base = new Ctor(10);
      isBase10 = true;
    } else {
      base = new Ctor(base);
      d = base.d;
      if (base.s < 0 || !d || !d[0] || base.eq(1))
        return new Ctor(NaN);
      isBase10 = base.eq(10);
    }
    d = arg.d;
    if (arg.s < 0 || !d || !d[0] || arg.eq(1)) {
      return new Ctor(d && !d[0] ? -1 / 0 : arg.s != 1 ? NaN : d ? 0 : 1 / 0);
    }
    if (isBase10) {
      if (d.length > 1) {
        inf = true;
      } else {
        for (k = d[0]; k % 10 === 0; )
          k /= 10;
        inf = k !== 1;
      }
    }
    external = false;
    sd = pr + guard;
    num = naturalLogarithm(arg, sd);
    denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
    r = divide(num, denominator, sd, 1);
    if (checkRoundingDigits(r.d, k = pr, rm)) {
      do {
        sd += 10;
        num = naturalLogarithm(arg, sd);
        denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
        r = divide(num, denominator, sd, 1);
        if (!inf) {
          if (+digitsToString(r.d).slice(k + 1, k + 15) + 1 == 1e14) {
            r = finalise(r, pr + 1, 0);
          }
          break;
        }
      } while (checkRoundingDigits(r.d, k += 10, rm));
    }
    external = true;
    return finalise(r, pr, rm);
  };
  P.minus = P.sub = function(y) {
    var d,
        e,
        i,
        j,
        k,
        len,
        pr,
        rm,
        xd,
        xe,
        xLTy,
        yd,
        x = this,
        Ctor = x.constructor;
    y = new Ctor(y);
    if (!x.d || !y.d) {
      if (!x.s || !y.s)
        y = new Ctor(NaN);
      else if (x.d)
        y.s = -y.s;
      else
        y = new Ctor(y.d || x.s !== y.s ? x : NaN);
      return y;
    }
    if (x.s != y.s) {
      y.s = -y.s;
      return x.plus(y);
    }
    xd = x.d;
    yd = y.d;
    pr = Ctor.precision;
    rm = Ctor.rounding;
    if (!xd[0] || !yd[0]) {
      if (yd[0])
        y.s = -y.s;
      else if (xd[0])
        y = new Ctor(x);
      else
        return new Ctor(rm === 3 ? -0 : 0);
      return external ? finalise(y, pr, rm) : y;
    }
    e = mathfloor(y.e / LOG_BASE);
    xe = mathfloor(x.e / LOG_BASE);
    xd = xd.slice();
    k = xe - e;
    if (k) {
      xLTy = k < 0;
      if (xLTy) {
        d = xd;
        k = -k;
        len = yd.length;
      } else {
        d = yd;
        e = xe;
        len = xd.length;
      }
      i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;
      if (k > i) {
        k = i;
        d.length = 1;
      }
      d.reverse();
      for (i = k; i--; )
        d.push(0);
      d.reverse();
    } else {
      i = xd.length;
      len = yd.length;
      xLTy = i < len;
      if (xLTy)
        len = i;
      for (i = 0; i < len; i++) {
        if (xd[i] != yd[i]) {
          xLTy = xd[i] < yd[i];
          break;
        }
      }
      k = 0;
    }
    if (xLTy) {
      d = xd;
      xd = yd;
      yd = d;
      y.s = -y.s;
    }
    len = xd.length;
    for (i = yd.length - len; i > 0; --i)
      xd[len++] = 0;
    for (i = yd.length; i > k; ) {
      if (xd[--i] < yd[i]) {
        for (j = i; j && xd[--j] === 0; )
          xd[j] = BASE - 1;
        --xd[j];
        xd[i] += BASE;
      }
      xd[i] -= yd[i];
    }
    for (; xd[--len] === 0; )
      xd.pop();
    for (; xd[0] === 0; xd.shift())
      --e;
    if (!xd[0])
      return new Ctor(rm === 3 ? -0 : 0);
    y.d = xd;
    y.e = getBase10Exponent(xd, e);
    return external ? finalise(y, pr, rm) : y;
  };
  P.modulo = P.mod = function(y) {
    var q,
        x = this,
        Ctor = x.constructor;
    y = new Ctor(y);
    if (!x.d || !y.s || y.d && !y.d[0])
      return new Ctor(NaN);
    if (!y.d || x.d && !x.d[0]) {
      return finalise(new Ctor(x), Ctor.precision, Ctor.rounding);
    }
    external = false;
    if (Ctor.modulo == 9) {
      q = divide(x, y.abs(), 0, 3, 1);
      q.s *= y.s;
    } else {
      q = divide(x, y, 0, Ctor.modulo, 1);
    }
    q = q.times(y);
    external = true;
    return x.minus(q);
  };
  P.naturalExponential = P.exp = function() {
    return naturalExponential(this);
  };
  P.naturalLogarithm = P.ln = function() {
    return naturalLogarithm(this);
  };
  P.negated = P.neg = function() {
    var x = new this.constructor(this);
    x.s = -x.s;
    return finalise(x);
  };
  P.plus = P.add = function(y) {
    var carry,
        d,
        e,
        i,
        k,
        len,
        pr,
        rm,
        xd,
        yd,
        x = this,
        Ctor = x.constructor;
    y = new Ctor(y);
    if (!x.d || !y.d) {
      if (!x.s || !y.s)
        y = new Ctor(NaN);
      else if (!x.d)
        y = new Ctor(y.d || x.s === y.s ? x : NaN);
      return y;
    }
    if (x.s != y.s) {
      y.s = -y.s;
      return x.minus(y);
    }
    xd = x.d;
    yd = y.d;
    pr = Ctor.precision;
    rm = Ctor.rounding;
    if (!xd[0] || !yd[0]) {
      if (!yd[0])
        y = new Ctor(x);
      return external ? finalise(y, pr, rm) : y;
    }
    k = mathfloor(x.e / LOG_BASE);
    e = mathfloor(y.e / LOG_BASE);
    xd = xd.slice();
    i = k - e;
    if (i) {
      if (i < 0) {
        d = xd;
        i = -i;
        len = yd.length;
      } else {
        d = yd;
        e = k;
        len = xd.length;
      }
      k = Math.ceil(pr / LOG_BASE);
      len = k > len ? k + 1 : len + 1;
      if (i > len) {
        i = len;
        d.length = 1;
      }
      d.reverse();
      for (; i--; )
        d.push(0);
      d.reverse();
    }
    len = xd.length;
    i = yd.length;
    if (len - i < 0) {
      i = len;
      d = yd;
      yd = xd;
      xd = d;
    }
    for (carry = 0; i; ) {
      carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
      xd[i] %= BASE;
    }
    if (carry) {
      xd.unshift(carry);
      ++e;
    }
    for (len = xd.length; xd[--len] == 0; )
      xd.pop();
    y.d = xd;
    y.e = getBase10Exponent(xd, e);
    return external ? finalise(y, pr, rm) : y;
  };
  P.precision = P.sd = function(z) {
    var k,
        x = this;
    if (z !== void 0 && z !== !!z && z !== 1 && z !== 0)
      throw Error(invalidArgument + z);
    if (x.d) {
      k = getPrecision(x.d);
      if (z && x.e + 1 > k)
        k = x.e + 1;
    } else {
      k = NaN;
    }
    return k;
  };
  P.round = function() {
    var x = this,
        Ctor = x.constructor;
    return finalise(new Ctor(x), x.e + 1, Ctor.rounding);
  };
  P.sine = P.sin = function() {
    var pr,
        rm,
        x = this,
        Ctor = x.constructor;
    if (!x.isFinite())
      return new Ctor(NaN);
    if (x.isZero())
      return new Ctor(x);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
    Ctor.rounding = 1;
    x = sine(Ctor, toLessThanHalfPi(Ctor, x));
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return finalise(quadrant > 2 ? x.neg() : x, pr, rm, true);
  };
  P.squareRoot = P.sqrt = function() {
    var m,
        n,
        sd,
        r,
        rep,
        t,
        x = this,
        d = x.d,
        e = x.e,
        s = x.s,
        Ctor = x.constructor;
    if (s !== 1 || !d || !d[0]) {
      return new Ctor(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
    }
    external = false;
    s = Math.sqrt(+x);
    if (s == 0 || s == 1 / 0) {
      n = digitsToString(d);
      if ((n.length + e) % 2 == 0)
        n += '0';
      s = Math.sqrt(n);
      e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);
      if (s == 1 / 0) {
        n = '1e' + e;
      } else {
        n = s.toExponential();
        n = n.slice(0, n.indexOf('e') + 1) + e;
      }
      r = new Ctor(n);
    } else {
      r = new Ctor(s.toString());
    }
    sd = (e = Ctor.precision) + 3;
    for (; ; ) {
      t = r;
      r = t.plus(divide(x, t, sd + 2, 1)).times(0.5);
      if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
        n = n.slice(sd - 3, sd + 1);
        if (n == '9999' || !rep && n == '4999') {
          if (!rep) {
            finalise(t, e + 1, 0);
            if (t.times(t).eq(x)) {
              r = t;
              break;
            }
          }
          sd += 4;
          rep = 1;
        } else {
          if (!+n || !+n.slice(1) && n.charAt(0) == '5') {
            finalise(r, e + 1, 1);
            m = !r.times(r).eq(x);
          }
          break;
        }
      }
    }
    external = true;
    return finalise(r, e, Ctor.rounding, m);
  };
  P.tangent = P.tan = function() {
    var pr,
        rm,
        x = this,
        Ctor = x.constructor;
    if (!x.isFinite())
      return new Ctor(NaN);
    if (x.isZero())
      return new Ctor(x);
    pr = Ctor.precision;
    rm = Ctor.rounding;
    Ctor.precision = pr + 10;
    Ctor.rounding = 1;
    x = x.sin();
    x.s = 1;
    x = divide(x, new Ctor(1).minus(x.times(x)).sqrt(), pr + 10, 0);
    Ctor.precision = pr;
    Ctor.rounding = rm;
    return finalise(quadrant == 2 || quadrant == 4 ? x.neg() : x, pr, rm, true);
  };
  P.times = P.mul = function(y) {
    var carry,
        e,
        i,
        k,
        r,
        rL,
        t,
        xdL,
        ydL,
        x = this,
        Ctor = x.constructor,
        xd = x.d,
        yd = (y = new Ctor(y)).d;
    y.s *= x.s;
    if (!xd || !xd[0] || !yd || !yd[0]) {
      return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd ? NaN : !xd || !yd ? y.s / 0 : y.s * 0);
    }
    e = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
    xdL = xd.length;
    ydL = yd.length;
    if (xdL < ydL) {
      r = xd;
      xd = yd;
      yd = r;
      rL = xdL;
      xdL = ydL;
      ydL = rL;
    }
    r = [];
    rL = xdL + ydL;
    for (i = rL; i--; )
      r.push(0);
    for (i = ydL; --i >= 0; ) {
      carry = 0;
      for (k = xdL + i; k > i; ) {
        t = r[k] + yd[i] * xd[k - i - 1] + carry;
        r[k--] = t % BASE | 0;
        carry = t / BASE | 0;
      }
      r[k] = (r[k] + carry) % BASE | 0;
    }
    for (; !r[--rL]; )
      r.pop();
    if (carry)
      ++e;
    else
      r.shift();
    y.d = r;
    y.e = getBase10Exponent(r, e);
    return external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
  };
  P.toBinary = function(sd, rm) {
    return toStringBinary(this, 2, sd, rm);
  };
  P.toDecimalPlaces = P.toDP = function(dp, rm) {
    var x = this,
        Ctor = x.constructor;
    x = new Ctor(x);
    if (dp === void 0)
      return x;
    checkInt32(dp, 0, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
    return finalise(x, dp + x.e + 1, rm);
  };
  P.toExponential = function(dp, rm) {
    var str,
        x = this,
        Ctor = x.constructor;
    if (dp === void 0) {
      str = finiteToString(x, true);
    } else {
      checkInt32(dp, 0, MAX_DIGITS);
      if (rm === void 0)
        rm = Ctor.rounding;
      else
        checkInt32(rm, 0, 8);
      x = finalise(new Ctor(x), dp + 1, rm);
      str = finiteToString(x, true, dp + 1);
    }
    return x.isNeg() && !x.isZero() ? '-' + str : str;
  };
  P.toFixed = function(dp, rm) {
    var str,
        y,
        x = this,
        Ctor = x.constructor;
    if (dp === void 0) {
      str = finiteToString(x);
    } else {
      checkInt32(dp, 0, MAX_DIGITS);
      if (rm === void 0)
        rm = Ctor.rounding;
      else
        checkInt32(rm, 0, 8);
      y = finalise(new Ctor(x), dp + x.e + 1, rm);
      str = finiteToString(y, false, dp + y.e + 1);
    }
    return x.isNeg() && !x.isZero() ? '-' + str : str;
  };
  P.toFraction = function(maxD) {
    var d,
        d0,
        d1,
        d2,
        e,
        k,
        n,
        n0,
        n1,
        pr,
        q,
        r,
        x = this,
        xd = x.d,
        Ctor = x.constructor;
    if (!xd)
      return new Ctor(x);
    n1 = d0 = new Ctor(1);
    d1 = n0 = new Ctor(0);
    d = new Ctor(d1);
    e = d.e = getPrecision(xd) - x.e - 1;
    k = e % LOG_BASE;
    d.d[0] = mathpow(10, k < 0 ? LOG_BASE + k : k);
    if (maxD == null) {
      maxD = e > 0 ? d : n1;
    } else {
      n = new Ctor(maxD);
      if (!n.isInt() || n.lt(n1))
        throw Error(invalidArgument + n);
      maxD = n.gt(d) ? (e > 0 ? d : n1) : n;
    }
    external = false;
    n = new Ctor(digitsToString(xd));
    pr = Ctor.precision;
    Ctor.precision = e = xd.length * LOG_BASE * 2;
    for (; ; ) {
      q = divide(n, d, 0, 1, 1);
      d2 = d0.plus(q.times(d1));
      if (d2.cmp(maxD) == 1)
        break;
      d0 = d1;
      d1 = d2;
      d2 = n1;
      n1 = n0.plus(q.times(d2));
      n0 = d2;
      d2 = d;
      d = n.minus(q.times(d2));
      n = d2;
    }
    d2 = divide(maxD.minus(d0), d1, 0, 1, 1);
    n0 = n0.plus(d2.times(n1));
    d0 = d0.plus(d2.times(d1));
    n0.s = n1.s = x.s;
    r = divide(n1, d1, e, 1).minus(x).abs().cmp(divide(n0, d0, e, 1).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];
    Ctor.precision = pr;
    external = true;
    return r;
  };
  P.toHexadecimal = P.toHex = function(sd, rm) {
    return toStringBinary(this, 16, sd, rm);
  };
  P.toNearest = function(y, rm) {
    var x = this,
        Ctor = x.constructor;
    x = new Ctor(x);
    if (y == null) {
      if (!x.d)
        return x;
      y = new Ctor(1);
      rm = Ctor.rounding;
    } else {
      y = new Ctor(y);
      if (rm !== void 0)
        checkInt32(rm, 0, 8);
      if (!x.d)
        return y.s ? x : y;
      if (!y.d) {
        if (y.s)
          y.s = x.s;
        return y;
      }
    }
    if (y.d[0]) {
      external = false;
      if (rm < 4)
        rm = [4, 5, 7, 8][rm];
      x = divide(x, y, 0, rm, 1).times(y);
      external = true;
      finalise(x);
    } else {
      y.s = x.s;
      x = y;
    }
    return x;
  };
  P.toNumber = function() {
    return +this;
  };
  P.toOctal = function(sd, rm) {
    return toStringBinary(this, 8, sd, rm);
  };
  P.toPower = P.pow = function(y) {
    var e,
        k,
        pr,
        r,
        rm,
        s,
        x = this,
        Ctor = x.constructor,
        yn = +(y = new Ctor(y));
    if (!x.d || !y.d || !x.d[0] || !y.d[0])
      return new Ctor(mathpow(+x, yn));
    x = new Ctor(x);
    if (x.eq(1))
      return x;
    pr = Ctor.precision;
    rm = Ctor.rounding;
    if (y.eq(1))
      return finalise(x, pr, rm);
    e = mathfloor(y.e / LOG_BASE);
    if (e >= y.d.length - 1 && (k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
      r = intPow(Ctor, x, k, pr);
      return y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
    }
    s = x.s;
    if (s < 0) {
      if (e < y.d.length - 1)
        return new Ctor(NaN);
      if ((y.d[e] & 1) == 0)
        s = 1;
      if (x.e == 0 && x.d[0] == 1 && x.d.length == 1) {
        x.s = s;
        return x;
      }
    }
    k = mathpow(+x, yn);
    e = k == 0 || !isFinite(k) ? mathfloor(yn * (Math.log('0.' + digitsToString(x.d)) / Math.LN10 + x.e + 1)) : new Ctor(k + '').e;
    if (e > Ctor.maxE + 1 || e < Ctor.minE - 1)
      return new Ctor(e > 0 ? s / 0 : 0);
    external = false;
    Ctor.rounding = x.s = 1;
    k = Math.min(12, (e + '').length);
    r = naturalExponential(y.times(naturalLogarithm(x, pr + k)), pr);
    if (r.d) {
      r = finalise(r, pr + 5, 1);
      if (checkRoundingDigits(r.d, pr, rm)) {
        e = pr + 10;
        r = finalise(naturalExponential(y.times(naturalLogarithm(x, e + k)), e), e + 5, 1);
        if (+digitsToString(r.d).slice(pr + 1, pr + 15) + 1 == 1e14) {
          r = finalise(r, pr + 1, 0);
        }
      }
    }
    r.s = s;
    external = true;
    Ctor.rounding = rm;
    return finalise(r, pr, rm);
  };
  P.toPrecision = function(sd, rm) {
    var str,
        x = this,
        Ctor = x.constructor;
    if (sd === void 0) {
      str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
    } else {
      checkInt32(sd, 1, MAX_DIGITS);
      if (rm === void 0)
        rm = Ctor.rounding;
      else
        checkInt32(rm, 0, 8);
      x = finalise(new Ctor(x), sd, rm);
      str = finiteToString(x, sd <= x.e || x.e <= Ctor.toExpNeg, sd);
    }
    return x.isNeg() && !x.isZero() ? '-' + str : str;
  };
  P.toSignificantDigits = P.toSD = function(sd, rm) {
    var x = this,
        Ctor = x.constructor;
    if (sd === void 0) {
      sd = Ctor.precision;
      rm = Ctor.rounding;
    } else {
      checkInt32(sd, 1, MAX_DIGITS);
      if (rm === void 0)
        rm = Ctor.rounding;
      else
        checkInt32(rm, 0, 8);
    }
    return finalise(new Ctor(x), sd, rm);
  };
  P.toString = function() {
    var x = this,
        Ctor = x.constructor,
        str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
    return x.isNeg() && !x.isZero() ? '-' + str : str;
  };
  P.truncated = P.trunc = function() {
    return finalise(new this.constructor(this), this.e + 1, 1);
  };
  P.valueOf = P.toJSON = function() {
    var x = this,
        Ctor = x.constructor,
        str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
    return x.isNeg() ? '-' + str : str;
  };
  function digitsToString(d) {
    var i,
        k,
        ws,
        indexOfLastWord = d.length - 1,
        str = '',
        w = d[0];
    if (indexOfLastWord > 0) {
      str += w;
      for (i = 1; i < indexOfLastWord; i++) {
        ws = d[i] + '';
        k = LOG_BASE - ws.length;
        if (k)
          str += getZeroString(k);
        str += ws;
      }
      w = d[i];
      ws = w + '';
      k = LOG_BASE - ws.length;
      if (k)
        str += getZeroString(k);
    } else if (w === 0) {
      return '0';
    }
    for (; w % 10 === 0; )
      w /= 10;
    return str + w;
  }
  function checkInt32(i, min, max) {
    if (i !== ~~i || i < min || i > max) {
      throw Error(invalidArgument + i);
    }
  }
  function checkRoundingDigits(d, i, rm, repeating) {
    var di,
        k,
        r,
        rd;
    for (k = d[0]; k >= 10; k /= 10)
      --i;
    if (--i < 0) {
      i += LOG_BASE;
      di = 0;
    } else {
      di = Math.ceil((i + 1) / LOG_BASE);
      i %= LOG_BASE;
    }
    k = mathpow(10, LOG_BASE - i);
    rd = d[di] % k | 0;
    if (repeating == null) {
      if (i < 3) {
        if (i == 0)
          rd = rd / 100 | 0;
        else if (i == 1)
          rd = rd / 10 | 0;
        r = rm < 4 && rd == 99999 || rm > 3 && rd == 49999 || rd == 50000 || rd == 0;
      } else {
        r = (rm < 4 && rd + 1 == k || rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 100 | 0) == mathpow(10, i - 2) - 1 || (rd == k / 2 || rd == 0) && (d[di + 1] / k / 100 | 0) == 0;
      }
    } else {
      if (i < 4) {
        if (i == 0)
          rd = rd / 1000 | 0;
        else if (i == 1)
          rd = rd / 100 | 0;
        else if (i == 2)
          rd = rd / 10 | 0;
        r = (repeating || rm < 4) && rd == 9999 || !repeating && rm > 3 && rd == 4999;
      } else {
        r = ((repeating || rm < 4) && rd + 1 == k || (!repeating && rm > 3) && rd + 1 == k / 2) && (d[di + 1] / k / 1000 | 0) == mathpow(10, i - 3) - 1;
      }
    }
    return r;
  }
  function convertBase(str, baseIn, baseOut) {
    var j,
        arr = [0],
        arrL,
        i = 0,
        strL = str.length;
    for (; i < strL; ) {
      for (arrL = arr.length; arrL--; )
        arr[arrL] *= baseIn;
      arr[0] += NUMERALS.indexOf(str.charAt(i++));
      for (j = 0; j < arr.length; j++) {
        if (arr[j] > baseOut - 1) {
          if (arr[j + 1] === void 0)
            arr[j + 1] = 0;
          arr[j + 1] += arr[j] / baseOut | 0;
          arr[j] %= baseOut;
        }
      }
    }
    return arr.reverse();
  }
  function cosine(Ctor, x) {
    var k,
        y,
        len = x.d.length;
    if (len < 32) {
      k = Math.ceil(len / 3);
      y = Math.pow(4, -k).toString();
    } else {
      k = 16;
      y = '2.3283064365386962890625e-10';
    }
    Ctor.precision += k;
    x = taylorSeries(Ctor, 1, x.times(y), new Ctor(1));
    for (var i = k; i--; ) {
      var cos2x = x.times(x);
      x = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
    }
    Ctor.precision -= k;
    return x;
  }
  var divide = (function() {
    function multiplyInteger(x, k, base) {
      var temp,
          carry = 0,
          i = x.length;
      for (x = x.slice(); i--; ) {
        temp = x[i] * k + carry;
        x[i] = temp % base | 0;
        carry = temp / base | 0;
      }
      if (carry)
        x.unshift(carry);
      return x;
    }
    function compare(a, b, aL, bL) {
      var i,
          r;
      if (aL != bL) {
        r = aL > bL ? 1 : -1;
      } else {
        for (i = r = 0; i < aL; i++) {
          if (a[i] != b[i]) {
            r = a[i] > b[i] ? 1 : -1;
            break;
          }
        }
      }
      return r;
    }
    function subtract(a, b, aL, base) {
      var i = 0;
      for (; aL--; ) {
        a[aL] -= i;
        i = a[aL] < b[aL] ? 1 : 0;
        a[aL] = i * base + a[aL] - b[aL];
      }
      for (; !a[0] && a.length > 1; )
        a.shift();
    }
    return function(x, y, pr, rm, dp, base) {
      var cmp,
          e,
          i,
          k,
          logBase,
          more,
          prod,
          prodL,
          q,
          qd,
          rem,
          remL,
          rem0,
          sd,
          t,
          xi,
          xL,
          yd0,
          yL,
          yz,
          Ctor = x.constructor,
          sign = x.s == y.s ? 1 : -1,
          xd = x.d,
          yd = y.d;
      if (!xd || !xd[0] || !yd || !yd[0]) {
        return new Ctor(!x.s || !y.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN : xd && xd[0] == 0 || !yd ? sign * 0 : sign / 0);
      }
      if (base) {
        logBase = 1;
        e = x.e - y.e;
      } else {
        base = BASE;
        logBase = LOG_BASE;
        e = mathfloor(x.e / logBase) - mathfloor(y.e / logBase);
      }
      yL = yd.length;
      xL = xd.length;
      q = new Ctor(sign);
      qd = q.d = [];
      for (i = 0; yd[i] == (xd[i] || 0); i++)
        ;
      if (yd[i] > (xd[i] || 0))
        e--;
      if (pr == null) {
        sd = pr = Ctor.precision;
        rm = Ctor.rounding;
      } else if (dp) {
        sd = pr + (x.e - y.e) + 1;
      } else {
        sd = pr;
      }
      if (sd < 0) {
        qd.push(1);
        more = true;
      } else {
        sd = sd / logBase + 2 | 0;
        i = 0;
        if (yL == 1) {
          k = 0;
          yd = yd[0];
          sd++;
          for (; (i < xL || k) && sd--; i++) {
            t = k * base + (xd[i] || 0);
            qd[i] = t / yd | 0;
            k = t % yd | 0;
          }
          more = k || i < xL;
        } else {
          k = base / (yd[0] + 1) | 0;
          if (k > 1) {
            yd = multiplyInteger(yd, k, base);
            xd = multiplyInteger(xd, k, base);
            yL = yd.length;
            xL = xd.length;
          }
          xi = yL;
          rem = xd.slice(0, yL);
          remL = rem.length;
          for (; remL < yL; )
            rem[remL++] = 0;
          yz = yd.slice();
          yz.unshift(0);
          yd0 = yd[0];
          if (yd[1] >= base / 2)
            ++yd0;
          do {
            k = 0;
            cmp = compare(yd, rem, yL, remL);
            if (cmp < 0) {
              rem0 = rem[0];
              if (yL != remL)
                rem0 = rem0 * base + (rem[1] || 0);
              k = rem0 / yd0 | 0;
              if (k > 1) {
                if (k >= base)
                  k = base - 1;
                prod = multiplyInteger(yd, k, base);
                prodL = prod.length;
                remL = rem.length;
                cmp = compare(prod, rem, prodL, remL);
                if (cmp == 1) {
                  k--;
                  subtract(prod, yL < prodL ? yz : yd, prodL, base);
                }
              } else {
                if (k == 0)
                  cmp = k = 1;
                prod = yd.slice();
              }
              prodL = prod.length;
              if (prodL < remL)
                prod.unshift(0);
              subtract(rem, prod, remL, base);
              if (cmp == -1) {
                remL = rem.length;
                cmp = compare(yd, rem, yL, remL);
                if (cmp < 1) {
                  k++;
                  subtract(rem, yL < remL ? yz : yd, remL, base);
                }
              }
              remL = rem.length;
            } else if (cmp === 0) {
              k++;
              rem = [0];
            }
            qd[i++] = k;
            if (cmp && rem[0]) {
              rem[remL++] = xd[xi] || 0;
            } else {
              rem = [xd[xi]];
              remL = 1;
            }
          } while ((xi++ < xL || rem[0] !== void 0) && sd--);
          more = rem[0] !== void 0;
        }
        if (!qd[0])
          qd.shift();
      }
      if (logBase == 1) {
        q.e = e;
        inexact = more;
      } else {
        for (i = 1, k = qd[0]; k >= 10; k /= 10)
          i++;
        q.e = i + e * logBase - 1;
        finalise(q, dp ? pr + q.e + 1 : pr, rm, more);
      }
      return q;
    };
  })();
  function finalise(x, sd, rm, isTruncated) {
    var digits,
        i,
        j,
        k,
        rd,
        roundUp,
        w,
        xd,
        xdi,
        Ctor = x.constructor;
    out: if (sd != null) {
      xd = x.d;
      if (!xd)
        return x;
      for (digits = 1, k = xd[0]; k >= 10; k /= 10)
        digits++;
      i = sd - digits;
      if (i < 0) {
        i += LOG_BASE;
        j = sd;
        w = xd[xdi = 0];
        rd = w / mathpow(10, digits - j - 1) % 10 | 0;
      } else {
        xdi = Math.ceil((i + 1) / LOG_BASE);
        k = xd.length;
        if (xdi >= k) {
          if (isTruncated) {
            for (; k++ <= xdi; )
              xd.push(0);
            w = rd = 0;
            digits = 1;
            i %= LOG_BASE;
            j = i - LOG_BASE + 1;
          } else {
            break out;
          }
        } else {
          w = k = xd[xdi];
          for (digits = 1; k >= 10; k /= 10)
            digits++;
          i %= LOG_BASE;
          j = i - LOG_BASE + digits;
          rd = j < 0 ? 0 : w / mathpow(10, digits - j - 1) % 10 | 0;
        }
      }
      isTruncated = isTruncated || sd < 0 || xd[xdi + 1] !== void 0 || (j < 0 ? w : w % mathpow(10, digits - j - 1));
      roundUp = rm < 4 ? (rd || isTruncated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || isTruncated || rm == 6 && ((i > 0 ? j > 0 ? w / mathpow(10, digits - j) : 0 : xd[xdi - 1]) % 10) & 1 || rm == (x.s < 0 ? 8 : 7));
      if (sd < 1 || !xd[0]) {
        xd.length = 0;
        if (roundUp) {
          sd -= x.e + 1;
          xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
          x.e = -sd || 0;
        } else {
          xd[0] = x.e = 0;
        }
        return x;
      }
      if (i == 0) {
        xd.length = xdi;
        k = 1;
        xdi--;
      } else {
        xd.length = xdi + 1;
        k = mathpow(10, LOG_BASE - i);
        xd[xdi] = j > 0 ? (w / mathpow(10, digits - j) % mathpow(10, j) | 0) * k : 0;
      }
      if (roundUp) {
        for (; ; ) {
          if (xdi == 0) {
            for (i = 1, j = xd[0]; j >= 10; j /= 10)
              i++;
            j = xd[0] += k;
            for (k = 1; j >= 10; j /= 10)
              k++;
            if (i != k) {
              x.e++;
              if (xd[0] == BASE)
                xd[0] = 1;
            }
            break;
          } else {
            xd[xdi] += k;
            if (xd[xdi] != BASE)
              break;
            xd[xdi--] = 0;
            k = 1;
          }
        }
      }
      for (i = xd.length; xd[--i] === 0; )
        xd.pop();
    }
    if (external) {
      if (x.e > Ctor.maxE) {
        x.d = null;
        x.e = NaN;
      } else if (x.e < Ctor.minE) {
        x.e = 0;
        x.d = [0];
      }
    }
    return x;
  }
  function finiteToString(x, isExp, sd) {
    if (!x.isFinite())
      return nonFiniteToString(x);
    var k,
        e = x.e,
        str = digitsToString(x.d),
        len = str.length;
    if (isExp) {
      if (sd && (k = sd - len) > 0) {
        str = str.charAt(0) + '.' + str.slice(1) + getZeroString(k);
      } else if (len > 1) {
        str = str.charAt(0) + '.' + str.slice(1);
      }
      str = str + (x.e < 0 ? 'e' : 'e+') + x.e;
    } else if (e < 0) {
      str = '0.' + getZeroString(-e - 1) + str;
      if (sd && (k = sd - len) > 0)
        str += getZeroString(k);
    } else if (e >= len) {
      str += getZeroString(e + 1 - len);
      if (sd && (k = sd - e - 1) > 0)
        str = str + '.' + getZeroString(k);
    } else {
      if ((k = e + 1) < len)
        str = str.slice(0, k) + '.' + str.slice(k);
      if (sd && (k = sd - len) > 0) {
        if (e + 1 === len)
          str += '.';
        str += getZeroString(k);
      }
    }
    return str;
  }
  function getBase10Exponent(digits, e) {
    var w = digits[0];
    for (e *= LOG_BASE; w >= 10; w /= 10)
      e++;
    return e;
  }
  function getLn10(Ctor, sd, pr) {
    if (sd > LN10_PRECISION) {
      external = true;
      if (pr)
        Ctor.precision = pr;
      throw Error(precisionLimitExceeded);
    }
    return finalise(new Ctor(LN10), sd, 1, true);
  }
  function getPi(Ctor, sd, rm) {
    if (sd > PI_PRECISION)
      throw Error(precisionLimitExceeded);
    return finalise(new Ctor(PI), sd, rm, true);
  }
  function getPrecision(digits) {
    var w = digits.length - 1,
        len = w * LOG_BASE + 1;
    w = digits[w];
    if (w) {
      for (; w % 10 == 0; w /= 10)
        len--;
      for (w = digits[0]; w >= 10; w /= 10)
        len++;
    }
    return len;
  }
  function getZeroString(k) {
    var zs = '';
    for (; k--; )
      zs += '0';
    return zs;
  }
  function intPow(Ctor, x, n, pr) {
    var isTruncated,
        r = new Ctor(1),
        k = Math.ceil(pr / LOG_BASE + 4);
    external = false;
    for (; ; ) {
      if (n % 2) {
        r = r.times(x);
        if (truncate(r.d, k))
          isTruncated = true;
      }
      n = mathfloor(n / 2);
      if (n === 0) {
        n = r.d.length - 1;
        if (isTruncated && r.d[n] === 0)
          ++r.d[n];
        break;
      }
      x = x.times(x);
      truncate(x.d, k);
    }
    external = true;
    return r;
  }
  function isOdd(n) {
    return n.d[n.d.length - 1] & 1;
  }
  function maxOrMin(Ctor, args, ltgt) {
    var y,
        x = new Ctor(args[0]),
        i = 0;
    for (; ++i < args.length; ) {
      y = new Ctor(args[i]);
      if (!y.s) {
        x = y;
        break;
      } else if (x[ltgt](y)) {
        x = y;
      }
    }
    return x;
  }
  function naturalExponential(x, sd) {
    var denominator,
        guard,
        j,
        pow,
        sum,
        t,
        wpr,
        rep = 0,
        i = 0,
        k = 0,
        Ctor = x.constructor,
        rm = Ctor.rounding,
        pr = Ctor.precision;
    if (!x.d || !x.d[0] || x.e > 17) {
      return new Ctor(x.d ? !x.d[0] ? 1 : x.s < 0 ? 0 : 1 / 0 : x.s ? x.s < 0 ? 0 : x : 0 / 0);
    }
    if (sd == null) {
      external = false;
      wpr = pr;
    } else {
      wpr = sd;
    }
    t = new Ctor(0.03125);
    while (x.e > -2) {
      x = x.times(t);
      k += 5;
    }
    guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
    wpr += guard;
    denominator = pow = sum = new Ctor(1);
    Ctor.precision = wpr;
    for (; ; ) {
      pow = finalise(pow.times(x), wpr, 1);
      denominator = denominator.times(++i);
      t = sum.plus(divide(pow, denominator, wpr, 1));
      if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
        j = k;
        while (j--)
          sum = finalise(sum.times(sum), wpr, 1);
        if (sd == null) {
          if (rep < 3 && checkRoundingDigits(sum.d, wpr - guard, rm, rep)) {
            Ctor.precision = wpr += 10;
            denominator = pow = t = new Ctor(1);
            i = 0;
            rep++;
          } else {
            return finalise(sum, Ctor.precision = pr, rm, external = true);
          }
        } else {
          Ctor.precision = pr;
          return sum;
        }
      }
      sum = t;
    }
  }
  function naturalLogarithm(y, sd) {
    var c,
        c0,
        denominator,
        e,
        numerator,
        rep,
        sum,
        t,
        wpr,
        x1,
        x2,
        n = 1,
        guard = 10,
        x = y,
        xd = x.d,
        Ctor = x.constructor,
        rm = Ctor.rounding,
        pr = Ctor.precision;
    if (x.s < 0 || !xd || !xd[0] || !x.e && xd[0] == 1 && xd.length == 1) {
      return new Ctor(xd && !xd[0] ? -1 / 0 : x.s != 1 ? NaN : xd ? 0 : x);
    }
    if (sd == null) {
      external = false;
      wpr = pr;
    } else {
      wpr = sd;
    }
    Ctor.precision = wpr += guard;
    c = digitsToString(xd);
    c0 = c.charAt(0);
    if (Math.abs(e = x.e) < 1.5e15) {
      while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
        x = x.times(y);
        c = digitsToString(x.d);
        c0 = c.charAt(0);
        n++;
      }
      e = x.e;
      if (c0 > 1) {
        x = new Ctor('0.' + c);
        e++;
      } else {
        x = new Ctor(c0 + '.' + c.slice(1));
      }
    } else {
      t = getLn10(Ctor, wpr + 2, pr).times(e + '');
      x = naturalLogarithm(new Ctor(c0 + '.' + c.slice(1)), wpr - guard).plus(t);
      Ctor.precision = pr;
      return sd == null ? finalise(x, pr, rm, external = true) : x;
    }
    x1 = x;
    sum = numerator = x = divide(x.minus(1), x.plus(1), wpr, 1);
    x2 = finalise(x.times(x), wpr, 1);
    denominator = 3;
    for (; ; ) {
      numerator = finalise(numerator.times(x2), wpr, 1);
      t = sum.plus(divide(numerator, new Ctor(denominator), wpr, 1));
      if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
        sum = sum.times(2);
        if (e !== 0)
          sum = sum.plus(getLn10(Ctor, wpr + 2, pr).times(e + ''));
        sum = divide(sum, new Ctor(n), wpr, 1);
        if (sd == null) {
          if (checkRoundingDigits(sum.d, wpr - guard, rm, rep)) {
            Ctor.precision = wpr += guard;
            t = numerator = x = divide(x1.minus(1), x1.plus(1), wpr, 1);
            x2 = finalise(x.times(x), wpr, 1);
            denominator = rep = 1;
          } else {
            return finalise(sum, Ctor.precision = pr, rm, external = true);
          }
        } else {
          Ctor.precision = pr;
          return sum;
        }
      }
      sum = t;
      denominator += 2;
    }
  }
  function nonFiniteToString(x) {
    return String(x.s * x.s / 0);
  }
  function parseDecimal(x, str) {
    var e,
        i,
        len;
    if ((e = str.indexOf('.')) > -1)
      str = str.replace('.', '');
    if ((i = str.search(/e/i)) > 0) {
      if (e < 0)
        e = i;
      e += +str.slice(i + 1);
      str = str.substring(0, i);
    } else if (e < 0) {
      e = str.length;
    }
    for (i = 0; str.charCodeAt(i) === 48; i++)
      ;
    for (len = str.length; str.charCodeAt(len - 1) === 48; --len)
      ;
    str = str.slice(i, len);
    if (str) {
      len -= i;
      x.e = e = e - i - 1;
      x.d = [];
      i = (e + 1) % LOG_BASE;
      if (e < 0)
        i += LOG_BASE;
      if (i < len) {
        if (i)
          x.d.push(+str.slice(0, i));
        for (len -= LOG_BASE; i < len; )
          x.d.push(+str.slice(i, i += LOG_BASE));
        str = str.slice(i);
        i = LOG_BASE - str.length;
      } else {
        i -= len;
      }
      for (; i--; )
        str += '0';
      x.d.push(+str);
      if (external) {
        if (x.e > x.constructor.maxE) {
          x.d = null;
          x.e = NaN;
        } else if (x.e < x.constructor.minE) {
          x.e = 0;
          x.d = [0];
        }
      }
    } else {
      x.e = 0;
      x.d = [0];
    }
    return x;
  }
  function parseOther(x, str) {
    var base,
        Ctor,
        divisor,
        i,
        isFloat,
        len,
        p,
        xd,
        xe;
    if (str === 'Infinity' || str === 'NaN') {
      if (!+str)
        x.s = NaN;
      x.e = NaN;
      x.d = null;
      return x;
    }
    if (isHex.test(str)) {
      base = 16;
      str = str.toLowerCase();
    } else if (isBinary.test(str)) {
      base = 2;
    } else if (isOctal.test(str)) {
      base = 8;
    } else {
      throw Error(invalidArgument + str);
    }
    i = str.search(/p/i);
    if (i > 0) {
      p = +str.slice(i + 1);
      str = str.substring(2, i);
    } else {
      str = str.slice(2);
    }
    i = str.indexOf('.');
    isFloat = i >= 0;
    Ctor = x.constructor;
    if (isFloat) {
      str = str.replace('.', '');
      len = str.length;
      i = len - i;
      divisor = intPow(Ctor, new Ctor(base), i, i * 2);
    }
    xd = convertBase(str, base, BASE);
    xe = xd.length - 1;
    for (i = xe; xd[i] === 0; --i)
      xd.pop();
    if (i < 0)
      return new Ctor(x.s * 0);
    x.e = getBase10Exponent(xd, xe);
    x.d = xd;
    external = false;
    if (isFloat)
      x = divide(x, divisor, len * 4);
    if (p)
      x = x.times(Math.abs(p) < 54 ? Math.pow(2, p) : Decimal.pow(2, p));
    external = true;
    return x;
  }
  function sine(Ctor, x) {
    var k,
        len = x.d.length;
    if (len < 3)
      return taylorSeries(Ctor, 2, x, x);
    k = 1.4 * Math.sqrt(len);
    k = k > 16 ? 16 : k | 0;
    x = x.times(Math.pow(5, -k));
    x = taylorSeries(Ctor, 2, x, x);
    var sin2_x,
        d5 = new Ctor(5),
        d16 = new Ctor(16),
        d20 = new Ctor(20);
    for (; k--; ) {
      sin2_x = x.times(x);
      x = x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
    }
    return x;
  }
  function taylorSeries(Ctor, n, x, y, isHyperbolic) {
    var j,
        t,
        u,
        x2,
        i = 1,
        pr = Ctor.precision,
        k = Math.ceil(pr / LOG_BASE);
    external = false;
    x2 = x.times(x);
    u = new Ctor(y);
    for (; ; ) {
      t = divide(u.times(x2), new Ctor(n++ * n++), pr, 1);
      u = isHyperbolic ? y.plus(t) : y.minus(t);
      y = divide(t.times(x2), new Ctor(n++ * n++), pr, 1);
      t = u.plus(y);
      if (t.d[k] !== void 0) {
        for (j = k; t.d[j] === u.d[j] && j--; )
          ;
        if (j == -1)
          break;
      }
      j = u;
      u = y;
      y = t;
      t = j;
      i++;
    }
    external = true;
    t.d.length = k + 1;
    return t;
  }
  function toLessThanHalfPi(Ctor, x) {
    var t,
        isNeg = x.s < 0,
        pi = getPi(Ctor, Ctor.precision, 1),
        halfPi = pi.times(0.5);
    x = x.abs();
    if (x.lte(halfPi)) {
      quadrant = isNeg ? 4 : 1;
      return x;
    }
    t = x.divToInt(pi);
    if (t.isZero()) {
      quadrant = isNeg ? 3 : 2;
    } else {
      x = x.minus(t.times(pi));
      if (x.lte(halfPi)) {
        quadrant = isOdd(t) ? (isNeg ? 2 : 3) : (isNeg ? 4 : 1);
        return x;
      }
      quadrant = isOdd(t) ? (isNeg ? 1 : 4) : (isNeg ? 3 : 2);
    }
    return x.minus(pi).abs();
  }
  function toStringBinary(x, baseOut, sd, rm) {
    var base,
        e,
        i,
        k,
        len,
        roundUp,
        str,
        xd,
        y,
        Ctor = x.constructor,
        isExp = sd !== void 0;
    if (isExp) {
      checkInt32(sd, 1, MAX_DIGITS);
      if (rm === void 0)
        rm = Ctor.rounding;
      else
        checkInt32(rm, 0, 8);
    } else {
      sd = Ctor.precision;
      rm = Ctor.rounding;
    }
    if (!x.isFinite()) {
      str = nonFiniteToString(x);
    } else {
      str = finiteToString(x);
      i = str.indexOf('.');
      if (isExp) {
        base = 2;
        if (baseOut == 16) {
          sd = sd * 4 - 3;
        } else if (baseOut == 8) {
          sd = sd * 3 - 2;
        }
      } else {
        base = baseOut;
      }
      if (i >= 0) {
        str = str.replace('.', '');
        y = new Ctor(1);
        y.e = str.length - i;
        y.d = convertBase(finiteToString(y), 10, base);
        y.e = y.d.length;
      }
      xd = convertBase(str, 10, base);
      e = len = xd.length;
      for (; xd[--len] == 0; )
        xd.pop();
      if (!xd[0]) {
        str = isExp ? '0p+0' : '0';
      } else {
        if (i < 0) {
          e--;
        } else {
          x = new Ctor(x);
          x.d = xd;
          x.e = e;
          x = divide(x, y, sd, rm, 0, base);
          xd = x.d;
          e = x.e;
          roundUp = inexact;
        }
        i = xd[sd];
        k = base / 2;
        roundUp = roundUp || xd[sd + 1] !== void 0;
        roundUp = rm < 4 ? (i !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2)) : i > k || i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 || rm === (x.s < 0 ? 8 : 7));
        xd.length = sd;
        if (roundUp) {
          for (; ++xd[--sd] > base - 1; ) {
            xd[sd] = 0;
            if (!sd) {
              ++e;
              xd.unshift(1);
            }
          }
        }
        for (len = xd.length; !xd[len - 1]; --len)
          ;
        for (i = 0, str = ''; i < len; i++)
          str += NUMERALS.charAt(xd[i]);
        if (isExp) {
          if (len > 1) {
            if (baseOut == 16 || baseOut == 8) {
              i = baseOut == 16 ? 4 : 3;
              for (--len; len % i; len++)
                str += '0';
              xd = convertBase(str, base, baseOut);
              for (len = xd.length; !xd[len - 1]; --len)
                ;
              for (i = 1, str = '1.'; i < len; i++)
                str += NUMERALS.charAt(xd[i]);
            } else {
              str = str.charAt(0) + '.' + str.slice(1);
            }
          }
          str = str + (e < 0 ? 'p' : 'p+') + e;
        } else if (e < 0) {
          for (; ++e; )
            str = '0' + str;
          str = '0.' + str;
        } else {
          if (++e > len)
            for (e -= len; e--; )
              str += '0';
          else if (e < len)
            str = str.slice(0, e) + '.' + str.slice(e);
        }
      }
      str = (baseOut == 16 ? '0x' : baseOut == 2 ? '0b' : baseOut == 8 ? '0o' : '') + str;
    }
    return x.s < 0 ? '-' + str : str;
  }
  function truncate(arr, len) {
    if (arr.length > len) {
      arr.length = len;
      return true;
    }
  }
  function abs(x) {
    return new this(x).abs();
  }
  function acos(x) {
    return new this(x).acos();
  }
  function acosh(x) {
    return new this(x).acosh();
  }
  function add(x, y) {
    return new this(x).plus(y);
  }
  function asin(x) {
    return new this(x).asin();
  }
  function asinh(x) {
    return new this(x).asinh();
  }
  function atan(x) {
    return new this(x).atan();
  }
  function atanh(x) {
    return new this(x).atanh();
  }
  function atan2(y, x) {
    y = new this(y);
    x = new this(x);
    var r,
        pr = this.precision,
        rm = this.rounding,
        wpr = pr + 4;
    if (!y.s || !x.s) {
      r = new this(NaN);
    } else if (!y.d && !x.d) {
      r = getPi(this, wpr, 1).times(x.s > 0 ? 0.25 : 0.75);
      r.s = y.s;
    } else if (!x.d || y.isZero()) {
      r = x.s < 0 ? getPi(this, pr, rm) : new this(0);
      r.s = y.s;
    } else if (!y.d || x.isZero()) {
      r = getPi(this, wpr, 1).times(0.5);
      r.s = y.s;
    } else if (x.s < 0) {
      this.precision = wpr;
      this.rounding = 1;
      r = this.atan(divide(y, x, wpr, 1));
      x = getPi(this, wpr, 1);
      this.precision = pr;
      this.rounding = rm;
      r = y.s < 0 ? r.minus(x) : r.plus(x);
    } else {
      r = this.atan(divide(y, x, wpr, 1));
    }
    return r;
  }
  function cbrt(x) {
    return new this(x).cbrt();
  }
  function ceil(x) {
    return finalise(x = new this(x), x.e + 1, 2);
  }
  function config(obj) {
    if (!obj || typeof obj !== 'object')
      throw Error(decimalError + 'Object expected');
    var i,
        p,
        v,
        ps = ['precision', 1, MAX_DIGITS, 'rounding', 0, 8, 'toExpNeg', -EXP_LIMIT, 0, 'toExpPos', 0, EXP_LIMIT, 'maxE', 0, EXP_LIMIT, 'minE', -EXP_LIMIT, 0, 'modulo', 0, 9];
    for (i = 0; i < ps.length; i += 3) {
      if ((v = obj[p = ps[i]]) !== void 0) {
        if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2])
          this[p] = v;
        else
          throw Error(invalidArgument + p + ': ' + v);
      }
    }
    if ((v = obj[p = 'crypto']) !== void 0) {
      if (v === true || v === false || v === 0 || v === 1) {
        if (v) {
          if (typeof crypto != 'undefined' && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
            this[p] = true;
          } else {
            throw Error(cryptoUnavailable);
          }
        } else {
          this[p] = false;
        }
      } else {
        throw Error(invalidArgument + p + ': ' + v);
      }
    }
    return this;
  }
  function cos(x) {
    return new this(x).cos();
  }
  function cosh(x) {
    return new this(x).cosh();
  }
  function clone(obj) {
    var i,
        p,
        ps;
    function Decimal(v) {
      var e,
          i,
          t,
          x = this;
      if (!(x instanceof Decimal))
        return new Decimal(v);
      x.constructor = Decimal;
      if (v instanceof Decimal) {
        x.s = v.s;
        x.e = v.e;
        x.d = (v = v.d) ? v.slice() : v;
        return;
      }
      t = typeof v;
      if (t === 'number') {
        if (v === 0) {
          x.s = 1 / v < 0 ? -1 : 1;
          x.e = 0;
          x.d = [0];
          return;
        }
        if (v < 0) {
          v = -v;
          x.s = -1;
        } else {
          x.s = 1;
        }
        if (v === ~~v && v < 1e7) {
          for (e = 0, i = v; i >= 10; i /= 10)
            e++;
          x.e = e;
          x.d = [v];
          return;
        } else if (v * 0 !== 0) {
          if (!v)
            x.s = NaN;
          x.e = NaN;
          x.d = null;
          return;
        }
        return parseDecimal(x, v.toString());
      } else if (t !== 'string') {
        throw Error(invalidArgument + v);
      }
      if (v.charCodeAt(0) === 45) {
        v = v.slice(1);
        x.s = -1;
      } else {
        x.s = 1;
      }
      return isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
    }
    Decimal.prototype = P;
    Decimal.ROUND_UP = 0;
    Decimal.ROUND_DOWN = 1;
    Decimal.ROUND_CEIL = 2;
    Decimal.ROUND_FLOOR = 3;
    Decimal.ROUND_HALF_UP = 4;
    Decimal.ROUND_HALF_DOWN = 5;
    Decimal.ROUND_HALF_EVEN = 6;
    Decimal.ROUND_HALF_CEIL = 7;
    Decimal.ROUND_HALF_FLOOR = 8;
    Decimal.EUCLID = 9;
    Decimal.config = Decimal.set = config;
    Decimal.clone = clone;
    Decimal.abs = abs;
    Decimal.acos = acos;
    Decimal.acosh = acosh;
    Decimal.add = add;
    Decimal.asin = asin;
    Decimal.asinh = asinh;
    Decimal.atan = atan;
    Decimal.atanh = atanh;
    Decimal.atan2 = atan2;
    Decimal.cbrt = cbrt;
    Decimal.ceil = ceil;
    Decimal.cos = cos;
    Decimal.cosh = cosh;
    Decimal.div = div;
    Decimal.exp = exp;
    Decimal.floor = floor;
    Decimal.hypot = hypot;
    Decimal.ln = ln;
    Decimal.log = log;
    Decimal.log10 = log10;
    Decimal.log2 = log2;
    Decimal.max = max;
    Decimal.min = min;
    Decimal.mod = mod;
    Decimal.mul = mul;
    Decimal.pow = pow;
    Decimal.random = random;
    Decimal.round = round;
    Decimal.sign = sign;
    Decimal.sin = sin;
    Decimal.sinh = sinh;
    Decimal.sqrt = sqrt;
    Decimal.sub = sub;
    Decimal.tan = tan;
    Decimal.tanh = tanh;
    Decimal.trunc = trunc;
    if (obj === void 0)
      obj = {};
    if (obj) {
      ps = ['precision', 'rounding', 'toExpNeg', 'toExpPos', 'maxE', 'minE', 'modulo', 'crypto'];
      for (i = 0; i < ps.length; )
        if (!obj.hasOwnProperty(p = ps[i++]))
          obj[p] = this[p];
    }
    Decimal.config(obj);
    return Decimal;
  }
  function div(x, y) {
    return new this(x).div(y);
  }
  function exp(x) {
    return new this(x).exp();
  }
  function floor(x) {
    return finalise(x = new this(x), x.e + 1, 3);
  }
  function hypot() {
    var i,
        n,
        t = new this(0);
    external = false;
    for (i = 0; i < arguments.length; ) {
      n = new this(arguments[i++]);
      if (!n.d) {
        if (n.s) {
          external = true;
          return new this(1 / 0);
        }
        t = n;
      } else if (t.d) {
        t = t.plus(n.times(n));
      }
    }
    external = true;
    return t.sqrt();
  }
  function ln(x) {
    return new this(x).ln();
  }
  function log(x, y) {
    return new this(x).log(y);
  }
  function log2(x) {
    return new this(x).log(2);
  }
  function log10(x) {
    return new this(x).log(10);
  }
  function max() {
    return maxOrMin(this, arguments, 'lt');
  }
  function min() {
    return maxOrMin(this, arguments, 'gt');
  }
  function mod(x, y) {
    return new this(x).mod(y);
  }
  function mul(x, y) {
    return new this(x).mul(y);
  }
  function pow(x, y) {
    return new this(x).pow(y);
  }
  function random(sd) {
    var d,
        e,
        k,
        n,
        i = 0,
        r = new this(1),
        rd = [];
    if (sd === void 0)
      sd = this.precision;
    else
      checkInt32(sd, 1, MAX_DIGITS);
    k = Math.ceil(sd / LOG_BASE);
    if (!this.crypto) {
      for (; i < k; )
        rd[i++] = Math.random() * 1e7 | 0;
    } else if (crypto.getRandomValues) {
      d = crypto.getRandomValues(new Uint32Array(k));
      for (; i < k; ) {
        n = d[i];
        if (n >= 4.29e9) {
          d[i] = crypto.getRandomValues(new Uint32Array(1))[0];
        } else {
          rd[i++] = n % 1e7;
        }
      }
    } else if (crypto.randomBytes) {
      d = crypto.randomBytes(k *= 4);
      for (; i < k; ) {
        n = d[i] + (d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 0x7f) << 24);
        if (n >= 2.14e9) {
          crypto.randomBytes(4).copy(d, i);
        } else {
          rd.push(n % 1e7);
          i += 4;
        }
      }
      i = k / 4;
    } else {
      throw Error(cryptoUnavailable);
    }
    k = rd[--i];
    sd %= LOG_BASE;
    if (k && sd) {
      n = mathpow(10, LOG_BASE - sd);
      rd[i] = (k / n | 0) * n;
    }
    for (; rd[i] === 0; i--)
      rd.pop();
    if (i < 0) {
      e = 0;
      rd = [0];
    } else {
      e = -1;
      for (; rd[0] === 0; e -= LOG_BASE)
        rd.shift();
      for (k = 1, n = rd[0]; n >= 10; n /= 10)
        k++;
      if (k < LOG_BASE)
        e -= LOG_BASE - k;
    }
    r.e = e;
    r.d = rd;
    return r;
  }
  function round(x) {
    return finalise(x = new this(x), x.e + 1, this.rounding);
  }
  function sign(x) {
    x = new this(x);
    return x.d ? (x.d[0] ? x.s : 0 * x.s) : x.s || NaN;
  }
  function sin(x) {
    return new this(x).sin();
  }
  function sinh(x) {
    return new this(x).sinh();
  }
  function sqrt(x) {
    return new this(x).sqrt();
  }
  function sub(x, y) {
    return new this(x).sub(y);
  }
  function tan(x) {
    return new this(x).tan();
  }
  function tanh(x) {
    return new this(x).tanh();
  }
  function trunc(x) {
    return finalise(x = new this(x), x.e + 1, 1);
  }
  Decimal = clone(Decimal);
  Decimal['default'] = Decimal.Decimal = Decimal;
  LN10 = new Decimal(LN10);
  PI = new Decimal(PI);
  if (typeof define == 'function' && define.amd) {
    define("github:MikeMcl/decimal.js@7.3.0/decimal.js", [], function() {
      return Decimal;
    });
  } else if (typeof module != 'undefined' && module.exports) {
    module.exports = Decimal;
  } else {
    if (!globalScope) {
      globalScope = typeof self != 'undefined' && self && self.self == self ? self : Function('return this')();
    }
    noConflict = globalScope.Decimal;
    Decimal.noConflict = function() {
      globalScope.Decimal = noConflict;
      return Decimal;
    };
    globalScope.Decimal = Decimal;
  }
})(this);

})();
(function() {
var define = System.amdDefine;
define("github:MikeMcl/decimal.js@7.3.0.js", ["github:MikeMcl/decimal.js@7.3.0/decimal.js"], function(main) {
  return main;
});

})();
System.registerDynamic('npm:rxjs@5.5.2/add/observable/from.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/observable/from.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var from_1 = $__require('npm:rxjs@5.5.2/observable/from.js');
  Observable_1.Observable.from = from_1.from;
});
System.registerDynamic('npm:rxjs@5.5.2/add/observable/of.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/observable/of.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var of_1 = $__require('npm:rxjs@5.5.2/observable/of.js');
  Observable_1.Observable.of = of_1.of;
});
System.registerDynamic("npm:rxjs@5.5.2/observable/empty.js", ["npm:rxjs@5.5.2/observable/EmptyObservable.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var EmptyObservable_1 = $__require("npm:rxjs@5.5.2/observable/EmptyObservable.js");
  exports.empty = EmptyObservable_1.EmptyObservable.create;
});
System.registerDynamic('npm:rxjs@5.5.2/add/observable/empty.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/observable/empty.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var empty_1 = $__require('npm:rxjs@5.5.2/observable/empty.js');
  Observable_1.Observable.empty = empty_1.empty;
});
System.registerDynamic('npm:rxjs@5.5.2/observable/FromEventObservable.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/util/tryCatch.js', 'npm:rxjs@5.5.2/util/isFunction.js', 'npm:rxjs@5.5.2/util/errorObject.js', 'npm:rxjs@5.5.2/Subscription.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
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
    var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
    var tryCatch_1 = $__require('npm:rxjs@5.5.2/util/tryCatch.js');
    var isFunction_1 = $__require('npm:rxjs@5.5.2/util/isFunction.js');
    var errorObject_1 = $__require('npm:rxjs@5.5.2/util/errorObject.js');
    var Subscription_1 = $__require('npm:rxjs@5.5.2/Subscription.js');
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
System.registerDynamic("npm:rxjs@5.5.2/observable/fromEvent.js", ["npm:rxjs@5.5.2/observable/FromEventObservable.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var FromEventObservable_1 = $__require("npm:rxjs@5.5.2/observable/FromEventObservable.js");
  exports.fromEvent = FromEventObservable_1.FromEventObservable.create;
});
System.registerDynamic('npm:rxjs@5.5.2/add/observable/fromEvent.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/observable/fromEvent.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var fromEvent_1 = $__require('npm:rxjs@5.5.2/observable/fromEvent.js');
  Observable_1.Observable.fromEvent = fromEvent_1.fromEvent;
});
System.registerDynamic('npm:rxjs@5.5.2/operators/merge.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/observable/ArrayObservable.js', 'npm:rxjs@5.5.2/operators/mergeAll.js', 'npm:rxjs@5.5.2/util/isScheduler.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var ArrayObservable_1 = $__require('npm:rxjs@5.5.2/observable/ArrayObservable.js');
  var mergeAll_1 = $__require('npm:rxjs@5.5.2/operators/mergeAll.js');
  var isScheduler_1 = $__require('npm:rxjs@5.5.2/util/isScheduler.js');
  function merge() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    return function (source) {
      return source.lift.call(mergeStatic.apply(void 0, [source].concat(observables)));
    };
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
    return mergeAll_1.mergeAll(concurrent)(new ArrayObservable_1.ArrayObservable(observables, scheduler));
  }
  exports.mergeStatic = mergeStatic;
});
System.registerDynamic('npm:rxjs@5.5.2/operator/merge.js', ['npm:rxjs@5.5.2/operators/merge.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var merge_1 = $__require('npm:rxjs@5.5.2/operators/merge.js');
  var merge_2 = $__require('npm:rxjs@5.5.2/operators/merge.js');
  exports.mergeStatic = merge_2.mergeStatic;
  function merge() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    return merge_1.merge.apply(void 0, observables)(this);
  }
  exports.merge = merge;
});
System.registerDynamic("npm:rxjs@5.5.2/observable/merge.js", ["npm:rxjs@5.5.2/operator/merge.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var merge_1 = $__require("npm:rxjs@5.5.2/operator/merge.js");
  exports.merge = merge_1.mergeStatic;
});
System.registerDynamic('npm:rxjs@5.5.2/add/observable/merge.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/observable/merge.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var merge_1 = $__require('npm:rxjs@5.5.2/observable/merge.js');
  Observable_1.Observable.merge = merge_1.merge;
});
System.registerDynamic('npm:rxjs@5.5.2/operators/zip.js', ['npm:rxjs@5.5.2/observable/ArrayObservable.js', 'npm:rxjs@5.5.2/util/isArray.js', 'npm:rxjs@5.5.2/Subscriber.js', 'npm:rxjs@5.5.2/OuterSubscriber.js', 'npm:rxjs@5.5.2/util/subscribeToResult.js', 'npm:rxjs@5.5.2/symbol/iterator.js'], true, function ($__require, exports, module) {
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
  var ArrayObservable_1 = $__require('npm:rxjs@5.5.2/observable/ArrayObservable.js');
  var isArray_1 = $__require('npm:rxjs@5.5.2/util/isArray.js');
  var Subscriber_1 = $__require('npm:rxjs@5.5.2/Subscriber.js');
  var OuterSubscriber_1 = $__require('npm:rxjs@5.5.2/OuterSubscriber.js');
  var subscribeToResult_1 = $__require('npm:rxjs@5.5.2/util/subscribeToResult.js');
  var iterator_1 = $__require('npm:rxjs@5.5.2/symbol/iterator.js');
  function zip() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    return function zipOperatorFunction(source) {
      return source.lift.call(zipStatic.apply(void 0, [source].concat(observables)));
    };
  }
  exports.zip = zip;
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
      } else if (typeof value[iterator_1.iterator] === 'function') {
        iterators.push(new StaticIterator(value[iterator_1.iterator]()));
      } else {
        iterators.push(new ZipBufferIterator(this.destination, this, value));
      }
    };
    ZipSubscriber.prototype._complete = function () {
      var iterators = this.iterators;
      var len = iterators.length;
      if (len === 0) {
        this.destination.complete();
        return;
      }
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
    StaticArrayIterator.prototype[iterator_1.iterator] = function () {
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
    ZipBufferIterator.prototype[iterator_1.iterator] = function () {
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
System.registerDynamic("npm:rxjs@5.5.2/observable/zip.js", ["npm:rxjs@5.5.2/operators/zip.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var zip_1 = $__require("npm:rxjs@5.5.2/operators/zip.js");
  exports.zip = zip_1.zipStatic;
});
System.registerDynamic('npm:rxjs@5.5.2/add/observable/zip.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/observable/zip.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var zip_1 = $__require('npm:rxjs@5.5.2/observable/zip.js');
  Observable_1.Observable.zip = zip_1.zip;
});
System.registerDynamic("npm:rxjs@5.5.2/util/isNumeric.js", ["npm:rxjs@5.5.2/util/isArray.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var isArray_1 = $__require("npm:rxjs@5.5.2/util/isArray.js");
  function isNumeric(val) {
    return !isArray_1.isArray(val) && val - parseFloat(val) + 1 >= 0;
  }
  exports.isNumeric = isNumeric;
  ;
});
System.registerDynamic('npm:rxjs@5.5.2/observable/TimerObservable.js', ['npm:rxjs@5.5.2/util/isNumeric.js', 'npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/scheduler/async.js', 'npm:rxjs@5.5.2/util/isScheduler.js', 'npm:rxjs@5.5.2/util/isDate.js'], true, function ($__require, exports, module) {
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
  var isNumeric_1 = $__require('npm:rxjs@5.5.2/util/isNumeric.js');
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var async_1 = $__require('npm:rxjs@5.5.2/scheduler/async.js');
  var isScheduler_1 = $__require('npm:rxjs@5.5.2/util/isScheduler.js');
  var isDate_1 = $__require('npm:rxjs@5.5.2/util/isDate.js');
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
System.registerDynamic("npm:rxjs@5.5.2/observable/timer.js", ["npm:rxjs@5.5.2/observable/TimerObservable.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var TimerObservable_1 = $__require("npm:rxjs@5.5.2/observable/TimerObservable.js");
  exports.timer = TimerObservable_1.TimerObservable.create;
});
System.registerDynamic('npm:rxjs@5.5.2/add/observable/timer.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/observable/timer.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var timer_1 = $__require('npm:rxjs@5.5.2/observable/timer.js');
  Observable_1.Observable.timer = timer_1.timer;
});
System.registerDynamic("npm:rxjs@5.5.2/operator/map.js", ["npm:rxjs@5.5.2/operators/map.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var map_1 = $__require("npm:rxjs@5.5.2/operators/map.js");
  function map(project, thisArg) {
    return map_1.map(project, thisArg)(this);
  }
  exports.map = map;
});
System.registerDynamic('npm:rxjs@5.5.2/add/operator/map.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/operator/map.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var map_1 = $__require('npm:rxjs@5.5.2/operator/map.js');
  Observable_1.Observable.prototype.map = map_1.map;
});
System.registerDynamic("npm:rxjs@5.5.2/operators/mapTo.js", ["npm:rxjs@5.5.2/Subscriber.js"], true, function ($__require, exports, module) {
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
  var Subscriber_1 = $__require("npm:rxjs@5.5.2/Subscriber.js");
  function mapTo(value) {
    return function (source) {
      return source.lift(new MapToOperator(value));
    };
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
System.registerDynamic("npm:rxjs@5.5.2/operator/mapTo.js", ["npm:rxjs@5.5.2/operators/mapTo.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var mapTo_1 = $__require("npm:rxjs@5.5.2/operators/mapTo.js");
  function mapTo(value) {
    return mapTo_1.mapTo(value)(this);
  }
  exports.mapTo = mapTo;
});
System.registerDynamic('npm:rxjs@5.5.2/add/operator/mapTo.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/operator/mapTo.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var mapTo_1 = $__require('npm:rxjs@5.5.2/operator/mapTo.js');
  Observable_1.Observable.prototype.mapTo = mapTo_1.mapTo;
});
System.registerDynamic("npm:rxjs@5.5.2/operators/filter.js", ["npm:rxjs@5.5.2/Subscriber.js"], true, function ($__require, exports, module) {
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
  var Subscriber_1 = $__require("npm:rxjs@5.5.2/Subscriber.js");
  function filter(predicate, thisArg) {
    return function filterOperatorFunction(source) {
      return source.lift(new FilterOperator(predicate, thisArg));
    };
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
System.registerDynamic("npm:rxjs@5.5.2/operator/filter.js", ["npm:rxjs@5.5.2/operators/filter.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var filter_1 = $__require("npm:rxjs@5.5.2/operators/filter.js");
  function filter(predicate, thisArg) {
    return filter_1.filter(predicate, thisArg)(this);
  }
  exports.filter = filter;
});
System.registerDynamic('npm:rxjs@5.5.2/add/operator/filter.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/operator/filter.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var filter_1 = $__require('npm:rxjs@5.5.2/operator/filter.js');
  Observable_1.Observable.prototype.filter = filter_1.filter;
});
System.registerDynamic("npm:rxjs@5.5.2/operator/mergeMap.js", ["npm:rxjs@5.5.2/operators/mergeMap.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var mergeMap_1 = $__require("npm:rxjs@5.5.2/operators/mergeMap.js");
  function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) {
      concurrent = Number.POSITIVE_INFINITY;
    }
    return mergeMap_1.mergeMap(project, resultSelector, concurrent)(this);
  }
  exports.mergeMap = mergeMap;
});
System.registerDynamic('npm:rxjs@5.5.2/add/operator/mergeMap.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/operator/mergeMap.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var mergeMap_1 = $__require('npm:rxjs@5.5.2/operator/mergeMap.js');
  Observable_1.Observable.prototype.mergeMap = mergeMap_1.mergeMap;
  Observable_1.Observable.prototype.flatMap = mergeMap_1.mergeMap;
});
System.registerDynamic('npm:rxjs@5.5.2/operators/mergeMapTo.js', ['npm:rxjs@5.5.2/OuterSubscriber.js', 'npm:rxjs@5.5.2/util/subscribeToResult.js'], true, function ($__require, exports, module) {
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
  var OuterSubscriber_1 = $__require('npm:rxjs@5.5.2/OuterSubscriber.js');
  var subscribeToResult_1 = $__require('npm:rxjs@5.5.2/util/subscribeToResult.js');
  function mergeMapTo(innerObservable, resultSelector, concurrent) {
    if (concurrent === void 0) {
      concurrent = Number.POSITIVE_INFINITY;
    }
    if (typeof resultSelector === 'number') {
      concurrent = resultSelector;
      resultSelector = null;
    }
    return function (source) {
      return source.lift(new MergeMapToOperator(innerObservable, resultSelector, concurrent));
    };
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
System.registerDynamic("npm:rxjs@5.5.2/operator/mergeMapTo.js", ["npm:rxjs@5.5.2/operators/mergeMapTo.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var mergeMapTo_1 = $__require("npm:rxjs@5.5.2/operators/mergeMapTo.js");
  function mergeMapTo(innerObservable, resultSelector, concurrent) {
    if (concurrent === void 0) {
      concurrent = Number.POSITIVE_INFINITY;
    }
    return mergeMapTo_1.mergeMapTo(innerObservable, resultSelector, concurrent)(this);
  }
  exports.mergeMapTo = mergeMapTo;
});
System.registerDynamic('npm:rxjs@5.5.2/add/operator/mergeMapTo.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/operator/mergeMapTo.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var mergeMapTo_1 = $__require('npm:rxjs@5.5.2/operator/mergeMapTo.js');
  Observable_1.Observable.prototype.flatMapTo = mergeMapTo_1.mergeMapTo;
  Observable_1.Observable.prototype.mergeMapTo = mergeMapTo_1.mergeMapTo;
});
System.registerDynamic("npm:rxjs@5.5.2/operator/mergeAll.js", ["npm:rxjs@5.5.2/operators/mergeAll.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var mergeAll_1 = $__require("npm:rxjs@5.5.2/operators/mergeAll.js");
  function mergeAll(concurrent) {
    if (concurrent === void 0) {
      concurrent = Number.POSITIVE_INFINITY;
    }
    return mergeAll_1.mergeAll(concurrent)(this);
  }
  exports.mergeAll = mergeAll;
});
System.registerDynamic('npm:rxjs@5.5.2/add/operator/mergeAll.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/operator/mergeAll.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var mergeAll_1 = $__require('npm:rxjs@5.5.2/operator/mergeAll.js');
  Observable_1.Observable.prototype.mergeAll = mergeAll_1.mergeAll;
});
System.registerDynamic("npm:rxjs@5.5.2/operators/scan.js", ["npm:rxjs@5.5.2/Subscriber.js"], true, function ($__require, exports, module) {
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
  var Subscriber_1 = $__require("npm:rxjs@5.5.2/Subscriber.js");
  function scan(accumulator, seed) {
    var hasSeed = false;
    if (arguments.length >= 2) {
      hasSeed = true;
    }
    return function scanOperatorFunction(source) {
      return source.lift(new ScanOperator(accumulator, seed, hasSeed));
    };
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
System.registerDynamic("npm:rxjs@5.5.2/operator/scan.js", ["npm:rxjs@5.5.2/operators/scan.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var scan_1 = $__require("npm:rxjs@5.5.2/operators/scan.js");
  function scan(accumulator, seed) {
    if (arguments.length >= 2) {
      return scan_1.scan(accumulator, seed)(this);
    }
    return scan_1.scan(accumulator)(this);
  }
  exports.scan = scan;
});
System.registerDynamic('npm:rxjs@5.5.2/add/operator/scan.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/operator/scan.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var scan_1 = $__require('npm:rxjs@5.5.2/operator/scan.js');
  Observable_1.Observable.prototype.scan = scan_1.scan;
});
System.registerDynamic("npm:rxjs@5.5.2/operators/tap.js", ["npm:rxjs@5.5.2/Subscriber.js"], true, function ($__require, exports, module) {
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
  var Subscriber_1 = $__require("npm:rxjs@5.5.2/Subscriber.js");
  function tap(nextOrObserver, error, complete) {
    return function tapOperatorFunction(source) {
      return source.lift(new DoOperator(nextOrObserver, error, complete));
    };
  }
  exports.tap = tap;
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
System.registerDynamic("npm:rxjs@5.5.2/operator/do.js", ["npm:rxjs@5.5.2/operators/tap.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var tap_1 = $__require("npm:rxjs@5.5.2/operators/tap.js");
  function _do(nextOrObserver, error, complete) {
    return tap_1.tap(nextOrObserver, error, complete)(this);
  }
  exports._do = _do;
});
System.registerDynamic('npm:rxjs@5.5.2/add/operator/do.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/operator/do.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var do_1 = $__require('npm:rxjs@5.5.2/operator/do.js');
  Observable_1.Observable.prototype.do = do_1._do;
  Observable_1.Observable.prototype._do = do_1._do;
});
System.registerDynamic("npm:rxjs@5.5.2/observable/of.js", ["npm:rxjs@5.5.2/observable/ArrayObservable.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var ArrayObservable_1 = $__require("npm:rxjs@5.5.2/observable/ArrayObservable.js");
  exports.of = ArrayObservable_1.ArrayObservable.of;
});
System.registerDynamic('npm:rxjs@5.5.2/observable/PromiseObservable.js', ['npm:rxjs@5.5.2/util/root.js', 'npm:rxjs@5.5.2/Observable.js'], true, function ($__require, exports, module) {
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
  var root_1 = $__require('npm:rxjs@5.5.2/util/root.js');
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
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
System.registerDynamic('npm:rxjs@5.5.2/observable/IteratorObservable.js', ['npm:rxjs@5.5.2/util/root.js', 'npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/symbol/iterator.js'], true, function ($__require, exports, module) {
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
  var root_1 = $__require('npm:rxjs@5.5.2/util/root.js');
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var iterator_1 = $__require('npm:rxjs@5.5.2/symbol/iterator.js');
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
    StringIterator.prototype[iterator_1.iterator] = function () {
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
    ArrayIterator.prototype[iterator_1.iterator] = function () {
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
    var i = obj[iterator_1.iterator];
    if (!i && typeof obj === 'string') {
      return new StringIterator(obj);
    }
    if (!i && obj.length !== undefined) {
      return new ArrayIterator(obj);
    }
    if (!i) {
      throw new TypeError('object is not iterable');
    }
    return obj[iterator_1.iterator]();
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
System.registerDynamic('npm:rxjs@5.5.2/observable/ArrayObservable.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/observable/ScalarObservable.js', 'npm:rxjs@5.5.2/observable/EmptyObservable.js', 'npm:rxjs@5.5.2/util/isScheduler.js'], true, function ($__require, exports, module) {
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
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var ScalarObservable_1 = $__require('npm:rxjs@5.5.2/observable/ScalarObservable.js');
  var EmptyObservable_1 = $__require('npm:rxjs@5.5.2/observable/EmptyObservable.js');
  var isScheduler_1 = $__require('npm:rxjs@5.5.2/util/isScheduler.js');
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
System.registerDynamic("npm:rxjs@5.5.2/observable/ScalarObservable.js", ["npm:rxjs@5.5.2/Observable.js"], true, function ($__require, exports, module) {
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
  var Observable_1 = $__require("npm:rxjs@5.5.2/Observable.js");
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
System.registerDynamic('npm:rxjs@5.5.2/observable/ArrayLikeObservable.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/observable/ScalarObservable.js', 'npm:rxjs@5.5.2/observable/EmptyObservable.js'], true, function ($__require, exports, module) {
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
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var ScalarObservable_1 = $__require('npm:rxjs@5.5.2/observable/ScalarObservable.js');
  var EmptyObservable_1 = $__require('npm:rxjs@5.5.2/observable/EmptyObservable.js');
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
System.registerDynamic('npm:rxjs@5.5.2/observable/FromObservable.js', ['npm:rxjs@5.5.2/util/isArray.js', 'npm:rxjs@5.5.2/util/isArrayLike.js', 'npm:rxjs@5.5.2/util/isPromise.js', 'npm:rxjs@5.5.2/observable/PromiseObservable.js', 'npm:rxjs@5.5.2/observable/IteratorObservable.js', 'npm:rxjs@5.5.2/observable/ArrayObservable.js', 'npm:rxjs@5.5.2/observable/ArrayLikeObservable.js', 'npm:rxjs@5.5.2/symbol/iterator.js', 'npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/operators/observeOn.js', 'npm:rxjs@5.5.2/symbol/observable.js'], true, function ($__require, exports, module) {
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
  var isArray_1 = $__require('npm:rxjs@5.5.2/util/isArray.js');
  var isArrayLike_1 = $__require('npm:rxjs@5.5.2/util/isArrayLike.js');
  var isPromise_1 = $__require('npm:rxjs@5.5.2/util/isPromise.js');
  var PromiseObservable_1 = $__require('npm:rxjs@5.5.2/observable/PromiseObservable.js');
  var IteratorObservable_1 = $__require('npm:rxjs@5.5.2/observable/IteratorObservable.js');
  var ArrayObservable_1 = $__require('npm:rxjs@5.5.2/observable/ArrayObservable.js');
  var ArrayLikeObservable_1 = $__require('npm:rxjs@5.5.2/observable/ArrayLikeObservable.js');
  var iterator_1 = $__require('npm:rxjs@5.5.2/symbol/iterator.js');
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var observeOn_1 = $__require('npm:rxjs@5.5.2/operators/observeOn.js');
  var observable_1 = $__require('npm:rxjs@5.5.2/symbol/observable.js');
  var FromObservable = function (_super) {
    __extends(FromObservable, _super);
    function FromObservable(ish, scheduler) {
      _super.call(this, null);
      this.ish = ish;
      this.scheduler = scheduler;
    }
    FromObservable.create = function (ish, scheduler) {
      if (ish != null) {
        if (typeof ish[observable_1.observable] === 'function') {
          if (ish instanceof Observable_1.Observable && !scheduler) {
            return ish;
          }
          return new FromObservable(ish, scheduler);
        } else if (isArray_1.isArray(ish)) {
          return new ArrayObservable_1.ArrayObservable(ish, scheduler);
        } else if (isPromise_1.isPromise(ish)) {
          return new PromiseObservable_1.PromiseObservable(ish, scheduler);
        } else if (typeof ish[iterator_1.iterator] === 'function' || typeof ish === 'string') {
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
        return ish[observable_1.observable]().subscribe(subscriber);
      } else {
        return ish[observable_1.observable]().subscribe(new observeOn_1.ObserveOnSubscriber(subscriber, scheduler, 0));
      }
    };
    return FromObservable;
  }(Observable_1.Observable);
  exports.FromObservable = FromObservable;
});
System.registerDynamic("npm:rxjs@5.5.2/observable/from.js", ["npm:rxjs@5.5.2/observable/FromObservable.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var FromObservable_1 = $__require("npm:rxjs@5.5.2/observable/FromObservable.js");
  exports.from = FromObservable_1.FromObservable.create;
});
System.registerDynamic('npm:rxjs@5.5.2/operators/mergeMap.js', ['npm:rxjs@5.5.2/util/subscribeToResult.js', 'npm:rxjs@5.5.2/OuterSubscriber.js'], true, function ($__require, exports, module) {
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
  var subscribeToResult_1 = $__require('npm:rxjs@5.5.2/util/subscribeToResult.js');
  var OuterSubscriber_1 = $__require('npm:rxjs@5.5.2/OuterSubscriber.js');
  function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) {
      concurrent = Number.POSITIVE_INFINITY;
    }
    return function mergeMapOperatorFunction(source) {
      if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
        resultSelector = null;
      }
      return source.lift(new MergeMapOperator(project, resultSelector, concurrent));
    };
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
System.registerDynamic("npm:rxjs@5.5.2/util/identity.js", [], true, function ($__require, exports, module) {
    /* */
    "use strict";

    var global = this || self,
        GLOBAL = global;
    function identity(x) {
        return x;
    }
    exports.identity = identity;
    
});
System.registerDynamic('npm:rxjs@5.5.2/operators/mergeAll.js', ['npm:rxjs@5.5.2/operators/mergeMap.js', 'npm:rxjs@5.5.2/util/identity.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var mergeMap_1 = $__require('npm:rxjs@5.5.2/operators/mergeMap.js');
  var identity_1 = $__require('npm:rxjs@5.5.2/util/identity.js');
  function mergeAll(concurrent) {
    if (concurrent === void 0) {
      concurrent = Number.POSITIVE_INFINITY;
    }
    return mergeMap_1.mergeMap(identity_1.identity, null, concurrent);
  }
  exports.mergeAll = mergeAll;
});
System.registerDynamic("npm:rxjs@5.5.2/operators/concatAll.js", ["npm:rxjs@5.5.2/operators/mergeAll.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var mergeAll_1 = $__require("npm:rxjs@5.5.2/operators/mergeAll.js");
  function concatAll() {
    return mergeAll_1.mergeAll(1);
  }
  exports.concatAll = concatAll;
});
System.registerDynamic('npm:rxjs@5.5.2/observable/concat.js', ['npm:rxjs@5.5.2/util/isScheduler.js', 'npm:rxjs@5.5.2/observable/of.js', 'npm:rxjs@5.5.2/observable/from.js', 'npm:rxjs@5.5.2/operators/concatAll.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var isScheduler_1 = $__require('npm:rxjs@5.5.2/util/isScheduler.js');
  var of_1 = $__require('npm:rxjs@5.5.2/observable/of.js');
  var from_1 = $__require('npm:rxjs@5.5.2/observable/from.js');
  var concatAll_1 = $__require('npm:rxjs@5.5.2/operators/concatAll.js');
  function concat() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    if (observables.length === 1 || observables.length === 2 && isScheduler_1.isScheduler(observables[1])) {
      return from_1.from(observables[0]);
    }
    return concatAll_1.concatAll()(of_1.of.apply(void 0, observables));
  }
  exports.concat = concat;
});
System.registerDynamic("npm:rxjs@5.5.2/util/isScheduler.js", [], true, function ($__require, exports, module) {
    /* */
    "use strict";

    var global = this || self,
        GLOBAL = global;
    function isScheduler(value) {
        return value && typeof value.schedule === 'function';
    }
    exports.isScheduler = isScheduler;
    
});
System.registerDynamic('npm:rxjs@5.5.2/operators/startWith.js', ['npm:rxjs@5.5.2/observable/ArrayObservable.js', 'npm:rxjs@5.5.2/observable/ScalarObservable.js', 'npm:rxjs@5.5.2/observable/EmptyObservable.js', 'npm:rxjs@5.5.2/observable/concat.js', 'npm:rxjs@5.5.2/util/isScheduler.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var ArrayObservable_1 = $__require('npm:rxjs@5.5.2/observable/ArrayObservable.js');
  var ScalarObservable_1 = $__require('npm:rxjs@5.5.2/observable/ScalarObservable.js');
  var EmptyObservable_1 = $__require('npm:rxjs@5.5.2/observable/EmptyObservable.js');
  var concat_1 = $__require('npm:rxjs@5.5.2/observable/concat.js');
  var isScheduler_1 = $__require('npm:rxjs@5.5.2/util/isScheduler.js');
  function startWith() {
    var array = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      array[_i - 0] = arguments[_i];
    }
    return function (source) {
      var scheduler = array[array.length - 1];
      if (isScheduler_1.isScheduler(scheduler)) {
        array.pop();
      } else {
        scheduler = null;
      }
      var len = array.length;
      if (len === 1) {
        return concat_1.concat(new ScalarObservable_1.ScalarObservable(array[0], scheduler), source);
      } else if (len > 1) {
        return concat_1.concat(new ArrayObservable_1.ArrayObservable(array, scheduler), source);
      } else {
        return concat_1.concat(new EmptyObservable_1.EmptyObservable(scheduler), source);
      }
    };
  }
  exports.startWith = startWith;
});
System.registerDynamic("npm:rxjs@5.5.2/operator/startWith.js", ["npm:rxjs@5.5.2/operators/startWith.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var startWith_1 = $__require("npm:rxjs@5.5.2/operators/startWith.js");
  function startWith() {
    var array = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      array[_i - 0] = arguments[_i];
    }
    return startWith_1.startWith.apply(void 0, array)(this);
  }
  exports.startWith = startWith;
});
System.registerDynamic('npm:rxjs@5.5.2/add/operator/startWith.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/operator/startWith.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var startWith_1 = $__require('npm:rxjs@5.5.2/operator/startWith.js');
  Observable_1.Observable.prototype.startWith = startWith_1.startWith;
});
System.registerDynamic('npm:rxjs@5.5.2/operators/withLatestFrom.js', ['npm:rxjs@5.5.2/OuterSubscriber.js', 'npm:rxjs@5.5.2/util/subscribeToResult.js'], true, function ($__require, exports, module) {
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
  var OuterSubscriber_1 = $__require('npm:rxjs@5.5.2/OuterSubscriber.js');
  var subscribeToResult_1 = $__require('npm:rxjs@5.5.2/util/subscribeToResult.js');
  function withLatestFrom() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i - 0] = arguments[_i];
    }
    return function (source) {
      var project;
      if (typeof args[args.length - 1] === 'function') {
        project = args.pop();
      }
      var observables = args;
      return source.lift(new WithLatestFromOperator(observables, project));
    };
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
System.registerDynamic("npm:rxjs@5.5.2/operator/withLatestFrom.js", ["npm:rxjs@5.5.2/operators/withLatestFrom.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var withLatestFrom_1 = $__require("npm:rxjs@5.5.2/operators/withLatestFrom.js");
  function withLatestFrom() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i - 0] = arguments[_i];
    }
    return withLatestFrom_1.withLatestFrom.apply(void 0, args)(this);
  }
  exports.withLatestFrom = withLatestFrom;
});
System.registerDynamic('npm:rxjs@5.5.2/add/operator/withLatestFrom.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/operator/withLatestFrom.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var withLatestFrom_1 = $__require('npm:rxjs@5.5.2/operator/withLatestFrom.js');
  Observable_1.Observable.prototype.withLatestFrom = withLatestFrom_1.withLatestFrom;
});
System.registerDynamic("npm:rxjs@5.5.2/scheduler/QueueAction.js", ["npm:rxjs@5.5.2/scheduler/AsyncAction.js"], true, function ($__require, exports, module) {
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
  var AsyncAction_1 = $__require("npm:rxjs@5.5.2/scheduler/AsyncAction.js");
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
System.registerDynamic("npm:rxjs@5.5.2/scheduler/QueueScheduler.js", ["npm:rxjs@5.5.2/scheduler/AsyncScheduler.js"], true, function ($__require, exports, module) {
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
  var AsyncScheduler_1 = $__require("npm:rxjs@5.5.2/scheduler/AsyncScheduler.js");
  var QueueScheduler = function (_super) {
    __extends(QueueScheduler, _super);
    function QueueScheduler() {
      _super.apply(this, arguments);
    }
    return QueueScheduler;
  }(AsyncScheduler_1.AsyncScheduler);
  exports.QueueScheduler = QueueScheduler;
});
System.registerDynamic('npm:rxjs@5.5.2/scheduler/queue.js', ['npm:rxjs@5.5.2/scheduler/QueueAction.js', 'npm:rxjs@5.5.2/scheduler/QueueScheduler.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var QueueAction_1 = $__require('npm:rxjs@5.5.2/scheduler/QueueAction.js');
  var QueueScheduler_1 = $__require('npm:rxjs@5.5.2/scheduler/QueueScheduler.js');
  exports.queue = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);
});
System.registerDynamic('npm:rxjs@5.5.2/Notification.js', ['npm:rxjs@5.5.2/Observable.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
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
      return Notification.undefinedValueNotification;
    };
    Notification.createError = function (err) {
      return new Notification('E', undefined, err);
    };
    Notification.createComplete = function () {
      return Notification.completeNotification;
    };
    Notification.completeNotification = new Notification('C');
    Notification.undefinedValueNotification = new Notification('N', undefined);
    return Notification;
  }();
  exports.Notification = Notification;
});
System.registerDynamic('npm:rxjs@5.5.2/operators/observeOn.js', ['npm:rxjs@5.5.2/Subscriber.js', 'npm:rxjs@5.5.2/Notification.js'], true, function ($__require, exports, module) {
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
  var Subscriber_1 = $__require('npm:rxjs@5.5.2/Subscriber.js');
  var Notification_1 = $__require('npm:rxjs@5.5.2/Notification.js');
  function observeOn(scheduler, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return function observeOnOperatorFunction(source) {
      return source.lift(new ObserveOnOperator(scheduler, delay));
    };
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
System.registerDynamic('npm:rxjs@5.5.2/ReplaySubject.js', ['npm:rxjs@5.5.2/Subject.js', 'npm:rxjs@5.5.2/scheduler/queue.js', 'npm:rxjs@5.5.2/Subscription.js', 'npm:rxjs@5.5.2/operators/observeOn.js', 'npm:rxjs@5.5.2/util/ObjectUnsubscribedError.js', 'npm:rxjs@5.5.2/SubjectSubscription.js'], true, function ($__require, exports, module) {
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
  var Subject_1 = $__require('npm:rxjs@5.5.2/Subject.js');
  var queue_1 = $__require('npm:rxjs@5.5.2/scheduler/queue.js');
  var Subscription_1 = $__require('npm:rxjs@5.5.2/Subscription.js');
  var observeOn_1 = $__require('npm:rxjs@5.5.2/operators/observeOn.js');
  var ObjectUnsubscribedError_1 = $__require('npm:rxjs@5.5.2/util/ObjectUnsubscribedError.js');
  var SubjectSubscription_1 = $__require('npm:rxjs@5.5.2/SubjectSubscription.js');
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
System.registerDynamic('npm:rxjs@5.5.2/operators/publishReplay.js', ['npm:rxjs@5.5.2/ReplaySubject.js', 'npm:rxjs@5.5.2/operators/multicast.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var ReplaySubject_1 = $__require('npm:rxjs@5.5.2/ReplaySubject.js');
  var multicast_1 = $__require('npm:rxjs@5.5.2/operators/multicast.js');
  function publishReplay(bufferSize, windowTime, selectorOrScheduler, scheduler) {
    if (selectorOrScheduler && typeof selectorOrScheduler !== 'function') {
      scheduler = selectorOrScheduler;
    }
    var selector = typeof selectorOrScheduler === 'function' ? selectorOrScheduler : undefined;
    var subject = new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler);
    return function (source) {
      return multicast_1.multicast(function () {
        return subject;
      }, selector)(source);
    };
  }
  exports.publishReplay = publishReplay;
});
System.registerDynamic("npm:rxjs@5.5.2/operator/publishReplay.js", ["npm:rxjs@5.5.2/operators/publishReplay.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var publishReplay_1 = $__require("npm:rxjs@5.5.2/operators/publishReplay.js");
  function publishReplay(bufferSize, windowTime, selectorOrScheduler, scheduler) {
    return publishReplay_1.publishReplay(bufferSize, windowTime, selectorOrScheduler, scheduler)(this);
  }
  exports.publishReplay = publishReplay;
});
System.registerDynamic('npm:rxjs@5.5.2/add/operator/publishReplay.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/operator/publishReplay.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var publishReplay_1 = $__require('npm:rxjs@5.5.2/operator/publishReplay.js');
  Observable_1.Observable.prototype.publishReplay = publishReplay_1.publishReplay;
});
System.registerDynamic('npm:rxjs@5.5.2/observable/ConnectableObservable.js', ['npm:rxjs@5.5.2/Subject.js', 'npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/Subscriber.js', 'npm:rxjs@5.5.2/Subscription.js', 'npm:rxjs@5.5.2/operators/refCount.js'], true, function ($__require, exports, module) {
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
  var Subject_1 = $__require('npm:rxjs@5.5.2/Subject.js');
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var Subscriber_1 = $__require('npm:rxjs@5.5.2/Subscriber.js');
  var Subscription_1 = $__require('npm:rxjs@5.5.2/Subscription.js');
  var refCount_1 = $__require('npm:rxjs@5.5.2/operators/refCount.js');
  var ConnectableObservable = function (_super) {
    __extends(ConnectableObservable, _super);
    function ConnectableObservable(source, subjectFactory) {
      _super.call(this);
      this.source = source;
      this.subjectFactory = subjectFactory;
      this._refCount = 0;
      this._isComplete = false;
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
        this._isComplete = false;
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
      return refCount_1.refCount()(this);
    };
    return ConnectableObservable;
  }(Observable_1.Observable);
  exports.ConnectableObservable = ConnectableObservable;
  var connectableProto = ConnectableObservable.prototype;
  exports.connectableObservableDescriptor = {
    operator: { value: null },
    _refCount: {
      value: 0,
      writable: true
    },
    _subject: {
      value: null,
      writable: true
    },
    _connection: {
      value: null,
      writable: true
    },
    _subscribe: { value: connectableProto._subscribe },
    _isComplete: {
      value: connectableProto._isComplete,
      writable: true
    },
    getSubject: { value: connectableProto.getSubject },
    connect: { value: connectableProto.connect },
    refCount: { value: connectableProto.refCount }
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
      this.connectable._isComplete = true;
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
System.registerDynamic('npm:rxjs@5.5.2/operators/multicast.js', ['npm:rxjs@5.5.2/observable/ConnectableObservable.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var ConnectableObservable_1 = $__require('npm:rxjs@5.5.2/observable/ConnectableObservable.js');
  function multicast(subjectOrSubjectFactory, selector) {
    return function multicastOperatorFunction(source) {
      var subjectFactory;
      if (typeof subjectOrSubjectFactory === 'function') {
        subjectFactory = subjectOrSubjectFactory;
      } else {
        subjectFactory = function subjectFactory() {
          return subjectOrSubjectFactory;
        };
      }
      if (typeof selector === 'function') {
        return source.lift(new MulticastOperator(subjectFactory, selector));
      }
      var connectable = Object.create(source, ConnectableObservable_1.connectableObservableDescriptor);
      connectable.source = source;
      connectable.subjectFactory = subjectFactory;
      return connectable;
    };
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
System.registerDynamic("npm:rxjs@5.5.2/operators/refCount.js", ["npm:rxjs@5.5.2/Subscriber.js"], true, function ($__require, exports, module) {
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
  var Subscriber_1 = $__require("npm:rxjs@5.5.2/Subscriber.js");
  function refCount() {
    return function refCountOperatorFunction(source) {
      return source.lift(new RefCountOperator(source));
    };
  }
  exports.refCount = refCount;
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
System.registerDynamic('npm:rxjs@5.5.2/util/ObjectUnsubscribedError.js', [], true, function ($__require, exports, module) {
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
System.registerDynamic("npm:rxjs@5.5.2/SubjectSubscription.js", ["npm:rxjs@5.5.2/Subscription.js"], true, function ($__require, exports, module) {
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
  var Subscription_1 = $__require("npm:rxjs@5.5.2/Subscription.js");
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
System.registerDynamic('npm:rxjs@5.5.2/Subject.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/Subscriber.js', 'npm:rxjs@5.5.2/Subscription.js', 'npm:rxjs@5.5.2/util/ObjectUnsubscribedError.js', 'npm:rxjs@5.5.2/SubjectSubscription.js', 'npm:rxjs@5.5.2/symbol/rxSubscriber.js'], true, function ($__require, exports, module) {
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
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var Subscriber_1 = $__require('npm:rxjs@5.5.2/Subscriber.js');
  var Subscription_1 = $__require('npm:rxjs@5.5.2/Subscription.js');
  var ObjectUnsubscribedError_1 = $__require('npm:rxjs@5.5.2/util/ObjectUnsubscribedError.js');
  var SubjectSubscription_1 = $__require('npm:rxjs@5.5.2/SubjectSubscription.js');
  var rxSubscriber_1 = $__require('npm:rxjs@5.5.2/symbol/rxSubscriber.js');
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
    Subject.prototype[rxSubscriber_1.rxSubscriber] = function () {
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
System.registerDynamic('npm:rxjs@5.5.2/operators/share.js', ['npm:rxjs@5.5.2/operators/multicast.js', 'npm:rxjs@5.5.2/operators/refCount.js', 'npm:rxjs@5.5.2/Subject.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var multicast_1 = $__require('npm:rxjs@5.5.2/operators/multicast.js');
  var refCount_1 = $__require('npm:rxjs@5.5.2/operators/refCount.js');
  var Subject_1 = $__require('npm:rxjs@5.5.2/Subject.js');
  function shareSubjectFactory() {
    return new Subject_1.Subject();
  }
  function share() {
    return function (source) {
      return refCount_1.refCount()(multicast_1.multicast(shareSubjectFactory)(source));
    };
  }
  exports.share = share;
  ;
});
System.registerDynamic("npm:rxjs@5.5.2/operator/share.js", ["npm:rxjs@5.5.2/operators/share.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var share_1 = $__require("npm:rxjs@5.5.2/operators/share.js");
  function share() {
    return share_1.share()(this);
  }
  exports.share = share;
  ;
});
System.registerDynamic('npm:rxjs@5.5.2/add/operator/share.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/operator/share.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var share_1 = $__require('npm:rxjs@5.5.2/operator/share.js');
  Observable_1.Observable.prototype.share = share_1.share;
});
System.registerDynamic("npm:rxjs@5.5.2/util/isDate.js", [], true, function ($__require, exports, module) {
    /* */
    "use strict";

    var global = this || self,
        GLOBAL = global;
    function isDate(value) {
        return value instanceof Date && !isNaN(+value);
    }
    exports.isDate = isDate;
    
});
System.registerDynamic('npm:rxjs@5.5.2/operators/timeoutWith.js', ['npm:rxjs@5.5.2/scheduler/async.js', 'npm:rxjs@5.5.2/util/isDate.js', 'npm:rxjs@5.5.2/OuterSubscriber.js', 'npm:rxjs@5.5.2/util/subscribeToResult.js'], true, function ($__require, exports, module) {
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
  var async_1 = $__require('npm:rxjs@5.5.2/scheduler/async.js');
  var isDate_1 = $__require('npm:rxjs@5.5.2/util/isDate.js');
  var OuterSubscriber_1 = $__require('npm:rxjs@5.5.2/OuterSubscriber.js');
  var subscribeToResult_1 = $__require('npm:rxjs@5.5.2/util/subscribeToResult.js');
  function timeoutWith(due, withObservable, scheduler) {
    if (scheduler === void 0) {
      scheduler = async_1.async;
    }
    return function (source) {
      var absoluteTimeout = isDate_1.isDate(due);
      var waitFor = absoluteTimeout ? +due - scheduler.now() : Math.abs(due);
      return source.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
    };
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
      _super.call(this, destination);
      this.absoluteTimeout = absoluteTimeout;
      this.waitFor = waitFor;
      this.withObservable = withObservable;
      this.scheduler = scheduler;
      this.action = null;
      this.scheduleTimeout();
    }
    TimeoutWithSubscriber.dispatchTimeout = function (subscriber) {
      var withObservable = subscriber.withObservable;
      subscriber._unsubscribeAndRecycle();
      subscriber.add(subscribeToResult_1.subscribeToResult(subscriber, withObservable));
    };
    TimeoutWithSubscriber.prototype.scheduleTimeout = function () {
      var action = this.action;
      if (action) {
        this.action = action.schedule(this, this.waitFor);
      } else {
        this.add(this.action = this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, this));
      }
    };
    TimeoutWithSubscriber.prototype._next = function (value) {
      if (!this.absoluteTimeout) {
        this.scheduleTimeout();
      }
      _super.prototype._next.call(this, value);
    };
    TimeoutWithSubscriber.prototype._unsubscribe = function () {
      this.action = null;
      this.scheduler = null;
      this.withObservable = null;
    };
    return TimeoutWithSubscriber;
  }(OuterSubscriber_1.OuterSubscriber);
});
System.registerDynamic('npm:rxjs@5.5.2/operator/timeoutWith.js', ['npm:rxjs@5.5.2/scheduler/async.js', 'npm:rxjs@5.5.2/operators/timeoutWith.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var async_1 = $__require('npm:rxjs@5.5.2/scheduler/async.js');
  var timeoutWith_1 = $__require('npm:rxjs@5.5.2/operators/timeoutWith.js');
  function timeoutWith(due, withObservable, scheduler) {
    if (scheduler === void 0) {
      scheduler = async_1.async;
    }
    return timeoutWith_1.timeoutWith(due, withObservable, scheduler)(this);
  }
  exports.timeoutWith = timeoutWith;
});
System.registerDynamic('npm:rxjs@5.5.2/add/operator/timeoutWith.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/operator/timeoutWith.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var timeoutWith_1 = $__require('npm:rxjs@5.5.2/operator/timeoutWith.js');
  Observable_1.Observable.prototype.timeoutWith = timeoutWith_1.timeoutWith;
});
System.registerDynamic("npm:rxjs@5.5.2/OuterSubscriber.js", ["npm:rxjs@5.5.2/Subscriber.js"], true, function ($__require, exports, module) {
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
  var Subscriber_1 = $__require("npm:rxjs@5.5.2/Subscriber.js");
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
System.registerDynamic("npm:rxjs@5.5.2/util/isArrayLike.js", [], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.isArrayLike = function (x) {
    return x && typeof x.length === 'number';
  };
  
});
System.registerDynamic('npm:rxjs@5.5.2/util/isPromise.js', [], true, function ($__require, exports, module) {
    /* */
    "use strict";

    var global = this || self,
        GLOBAL = global;
    function isPromise(value) {
        return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
    }
    exports.isPromise = isPromise;
    
});
System.registerDynamic('npm:rxjs@5.5.2/symbol/iterator.js', ['npm:rxjs@5.5.2/util/root.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var root_1 = $__require('npm:rxjs@5.5.2/util/root.js');
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
  exports.iterator = symbolIteratorPonyfill(root_1.root);
  exports.$$iterator = exports.iterator;
});
System.registerDynamic("npm:rxjs@5.5.2/InnerSubscriber.js", ["npm:rxjs@5.5.2/Subscriber.js"], true, function ($__require, exports, module) {
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
  var Subscriber_1 = $__require("npm:rxjs@5.5.2/Subscriber.js");
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
System.registerDynamic('npm:rxjs@5.5.2/util/subscribeToResult.js', ['npm:rxjs@5.5.2/util/root.js', 'npm:rxjs@5.5.2/util/isArrayLike.js', 'npm:rxjs@5.5.2/util/isPromise.js', 'npm:rxjs@5.5.2/util/isObject.js', 'npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/symbol/iterator.js', 'npm:rxjs@5.5.2/InnerSubscriber.js', 'npm:rxjs@5.5.2/symbol/observable.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var root_1 = $__require('npm:rxjs@5.5.2/util/root.js');
  var isArrayLike_1 = $__require('npm:rxjs@5.5.2/util/isArrayLike.js');
  var isPromise_1 = $__require('npm:rxjs@5.5.2/util/isPromise.js');
  var isObject_1 = $__require('npm:rxjs@5.5.2/util/isObject.js');
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var iterator_1 = $__require('npm:rxjs@5.5.2/symbol/iterator.js');
  var InnerSubscriber_1 = $__require('npm:rxjs@5.5.2/InnerSubscriber.js');
  var observable_1 = $__require('npm:rxjs@5.5.2/symbol/observable.js');
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
        destination.syncErrorThrowable = true;
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
    } else if (result && typeof result[iterator_1.iterator] === 'function') {
      var iterator = result[iterator_1.iterator]();
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
    } else if (result && typeof result[observable_1.observable] === 'function') {
      var obs = result[observable_1.observable]();
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
System.registerDynamic('npm:rxjs@5.5.2/operators/takeUntil.js', ['npm:rxjs@5.5.2/OuterSubscriber.js', 'npm:rxjs@5.5.2/util/subscribeToResult.js'], true, function ($__require, exports, module) {
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
  var OuterSubscriber_1 = $__require('npm:rxjs@5.5.2/OuterSubscriber.js');
  var subscribeToResult_1 = $__require('npm:rxjs@5.5.2/util/subscribeToResult.js');
  function takeUntil(notifier) {
    return function (source) {
      return source.lift(new TakeUntilOperator(notifier));
    };
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
System.registerDynamic("npm:rxjs@5.5.2/operator/takeUntil.js", ["npm:rxjs@5.5.2/operators/takeUntil.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var takeUntil_1 = $__require("npm:rxjs@5.5.2/operators/takeUntil.js");
  function takeUntil(notifier) {
    return takeUntil_1.takeUntil(notifier)(this);
  }
  exports.takeUntil = takeUntil;
});
System.registerDynamic('npm:rxjs@5.5.2/add/operator/takeUntil.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/operator/takeUntil.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var takeUntil_1 = $__require('npm:rxjs@5.5.2/operator/takeUntil.js');
  Observable_1.Observable.prototype.takeUntil = takeUntil_1.takeUntil;
});
System.registerDynamic("npm:rxjs@5.5.2/observable/EmptyObservable.js", ["npm:rxjs@5.5.2/Observable.js"], true, function ($__require, exports, module) {
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
  var Observable_1 = $__require("npm:rxjs@5.5.2/Observable.js");
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
System.registerDynamic('npm:rxjs@5.5.2/operators/repeat.js', ['npm:rxjs@5.5.2/Subscriber.js', 'npm:rxjs@5.5.2/observable/EmptyObservable.js'], true, function ($__require, exports, module) {
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
  var Subscriber_1 = $__require('npm:rxjs@5.5.2/Subscriber.js');
  var EmptyObservable_1 = $__require('npm:rxjs@5.5.2/observable/EmptyObservable.js');
  function repeat(count) {
    if (count === void 0) {
      count = -1;
    }
    return function (source) {
      if (count === 0) {
        return new EmptyObservable_1.EmptyObservable();
      } else if (count < 0) {
        return source.lift(new RepeatOperator(-1, source));
      } else {
        return source.lift(new RepeatOperator(count - 1, source));
      }
    };
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
System.registerDynamic("npm:rxjs@5.5.2/operator/repeat.js", ["npm:rxjs@5.5.2/operators/repeat.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var repeat_1 = $__require("npm:rxjs@5.5.2/operators/repeat.js");
  function repeat(count) {
    if (count === void 0) {
      count = -1;
    }
    return repeat_1.repeat(count)(this);
  }
  exports.repeat = repeat;
});
System.registerDynamic('npm:rxjs@5.5.2/add/operator/repeat.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/operator/repeat.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var repeat_1 = $__require('npm:rxjs@5.5.2/operator/repeat.js');
  Observable_1.Observable.prototype.repeat = repeat_1.repeat;
});
System.registerDynamic('npm:rxjs@5.5.2/util/toSubscriber.js', ['npm:rxjs@5.5.2/Subscriber.js', 'npm:rxjs@5.5.2/symbol/rxSubscriber.js', 'npm:rxjs@5.5.2/Observer.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Subscriber_1 = $__require('npm:rxjs@5.5.2/Subscriber.js');
  var rxSubscriber_1 = $__require('npm:rxjs@5.5.2/symbol/rxSubscriber.js');
  var Observer_1 = $__require('npm:rxjs@5.5.2/Observer.js');
  function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
      if (nextOrObserver instanceof Subscriber_1.Subscriber) {
        return nextOrObserver;
      }
      if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {
        return nextOrObserver[rxSubscriber_1.rxSubscriber]();
      }
    }
    if (!nextOrObserver && !error && !complete) {
      return new Subscriber_1.Subscriber(Observer_1.empty);
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
  }
  exports.toSubscriber = toSubscriber;
});
System.registerDynamic('npm:rxjs@5.5.2/symbol/observable.js', ['npm:rxjs@5.5.2/util/root.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var root_1 = $__require('npm:rxjs@5.5.2/util/root.js');
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
  exports.observable = getSymbolObservable(root_1.root);
  exports.$$observable = exports.observable;
});
System.registerDynamic("npm:rxjs@5.5.2/util/noop.js", [], true, function ($__require, exports, module) {
  /* */
  "use strict";
  /* tslint:disable:no-empty */

  var global = this || self,
      GLOBAL = global;
  function noop() {}
  exports.noop = noop;
  
});
System.registerDynamic("npm:rxjs@5.5.2/util/pipe.js", ["npm:rxjs@5.5.2/util/noop.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var noop_1 = $__require("npm:rxjs@5.5.2/util/noop.js");
  function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      fns[_i - 0] = arguments[_i];
    }
    return pipeFromArray(fns);
  }
  exports.pipe = pipe;
  function pipeFromArray(fns) {
    if (!fns) {
      return noop_1.noop;
    }
    if (fns.length === 1) {
      return fns[0];
    }
    return function piped(input) {
      return fns.reduce(function (prev, fn) {
        return fn(prev);
      }, input);
    };
  }
  exports.pipeFromArray = pipeFromArray;
});
System.registerDynamic('npm:rxjs@5.5.2/Observable.js', ['npm:rxjs@5.5.2/util/root.js', 'npm:rxjs@5.5.2/util/toSubscriber.js', 'npm:rxjs@5.5.2/symbol/observable.js', 'npm:rxjs@5.5.2/util/pipe.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var root_1 = $__require('npm:rxjs@5.5.2/util/root.js');
  var toSubscriber_1 = $__require('npm:rxjs@5.5.2/util/toSubscriber.js');
  var observable_1 = $__require('npm:rxjs@5.5.2/symbol/observable.js');
  var pipe_1 = $__require('npm:rxjs@5.5.2/util/pipe.js');
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
        sink.add(this.source ? this._subscribe(sink) : this._trySubscribe(sink));
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
        var subscription;
        subscription = _this.subscribe(function (value) {
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
    Observable.prototype[observable_1.observable] = function () {
      return this;
    };
    Observable.prototype.pipe = function () {
      var operations = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        operations[_i - 0] = arguments[_i];
      }
      if (operations.length === 0) {
        return this;
      }
      return pipe_1.pipeFromArray(operations)(this);
    };
    Observable.prototype.toPromise = function (PromiseCtor) {
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
        var value;
        _this.subscribe(function (x) {
          return value = x;
        }, function (err) {
          return reject(err);
        }, function () {
          return resolve(value);
        });
      });
    };
    Observable.create = function (subscribe) {
      return new Observable(subscribe);
    };
    return Observable;
  }();
  exports.Observable = Observable;
});
System.registerDynamic("npm:rxjs@5.5.2/scheduler/Action.js", ["npm:rxjs@5.5.2/Subscription.js"], true, function ($__require, exports, module) {
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
  var Subscription_1 = $__require("npm:rxjs@5.5.2/Subscription.js");
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
System.registerDynamic('npm:rxjs@5.5.2/scheduler/AsyncAction.js', ['npm:rxjs@5.5.2/util/root.js', 'npm:rxjs@5.5.2/scheduler/Action.js'], true, function ($__require, exports, module) {
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
  var root_1 = $__require('npm:rxjs@5.5.2/util/root.js');
  var Action_1 = $__require('npm:rxjs@5.5.2/scheduler/Action.js');
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
      if (delay !== null && this.delay === delay && this.pending === false) {
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
      this.state = null;
      this.pending = false;
      this.scheduler = null;
      if (index !== -1) {
        actions.splice(index, 1);
      }
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, null);
      }
      this.delay = null;
    };
    return AsyncAction;
  }(Action_1.Action);
  exports.AsyncAction = AsyncAction;
});
System.registerDynamic("npm:rxjs@5.5.2/Scheduler.js", ["github:jspm/nodelibs-process@0.1.2.js"], true, function ($__require, exports, module) {
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
System.registerDynamic("npm:rxjs@5.5.2/scheduler/AsyncScheduler.js", ["npm:rxjs@5.5.2/Scheduler.js"], true, function ($__require, exports, module) {
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
  var Scheduler_1 = $__require("npm:rxjs@5.5.2/Scheduler.js");
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
System.registerDynamic('npm:rxjs@5.5.2/scheduler/async.js', ['npm:rxjs@5.5.2/scheduler/AsyncAction.js', 'npm:rxjs@5.5.2/scheduler/AsyncScheduler.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var AsyncAction_1 = $__require('npm:rxjs@5.5.2/scheduler/AsyncAction.js');
  var AsyncScheduler_1 = $__require('npm:rxjs@5.5.2/scheduler/AsyncScheduler.js');
  exports.async = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
});
System.registerDynamic("npm:rxjs@5.5.2/util/isArray.js", [], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.isArray = Array.isArray || function (x) {
    return x && typeof x.length === 'number';
  };
  
});
System.registerDynamic("npm:rxjs@5.5.2/util/isObject.js", [], true, function ($__require, exports, module) {
    /* */
    "use strict";

    var global = this || self,
        GLOBAL = global;
    function isObject(x) {
        return x != null && typeof x === 'object';
    }
    exports.isObject = isObject;
    
});
System.registerDynamic("npm:rxjs@5.5.2/util/isFunction.js", [], true, function ($__require, exports, module) {
    /* */
    "use strict";

    var global = this || self,
        GLOBAL = global;
    function isFunction(x) {
        return typeof x === 'function';
    }
    exports.isFunction = isFunction;
    
});
System.registerDynamic("npm:rxjs@5.5.2/util/tryCatch.js", ["npm:rxjs@5.5.2/util/errorObject.js"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var errorObject_1 = $__require("npm:rxjs@5.5.2/util/errorObject.js");
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
System.registerDynamic("npm:rxjs@5.5.2/util/errorObject.js", [], true, function ($__require, exports, module) {
  /* */
  "use strict";
  // typeof any so that it we don't have to cast when comparing a result to the error object

  var global = this || self,
      GLOBAL = global;
  exports.errorObject = { e: {} };
  
});
System.registerDynamic("npm:rxjs@5.5.2/util/UnsubscriptionError.js", [], true, function ($__require, exports, module) {
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
System.registerDynamic('npm:process@0.11.10/browser.js', [], true, function ($__require, exports, module) {
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
    process.prependListener = noop;
    process.prependOnceListener = noop;

    process.listeners = function (name) {
        return [];
    };

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
System.registerDynamic("npm:process@0.11.10.js", ["npm:process@0.11.10/browser.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("npm:process@0.11.10/browser.js");
});
System.registerDynamic('github:jspm/nodelibs-process@0.1.2/index.js', ['npm:process@0.11.10.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = System._nodeRequire ? process : $__require('npm:process@0.11.10.js');
});
System.registerDynamic("github:jspm/nodelibs-process@0.1.2.js", ["github:jspm/nodelibs-process@0.1.2/index.js"], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  module.exports = $__require("github:jspm/nodelibs-process@0.1.2/index.js");
});
System.registerDynamic('npm:rxjs@5.5.2/Subscription.js', ['npm:rxjs@5.5.2/util/isArray.js', 'npm:rxjs@5.5.2/util/isObject.js', 'npm:rxjs@5.5.2/util/isFunction.js', 'npm:rxjs@5.5.2/util/tryCatch.js', 'npm:rxjs@5.5.2/util/errorObject.js', 'npm:rxjs@5.5.2/util/UnsubscriptionError.js', 'github:jspm/nodelibs-process@0.1.2.js'], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    "use strict";

    var isArray_1 = $__require('npm:rxjs@5.5.2/util/isArray.js');
    var isObject_1 = $__require('npm:rxjs@5.5.2/util/isObject.js');
    var isFunction_1 = $__require('npm:rxjs@5.5.2/util/isFunction.js');
    var tryCatch_1 = $__require('npm:rxjs@5.5.2/util/tryCatch.js');
    var errorObject_1 = $__require('npm:rxjs@5.5.2/util/errorObject.js');
    var UnsubscriptionError_1 = $__require('npm:rxjs@5.5.2/util/UnsubscriptionError.js');
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
System.registerDynamic("npm:rxjs@5.5.2/Observer.js", [], true, function ($__require, exports, module) {
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
System.registerDynamic('npm:rxjs@5.5.2/util/root.js', [], true, function ($__require, exports, module) {
    /* */
    "use strict";
    // CommonJS / Node have global context exposed as "global" variable.
    // We don't want to include the whole node.d.ts this this compilation unit so we'll just fake
    // the global "global" var for now.

    var global = this || self,
        GLOBAL = global;
    var __window = typeof window !== 'undefined' && window;
    var __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope && self;
    var __global = typeof global !== 'undefined' && global;
    var _root = __window || __global || __self;
    exports.root = _root;
    // Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.
    // This is needed when used with angular/tsickle which inserts a goog.module statement.
    // Wrap in IIFE
    (function () {
        if (!_root) {
            throw new Error('RxJS could not find any global context (window, self, global)');
        }
    })();
    
});
System.registerDynamic('npm:rxjs@5.5.2/symbol/rxSubscriber.js', ['npm:rxjs@5.5.2/util/root.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var root_1 = $__require('npm:rxjs@5.5.2/util/root.js');
  var Symbol = root_1.root.Symbol;
  exports.rxSubscriber = typeof Symbol === 'function' && typeof Symbol.for === 'function' ? Symbol.for('rxSubscriber') : '@@rxSubscriber';
  exports.$$rxSubscriber = exports.rxSubscriber;
});
System.registerDynamic('npm:rxjs@5.5.2/Subscriber.js', ['npm:rxjs@5.5.2/util/isFunction.js', 'npm:rxjs@5.5.2/Subscription.js', 'npm:rxjs@5.5.2/Observer.js', 'npm:rxjs@5.5.2/symbol/rxSubscriber.js'], true, function ($__require, exports, module) {
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
  var isFunction_1 = $__require('npm:rxjs@5.5.2/util/isFunction.js');
  var Subscription_1 = $__require('npm:rxjs@5.5.2/Subscription.js');
  var Observer_1 = $__require('npm:rxjs@5.5.2/Observer.js');
  var rxSubscriber_1 = $__require('npm:rxjs@5.5.2/symbol/rxSubscriber.js');
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
    Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function () {
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
        next = observerOrNext.next;
        error = observerOrNext.error;
        complete = observerOrNext.complete;
        if (observerOrNext !== Observer_1.empty) {
          context = Object.create(observerOrNext);
          if (isFunction_1.isFunction(context.unsubscribe)) {
            this.add(context.unsubscribe.bind(context));
          }
          context.unsubscribe = this.unsubscribe.bind(this);
        }
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
      var _this = this;
      if (!this.isStopped) {
        var _parentSubscriber = this._parentSubscriber;
        if (this._complete) {
          var wrappedComplete = function () {
            return _this._complete.call(_this._context);
          };
          if (!_parentSubscriber.syncErrorThrowable) {
            this.__tryOrUnsub(wrappedComplete);
            this.unsubscribe();
          } else {
            this.__tryOrSetError(_parentSubscriber, wrappedComplete);
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
System.registerDynamic('npm:rxjs@5.5.2/operators/map.js', ['npm:rxjs@5.5.2/Subscriber.js'], true, function ($__require, exports, module) {
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
  var Subscriber_1 = $__require('npm:rxjs@5.5.2/Subscriber.js');
  function map(project, thisArg) {
    return function mapOperation(source) {
      if (typeof project !== 'function') {
        throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
      }
      return source.lift(new MapOperator(project, thisArg));
    };
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
System.registerDynamic('npm:rxjs@5.5.2/operators/timestamp.js', ['npm:rxjs@5.5.2/scheduler/async.js', 'npm:rxjs@5.5.2/operators/map.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var async_1 = $__require('npm:rxjs@5.5.2/scheduler/async.js');
  var map_1 = $__require('npm:rxjs@5.5.2/operators/map.js');
  function timestamp(scheduler) {
    if (scheduler === void 0) {
      scheduler = async_1.async;
    }
    return map_1.map(function (value) {
      return new Timestamp(value, scheduler.now());
    });
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
});
System.registerDynamic('npm:rxjs@5.5.2/operator/timestamp.js', ['npm:rxjs@5.5.2/scheduler/async.js', 'npm:rxjs@5.5.2/operators/timestamp.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var async_1 = $__require('npm:rxjs@5.5.2/scheduler/async.js');
  var timestamp_1 = $__require('npm:rxjs@5.5.2/operators/timestamp.js');
  function timestamp(scheduler) {
    if (scheduler === void 0) {
      scheduler = async_1.async;
    }
    return timestamp_1.timestamp(scheduler)(this);
  }
  exports.timestamp = timestamp;
});
System.registerDynamic('npm:rxjs@5.5.2/add/operator/timestamp.js', ['npm:rxjs@5.5.2/Observable.js', 'npm:rxjs@5.5.2/operator/timestamp.js'], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('npm:rxjs@5.5.2/Observable.js');
  var timestamp_1 = $__require('npm:rxjs@5.5.2/operator/timestamp.js');
  Observable_1.Observable.prototype.timestamp = timestamp_1.timestamp;
});
System.registerDynamic("src-reactive-calculator/app/utility.js", [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    function numberWithCommas(x) {
        if (typeof x !== 'string') {
            x = x.toString();
        }
        var parts = x.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
    exports.numberWithCommas = numberWithCommas;
});
System.registerDynamic("src-reactive-calculator/app/calculator.js", ["src-reactive-calculator/css/calculator.css!github:systemjs/plugin-css@0.1.36.js", "github:MikeMcl/decimal.js@7.3.0.js", "npm:rxjs@5.5.2/Observable.js", "npm:rxjs@5.5.2/add/observable/from.js", "npm:rxjs@5.5.2/add/observable/of.js", "npm:rxjs@5.5.2/add/observable/empty.js", "npm:rxjs@5.5.2/add/observable/fromEvent.js", "npm:rxjs@5.5.2/add/observable/merge.js", "npm:rxjs@5.5.2/add/observable/zip.js", "npm:rxjs@5.5.2/add/observable/timer.js", "npm:rxjs@5.5.2/add/operator/map.js", "npm:rxjs@5.5.2/add/operator/mapTo.js", "npm:rxjs@5.5.2/add/operator/filter.js", "npm:rxjs@5.5.2/add/operator/mergeMap.js", "npm:rxjs@5.5.2/add/operator/mergeMapTo.js", "npm:rxjs@5.5.2/add/operator/mergeAll.js", "npm:rxjs@5.5.2/add/operator/scan.js", "npm:rxjs@5.5.2/add/operator/do.js", "npm:rxjs@5.5.2/add/operator/startWith.js", "npm:rxjs@5.5.2/add/operator/withLatestFrom.js", "npm:rxjs@5.5.2/add/operator/publishReplay.js", "npm:rxjs@5.5.2/add/operator/share.js", "npm:rxjs@5.5.2/add/operator/timeoutWith.js", "npm:rxjs@5.5.2/add/operator/takeUntil.js", "npm:rxjs@5.5.2/add/operator/repeat.js", "npm:rxjs@5.5.2/add/operator/timestamp.js", "src-reactive-calculator/app/utility.js"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    $__require("src-reactive-calculator/css/calculator.css!github:systemjs/plugin-css@0.1.36.js");
    var Decimal = $__require("github:MikeMcl/decimal.js@7.3.0.js");
    var Observable_1 = $__require("npm:rxjs@5.5.2/Observable.js");
    $__require("npm:rxjs@5.5.2/add/observable/from.js");
    $__require("npm:rxjs@5.5.2/add/observable/of.js");
    $__require("npm:rxjs@5.5.2/add/observable/empty.js");
    $__require("npm:rxjs@5.5.2/add/observable/fromEvent.js");
    $__require("npm:rxjs@5.5.2/add/observable/merge.js");
    $__require("npm:rxjs@5.5.2/add/observable/zip.js");
    $__require("npm:rxjs@5.5.2/add/observable/timer.js");
    $__require("npm:rxjs@5.5.2/add/operator/map.js");
    $__require("npm:rxjs@5.5.2/add/operator/mapTo.js");
    $__require("npm:rxjs@5.5.2/add/operator/filter.js");
    $__require("npm:rxjs@5.5.2/add/operator/mergeMap.js");
    $__require("npm:rxjs@5.5.2/add/operator/mergeMapTo.js");
    $__require("npm:rxjs@5.5.2/add/operator/mergeAll.js");
    $__require("npm:rxjs@5.5.2/add/operator/scan.js");
    $__require("npm:rxjs@5.5.2/add/operator/do.js");
    $__require("npm:rxjs@5.5.2/add/operator/startWith.js");
    $__require("npm:rxjs@5.5.2/add/operator/withLatestFrom.js");
    $__require("npm:rxjs@5.5.2/add/operator/publishReplay.js");
    $__require("npm:rxjs@5.5.2/add/operator/share.js");
    $__require("npm:rxjs@5.5.2/add/operator/timeoutWith.js");
    $__require("npm:rxjs@5.5.2/add/operator/takeUntil.js");
    $__require("npm:rxjs@5.5.2/add/operator/repeat.js");
    $__require("npm:rxjs@5.5.2/add/operator/timestamp.js");
    var utility_1 = $__require("src-reactive-calculator/app/utility.js");
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
    // let keypad:[KeyType, KeyValue, string][]= [
    var buttonsConfig = [[2 /* Clear */, 17 /* C */, 'AC'], [0 /* Number */, 11 /* PlusMinus */, '±'], [0 /* Number */, 12 /* Percent */, '%'], [1 /* Operator */, 16 /* Divide */, '÷'], [0 /* Number */, 7 /* Seven */, '7'], [0 /* Number */, 8 /* Eight */, '8'], [0 /* Number */, 9 /* Nine */, '9'], [1 /* Operator */, 15 /* Multiply */, '×'], [0 /* Number */, 4 /* Four */, '4'], [0 /* Number */, 5 /* Five */, '5'], [0 /* Number */, 6 /* Six */, '6'], [1 /* Operator */, 14 /* Subtract */, '-'], [0 /* Number */, 1 /* One */, '1'], [0 /* Number */, 2 /* Two */, '2'], [0 /* Number */, 3 /* Three */, '3'], [1 /* Operator */, 13 /* Add */, '+'], [0 /* Number */, 0 /* Zero */, '0'], [0 /* Number */, 10 /* Point */, '.'], [3 /* Enter */, 18 /* Enter */, '=']];
    var Calculator = /** @class */function () {
        function Calculator(container) {
            this.container = container;
            this.timeout = 5000;
            this.render();
            this.initObservables();
            this.subscribe();
        }
        // 0, 1, ~ 9, ., C/AC, +, -, X, /, =
        Calculator.prototype.render = function () {
            var buttonsHTML = buttonsConfig.map(function (keypad) {
                var keytype = keypad[0],
                    keyvalue = keypad[1],
                    text = keypad[2];
                var optionalClass = keyvalue === 0 /* Zero */ ? ' calc-double' : '';
                return "<button class=\"calc-button" + optionalClass + "\" >" + text + "</button>";
            }).join('');
            this.container.innerHTML = "\n            <div class=\"calc-container\">\n                    <div class=\"calc-display calc-active-display\">\n                        <div class=\"calc-first\">\n                        </div>\n                    </div>\n                    <div class=\"calc-display\">\n                        <div class=\"calc-operator\">\n                        </div>\n                        <div class=\"calc-second\">\n                        </div>\n                    </div>\n                    <div class=\"calc-keypad\">\n                        " + buttonsHTML + "\n                    </div>\n            </div>\n        ";
            this.firstOperandEl = this.container.querySelector('.calc-first');
            this.operatorEl = this.container.querySelector('.calc-operator');
            this.secondOperandEl = this.container.querySelector('.calc-second');
            this.firstDisplayEl = this.container.querySelectorAll('.calc-display').item(0);
            this.secondDisplayEl = this.container.querySelectorAll('.calc-display').item(1);
            ;
            this.clearButtonEl = this.container.querySelector('button');
        };
        Calculator.prototype.initObservables = function () {
            this.initButtonsObservable();
            this.initOperandObservable();
        };
        Calculator.prototype.initButtonsObservable = function () {
            var _this = this;
            var buttonObservables = buttonsConfig.map(function (_a, index) {
                var keyType = _a[0],
                    keyValue = _a[1],
                    _ = _a[2];
                var button = _this.container.querySelectorAll('.calc-button')[index];
                return Observable_1.Observable.fromEvent(button, 'click').mapTo([keyType, keyValue]);
            });
            var buttonsOb = Observable_1.Observable.merge(buttonObservables).mergeAll();
            this.buttonsObservable = buttonsOb.share();
        };
        Calculator.prototype.initOperandObservable = function () {
            var _this = this;
            var resetFnOb = this.buttonsObservable.filter(function (_a) {
                var keyType = _a[0],
                    _ = _a[1];
                return keyType == 1 /* Operator */ || keyType == 3 /* Enter */ ? true : false;
            }).mapTo(function (state) {
                state.inputMode = 0 /* Decimal */;
                state.valueString = '0';
                state.propagate = false;
                return state;
            });
            var clearFnOb = this.buttonsObservable.filter(function (_a) {
                var _ = _a[0],
                    keyValue = _a[1];
                return keyValue == 17 /* C */ ? true : false;
            }).mapTo(function (state) {
                state.inputMode = 0 /* Decimal */;
                state.valueString = '0';
                state.propagate = true;
                return state;
            });
            var percentFnOb = this.buttonsObservable.filter(function (_a) {
                var _ = _a[0],
                    keyValue = _a[1];
                return keyValue == 12 /* Percent */ ? true : false;
            }).mapTo(function (state) {
                state.inputMode = 1 /* Percent */;
                state.valueString = new Decimal(state.valueString).div(100).valueOf();
                state.propagate = true;
                return state;
            });
            var pointFnOb = this.buttonsObservable.filter(function (_a) {
                var _ = _a[0],
                    keyValue = _a[1];
                return keyValue == 10 /* Point */ ? true : false;
            }).mapTo(function (state) {
                if (state.inputMode == 0 /* Decimal */) {
                        state.inputMode = 2 /* Point */;
                        state.valueString = state.valueString + '.';
                    } else if (state.inputMode == 1 /* Percent */) {
                        state.inputMode = 2 /* Point */;
                        state.valueString = '0.';
                    } else {
                    // ignore
                }
                state.propagate = true;
                return state;
            });
            var signFnOb = this.buttonsObservable.filter(function (_a) {
                var _ = _a[0],
                    keyValue = _a[1];
                return keyValue == 11 /* PlusMinus */ ? true : false;
            }).mapTo(function (state) {
                var isPlus = state.valueString[0] != '-';
                state.valueString = isPlus ? '-' + state.valueString : state.valueString.slice(1);
                state.propagate = true;
                return state;
            });
            var numberFnOb = this.buttonsObservable.filter(function (_a) {
                var _ = _a[0],
                    keyValue = _a[1];
                return keyValue >= 0 /* Zero */ && keyValue <= 9 /* Nine */ ? true : false;
            }).map(function (_a) {
                var _ = _a[0],
                    keyValue = _a[1];
                return function (state) {
                    switch (state.inputMode) {
                        case 0 /* Decimal */:
                            if (state.valueString == '0' || state.valueString == '-0') state.valueString = state.valueString.slice(state.valueString.length - 0);
                        // pass through
                        case 2 /* Point */:
                            state.valueString += keyValue.toString();
                            break;
                        case 1 /* Percent */:
                            state.valueString = keyValue.toString();
                            state.inputMode = 0 /* Decimal */;
                            break;
                    }
                    state.propagate = true;
                    return state;
                };
            });
            this.operandObservable = Observable_1.Observable.merge(resetFnOb, percentFnOb, clearFnOb, pointFnOb, signFnOb, numberFnOb).mergeMap(function (changeFn) {
                var source = Observable_1.Observable.of(changeFn);
                var timeout = Observable_1.Observable.timer(_this.timeout).mapTo(function (state) {
                    state.inputMode = 0 /* Decimal */;
                    state.valueString = '0';
                    state.propagate = false;
                    return state;
                }).do(function (value) {
                    return console.log('timeout => C');
                }).takeUntil(_this.buttonsObservable);
                return Observable_1.Observable.merge(source, timeout);
            }).scan(function (state, changeFn) {
                var newState = changeFn(state);
                return newState;
            }, {
                inputMode: 0 /* Decimal */
                , isMinus: false,
                valueString: '0',
                propagate: true
            }).do(function (state) {
                _this.updateClearButtonText(state.valueString == '0' || state.valueString == '-0' ? 'AC' : 'C');
            }).mergeMap(function (state) {
                return state.propagate ? Observable_1.Observable.of(state.valueString) : Observable_1.Observable.empty();
            });
        };
        Calculator.prototype.subscribe = function () {
            //                      N            +         = 
            //  WaitFirst      ChangeFirst  WaitSecond     -
            //  ChangeFirst         -       WaitSecond  WaitFirst
            //  WaitSecond     ChangeSecond      -      WaitFirst
            //  ChangeSecond        -       WaitSecond  WaitFirst
            var _this = this;
            var operand = this.operandObservable.map(function (operand) {
                return function (state) {
                    console.log("---- operand : " + operand);
                    if (state.skipOperand) {
                        state.skipOperand = false;
                        return state;
                    }
                    switch (state.step) {
                        case 0 /* WaitFirst */:
                            state.step = 1 /* ChangeFirst */;
                        // path through
                        case 1 /* ChangeFirst */:
                            state.first = operand;
                            break;
                        case 2 /* WaitSecond */:
                            state.step = 3 /* ChangeSecond */;
                        // path through
                        case 3 /* ChangeSecond */:
                            state.second = operand;
                            break;
                    }
                    return state;
                };
            });
            var enter = this.buttonsObservable.filter(function (_a) {
                var keyType = _a[0],
                    _ = _a[1];
                return keyType == 3 /* Enter */ ? true : false;
            }).map(function (_a) {
                var _ = _a[0],
                    keyValue = _a[1];
                return function (state) {
                    console.log("---- enter");
                    if (state.step == 2 /* WaitSecond */) state.second = state.first;
                    state.first = _this.decimalOperation(state.first, state.second, state.operator);
                    state.step = 0 /* WaitFirst */;
                    return state;
                };
            });
            var clear = this.buttonsObservable.filter(function (_a) {
                var keyType = _a[0],
                    _ = _a[1];
                return keyType == 2 /* Clear */ ? true : false;
            }).map(function (_a) {
                var _ = _a[0],
                    keyValue = _a[1];
                return function (state) {
                    console.log("---- clear");
                    if ((state.step == 0 /* WaitFirst */ || state.step == 1 /* ChangeFirst */) && (state.first == '0' || state.first == '-0') || (state.step == 2 /* WaitSecond */ || state.step == 3 /* ChangeSecond */) && (state.second == '0' || state.second == '-0')) {
                        state.first = '0';
                        state.second = '0';
                        state.step = 0 /* WaitFirst */;
                        state.operator = 13 /* Add */;
                        state.skipOperand = true;
                    }
                    return state;
                };
            });
            var operator = this.buttonsObservable.filter(function (_a) {
                var keyType = _a[0],
                    _ = _a[1];
                return keyType == 1 /* Operator */ ? true : false;
            }).map(function (_a) {
                var _ = _a[0],
                    keyValue = _a[1];
                return function (state) {
                    console.log("---- operator " + keyValue);
                    if (state.step == 3 /* ChangeSecond */) state.first = _this.decimalOperation(state.first, state.second, keyValue);
                    state.step = 2 /* WaitSecond */;
                    state.operator = keyValue;
                    return state;
                };
            });
            Observable_1.Observable.merge(clear, enter, operator, operand).mergeMap(function (changeFn) {
                var source = Observable_1.Observable.of(changeFn);
                var timeout = Observable_1.Observable.timer(_this.timeout).mapTo(function (state) {
                    state.first = '0';
                    state.second = '0';
                    state.step = 0 /* WaitFirst */;
                    state.operator = 13 /* Add */;
                    state.skipOperand = false;
                    return state;
                }).do(function (value) {
                    return console.log('timeout => AC');
                }).takeUntil(_this.buttonsObservable);
                return Observable_1.Observable.merge(source, timeout);
            }).scan(function (state, changeFn) {
                // console.log('\n>>>> BEFORE ');
                // console.log(state);
                var newState = changeFn(state);
                // console.log('<<<< AFTER ');
                // console.log(newState);
                return newState;
            }, {
                step: 0 /* WaitFirst */
                , first: '0',
                second: '0',
                operator: 13 /* Add */
                , skipOperand: false
            }).startWith({
                step: 0 /* WaitFirst */
                , first: '0',
                second: '0',
                operator: 13 /* Add */
            }).subscribe(function (state) {
                _this.changeActiveDisplay(state.step == 0 /* WaitFirst */ || state.step == 1 /* ChangeFirst */ ? true : false);
                _this.updateFirstOperand(state.first);
                _this.updateOperator(state.operator == 13 /* Add */ ? '+' : state.operator == 14 /* Subtract */ ? '-' : state.operator == 15 /* Multiply */ ? '×' : '÷');
                _this.updateSecondOperand(state.second);
            });
        };
        Calculator.prototype.updateFirstOperand = function (value) {
            this.firstOperandEl.innerText = utility_1.numberWithCommas(value);
        };
        Calculator.prototype.updateOperator = function (value) {
            this.operatorEl.innerText = value;
        };
        Calculator.prototype.updateSecondOperand = function (value) {
            this.secondOperandEl.innerText = utility_1.numberWithCommas(value);
        };
        Calculator.prototype.updateClearButtonText = function (value) {
            this.clearButtonEl.innerText = value;
        };
        Calculator.prototype.changeActiveDisplay = function (isFirst) {
            if (isFirst) {
                this.firstDisplayEl.classList.add('calc-active-display');
                this.secondDisplayEl.classList.remove('calc-active-display');
            } else {
                this.secondDisplayEl.classList.add('calc-active-display');
                this.firstDisplayEl.classList.remove('calc-active-display');
            }
        };
        Calculator.prototype.decimalOperation = function (first, second, operator) {
            var result;
            switch (operator) {
                case 13 /* Add */:
                    result = new Decimal(first).plus(second).valueOf();
                    break;
                case 14 /* Subtract */:
                    result = new Decimal(first).minus(second).valueOf();
                    break;
                case 15 /* Multiply */:
                    result = new Decimal(first).times(second).valueOf();
                    break;
                case 16 /* Divide */:
                    result = new Decimal(first).dividedBy(second).valueOf();
                    break;
                default:
                    console.log('ERROR: unexpected operator');
                    break;
            }
            return result;
        };
        return Calculator;
    }();
    exports.Calculator = Calculator;
});
System.registerDynamic("src-reactive-calculator/app/main.js", ["npm:domready@1.0.8.js", "src-reactive-calculator/app/calculator.js"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    var domready = $__require("npm:domready@1.0.8.js");
    var calculator_1 = $__require("src-reactive-calculator/app/calculator.js");
    domready(function () {
        var container = document.body.querySelector('#calculator');
        var calculator = new calculator_1.Calculator(container);
    });
});
(function(c){if (typeof document == 'undefined') return; var d=document,a='appendChild',i='styleSheet',s=d.createElement('style');s.type='text/css';d.getElementsByTagName('head')[0][a](s);s[a](d.createTextNode(c));})
("#calculator,#diagram{float:left}#diagram img{width:600px}.calc-container{-ms-flex-flow:row wrap;flex-flow:row wrap;width:277px}.calc-container,.calc-display{display:-webkit-box;display:-ms-flexbox;display:flex}.calc-display{min-height:65px;margin-bottom:4px;border:1px solid darkred;-webkit-box-flex:100%;-ms-flex:100%;flex:100%}.calc-active-display{border:2px solid darkred!important}.calc-first{-webkit-box-flex:1;-ms-flex:1;flex:1}.calc-operator{-webkit-box-flex:10%;-ms-flex:10%;flex:10%}.calc-second{-webkit-box-flex:90%;-ms-flex:90%;flex:90%}.calc-first,.calc-operator,.calc-second{line-height:65px;font-size:30px;text-align:right}.calc-keypad{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-flow:row wrap;flex-flow:row wrap;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-line-pack:justify;align-content:space-between;height:340px}.calc-button{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto;box-sizing:border-box;line-height:65px;text-align:center;font-size:30px;border:1px solid darkred;width:23.38%;height:19.06%}button.calc-double{width:48.92%}\n/*# sourceMappingURL=__.css.map */");
//# sourceMappingURL=build.js.map