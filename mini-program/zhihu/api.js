const { JSDOM } = require("jsdom");
const dom = new JSDOM("<!DOCTYPE html><p>Hello world</p>", {
  url: "https://www.zhihu.com/search",
});
// const { EPub } = require("@mr-huang/html-to-epub");
var crypto = require("crypto");
const { default: axios } = require("axios");
const { saveBookInfo, saveBookData, normalTitle, downloadFile } = require("./saveBookInfo");
const cheerio = require('cheerio');
const path = require("path");
const { sleep } = require("../../libs/request");
const fs = require("fs");
window = dom.window;
document = window.document;
navigator = window.navigator;
location = window.location;
history = window.history;
screen = window.screen;
alert = window.alert;
window._resourceLoader = undefined;
window._sessionHistory = undefined;

Math.random = function () {
  return 0.5;
};

// window = new Proxy(window, {
//   set(target, property, value, receiver) {
//     console.log("设置属性set window", property, typeof value);
//     return Reflect.set(...arguments);
//   },
//   get(target, property, receiver) {
//     console.log("获取属性get window", property, typeof target[property]);
//     return target[property];
//   },
// });
// document = new Proxy(document, {
//   set(target, property, value, receiver) {
//     console.log("设置属性set document", property, typeof value);
//     return Reflect.set(...arguments);
//   },
//   get(target, property, receiver) {
//     console.log("获取属性get document", property, typeof target[property]);
//     return target[property];
//   },
// });
// navigator = new Proxy(navigator, {
//   set(target, property, value, receiver) {
//     console.log("设置属性set navigator", property, typeof value);
//     return Reflect.set(...arguments);
//   },
//   get(target, property, receiver) {
//     console.log("获取属性get navigator", property, typeof target[property]);
//     return target[property];
//   },
// });
// location = new Proxy(location, {
//   set(target, property, value, receiver) {
//     console.log("设置属性set location", property, typeof value);
//     return Reflect.set(...arguments);
//   },
//   get(target, property, receiver) {
//     console.log("获取属性get location", property, typeof target[property]);
//     return target[property];
//   },
// });
// history = new Proxy(history, {
//   set(target, property, value, receiver) {
//     console.log("设置属性set history", property, typeof value);
//     return Reflect.set(...arguments);
//   },
//   get(target, property, receiver) {
//     console.log("获取属性get history", property, typeof target[property]);
//     return target[property];
//   },
// });
// screen = new Proxy(screen, {
//   set(target, property, value, receiver) {
//     console.log("设置属性set screen", property, typeof value);
//     return Reflect.set(...arguments);
//   },
//   get(target, property, receiver) {
//     console.log("获取属性get screen", property, typeof target[property]);
//     return target[property];
//   },
// });

var Object_toString = Object.prototype.toString;
Object.prototype.toString = function () {
  let _temp = Object_toString.call(this, arguments);
  console.log(this);
  console.log("Object.prototype.toString: " + _temp);
  if (this.constructor.name === "Document") {
    return "[object HTMLDocument]";
  } else if (this.constructor.name === "CanvasRenderingContext2D") {
    return "[object CanvasRenderingContext2D]";
  }
  console.log("====================", _temp);
  return _temp;
};

var Function_toString = Function.prototype.toString;
Function.prototype.toString = function () {
  let _temp = Function_toString.call(this, arguments);
  console.log(this.name);
  console.log("Function.prototype.toString: " + _temp);
  if (this.name === "Window") {
    return "function Window() { [native code] }";
  }
  return _temp;
};

function _typeof(u) {
  return (_typeof =
    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
      ? function (u) {
          return typeof u;
        }
      : function (u) {
          return u &&
            "function" == typeof Symbol &&
            u.constructor === Symbol &&
            u !== Symbol.prototype
            ? "symbol"
            : typeof u;
        })(u);
}
function o(u) {
  return (o =
    "function" == typeof Symbol && "symbol" == _typeof(Symbol.A)
      ? function (u) {
          return _typeof(u);
        }
      : function (u) {
          return u &&
            "function" == typeof Symbol &&
            u.constructor === Symbol &&
            u !== Symbol.prototype
            ? "symbol"
            : _typeof(u);
        })(u);
}
function x(u) {
  return C(u) || s(u) || t();
}
function C(u) {
  if (Array.isArray(u)) {
    for (var f = 0, p = new Array(u.length); f < u.length; f++) p[f] = u[f];
    return p;
  }
}
function s(u) {
  if (
    Symbol.A in Object(u) ||
    "[object Arguments]" === Object.prototype.toString.call(u)
  )
    return Array.from(u);
}
function t() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
// __webpack_unused_export__ = { value: !0 };
var A = "3.0",
  S = "undefined" != typeof window ? window : {},
  h;
function i(u, f, p) {
  (f[p] = 255 & (u >>> 24)),
    (f[p + 1] = 255 & (u >>> 16)),
    (f[p + 2] = 255 & (u >>> 8)),
    (f[p + 3] = 255 & u);
}
function B(u, f) {
  return (
    ((255 & u[f]) << 24) |
    ((255 & u[f + 1]) << 16) |
    ((255 & u[f + 2]) << 8) |
    (255 & u[f + 3])
  );
}
function Q(u, f) {
  return ((4294967295 & u) << f) | (u >>> (32 - f));
}
function G(u) {
  var f = new Array(4),
    p = new Array(4);
  i(u, f, 0),
    (p[0] = h.zb[255 & f[0]]),
    (p[1] = h.zb[255 & f[1]]),
    (p[2] = h.zb[255 & f[2]]),
    (p[3] = h.zb[255 & f[3]]);
  var d = B(p, 0);
  return d ^ Q(d, 2) ^ Q(d, 10) ^ Q(d, 18) ^ Q(d, 24);
}
var __g = {
  x: function (u, f) {
    for (var p = [], d = u.length, y = 0; 0 < d; d -= 16) {
      for (
        var m = u.slice(16 * y, 16 * (y + 1)), v = new Array(16), _ = 0;
        _ < 16;
        _++
      )
        v[_] = m[_] ^ f[_];
      (f = __g.r(v)), (p = p.concat(f)), y++;
    }
    return p;
  },
  r: function (u) {
    var f = new Array(16),
      p = new Array(36);
    (p[0] = B(u, 0)), (p[1] = B(u, 4)), (p[2] = B(u, 8)), (p[3] = B(u, 12));
    for (var d = 0; d < 32; d++) {
      var y = G(p[d + 1] ^ p[d + 2] ^ p[d + 3] ^ h.zk[d]);
      p[d + 4] = p[d] ^ y;
    }
    return i(p[35], f, 0), i(p[34], f, 4), i(p[33], f, 8), i(p[32], f, 12), f;
  },
};
function l() {
  (this.C = [0, 0, 0, 0]),
    (this.s = +[]),
    (this.t = []),
    (this.S = []),
    (this.h = []),
    (this.i = []),
    (this.B = []),
    (this.Q = !1),
    (this.G = []),
    (this.D = []),
    (this.w = 1024),
    (this.g = null),
    (this.a = Date.now()),
    (this.e = +[]),
    (this.T = 255),
    (this.V = null),
    (this.U = Date.now),
    (this.M = new Array(32));
}
l.prototype.O = function (A, C, s) {
  for (
    var t, S, h, i, B, Q, G, D, w, g, a, e, E, T, r, V, U, M, O, c, I;
    this.T < this.w;

  )
    try {
      switch (this.T) {
        case 27:
          (this.C[this.c] = this.C[this.I] >> this.C[this.F]),
            (this.M[12] = 35),
            (this.T = this.T * (this.C.length + (this.M[13] ? 3 : 9)) + 1);
          break;
        case 34:
          (this.C[this.c] = this.C[this.I] & this.C[this.F]),
            (this.T = this.T * (this.M[15] - 6) + 12);
          break;
        case 41:
          (this.C[this.c] = this.C[this.I] <= this.C[this.F]),
            (this.T = 8 * this.T + 27);
          break;
        case 48:
          (this.C[this.c] = !this.C[this.I]), (this.T = 7 * this.T + 16);
          break;
        case 50:
          (this.C[this.c] = this.C[this.I] | this.C[this.F]),
            (this.T = 6 * this.T + 52);
          break;
        case 57:
          (this.C[this.c] = this.C[this.I] >>> this.C[this.F]),
            (this.T = 7 * this.T - 47);
          break;
        case 64:
          (this.C[this.c] = this.C[this.I] << this.C[this.F]),
            (this.T = 5 * this.T + 32);
          break;
        case 71:
          (this.C[this.c] = this.C[this.I] ^ this.C[this.F]),
            (this.T = 6 * this.T - 74);
          break;
        case 78:
          (this.C[this.c] = this.C[this.I] & this.C[this.F]),
            (this.T = 4 * this.T + 40);
          break;
        case 80:
          (this.C[this.c] = this.C[this.I] < this.C[this.F]),
            (this.T = 5 * this.T - 48);
          break;
        case 87:
          (this.C[this.c] = -this.C[this.I]), (this.T = 3 * this.T + 91);
          break;
        case 94:
          (this.C[this.c] = this.C[this.I] > this.C[this.F]),
            (this.T = 4 * this.T - 24);
          break;
        case 101:
          (this.C[this.c] = this.C[this.I] in this.C[this.F]),
            (this.T = 3 * this.T + 49);
          break;
        case 108:
          (this.C[this.c] = o(this.C[this.I])), (this.T = 2 * this.T + 136);
          break;
        case 110:
          (this.C[this.c] = this.C[this.I] !== this.C[this.F]), (this.T += 242);
          break;
        case 117:
          (this.C[this.c] = this.C[this.I] && this.C[this.F]),
            (this.T = 3 * this.T + 1);
          break;
        case 124:
          (this.C[this.c] = this.C[this.I] || this.C[this.F]), (this.T += 228);
          break;
        case 131:
          (this.C[this.c] = this.C[this.I] >= this.C[this.F]),
            (this.T = 3 * this.T - 41);
          break;
        case 138:
          (this.C[this.c] = this.C[this.I] == this.C[this.F]),
            (this.T = 2 * this.T + 76);
          break;
        case 140:
          (this.C[this.c] = this.C[this.I] % this.C[this.F]), (this.T += 212);
          break;
        case 147:
          (this.C[this.c] = this.C[this.I] / this.C[this.F]), (this.T += 205);
          break;
        case 154:
          (this.C[this.c] = this.C[this.I] * this.C[this.F]), (this.T += 198);
          break;
        case 161:
          (this.C[this.c] = this.C[this.I] - this.C[this.F]), (this.T += 191);
          break;
        case 168:
          (this.C[this.c] = this.C[this.I] + this.C[this.F]),
            (this.T = 2 * this.T + 16);
          break;
        case 254:
          (this.C[this.c] = eval(i)), (this.T += 20 < this.M[11] ? 98 : 89);
          break;
        case 255:
          (this.s = C || 0), (this.M[26] = 52), (this.T += this.M[13] ? 8 : 6);
          break;
        case 258:
          g = {};
          for (var F = 0; F < this.k; F++)
            (e = this.i.pop()), (a = this.i.pop()), (g[a] = e);
          (this.C[this.W] = g), (this.T += 94);
          break;
        case 261:
          (this.D = s || []), (this.M[11] = 68), (this.T += this.M[26] ? 3 : 5);
          break;
        case 264:
          (this.M[15] = 16), (this.T = "string" == typeof A ? 331 : 336);
          break;
        case 266:
          (this.C[this.I][i] = this.i.pop()), (this.T += 86);
          break;
        case 278:
          (this.C[this.c] = this.C[this.I][i]),
            (this.T += this.M[22] ? 63 : 74);
          break;
        case 283:
          this.C[this.c] = eval(String.fromCharCode(this.C[this.I]));
          break;
        case 300:
          (S = this.U()), (this.M[0] = 66), (this.T += this.M[11]);
          break;
        case 331:
          (D = atob(A)),
            (w =
              (D.charCodeAt(0) << 16) |
              (D.charCodeAt(1) << 8) |
              D.charCodeAt(2));
          for (var k = 3; k < w + 3; k += 3)
            this.G.push(
              (D.charCodeAt(k) << 16) |
                (D.charCodeAt(k + 1) << 8) |
                D.charCodeAt(k + 2)
            );
          for (V = w + 3; V < D.length; )
            (E = (D.charCodeAt(V) << 8) | D.charCodeAt(V + 1)),
              (T = D.slice(V + 2, V + 2 + E)),
              this.D.push(T),
              (V += E + 2);
          (this.M[21] = 8), (this.T += 1e3 < V ? 21 : 35);
          break;
        case 336:
          (this.G = A),
            (this.D = s),
            (this.M[18] = 134),
            (this.T += this.M[15]);
          break;
        case 344:
          this.T = 3 * this.T - 8;
          break;
        case 350:
          (U = 66), (M = []), (I = this.D[this.k]);
          for (var W = 0; W < I.length; W++)
            M.push(String.fromCharCode(24 ^ I.charCodeAt(W) ^ U)),
              (U = 24 ^ I.charCodeAt(W) ^ U);
          (r = parseInt(M.join("").split("|")[1])),
            (this.C[this.W] = this.i.slice(this.i.length - r)),
            (this.i = this.i.slice(0, this.i.length - r)),
            (this.T += 2);
          break;
        case 352:
          (this.e = this.G[this.s++]), (this.T -= this.M[26]);
          break;
        case 360:
          (this.a = S), (this.T += this.M[0]);
          break;
        case 368:
          this.T -= 500 < S - this.a ? 24 : 8;
          break;
        case 380:
          this.i.push(16383 & this.e), (this.T -= 28);
          break;
        case 400:
          this.i.push(this.S[16383 & this.e]), (this.T -= 48);
          break;
        case 408:
          this.T -= 64;
          break;
        case 413:
          (this.C[(this.e >> 15) & 7] =
            ((this.e >> 18) & 1) == +[]
              ? 32767 & this.e
              : this.S[32767 & this.e]),
            (this.T -= 61);
          break;
        case 418:
          (this.S[65535 & this.e] = this.C[(this.e >> 16) & 7]),
            (this.T -= this.e >> 16 < 20 ? 66 : 80);
          break;
        case 423:
          (this.c = (this.e >> 16) & 7),
            (this.I = (this.e >> 13) & 7),
            (this.F = (this.e >> 10) & 7),
            (this.J = 1023 & this.e),
            (this.T -= 255 + 6 * this.J + (this.J % 5));
          break;
        case 426:
          this.T += 5 * (this.e >> 19) - 18;
          break;
        case 428:
          (this.W = (this.e >> 16) & 7),
            (this.k = 65535 & this.e),
            this.t.push(this.s),
            this.h.push(this.S),
            (this.s = this.C[this.W]),
            (this.S = []);
          for (var J = 0; J < this.k; J++) this.S.unshift(this.i.pop());
          this.B.push(this.i), (this.i = []), (this.T -= 76);
          break;
        case 433:
          (this.s = this.t.pop()),
            (this.S = this.h.pop()),
            (this.i = this.B.pop()),
            (this.T -= 81);
          break;
        case 438:
          (this.Q = this.C[(this.e >> 16) & 7]), (this.T -= 86);
          break;
        case 440:
          (U = 66), (M = []), (I = this.D[16383 & this.e]);
          for (var b = 0; b < I.length; b++)
            M.push(String.fromCharCode(24 ^ I.charCodeAt(b) ^ U)),
              (U = 24 ^ I.charCodeAt(b) ^ U);
          (M = M.join("").split("|")),
            (O = parseInt(M.shift())),
            this.i.push(
              O === +[]
                ? M.join("|")
                : O === +!+[]
                ? -1 !== M.join().indexOf(".")
                  ? parseInt(M.join())
                  : parseFloat(M.join())
                : O === !+[] + !+[]
                ? eval(M.join())
                : 3 === O
                ? null
                : void 0
            ),
            (this.T -= 88);
          break;
        case 443:
          (this.b = (this.e >> 2) & 65535),
            (this.J = 3 & this.e),
            this.J === +[]
              ? (this.s = this.b)
              : this.J === +!+[]
              ? !!this.Q && (this.s = this.b)
              : 2 === this.J
              ? !this.Q && (this.s = this.b)
              : (this.s = this.b),
            (this.g = null),
            (this.T -= 91);
          break;
        case 445:
          this.i.push(this.C[(this.e >> 14) & 7]), (this.T -= 93);
          break;
        case 448:
          (this.W = (this.e >> 16) & 7),
            (this.k = (this.e >> 2) & 4095),
            (this.J = 3 & this.e),
            (Q = this.J === +!+[] && this.i.pop()),
            (G = this.i.slice(this.i.length - this.k, this.i.length)),
            (this.i = this.i.slice(0, this.i.length - this.k)),
            (c = 2 < G.length ? 3 : G.length),
            (this.T += 6 * this.J + 1 + 10 * c);
          break;
        case 449:
          (this.C[3] = this.C[this.W]()), (this.T -= 97 - G.length);
          break;
        case 455:
          (this.C[3] = this.C[this.W][Q]()), (this.T -= 103 + G.length);
          break;
        case 453:
          (B = (this.e >> 17) & 3),
            (this.T =
              B === +[]
                ? 445
                : B === +!+[]
                ? 380
                : B === !+[] + !+[]
                ? 400
                : 440);
          break;
        case 458:
          (this.J = (this.e >> 17) & 3),
            (this.c = (this.e >> 14) & 7),
            (this.I = (this.e >> 11) & 7),
            (i = this.i.pop()),
            (this.T -= 12 * this.J + 180);
          break;
        case 459:
          (this.C[3] = this.C[this.W](G[+[]])), (this.T -= 100 + 7 * G.length);
          break;
        case 461:
          (this.C[3] = new this.C[this.W]()), (this.T -= 109 - G.length);
          break;
        case 463:
          (U = 66), (M = []), (I = this.D[65535 & this.e]);
          for (var n = 0; n < I.length; n++)
            M.push(String.fromCharCode(24 ^ I.charCodeAt(n) ^ U)),
              (U = 24 ^ I.charCodeAt(n) ^ U);
          (M = M.join("").split("|")),
            (O = parseInt(M.shift())),
            (this.T += 10 * O + 3);
          break;
        case 465:
          (this.C[3] = this.C[this.W][Q](G[+[]])),
            (this.T -= 13 * G.length + 100);
          break;
        case 466:
          (this.C[(this.e >> 16) & 7] = M.join("|")),
            (this.T -= 114 * M.length);
          break;
        case 468:
          (this.g = 65535 & this.e), (this.T -= 116);
          break;
        case 469:
          (this.C[3] = this.C[this.W](G[+[]], G[1])),
            (this.T -= 119 - G.length);
          break;
        case 471:
          (this.C[3] = new this.C[this.W](G[+[]])), (this.T -= 118 + G.length);
          break;
        case 473:
          throw this.C[(this.e >> 16) & 7];
        case 475:
          (this.C[3] = this.C[this.W][Q](G[+[]], G[1])), (this.T -= 123);
          break;
        case 476:
          (this.C[(this.e >> 16) & 7] =
            -1 !== M.join().indexOf(".")
              ? parseInt(M.join())
              : parseFloat(M.join())),
            (this.T -= this.M[21] < 10 ? 124 : 126);
          break;
        case 478:
          (t = [0].concat(x(this.S))),
            (this.V = 65535 & this.e),
            (h = this),
            (this.C[3] = function (u) {
              var f = new l();
              return (f.S = t), (f.S[0] = u), f.O(h.G, h.V, h.D), f.C[3];
            }),
            (this.T -= 50 < this.M[3] ? 120 : 126);
          break;
        case 479:
          (this.C[3] = this.C[this.W].apply(null, G)),
            (this.M[3] = 168),
            (this.T -= this.M[9] ? 127 : 128);
          break;
        case 481:
          (this.C[3] = new this.C[this.W](G[+[]], G[1])),
            (this.T -= 10 * G.length + 109);
          break;
        case 483:
          (this.J = (this.e >> 15) & 15),
            (this.W = (this.e >> 12) & 7),
            (this.k = 4095 & this.e),
            (this.T = 0 === this.J ? 258 : 350);
          break;
        case 485:
          (this.C[3] = this.C[this.W][Q].apply(null, G)),
            (this.T -= this.M[15] % 2 == 1 ? 143 : 133);
          break;
        case 486:
          (this.C[(this.e >> 16) & 7] = eval(M.join())), (this.T -= this.M[18]);
          break;
        case 491:
          (this.C[3] = new this.C[this.W].apply(null, G)),
            (this.T -= this.M[8] / this.M[1] < 10 ? 139 : 130);
          break;
        case 496:
          (this.C[(this.e >> 16) & 7] = null),
            (this.T -= 10 < this.M[5] - this.M[3] ? 160 : 144);
          break;
        case 506:
          (this.C[(this.e >> 16) & 7] = void 0),
            (this.T -= this.M[18] % this.M[12] == 1 ? 154 : 145);
          break;
        default:
          this.T = this.w;
      }
    } catch (A) {
      this.g && (this.s = this.g), (this.T -= 114);
    }
};
"undefined" != typeof window &&
  ((S.__ZH__ = S.__ZH__ || {}),
  (h = S.__ZH__.zse = S.__ZH__.zse || {}),
  new l().O(
    "ABt7CAAUSAAACADfSAAACAD1SAAACAAHSAAACAD4SAAACAACSAAACADCSAAACADRSAAACABXSAAACAAGSAAACADjSAAACAD9SAAACADwSAAACACASAAACADeSAAACABbSAAACADtSAAACAAJSAAACAB9SAAACACdSAAACADmSAAACABdSAAACAD8SAAACADNSAAACABaSAAACABPSAAACACQSAAACADHSAAACACfSAAACADFSAAACAC6SAAACACnSAAACAAnSAAACAAlSAAACACcSAAACADGSAAACAAmSAAACAAqSAAACAArSAAACACoSAAACADZSAAACACZSAAACAAPSAAACABnSAAACABQSAAACAC9SAAACABHSAAACAC/SAAACABhSAAACABUSAAACAD3SAAACABfSAAACAAkSAAACABFSAAACAAOSAAACAAjSAAACAAMSAAACACrSAAACAAcSAAACABySAAACACySAAACACUSAAACABWSAAACAC2SAAACAAgSAAACABTSAAACACeSAAACABtSAAACAAWSAAACAD/SAAACABeSAAACADuSAAACACXSAAACABVSAAACABNSAAACAB8SAAACAD+SAAACAASSAAACAAESAAACAAaSAAACAB7SAAACACwSAAACADoSAAACADBSAAACACDSAAACACsSAAACACPSAAACACOSAAACACWSAAACAAeSAAACAAKSAAACACSSAAACACiSAAACAA+SAAACADgSAAACADaSAAACADESAAACADlSAAACAABSAAACADASAAACADVSAAACAAbSAAACABuSAAACAA4SAAACADnSAAACAC0SAAACACKSAAACABrSAAACADySAAACAC7SAAACAA2SAAACAB4SAAACAATSAAACAAsSAAACAB1SAAACADkSAAACADXSAAACADLSAAACAA1SAAACADvSAAACAD7SAAACAB/SAAACABRSAAACAALSAAACACFSAAACABgSAAACADMSAAACACESAAACAApSAAACABzSAAACABJSAAACAA3SAAACAD5SAAACACTSAAACABmSAAACAAwSAAACAB6SAAACACRSAAACABqSAAACAB2SAAACABKSAAACAC+SAAACAAdSAAACAAQSAAACACuSAAACAAFSAAACACxSAAACACBSAAACAA/SAAACABxSAAACABjSAAACAAfSAAACAChSAAACABMSAAACAD2SAAACAAiSAAACADTSAAACAANSAAACAA8SAAACABESAAACADPSAAACACgSAAACABBSAAACABvSAAACABSSAAACAClSAAACABDSAAACACpSAAACADhSAAACAA5SAAACABwSAAACAD0SAAACACbSAAACAAzSAAACADsSAAACADISAAACADpSAAACAA6SAAACAA9SAAACAAvSAAACABkSAAACACJSAAACAC5SAAACABASAAACAARSAAACABGSAAACADqSAAACACjSAAACADbSAAACABsSAAACACqSAAACACmSAAACAA7SAAACACVSAAACAA0SAAACABpSAAACAAYSAAACADUSAAACABOSAAACACtSAAACAAtSAAACAAASAAACAB0SAAACADiSAAACAB3SAAACACISAAACADOSAAACACHSAAACACvSAAACADDSAAACAAZSAAACABcSAAACAB5SAAACADQSAAACAB+SAAACACLSAAACAADSAAACABLSAAACACNSAAACAAVSAAACACCSAAACABiSAAACADxSAAACAAoSAAACACaSAAACABCSAAACAC4SAAACAAxSAAACAC1SAAACAAuSAAACADzSAAACABYSAAACABlSAAACAC3SAAACAAISAAACAAXSAAACABISAAACAC8SAAACABoSAAACACzSAAACADSSAAACACGSAAACAD6SAAACADJSAAACACkSAAACABZSAAACADYSAAACADKSAAACADcSAAACAAySAAACADdSAAACACYSAAACACMSAAACAAhSAAACADrSAAACADWSAAAeIAAEAAACAB4SAAACAAySAAACABiSAAACABlSAAACABjSAAACABiSAAACAB3SAAACABkSAAACABnSAAACABrSAAACABjSAAACAB3SAAACABhSAAACABjSAAACABuSAAACABvSAAAeIABEAABCABkSAAACAAzSAAACABkSAAACAAySAAACABlSAAACAA3SAAACAAySAAACAA2SAAACABmSAAACAA1SAAACAAwSAAACABkSAAACAA0SAAACAAxSAAACAAwSAAACAAxSAAAeIABEAACCAAgSAAATgACVAAAQAAGEwADDAADSAAADAACSAAADAAASAAACANcIAADDAADSAAASAAATgADVAAATgAEUAAATgAFUAAATgAGUgAADAAASAAASAAATgADVAAATgAEUAAATgAFUAAATgAHUgAADAABSAAASAAATgADVAAATgAEUAAATgAFUAAATgAIUgAAcAgUSMAATgAJVAAATgAKUgAAAAAADAABSAAADAAAUAAACID/GwQPCAAYG2AREwAGDAABCIABGwQASMAADAAAUAAACID/GwQPCAAQG2AREwAHDAABCIACGwQASMAADAAAUAAACID/GwQPCAAIG2AREwAIDAABCIADGwQASMAADAAAUAAACID/GwQPEwAJDYAGDAAHG2ATDAAIG2ATDAAJG2ATKAAACAD/DIAACQAYGygSGwwPSMAASMAADAACSAAADAABUgAACAD/DIAACQAQGygSGwwPSMAASMAADAACCIABGwQASMAADAABUgAACAD/DIAACQAIGygSGwwPSMAASMAADAACCIACGwQASMAADAABUgAACAD/DIAAGwQPSMAASMAADAACCIADGwQASMAADAABUgAAKAAACAAgDIABGwQBEwANDAAAWQALGwQPDAABG2AREwAODAAODIAADQANGygSGwwTEwAPDYAPKAAACAAESAAATgACVAAAQAAGEwAQCAAESAAATgACVAAAQAAGEwAFDAAASAAADAAQSAAACAAASAAACAKsIAADCAAASAAADAAQUAAACID/GwQPSMAADAABUAAASAAASAAACAAASAAADAAFUgAACAABSAAADAAQUAAACID/GwQPSMAADAABUAAASAAASAAACAABSAAADAAFUgAACAACSAAADAAQUAAACID/GwQPSMAADAABUAAASAAASAAACAACSAAADAAFUgAACAADSAAADAAQUAAACID/GwQPSMAADAABUAAASAAASAAACAADSAAADAAFUgAADAAFSAAACAAASAAACAJ8IAACEwARDAARSAAACAANSAAACALdIAACEwASDAARSAAACAAXSAAACALdIAACEwATDAARDIASGwQQDAATG2AQEwAUDYAUKAAAWAAMSAAAWAANSAAAWAAOSAAAWAAPSAAAWAAQSAAAWAARSAAAWAASSAAAWAATSAAAWAAUSAAAWAAVSAAAWAAWSAAAWAAXSAAAWAAYSAAAWAAZSAAAWAAaSAAAWAAbSAAAWAAcSAAAWAAdSAAAWAAeSAAAWAAfSAAAWAAgSAAAWAAhSAAAWAAiSAAAWAAjSAAAWAAkSAAAWAAlSAAAWAAmSAAAWAAnSAAAWAAoSAAAWAApSAAAWAAqSAAAWAArSAAAeIAsEAAXWAAtSAAAWAAuSAAAWAAvSAAAWAAwSAAAeIAxEAAYCAAESAAATgACVAAAQAAGEwAZCAAkSAAATgACVAAAQAAGEwAaDAABSAAACAAASAAACAJ8IAACSMAASMAACAAASAAADAAZUgAADAABSAAACAAESAAACAJ8IAACSMAASMAACAABSAAADAAZUgAADAABSAAACAAISAAACAJ8IAACSMAASMAACAACSAAADAAZUgAADAABSAAACAAMSAAACAJ8IAACSMAASMAACAADSAAADAAZUgAACAAASAAADAAZUAAACIAASEAADIAYUEgAGwQQSMAASMAACAAASAAADAAaUgAACAABSAAADAAZUAAACIABSEAADIAYUEgAGwQQSMAASMAACAABSAAADAAaUgAACAACSAAADAAZUAAACIACSEAADIAYUEgAGwQQSMAASMAACAACSAAADAAaUgAACAADSAAADAAZUAAACIADSEAADIAYUEgAGwQQSMAASMAACAADSAAADAAaUgAACAAAEAAJDAAJCIAgGwQOMwAGOBG2DAAJCIABGwQASMAADAAaUAAAEAAbDAAJCIACGwQASMAADAAaUAAAEAAcDAAJCIADGwQASMAADAAaUAAAEAAdDAAbDIAcGwQQDAAdG2AQDAAJSAAADAAXUAAAG2AQEwAeDAAeSAAADAACSAAACALvIAACEwAfDAAJSAAADAAaUAAADIAfGwQQSMAASMAADAAJCIAEGwQASMAADAAaUgAADAAJCIAEGwQASMAADAAaUAAASAAASAAADAAJSAAADAAAUgAADAAJCIABGQQAEQAJOBCIKAAADAABTgAyUAAACIAQGwQEEwAVCAAQDIAVGwQBEwAKCAAAEAAhDAAhDIAKGwQOMwAGOBImDAAKSAAADAABTgAzQAAFDAAhCIABGQQAEQAhOBHoCAAASAAACAAQSAAADAABTgA0QAAJEwAiCAAQSAAATgACVAAAQAAGEwAjCAAAEAALDAALCIAQGwQOMwAGOBLSDAALSAAADAAiUAAADIALSEAADIAAUEgAGwQQCAAqG2AQSMAASMAADAALSAAADAAjUgAA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"
  ));
var D = function (u) {
  return __g._encrypt(encodeURIComponent(u));
};

(exports.ENCRYPT_VERSION = A), (exports.default = D);

function encryptCookie(cookie) {
  const K = new RegExp("d_c0=([^;]+)");
  const Q = function (string) {
    const e = K.exec(string);
    return e && e[1];
  };
  return Q(cookie);
}

function get_md5(s) {
  const md5 = crypto.createHash("md5");
  md5.update(s);
  var strs = md5.digest("hex");
  return strs;
}

function gt(u) {
  var f = new URL(u, "https://www.zhihu.com");
  return "" + f.pathname + f.search;
}

function getZse96(cookie, url, zse93, x81) {
  let s = `${zse93}+${gt(url)}+${encryptCookie(cookie)}`;
  if (x81) {
    s = s + `+${x81}`;
  }
  let e = get_md5(s);
  console.log("🚀 ~ file: new-zse-96.js:573 ~ getZse96 ~ e", e);
  return `2.0_${D(e)}`;
}

// https://api.zhihu.com/remix/well/1431705106886184960/catalog?offset=10&limit=13&order_by=global_idx&is_new_column=true

const cookie =
  "_xsrf=bcrEKtfm4bVzWRmL4Hqe8OFphtdOmtaM; KLBRSID=ca494ee5d16b14b649673c122ff27291|1673581060|1673571775;_zap=9664c935-361f-43c0-a98f-f9618de5b5c0; d_c0=AMBXA2viIRaPTiayW2XDwwutZFH9WpsgzQE=|1673011068; Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49=1673011068,1673070343,1673534637,1673621005; captcha_session_v2=2|1:0|10:1673011069|18:captcha_session_v2|88:M091VEJQRGM1NEo1Q3R0WkU0Vi8rODFqVDQ3L3djMlprVGpzREEycE9pN1Y3RXdSaDMvanpCbEpUSWdtMXZGVQ==|6bf88cd2e485ecf4ee03bde1c94d3a980e2f76748edd89858e8a3d1adc56da26; captcha_ticket_v2=2|1:0|10:1673011088|17:captcha_ticket_v2|704:eyJ2YWxpZGF0ZSI6IkNOMzFfWnFKZ3JYOHpoTGsuMHVHTWsuallIcXlFcEhsTWxoX2FJWXU3ZkxGU3Bxa2NzZHBNaUdTWXBhZVVGU1oxZG9QQ2VXRkwuYXFkMlUtNTE3NUM2OE1hbWFuRks3bEF0UEtQNlA2ZnlUTzhDSmExVE81UFVnMkFJNFAxMnhNQTdvZUh6ZU45QnhrQmphOFJLWXdRTjI3TFFBOGRTQi5BQUs0bTdBUi5RbGJiWjZxdHByV3dKbER2S1gwNndNdFFkekh2dERiMGdXZHZpcDU5dFBvUXU4SWNSSWVBNkp4VXVNcFdhMVktZ1E0S2FFcFhId0lOc0owcXIwSnJ0NHYwUUZhR0dFUW0yV2U1RXgyd0tsRkxzQ3R0bkd4YUVyY3FFMG9tWC5ITkZCU2pFaERNOEpoQ1FDaEt4bmJnMFYybUJ3REJHczdCLnduVkVVdkpLLndyV0JjYXE5a2pFSHlTcVRQc0pxVHFaSHM0cXlrNEV3QmtXSk1hdGgxdldWRGF5UmU5eUtXUlJDSDdkZ3JxamtHWS5ZbG9UcFYyenNvYkluWkdjSnRkSE9ZbS5tSjRRMW9BcGR3NEZULkV1OExKTlVPeGpDRERyZ09RWlBZUUtsUnhiWnFOc054amZwUUtuS0VieTQ2aFRUcW1ETlhQUVlFY01FWjl0VHo4blh6MyJ9|30e8d01fb847c15e38b1c658d9d06fd78854e32b4c07a15f1a874e45e8c1824e; z_c0=2|1:0|10:1673011103|4:z_c0|92:Mi4xSW9VLVFRQUFBQUFBd0ZjRGEtSWhGaVlBQUFCZ0FsVk5uMjJsWkFEWlQybFQ4cWM2WlBCNk9pX1dyaWZDdEVUR1FB|7de431aaf867ae9b927b020a3c9cc820176c2a7a5eb916d33567abf7c2490c35; ariaDefaultTheme=undefined; _xsrf=72bf5461-874d-4e4d-b5cc-ad632242fe06; Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49=1673621005; tst=r; KLBRSID=0a401b23e8a71b70de2f4b37f5b4e379|1673624815|1673621026";

class SpiderRequest {
  parseUrl
  url
  cookie
  headers

  constructor (url, cookie) {
    console.log('【开始】', url)
    this.url = url
    this.cookie = cookie
    this.headers = {}
  }

  getHeaders() {
    const cookieMesRes = /d_c0=([a-z|A-Z|\d*|=\|]+)/;
    const res = cookieMesRes.exec(this.cookie);
    if (res.length) {
      let cookieMes = res[1];
      const encryptStr = getZse96(this.cookie, this.url, "101_3_3.0", "");
      console.log(
        "🚀 ~ file: api.js:38 ~ SpiderRequest ~ getHeaders ~ encryptStr",
        encryptStr
      );
      const headers = {
        "X-AB-PB":
          "CooBCAAbAD8ARwC0AGkBagF0ATsCzALXAtgCogO3A6YE1gQRBVEFiwWMBZ4FMAYxBusGJwd0CHYIeQjaCD8JYAnDCcQJxQnGCccJyAnJCcoJywnMCdEJ9AkECkkKZQprCqkKvgrUCt0K7Qr+CkMLRgtxC4cLjQvXC+AL5QvmCzgMcQyPDKwMwwzJDPgMEkUCAAAAAAEBAAAAAAAAAAAEAAEAAAEAAAAAAAAGAAABAAAAAAAAAAAAAAADAAAAAAAAAQAAAAEAAAAFAgAAAAIGAAAAAAA=",
        "x-zse-93": "101_3_3.0",
        "x-zse-96": encryptStr,
        "User-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
        Cookie: this.cookie,
        Host: "api.zhihu.com",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'",
        Referer:
          "https://www.zhihu.com/xen/market/remix/paid_column/1431705106886184960?extra_tab=2",
        Origin: "https://www.zhihu.com",
        Connection: "keep-alive",
      };
      this.headers = headers;
      return headers
    }
  }

  async getRequest(headers = {}) {
    // const res = await httpRequest(this.url, {}, 'GET', this.headers)
    const res = await axios({
      url: this.url,
      type: 'GET',
      headers
    })
    return res
  }
}
console.log(
  "+++======",
  document["createElement"]("canvas")["getContext"]("2d")["toString"]()
);
// const request = new SpiderRequest(url, cookie);
// const headers = request.getHeaders()
// request.getRequest(headers);
const detailUrl = (sku, offset = 0) =>
  `https://api.zhihu.com/remix/well/${sku}/catalog?offset=10&limit=${offset}&order_by=global_idx&is_new_column=true`;

const cacheDir = path.resolve(__dirname, '_cache')

const getDetailUrl = (book, section) =>
  `https://www.zhihu.com/market/paid_column/${book}/section/${section}`;
async function fetchCharpt(url, boolId = '', datas = []) {
  console.log('【抓取剩余章节】')
  const request = new SpiderRequest(url, cookie);
  await sleep(10)
  const headers = request.getHeaders();
  const res = await request.getRequest(headers);
  if (res.status === 200) {
    if (res.data) {
      if (res.data.data.length) {
        datas.push(
          ...res.data.data.map((item) => ({
            url: getDetailUrl(boolId, item.id),
            title: item.index.serial_number_txt + item.title,
            id: item.id,
          }))
        );
        console.log('【分页信息】', res.data.paging)
        if (res.data.paging) {
          const url = res.data.paging.next;
          if (url) {
            const currentUrl = url.indexOf("http:") > -1 ? url : `https:${url}`;
            await fetchCharpt(currentUrl, boolId, datas);
          }
        }
      }
    }
  }
}

async function fetchDetail(url = "", bookId) {
  const res = [];
  console.log("【开始抓取】", url);
  await sleep(10);
  const content = await axios({
    url,
    type: "GET",
    headers: {
      Cookie: cookie,
    },
  });
  if (content.status === 200) {
    const $ = cheerio.load(content.data);
    const appData = $("#resolved").val();
    const loadmore = $(".CatalogModule-allSection-ctqBJ");

    if (appData) {
      const data = JSON.parse(appData);
      const catalogData = data.appContext.catalogData || {
        default: [],
        paging: {},
      };
      const extra = catalogData.extra;
      res.push(
        ...catalogData.default.map((item) => {
          return {
            title: item.index.serialNumberTxt + item.title,
            id: item.id,
            url: getDetailUrl(bookId, item.id),
          };
        })
      );
      if (loadmore) {
        const url = catalogData.paging.next;
        if (url) {
          console.log("【开始请求剩余】", url);
          const currentUrl = url.indexOf("http:") > -1 ? url : `https:${url}`;
          await fetchCharpt(currentUrl, bookId, res);
        }
      }
    }
  }
  return res;
}

async function fetchChartptContent(url = '') {
  let html = ''
  console.log('【开始抓取内容】', url)

  await sleep(10)
  const content = await axios({
    url,
    type: 'GET',
    headers: {
      Cookie: cookie
    }
  })
  if (content.status === 200) {
    const $ = cheerio.load(content.data)
    const _html = $("#manuscript").html();
    html = _html ? _html : '';
  }
  return html
}

const listUrl = (offset) =>
  `https://api.zhihu.com/pluton/shelves?limit=10&offset=${offset}`;

function getBookCache (bookId) {
  if (!fs.existsSync(path.resolve(cacheDir, bookId))) return []
  return fs.readFileSync(path.resolve(cacheDir, bookId)).toString().split('\n')
}

let offset = 0
async function getListData(offset) {
  const request = new SpiderRequest(listUrl(offset), cookie);
  await sleep(10);
  const res = await request.getRequest({
    Cookie: cookie
  })
  if (res.status === 200) {
    if (res.data) {
      if (res.data.data.length) {
        let hasChange = false;
        for (let i = 0; i < res.data.data.length; i++) {
          const book = res.data.data[i];
          if (book.producer === 'training') {
            console.log('【训练营课程跳过】', book.title)
            continue
          }
          // 开始抓取章节信息
          console.log("书名：", book.title);
          console.log("开始抓取章节", book.business_url);
          const chartpts = await fetchDetail(
            book.business_url,
            book.business_id
          );
          // await fetchCharpt(book.sku_id, 0, chartpts);
          res.data.data[i].chartpts = chartpts;
          console.log("【获取到的所有章节数据】", chartpts);
          // 请求章节内
          // 下载封面
          console.log("【开始下载封面】", book.image[0]);
          const coverPath = path.resolve(
            __dirname,
            `./books/${normalTitle(book.title)}`
          );
          if (!fs.existsSync(path.join(coverPath, 'cover.jpg'))) {
            await downloadFile(book.image[0], coverPath, "cover.jpg");
          }
          
          const bookData = {
            title: book.title,
            author: book.author,
            cover: path.resolve(
              __dirname,
              `./books/${normalTitle(book.title)}`,
              'cover.jpg'
            ),
            content: [],
          };
          for (let j = 0; j < chartpts.length; j++) {
            const item = chartpts[j];
            const bookCaches = getBookCache(book.business_id) || []
            if (bookCaches.includes(item.id)) {
              console.log(`【${book.title}=>${item.title}】已经存在，跳过！`)
              continue
            }
            hasChange = true
            const content = await fetchChartptContent(item.url);
            bookData.content.push({
              title: item.title,
              data: content,
            });
            saveBookData(book.title, {
              id: item.id,
              content,
              title: item.title,
            });
            fs.appendFileSync(path.resolve(cacheDir, book.business_id), `${item.id}\n`);
          }
          if (hasChange) {
            const { EPub } = await import("@mr-huang/html-to-epub");
            console.log("【开始保存电子书】", book.title);
            console.log("【配置】", bookData);
            const epub = new EPub(
              bookData,
              path.resolve(
                __dirname,
                `./books/${normalTitle(book.title)}/${normalTitle(
                  book.title
                )}.epub`
              )
            );
            await epub.render();
            console.log("【保存电子书完成】");
          }
        }
        if (hasChange) {
          saveBookInfo(res.data.data);
        }
        if (res.data.pagination) {
          offset += 10;
          await getListData(offset);
        }
      }
    }
  }
}

(async () => {
  await getListData(offset);
})();

