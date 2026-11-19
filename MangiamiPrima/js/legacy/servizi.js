function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var r, e, o = "function" == typeof Symbol ? Symbol : {}, n = o.iterator || "@@iterator", a = o.toStringTag || "@@toStringTag"; function i(o, n, a, i) { var u = n && n.prototype instanceof Generator ? n : Generator, f = Object.create(u.prototype); return _regeneratorDefine2(f, "_invoke", function (t, o, n) { var a, i, u, f = 0, p = n || [], y = !1, G = { p: 0, n: 0, v: r, a: l, f: l.bind(r, 4), d: function d(t, e) { return a = t, i = 0, u = r, G.n = e, c; } }; function l(t, o) { for (i = t, u = o, e = 0; !y && f && !n && e < p.length; e++) { var n, a = p[e], l = G.p, F = a[2]; t > 3 ? (n = F === o) && (u = a[(i = a[4]) ? 5 : (i = 3, 3)], a[4] = a[5] = r) : a[0] <= l && ((n = t < 2 && l < a[1]) ? (i = 0, G.v = o, G.n = a[1]) : l < F && (n = t < 3 || a[0] > o || o > F) && (a[4] = t, a[5] = o, G.n = F, i = 0)); } if (n || t > 1) return c; throw y = !0, o; } return function (n, p, F) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && l(p, F), i = p, u = F; (e = i < 2 ? r : u) || !y;) { a || (i ? (i > 1 && (G.n = i < 3 ? -1 : u), l(i, u)) : G.v = u); try { if (f = 2, a) { if (i || (n = "next"), e = a[n]) { if (!(e = e.call(a, u))) throw TypeError("iterator result is not an object"); if (!e.done) return e; u = e.value, i < 2 && (i = 0); } else 1 === i && (e = a.return) && e.call(a), i < 2 && (u = TypeError("The iterator does not provide a '" + n + "' method"), i = 1); a = r; } else if ((e = (y = G.n < 0) ? u : t.call(o, G)) !== c) break; } catch (t) { a = r, i = 1, u = t; } finally { f = 1; } } return { value: e, done: y }; }; }(o, a, i), !0), f; } var c = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} e = Object.getPrototypeOf; var u = [][n] ? e(e([][n]())) : (_regeneratorDefine2(e = {}, n, function () { return this; }), e), f = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(u); function p(r) { return Object.setPrototypeOf ? Object.setPrototypeOf(r, GeneratorFunctionPrototype) : (r.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(r, a, "GeneratorFunction")), r.prototype = Object.create(f), r; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(f, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, a, "GeneratorFunction"), _regeneratorDefine2(f), _regeneratorDefine2(f, a, "Generator"), _regeneratorDefine2(f, n, function () { return this; }), _regeneratorDefine2(f, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: p }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(e, t) { var _n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"]; if (!_n) { if (Array.isArray(e) || (_n = _unsupportedIterableToArray(e)) || t && e && "number" == typeof e.length) { _n && (e = _n); var o = 0, F = function F() {}; return { s: F, n: function n() { return o >= e.length ? { done: !0 } : { done: !1, value: e[o++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var a, u, i = !0; return { s: function s() { _n = _n.call(e); }, n: function n() { i = !0; var r = _n.next(); return r.done ? { done: !0 } : { value: r.value, done: i = !1 }; }, e: function e(r) { a = !0, u = r; }, f: function f() { try { i || null == _n.return || _n.return(); } finally { if (a) throw u; } } }; }
function _unsupportedIterableToArray(t, e) { if (t) { if ("string" == typeof t) return _arrayLikeToArray(t, e); var o = {}.toString.call(t).slice(8, -1); return "Object" === o && t.constructor && (o = t.constructor.name), "Map" === o || "Set" === o ? Array.from(t) : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? _arrayLikeToArray(t, e) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/* Mangiami Prima - servizi di rete: Open Food Facts (& co.) e ricette su Supabase. */
(function () {
  'use strict';

  var MP = window.MP = window.MP || {};

  /* ================= Open Food Facts ================= */
  var API_URLS = ['https://world.openfoodfacts.org/api/v2/product/', 'https://world.openbeautyfacts.org/api/v2/product/', 'https://world.openproductsfacts.org/api/v2/product/'];
  var UPCITEMDB_URL = 'https://api.upcitemdb.com/prod/trial/lookup?upc=';
  var TIMEOUT_MS = 12000;
  var CAMPI = 'product_name,product_name_it,product_name_en,generic_name_it,generic_name,brands,image_front_small_url,image_front_url';
  var urlHttps = function urlHttps(u) {
    try {
      var x = new URL(String(u || '').trim());
      return x.protocol === 'https:' ? x.href : null;
    } catch (e) {
      return null;
    }
  };
  function varianti(codice) {
    var v = [codice];
    if (codice.length === 12) v.push('0' + codice); // UPC-A <-> EAN-13
    else if (codice.length === 13 && codice[0] === '0') v.push(codice.slice(1));
    return v;
  }
  function chiedi(_x, _x2) {
    return _chiedi.apply(this, arguments);
  }
  function _chiedi() {
    _chiedi = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(url, opzioni) {
      var ctrl, t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            ctrl = new AbortController();
            t = setTimeout(function () {
              return ctrl.abort();
            }, TIMEOUT_MS);
            _context.p = 1;
            _context.n = 2;
            return fetch(url, {
              signal: ctrl.signal,
              headers: Object.assign({
                Accept: 'application/json'
              }, opzioni && opzioni.headers)
            });
          case 2:
            return _context.a(2, _context.v);
          case 3:
            _context.p = 3;
            clearTimeout(t);
            return _context.f(3);
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[1,, 3, 4]]);
    }));
    return _chiedi.apply(this, arguments);
  }
  function cercaOpenFacts(_x3, _x4) {
    return _cercaOpenFacts.apply(this, arguments);
  }
  function _cercaOpenFacts() {
    _cercaOpenFacts = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(apiUrl, codice) {
      var r, j, p, nome, marca, _t;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            _context2.n = 1;
            return chiedi("".concat(apiUrl).concat(encodeURIComponent(codice), ".json?fields=").concat(CAMPI));
          case 1:
            r = _context2.v;
            if (r.ok) {
              _context2.n = 2;
              break;
            }
            return _context2.a(2, {
              errore: r.status !== 404
            });
          case 2:
            _context2.n = 3;
            return r.json();
          case 3:
            j = _context2.v;
            if (!(!j || j.status !== 1 || !j.product)) {
              _context2.n = 4;
              break;
            }
            return _context2.a(2, {
              errore: false
            });
          case 4:
            p = j.product;
            nome = [p.product_name_it, p.product_name, p.product_name_en, p.generic_name_it, p.generic_name].find(function (n) {
              return typeof n === 'string' && n.trim();
            });
            if (nome) {
              _context2.n = 5;
              break;
            }
            return _context2.a(2, {
              errore: false
            });
          case 5:
            nome = nome.trim();
            marca = typeof p.brands === 'string' ? p.brands.split(',')[0].trim() : '';
            if (marca && !nome.toLowerCase().includes(marca.toLowerCase())) nome = "".concat(nome, " ").concat(marca);
            return _context2.a(2, {
              nome,
              immagine: urlHttps(p.image_front_small_url) || urlHttps(p.image_front_url),
              errore: false
            });
          case 6:
            _context2.p = 6;
            _t = _context2.v;
            return _context2.a(2, {
              errore: true
            });
        }
      }, _callee2, null, [[0, 6]]);
    }));
    return _cercaOpenFacts.apply(this, arguments);
  }
  function cercaUpcItemDb(_x5) {
    return _cercaUpcItemDb.apply(this, arguments);
  }
  /** Esito: { titolo, immagineUrl, erroreRete }. Il ripiego UPCitemdb (spesso senza CORS) non conta come errore di rete. */
  function _cercaUpcItemDb() {
    _cercaUpcItemDb = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(codice) {
      var r, j, item, nome, img, _t2;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            _context3.p = 0;
            _context3.n = 1;
            return chiedi(UPCITEMDB_URL + encodeURIComponent(codice));
          case 1:
            r = _context3.v;
            if (r.ok) {
              _context3.n = 2;
              break;
            }
            return _context3.a(2, {
              errore: r.status !== 404
            });
          case 2:
            _context3.n = 3;
            return r.json();
          case 3:
            j = _context3.v;
            item = j && Array.isArray(j.items) ? j.items[0] : null;
            nome = item && typeof item.title === 'string' ? item.title.trim() : '';
            if (nome) {
              _context3.n = 4;
              break;
            }
            return _context3.a(2, {
              errore: false
            });
          case 4:
            img = (Array.isArray(item.images) ? item.images : []).map(urlHttps).find(Boolean) || null;
            return _context3.a(2, {
              nome,
              immagine: img,
              errore: false
            });
          case 5:
            _context3.p = 5;
            _t2 = _context3.v;
            return _context3.a(2, {
              errore: true
            });
        }
      }, _callee3, null, [[0, 5]]);
    }));
    return _cercaUpcItemDb.apply(this, arguments);
  }
  function cercaProdotto(_x6) {
    return _cercaProdotto.apply(this, arguments);
  }
  /** { nome, immagine, errore }: errore = null se il proxy non e' raggiungibile, true se i servizi hanno fallito. */
  function _cercaProdotto() {
    _cercaProdotto = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(codice) {
      var erroreRete, v, _iterator3, _step3, _variante, _iterator5, _step5, api, _r, p, _iterator4, _step4, variante, r, _t3, _t4, _t5;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            erroreRete = false;
            v = varianti(codice);
            _iterator3 = _createForOfIteratorHelper(v);
            _context4.p = 1;
            _iterator3.s();
          case 2:
            if ((_step3 = _iterator3.n()).done) {
              _context4.n = 12;
              break;
            }
            _variante = _step3.value;
            _iterator5 = _createForOfIteratorHelper(API_URLS);
            _context4.p = 3;
            _iterator5.s();
          case 4:
            if ((_step5 = _iterator5.n()).done) {
              _context4.n = 8;
              break;
            }
            api = _step5.value;
            _context4.n = 5;
            return cercaOpenFacts(api, _variante);
          case 5:
            _r = _context4.v;
            if (!_r.nome) {
              _context4.n = 6;
              break;
            }
            return _context4.a(2, {
              titolo: _r.nome,
              immagineUrl: _r.immagine,
              erroreRete: false
            });
          case 6:
            erroreRete = erroreRete || _r.errore;
          case 7:
            _context4.n = 4;
            break;
          case 8:
            _context4.n = 10;
            break;
          case 9:
            _context4.p = 9;
            _t3 = _context4.v;
            _iterator5.e(_t3);
          case 10:
            _context4.p = 10;
            _iterator5.f();
            return _context4.f(10);
          case 11:
            _context4.n = 2;
            break;
          case 12:
            _context4.n = 14;
            break;
          case 13:
            _context4.p = 13;
            _t4 = _context4.v;
            _iterator3.e(_t4);
          case 14:
            _context4.p = 14;
            _iterator3.f();
            return _context4.f(14);
          case 15:
            _context4.n = 16;
            return cercaViaProxy(codice);
          case 16:
            p = _context4.v;
            if (!p.nome) {
              _context4.n = 17;
              break;
            }
            return _context4.a(2, {
              titolo: p.nome,
              immagineUrl: p.immagine,
              erroreRete: false
            });
          case 17:
            if (!(p.errore === null)) {
              _context4.n = 26;
              break;
            }
            // proxy non raggiungibile: UPCitemdb diretto, che a volte risponde (ripiego di ripiego)
            _iterator4 = _createForOfIteratorHelper(v);
            _context4.p = 18;
            _iterator4.s();
          case 19:
            if ((_step4 = _iterator4.n()).done) {
              _context4.n = 22;
              break;
            }
            variante = _step4.value;
            _context4.n = 20;
            return cercaUpcItemDb(variante);
          case 20:
            r = _context4.v;
            if (!r.nome) {
              _context4.n = 21;
              break;
            }
            return _context4.a(2, {
              titolo: r.nome,
              immagineUrl: r.immagine,
              erroreRete: false
            });
          case 21:
            _context4.n = 19;
            break;
          case 22:
            _context4.n = 24;
            break;
          case 23:
            _context4.p = 23;
            _t5 = _context4.v;
            _iterator4.e(_t5);
          case 24:
            _context4.p = 24;
            _iterator4.f();
            return _context4.f(24);
          case 25:
            return _context4.a(2, {
              titolo: null,
              immagineUrl: null,
              erroreRete
            });
          case 26:
            return _context4.a(2, {
              titolo: null,
              immagineUrl: null,
              erroreRete: erroreRete || p.errore
            });
        }
      }, _callee4, null, [[18, 23, 24, 25], [3, 9, 10, 11], [1, 13, 14, 15]]);
    }));
    return _cercaProdotto.apply(this, arguments);
  }
  function cercaViaProxy(_x7) {
    return _cercaViaProxy.apply(this, arguments);
  }
  function _cercaViaProxy() {
    _cercaViaProxy = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(codice) {
      var r, j, nome, _t6;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            _context5.p = 0;
            _context5.n = 1;
            return chiedi("".concat(SUPABASE_URL, "/functions/v1/cerca-prodotto?codice=").concat(encodeURIComponent(codice)), {
              headers: {
                apikey: SUPABASE_KEY,
                Accept: 'application/json'
              }
            });
          case 1:
            r = _context5.v;
            if (r.ok) {
              _context5.n = 2;
              break;
            }
            return _context5.a(2, {
              errore: null
            });
          case 2:
            _context5.n = 3;
            return r.json();
          case 3:
            j = _context5.v;
            nome = typeof j.titolo === 'string' ? j.titolo.trim() : '';
            if (!nome) {
              _context5.n = 4;
              break;
            }
            return _context5.a(2, {
              nome,
              immagine: urlHttps(j.immagineUrl),
              errore: false
            });
          case 4:
            return _context5.a(2, {
              errore: !!j.errore
            });
          case 5:
            _context5.p = 5;
            _t6 = _context5.v;
            return _context5.a(2, {
              errore: null
            });
        }
      }, _callee5, null, [[0, 5]]);
    }));
    return _cercaViaProxy.apply(this, arguments);
  }
  MP.openFoodFacts = {
    cerca: cercaProdotto
  };

  /* ================= Ricette (Supabase) ================= */
  var SUPABASE_URL = 'https://dqbqebrfwfbtqnvaejel.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_NvOCatNLryMZhvMJTW0VMA_FgQIJSTG'; // chiave "anon" pubblica (RLS lato server)
  var BONUS_SCADENZA = 0.15;
  var CHIAVE_CACHE = 'mp.ricetteCache.v1';
  var CHIAVE_CODA = 'mp.codaRicette.v1';
  var jl = function jl(k, d) {
    try {
      var r = localStorage.getItem(k);
      return r ? JSON.parse(r) : d;
    } catch (e) {
      return d;
    }
  };
  var js = function js(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
      return true;
    } catch (e) {
      return false;
    }
  };
  function arricchisci(ricette, prodottiFrigo) {
    var _MP$ingredienti = MP.ingredienti,
      radici = _MP$ingredienti.radici,
      corrisponde = _MP$ingredienti.corrisponde;
    var frigo = prodottiFrigo.map(function (p) {
      return {
        radici: radici(p.titolo),
        subito: MP.prodotto.daUsareSubito(p),
        scadenza: p.dataScadenza
      };
    });
    var _iterator = _createForOfIteratorHelper(ricette),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var r = _step.value;
        var ingredienti = Array.isArray(r.ingredienti) ? r.ingredienti.map(String) : [];
        r.ingredienti = ingredienti;
        var mancanti = [];
        var inScadenza = [];
        var posseduti = 0;
        var _iterator2 = _createForOfIteratorHelper(ingredienti),
          _step2;
        try {
          var _loop = function _loop() {
            var ing = _step2.value;
            var ri = radici(ing);
            var trovati = frigo.filter(function (p) {
              return corrisponde(p.radici, ri);
            });
            if (trovati.length === 0) {
              mancanti.push(ing);
              return 1; // continue
            }
            posseduti++;
            var scad = trovati.filter(function (p) {
              return p.subito && p.scadenza;
            }).map(function (p) {
              return p.scadenza;
            }).sort();
            if (scad.length) inScadenza.push({
              ingrediente: ing,
              scadenza: scad[0]
            });
          };
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            if (_loop()) continue;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        r.posseduti = posseduti;
        r.mancanti = mancanti;
        r.inScadenza = inScadenza;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    var punteggio = function punteggio(r) {
      return r.posseduti / Math.max(r.ingredienti.length, 1) + BONUS_SCADENZA * Math.min(r.inScadenza.length, 3);
    };
    return ricette.filter(function (r) {
      return r.posseduti > 0;
    }).sort(function (a, b) {
      return punteggio(b) - punteggio(a) || b.posseduti - a.posseduti;
    });
  }

  /** Ritorna { ricette, daCache }. Se la rete manca usa l'ultimo elenco scaricato; se non c'e' lancia errore. */
  function getIdee(_x8) {
    return _getIdee.apply(this, arguments);
  }
  function _getIdee() {
    _getIdee = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(prodottiFrigo) {
      var grezze, daCache, cache, _t7;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.p = _context6.n) {
          case 0:
            daCache = false;
            _context6.p = 1;
            _context6.n = 2;
            return richiestaRicette();
          case 2:
            grezze = _context6.v;
            js(CHIAVE_CACHE, {
              quando: new Date().toISOString(),
              ricette: grezze
            });
            _context6.n = 7;
            break;
          case 3:
            _context6.p = 3;
            _t7 = _context6.v;
            if (!(_t7 instanceof TypeError || _t7.name === 'AbortError')) {
              _context6.n = 6;
              break;
            }
            cache = jl(CHIAVE_CACHE, null);
            if (!(cache && Array.isArray(cache.ricette))) {
              _context6.n = 4;
              break;
            }
            grezze = cache.ricette;
            daCache = true;
            _context6.n = 5;
            break;
          case 4:
            throw new Error('Nessuna connessione e nessuna ricetta salvata sul dispositivo.');
          case 5:
            _context6.n = 7;
            break;
          case 6:
            throw _t7;
          case 7:
            return _context6.a(2, {
              ricette: arricchisci(grezze, prodottiFrigo),
              daCache
            });
        }
      }, _callee6, null, [[1, 3]]);
    }));
    return _getIdee.apply(this, arguments);
  }
  function richiestaRicette() {
    return _richiestaRicette.apply(this, arguments);
  }
  function _richiestaRicette() {
    _richiestaRicette = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      var ctrl, t, r, j;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.p = _context7.n) {
          case 0:
            ctrl = new AbortController();
            t = setTimeout(function () {
              return ctrl.abort();
            }, TIMEOUT_MS);
            _context7.p = 1;
            _context7.n = 2;
            return fetch("".concat(SUPABASE_URL, "/rest/v1/ricette?select=*&limit=500"), {
              headers: {
                apikey: SUPABASE_KEY,
                Accept: 'application/json'
              },
              signal: ctrl.signal
            });
          case 2:
            r = _context7.v;
            if (r.ok) {
              _context7.n = 3;
              break;
            }
            throw new Error("Il server ha risposto ".concat(r.status, "."));
          case 3:
            _context7.n = 4;
            return r.json();
          case 4:
            j = _context7.v;
            return _context7.a(2, Array.isArray(j) ? j : []);
          case 5:
            _context7.p = 5;
            clearTimeout(t);
            return _context7.f(5);
          case 6:
            return _context7.a(2);
        }
      }, _callee7, null, [[1,, 5, 6]]);
    }));
    return _richiestaRicette.apply(this, arguments);
  }
  function inviaRicetta(_x9) {
    return _inviaRicetta.apply(this, arguments);
  }
  /** Invia la ricetta; se manca la rete la mette in coda (ritorna 'inviata' | 'in-coda'). */
  function _inviaRicetta() {
    _inviaRicetta = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(r) {
      var ctrl, t, resp, dettaglio, err;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.p = _context8.n) {
          case 0:
            ctrl = new AbortController();
            t = setTimeout(function () {
              return ctrl.abort();
            }, TIMEOUT_MS);
            _context8.p = 1;
            _context8.n = 2;
            return fetch("".concat(SUPABASE_URL, "/rest/v1/ricette"), {
              method: 'POST',
              headers: {
                apikey: SUPABASE_KEY,
                'Content-Type': 'application/json',
                Prefer: 'return=minimal'
              },
              body: JSON.stringify({
                titolo: r.titolo,
                ingredienti: r.ingredienti,
                procedimento: r.procedimento,
                tempo_preparazione: r.tempo || null,
                autore_nome: r.autore || null
              }),
              signal: ctrl.signal
            });
          case 2:
            resp = _context8.v;
            if (resp.ok) {
              _context8.n = 4;
              break;
            }
            _context8.n = 3;
            return resp.text().catch(function () {
              return '';
            });
          case 3:
            dettaglio = _context8.v;
            err = new Error("Il server ha risposto ".concat(resp.status, ". ").concat(dettaglio));
            err.http = resp.status;
            throw err;
          case 4:
            _context8.p = 4;
            clearTimeout(t);
            return _context8.f(4);
          case 5:
            return _context8.a(2);
        }
      }, _callee8, null, [[1,, 4, 5]]);
    }));
    return _inviaRicetta.apply(this, arguments);
  }
  function salvaRicetta(_x0) {
    return _salvaRicetta.apply(this, arguments);
  }
  function _salvaRicetta() {
    _salvaRicetta = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(r) {
      var coda, _t8;
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.p = _context9.n) {
          case 0:
            _context9.p = 0;
            _context9.n = 1;
            return inviaRicetta(r);
          case 1:
            return _context9.a(2, 'inviata');
          case 2:
            _context9.p = 2;
            _t8 = _context9.v;
            if (!_t8.http) {
              _context9.n = 3;
              break;
            }
            throw _t8;
          case 3:
            // risposta negativa del server: non si accoda
            coda = jl(CHIAVE_CODA, []);
            coda.push(r);
            if (js(CHIAVE_CODA, coda)) {
              _context9.n = 4;
              break;
            }
            throw new Error('Rete assente e memoria del dispositivo piena.');
          case 4:
            return _context9.a(2, 'in-coda');
        }
      }, _callee9, null, [[0, 2]]);
    }));
    return _salvaRicetta.apply(this, arguments);
  }
  var svuotando = false;
  /** Prova a inviare le ricette in coda; ritorna quante ne ha inviate. */
  function svuotaCoda() {
    return _svuotaCoda.apply(this, arguments);
  }
  function _svuotaCoda() {
    _svuotaCoda = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
      var inviate, coda, _t9;
      return _regenerator().w(function (_context0) {
        while (1) switch (_context0.p = _context0.n) {
          case 0:
            if (!svuotando) {
              _context0.n = 1;
              break;
            }
            return _context0.a(2, 0);
          case 1:
            svuotando = true;
            inviate = 0;
            _context0.p = 2;
            coda = jl(CHIAVE_CODA, []);
          case 3:
            if (!coda.length) {
              _context0.n = 9;
              break;
            }
            _context0.p = 4;
            _context0.n = 5;
            return inviaRicetta(coda[0]);
          case 5:
            _context0.n = 8;
            break;
          case 6:
            _context0.p = 6;
            _t9 = _context0.v;
            if (!(_t9.http === 400 || _t9.http === 422)) {
              _context0.n = 7;
              break;
            }
            coda.shift();
            js(CHIAVE_CODA, coda);
            return _context0.a(3, 3);
          case 7:
            return _context0.a(3, 9);
          case 8:
            coda.shift();
            js(CHIAVE_CODA, coda);
            inviate++;
            _context0.n = 3;
            break;
          case 9:
            _context0.p = 9;
            svuotando = false;
            return _context0.f(9);
          case 10:
            return _context0.a(2, inviate);
        }
      }, _callee0, null, [[4, 6], [2,, 9, 10]]);
    }));
    return _svuotaCoda.apply(this, arguments);
  }
  MP.ricette = {
    getIdee,
    salvaRicetta,
    svuotaCoda,
    inCoda: function inCoda() {
      return jl(CHIAVE_CODA, []).length;
    }
  };
})();