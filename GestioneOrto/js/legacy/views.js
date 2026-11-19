function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(typeof e + " is not iterable"); }
function _createForOfIteratorHelper(e, t) { var _n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"]; if (!_n) { if (Array.isArray(e) || (_n = _unsupportedIterableToArray(e)) || t && e && "number" == typeof e.length) { _n && (e = _n); var o = 0, F = function F() {}; return { s: F, n: function n() { return o >= e.length ? { done: !0 } : { done: !1, value: e[o++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var a, u, i = !0; return { s: function s() { _n = _n.call(e); }, n: function n() { i = !0; var r = _n.next(); return r.done ? { done: !0 } : { value: r.value, done: i = !1 }; }, e: function e(r) { a = !0, u = r; }, f: function f() { try { i || null == _n.return || _n.return(); } finally { if (a) throw u; } } }; }
function _slicedToArray(e, i) { return _iterableToArrayLimit(e, i) || _unsupportedIterableToArray(e, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, t) { var e = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (Array.isArray(r) && (null == e || e === ("undefined" != typeof Symbol && [][Symbol.iterator]) || e === []["@@iterator"])) return r; if (null != e) { var l, n, i, a, u = [], o = !0, f = !1; try { if (i = (e = e.call(r)).next, 0 === t) { if (Object(e) !== e) return; o = !1; } else for (; !(o = (l = i.call(e)).done) && (u.push(l.value), u.length !== t); o = !0); } catch (r) { f = !0, n = r; } finally { try { if (!o && null != e.return && (a = e.return(), Object(a) !== a)) return; } finally { if (f) throw n; } } return u; } }
function _toConsumableArray(a) { return _arrayWithoutHoles(a) || _iterableToArray(a) || _unsupportedIterableToArray(a) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(t, e) { if (t) { if ("string" == typeof t) return _arrayLikeToArray(t, e); var o = {}.toString.call(t).slice(8, -1); return "Object" === o && t.constructor && (o = t.constructor.name), "Map" === o || "Set" === o ? Array.from(t) : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? _arrayLikeToArray(t, e) : void 0; } }
function _iterableToArray(r) { var e = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (Array.isArray(r) && (null == e || e === ("undefined" != typeof Symbol && [][Symbol.iterator]) || e === []["@@iterator"])) return r; if (null != e) { for (var t, o = [], a = e.call(r); !(t = a.next()).done;) o.push(t.value); return o; } }
function _arrayWithoutHoles(a) { if (Array.isArray(a)) return _arrayLikeToArray(a); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var r, e, o = "function" == typeof Symbol ? Symbol : {}, n = o.iterator || "@@iterator", a = o.toStringTag || "@@toStringTag"; function i(o, n, a, i) { var u = n && n.prototype instanceof Generator ? n : Generator, f = Object.create(u.prototype); return _regeneratorDefine2(f, "_invoke", function (t, o, n) { var a, i, u, f = 0, p = n || [], y = !1, G = { p: 0, n: 0, v: r, a: l, f: l.bind(r, 4), d: function d(t, e) { return a = t, i = 0, u = r, G.n = e, c; } }; function l(t, o) { for (i = t, u = o, e = 0; !y && f && !n && e < p.length; e++) { var n, a = p[e], l = G.p, F = a[2]; t > 3 ? (n = F === o) && (u = a[(i = a[4]) ? 5 : (i = 3, 3)], a[4] = a[5] = r) : a[0] <= l && ((n = t < 2 && l < a[1]) ? (i = 0, G.v = o, G.n = a[1]) : l < F && (n = t < 3 || a[0] > o || o > F) && (a[4] = t, a[5] = o, G.n = F, i = 0)); } if (n || t > 1) return c; throw y = !0, o; } return function (n, p, F) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && l(p, F), i = p, u = F; (e = i < 2 ? r : u) || !y;) { a || (i ? (i > 1 && (G.n = i < 3 ? -1 : u), l(i, u)) : G.v = u); try { if (f = 2, a) { if (i || (n = "next"), e = a[n]) { if (!(e = e.call(a, u))) throw TypeError("iterator result is not an object"); if (!e.done) return e; u = e.value, i < 2 && (i = 0); } else 1 === i && (e = a.return) && e.call(a), i < 2 && (u = TypeError("The iterator does not provide a '" + n + "' method"), i = 1); a = r; } else if ((e = (y = G.n < 0) ? u : t.call(o, G)) !== c) break; } catch (t) { a = r, i = 1, u = t; } finally { f = 1; } } return { value: e, done: y }; }; }(o, a, i), !0), f; } var c = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} e = Object.getPrototypeOf; var u = [][n] ? e(e([][n]())) : (_regeneratorDefine2(e = {}, n, function () { return this; }), e), f = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(u); function p(r) { return Object.setPrototypeOf ? Object.setPrototypeOf(r, GeneratorFunctionPrototype) : (r.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(r, a, "GeneratorFunction")), r.prototype = Object.create(f), r; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(f, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, a, "GeneratorFunction"), _regeneratorDefine2(f), _regeneratorDefine2(f, a, "Generator"), _regeneratorDefine2(f, n, function () { return this; }), _regeneratorDefine2(f, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: p }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/* Gestione Orto PWA - schermate principali: Attività, Orti, dettaglio orto, Schema + azioni condivise (menu verdura, solco, contenitore). */
(function () {
  'use strict';

  var GO = window.GO;
  var D = GO.D,
    L = GO.L,
    S = GO.S,
    UI = GO.UI,
    ST = GO.net;
  var h = UI.h;
  var V = GO.V = {};
  V.st = {
    att: {
      sez: 'cal',
      orto: 0,
      ricerca: ''
    },
    orto: {
      sez: 'pan',
      filtro: 'Tutte le verdure',
      ricerca: ''
    },
    schema: {
      ortoId: 0
    }
  };
  var go = function go(x) {
    return GO.nav.go(x);
  };
  var gruppoVoci = function gruppoVoci(arr, key) {
    var m = new Map();
    arr.forEach(function (x) {
      var k = key(x);
      if (!m.has(k)) m.set(k, []);
      m.get(k).push(x);
    });
    return m;
  };
  var nomeOrto = function nomeOrto(id) {
    var o = S.orto(id);
    return o ? o.nome : 'orto eliminato';
  };

  // =====================================================================
  // Azioni condivise
  // =====================================================================
  V.scegliSostanza = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(titolo) {
      var n, a;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return UI.sheet(titolo, D.SUGGERIMENTI_CONCIMI.concat(['Altro…']), {
              cancel: 'Annulla'
            });
          case 1:
            n = _context.v;
            if (n) {
              _context.n = 2;
              break;
            }
            return _context.a(2, null);
          case 2:
            if (!(n === 'Altro…')) {
              _context.n = 4;
              break;
            }
            _context.n = 3;
            return UI.prompt('Altra sostanza', 'Nome della sostanza:', {
              ok: 'Avanti',
              validate: function validate(v) {
                return v ? null : 'Scrivi il nome della sostanza.';
              }
            });
          case 3:
            a = _context.v;
            return _context.a(2, a ? a.trim() : null);
          case 4:
            return _context.a(2, n);
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
  V.aggiungiConcimeVerdura = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(c) {
      var nome, data;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return V.scegliSostanza("Cosa aggiungi a ".concat(c.verdura, "?"));
          case 1:
            nome = _context2.v;
            if (nome) {
              _context2.n = 2;
              break;
            }
            return _context2.a(2, false);
          case 2:
            _context2.n = 3;
            return UI.askDate("Data di inserimento: ".concat(nome), L.iso(L.today()));
          case 3:
            data = _context2.v;
            if (data) {
              _context2.n = 4;
              break;
            }
            return _context2.a(2, false);
          case 4:
            S.addRiga('trattVerdura', {
              ortoId: c.ortoId,
              coltId: c.id,
              sostanza: nome,
              data
            });
            return _context2.a(2, true);
        }
      }, _callee2);
    }));
    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  var scegliVoce = /*#__PURE__*/function () {
    var _scegliVoce = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(titolo, etichette) {
      var i;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            _context3.n = 1;
            return UI.sheet(titolo, etichette.map(function (e, i) {
              return {
                label: e,
                value: i
              };
            }), {
              cancel: 'Annulla'
            });
          case 1:
            i = _context3.v;
            return _context3.a(2, i == null ? -1 : i);
        }
      }, _callee3);
    }));
    function scegliVoce(_x3, _x4) {
      return _scegliVoce.apply(this, arguments);
    }
    return scegliVoce;
  }();
  V.modificaSostanzaData = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(sostanza, data) {
      var nome, nd;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            _context4.n = 1;
            return UI.prompt('Modifica sostanza', 'Nome della sostanza:', {
              value: sostanza,
              ok: 'Avanti',
              validate: function validate(v) {
                return v ? null : 'Scrivi il nome della sostanza.';
              }
            });
          case 1:
            nome = _context4.v;
            if (nome) {
              _context4.n = 2;
              break;
            }
            return _context4.a(2, null);
          case 2:
            _context4.n = 3;
            return UI.askDate("Data di inserimento: ".concat(nome.trim()), data);
          case 3:
            nd = _context4.v;
            return _context4.a(2, nd ? {
              sostanza: nome.trim(),
              data: nd
            } : null);
        }
      }, _callee4);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();
  var formRaccolto = /*#__PURE__*/function () {
    var _formRaccolto = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(verdura, r) {
      var pref, res, numero;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            pref = S.set().unitaPref[verdura.trim().toLowerCase()] || 'pz';
            _context5.n = 1;
            return UI.form(r ? "Modifica raccolto: ".concat(verdura) : "Registra raccolto: ".concat(verdura), [{
              key: 'data',
              label: 'Data del raccolto',
              type: 'date',
              value: r ? r.data : L.iso(L.today()),
              autofocus: false
            }, {
              key: 'numero',
              label: 'Quantità raccolta (solo il numero, es. 5 o 2,5; facoltativa)',
              type: 'number',
              value: r && r.numero != null ? L.num(r.numero) : '',
              autofocus: true
            }, {
              key: 'unita',
              label: 'Unità di misura',
              type: 'select',
              options: D.UNITA.map(function (u) {
                return {
                  v: u,
                  l: u
                };
              }),
              value: r && r.unita ? r.unita : pref
            }], {
              ok: 'Salva',
              validate: function validate(v) {
                return !v.data ? 'Scegli la data.' : v.numero && !(L.parseNum(v.numero) >= 0) ? 'Scrivi un numero, ad esempio 5 oppure 2,5.' : null;
              }
            });
          case 1:
            res = _context5.v;
            if (res) {
              _context5.n = 2;
              break;
            }
            return _context5.a(2, null);
          case 2:
            numero = res.numero ? L.parseNum(res.numero) : null;
            if (numero != null) S.set().unitaPref[verdura.trim().toLowerCase()] = res.unita;
            return _context5.a(2, {
              data: res.data,
              numero,
              unita: numero == null ? '' : res.unita
            });
        }
      }, _callee5);
    }));
    function formRaccolto(_x7, _x8) {
      return _formRaccolto.apply(this, arguments);
    }
    return formRaccolto;
  }();
  V.registraRaccolto = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(c) {
      var r, orto;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            _context6.n = 1;
            return formRaccolto(c.verdura, null);
          case 1:
            r = _context6.v;
            if (r) {
              _context6.n = 2;
              break;
            }
            return _context6.a(2, false);
          case 2:
            orto = S.orto(c.ortoId);
            S.addRiga('raccolti', {
              ortoId: c.ortoId,
              coltId: c.id,
              verdura: c.verdura,
              orto: orto ? orto.nome : '',
              data: r.data,
              numero: r.numero,
              unita: r.unita,
              note: null
            });
            return _context6.a(2, true);
        }
      }, _callee6);
    }));
    return function (_x9) {
      return _ref4.apply(this, arguments);
    };
  }();
  V.modificaRaccoltoVoce = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(r) {
      var n;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            _context7.n = 1;
            return formRaccolto(r.verdura, r);
          case 1:
            n = _context7.v;
            if (n) {
              _context7.n = 2;
              break;
            }
            return _context7.a(2, false);
          case 2:
            Object.assign(r, n);
            S.save();
            return _context7.a(2, true);
        }
      }, _callee7);
    }));
    return function (_x0) {
      return _ref5.apply(this, arguments);
    };
  }();

  /** Menu che si apre toccando una verdura. Ritorna true se qualcosa è cambiato. */
  V.menuVerdura = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(coltId) {
      var c, concimi, raccolti, cont, luogo, titolo, voci, s, d, i, n, _i, _i2, _i3, _t;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.n) {
          case 0:
            c = S.get('coltivazioni', coltId);
            if (c) {
              _context8.n = 1;
              break;
            }
            return _context8.a(2, false);
          case 1:
            concimi = L.sortBy(S.db.trattVerdura.filter(function (t) {
              return t.coltId === c.id;
            }), function (t) {
              return t.data;
            });
            raccolti = L.sortBy(S.db.raccolti.filter(function (r) {
              return r.coltId === c.id;
            }), function (r) {
              return r.data;
            }, function (r) {
              return r.id;
            });
            cont = c.oggettoId != null ? S.get('oggetti', c.oggettoId) : null;
            luogo = "".concat(nomeOrto(c.ortoId), " · ").concat(cont ? cont.nome : c.solco > 0 ? "solco ".concat(c.solco) : 'senza posto');
            titolo = "".concat(L.emoji(c.verdura), " ").concat(c.verdura).concat(c.tipologia ? ' ' + c.tipologia : '', "\n").concat(L.dettagliColt(c, luogo, concimi, raccolti));
            voci = [{
              label: '💧 Annaffiata oggi',
              value: 'ann'
            }, {
              label: "💧 Annaffiata in un'altra data…",
              value: 'annd'
            }, {
              label: '🧪 Aggiungi concime / sostanza',
              value: 'cadd'
            }];
            if (concimi.length) voci.push({
              label: '🧪 Modifica un concime',
              value: 'cmod'
            }, {
              label: '🧪 Elimina un concime',
              value: 'cdel'
            });
            voci.push({
              label: '🧺 Registra un raccolto',
              value: 'radd'
            });
            if (raccolti.length) voci.push({
              label: '🧺 Modifica un raccolto',
              value: 'rmod'
            }, {
              label: '🧺 Elimina un raccolto',
              value: 'rdel'
            });
            voci.push({
              label: '🌱 Trapianta…',
              value: 'trap'
            }, {
              label: 'Modifica',
              value: 'mod'
            }, {
              label: 'Elimina',
              value: 'del',
              danger: true
            });
            _context8.n = 2;
            return UI.sheet(titolo, voci);
          case 2:
            s = _context8.v;
            _t = s;
            _context8.n = _t === 'ann' ? 3 : _t === 'annd' ? 4 : _t === 'cadd' ? 7 : _t === 'cmod' ? 8 : _t === 'cdel' ? 13 : _t === 'radd' ? 16 : _t === 'rmod' ? 17 : _t === 'rdel' ? 19 : _t === 'trap' ? 22 : _t === 'mod' ? 23 : _t === 'del' ? 24 : 25;
            break;
          case 3:
            c.ultimaAnn = L.iso(L.today());
            S.save();
            return _context8.a(2, true);
          case 4:
            _context8.n = 5;
            return UI.askDate("Data dell'annaffiatura", c.ultimaAnn || L.iso(L.today()));
          case 5:
            d = _context8.v;
            if (d) {
              _context8.n = 6;
              break;
            }
            return _context8.a(2, false);
          case 6:
            c.ultimaAnn = d;
            S.save();
            return _context8.a(2, true);
          case 7:
            return _context8.a(2, V.aggiungiConcimeVerdura(c));
          case 8:
            _context8.n = 9;
            return scegliVoce("Modifica quale voce di ".concat(c.verdura, "?"), concimi.map(function (t) {
              return "".concat(t.sostanza, " (").concat(L.fmtS(t.data), ")");
            }));
          case 9:
            i = _context8.v;
            if (!(i < 0)) {
              _context8.n = 10;
              break;
            }
            return _context8.a(2, false);
          case 10:
            _context8.n = 11;
            return V.modificaSostanzaData(concimi[i].sostanza, concimi[i].data);
          case 11:
            n = _context8.v;
            if (n) {
              _context8.n = 12;
              break;
            }
            return _context8.a(2, false);
          case 12:
            Object.assign(concimi[i], n);
            S.save();
            return _context8.a(2, true);
          case 13:
            _context8.n = 14;
            return scegliVoce("Elimina quale voce di ".concat(c.verdura, "?"), concimi.map(function (t) {
              return "".concat(t.sostanza, " (").concat(L.fmtS(t.data), ")");
            }));
          case 14:
            _i = _context8.v;
            if (!(_i < 0)) {
              _context8.n = 15;
              break;
            }
            return _context8.a(2, false);
          case 15:
            S.delRiga('trattVerdura', concimi[_i].id);
            return _context8.a(2, true);
          case 16:
            return _context8.a(2, V.registraRaccolto(c));
          case 17:
            _context8.n = 18;
            return scegliVoce("Modifica quale raccolto di ".concat(c.verdura, "?"), raccolti.map(L.descriviRaccolto));
          case 18:
            _i2 = _context8.v;
            return _context8.a(2, _i2 >= 0 && V.modificaRaccoltoVoce(raccolti[_i2]));
          case 19:
            _context8.n = 20;
            return scegliVoce("Elimina quale raccolto di ".concat(c.verdura, "?"), raccolti.map(L.descriviRaccolto));
          case 20:
            _i3 = _context8.v;
            if (!(_i3 < 0)) {
              _context8.n = 21;
              break;
            }
            return _context8.a(2, false);
          case 21:
            S.delRiga('raccolti', raccolti[_i3].id);
            return _context8.a(2, true);
          case 22:
            return _context8.a(2, V.trapianta(c));
          case 23:
            go("#/orto/".concat(c.ortoId, "/verdura/").concat(c.id));
            return _context8.a(2, false);
          case 24:
            return _context8.a(2, V.eliminaColt(c));
          case 25:
            return _context8.a(2, false);
          case 26:
            return _context8.a(2);
        }
      }, _callee8);
    }));
    return function (_x1) {
      return _ref6.apply(this, arguments);
    };
  }();
  V.eliminaColt = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(c) {
      var fam, posto, avviso;
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.n) {
          case 0:
            fam = L.famiglia(c.verdura);
            posto = c.oggettoId != null ? 'in questa serra o aiuola' : c.solco > 0 ? "nel solco ".concat(c.solco) : null;
            avviso = 'Verranno eliminati anche i suoi concimi e trattamenti. I raccolti registrati restano.';
            if (fam && posto) avviso += "\n\nPer la rotazione resterà annotato che ".concat(posto, " c'era una pianta di famiglia ").concat(fam, ": potrai toglierlo a mano dalla lista del solco o dallo storico dell'oggetto.");
            _context9.n = 1;
            return UI.confirm("Elimina ".concat(c.verdura), avviso, {
              ok: 'Elimina',
              danger: true
            });
          case 1:
            if (_context9.v) {
              _context9.n = 2;
              break;
            }
            return _context9.a(2, false);
          case 2:
            S.deleteColt(c.id);
            return _context9.a(2, true);
        }
      }, _callee9);
    }));
    return function (_x10) {
      return _ref7.apply(this, arguments);
    };
  }();

  // ---------- Trapianto ----------
  var occupanti = function occupanti(colture) {
    var m = new Map();
    colture.forEach(function (x) {
      var k = x.verdura.toLowerCase();
      var cur = m.get(k) || {
        n: x.verdura,
        q: 0
      };
      cur.q += Math.max(1, L.piantine(x));
      m.set(k, cur);
    });
    return m.size ? Array.from(m.values()).map(function (g) {
      return "".concat(g.n, " x ").concat(g.q);
    }).join(', ') : 'libero';
  };
  V.trapianta = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(c) {
      var orti, attuale, cont0, origine, scelta;
      return _regenerator().w(function (_context0) {
        while (1) switch (_context0.n) {
          case 0:
            orti = S.orti().slice().sort(function (a, b) {
              return a.id === c.ortoId ? -1 : b.id === c.ortoId ? 1 : L.cmpText(a.nome, b.nome);
            });
            attuale = S.orto(c.ortoId);
            if (attuale) {
              _context0.n = 1;
              break;
            }
            return _context0.a(2, false);
          case 1:
            cont0 = c.oggettoId != null ? S.get('oggetti', c.oggettoId) : null;
            origine = "".concat(attuale.nome, " · ").concat(cont0 ? cont0.nome : c.solco > 0 ? "solco ".concat(c.solco) : 'senza posto');
            _context0.n = 2;
            return UI.modal(function (close) {
              var pOrto = UI.field({
                label: 'In quale orto?',
                type: 'select',
                options: orti.map(function (o) {
                  return {
                    v: o.id,
                    l: "".concat(L.isBalcone(o) ? '🪴' : '🌾', " ").concat(o.nome).concat(o.id === c.ortoId ? ' (questo orto)' : '')
                  };
                }),
                value: c.ortoId
              });
              var pPosto = UI.field({
                label: 'Dove? (solco o contenitore)',
                type: 'select',
                options: []
              });
              var qta = UI.field({
                label: "Quante piantine? (in questo posto ce ne sono ".concat(L.piantine(c), ")"),
                type: 'int',
                value: String(L.piantine(c))
              });
              var nessuno = h('p', {
                class: 'note warn',
                hidden: true
              });
              var riepilogo = h('p', {
                class: 'dlg-m'
              });
              var avvisi = h('p', {
                class: 'note warn',
                hidden: true
              });
              var err = h('p', {
                class: 'err',
                hidden: true
              });
              var ok = h('button', {
                class: 'btn primary',
                text: '🌱 Trapianta'
              });
              var posti = [],
                altre = [],
                storico = [];
              var dest = function dest() {
                return S.orto(pOrto.get());
              };
              var carica = function carica() {
                var d = dest();
                var cont = S.oggettiOrto(d.id).filter(function (o) {
                  return L.tipo(o.tipo).ospita && o.id !== c.oggettoId;
                });
                var solchi = L.isBalcone(d) ? 0 : S.totaleSolchi(d.id);
                altre = S.db.coltivazioni.filter(function (x) {
                  return x.ortoId === d.id && x.id !== c.id;
                });
                storico = S.db.trattSolco.filter(function (t) {
                  return t.ortoId === d.id && t.note === 'Coltura rimossa';
                });
                posti = cont.map(function (o) {
                  return {
                    l: "".concat(L.tipo(o.tipo).emoji, " ").concat(o.nome, " — ").concat(occupanti(altre.filter(function (x) {
                      return x.oggettoId === o.id;
                    }))),
                    solco: null,
                    cont: o
                  };
                });
                var stesso = d.id === c.ortoId && c.oggettoId == null;
                var _loop = function _loop(k) {
                  if (!(stesso && c.solco === k)) posti.push({
                    l: "🌾 Solco ".concat(k, " — ").concat(occupanti(altre.filter(function (x) {
                      return x.oggettoId == null && x.solco === k;
                    }))),
                    solco: k,
                    cont: null
                  });
                };
                for (var k = 1; k <= solchi; k++) {
                  _loop(k);
                }
                UI.clear(pPosto.input);
                posti.forEach(function (p, i) {
                  return pPosto.input.append(h('option', {
                    value: String(i),
                    text: p.l
                  }));
                });
                pPosto.input.selectedIndex = posti.length ? 0 : -1;
                nessuno.hidden = posti.length > 0;
                nessuno.textContent = L.isBalcone(d) ? "In «".concat(d.nome, "» non c'è ancora nessun vaso, cassetta o altro contenitore: aggiungine uno dagli oggetti dell'orto.") : "In «".concat(d.nome, "» non ci sono solchi né contenitori: indica i solchi da «Modifica orto» oppure aggiungi un oggetto.");
                aggiorna();
              };
              var posto = function posto() {
                return pPosto.input.selectedIndex >= 0 ? posti[pPosto.input.selectedIndex] : null;
              };
              var aggiorna = function aggiorna() {
                err.hidden = true;
                var p = posto();
                ok.disabled = !p;
                if (!p) {
                  riepilogo.textContent = '';
                  avvisi.hidden = true;
                  return;
                }
                var d = dest();
                var av = L.avvisiRotazione(c.verdura, L.iso(L.today()), p.solco, p.cont ? p.cont.id : null, altre, storico);
                var vicini = p.cont ? altre.filter(function (x) {
                  return x.oggettoId === p.cont.id;
                }) : altre.filter(function (x) {
                  return x.oggettoId == null && x.solco > 0 && Math.abs(x.solco - p.solco) <= 1;
                });
                L.uniqueCI(vicini.map(function (x) {
                  return x.verdura;
                })).forEach(function (n) {
                  if (!L.eq(n, c.verdura) && L.valuta(c.verdura, n, S.db.abbinamenti) < 0) av.push("⚠️ ".concat(n, ": meglio tenerla separata da ").concat(c.verdura, "."));
                });
                av.push.apply(av, _toConsumableArray(L.avvisiBalcone(c.verdura, d, p.cont)));
                riepilogo.textContent = "Da: ".concat(origine, "\nA: ").concat(d.nome, " · ").concat(p.cont ? p.cont.nome : "solco ".concat(p.solco), "\n\nResta la data di messa a dimora originale; concimi e raccolti già registrati seguono la verdura.");
                avvisi.textContent = av.join('\n\n');
                avvisi.hidden = av.length === 0;
              };
              pOrto.input.addEventListener('change', carica);
              pPosto.input.addEventListener('change', aggiorna);
              ok.addEventListener('click', function () {
                var p = posto();
                if (!p) return;
                var quantita = null;
                if (L.piantine(c) > 1) {
                  var n = parseInt(qta.get(), 10);
                  if (!(n >= 1 && n <= L.piantine(c)) || String(n) !== qta.get()) {
                    err.textContent = "Numero non valido: inserisci un numero da 1 a ".concat(L.piantine(c), ".");
                    err.hidden = false;
                    return;
                  }
                  if (n < L.piantine(c)) quantita = n;
                }
                close({
                  ortoId: dest().id,
                  solco: p.solco,
                  oggettoId: p.cont ? p.cont.id : null,
                  quantita
                });
              });
              carica();
              return h('div', null, h('h2', {
                class: 'dlg-t',
                text: "Trapianta ".concat(c.verdura)
              }), h('p', {
                class: 'dlg-m',
                text: "".concat(L.emoji(c.verdura), " ").concat(c.verdura, "\nDa: ").concat(origine)
              }), orti.length > 1 ? pOrto.el : null, pPosto.el, nessuno, L.piantine(c) > 1 ? qta.el : null, riepilogo, avvisi, err, h('div', {
                class: 'dlg-b'
              }, h('button', {
                class: 'btn',
                onclick: function onclick() {
                  return close(null);
                },
                text: 'Annulla'
              }), ok));
            }, {
              cancelValue: null
            });
          case 2:
            scelta = _context0.v;
            if (scelta) {
              _context0.n = 3;
              break;
            }
            return _context0.a(2, false);
          case 3:
            S.trapianta(c.id, scelta.ortoId, scelta.solco, scelta.oggettoId, "trapiantata il ".concat(L.fmt(L.today()), " da ").concat(origine), scelta.quantita);
            return _context0.a(2, true);
        }
      }, _callee0);
    }));
    return function (_x11) {
      return _ref8.apply(this, arguments);
    };
  }();

  // ---------- Solchi, contenitori, passaggi ----------
  V.titoloContenitore = function (o, dentro) {
    var t = "".concat(L.tipo(o.tipo).emoji, " ").concat(o.nome);
    if (!dentro.length) return t;
    t += "\n".concat(dentro.length === 1 ? '1 verdura' : "".concat(dentro.length, " verdure"), ":\n") + dentro.slice(0, 8).map(L.rigaCompatta).join('\n');
    if (dentro.length > 8) t += "\n… e altre ".concat(dentro.length - 8);
    return t;
  };
  var menuTratt = /*#__PURE__*/function () {
    var _menuTratt = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(ortoId, titolo, delPosto, nuova, rottaVerdura, extra) {
      var voci, s, nome, data, righe, i, n, x;
      return _regenerator().w(function (_context1) {
        while (1) switch (_context1.n) {
          case 0:
            voci = [{
              label: '🥕 Aggiungi una verdura',
              value: 'v'
            }, {
              label: 'Aggiungi concime / sostanza',
              value: 'c'
            }, {
              label: 'Modifica una voce',
              value: 'm'
            }, {
              label: 'Elimina una voce',
              value: 'e'
            }].concat(extra.map(function (x, i) {
              return {
                label: x.voce,
                value: "x".concat(i),
                danger: x.danger
              };
            }));
            _context1.n = 1;
            return UI.sheet(titolo, voci);
          case 1:
            s = _context1.v;
            if (s) {
              _context1.n = 2;
              break;
            }
            return _context1.a(2, false);
          case 2:
            if (!(s === 'v')) {
              _context1.n = 3;
              break;
            }
            go(rottaVerdura);
            return _context1.a(2, false);
          case 3:
            if (!(s === 'c')) {
              _context1.n = 8;
              break;
            }
            _context1.n = 4;
            return V.scegliSostanza('Cosa aggiungi?');
          case 4:
            nome = _context1.v;
            if (nome) {
              _context1.n = 5;
              break;
            }
            return _context1.a(2, false);
          case 5:
            _context1.n = 6;
            return UI.askDate("Data di inserimento: ".concat(nome), L.iso(L.today()));
          case 6:
            data = _context1.v;
            if (data) {
              _context1.n = 7;
              break;
            }
            return _context1.a(2, false);
          case 7:
            S.addRiga('trattSolco', Object.assign(nuova(), {
              sostanza: nome,
              data,
              note: null
            }));
            return _context1.a(2, true);
          case 8:
            if (!(s === 'm' || s === 'e')) {
              _context1.n = 16;
              break;
            }
            righe = S.trattSolchi(ortoId).filter(delPosto);
            if (righe.length) {
              _context1.n = 10;
              break;
            }
            _context1.n = 9;
            return UI.alert('Nessuna voce', "Qui non c'è ancora nessuna sostanza registrata.");
          case 9:
            return _context1.a(2, false);
          case 10:
            _context1.n = 11;
            return scegliVoce(s === 'm' ? 'Modifica quale voce?' : 'Elimina quale voce?', righe.map(L.descriviTratt));
          case 11:
            i = _context1.v;
            if (!(i < 0)) {
              _context1.n = 12;
              break;
            }
            return _context1.a(2, false);
          case 12:
            if (!(s === 'e')) {
              _context1.n = 13;
              break;
            }
            S.delRiga('trattSolco', righe[i].id);
            return _context1.a(2, true);
          case 13:
            _context1.n = 14;
            return V.modificaSostanzaData(righe[i].sostanza, righe[i].data);
          case 14:
            n = _context1.v;
            if (n) {
              _context1.n = 15;
              break;
            }
            return _context1.a(2, false);
          case 15:
            Object.assign(righe[i], n);
            S.save();
            return _context1.a(2, true);
          case 16:
            x = extra[parseInt(s.slice(1), 10)];
            return _context1.a(2, x ? x.azione() : false);
        }
      }, _callee1);
    }));
    function menuTratt(_x12, _x13, _x14, _x15, _x16, _x17) {
      return _menuTratt.apply(this, arguments);
    }
    return menuTratt;
  }();
  V.menuSolco = function (ortoId, solco) {
    return menuTratt(ortoId, "Solco ".concat(solco), function (t) {
      return t.oggettoId == null && t.solco === solco;
    }, function () {
      return {
        ortoId,
        solco,
        oggettoId: null
      };
    }, "#/orto/".concat(ortoId, "/verdura/0?solco=").concat(solco), [{
      voce: '🗑️ Rimuovi solco…',
      azione: function azione() {
        return V.rimuoviSolcoUI(ortoId, solco);
      }
    }]);
  };
  V.menuContenitore = /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(o) {
      var dentro;
      return _regenerator().w(function (_context11) {
        while (1) switch (_context11.n) {
          case 0:
            dentro = L.sortBy(S.db.coltivazioni.filter(function (c) {
              return c.oggettoId === o.id;
            }), function (c) {
              return c.data;
            });
            return _context11.a(2, menuTratt(o.ortoId, V.titoloContenitore(o, dentro), function (t) {
              return t.oggettoId === o.id;
            }, function () {
              return {
                ortoId: o.ortoId,
                solco: 0,
                oggettoId: o.id
              };
            }, "#/orto/".concat(o.ortoId, "/verdura/0?oggetto=").concat(o.id), [{
              voce: 'Sposta o rinomina…',
              azione: function azione() {
                return V.gestisciPosizioneOggetto(o);
              }
            }, {
              voce: 'Apri registro',
              azione: function () {
                var _azione = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
                  return _regenerator().w(function (_context10) {
                    while (1) switch (_context10.n) {
                      case 0:
                        go("#/oggetto/".concat(o.id));
                        return _context10.a(2, false);
                    }
                  }, _callee10);
                }));
                function azione() {
                  return _azione.apply(this, arguments);
                }
                return azione;
              }()
            }]));
        }
      }, _callee11);
    }));
    return function (_x18) {
      return _ref9.apply(this, arguments);
    };
  }();
  V.rimuoviSolcoUI = /*#__PURE__*/function () {
    var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(ortoId, solco) {
      var info, cont, u, titolo, voci, sost, inAiuola, conseg, _t2, _t3;
      return _regenerator().w(function (_context12) {
        while (1) switch (_context12.p = _context12.n) {
          case 0:
            _context12.p = 0;
            info = S.anteprimaRimozioneSolco(ortoId, solco);
            _context12.n = 3;
            break;
          case 1:
            _context12.p = 1;
            _t2 = _context12.v;
            _context12.n = 2;
            return UI.alert('Solco non rimovibile', _t2.message);
          case 2:
            return _context12.a(2, false);
          case 3:
            cont = [];
            if (info.verdure.length) {
              u = L.uniqueCI(info.verdure);
              cont.push("".concat(info.verdure.length, " verdure (").concat(u.slice(0, 5).join(', ')).concat(u.length > 5 ? '…' : '', ")"));
            }
            if (info.concimi > 0) cont.push("".concat(info.concimi, " concimi/sostanze"));
            if (info.colture > 0) cont.push("".concat(info.colture, " colture nello storico della rotazione"));
            titolo = "Rimuovi il solco ".concat(solco) + (cont.length === 0 ? ' (vuoto)' : "\nContiene: ".concat(cont.join(', ')));
            voci = [{
              label: 'Rimuovi e rinumera i solchi successivi',
              value: 'nessuna'
            }, {
              label: "Sostituisci con un'aiuola rialzata",
              value: 'aiuola'
            }];
            if (info.passaggioPossibile) voci.push({
              label: 'Sostituisci con un passaggio',
              value: 'passaggio'
            });
            _context12.n = 4;
            return UI.sheet(titolo, voci, {
              cancel: 'Annulla'
            });
          case 4:
            sost = _context12.v;
            if (sost) {
              _context12.n = 5;
              break;
            }
            return _context12.a(2, false);
          case 5:
            inAiuola = sost === 'aiuola';
            conseg = [];
            if (inAiuola) {
              if (info.verdure.length) conseg.push("Le ".concat(info.verdure.length, " verdure passano nella nuova aiuola, con i loro concimi e lo storico della rotazione."));
            } else {
              if (info.verdure.length) conseg.push("Verranno eliminate ".concat(info.verdure.length, " verdure con i loro concimi (i raccolti già registrati restano)."));
              if (info.concimi + info.colture > 0) conseg.push("Verranno cancellati i concimi del solco e lo storico della rotazione (".concat(info.concimi + info.colture, " voci)."));
            }
            info.nuoviVicini.forEach(function (v) {
              return conseg.push("⚠️ ".concat(v));
            });
            conseg.push("I solchi successivi scalano di uno. L'operazione non si può annullare.");
            _context12.n = 6;
            return UI.confirm("Rimuovere il solco ".concat(solco, "?"), conseg.join('\n\n'), {
              ok: 'Rimuovi',
              danger: true
            });
          case 6:
            if (_context12.v) {
              _context12.n = 7;
              break;
            }
            return _context12.a(2, false);
          case 7:
            _context12.p = 7;
            S.rimuoviSolco(ortoId, solco, sost, !inAiuola);
            _context12.n = 10;
            break;
          case 8:
            _context12.p = 8;
            _t3 = _context12.v;
            _context12.n = 9;
            return UI.alert('Solco non rimosso', _t3.message);
          case 9:
            return _context12.a(2, false);
          case 10:
            return _context12.a(2, true);
        }
      }, _callee12, null, [[7, 8], [0, 1]]);
    }));
    return function (_x19, _x20) {
      return _ref0.apply(this, arguments);
    };
  }();
  V.gestisciPassaggio = /*#__PURE__*/function () {
    var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(id) {
      var p, totale, s, occ, libere, k, i;
      return _regenerator().w(function (_context13) {
        while (1) switch (_context13.n) {
          case 0:
            p = S.get('oggetti', id);
            if (p) {
              _context13.n = 1;
              break;
            }
            return _context13.a(2, false);
          case 1:
            totale = S.totaleSolchi(p.ortoId);
            _context13.n = 2;
            return UI.sheet("Passaggio tra il solco ".concat(p.dopoSolco, " e il solco ").concat(p.dopoSolco + 1), [{
              label: '↕️ Sposta…',
              value: 's'
            }, {
              label: '🗑️ Elimina',
              value: 'e',
              danger: true
            }]);
          case 2:
            s = _context13.v;
            if (!(s === 'e')) {
              _context13.n = 3;
              break;
            }
            S.delRiga('oggetti', id);
            return _context13.a(2, true);
          case 3:
            if (!(s !== 's')) {
              _context13.n = 4;
              break;
            }
            return _context13.a(2, false);
          case 4:
            occ = new Set(S.db.oggetti.filter(function (o) {
              return o.ortoId === p.ortoId && o.tipo === D.PASSAGGIO && o.id !== p.id;
            }).map(function (o) {
              return o.dopoSolco;
            }));
            libere = [];
            for (k = 1; k <= totale - 1; k++) if (!occ.has(k) && k !== p.dopoSolco) libere.push(k);
            if (libere.length) {
              _context13.n = 6;
              break;
            }
            _context13.n = 5;
            return UI.alert('Nessuna posizione libera', "Tra gli altri solchi c'è già un passaggio.");
          case 5:
            return _context13.a(2, false);
          case 6:
            _context13.n = 7;
            return scegliVoce('Dove sposti il passaggio?', libere.map(function (k) {
              return "Tra il solco ".concat(k, " e il solco ").concat(k + 1);
            }));
          case 7:
            i = _context13.v;
            if (!(i < 0)) {
              _context13.n = 8;
              break;
            }
            return _context13.a(2, false);
          case 8:
            p.dopoSolco = libere[i];
            S.save();
            return _context13.a(2, true);
        }
      }, _callee13);
    }));
    return function (_x21) {
      return _ref1.apply(this, arguments);
    };
  }();
  V.gestisciPosizioneOggetto = /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(o) {
      var tipo, totale, dove, voci, s, t, cm, i, op, _i4, n;
      return _regenerator().w(function (_context14) {
        while (1) switch (_context14.n) {
          case 0:
            tipo = L.tipo(o.tipo);
            totale = S.totaleSolchi(o.ortoId);
            dove = L.descriviPosizione(o.dopoSolco, totale);
            voci = [];
            if (totale > 0) voci.push({
              label: '↕️ Sposta tra i solchi…',
              value: 's'
            });
            voci.push({
              label: '✏️ Rinomina…',
              value: 'r'
            });
            if (tipo.conProfondita) voci.push({
              label: '📏 Profondità…',
              value: 'p'
            });
            if (tipo.conAlveoli) voci.push({
              label: '🔢 Alveoli…',
              value: 'a'
            });
            _context14.n = 1;
            return UI.sheet(dove ? "".concat(o.nome, " (").concat(dove, ")") : o.nome, voci);
          case 1:
            s = _context14.v;
            if (!(s === 'p')) {
              _context14.n = 5;
              break;
            }
            _context14.n = 2;
            return UI.prompt('Profondità', 'Profondità del terriccio in cm (vuoto = non indicata):', {
              value: o.profCm == null ? '' : o.profCm,
              type: 'int',
              ok: 'Salva',
              validate: function validate(v) {
                return v === '' || /^\d+$/.test(v) && +v >= 1 && +v <= 200 ? null : 'Inserisci un numero di centimetri da 1 a 200.';
              }
            });
          case 2:
            t = _context14.v;
            if (!(t == null)) {
              _context14.n = 3;
              break;
            }
            return _context14.a(2, false);
          case 3:
            cm = t === '' ? null : parseInt(t, 10);
            if (!(cm === o.profCm)) {
              _context14.n = 4;
              break;
            }
            return _context14.a(2, false);
          case 4:
            o.profCm = cm;
            S.save();
            return _context14.a(2, true);
          case 5:
            if (!(s === 'a')) {
              _context14.n = 8;
              break;
            }
            _context14.n = 6;
            return scegliVoce('Quanti alveoli ha la vaschetta?', D.ALVEOLI.map(function (n) {
              return "".concat(n, " alveoli");
            }));
          case 6:
            i = _context14.v;
            if (!(i < 0 || D.ALVEOLI[i] === o.alveoli)) {
              _context14.n = 7;
              break;
            }
            return _context14.a(2, false);
          case 7:
            o.alveoli = D.ALVEOLI[i];
            S.save();
            return _context14.a(2, true);
          case 8:
            if (!(s === 's')) {
              _context14.n = 11;
              break;
            }
            op = L.opzioniPosizione(totale);
            _context14.n = 9;
            return scegliVoce("Dove metti ".concat(o.nome, "?"), op.map(function (x) {
              return x.label;
            }));
          case 9:
            _i4 = _context14.v;
            if (!(_i4 < 0)) {
              _context14.n = 10;
              break;
            }
            return _context14.a(2, false);
          case 10:
            o.dopoSolco = op[_i4].dopo;
            S.save();
            return _context14.a(2, true);
          case 11:
            if (!(s === 'r')) {
              _context14.n = 14;
              break;
            }
            _context14.n = 12;
            return UI.prompt('Rinomina', 'Nuovo nome:', {
              value: o.nome,
              validate: function validate(v) {
                return v ? null : 'Scrivi un nome.';
              }
            });
          case 12:
            n = _context14.v;
            if (!(!n || n.trim() === o.nome)) {
              _context14.n = 13;
              break;
            }
            return _context14.a(2, false);
          case 13:
            o.nome = n.trim();
            S.save();
            return _context14.a(2, true);
          case 14:
            return _context14.a(2, false);
        }
      }, _callee14);
    }));
    return function (_x22) {
      return _ref10.apply(this, arguments);
    };
  }();
  V.gestisciStorico = /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(o) {
      var voci, i;
      return _regenerator().w(function (_context15) {
        while (1) switch (_context15.n) {
          case 0:
            voci = L.sortBy(S.trattSolchi(o.ortoId).filter(function (t) {
              return t.note === 'Coltura rimossa' && t.oggettoId === o.id;
            }), function (t) {
              return t.data;
            }).reverse();
            if (voci.length) {
              _context15.n = 2;
              break;
            }
            _context15.n = 1;
            return UI.alert(o.nome, 'Nessuna coltura nello storico. Qui compaiono le verdure eliminate da questo posto, che la rotazione continua a considerare.');
          case 1:
            return _context15.a(2);
          case 2:
            _context15.n = 3;
            return scegliVoce("Storico di ".concat(o.nome, ": tocca per eliminare"), voci.map(function (t, k) {
              return "".concat(k + 1, ". ").concat(L.descriviTratt(t));
            }));
          case 3:
            i = _context15.v;
            if (!(i < 0)) {
              _context15.n = 4;
              break;
            }
            return _context15.a(2);
          case 4:
            _context15.n = 5;
            return UI.confirm('Elimina dallo storico', "".concat(L.descriviTratt(voci[i]), "\nLa rotazione non terrà più conto di questa coltura."), {
              ok: 'Elimina',
              danger: true
            });
          case 5:
            if (!_context15.v) {
              _context15.n = 6;
              break;
            }
            S.delRiga('trattSolco', voci[i].id);
          case 6:
            return _context15.a(2);
        }
      }, _callee15);
    }));
    return function (_x23) {
      return _ref11.apply(this, arguments);
    };
  }();
  V.apriOggetto = /*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(o) {
      var a;
      return _regenerator().w(function (_context16) {
        while (1) switch (_context16.n) {
          case 0:
            if (!L.tipo(o.tipo).ospita) {
              _context16.n = 4;
              break;
            }
            _context16.n = 1;
            return UI.sheet(o.nome, [{
              label: 'Apri',
              value: 'a'
            }, {
              label: 'Storico colture…',
              value: 's'
            }, {
              label: 'Sposta o rinomina…',
              value: 'm'
            }]);
          case 1:
            a = _context16.v;
            if (!(a === 's')) {
              _context16.n = 2;
              break;
            }
            return _context16.a(2, V.gestisciStorico(o));
          case 2:
            if (!(a === 'm')) {
              _context16.n = 3;
              break;
            }
            return _context16.a(2, V.gestisciPosizioneOggetto(o));
          case 3:
            if (!(a !== 'a')) {
              _context16.n = 4;
              break;
            }
            return _context16.a(2);
          case 4:
            go("#/oggetto/".concat(o.id));
          case 5:
            return _context16.a(2);
        }
      }, _callee16);
    }));
    return function (_x24) {
      return _ref12.apply(this, arguments);
    };
  }();

  // =====================================================================
  // Avvisi di oggi (sostituiscono le notifiche native)
  // =====================================================================
  V.calcolaAvvisi = /*#__PURE__*/function () {
    var _ref13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(meteoDi, oggi) {
      var set, res, attivita, nome, raggruppa, verdura, r, da, _iterator, _step, _c, cont, allAperto, orto, esito, domani, righe, _iterator2, _step2, _loop2, t, _c2, _righe, _iterator3, _step3, _loop3, _t4, _t5, _t6;
      return _regenerator().w(function (_context19) {
        while (1) switch (_context19.p = _context19.n) {
          case 0:
            oggi = oggi || L.today();
            set = S.set();
            res = [];
            attivita = L.costruisciAttivita(S.db, oggi, meteoDi, set.annGiorni);
            nome = function nome(id) {
              return nomeOrto(id);
            };
            raggruppa = function raggruppa(items, fn) {
              var m = gruppoVoci(items, function (a) {
                return a.ortoId;
              });
              return Array.from(m, function (_ref14) {
                var _ref15 = _slicedToArray(_ref14, 2),
                  id = _ref15[0],
                  v = _ref15[1];
                return "".concat(nome(id), ": ").concat(v.map(fn).join(', '));
              });
            };
            verdura = function verdura(a) {
              return a.titolo.replace(/^\S+\s+\S+\s+/, '');
            };
            if (set.promAttivo) {
              r = attivita.filter(function (a) {
                return a.tipo === 'raccogli' && L.diff(a.data, oggi) <= set.promGiorni;
              });
              if (r.length) res.push({
                icona: '🧺',
                titolo: 'Raccolta',
                righe: raggruppa(r, function (a) {
                  return "".concat(verdura(a), " (").concat(L.quando(a.data, oggi), ")");
                })
              });
            }
            if (!set.annAttiva) {
              _context19.n = 9;
              break;
            }
            da = [];
            _iterator = _createForOfIteratorHelper(S.db.coltivazioni);
            _context19.p = 1;
            _iterator.s();
          case 2:
            if ((_step = _iterator.n()).done) {
              _context19.n = 5;
              break;
            }
            _c = _step.value;
            cont = _c.oggettoId != null ? S.get('oggetti', _c.oggettoId) : null;
            allAperto = !(cont && L.protetto(cont.tipo));
            orto = S.orto(_c.ortoId);
            if (orto) {
              _context19.n = 3;
              break;
            }
            return _context19.a(3, 4);
          case 3:
            esito = void 0;
            if (set.annIntelligente) esito = L.valutaAnnaffiatura(_c, oggi, L.intervalloBase(_c.verdura), allAperto, meteoDi ? meteoDi(orto) : null);else esito = {
              annaffiare: L.add(L.parse(_c.ultimaAnn || _c.data), set.annGiorni) <= oggi,
              nota: null
            };
            if (esito.annaffiare) da.push({
              ortoId: _c.ortoId,
              titolo: "x x ".concat(_c.verdura),
              nota: esito.nota
            });
          case 4:
            _context19.n = 2;
            break;
          case 5:
            _context19.n = 7;
            break;
          case 6:
            _context19.p = 6;
            _t4 = _context19.v;
            _iterator.e(_t4);
          case 7:
            _context19.p = 7;
            _iterator.f();
            return _context19.f(7);
          case 8:
            if (da.length) res.push({
              icona: '💧',
              titolo: 'Da annaffiare',
              righe: raggruppa(da, function (a) {
                return verdura(a) + (a.nota ? " (".concat(a.nota, ")") : '');
              })
            });
          case 9:
            if (!(set.geloAttivo && meteoDi)) {
              _context19.n = 18;
              break;
            }
            domani = L.add(oggi, 1);
            righe = [];
            _iterator2 = _createForOfIteratorHelper(S.orti());
            _context19.p = 10;
            _loop2 = /*#__PURE__*/_regenerator().m(function _loop2() {
              var orto, prev, g, da;
              return _regenerator().w(function (_context17) {
                while (1) switch (_context17.n) {
                  case 0:
                    orto = _step2.value;
                    prev = meteoDi(orto);
                    g = prev && prev.giorni.find(function (x) {
                      return L.iso(x.data) === L.iso(domani) && x.tMin <= L.SOGLIA_GELO;
                    });
                    if (g) {
                      _context17.n = 1;
                      break;
                    }
                    return _context17.a(2, 1);
                  case 1:
                    da = S.db.coltivazioni.filter(function (c) {
                      return c.ortoId === orto.id;
                    }).filter(function (c) {
                      var cont = c.oggettoId != null ? S.get('oggetti', c.oggettoId) : null;
                      if (cont && L.protetto(cont.tipo)) return false;
                      return L.sensibileGelo(c.verdura) || L.diff(oggi, L.parse(c.data)) < 30;
                    });
                    if (da.length) righe.push("".concat(orto.nome, ": minima ").concat(Math.round(g.tMin), " °C domani notte. Da coprire: ").concat(L.uniqueCI(da.map(function (c) {
                      return c.verdura;
                    })).join(', ')));
                  case 2:
                    return _context17.a(2);
                }
              }, _loop2);
            });
            _iterator2.s();
          case 11:
            if ((_step2 = _iterator2.n()).done) {
              _context19.n = 14;
              break;
            }
            return _context19.d(_regeneratorValues(_loop2()), 12);
          case 12:
            if (!_context19.v) {
              _context19.n = 13;
              break;
            }
            return _context19.a(3, 13);
          case 13:
            _context19.n = 11;
            break;
          case 14:
            _context19.n = 16;
            break;
          case 15:
            _context19.p = 15;
            _t5 = _context19.v;
            _iterator2.e(_t5);
          case 16:
            _context19.p = 16;
            _iterator2.f();
            return _context19.f(16);
          case 17:
            if (righe.length) res.push({
              icona: '❄️',
              titolo: 'Gelo previsto',
              righe
            });
          case 18:
            if (set.trapiantoAttivo) {
              t = attivita.filter(function (a) {
                return a.tipo === 'trapianta' && a.data <= oggi;
              });
              if (t.length) res.push({
                icona: '🌿',
                titolo: 'Da trapiantare',
                righe: raggruppa(t, verdura)
              });
            }
            if (set.concimazioneAttiva) {
              _c2 = attivita.filter(function (a) {
                if (a.tipo !== 'concima' || a.data > oggi) return false;
                var col = S.get('coltivazioni', a.coltId);
                var cat = col && L.trova(col.verdura);
                if (!cat) return true;
                return L.diff(L.add(L.parse(col.data), L.giorniAlRaccolto(col)), oggi) > 14;
              });
              if (_c2.length) res.push({
                icona: '🧪',
                titolo: 'Da concimare',
                righe: raggruppa(_c2, function (a) {
                  return "".concat(verdura(a), " (").concat(a.posto.split(' · ')[2] || '', ")");
                })
              });
            }
            if (!(set.seminaAttiva && oggi.getDate() <= 7)) {
              _context19.n = 26;
              break;
            }
            _righe = [];
            _iterator3 = _createForOfIteratorHelper(S.orti());
            _context19.p = 19;
            _loop3 = /*#__PURE__*/_regenerator().m(function _loop3() {
              var orto, cl, v;
              return _regenerator().w(function (_context18) {
                while (1) switch (_context18.n) {
                  case 0:
                    orto = _step3.value;
                    cl = L.clima(orto);
                    v = D.CATALOGO.filter(function (x) {
                      return L.siPuoSeminare(x, cl, oggi.getMonth() + 1);
                    });
                    if (L.isBalcone(orto)) v = v.filter(function (x) {
                      return L.adattaBalcone(x.nome, orto);
                    });
                    if (v.length) _righe.push("".concat(orto.nome, ": ").concat(v.slice(0, 10).map(function (x) {
                      return x.emoji + ' ' + x.nome;
                    }).join(', ')).concat(v.length > 10 ? '…' : ''));
                  case 1:
                    return _context18.a(2);
                }
              }, _loop3);
            });
            _iterator3.s();
          case 20:
            if ((_step3 = _iterator3.n()).done) {
              _context19.n = 22;
              break;
            }
            return _context19.d(_regeneratorValues(_loop3()), 21);
          case 21:
            _context19.n = 20;
            break;
          case 22:
            _context19.n = 24;
            break;
          case 23:
            _context19.p = 23;
            _t6 = _context19.v;
            _iterator3.e(_t6);
          case 24:
            _context19.p = 24;
            _iterator3.f();
            return _context19.f(24);
          case 25:
            if (_righe.length) res.push({
              icona: '🌱',
              titolo: "A ".concat(D.MESI_LUNGHI[oggi.getMonth()], " puoi seminare"),
              righe: _righe
            });
          case 26:
            return _context19.a(2, res);
        }
      }, _callee17, null, [[19, 23, 24, 25], [10, 15, 16, 17], [1, 6, 7, 8]]);
    }));
    return function (_x25, _x26) {
      return _ref13.apply(this, arguments);
    };
  }();

  // =====================================================================
  // ATTIVITÀ
  // =====================================================================
  V.attivita = function () {
    var st = V.st.att;
    var root = h('div');
    var tok = GO.token;
    var orti = S.orti();
    root.append(UI.seg([{
      id: 'cal',
      label: 'Calendario'
    }, {
      id: 'sem',
      label: 'Cosa seminare'
    }, {
      id: 'sch',
      label: 'Schede'
    }], st.sez, function (id) {
      st.sez = id;
      GO.render();
    }));
    var tools = h('div', {
      class: 'row-gap'
    }, h('button', {
      class: 'btn small',
      onclick: function onclick() {
        return go('#/semine');
      },
      text: '📅 Calendario semine'
    }), h('button', {
      class: 'btn small',
      onclick: function onclick() {
        return go('#/compagni');
      },
      text: '🤝 Compagni'
    }));
    root.append(tools);
    var senzaPos = orti.filter(function (o) {
      return !L.haPosizione(o);
    }).map(function (o) {
      return "«".concat(o.nome, "»");
    });
    if (st.sez !== 'cal' && (orti.length === 0 || senzaPos.length)) root.append(UI.note(orti.length === 0 ? 'Crea un orto e indicane la città: i mesi di semina si adattano alla sua latitudine e altitudine.' : "".concat(senzaPos.length === 1 ? "L'orto" : 'Gli orti', " ").concat(senzaPos.join(', '), " non ").concat(senzaPos.length === 1 ? 'ha' : 'hanno', " una posizione: indicala in «Calendario semine» o in «Modifica orto». Intanto uso il clima del Centro Italia in pianura."), 'warn'));
    if (st.sez === 'cal') {
      var avvisiBox = h('div');
      var filtro = orti.length > 1 ? UI.field({
        label: '',
        type: 'select',
        options: [{
          v: 0,
          l: 'Tutti gli orti'
        }].concat(orti.map(function (o) {
          return {
            v: o.id,
            l: o.nome
          };
        })),
        value: st.orto
      }) : null;
      if (filtro) {
        filtro.input.addEventListener('change', function () {
          st.orto = filtro.get();
          mostra();
        });
        root.append(filtro.el);
      }
      root.append(avvisiBox);
      var lista = h('div');
      root.append(lista);
      var statoMeteo = h('p', {
        class: 'note small'
      });
      root.append(statoMeteo);
      var meteoDi = function meteoDi(o) {
        var p = L.posizione(o);
        return p ? ST.leggiCache(p) : null;
      };
      var mostra = function mostra() {
        var oggi = L.today();
        var att = L.costruisciAttivita(S.db, oggi, meteoDi, S.set().annGiorni);
        var oid = st.orto;
        var fascia = function fascia(d) {
          return d <= oggi ? '⚠️ Da fare ora' : L.diff(d, oggi) <= 7 ? '📆 Questa settimana' : L.diff(d, oggi) <= 30 ? '🗓️ Prossimi 30 giorni' : '⏳ Più avanti';
        };
        UI.clear(lista);
        var n = 0;
        var _iterator4 = _createForOfIteratorHelper(orti.filter(function (x) {
            return !oid || x.id === oid;
          })),
          _step4;
        try {
          var _loop4 = function _loop4() {
            var o = _step4.value;
            var righe = att.filter(function (a) {
              return a.ortoId === o.id;
            });
            if (!righe.length) return 1; // continue
            n++;
            lista.append(h('h3', {
              class: 'grp',
              text: "🌱 ".concat(o.nome, " (").concat(righe.length, ")")
            }), h('div', {
              class: 'card flush'
            }, righe.map(function (a) {
              return h('button', {
                class: 'row',
                onclick: function () {
                  var _onclick = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18() {
                    return _regenerator().w(function (_context20) {
                      while (1) switch (_context20.n) {
                        case 0:
                          _context20.n = 1;
                          return V.menuVerdura(a.coltId);
                        case 1:
                          if (!_context20.v) {
                            _context20.n = 2;
                            break;
                          }
                        case 2:
                          return _context20.a(2);
                      }
                    }, _callee18);
                  }));
                  function onclick() {
                    return _onclick.apply(this, arguments);
                  }
                  return onclick;
                }()
              }, h('div', {
                class: 'row-t',
                text: a.titolo
              }), h('div', {
                class: 'row-s',
                text: "".concat(fascia(a.data), " · ").concat(L.fmt(a.data), " (").concat(L.quando(a.data, oggi), ") · ").concat(a.posto)
              }));
            })));
          };
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            if (_loop4()) continue;
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
        if (!n) lista.append(UI.card(h('div', {
          class: 'row-t',
          text: '📅 Non ci sono attività in programma'
        }), h('div', {
          class: 'row-s',
          text: 'Aggiungi delle verdure a un orto: qui comparirà quando annaffiare, concimare, trapiantare e raccogliere.'
        })));
        var luoghi = orti.map(function (o) {
          return L.posizione(o);
        }).filter(Boolean);
        statoMeteo.textContent = luoghi.length ? meteoStato(luoghi) : 'Senza la posizione dell\'orto non c\'è il meteo: il calendario usa solo gli intervalli di annaffiatura e il fine ciclo.';
      };
      var meteoStato = function meteoStato(luoghi) {
        var date = luoghi.map(function (p) {
          return ST.ultimoAggiornamento(p);
        });
        if (date.some(function (d) {
          return !d;
        })) return '⚠️ Meteo non ancora scaricato per qualche luogo: serve la connessione a internet.';
        var vecchio = new Date(Math.min.apply(Math, _toConsumableArray(date)));
        var quando = L.iso(vecchio) === L.iso(new Date()) ? "oggi alle ".concat(L.pad(vecchio.getHours()), ":").concat(L.pad(vecchio.getMinutes())) : "il ".concat(L.fmtDM(vecchio), " alle ").concat(L.pad(vecchio.getHours()), ":").concat(L.pad(vecchio.getMinutes()));
        return Date.now() - vecchio.getTime() > 12 * 3600000 ? "⚠️ Meteo non aggiornato: ultimo scaricamento ".concat(quando, ". Senza meteo gli avvisi di pioggia e gelo non sono affidabili.") : "🌦️ Meteo aggiornato ".concat(quando, ".");
      };
      mostra();
      _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19() {
        var avvisi, set, visti, _iterator5, _step5, _loop5, _ret, _t7;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              _context22.n = 1;
              return ST.meteoPerOrti(orti);
            case 1:
              meteoDi = _context22.v;
              if (!(tok !== GO.token)) {
                _context22.n = 2;
                break;
              }
              return _context22.a(2);
            case 2:
              mostra();
              _context22.n = 3;
              return V.calcolaAvvisi(meteoDi);
            case 3:
              avvisi = _context22.v;
              if (!(tok !== GO.token)) {
                _context22.n = 4;
                break;
              }
              return _context22.a(2);
            case 4:
              UI.clear(avvisiBox);
              avvisiBox.append(V.boxAvvisi(avvisi));
              // pioggia oraria
              set = S.set();
              if (!(set.pioggiaOraria && set.annAttiva)) {
                _context22.n = 13;
                break;
              }
              visti = new Set();
              _iterator5 = _createForOfIteratorHelper(orti);
              _context22.p = 5;
              _loop5 = /*#__PURE__*/_regenerator().m(function _loop5() {
                var o, p, pr, ids, luogo;
                return _regenerator().w(function (_context21) {
                  while (1) switch (_context21.n) {
                    case 0:
                      o = _step5.value;
                      p = L.posizione(o);
                      if (!(!p || visti.has(L.suffissoLuogo(p)))) {
                        _context21.n = 1;
                        break;
                      }
                      return _context21.a(2, 0);
                    case 1:
                      visti.add(L.suffissoLuogo(p));
                      _context21.n = 2;
                      return ST.pioggiaOraria(p);
                    case 2:
                      pr = _context21.v;
                      if (!(tok !== GO.token)) {
                        _context21.n = 3;
                        break;
                      }
                      return _context21.a(2, {
                        v: void 0
                      });
                    case 3:
                      if (pr && pr.oggi >= set.pioggiaSoglia) {
                        ids = orti.filter(function (x) {
                          var q = L.posizione(x);
                          return q && L.suffissoLuogo(q) === L.suffissoLuogo(p);
                        }).map(function (x) {
                          return x.id;
                        });
                        luogo = p.localita || 'questo luogo';
                        avvisiBox.append(UI.card(h('div', {
                          class: 'row-t',
                          text: "🌧️ Oggi a ".concat(luogo, " sono caduti circa ").concat(L.num(pr.oggi, 1), " mm di pioggia").concat(pr.piove ? ' (sta piovendo)' : '')
                        }), h('div', {
                          class: 'row-s',
                          text: 'Confermi che ha piovuto? Le verdure nei solchi e nelle aiuole rialzate risulteranno annaffiate oggi.'
                        }), h('div', {
                          class: 'row-gap'
                        }, h('button', {
                          class: 'btn primary small',
                          text: 'Sì, ha piovuto',
                          onclick: function onclick() {
                            var n = S.segnaAnnaffiateDallaPioggia(L.today(), ids);
                            UI.toast(n ? "".concat(n, " verdure segnate come annaffiate") : 'Niente da aggiornare');
                          }
                        }))));
                      }
                    case 4:
                      return _context21.a(2);
                  }
                }, _loop5);
              });
              _iterator5.s();
            case 6:
              if ((_step5 = _iterator5.n()).done) {
                _context22.n = 10;
                break;
              }
              return _context22.d(_regeneratorValues(_loop5()), 7);
            case 7:
              _ret = _context22.v;
              if (!(_ret === 0)) {
                _context22.n = 8;
                break;
              }
              return _context22.a(3, 9);
            case 8:
              if (!_ret) {
                _context22.n = 9;
                break;
              }
              return _context22.a(2, _ret.v);
            case 9:
              _context22.n = 6;
              break;
            case 10:
              _context22.n = 12;
              break;
            case 11:
              _context22.p = 11;
              _t7 = _context22.v;
              _iterator5.e(_t7);
            case 12:
              _context22.p = 12;
              _iterator5.f();
              return _context22.f(12);
            case 13:
              return _context22.a(2);
          }
        }, _callee19, null, [[5, 11, 12, 13]]);
      }))();
    } else if (st.sez === 'sem') {
      var mese = L.today().getMonth() + 1;
      var nomeMese = L.cap(D.MESI_LUNGHI[mese - 1]);
      var abb = S.db.abbinamenti;
      var alMenoUno = false;
      var _iterator6 = _createForOfIteratorHelper(orti),
        _step6;
      try {
        var _loop6 = function _loop6() {
          var orto = _step6.value;
          var colt = S.db.coltivazioni.filter(function (c) {
            return c.ortoId === orto.id;
          });
          var ogg = S.oggettiOrto(orto.id);
          if (!L.haPosti(orto, colt, ogg)) return 1; // continue
          alMenoUno = true;
          var cl = L.clima(orto);
          var sem = D.CATALOGO.filter(function (v) {
            return L.siPuoSeminare(v, cl, mese);
          });
          if (L.isBalcone(orto)) sem = sem.filter(function (v) {
            return L.adattaBalcone(v.nome, orto);
          });
          var prop = L.proponi(sem, orto, colt, ogg, abb);
          var citta = orto.localita ? " a ".concat(orto.localita) : '';
          var titolo = L.isBalcone(orto) ? "🪴 A ".concat(nomeMese, " sul tuo balcone «").concat(orto.nome, "»").concat(citta).concat(orto.esposizione ? " (esposto a ".concat(orto.esposizione, ")") : '') : "🌱 A ".concat(nomeMese, " nel tuo orto «").concat(orto.nome, "»").concat(citta);
          root.append(h('h3', {
            class: 'grp',
            text: titolo
          }), h('div', {
            class: 'card flush'
          }, (prop.length ? prop : [{
            titolo: 'Nessun posto adatto adesso',
            dettaglio: 'Solchi e contenitori sono occupati o le verdure di stagione non stanno bene accanto a quelle già piantate.'
          }]).map(function (p) {
            return h('div', {
              class: 'row static'
            }, h('div', {
              class: 'row-t',
              text: p.titolo
            }), h('div', {
              class: 'row-s',
              text: p.dettaglio
            }));
          })));
        };
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          if (_loop6()) continue;
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
      if (!alMenoUno) {
        if (orti.length === 0) {
          var v = D.CATALOGO.filter(function (x) {
            return L.siPuoSeminare(x, {
              sp: 0,
              sud: false
            }, mese);
          });
          root.append(h('h3', {
            class: 'grp',
            text: "✅ A ".concat(nomeMese, " puoi seminare (").concat(v.length, ")")
          }), h('div', {
            class: 'card flush'
          }, v.map(function (x) {
            return h('div', {
              class: 'row static'
            }, h('div', {
              class: 'row-t',
              text: "".concat(x.emoji, " ").concat(x.nome)
            }), h('div', {
              class: 'row-s',
              text: "".concat(x.come, " · mesi: ").concat(x.mesi.slice().sort(function (a, b) {
                return a - b;
              }).map(function (m) {
                return D.MESI[m - 1];
              }).join(', '))
            }));
          })));
        } else root.append(h('h3', {
          class: 'grp',
          text: '🌱 Nel tuo orto'
        }), UI.card(h('div', {
          class: 'row-t',
          text: 'Indica i solchi del tuo orto'
        }), h('div', {
          class: 'row-s',
          text: 'Apri l\'orto → Modifica e inserisci il numero di solchi (oppure aggiungi una serra o un\'aiuola rialzata): qui ti dirò dove seminare in base ai posti liberi e ai compagni.'
        })));
      }
    } else {
      var q = UI.field({
        label: '',
        type: 'text',
        placeholder: '🔍 Cerca una verdura',
        value: st.ricerca
      });
      root.append(q.el);
      var _lista = h('div');
      root.append(_lista);
      var climi = function () {
        if (!orti.length) return [{
          cl: {
            sp: 0,
            sud: false
          },
          nomi: ''
        }];
        var g = gruppoVoci(orti, function (o) {
          return L.climaKey(L.clima(o));
        });
        return Array.from(g.values()).map(function (os) {
          return {
            cl: L.clima(os[0]),
            nomi: g.size === 1 ? '' : os.map(function (o) {
              return o.nome;
            }).join(', ')
          };
        });
      }();
      var disegna = function disegna() {
        UI.clear(_lista);
        var t = st.ricerca.toLowerCase();
        var v = D.CATALOGO.slice().sort(function (a, b) {
          return L.cmpText(a.nome, b.nome);
        }).filter(function (x) {
          return !t || x.nome.toLowerCase().includes(t);
        });
        _lista.append(h('div', {
          class: 'card flush'
        }, v.map(function (x) {
          var r = [x.come];
          climi.forEach(function (_ref17) {
            var cl = _ref17.cl,
              nomi = _ref17.nomi;
            return r.push("🗓️ Si semina".concat(nomi ? " (".concat(nomi, ")") : '', ": ").concat(L.mesiPer(x, cl).sort(function (a, b) {
              return a - b;
            }).map(function (m) {
              return D.MESI[m - 1];
            }).join(', ')));
          });
          r.push("🧺 Raccolta dopo circa ".concat(x.giorni, " giorni dalla messa a dimora"));
          if (x.perenne) r.push("🔁 Pianta perenne: resta nell'orto per anni e, dopo la prima raccolta, continua a produrre");
          var gt = L.giorniTrapianto(x.nome);
          if (gt != null) r.push("🌿 Trapianto dalla vaschetta dopo circa ".concat(gt, " giorni"));
          var d = L.distanze(x.nome);
          if (d) r.push("📏 Distanze: ".concat(d.piantine, " cm fra le piantine, ").concat(d.solco, " cm dal solco accanto"));
          r.push("💧 Annaffiatura: promemoria ogni ".concat(L.intervalloBase(x.nome), " giorni con clima mite (intervallo di base)"));
          var p = L.piano(x.nome);
          if (p) r.push("🧪 Concime: ".concat(p.concime, ", la prima volta dopo ").concat(p.primoGiorno, " giorni").concat(p.ogniGiorni != null ? ", poi ogni ".concat(p.ogniGiorni) : ''));
          var c = L.compagniDi(x.nome);
          if (c.amici.length) r.push("🤝 Sta bene con: ".concat(c.amici.join(', ')));
          if (c.nemici.length) r.push("🚫 Da tenere lontana da: ".concat(c.nemici.join(', ')));
          return h('div', {
            class: 'row static'
          }, h('div', {
            class: 'row-t',
            text: "".concat(x.emoji, " ").concat(x.nome)
          }), h('div', {
            class: 'row-s pre',
            text: r.join('\n')
          }));
        })));
      };
      q.input.addEventListener('input', function () {
        st.ricerca = q.get();
        disegna();
      });
      disegna();
    }
    return {
      title: 'Attività',
      el: root
    };
  };
  V.boxAvvisi = function (avvisi) {
    if (!avvisi.length) return h('div');
    return h('div', {
      class: 'card avvisi'
    }, h('div', {
      class: 'row-t',
      text: '🔔 Avvisi di oggi'
    }), avvisi.map(function (a) {
      return h('div', {
        class: 'avviso'
      }, h('div', {
        class: 'av-t',
        text: "".concat(a.icona, " ").concat(a.titolo)
      }), a.righe.map(function (r) {
        return h('div', {
          class: 'av-r',
          text: r
        });
      }));
    }));
  };

  // =====================================================================
  // ORTI (elenco)
  // =====================================================================
  V.orti = function () {
    var root = h('div');
    var orti = S.orti();
    if (!orti.length) root.append(UI.empty('Nessun orto ancora.\nTocca «Nuovo orto» per iniziare 🌱'));
    var _iterator7 = _createForOfIteratorHelper(orti),
      _step7;
    try {
      var _loop7 = function _loop7() {
        var o = _step7.value;
        var colt = S.db.coltivazioni.filter(function (c) {
          return c.ortoId === o.id;
        });
        var oggetti = S.db.oggetti.filter(function (x) {
          return x.ortoId === o.id && x.tipo !== D.PASSAGGIO;
        }).length;
        var piantine = colt.reduce(function (s, c) {
          return s + L.piantine(c);
        }, 0);
        var righe = [L.isBalcone(o) ? o.esposizione ? "🪴 Balcone a ".concat(o.esposizione) : '🪴 Balcone' : '🌾 Terreno'];
        if (L.haPosizione(o)) righe.push("📍 ".concat(o.localita || 'posizione propria'));
        if (o.mq > 0) righe.push("📐 ".concat(L.num(o.mq, 2), " m²"));
        root.append(h('button', {
          class: 'card tap orto-card',
          onclick: function onclick() {
            return go("#/orto/".concat(o.id));
          }
        }, h('div', {
          class: 'orto-n',
          text: o.nome
        }), h('div', {
          class: 'orto-s',
          text: "".concat(righe.join(' · '), "\n").concat(colt.length, " verdure · ").concat(L.piantineTxt(piantine), " · ").concat(oggetti, " oggetti")
        })));
      };
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        _loop7();
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
    root.append(h('div', {
      class: 'fab-space'
    }));
    return {
      title: 'I miei orti',
      el: root,
      fab: {
        label: '＋ Nuovo orto',
        onclick: function onclick() {
          return go('#/orto/nuovo');
        }
      }
    };
  };

  // =====================================================================
  // DETTAGLIO ORTO
  // =====================================================================
  V.ortoDettaglio = function (_ref18) {
    var id = _ref18.id;
    var orto = S.orto(+id);
    if (!orto) return {
      title: 'Orto',
      back: '#/orti',
      el: UI.empty('Orto non trovato.')
    };
    var st = V.st.orto;
    var root = h('div');
    var colt = S.coltivazioni(orto.id);
    var oggetti = S.oggettiOrto(orto.id);
    var tratt = S.trattSolchi(orto.id);
    var abb = S.db.abbinamenti;
    var balcone = L.isBalcone(orto);
    var contenitori = oggetti.filter(function (o) {
      return o.tipo !== D.PASSAGGIO;
    });
    var totale = L.totaleSolchi(orto, colt, tratt);
    var haSolchi = !balcone && totale > 0;
    if (st.sez === 'sol' && !haSolchi) st.sez = 'pan';
    root.append(h('div', {
      class: 'pg-riga'
    }, h('h2', {
      class: 'pg-t',
      text: orto.nome
    }), h('div', {
      class: 'row-gap'
    }, h('button', {
      class: 'btn small',
      onclick: function onclick() {
        return go("#/orto/".concat(orto.id, "/modifica"));
      },
      text: '✏️ Modifica orto'
    }), h('button', {
      class: 'btn small danger',
      text: '🗑️ Elimina orto',
      onclick: function () {
        var _onclick2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20() {
          return _regenerator().w(function (_context23) {
            while (1) switch (_context23.n) {
              case 0:
                _context23.n = 1;
                return UI.confirm('Elimina orto', 'Verranno eliminati anche verdure e oggetti. Continuare?', {
                  ok: 'Elimina',
                  danger: true
                });
              case 1:
                if (_context23.v) {
                  _context23.n = 2;
                  break;
                }
                return _context23.a(2);
              case 2:
                S.deleteOrto(orto.id);
                GO.nav.replace('#/orti');
              case 3:
                return _context23.a(2);
            }
          }, _callee20);
        }));
        function onclick() {
          return _onclick2.apply(this, arguments);
        }
        return onclick;
      }()
    }))));
    var ri = L.riepilogoOrto(orto, colt);
    if (ri.visibile) root.append(UI.card(h('div', {
      class: 'pre',
      text: ri.testo
    })));
    root.append(h('div', {
      class: 'row-gap'
    }, h('button', {
      class: 'btn primary small',
      onclick: function onclick() {
        return go("#/orto/".concat(orto.id, "/verdura/0"));
      },
      text: '🥕 Aggiungi verdura'
    }), h('button', {
      class: 'btn small',
      onclick: function onclick() {
        return go("#/orto/".concat(orto.id, "/oggetto"));
      },
      text: '🧰 Aggiungi oggetto'
    }), h('button', {
      class: 'btn small',
      text: '💧 Annaffia tutto',
      onclick: function () {
        var _onclick3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21() {
          return _regenerator().w(function (_context24) {
            while (1) switch (_context24.n) {
              case 0:
                if (colt.length) {
                  _context24.n = 2;
                  break;
                }
                _context24.n = 1;
                return UI.alert('Annaffia tutto', 'Non ci sono verdure da annaffiare in questo orto.');
              case 1:
                return _context24.a(2);
              case 2:
                _context24.n = 3;
                return UI.confirm('Annaffia tutto', "Segnare come annaffiate oggi tutte le verdure di questo orto (".concat(colt.length, ")?"), {
                  ok: 'Sì'
                });
              case 3:
                if (!_context24.v) {
                  _context24.n = 4;
                  break;
                }
                S.annaffiaTutto(orto.id);
              case 4:
                return _context24.a(2);
            }
          }, _callee21);
        }));
        function onclick() {
          return _onclick3.apply(this, arguments);
        }
        return onclick;
      }()
    }), h('button', {
      class: 'btn small',
      text: '💧 Annaffia…',
      onclick: function () {
        var _onclick4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22() {
          var ids;
          return _regenerator().w(function (_context25) {
            while (1) switch (_context25.n) {
              case 0:
                if (colt.length) {
                  _context25.n = 2;
                  break;
                }
                _context25.n = 1;
                return UI.alert('Annaffia', 'Non ci sono verdure da annaffiare in questo orto.');
              case 1:
                return _context25.a(2);
              case 2:
                _context25.n = 3;
                return UI.pickMany('💧 Annaffia', 'Scegli le verdure da segnare come annaffiate oggi.', vociSelezione(colt, oggetti), 'Annaffia');
              case 3:
                ids = _context25.v;
                if (ids) {
                  _context25.n = 4;
                  break;
                }
                return _context25.a(2);
              case 4:
                ids.forEach(function (i) {
                  var c = S.get('coltivazioni', i);
                  if (c) c.ultimaAnn = L.iso(L.today());
                });
                S.save();
              case 5:
                return _context25.a(2);
            }
          }, _callee22);
        }));
        function onclick() {
          return _onclick4.apply(this, arguments);
        }
        return onclick;
      }()
    }), h('button', {
      class: 'btn small',
      text: '🧪 Concima…',
      onclick: function () {
        var _onclick5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23() {
          var sost, ids, data;
          return _regenerator().w(function (_context26) {
            while (1) switch (_context26.n) {
              case 0:
                if (colt.length) {
                  _context26.n = 2;
                  break;
                }
                _context26.n = 1;
                return UI.alert('Concima', 'Non ci sono verdure da concimare in questo orto.');
              case 1:
                return _context26.a(2);
              case 2:
                _context26.n = 3;
                return V.scegliSostanza('Quale concime usi?');
              case 3:
                sost = _context26.v;
                if (sost) {
                  _context26.n = 4;
                  break;
                }
                return _context26.a(2);
              case 4:
                _context26.n = 5;
                return UI.pickMany("🧪 Concima: ".concat(sost), 'Scegli le verdure da concimare.', vociSelezione(colt, oggetti), 'Concima');
              case 5:
                ids = _context26.v;
                if (ids) {
                  _context26.n = 6;
                  break;
                }
                return _context26.a(2);
              case 6:
                _context26.n = 7;
                return UI.askDate("Data di inserimento: ".concat(sost), L.iso(L.today()));
              case 7:
                data = _context26.v;
                if (data) {
                  _context26.n = 8;
                  break;
                }
                return _context26.a(2);
              case 8:
                ids.forEach(function (i) {
                  var c = S.get('coltivazioni', i);
                  if (c) S.db.trattVerdura.push({
                    id: S.id(),
                    ortoId: c.ortoId,
                    coltId: c.id,
                    sostanza: sost,
                    data
                  });
                });
                S.save();
              case 9:
                return _context26.a(2);
            }
          }, _callee23);
        }));
        function onclick() {
          return _onclick5.apply(this, arguments);
        }
        return onclick;
      }()
    })));
    var sezioni = [{
      id: 'pan',
      label: 'Panoramica'
    }];
    if (haSolchi) sezioni.push({
      id: 'sol',
      label: 'Solchi'
    });
    sezioni.push({
      id: 'ogg',
      label: 'Oggetti'
    });
    root.append(UI.seg(sezioni, st.sez, function (s) {
      st.sez = s;
      GO.render();
    }));
    if (st.sez === 'pan') {
      if (colt.length) {
        var luogoDi = function luogoDi(c) {
          return L.luogo(c, contenitori.find(function (o) {
            return o.id === c.oggettoId;
          }));
        };
        var voci = colt.map(function (c) {
          return {
            c,
            luogo: luogoDi(c)
          };
        });
        var luoghi = L.sortBy(L.uniqueCI(voci.map(function (v) {
          return v.luogo.nome;
        })).map(function (n) {
          return voci.find(function (v) {
            return v.luogo.nome === n;
          }).luogo;
        }), function (l) {
          return l.gruppo;
        }, function (l) {
          return l.solco || 0;
        }, function (l) {
          return l.nome;
        }).map(function (l) {
          return l.nome;
        });
        var opzioni = ['Tutte le verdure', '💧 Da annaffiare', '🧺 Pronte da raccogliere'].concat(luoghi);
        if (!opzioni.includes(st.filtro)) st.filtro = 'Tutte le verdure';
        var q = UI.field({
          label: '',
          type: 'text',
          placeholder: '🔍 Cerca per nome o posto',
          value: st.ricerca
        });
        var f = UI.field({
          label: '',
          type: 'select',
          options: opzioni.map(function (o) {
            return {
              v: o,
              l: o
            };
          }),
          value: st.filtro
        });
        root.append(h('div', {
          class: 'row-gap grow'
        }, q.el, f.el));
        var lista = h('div');
        root.append(lista);
        var disegna = function disegna() {
          UI.clear(lista);
          var oggi = L.today();
          var t = st.ricerca.toLowerCase();
          var vis = voci.filter(function (_ref19) {
            var c = _ref19.c,
              luogo = _ref19.luogo;
            if (t && ![c.verdura, c.tipologia || '', c.note || '', luogo.nome].some(function (s) {
              return s.toLowerCase().includes(t);
            })) return false;
            if (st.filtro === '💧 Da annaffiare') return !c.ultimaAnn || L.diff(oggi, L.parse(c.ultimaAnn)) >= S.set().annGiorni;
            if (st.filtro === '🧺 Pronte da raccogliere') return L.trova(c.verdura) && L.add(L.parse(c.data), L.giorniAlRaccolto(c)) <= oggi;
            return st.filtro === 'Tutte le verdure' || luogo.nome === st.filtro;
          });
          if (!vis.length) {
            lista.append(UI.empty('Nessuna verdura corrisponde alla ricerca.'));
            return;
          }
          var grp = gruppoVoci(vis, function (v) {
            return "".concat(v.c.verdura.trim().toLowerCase(), "|").concat((v.c.tipologia || '').trim().toLowerCase());
          });
          var chiavi = Array.from(grp.keys()).sort(L.cmpText);
          var _iterator8 = _createForOfIteratorHelper(chiavi),
            _step8;
          try {
            for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
              var k = _step8.value;
              var items = L.sortBy(grp.get(k), function (v) {
                return v.luogo.gruppo;
              }, function (v) {
                return v.luogo.solco || 0;
              }, function (v) {
                return v.luogo.nome;
              }, function (v) {
                return v.c.data;
              });
              var _p = items[0].c;
              var piantine = items.reduce(function (s, v) {
                return s + L.piantine(v.c);
              }, 0);
              var titolo = "".concat(L.emoji(_p.verdura), " ").concat(_p.verdura.trim()).concat(_p.tipologia && _p.tipologia.trim() ? ' ' + _p.tipologia.trim() : '', " · ").concat(L.piantineTxt(piantine));
              if (items.length > 1) titolo += " (".concat(items.length, ")");
              lista.append(h('div', {
                class: 'card'
              }, h('div', {
                class: 'grp-t',
                text: titolo
              }), items.map(function (_ref20) {
                var c = _ref20.c,
                  luogo = _ref20.luogo;
                var cont = contenitori.find(function (o) {
                  return o.id === c.oggettoId;
                });
                var giorni = L.diff(oggi, L.parse(c.data));
                var det = "".concat(luogo.nome, " · Messa il ").concat(L.fmtS(c.data), " · ").concat(c.ultimaAnn ? "💧 Annaffiata il ".concat(L.fmtS(c.ultimaAnn)) : '💧 Mai annaffiata');
                if (c.quantita > 1) det += " · ".concat(c.quantita, " piantine");
                var tr = L.statoTrapianto(c, !!(cont && L.tipo(cont.tipo).conAlveoli), oggi);
                if (tr) det += " · ".concat(tr);
                var av = L.trova(c.verdura) ? L.avanzamento(giorni, L.giorniAlRaccolto(c)) : null;
                return h('button', {
                  class: 'row',
                  onclick: function onclick() {
                    return V.menuVerdura(c.id);
                  }
                }, h('div', {
                  class: 'row-s',
                  text: det
                }), av ? [UI.bar(av.p, av.colore), h('div', {
                  class: 'row-s small',
                  text: av.stato
                })] : null);
              })));
            }
          } catch (err) {
            _iterator8.e(err);
          } finally {
            _iterator8.f();
          }
        };
        q.input.addEventListener('input', function () {
          st.ricerca = q.get();
          disegna();
        });
        f.input.addEventListener('change', function () {
          st.filtro = f.get();
          disegna();
        });
        disegna();
      } else root.append(UI.empty('Nessuna verdura piantata.'));
    }
    if (st.sez === 'sol' && haSolchi) {
      root.append(h('div', {
        class: 'row-gap'
      }, h('button', {
        class: 'btn small',
        text: '＋ Inserisci solco',
        onclick: function onclick() {
          return inserisciSolco(orto, colt);
        }
      }), h('button', {
        class: 'btn small',
        text: '🚶 Inserisci passaggio',
        onclick: function onclick() {
          return inserisciPassaggio(orto);
        }
      })));
      var inTerra = colt.filter(function (c) {
        return c.oggettoId == null;
      });
      var perSolco = gruppoVoci(inTerra.filter(function (c) {
        return c.solco > 0;
      }), function (c) {
        return c.solco;
      });
      var passaggi = oggetti.filter(function (o) {
        return o.tipo === D.PASSAGGIO;
      });
      var avvisi = [];
      var card = h('div', {
        class: 'card flush'
      });
      var _loop8 = function _loop8(s) {
        var piante = L.uniqueCI((perSolco.get(s) || []).map(function (c) {
          return c.verdura;
        }));
        var t = piante.length === 0 ? "Solco ".concat(s, ": libero") : "Solco ".concat(s, ": ").concat(piante.join(', '));
        var sost = tratt.filter(function (x) {
          return x.solco === s && x.oggettoId == null;
        }).map(L.descriviTratt);
        if (sost.length) t += "\n   🧺 ".concat(sost.join(', '));
        card.append(h('button', {
          class: 'row',
          onclick: function onclick() {
            return V.menuSolco(orto.id, s);
          }
        }, h('div', {
          class: 'row-t pre',
          text: t
        })));
        passaggi.filter(function (p) {
          return p.dopoSolco === s;
        }).forEach(function (p) {
          return card.append(h('button', {
            class: 'row',
            onclick: function onclick() {
              return V.gestisciPassaggio(p.id);
            }
          }, h('div', {
            class: 'row-s',
            text: "🚶 Passaggio tra il solco ".concat(s, " e il solco ").concat(s + 1)
          })));
        });
        var vicine = L.uniqueCI(piante.concat((perSolco.get(s + 1) || []).map(function (c) {
          return c.verdura;
        })));
        for (var i = 0; i < vicine.length; i++) for (var j = i + 1; j < vicine.length; j++) if (L.valuta(vicine[i], vicine[j], abb) < 0) {
          var x = "⚠️ ".concat(vicine[i], " e ").concat(vicine[j], " non stanno bene vicine (solchi ").concat(s, "–").concat(s + 1, ")");
          if (!avvisi.includes(x)) avvisi.push(x);
        }
      };
      for (var s = 1; s <= totale; s++) {
        _loop8(s);
      }
      root.append(card);
      if (avvisi.length) root.append(UI.note(avvisi.join('\n'), 'warn'));
    }
    if (st.sez === 'ogg') {
      if (!contenitori.length) root.append(UI.empty('Nessun oggetto: aggiungi una lombricompostiera, un vaso, una serra…'));
      var stor = S.trattSolchi(orto.id).filter(function (t) {
        return t.oggettoId != null;
      });
      var grp = gruppoVoci(L.ordinaOggetti(contenitori), function (o) {
        return "".concat(D.TIPI.indexOf(L.tipo(o.tipo)), "|").concat(o.alveoli || 0);
      });
      var _iterator9 = _createForOfIteratorHelper(grp.values()),
        _step9;
      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var items = _step9.value;
          var tipo = L.tipo(items[0].tipo);
          root.append(h('h3', {
            class: 'grp',
            text: L.titoloGruppoOggetti(tipo, items[0].alveoli || 0, items.length)
          }), h('div', {
            class: 'card flush'
          }, items.map(function (o) {
            return h('button', {
              class: 'row',
              onclick: function onclick() {
                return V.apriOggetto(o);
              }
            }, h('div', {
              class: 'row-t',
              text: o.nome
            }), h('div', {
              class: 'row-s pre',
              text: L.dettaglioOggetto(o, colt, totale, abb, stor.filter(function (t) {
                return t.oggettoId === o.id && t.note !== 'Coltura rimossa';
              }), stor.filter(function (t) {
                return t.oggettoId === o.id && t.note === 'Coltura rimossa';
              }))
            }));
          })));
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
    }
    return {
      title: orto.nome,
      back: '#/orti',
      el: root
    };
  };
  var vociSelezione = function vociSelezione(colt, oggetti) {
    return L.sortBy(colt.map(function (c) {
      return {
        c,
        l: L.luogo(c, oggetti.find(function (o) {
          return o.id === c.oggettoId;
        }))
      };
    }), function (x) {
      return x.l.gruppo;
    }, function (x) {
      return x.l.solco || 0;
    }, function (x) {
      return x.l.nome;
    }, function (x) {
      return x.c.verdura.toLowerCase();
    }).map(function (x) {
      return {
        id: x.c.id,
        label: "".concat(x.c.verdura.trim()).concat(x.c.tipologia && x.c.tipologia.trim() ? ' ' + x.c.tipologia.trim() : '', " · ").concat(x.l.nome)
      };
    });
  };
  var inserisciSolco = /*#__PURE__*/function () {
    var _inserisciSolco = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(orto, colt) {
      var totale, op, pos, s, i;
      return _regenerator().w(function (_context27) {
        while (1) switch (_context27.n) {
          case 0:
            totale = L.totaleSolchi(orto, colt, S.trattSolchi(orto.id));
            if (!(totale >= 999)) {
              _context27.n = 2;
              break;
            }
            _context27.n = 1;
            return UI.alert('Troppi solchi', 'Il massimo è 999 solchi.');
          case 1:
            return _context27.a(2);
          case 2:
            op = [], pos = [];
            if (totale === 0) {
              op.push('Primo solco');
              pos.push(1);
            } else {
              op.push("All'inizio (prima del solco 1)");
              pos.push(1);
              for (s = 1; s < totale; s++) {
                op.push("Tra il solco ".concat(s, " e il solco ").concat(s + 1));
                pos.push(s + 1);
              }
              op.push("In fondo (dopo il solco ".concat(totale, ")"));
              pos.push(totale + 1);
            }
            _context27.n = 3;
            return scegliVoce('Dove inserire il nuovo solco?', op);
          case 3:
            i = _context27.v;
            if (i >= 0) S.inserisciSolco(orto.id, pos[i], totale);
          case 4:
            return _context27.a(2);
        }
      }, _callee24);
    }));
    function inserisciSolco(_x27, _x28) {
      return _inserisciSolco.apply(this, arguments);
    }
    return inserisciSolco;
  }();
  var inserisciPassaggio = /*#__PURE__*/function () {
    var _inserisciPassaggio = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(orto) {
      var totale, esist, libere, s, i;
      return _regenerator().w(function (_context28) {
        while (1) switch (_context28.n) {
          case 0:
            totale = S.totaleSolchi(orto.id);
            esist = new Set(S.oggettiOrto(orto.id).filter(function (o) {
              return o.tipo === D.PASSAGGIO;
            }).map(function (o) {
              return o.dopoSolco;
            }));
            libere = [];
            for (s = 1; s <= totale - 1; s++) if (!esist.has(s)) libere.push(s);
            if (libere.length) {
              _context28.n = 2;
              break;
            }
            _context28.n = 1;
            return UI.alert('Nessuna posizione libera', totale < 2 ? 'Servono almeno due solchi per inserire un passaggio fra di loro.' : "Tra tutti i solchi c'è già un passaggio.");
          case 1:
            return _context28.a(2);
          case 2:
            _context28.n = 3;
            return scegliVoce('Dove inserire il passaggio?', libere.map(function (s) {
              return "Tra il solco ".concat(s, " e il solco ").concat(s + 1);
            }));
          case 3:
            i = _context28.v;
            if (i >= 0) S.addOggetto({
              ortoId: orto.id,
              tipo: D.PASSAGGIO,
              nome: 'Passaggio',
              data: L.iso(L.today()),
              note: null,
              dopoSolco: libere[i],
              alveoli: null,
              profCm: null
            });
          case 4:
            return _context28.a(2);
        }
      }, _callee25);
    }));
    function inserisciPassaggio(_x29) {
      return _inserisciPassaggio.apply(this, arguments);
    }
    return inserisciPassaggio;
  }();

  // =====================================================================
  // SCHEMA
  // =====================================================================
  var COL = {
    terra: '#6D4C41',
    pianta: '#C8E6C9',
    conflitto: '#FFCC80',
    sostanza: '#FFF59D',
    serra: '#B3E5FC',
    aiuola: '#D7CCC8',
    altro: '#E0E0E0',
    passaggio: '#BCAAA4'
  };
  V.schema = function () {
    var st = V.st.schema;
    var root = h('div');
    var orti = S.orti();
    if (!orti.length) {
      root.append(UI.empty('Nessun orto ancora: creane uno dalla scheda Orti.'));
      return {
        title: 'Schema',
        el: root
      };
    }
    if (!orti.some(function (o) {
      return o.id === st.ortoId;
    })) st.ortoId = orti[0].id;
    var sel = UI.field({
      label: '',
      type: 'select',
      options: orti.map(function (o) {
        return {
          v: o.id,
          l: o.nome
        };
      }),
      value: st.ortoId
    });
    sel.input.addEventListener('change', function () {
      st.ortoId = sel.get();
      GO.render(true);
    });
    root.append(sel.el);
    var orto = S.orto(st.ortoId);
    var colt = S.db.coltivazioni.filter(function (c) {
      return c.ortoId === orto.id;
    });
    var concimi = gruppoVoci(S.trattVerdure(orto.id), function (t) {
      return t.coltId;
    });
    var racc = gruppoVoci(S.raccoltiOrto(orto.id), function (r) {
      return r.coltId;
    });
    var tutti = S.oggettiOrto(orto.id);
    var passaggi = gruppoVoci(tutti.filter(function (o) {
      return o.tipo === D.PASSAGGIO;
    }), function (o) {
      return o.dopoSolco || 0;
    });
    var oggetti = L.ordinaOggetti(tutti.filter(function (o) {
      return o.tipo !== D.PASSAGGIO;
    }));
    var abb = S.db.abbinamenti;
    var serre = new Set(tutti.filter(function (o) {
      return L.protetto(o.tipo);
    }).map(function (o) {
      return o.id;
    }));
    var vasch = new Set(tutti.filter(function (o) {
      return L.tipo(o.tipo).conAlveoli;
    }).map(function (o) {
      return o.id;
    }));
    var oggi = L.today();
    var info = [];
    if (orto.mq > 0) info.push("📐 ".concat(L.num(orto.mq, 2), " m²"));
    if (orto.solchi > 0) info.push("🌾 ".concat(orto.solchi, " solchi"));
    if (info.length) root.append(UI.note(info.join(' · ')));
    if (orto.solchi > 0) root.append(UI.note('Tocca il titolo di un solco per aggiungere verdure o concimi.', 'small'));
    var daAnnaffiare = function daAnnaffiare(c) {
      if (!S.set().annIntelligente) return L.add(L.parse(c.ultimaAnn || c.data), S.set().annGiorni) <= oggi;
      return L.valutaAnnaffiatura(c, oggi, L.intervalloBase(c.verdura), !serre.has(c.oggettoId), null).annaffiare;
    };
    var conflitto = function conflitto(c, vicini) {
      return vicini.some(function (v) {
        return v.id !== c.id && L.valuta(c.verdura, v.verdura, abb) < 0;
      });
    };
    var chip = function chip(c, conf) {
      var t = "".concat(conf ? '⚠️ ' : '').concat(daAnnaffiare(c) ? '❗ ' : '').concat(L.emoji(c.verdura), " ").concat(c.verdura).concat(c.quantita > 1 ? " ×".concat(c.quantita) : '');
      var tr = L.statoTrapianto(c, vasch.has(c.oggettoId), oggi);
      if (tr) t += " · ".concat(tr);
      if (c.tipologia && c.tipologia.trim()) t += " (".concat(c.tipologia.trim(), ")");
      if (c.ultimaAnn) t += " · 💧 Annaffiato il ".concat(L.fmtS(c.ultimaAnn));
      var haR = (racc.get(c.id) || []).length > 0;
      if (!haR && L.trova(c.verdura)) t += " · 🧺 ~".concat(L.fmt(L.add(L.parse(c.data), L.giorniAlRaccolto(c))));
      if ((concimi.get(c.id) || []).length) t += "\n🧪 ".concat(L.ultimiConcimiPerTipo(concimi.get(c.id)));
      if (haR) t += "\n".concat(L.totaliRaccolti(racc.get(c.id)));
      return UI.chip(t, conf ? COL.conflitto : COL.pianta, '#000', function () {
        return V.menuVerdura(c.id);
      });
    };
    var scatola = function scatola(titolo, sfondo, testo, contenuto, vuoto, tap) {
      return h('div', {
        class: 'scatola',
        style: {
          background: sfondo,
          color: testo
        }
      }, h('div', {
        class: 'sc-t' + (tap ? ' tap' : ''),
        text: titolo,
        onclick: tap
      }), contenuto.length ? h('div', null, contenuto) : vuoto ? h('div', {
        class: 'sc-v',
        text: vuoto
      }) : null);
    };
    var inTerra = colt.filter(function (c) {
      return c.oggettoId == null && c.solco > 0;
    });
    var trAll = S.trattSolchi(orto.id);
    var trSolco = gruppoVoci(trAll, function (t) {
      return t.solco;
    });
    var trOgg = gruppoVoci(trAll.filter(function (t) {
      return t.oggettoId != null;
    }), function (t) {
      return t.oggettoId;
    });
    var totale = Math.max.apply(Math, [orto.solchi || 0].concat(_toConsumableArray(inTerra.map(function (c) {
      return c.solco;
    })), [0]));
    totale = Math.max.apply(Math, [totale].concat(_toConsumableArray(trAll.filter(function (t) {
      return t.oggettoId == null;
    }).map(function (t) {
      return t.solco;
    })), [0]));
    var perSolco = gruppoVoci(inTerra, function (c) {
      return c.solco;
    });
    var ps = function ps(s) {
      return perSolco.get(s) || [];
    };
    var ospitanti = oggetti.filter(function (o) {
      return L.tipo(o.tipo).ospita;
    });
    var sost = function sost(t) {
      return UI.chip("".concat(t.note === 'Coltura rimossa' ? '🌱' : '🧪', " ").concat(t.sostanza, " · ").concat(L.fmtS(t.data)), COL.sostanza);
    };
    var disegnaOspitanti = function disegnaOspitanti(dopo) {
      var _iterator0 = _createForOfIteratorHelper(ospitanti.filter(function (x) {
          return Math.min(x.dopoSolco == null ? totale : x.dopoSolco, totale) === dopo;
        })),
        _step0;
      try {
        var _loop9 = function _loop9() {
          var o = _step0.value;
          var dentro = colt.filter(function (c) {
            return c.oggettoId === o.id;
          });
          var tipo = L.tipo(o.tipo);
          var cont = dentro.map(function (c) {
            return chip(c, conflitto(c, dentro));
          }).concat(L.sortBy(trOgg.get(o.id) || [], function (t) {
            return t.data;
          }).map(sost));
          root.append(scatola("".concat(tipo.emoji, " ").concat(o.nome).concat(o.alveoli > 0 ? " (".concat(dentro.reduce(function (s, c) {
            return s + L.piantine(c);
          }, 0), "/").concat(o.alveoli, " alveoli)") : ''), tipo.coperto ? COL.serra : COL.aiuola, '#000', cont, 'vuota', function () {
            return V.menuContenitore(o);
          }));
        };
        for (_iterator0.s(); !(_step0 = _iterator0.n()).done;) {
          _loop9();
        }
      } catch (err) {
        _iterator0.e(err);
      } finally {
        _iterator0.f();
      }
    };
    disegnaOspitanti(0);
    var _loop0 = function _loop0(s) {
      var vicini = ps(s - 1).concat(ps(s), ps(s + 1));
      var cont = ps(s).map(function (c) {
        return chip(c, conflitto(c, vicini));
      }).concat(L.sortBy((trSolco.get(s) || []).filter(function (t) {
        return t.oggettoId == null;
      }), function (t) {
        return t.data;
      }).map(sost));
      root.append(scatola("Solco ".concat(s), COL.terra, '#fff', cont, 'libero', function () {
        return V.menuSolco(orto.id, s);
      }));
      disegnaOspitanti(s);
      (passaggi.get(s) || []).forEach(function (p) {
        return root.append(h('div', {
          class: 'passaggio',
          onclick: function onclick() {
            return V.gestisciPassaggio(p.id);
          }
        }));
      });
    };
    for (var s = 1; s <= totale; s++) {
      _loop0(s);
    }
    var altri = oggetti.filter(function (o) {
      return !L.tipo(o.tipo).ospita;
    });
    if (altri.length) root.append(scatola('🧰 Altri oggetti', COL.altro, '#000', altri.map(function (o) {
      return UI.chip("".concat(L.tipo(o.tipo).emoji, " ").concat(o.nome), '#fff');
    }), ''));
    var senza = colt.filter(function (c) {
      return c.oggettoId == null && !(c.solco > 0);
    });
    if (senza.length) root.append(scatola('❓ Senza posto assegnato', COL.altro, '#000', senza.map(function (c) {
      return chip(c, false);
    }), ''));
    if (!colt.length && !oggetti.length && !totale) root.append(UI.empty(L.isBalcone(orto) ? 'Questo orto è ancora vuoto: aggiungi vasi, cassette o altri oggetti, poi le verdure.' : 'Questo orto è ancora vuoto: aggiungi solchi, verdure o oggetti.'));
    return {
      title: 'Schema',
      el: root
    };
  };
})();