function _slicedToArray(e, i) { return _iterableToArrayLimit(e, i) || _unsupportedIterableToArray(e, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, t) { var e = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (Array.isArray(r) && (null == e || e === ("undefined" != typeof Symbol && [][Symbol.iterator]) || e === []["@@iterator"])) return r; if (null != e) { var l, n, i, a, u = [], o = !0, f = !1; try { if (i = (e = e.call(r)).next, 0 === t) { if (Object(e) !== e) return; o = !1; } else for (; !(o = (l = i.call(e)).done) && (u.push(l.value), u.length !== t); o = !0); } catch (r) { f = !0, n = r; } finally { try { if (!o && null != e.return && (a = e.return(), Object(a) !== a)) return; } finally { if (f) throw n; } } return u; } }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var r, e, o = "function" == typeof Symbol ? Symbol : {}, n = o.iterator || "@@iterator", a = o.toStringTag || "@@toStringTag"; function i(o, n, a, i) { var u = n && n.prototype instanceof Generator ? n : Generator, f = Object.create(u.prototype); return _regeneratorDefine2(f, "_invoke", function (t, o, n) { var a, i, u, f = 0, p = n || [], y = !1, G = { p: 0, n: 0, v: r, a: l, f: l.bind(r, 4), d: function d(t, e) { return a = t, i = 0, u = r, G.n = e, c; } }; function l(t, o) { for (i = t, u = o, e = 0; !y && f && !n && e < p.length; e++) { var n, a = p[e], l = G.p, F = a[2]; t > 3 ? (n = F === o) && (u = a[(i = a[4]) ? 5 : (i = 3, 3)], a[4] = a[5] = r) : a[0] <= l && ((n = t < 2 && l < a[1]) ? (i = 0, G.v = o, G.n = a[1]) : l < F && (n = t < 3 || a[0] > o || o > F) && (a[4] = t, a[5] = o, G.n = F, i = 0)); } if (n || t > 1) return c; throw y = !0, o; } return function (n, p, F) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && l(p, F), i = p, u = F; (e = i < 2 ? r : u) || !y;) { a || (i ? (i > 1 && (G.n = i < 3 ? -1 : u), l(i, u)) : G.v = u); try { if (f = 2, a) { if (i || (n = "next"), e = a[n]) { if (!(e = e.call(a, u))) throw TypeError("iterator result is not an object"); if (!e.done) return e; u = e.value, i < 2 && (i = 0); } else 1 === i && (e = a.return) && e.call(a), i < 2 && (u = TypeError("The iterator does not provide a '" + n + "' method"), i = 1); a = r; } else if ((e = (y = G.n < 0) ? u : t.call(o, G)) !== c) break; } catch (t) { a = r, i = 1, u = t; } finally { f = 1; } } return { value: e, done: y }; }; }(o, a, i), !0), f; } var c = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} e = Object.getPrototypeOf; var u = [][n] ? e(e([][n]())) : (_regeneratorDefine2(e = {}, n, function () { return this; }), e), f = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(u); function p(r) { return Object.setPrototypeOf ? Object.setPrototypeOf(r, GeneratorFunctionPrototype) : (r.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(r, a, "GeneratorFunction")), r.prototype = Object.create(f), r; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(f, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, a, "GeneratorFunction"), _regeneratorDefine2(f), _regeneratorDefine2(f, a, "Generator"), _regeneratorDefine2(f, n, function () { return this; }), _regeneratorDefine2(f, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: p }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(a) { return _arrayWithoutHoles(a) || _iterableToArray(a) || _unsupportedIterableToArray(a) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(t, e) { if (t) { if ("string" == typeof t) return _arrayLikeToArray(t, e); var o = {}.toString.call(t).slice(8, -1); return "Object" === o && t.constructor && (o = t.constructor.name), "Map" === o || "Set" === o ? Array.from(t) : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? _arrayLikeToArray(t, e) : void 0; } }
function _iterableToArray(r) { var e = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (Array.isArray(r) && (null == e || e === ("undefined" != typeof Symbol && [][Symbol.iterator]) || e === []["@@iterator"])) return r; if (null != e) { for (var t, o = [], a = e.call(r); !(t = a.next()).done;) o.push(t.value); return o; } }
function _arrayWithoutHoles(a) { if (Array.isArray(a)) return _arrayLikeToArray(a); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/* Gestione Orto PWA - moduli e schermate secondarie: verdura, orto, oggetto, calendario semine, compagni, statistiche, spese, impostazioni. */
(function () {
  'use strict';

  var GO = window.GO;
  var D = GO.D,
    L = GO.L,
    S = GO.S,
    UI = GO.UI,
    ST = GO.net,
    V = GO.V;
  var h = UI.h;
  var go = function go(x) {
    return GO.nav.go(x);
  };
  var back = function back(p) {
    return GO.nav.back(p);
  };
  var ALTRA = 'Altra verdura…';
  var parseQuery = function parseQuery(q) {
    var o = {};
    new URLSearchParams(q || '').forEach(function (v, k) {
      return o[k] = v;
    });
    return o;
  };
  GO.VERSION = '1.2.0'; // tenere uguale a VERSION in sw.js

  var bottoniForm = function bottoniForm(annulla, salva, label) {
    return h('div', {
      class: 'row-gap form-b'
    }, h('button', {
      type: 'button',
      class: 'btn',
      onclick: annulla,
      text: 'Annulla'
    }), h('button', {
      type: 'submit',
      class: 'btn primary',
      text: label || 'Salva'
    }));
  };
  var grp = function grp(arr, key) {
    var m = new Map();
    arr.forEach(function (x) {
      var k = key(x);
      if (!m.has(k)) m.set(k, []);
      m.get(k).push(x);
    });
    return m;
  };

  // =====================================================================
  // NUOVA / MODIFICA VERDURA
  // =====================================================================
  V.nuovaColtivazione = function (_ref) {
    var id = _ref.id,
      cid = _ref.cid,
      query = _ref.query;
    var ortoId = +id;
    var q = parseQuery(query);
    var orto = S.orto(ortoId);
    if (!orto) return {
      title: 'Verdura',
      back: '#/orti',
      el: UI.empty('Orto non trovato.')
    };
    var esistente = +cid > 0 ? S.get('coltivazioni', +cid) : null;
    var altre = S.db.coltivazioni.filter(function (c) {
      return c.ortoId === ortoId && (!esistente || c.id !== esistente.id);
    });
    var storico = S.db.trattSolco.filter(function (t) {
      return t.ortoId === ortoId && t.note === 'Coltura rimossa';
    });
    var abb = S.db.abbinamenti;
    var contenitori = S.oggettiOrto(ortoId).filter(function (o) {
      return L.tipo(o.tipo).ospita;
    });
    var solchi = Math.max.apply(Math, [orto.solchi || 0, esistente && esistente.solco || 0].concat(_toConsumableArray(altre.map(function (c) {
      return c.solco || 0;
    }))));
    var posti = [];
    for (var i = 1; i <= solchi; i++) posti.push({
      l: "🌾 Solco ".concat(i),
      solco: i,
      cont: null
    });
    contenitori.forEach(function (o) {
      return posti.push({
        l: "".concat(L.tipo(o.tipo).emoji, " ").concat(o.nome),
        solco: null,
        cont: o
      });
    });
    var nomi = L.nomiCatalogo();
    var fVerdura = UI.field({
      label: 'Verdura',
      type: 'select',
      options: [{
        v: '',
        l: 'Scegli una verdura…'
      }].concat(nomi.map(function (n) {
        return {
          v: n,
          l: "".concat(L.emoji(n), " ").concat(n)
        };
      }), [{
        v: ALTRA,
        l: ALTRA
      }]),
      value: ''
    });
    var fAltra = UI.field({
      label: 'Nome della verdura',
      type: 'text',
      placeholder: 'es. Topinambur'
    });
    fAltra.el.hidden = true;
    var fTip = UI.field({
      label: 'Tipologia (facoltativa, es. bianca o rossa)',
      type: 'text',
      value: esistente ? esistente.tipologia : ''
    });
    var fDove = UI.field({
      label: 'Dove la pianti?',
      type: 'select',
      options: [{
        v: -1,
        l: 'Scegli il posto…'
      }].concat(posti.map(function (p, i) {
        return {
          v: i,
          l: p.l
        };
      })),
      value: -1
    });
    var nessunPosto = h('p', {
      class: 'note warn',
      hidden: posti.length > 0,
      text: "In questo orto non c'è nessun posto: aggiungi un vaso, una cassetta o un altro contenitore dagli oggetti dell'orto (oppure, in un orto su terreno, indica i solchi da «Modifica orto»)."
    });
    var fData = UI.field({
      label: 'Data di messa a dimora',
      type: 'date',
      value: esistente ? esistente.data : L.iso(L.today()),
      max: L.iso(L.today())
    });
    var fModo = UI.field({
      label: 'Come la metti a dimora?',
      type: 'select',
      options: [{
        v: false,
        l: 'Semina'
      }, {
        v: true,
        l: 'Piantina già cresciuta (trapianto)'
      }],
      value: esistente ? !!esistente.trapiantata : false
    });
    var fQta = UI.field({
      label: 'Numero di piantine (facoltativo)',
      type: 'int',
      value: esistente && esistente.quantita != null ? esistente.quantita : ''
    });
    var fDP = UI.field({
      label: 'Distanza fra le piantine (cm)',
      type: 'int',
      value: esistente && esistente.distP != null ? esistente.distP : ''
    });
    var fDS = UI.field({
      label: 'Distanza dal solco accanto (cm)',
      type: 'int',
      value: esistente && esistente.distS != null ? esistente.distS : ''
    });
    var fNote = UI.field({
      label: 'Note',
      type: 'textarea',
      value: esistente ? esistente.note : ''
    });
    var lblConsig = h('p', {
      class: 'note',
      hidden: true
    });
    var lblModo = h('p', {
      class: 'note warn',
      hidden: true
    });
    var lblBalcone = h('p', {
      class: 'note',
      hidden: true
    });
    var lblVicini = h('p', {
      class: 'note',
      hidden: true
    });
    var lblRot = h('p', {
      class: 'note warn',
      hidden: true
    });
    var sugP = null,
      sugS = null;
    var nome = function nome() {
      var s = fVerdura.get();
      var n = s === ALTRA ? fAltra.get() : s;
      return n || null;
    };
    var posto = function posto() {
      var i = fDove.get();
      return i >= 0 ? posti[i] : null;
    };
    var show = function show(el, txt) {
      el.textContent = txt || '';
      el.hidden = !txt;
    };
    var avvisiRot = function avvisiRot() {
      var n = nome(),
        p = posto();
      return !n || !p ? [] : L.avvisiRotazione(n, fData.get() || L.iso(L.today()), p.solco, p.cont ? p.cont.id : null, altre, storico);
    };
    var precompila = function precompila(campo, prec, nuova) {
      if (!campo.get() || campo.get() === prec) campo.set(nuova);
    };
    var aggiorna = function aggiorna() {
      var n = nome(),
        p = posto();
      fAltra.el.hidden = fVerdura.get() !== ALTRA;
      // consigliate
      var d = n ? L.distanze(n) : null;
      precompila(fDP, sugP, d ? String(d.piantine) : null);
      precompila(fDS, sugS, d ? String(d.solco) : null);
      sugP = d ? String(d.piantine) : null;
      sugS = d ? String(d.solco) : null;
      show(lblConsig, d ? "Consigliate per ".concat(n, ": ").concat(d.piantine, " cm fra le piantine, ").concat(d.solco, " cm dal solco accanto. Puoi cambiarle.") : '');
      // vicini
      if (!n || !p) lblVicini.hidden = true;else {
        var vic = p.cont ? altre.filter(function (c) {
          return c.oggettoId === p.cont.id;
        }) : altre.filter(function (c) {
          return c.oggettoId == null && c.solco > 0 && Math.abs(c.solco - p.solco) <= 1;
        });
        var righe = [];
        vic.forEach(function (c) {
          if (L.eq(c.verdura, n)) return;
          var loc = p.cont ? '' : " (solco ".concat(c.solco, ")");
          var e = L.valuta(n, c.verdura, abb);
          var r = e > 0 ? "👍 ".concat(c.verdura).concat(loc, ": stanno bene vicine") : e < 0 ? "⚠️ ".concat(c.verdura).concat(loc, ": meglio tenerle separate") : null;
          if (r && !righe.includes(r)) righe.push(r);
        });
        show(lblVicini, righe.length ? righe.join('\n') : 'Nessuna indicazione per le verdure già presenti qui intorno.');
      }
      show(lblRot, avvisiRot().join('\n'));
      // balcone
      var bal = [];
      if (n) {
        if (L.isBalcone(orto) && L.consiglioBalcone(n)) bal.push(L.consiglioBalcone(n));
        bal.push.apply(bal, _toConsumableArray(L.avvisiBalcone(n, orto, p ? p.cont : null)));
      }
      show(lblBalcone, bal.join('\n'));
      // modo
      var trap = fModo.get() === true;
      var vasch = !!(p && p.cont && L.tipo(p.cont.tipo).conAlveoli);
      show(lblModo, trap ? vasch ? '⚠️ Una vaschetta alveolare serve per le semine: scegli «Semina» oppure un altro posto.' : 'Il raccolto è stimato togliendo il tempo del semenzaio, perché la piantina è già cresciuta.' : '');
    };
    [fVerdura, fDove, fModo].forEach(function (f) {
      return f.input.addEventListener('change', aggiorna);
    });
    fData.input.addEventListener('change', aggiorna);
    fAltra.input.addEventListener('input', aggiorna);
    if (esistente) {
      var known = nomi.find(function (x) {
        return L.eq(x, esistente.verdura);
      });
      if (known) fVerdura.set(known);else {
        fVerdura.set(ALTRA);
        fAltra.set(esistente.verdura);
      }
      var _i = esistente.oggettoId != null ? posti.findIndex(function (p) {
        return p.cont && p.cont.id === esistente.oggettoId;
      }) : esistente.solco > 0 ? posti.findIndex(function (p) {
        return !p.cont && p.solco === esistente.solco;
      }) : -1;
      if (_i >= 0) fDove.set(_i);
      sugP = esistente.distP != null ? String(esistente.distP) : null;
      sugS = esistente.distS != null ? String(esistente.distS) : null;
    } else if (+q.solco > 0) {
      var _i2 = posti.findIndex(function (p) {
        return !p.cont && p.solco === +q.solco;
      });
      if (_i2 >= 0) fDove.set(_i2);
    } else if (+q.oggetto > 0) {
      var _i3 = posti.findIndex(function (p) {
        return p.cont && p.cont.id === +q.oggetto;
      });
      if (_i3 >= 0) fDove.set(_i3);
    }
    aggiorna();
    var salva = /*#__PURE__*/function () {
      var _salva = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
        var n, p, dist, dp, ds, quantita, trap, occupati, rot, c, _t, _t2;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              e.preventDefault();
              n = nome();
              if (n) {
                _context.n = 2;
                break;
              }
              _context.n = 1;
              return UI.alert('Verdura mancante', 'Scegli o scrivi il nome della verdura.');
            case 1:
              return _context.a(2);
            case 2:
              p = posto();
              if (p) {
                _context.n = 4;
                break;
              }
              _context.n = 3;
              return UI.alert('Luogo mancante', posti.length === 0 ? nessunPosto.textContent : 'Scegli dove pianti la verdura: un solco o un contenitore (vaso, cassetta, vaschetta, serra, aiuola…).');
            case 3:
              return _context.a(2);
            case 4:
              dist = function dist(f) {
                var t = f.get();
                if (!t) return {
                  ok: true,
                  v: null
                };
                var v = /^\d+$/.test(t) ? +t : NaN;
                return v >= 1 && v <= 500 ? {
                  ok: true,
                  v
                } : {
                  ok: false
                };
              };
              dp = dist(fDP), ds = dist(fDS);
              if (!(!dp.ok || !ds.ok)) {
                _context.n = 6;
                break;
              }
              _context.n = 5;
              return UI.alert('Distanza non valida', 'Inserisci un numero intero di centimetri, da 1 a 500.');
            case 5:
              return _context.a(2);
            case 6:
              quantita = null;
              if (!fQta.get()) {
                _context.n = 9;
                break;
              }
              if (!(!/^\d+$/.test(fQta.get()) || +fQta.get() < 1 || +fQta.get() > 9999)) {
                _context.n = 8;
                break;
              }
              _context.n = 7;
              return UI.alert('Numero non valido', 'Inserisci il numero di piantine, da 1 a 9999.');
            case 7:
              return _context.a(2);
            case 8:
              quantita = +fQta.get();
            case 9:
              trap = fModo.get() === true;
              if (!(p.cont && p.cont.alveoli)) {
                _context.n = 12;
                break;
              }
              occupati = altre.filter(function (c) {
                return c.oggettoId === p.cont.id;
              }).reduce(function (s, c) {
                return s + L.piantine(c);
              }, 0) + (quantita || 1);
              _t = occupati > p.cont.alveoli;
              if (!_t) {
                _context.n = 11;
                break;
              }
              _context.n = 10;
              return UI.confirm('Vaschetta piena', "".concat(p.cont.nome, " ha ").concat(p.cont.alveoli, " alveoli e con questa verdura ne servirebbero ").concat(occupati, "."), {
                ok: 'Pianta lo stesso'
              });
            case 10:
              _t = !_context.v;
            case 11:
              if (!_t) {
                _context.n = 12;
                break;
              }
              return _context.a(2);
            case 12:
              if (!(trap && p.cont && L.tipo(p.cont.tipo).conAlveoli)) {
                _context.n = 14;
                break;
              }
              _context.n = 13;
              return UI.alert('Trapianto in vaschetta', 'Una vaschetta alveolare serve per le semine: scegli «Semina» oppure un altro posto.');
            case 13:
              return _context.a(2);
            case 14:
              rot = avvisiRot();
              _t2 = rot.length;
              if (!_t2) {
                _context.n = 16;
                break;
              }
              _context.n = 15;
              return UI.confirm('Rotazione delle colture', rot.join('\n\n'), {
                ok: 'Pianta lo stesso'
              });
            case 15:
              _t2 = !_context.v;
            case 16:
              if (!_t2) {
                _context.n = 17;
                break;
              }
              return _context.a(2);
            case 17:
              c = esistente || S.newColt(ortoId);
              Object.assign(c, {
                verdura: n,
                tipologia: fTip.get() || null,
                data: fData.get() || L.iso(L.today()),
                note: fNote.get() || null,
                oggettoId: p.cont ? p.cont.id : null,
                solco: p.solco,
                distP: dp.v,
                distS: ds.v,
                quantita,
                trapiantata: trap
              });
              if (esistente) S.updateColt();else S.addColt(c);
              back("#/orto/".concat(ortoId));
            case 18:
              return _context.a(2);
          }
        }, _callee);
      }));
      function salva(_x) {
        return _salva.apply(this, arguments);
      }
      return salva;
    }();
    var form = h('form', {
      class: 'form',
      onsubmit: salva
    }, fVerdura.el, fAltra.el, fTip.el, fDove.el, nessunPosto, lblBalcone, lblVicini, lblRot, fData.el, fModo.el, lblModo, fQta.el, fDP.el, fDS.el, lblConsig, fNote.el, bottoniForm(function () {
      return back("#/orto/".concat(ortoId));
    }, salva, esistente ? 'Salva' : 'Aggiungi'));
    return {
      form: true,
      title: esistente ? 'Modifica verdura' : 'Nuova verdura',
      back: "#/orto/".concat(ortoId),
      el: form
    };
  };

  // =====================================================================
  // NUOVO / MODIFICA ORTO
  // =====================================================================
  V.modificaOrto = function (_ref2) {
    var id = _ref2.id;
    var nuovo = id === 'nuovo';
    var orto = nuovo ? {
      nome: '',
      mq: null,
      solchi: 1,
      spazio: 'Terreno',
      esposizione: null,
      note: null,
      lat: null,
      lon: null,
      localita: null,
      alt: null
    } : S.orto(+id);
    if (!orto) return {
      title: 'Orto',
      back: '#/orti',
      el: UI.empty('Orto non trovato.')
    };
    var pos = L.posizione(orto);
    var fNome = UI.field({
      label: 'Nome',
      type: 'text',
      value: orto.nome,
      placeholder: 'es. Orto di casa'
    });
    var fSpazio = UI.field({
      label: 'Tipo di spazio',
      type: 'select',
      options: [{
        v: 'Terreno',
        l: '🌾 Terreno (solchi, serre, aiuole)'
      }, {
        v: 'Balcone',
        l: '🪴 Balcone o terrazzo (vasi e cassette)'
      }],
      value: L.isBalcone(orto) ? 'Balcone' : 'Terreno'
    });
    var fMq = UI.field({
      label: 'Superficie in m² (facoltativa)',
      type: 'number',
      value: orto.mq != null ? L.num(orto.mq, 2) : ''
    });
    var fSolchi = UI.field({
      label: nuovo ? 'Numero di solchi in tutto (obbligatorio, almeno 1)' : 'Numero di solchi in tutto',
      type: 'int',
      value: orto.solchi != null ? orto.solchi : ''
    });
    var fEsp = UI.field({
      label: 'Esposizione del balcone',
      type: 'select',
      options: [{
        v: null,
        l: 'Non indicata'
      }].concat(D.ESPOSIZIONI.map(function (e) {
        return {
          v: e,
          l: "A ".concat(e)
        };
      })),
      value: orto.esposizione || null
    });
    var fNote = UI.field({
      label: 'Note',
      type: 'textarea',
      value: orto.note
    });
    var lblPos = h('p', {
      class: 'note'
    });
    var fCitta = UI.field({
      label: 'Città dell\'orto (per meteo, avvisi e mesi di semina)',
      type: 'text',
      placeholder: 'es. Firenze'
    });
    var mostraPos = function mostraPos() {
      lblPos.textContent = pos ? "📍 ".concat(pos.localita || "".concat(pos.lat.toFixed(2), "°, ").concat(pos.lon.toFixed(2), "°")).concat(L.descriviQuota(pos), ": meteo, avvisi e mesi di semina di questo orto useranno questo luogo.") : 'Nessuna posizione: senza di essa non ci sono meteo e avvisi di pioggia e gelo per questo orto, e per la semina uso il clima del Centro Italia in pianura.';
    };
    mostraPos();
    var spazio = function spazio() {
      return fSpazio.get();
    };
    var sync = function sync() {
      fSolchi.el.hidden = spazio() === 'Balcone';
      fEsp.el.hidden = spazio() !== 'Balcone';
    };
    fSpazio.input.addEventListener('change', sync);
    sync();
    var conQuota = /*#__PURE__*/function () {
      var _conQuota = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(p) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (!(p.alt == null)) {
                _context2.n = 2;
                break;
              }
              _context2.n = 1;
              return ST.altitudine(p.lat, p.lon);
            case 1:
              p.alt = _context2.v;
            case 2:
              return _context2.a(2, p);
          }
        }, _callee2);
      }));
      function conQuota(_x2) {
        return _conQuota.apply(this, arguments);
      }
      return conQuota;
    }();
    var cerca = /*#__PURE__*/function () {
      var _cerca = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var nome, r, s, i, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              nome = fCitta.get();
              if (nome) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2);
            case 1:
              _context3.p = 1;
              _context3.n = 2;
              return ST.cercaCitta(nome);
            case 2:
              r = _context3.v;
              if (r.length) {
                _context3.n = 4;
                break;
              }
              _context3.n = 3;
              return UI.alert('Città non trovata', "Non trovo «".concat(nome, "»: controlla il nome."));
            case 3:
              return _context3.a(2);
            case 4:
              s = r[0];
              if (!(r.length > 1)) {
                _context3.n = 7;
                break;
              }
              _context3.n = 5;
              return UI.sheet('Quale città?', r.map(function (x, i) {
                return {
                  label: x.desc,
                  value: i
                };
              }), {
                cancel: 'Annulla'
              });
            case 5:
              i = _context3.v;
              if (!(i == null)) {
                _context3.n = 6;
                break;
              }
              return _context3.a(2);
            case 6:
              s = r[i];
            case 7:
              _context3.n = 8;
              return conQuota({
                lat: s.lat,
                lon: s.lon,
                localita: s.nome,
                alt: s.alt
              });
            case 8:
              pos = _context3.v;
              fCitta.set('');
              mostraPos();
              _context3.n = 10;
              break;
            case 9:
              _context3.p = 9;
              _t3 = _context3.v;
              _context3.n = 10;
              return UI.alert('Ricerca non riuscita', 'Serve la connessione a internet.');
            case 10:
              return _context3.a(2);
          }
        }, _callee3, null, [[1, 9]]);
      }));
      function cerca() {
        return _cerca.apply(this, arguments);
      }
      return cerca;
    }();
    var gps = /*#__PURE__*/function () {
      var _gps = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var _t4, _t5;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              _t4 = conQuota;
              _context4.n = 1;
              return ST.posizioneAttuale();
            case 1:
              _context4.n = 2;
              return _t4(_context4.v);
            case 2:
              pos = _context4.v;
              mostraPos();
              _context4.n = 4;
              break;
            case 3:
              _context4.p = 3;
              _t5 = _context4.v;
              _context4.n = 4;
              return UI.alert('Posizione non disponibile', _t5.message);
            case 4:
              return _context4.a(2);
          }
        }, _callee4, null, [[0, 3]]);
      }));
      function gps() {
        return _gps.apply(this, arguments);
      }
      return gps;
    }();
    var salva = /*#__PURE__*/function () {
      var _salva2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(e) {
        var nome, mq, solchi, balcone, t, totale, occ, s;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              e.preventDefault();
              nome = fNome.get();
              if (nome) {
                _context5.n = 2;
                break;
              }
              _context5.n = 1;
              return UI.alert('Nome mancante', "Dai un nome all'orto.");
            case 1:
              return _context5.a(2);
            case 2:
              mq = null;
              if (!fMq.get()) {
                _context5.n = 4;
                break;
              }
              mq = L.parseNum(fMq.get());
              if (mq > 0) {
                _context5.n = 4;
                break;
              }
              _context5.n = 3;
              return UI.alert('Metri quadrati non validi', 'Inserisci un numero maggiore di zero, es. 120 o 85,5.');
            case 3:
              return _context5.a(2);
            case 4:
              solchi = null;
              balcone = spazio() === 'Balcone';
              if (!balcone) {
                _context5.n = 7;
                break;
              }
              if (!(!nuovo && S.db.coltivazioni.some(function (c) {
                return c.ortoId === orto.id && c.oggettoId == null && c.solco > 0;
              }))) {
                _context5.n = 6;
                break;
              }
              _context5.n = 5;
              return UI.alert('Verdure nei solchi', 'In questo orto ci sono verdure piantate nei solchi: spostale in un contenitore (o trapiantale altrove) prima di passare a balcone.');
            case 5:
              return _context5.a(2);
            case 6:
              _context5.n = 18;
              break;
            case 7:
              if (!fSolchi.get()) {
                _context5.n = 15;
                break;
              }
              t = fSolchi.get();
              if (!(!/^\d+$/.test(t) || +t < 1 || +t > 999)) {
                _context5.n = 9;
                break;
              }
              _context5.n = 8;
              return UI.alert('Solchi non validi', 'Inserisci un numero intero da 1 a 999.');
            case 8:
              return _context5.a(2);
            case 9:
              solchi = +t;
              if (nuovo) {
                _context5.n = 14;
                break;
              }
              totale = S.totaleSolchi(orto.id);
              if (!(solchi < totale)) {
                _context5.n = 14;
                break;
              }
              occ = L.uniqueCI([]).concat(Array.from(new Set(S.db.coltivazioni.filter(function (c) {
                return c.ortoId === orto.id && c.oggettoId == null && c.solco > solchi;
              }).map(function (c) {
                return c.solco;
              }).concat(S.trattSolchi(orto.id).filter(function (x) {
                return x.oggettoId == null && x.solco > solchi;
              }).map(function (x) {
                return x.solco;
              }))))).sort(function (a, b) {
                return a - b;
              });
              if (!occ.length) {
                _context5.n = 11;
                break;
              }
              _context5.n = 10;
              return UI.alert('Solchi occupati', "Per arrivare a ".concat(solchi, " solchi bisognerebbe togliere anche ").concat(occ.length === 1 ? 'il solco' : 'i solchi', " ").concat(occ.join(', '), ", che contengono verdure o concimi. Usa «Rimuovi solco» dal menu del solco: puoi eliminarlo, oppure sostituirlo con un'aiuola rialzata o un passaggio."));
            case 10:
              return _context5.a(2);
            case 11:
              _context5.n = 12;
              return UI.confirm('Togliere dei solchi?', "Passi da ".concat(totale, " a ").concat(solchi, " solchi: gli ultimi ").concat(totale - solchi, " sono vuoti e verranno tolti."), {
                ok: 'Togli'
              });
            case 12:
              if (_context5.v) {
                _context5.n = 13;
                break;
              }
              return _context5.a(2);
            case 13:
              for (s = totale; s > solchi; s--) S.rimuoviSolco(orto.id, s, 'nessuna', false);
            case 14:
              _context5.n = 18;
              break;
            case 15:
              if (!nuovo) {
                _context5.n = 17;
                break;
              }
              _context5.n = 16;
              return UI.alert('Solchi mancanti', 'Un nuovo orto deve avere almeno 1 solco.');
            case 16:
              return _context5.a(2);
            case 17:
              solchi = orto.solchi;
            case 18:
              Object.assign(orto, {
                nome,
                mq,
                solchi,
                spazio: balcone ? 'Balcone' : 'Terreno',
                esposizione: balcone ? fEsp.get() : null,
                note: fNote.get() || null,
                lat: pos ? pos.lat : null,
                lon: pos ? pos.lon : null,
                localita: pos ? pos.localita : null,
                alt: pos ? pos.alt : null
              });
              if (nuovo) S.addOrto(orto);else S.updateOrto();
              if (nuovo) GO.nav.replace("#/orto/".concat(orto.id));else back("#/orto/".concat(orto.id));
            case 19:
              return _context5.a(2);
          }
        }, _callee5);
      }));
      function salva(_x3) {
        return _salva2.apply(this, arguments);
      }
      return salva;
    }();
    var form = h('form', {
      class: 'form',
      onsubmit: salva
    }, fNome.el, fSpazio.el, fMq.el, fSolchi.el, fEsp.el, h('div', {
      class: 'card'
    }, h('div', {
      class: 'row-t',
      text: '📍 Posizione'
    }), lblPos, fCitta.el, h('div', {
      class: 'row-gap'
    }, h('button', {
      type: 'button',
      class: 'btn small',
      onclick: cerca,
      text: '🔎 Cerca città'
    }), h('button', {
      type: 'button',
      class: 'btn small',
      onclick: gps,
      text: '📍 Usa la mia posizione'
    }), h('button', {
      type: 'button',
      class: 'btn small',
      onclick: function onclick() {
        pos = null;
        mostraPos();
      },
      text: 'Rimuovi'
    }))), fNote.el, bottoniForm(function () {
      return nuovo ? back('#/orti') : back("#/orto/".concat(orto.id));
    }, salva));
    return {
      form: true,
      title: nuovo ? 'Nuovo orto' : 'Modifica orto',
      back: nuovo ? '#/orti' : "#/orto/".concat(orto.id),
      el: form
    };
  };

  // =====================================================================
  // NUOVO OGGETTO
  // =====================================================================
  V.nuovoOggetto = function (_ref3) {
    var id = _ref3.id;
    var orto = S.orto(+id);
    if (!orto) return {
      title: 'Oggetto',
      back: '#/orti',
      el: UI.empty('Orto non trovato.')
    };
    var balcone = L.isBalcone(orto);
    var tipi = L.perSpazio(balcone);
    var esistenti = S.oggettiOrto(orto.id);
    var posizioni = L.opzioniPosizione(S.totaleSolchi(orto.id));
    var fTipo = UI.field({
      label: 'Tipo di oggetto',
      type: 'select',
      options: tipi.map(function (t) {
        return {
          v: t,
          l: "".concat(t.emoji, " ").concat(t.nome)
        };
      }),
      value: tipi[0]
    });
    var fNome = UI.field({
      label: 'Nome',
      type: 'text',
      value: L.nomeSuggerito(tipi[0], esistenti)
    });
    var fData = UI.field({
      label: 'Data di installazione',
      type: 'date',
      value: L.iso(L.today()),
      max: L.iso(L.today())
    });
    var fPos = UI.field({
      label: 'Posizione fra i solchi',
      type: 'select',
      options: posizioni.map(function (p) {
        return {
          v: p.dopo,
          l: p.label
        };
      }),
      value: null
    });
    var fAlv = UI.field({
      label: 'Numero di alveoli',
      type: 'select',
      options: D.ALVEOLI.map(function (n) {
        return {
          v: n,
          l: "".concat(n, " alveoli")
        };
      }),
      value: 6
    });
    var fProf = UI.field({
      label: 'Profondità del terriccio in cm (facoltativa)',
      type: 'int'
    });
    var fTemp = UI.field({
      label: 'Temperatura iniziale in °C (facoltativa)',
      type: 'number'
    });
    var fMat = UI.field({
      label: 'Materiali già inseriti (separati da virgola)',
      type: 'textarea'
    });
    var fNote = UI.field({
      label: 'Note',
      type: 'textarea'
    });
    var suggerito = fNome.get();
    var sync = function sync() {
      var t = fTipo.get();
      if (!fNome.get() || fNome.get() === suggerito) {
        suggerito = L.nomeSuggerito(t, esistenti);
        fNome.set(suggerito);
      }
      fTemp.el.hidden = fMat.el.hidden = !t.conTemperatura;
      fPos.el.hidden = !(t.ospita && !balcone);
      fAlv.el.hidden = !t.conAlveoli;
      fProf.el.hidden = !t.conProfondita;
    };
    fTipo.input.addEventListener('change', sync);
    sync();
    var salva = /*#__PURE__*/function () {
      var _salva3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(e) {
        var t, nome, gradi, prof, data, o;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              e.preventDefault();
              t = fTipo.get();
              nome = fNome.get();
              if (nome) {
                _context6.n = 2;
                break;
              }
              _context6.n = 1;
              return UI.alert('Nome mancante', "Dai un nome all'oggetto.");
            case 1:
              return _context6.a(2);
            case 2:
              gradi = null;
              if (!(t.conTemperatura && fTemp.get())) {
                _context6.n = 4;
                break;
              }
              gradi = L.parseNum(fTemp.get());
              if (!isNaN(gradi)) {
                _context6.n = 4;
                break;
              }
              _context6.n = 3;
              return UI.alert('Temperatura non valida', 'Inserisci un numero, es. 20 o 20,5.');
            case 3:
              return _context6.a(2);
            case 4:
              prof = null;
              if (!(t.conProfondita && fProf.get())) {
                _context6.n = 7;
                break;
              }
              if (!(!/^\d+$/.test(fProf.get()) || +fProf.get() < 1 || +fProf.get() > 200)) {
                _context6.n = 6;
                break;
              }
              _context6.n = 5;
              return UI.alert('Profondità non valida', 'Inserisci un numero di centimetri da 1 a 200.');
            case 5:
              return _context6.a(2);
            case 6:
              prof = +fProf.get();
            case 7:
              data = fData.get() || L.iso(L.today());
              o = S.addOggetto({
                ortoId: orto.id,
                tipo: t.nome,
                nome,
                data,
                note: fNote.get() || null,
                dopoSolco: t.ospita && !balcone ? fPos.get() : null,
                profCm: prof,
                alveoli: t.conAlveoli ? fAlv.get() : null
              });
              if (t.conTemperatura) {
                fMat.get().split(/[,\n]/).map(function (x) {
                  return x.trim();
                }).filter(Boolean).forEach(function (m) {
                  return S.db.materiali.push({
                    id: S.id(),
                    oggettoId: o.id,
                    data,
                    nome: m
                  });
                });
                if (gradi != null) S.db.letture.push({
                  id: S.id(),
                  oggettoId: o.id,
                  data: "".concat(data, "T").concat(L.pad(new Date().getHours()), ":").concat(L.pad(new Date().getMinutes())),
                  gradi
                });
                S.save();
              }
              back("#/orto/".concat(orto.id));
            case 8:
              return _context6.a(2);
          }
        }, _callee6);
      }));
      function salva(_x4) {
        return _salva3.apply(this, arguments);
      }
      return salva;
    }();
    return {
      form: true,
      title: 'Nuovo oggetto',
      back: "#/orto/".concat(orto.id),
      el: h('form', {
        class: 'form',
        onsubmit: salva
      }, fTipo.el, fNome.el, fData.el, fPos.el, fAlv.el, fProf.el, fTemp.el, fMat.el, fNote.el, bottoniForm(function () {
        return back("#/orto/".concat(orto.id));
      }, salva, 'Aggiungi'))
    };
  };

  // =====================================================================
  // OGGETTO (lombricompostiera / compostiera / registro generico)
  // =====================================================================
  var giudizio = function giudizio(tipo, g) {
    if (tipo === 'Compostiera') {
      if (g < 20) return ['Fredda: attività lenta. Mescola e aggiungi materiale verde (azoto).', '#1E88E5'];
      if (g < 40) return ['Tiepida: il processo è avviato, rivolta ogni tanto.', '#4682B4'];
      if (g <= 65) return ['Fase calda ideale 👍', '#2E8B57'];
      if (g <= 70) return ['Molto calda: rivolta il cumulo e controlla l\'umidità.', '#FF8C00'];
      return ['Troppo calda: rivolta subito e inumidisci.', '#E53935'];
    }
    if (g < 10) return ['Troppo freddo: le lombriche rallentano. Riparala o aggiungi materiale che scalda.', '#1E88E5'];
    if (g < 15) return ['Un po\' fredda: l\'attività è ridotta.', '#4682B4'];
    if (g <= 25) return ['Temperatura ideale 👍', '#2E8B57'];
    if (g <= 30) return ['Un po\' calda: tienila all\'ombra e controlla l\'umidità.', '#FF8C00'];
    return ['Troppo calda: rischio per le lombriche! Sposta all\'ombra e inumidisci.', '#E53935'];
  };
  V.oggetto = function (_ref4) {
    var id = _ref4.id;
    var o = S.get('oggetti', +id);
    if (!o) return {
      title: 'Oggetto',
      back: '#/orti',
      el: UI.empty('Oggetto non trovato.')
    };
    var tipo = L.tipo(o.tipo);
    var root = h('div');
    var backTo = "#/orto/".concat(o.ortoId);
    root.append(h('h2', {
      class: 'pg-t',
      text: "".concat(tipo.emoji, " ").concat(o.nome)
    }));
    if (tipo.conTemperatura) {
      root.append(UI.note("".concat(o.tipo === D.LOMBRI ? 'Installata' : 'Installato', " il ").concat(L.fmtS(o.data), " (").concat(L.diff(L.today(), L.parse(o.data)), " giorni fa)")));
      if (o.note) root.append(UI.note(o.note));
      var letture = L.sortBy(S.db.letture.filter(function (x) {
        return x.oggettoId === o.id;
      }), function (x) {
        return x.data;
      }, function (x) {
        return x.id;
      }).reverse();
      var att = h('div', {
        class: 'temp'
      });
      if (letture.length) {
        var _giudizio = giudizio(o.tipo, letture[0].gradi),
          _giudizio2 = _slicedToArray(_giudizio, 2),
          t = _giudizio2[0],
          c = _giudizio2[1];
        att.append(h('div', {
          class: 'temp-n',
          text: "".concat(L.num(letture[0].gradi, 1), " °C")
        }), h('div', {
          class: 'temp-g',
          style: {
            color: c
          },
          text: t
        }));
      } else att.append(h('div', {
        class: 'temp-n',
        text: '—'
      }), h('div', {
        class: 'temp-g',
        text: 'Registra la prima temperatura.'
      }));
      root.append(UI.card(att));
      root.append(h('div', {
        class: 'row-gap'
      }, h('button', {
        class: 'btn primary small',
        text: '🌡️ Aggiungi temperatura',
        onclick: function () {
          var _onclick = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
            var t;
            return _regenerator().w(function (_context7) {
              while (1) switch (_context7.n) {
                case 0:
                  _context7.n = 1;
                  return UI.prompt('Temperatura', 'Gradi °C misurati:', {
                    type: 'number',
                    placeholder: 'es. 21,5',
                    validate: function validate(v) {
                      return isNaN(L.parseNum(v)) ? 'Inserisci un numero, es. 21 o 21,5.' : null;
                    }
                  });
                case 1:
                  t = _context7.v;
                  if (t != null) S.addRiga('letture', {
                    oggettoId: o.id,
                    data: L.nowISO(),
                    gradi: L.parseNum(t)
                  });
                case 2:
                  return _context7.a(2);
              }
            }, _callee7);
          }));
          function onclick() {
            return _onclick.apply(this, arguments);
          }
          return onclick;
        }()
      }), h('button', {
        class: 'btn small',
        text: '➕ Aggiungi materiale',
        onclick: function () {
          var _onclick2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
            var n;
            return _regenerator().w(function (_context8) {
              while (1) switch (_context8.n) {
                case 0:
                  _context8.n = 1;
                  return UI.prompt('Materiale', 'Cosa hai aggiunto?', {
                    placeholder: 'es. bucce di patate',
                    validate: function validate(v) {
                      return v ? null : 'Scrivi cosa hai aggiunto.';
                    }
                  });
                case 1:
                  n = _context8.v;
                  if (n) S.addRiga('materiali', {
                    oggettoId: o.id,
                    data: L.iso(L.today()),
                    nome: n.trim()
                  });
                case 2:
                  return _context8.a(2);
              }
            }, _callee8);
          }));
          function onclick() {
            return _onclick2.apply(this, arguments);
          }
          return onclick;
        }()
      })));
      root.append(h('h3', {
        class: 'grp',
        text: 'Temperature (ultime 30)'
      }), letture.length ? h('div', {
        class: 'card flush'
      }, letture.slice(0, 30).map(function (l) {
        return h('button', {
          class: 'row',
          onclick: function () {
            var _onclick3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
              return _regenerator().w(function (_context9) {
                while (1) switch (_context9.n) {
                  case 0:
                    _context9.n = 1;
                    return UI.confirm('Elimina temperatura', "".concat(L.fmtDT(l.data), " · ").concat(L.num(l.gradi, 1), " °C"), {
                      ok: 'Elimina',
                      danger: true
                    });
                  case 1:
                    if (!_context9.v) {
                      _context9.n = 2;
                      break;
                    }
                    S.delRiga('letture', l.id);
                  case 2:
                    return _context9.a(2);
                }
              }, _callee9);
            }));
            function onclick() {
              return _onclick3.apply(this, arguments);
            }
            return onclick;
          }()
        }, h('div', {
          class: 'row-s',
          text: "".concat(L.fmtDT(l.data), " · ").concat(L.num(l.gradi, 1), " °C")
        }));
      })) : UI.empty('Nessuna temperatura registrata.'));
      var mat = L.sortBy(S.db.materiali.filter(function (x) {
        return x.oggettoId === o.id;
      }), function (x) {
        return x.data;
      }, function (x) {
        return x.id;
      }).reverse();
      root.append(h('h3', {
        class: 'grp',
        text: 'Materiali aggiunti'
      }), mat.length ? h('div', {
        class: 'card flush'
      }, mat.map(function (m) {
        return h('button', {
          class: 'row',
          onclick: function () {
            var _onclick4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
              return _regenerator().w(function (_context0) {
                while (1) switch (_context0.n) {
                  case 0:
                    _context0.n = 1;
                    return UI.confirm('Elimina materiale', m.nome, {
                      ok: 'Elimina',
                      danger: true
                    });
                  case 1:
                    if (!_context0.v) {
                      _context0.n = 2;
                      break;
                    }
                    S.delRiga('materiali', m.id);
                  case 2:
                    return _context0.a(2);
                }
              }, _callee0);
            }));
            function onclick() {
              return _onclick4.apply(this, arguments);
            }
            return onclick;
          }()
        }, h('div', {
          class: 'row-s',
          text: "• ".concat(m.nome, "  (").concat(L.fmtS(m.data), ")")
        }));
      })) : UI.empty('Nessun materiale registrato.'));
    } else {
      root.append(UI.note("".concat(o.tipo, " · installato il ").concat(L.fmtS(o.data))));
      if (o.note) root.append(UI.note(o.note));
      root.append(h('button', {
        class: 'btn primary small',
        text: '＋ Aggiungi voce',
        onclick: function () {
          var _onclick5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
            var t;
            return _regenerator().w(function (_context1) {
              while (1) switch (_context1.n) {
                case 0:
                  _context1.n = 1;
                  return UI.prompt('Nuova voce', 'Cosa vuoi annotare?', {
                    placeholder: tipo.esempio,
                    validate: function validate(v) {
                      return v ? null : 'Scrivi qualcosa.';
                    }
                  });
                case 1:
                  t = _context1.v;
                  if (t) S.addRiga('registro', {
                    oggettoId: o.id,
                    data: L.nowISO(),
                    testo: t.trim()
                  });
                case 2:
                  return _context1.a(2);
              }
            }, _callee1);
          }));
          function onclick() {
            return _onclick5.apply(this, arguments);
          }
          return onclick;
        }()
      }));
      var reg = L.sortBy(S.db.registro.filter(function (x) {
        return x.oggettoId === o.id;
      }), function (x) {
        return x.data;
      }, function (x) {
        return x.id;
      }).reverse();
      root.append(h('h3', {
        class: 'grp',
        text: 'Registro'
      }), reg.length ? h('div', {
        class: 'card flush'
      }, reg.map(function (v) {
        return h('button', {
          class: 'row',
          onclick: function () {
            var _onclick6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
              return _regenerator().w(function (_context10) {
                while (1) switch (_context10.n) {
                  case 0:
                    _context10.n = 1;
                    return UI.confirm('Elimina voce', v.testo, {
                      ok: 'Elimina',
                      danger: true
                    });
                  case 1:
                    if (!_context10.v) {
                      _context10.n = 2;
                      break;
                    }
                    S.delRiga('registro', v.id);
                  case 2:
                    return _context10.a(2);
                }
              }, _callee10);
            }));
            function onclick() {
              return _onclick6.apply(this, arguments);
            }
            return onclick;
          }()
        }, h('div', {
          class: 'row-s',
          text: "".concat(L.fmtDT(v.data), " · ").concat(v.testo)
        }));
      })) : UI.empty('Nessuna voce nel registro.'));
    }
    root.append(h('div', {
      class: 'sep'
    }), h('button', {
      class: 'btn danger block',
      text: '🗑️ Elimina oggetto',
      onclick: function () {
        var _onclick7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
          var dentro, nomi;
          return _regenerator().w(function (_context11) {
            while (1) switch (_context11.n) {
              case 0:
                dentro = S.db.coltivazioni.filter(function (c) {
                  return c.oggettoId === o.id;
                });
                if (!dentro.length) {
                  _context11.n = 2;
                  break;
                }
                nomi = L.uniqueCI(dentro.map(function (c) {
                  return c.verdura;
                }));
                _context11.n = 1;
                return UI.alert('Non si può eliminare', "".concat(o.nome, " contiene ancora ").concat(dentro.length === 1 ? '1 verdura' : "".concat(dentro.length, " verdure"), " (").concat(nomi.length > 5 ? nomi.slice(0, 5).join(', ') + '…' : nomi.join(', '), "). Sposta le verdure in un altro posto (Modifica) oppure eliminale, poi riprova."));
              case 1:
                return _context11.a(2);
              case 2:
                _context11.n = 3;
                return UI.confirm('Elimina', tipo.conTemperatura ? 'Eliminare questo oggetto con tutto il suo storico?' : 'Eliminare questo oggetto con tutto il suo registro?', {
                  ok: 'Elimina',
                  danger: true
                });
              case 3:
                if (_context11.v) {
                  _context11.n = 4;
                  break;
                }
                return _context11.a(2);
              case 4:
                S.deleteOggetto(o.id);
                GO.nav.replace(backTo);
              case 5:
                return _context11.a(2);
            }
          }, _callee11);
        }));
        function onclick() {
          return _onclick7.apply(this, arguments);
        }
        return onclick;
      }()
    }));
    return {
      title: o.nome,
      back: backTo,
      el: root
    };
  };

  // =====================================================================
  // CALENDARIO SEMINE
  // =====================================================================
  var st2 = {
    semOrto: 0,
    soloAdesso: false
  };
  V.semine = function () {
    var root = h('div');
    var tok = GO.token;
    var orti = S.orti();
    if (st2.semOrto >= orti.length) st2.semOrto = 0;
    var orto = orti[st2.semOrto] || null;
    var cl = L.clima(orto);
    if (orti.length > 1) {
      var sel = UI.field({
        label: 'Orto',
        type: 'select',
        options: orti.map(function (o, i) {
          return {
            v: i,
            l: o.nome
          };
        }),
        value: st2.semOrto
      });
      sel.input.addEventListener('change', function () {
        st2.semOrto = sel.get();
        GO.render();
      });
      root.append(sel.el);
    }
    root.append(UI.note(orto ? L.descriviClima(orto) : 'Nessun orto: uso il clima del Centro Italia in pianura'));
    if (orto) {
      var bt = h('div', {
        class: 'row-gap'
      }, h('button', {
        class: 'btn small',
        text: '📍 Usa la mia posizione',
        onclick: function () {
          var _onclick8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(e) {
            var _p, _t6;
            return _regenerator().w(function (_context12) {
              while (1) switch (_context12.p = _context12.n) {
                case 0:
                  e.target.disabled = true;
                  _context12.p = 1;
                  _context12.n = 2;
                  return ST.posizioneAttuale();
                case 2:
                  _p = _context12.v;
                  if (!(_p.alt == null)) {
                    _context12.n = 4;
                    break;
                  }
                  _context12.n = 3;
                  return ST.altitudine(_p.lat, _p.lon);
                case 3:
                  _p.alt = _context12.v;
                case 4:
                  Object.assign(orto, {
                    lat: _p.lat,
                    lon: _p.lon,
                    localita: _p.localita,
                    alt: _p.alt
                  });
                  S.save();
                  _context12.n = 6;
                  break;
                case 5:
                  _context12.p = 5;
                  _t6 = _context12.v;
                  _context12.n = 6;
                  return UI.alert('Posizione non disponibile', _t6.message);
                case 6:
                  _context12.p = 6;
                  e.target.disabled = false;
                  return _context12.f(6);
                case 7:
                  return _context12.a(2);
              }
            }, _callee12, null, [[1, 5, 6, 7]]);
          }));
          function onclick(_x5) {
            return _onclick8.apply(this, arguments);
          }
          return onclick;
        }()
      }), h('button', {
        class: 'btn small',
        text: '🔎 Cerca città',
        onclick: function () {
          var _onclick9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
            var n, r, s, i, _t7, _t8, _t9, _t0, _t1, _t10, _t11, _t12, _t13;
            return _regenerator().w(function (_context13) {
              while (1) switch (_context13.p = _context13.n) {
                case 0:
                  _context13.n = 1;
                  return UI.prompt('Cerca città', 'Nome della città:', {
                    placeholder: 'es. Firenze',
                    ok: 'Cerca',
                    validate: function validate(v) {
                      return v ? null : 'Scrivi il nome della città.';
                    }
                  });
                case 1:
                  n = _context13.v;
                  if (n) {
                    _context13.n = 2;
                    break;
                  }
                  return _context13.a(2);
                case 2:
                  _context13.p = 2;
                  _context13.n = 3;
                  return ST.cercaCitta(n);
                case 3:
                  r = _context13.v;
                  if (r.length) {
                    _context13.n = 5;
                    break;
                  }
                  _context13.n = 4;
                  return UI.alert('Città non trovata', "Non trovo «".concat(n, "»: controlla il nome."));
                case 4:
                  return _context13.a(2);
                case 5:
                  s = r[0];
                  if (!(r.length > 1)) {
                    _context13.n = 8;
                    break;
                  }
                  _context13.n = 6;
                  return UI.sheet('Quale città?', r.map(function (x, i) {
                    return {
                      label: x.desc,
                      value: i
                    };
                  }), {
                    cancel: 'Annulla'
                  });
                case 6:
                  i = _context13.v;
                  if (!(i == null)) {
                    _context13.n = 7;
                    break;
                  }
                  return _context13.a(2);
                case 7:
                  s = r[i];
                case 8:
                  _t7 = Object;
                  _t8 = _t7.assign;
                  _t9 = orto;
                  _t0 = s.lat;
                  _t1 = s.lon;
                  _t10 = s.nome;
                  if (!(s.alt == null)) {
                    _context13.n = 10;
                    break;
                  }
                  _context13.n = 9;
                  return ST.altitudine(s.lat, s.lon);
                case 9:
                  _t11 = _context13.v;
                  _context13.n = 11;
                  break;
                case 10:
                  _t11 = s.alt;
                case 11:
                  _t12 = _t11;
                  _t8.call(_t7, _t9, {
                    lat: _t0,
                    lon: _t1,
                    localita: _t10,
                    alt: _t12
                  });
                  S.save();
                  _context13.n = 13;
                  break;
                case 12:
                  _context13.p = 12;
                  _t13 = _context13.v;
                  _context13.n = 13;
                  return UI.alert('Ricerca non riuscita', 'Serve la connessione a internet.');
                case 13:
                  return _context13.a(2);
              }
            }, _callee13, null, [[2, 12]]);
          }));
          function onclick() {
            return _onclick9.apply(this, arguments);
          }
          return onclick;
        }()
      }));
      root.append(bt);
    }
    var solo = UI.field({
      label: 'Solo le verdure da seminare adesso',
      type: 'checkbox',
      value: st2.soloAdesso
    });
    solo.input.addEventListener('change', function () {
      st2.soloAdesso = solo.get();
      GO.render();
    });
    root.append(solo.el);
    root.append(h('div', {
      class: 'legenda'
    }, h('span', null, h('i', {
      class: 'lg semina'
    }), ' Semina'), h('span', null, h('i', {
      class: 'lg racc'
    }), ' Raccolta (stimata)')));
    var adesso = L.today().getMonth() + 1;
    var anno = L.today().getFullYear();
    var tab = h('div', {
      class: 'cal'
    });
    tab.append(h('div', {
      class: 'cal-n'
    }));
    for (var m = 1; m <= 12; m++) tab.append(h('div', {
      class: 'cal-m' + (m === adesso ? ' now' : ''),
      text: D.MESI[m - 1].charAt(0).toUpperCase(),
      title: L.cap(D.MESI_LUNGHI[m - 1])
    }));
    D.CATALOGO.slice().sort(function (a, b) {
      return L.cmpText(a.nome, b.nome);
    }).forEach(function (v) {
      var sem = new Set(L.mesiPer(v, cl));
      if (st2.soloAdesso && !sem.has(adesso)) return;
      var rac = new Set(Array.from(sem).map(function (m) {
        return new Date(anno, m - 1, 15 + v.giorni).getMonth() + 1;
      }));
      tab.append(h('button', {
        class: 'cal-n',
        text: "".concat(v.emoji, " ").concat(v.nome),
        onclick: function onclick() {
          var mesi = function mesi(s) {
            return Array.from(s).sort(function (a, b) {
              return a - b;
            }).map(function (m) {
              return D.MESI[m - 1];
            }).join(', ');
          };
          var d = L.distanze(v.nome);
          UI.alert("".concat(v.emoji, " ").concat(v.nome), "".concat(v.come, "\n\nSemina: ").concat(mesi(sem), "\nRaccolta stimata: ").concat(mesi(rac), "\nMaturazione: circa ").concat(v.giorni, " giorni").concat(d ? "\nDistanze: ".concat(d.piantine, " cm fra le piantine, ").concat(d.solco, " cm fra i solchi.") : '').concat(v.perenne ? '\n🔁 Pianta perenne: resta per anni e continua a produrre.' : ''));
        }
      }));
      for (var _m = 1; _m <= 12; _m++) tab.append(h('div', {
        class: 'cal-c'
      }, h('i', {
        class: sem.has(_m) ? 'on s' : ''
      }), h('i', {
        class: rac.has(_m) ? 'on r' : ''
      })));
    });
    root.append(h('div', {
      class: 'cal-wrap'
    }, tab));
    void tok;
    return {
      title: 'Calendario semine',
      back: '#/attivita',
      el: root
    };
  };

  // =====================================================================
  // COMPAGNI
  // =====================================================================
  V.compagni = function () {
    var root = h('div');
    root.append(h('h3', {
      class: 'grp',
      text: 'I miei abbinamenti'
    }));
    var miei = S.db.abbinamenti;
    root.append(miei.length ? h('div', {
      class: 'card flush'
    }, miei.map(function (a) {
      return h('button', {
        class: 'row',
        onclick: function () {
          var _onclick0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
            return _regenerator().w(function (_context14) {
              while (1) switch (_context14.n) {
                case 0:
                  _context14.n = 1;
                  return UI.confirm('Elimina abbinamento', "".concat(a.esito > 0 ? '👍' : '👎', " ").concat(a.a, " + ").concat(a.b).concat(a.note ? '\n' + a.note : ''), {
                    ok: 'Elimina',
                    danger: true
                  });
                case 1:
                  if (!_context14.v) {
                    _context14.n = 2;
                    break;
                  }
                  S.delRiga('abbinamenti', a.id);
                case 2:
                  return _context14.a(2);
              }
            }, _callee14);
          }));
          function onclick() {
            return _onclick0.apply(this, arguments);
          }
          return onclick;
        }()
      }, h('div', {
        class: 'row-s pre',
        text: "".concat(a.esito > 0 ? '👍' : '👎', " ").concat(a.a, " + ").concat(a.b).concat(a.note ? '\n' + a.note : '')
      }));
    })) : UI.empty('Nessun abbinamento personale. Aggiungi quelli che hai verificato nel tuo orto: hanno la precedenza sul catalogo.'));
    root.append(h('button', {
      class: 'btn primary small',
      text: '＋ Nuovo abbinamento',
      onclick: nuovoAbbinamento
    }));
    root.append(h('h3', {
      class: 'grp',
      text: 'Catalogo'
    }), h('div', {
      class: 'card flush'
    }, L.verdureConCompagni().map(function (n) {
      var c = L.compagniDi(n);
      var parti = [];
      if (c.amici.length) parti.push("👍 ".concat(c.amici.join(', ')));
      if (c.nemici.length) parti.push("👎 ".concat(c.nemici.join(', ')));
      return h('div', {
        class: 'row static'
      }, h('div', {
        class: 'row-s pre',
        text: "".concat(L.emoji(n), " ").concat(n, ": ").concat(parti.join('  ·  '))
      }));
    })));
    return {
      title: 'Compagni',
      back: '#/attivita',
      el: root
    };
  };
  var scegliVerdura = /*#__PURE__*/function () {
    var _scegliVerdura = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(titolo) {
      var nomi, s, n;
      return _regenerator().w(function (_context15) {
        while (1) switch (_context15.n) {
          case 0:
            nomi = L.nomiCatalogo();
            _context15.n = 1;
            return UI.sheet(titolo, nomi.concat([ALTRA]), {
              cancel: 'Annulla'
            });
          case 1:
            s = _context15.v;
            if (s) {
              _context15.n = 2;
              break;
            }
            return _context15.a(2, null);
          case 2:
            if (!(s !== ALTRA)) {
              _context15.n = 3;
              break;
            }
            return _context15.a(2, s);
          case 3:
            _context15.n = 4;
            return UI.prompt(titolo, 'Nome della verdura:', {
              ok: 'OK',
              validate: function validate(v) {
                return v ? null : 'Scrivi il nome.';
              }
            });
          case 4:
            n = _context15.v;
            return _context15.a(2, n ? n.trim() : null);
        }
      }, _callee15);
    }));
    function scegliVerdura(_x6) {
      return _scegliVerdura.apply(this, arguments);
    }
    return scegliVerdura;
  }();
  var nuovoAbbinamento = /*#__PURE__*/function () {
    var _nuovoAbbinamento = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
      var a, b, e, note;
      return _regenerator().w(function (_context16) {
        while (1) switch (_context16.n) {
          case 0:
            _context16.n = 1;
            return scegliVerdura('Prima verdura');
          case 1:
            a = _context16.v;
            if (a) {
              _context16.n = 2;
              break;
            }
            return _context16.a(2);
          case 2:
            _context16.n = 3;
            return scegliVerdura("Insieme a ".concat(a, "…"));
          case 3:
            b = _context16.v;
            if (b) {
              _context16.n = 4;
              break;
            }
            return _context16.a(2);
          case 4:
            if (!L.eq(a, b)) {
              _context16.n = 6;
              break;
            }
            _context16.n = 5;
            return UI.alert('Scelta non valida', 'Scegli due verdure diverse.');
          case 5:
            return _context16.a(2);
          case 6:
            _context16.n = 7;
            return UI.sheet("".concat(a, " + ").concat(b), [{
              label: '👍 Stanno bene vicine',
              value: 1
            }, {
              label: '👎 Meglio separarle',
              value: -1
            }], {
              cancel: 'Annulla'
            });
          case 7:
            e = _context16.v;
            if (!(e == null)) {
              _context16.n = 8;
              break;
            }
            return _context16.a(2);
          case 8:
            _context16.n = 9;
            return UI.prompt('Note', 'Vuoi aggiungere una nota? (facoltativa)', {
              ok: 'Salva',
              cancel: 'Salta'
            });
          case 9:
            note = _context16.v;
            S.addRiga('abbinamenti', {
              a,
              b,
              esito: e,
              note: note && note.trim() ? note.trim() : null
            });
          case 10:
            return _context16.a(2);
        }
      }, _callee16);
    }));
    function nuovoAbbinamento() {
      return _nuovoAbbinamento.apply(this, arguments);
    }
    return nuovoAbbinamento;
  }();

  // =====================================================================
  // STATISTICHE
  // =====================================================================
  var stS = {
    orto: '',
    unita: ''
  };
  var COLORI_ANNO = ['#2E7D32', '#FB8C00', '#1E88E5', '#8E24AA', '#E53935', '#00ACC1', '#6D4C41', '#F9A825'];
  var nomeVerduraR = function nomeVerduraR(r) {
    return r.verdura && r.verdura.trim() ? r.verdura : (S.get('coltivazioni', r.coltId) || {}).verdura || 'Verdura eliminata';
  };
  V.statistiche = function () {
    var root = h('div');
    var tutti = S.db.raccolti;
    root.append(h('button', {
      class: 'btn small',
      text: '💰 Spese e valore dei raccolti',
      onclick: function onclick() {
        return go('#/spese');
      }
    }));
    if (!tutti.length) {
      root.append(UI.empty('Nessun raccolto registrato.\nApri una verdura e scegli «Registra un raccolto».'));
      return {
        title: 'Statistiche',
        el: root
      };
    }
    var orti = L.uniqueCI(tutti.map(function (r) {
      return r.orto;
    }).filter(function (o) {
      return o && o.trim();
    })).sort(L.cmpText);
    if (stS.orto && !orti.includes(stS.orto)) stS.orto = '';
    var fo = UI.field({
      label: 'Orto',
      type: 'select',
      options: [{
        v: '',
        l: 'Tutti gli orti'
      }].concat(orti.map(function (o) {
        return {
          v: o,
          l: o
        };
      })),
      value: stS.orto
    });
    fo.input.addEventListener('change', function () {
      stS.orto = fo.get();
      GO.render();
    });
    root.append(fo.el);
    var voci = tutti.filter(function (r) {
      return !stS.orto || L.eq(r.orto, stS.orto);
    });
    var anni = Array.from(new Set(voci.map(function (r) {
      return +r.data.slice(0, 4);
    }))).sort(function (a, b) {
      return b - a;
    });
    var verdure = L.uniqueCI(voci.map(nomeVerduraR)).sort(L.cmpText);
    var perUnita = grp(voci.filter(function (r) {
      return r.numero != null;
    }), function (r) {
      return r.unita || '';
    });
    var unitaPresenti = Array.from(perUnita.keys()).sort(function (a, b) {
      return perUnita.get(b).length - perUnita.get(a).length;
    });
    var unita = stS.unita;
    if (!unitaPresenti.includes(unita)) unita = unitaPresenti[0] || '';
    if (unitaPresenti.length > 1) {
      var fu = UI.field({
        label: 'Unità del grafico',
        type: 'select',
        options: unitaPresenti.map(function (u) {
          return {
            v: u,
            l: u || '(senza unità)'
          };
        }),
        value: unita
      });
      fu.input.addEventListener('change', function () {
        stS.unita = fu.get();
        GO.render();
      });
      root.append(fu.el);
    }
    var somma = function somma(rs) {
      return rs.filter(function (r) {
        return r.numero != null && (r.unita || '') === unita;
      }).reduce(function (s, r) {
        return s + r.numero;
      }, 0);
    };
    if (unita) root.append(UI.note("Il grafico mostra le quantità in ".concat(unita, "."), 'small'));
    // grafico a barre raggruppate
    var valori = verdure.map(function (v) {
      return anni.map(function (a) {
        return somma(voci.filter(function (r) {
          return +r.data.slice(0, 4) === a && L.eq(nomeVerduraR(r), v);
        }));
      });
    });
    var max = Math.max.apply(Math, [1].concat(_toConsumableArray(valori.flat())));
    var gw = 18,
      gap = 22,
      H = 200,
      padL = 36,
      padB = 74;
    var larg = padL + verdure.length * (anni.length * gw + gap) + 10;
    var NS = 'http://www.w3.org/2000/svg';
    var el = function el(n, a, t) {
      var e = document.createElementNS(NS, n);
      Object.keys(a || {}).forEach(function (k) {
        return e.setAttribute(k, a[k]);
      });
      if (t != null) e.textContent = t;
      return e;
    };
    var svg = el('svg', {
      viewBox: "0 0 ".concat(larg, " ").concat(H + padB),
      width: Math.max(larg, 300),
      height: H + padB,
      class: 'chart',
      role: 'img',
      'aria-label': 'Grafico dei raccolti per verdura e anno'
    });
    for (var i = 0; i <= 4; i++) {
      var y = H - H * i / 4;
      svg.append(el('line', {
        x1: padL,
        x2: larg,
        y1: y,
        y2: y,
        class: 'ch-grid'
      }), el('text', {
        x: padL - 4,
        y: y + 3,
        'text-anchor': 'end',
        class: 'ch-t'
      }, L.num(max * i / 4, 1)));
    }
    verdure.forEach(function (v, vi) {
      var x0 = padL + vi * (anni.length * gw + gap) + gap / 2;
      anni.forEach(function (a, ai) {
        var val = valori[vi][ai];
        var hh = val / max * H;
        svg.append(el('rect', {
          x: x0 + ai * gw,
          y: H - hh,
          width: gw - 2,
          height: Math.max(hh, val > 0 ? 1 : 0),
          fill: COLORI_ANNO[ai % COLORI_ANNO.length],
          rx: 2
        }));
      });
      var t = el('text', {
        x: x0 + anni.length * gw / 2,
        y: H + 12,
        'text-anchor': 'end',
        class: 'ch-t',
        transform: "rotate(-40 ".concat(x0 + anni.length * gw / 2, " ").concat(H + 12, ")")
      }, v);
      svg.append(t);
    });
    root.append(h('div', {
      class: 'chart-wrap'
    }, svg));
    root.append(h('div', {
      class: 'legenda'
    }, anni.map(function (a, i) {
      return h('span', null, h('i', {
        class: 'lg',
        style: {
          background: COLORI_ANNO[i % COLORI_ANNO.length]
        }
      }), " ".concat(a));
    })));
    var totali = function totali(rs) {
      var p = grp(rs.filter(function (r) {
        return r.numero != null;
      }), function (r) {
        return r.unita || '';
      });
      var parti = Array.from(p.keys()).sort(function (a, b) {
        var i = D.UNITA.indexOf(a),
          j = D.UNITA.indexOf(b);
        return (i < 0 ? 99 : i) - (j < 0 ? 99 : j);
      }).map(function (u) {
        return L.formattaQuantita(p.get(u).reduce(function (s, r) {
          return s + r.numero;
        }, 0), u);
      });
      return parti.length ? parti.join(' · ') : 'nessuna quantità';
    };
    anni.forEach(function (a, ai) {
      root.append(h('h3', {
        class: 'grp',
        style: {
          color: COLORI_ANNO[ai % COLORI_ANNO.length]
        },
        text: String(a)
      }));
      var card = h('div', {
        class: 'card flush'
      });
      verdure.forEach(function (v) {
        var g = voci.filter(function (r) {
          return +r.data.slice(0, 4) === a && L.eq(nomeVerduraR(r), v);
        });
        if (!g.length) return;
        var ultima = g.map(function (r) {
          return r.data;
        }).sort().pop();
        card.append(h('button', {
          class: 'row',
          onclick: function onclick() {
            return elencoRaccolti(v, g);
          }
        }, h('div', {
          class: 'row-s',
          text: "".concat(L.emoji(v), " ").concat(v, " - totali ").concat(totali(g), " - ").concat(L.fmtS(ultima))
        })));
      });
      root.append(card);
    });
    return {
      title: 'Statistiche',
      el: root
    };
  };
  var elencoRaccolti = /*#__PURE__*/function () {
    var _elencoRaccolti = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(verdura, gruppo) {
      var voci, i, r, s, _t14;
      return _regenerator().w(function (_context17) {
        while (1) switch (_context17.n) {
          case 0:
            voci = L.sortBy(gruppo, function (r) {
              return r.data;
            }, function (r) {
              return r.id;
            });
            _context17.n = 1;
            return UI.sheet("".concat(verdura, ": tocca un raccolto"), voci.map(function (r, k) {
              return {
                label: "".concat(k + 1, ". ").concat(L.descriviRaccolto(r)),
                value: k
              };
            }));
          case 1:
            i = _context17.v;
            if (!(i == null)) {
              _context17.n = 2;
              break;
            }
            return _context17.a(2);
          case 2:
            r = voci[i];
            _context17.n = 3;
            return UI.sheet("".concat(verdura, ": ").concat(L.descriviRaccolto(r)), [{
              label: 'Modifica',
              value: 'm'
            }, {
              label: 'Elimina',
              value: 'e',
              danger: true
            }]);
          case 3:
            s = _context17.v;
            if (!(s === 'm')) {
              _context17.n = 5;
              break;
            }
            _context17.n = 4;
            return V.modificaRaccoltoVoce(r);
          case 4:
            _context17.n = 8;
            break;
          case 5:
            _t14 = s === 'e';
            if (!_t14) {
              _context17.n = 7;
              break;
            }
            _context17.n = 6;
            return UI.confirm('Elimina raccolto', "".concat(verdura, ": ").concat(L.descriviRaccolto(r)), {
              ok: 'Elimina',
              danger: true
            });
          case 6:
            _t14 = _context17.v;
          case 7:
            if (!_t14) {
              _context17.n = 8;
              break;
            }
            S.delRiga('raccolti', r.id);
          case 8:
            return _context17.a(2);
        }
      }, _callee17);
    }));
    function elencoRaccolti(_x7, _x8) {
      return _elencoRaccolti.apply(this, arguments);
    }
    return elencoRaccolti;
  }();

  // =====================================================================
  // SPESE
  // =====================================================================
  var stSp = {
    anno: null,
    orto: 0,
    scarico: false,
    errore: null
  };
  V.spese = function () {
    var root = h('div');
    var tok = GO.token;
    var spese = S.db.spese,
      raccolti = S.db.raccolti,
      orti = S.orti();
    var anni = Array.from(new Set(spese.map(function (s) {
      return +s.data.slice(0, 4);
    }).concat(raccolti.map(function (r) {
      return +r.data.slice(0, 4);
    }), [L.today().getFullYear()]))).sort(function (a, b) {
      return b - a;
    });
    if (!anni.includes(stSp.anno)) stSp.anno = anni[0];
    if (stSp.orto && !orti.some(function (o) {
      return o.id === stSp.orto;
    })) stSp.orto = 0;
    var anno = stSp.anno,
      oid = stSp.orto;
    var fa = UI.field({
      label: 'Anno',
      type: 'select',
      options: anni.map(function (a) {
        return {
          v: a,
          l: String(a)
        };
      }),
      value: anno
    });
    var fo = UI.field({
      label: 'Orto',
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
      value: oid
    });
    fa.input.addEventListener('change', function () {
      stSp.anno = fa.get();
      GO.render();
      scaricaSeServe(stSp.anno);
    });
    fo.input.addEventListener('change', function () {
      stSp.orto = fo.get();
      GO.render();
    });
    root.append(h('div', {
      class: 'row-gap grow'
    }, fa.el, fo.el));
    var nomeO = function nomeO(id) {
      return id === 0 ? 'generale' : (S.orto(id) || {}).nome || 'orto eliminato';
    };
    var vs = L.sortBy(spese.filter(function (s) {
      return +s.data.slice(0, 4) === anno && (!oid || s.ortoId === oid);
    }), function (s) {
      return s.data;
    }, function (s) {
      return s.id;
    }).reverse();
    var vr = raccolti.filter(function (r) {
      return +r.data.slice(0, 4) === anno && (!oid || r.ortoId === oid);
    });
    var valoreRacc = function valoreRacc(rs) {
      return rs.reduce(function (tot, r) {
        var n = nomeVerduraR(r);
        var _L$inChili = L.inChili(n, r.numero, r.unita),
          kg = _L$inChili.kg;
        var p = L.trovaPrezzo(S.db.prezzi, n, r.data);
        return kg == null || !p ? tot : tot + kg * p.euroKg;
      }, 0);
    };
    var totS = vs.reduce(function (s, x) {
      return s + x.importo;
    }, 0);
    root.append(h('h3', {
      class: 'grp',
      text: 'Spese'
    }));
    root.append(vs.length ? h('div', {
      class: 'card flush'
    }, vs.map(function (s) {
      return h('button', {
        class: 'row',
        onclick: function onclick() {
          return menuSpesa(s);
        }
      }, h('div', {
        class: 'row-s pre',
        text: "".concat(L.fmtS(s.data), " · ").concat(s.categoria).concat(s.descrizione ? ' · ' + s.descrizione : '', "\n").concat(L.euro(s.importo), " · ").concat(nomeO(s.ortoId))
      }));
    })) : UI.empty('Nessuna spesa registrata per questo anno.'));
    root.append(h('button', {
      class: 'btn primary small',
      text: '＋ Aggiungi spesa',
      onclick: function () {
        var _onclick1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18() {
          var n;
          return _regenerator().w(function (_context18) {
            while (1) switch (_context18.n) {
              case 0:
                _context18.n = 1;
                return chiediSpesa(null);
              case 1:
                n = _context18.v;
                if (n) {
                  S.addRiga('spese', n);
                  stSp.anno = +n.data.slice(0, 4);
                }
              case 2:
                return _context18.a(2);
            }
          }, _callee18);
        }));
        function onclick() {
          return _onclick1.apply(this, arguments);
        }
        return onclick;
      }()
    }));
    root.append(h('h3', {
      class: 'grp',
      text: 'Valore dei raccolti (prezzi di mercato)'
    }));
    var totR = 0;
    var gruppi = grp(vr, function (r) {
      return nomeVerduraR(r).toLowerCase();
    });
    var righe = [];
    Array.from(gruppi.keys()).sort(L.cmpText).forEach(function (k) {
      var g = gruppi.get(k),
        nome = nomeVerduraR(g[0]);
      var kgTot = 0,
        euro = 0,
        senza = 0,
        stim = false;
      g.forEach(function (r) {
        var _L$inChili2 = L.inChili(nome, r.numero, r.unita),
          kg = _L$inChili2.kg,
          stimato = _L$inChili2.stimato;
        var p = L.trovaPrezzo(S.db.prezzi, nome, r.data);
        if (kg == null || !p) {
          senza++;
          return;
        }
        kgTot += kg;
        euro += kg * p.euroKg;
        stim = stim || stimato;
      });
      totR += euro;
      var tit = "".concat(L.emoji(nome), " ").concat(nome);
      var t;
      if (kgTot > 0) {
        t = "".concat(tit, " · ").concat(L.num(kgTot, 2), " kg · ≈ ").concat(L.euro(euro), " (").concat(L.euro(euro / kgTot), "/kg)");
        if (stim) t += '\n   peso dei pezzi stimato con un peso medio';
        if (senza > 0) t += "\n   ".concat(senza, " raccolt").concat(senza === 1 ? 'o non valorizzato' : 'i non valorizzati');
      } else if (!L.haPrezzo(nome)) t = "".concat(tit, " · verdura non coperta dal servizio prezzi");else t = "".concat(tit, " · nessun prezzo disponibile per il periodo dei raccolti (o quantità non convertibile in kg)");
      righe.push(h('div', {
        class: 'row static'
      }, h('div', {
        class: 'row-s pre',
        text: t
      })));
    });
    root.append(righe.length ? h('div', {
      class: 'card flush'
    }, righe) : UI.empty('Nessun raccolto registrato per questo anno.'));
    var saldo = totR - totS;
    root.append(UI.card(h('div', {
      class: 'row-t',
      text: "Spese: ".concat(L.euro(totS))
    }), h('div', {
      class: 'row-t',
      text: "Valore dei raccolti (stima): ".concat(L.euro(totR))
    }), h('div', {
      class: 'row-t ' + (saldo >= 0 ? 'pos' : 'neg'),
      text: "Saldo stimato: ".concat(saldo >= 0 ? '+' : '−').concat(L.euro(Math.abs(saldo)))
    })));

    // confronto per anno
    root.append(h('h3', {
      class: 'grp',
      text: 'Confronto fra anni'
    }));
    var tb = h('div', {
      class: 'tbl'
    }, ['Anno', 'Spese', 'Raccolti', 'Saldo'].map(function (t) {
      return h('div', {
        class: 'th',
        text: t
      });
    }));
    anni.forEach(function (a) {
      var sp = spese.filter(function (s) {
        return +s.data.slice(0, 4) === a && (!oid || s.ortoId === oid);
      }).reduce(function (t, s) {
        return t + s.importo;
      }, 0);
      var rs = raccolti.filter(function (r) {
        return +r.data.slice(0, 4) === a && (!oid || r.ortoId === oid);
      });
      var disp = rs.length === 0 || S.db.prezzi.some(function (p) {
        return +p.inizio.slice(0, 4) === a;
      });
      var val = disp ? valoreRacc(rs) : null;
      var sal = val == null ? null : val - sp;
      var cls = a === anno ? ' sel' : '';
      var tap = function tap() {
        stSp.anno = a;
        GO.render();
        scaricaSeServe(a);
      };
      [String(a), L.euro0(sp), val == null ? 'n.d.' : L.euro0(val), sal == null ? 'n.d.' : "".concat(sal >= 0 ? '+' : '−').concat(L.euro0(Math.abs(sal)))].forEach(function (t, i) {
        return tb.append(h('button', {
          class: 'td' + cls + (i === 3 && sal != null ? sal >= 0 ? ' pos' : ' neg' : ''),
          text: t,
          onclick: tap
        }));
      });
    });
    root.append(tb);
    var ultimo = S.db.prezziAgg[anno] ? new Date(S.db.prezziAgg[anno]) : null;
    var stato = h('p', {
      class: 'note small'
    });
    var aggiornaStato = function aggiornaStato() {
      stato.textContent = (stSp.scarico ? 'Scarico i prezzi di mercato…' : ultimo ? "Prezzi di mercato aggiornati il ".concat(L.fmt(ultimo), ".") : 'Prezzi di mercato non ancora scaricati.') + (stSp.errore ? ' ' + stSp.errore : '');
    };
    aggiornaStato();
    root.append(stato, h('button', {
      class: 'btn small',
      text: '🔄 Aggiorna prezzi',
      onclick: function onclick() {
        return scaricaSeServe(anno, true);
      }
    }), UI.note('Prezzi medi all\'ingrosso (€/kg) dall\'Agri-food data portal della Commissione Europea. Servono la connessione e un portale raggiungibile; i dati scaricati restano salvati sul dispositivo.', 'small'));
    void tok;
    return {
      title: 'Spese e raccolti',
      back: '#/statistiche',
      el: root
    };
  };
  var scaricaSeServe = /*#__PURE__*/function () {
    var _scaricaSeServe = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(anno, forza) {
      return _regenerator().w(function (_context19) {
        while (1) switch (_context19.n) {
          case 0:
            if (!(stSp.scarico || !forza && !ST.prezziDaAggiornare(anno))) {
              _context19.n = 1;
              break;
            }
            return _context19.a(2);
          case 1:
            stSp.scarico = true;
            stSp.errore = null;
            GO.render();
            _context19.n = 2;
            return ST.scaricaPrezzi(anno);
          case 2:
            stSp.errore = _context19.v;
            stSp.scarico = false;
            GO.render();
          case 3:
            return _context19.a(2);
        }
      }, _callee19);
    }));
    function scaricaSeServe(_x9, _x0) {
      return _scaricaSeServe.apply(this, arguments);
    }
    return scaricaSeServe;
  }();
  V.speseAvvio = function () {
    var anni = Array.from(new Set(S.db.raccolti.map(function (r) {
      return +r.data.slice(0, 4);
    }).concat([L.today().getFullYear()]))).sort(function (a, b) {
      return b - a;
    });
    var da = anni.find(function (a) {
      return ST.prezziDaAggiornare(a);
    });
    if (da && S.db.raccolti.length && ST.online()) scaricaSeServe(da);
  };
  var menuSpesa = /*#__PURE__*/function () {
    var _menuSpesa = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(s) {
      var a, n, _t15;
      return _regenerator().w(function (_context20) {
        while (1) switch (_context20.n) {
          case 0:
            _context20.n = 1;
            return UI.sheet("".concat(s.categoria, " · ").concat(L.euro(s.importo)), [{
              label: 'Modifica',
              value: 'm'
            }, {
              label: 'Elimina',
              value: 'e',
              danger: true
            }]);
          case 1:
            a = _context20.v;
            if (!(a === 'm')) {
              _context20.n = 3;
              break;
            }
            _context20.n = 2;
            return chiediSpesa(s);
          case 2:
            n = _context20.v;
            if (n) {
              Object.assign(s, n);
              S.save();
            }
            _context20.n = 6;
            break;
          case 3:
            _t15 = a === 'e';
            if (!_t15) {
              _context20.n = 5;
              break;
            }
            _context20.n = 4;
            return UI.confirm('Elimina spesa', "".concat(L.fmtS(s.data), " · ").concat(s.categoria, " · ").concat(L.euro(s.importo)), {
              ok: 'Elimina',
              danger: true
            });
          case 4:
            _t15 = _context20.v;
          case 5:
            if (!_t15) {
              _context20.n = 6;
              break;
            }
            S.delRiga('spese', s.id);
          case 6:
            return _context20.a(2);
        }
      }, _callee20);
    }));
    function menuSpesa(_x1) {
      return _menuSpesa.apply(this, arguments);
    }
    return menuSpesa;
  }();
  var chiediSpesa = /*#__PURE__*/function () {
    var _chiediSpesa = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(es) {
      var orti, opzOrti, r;
      return _regenerator().w(function (_context21) {
        while (1) switch (_context21.n) {
          case 0:
            orti = S.orti();
            opzOrti = [{
              v: 0,
              l: 'Nessun orto in particolare'
            }].concat(orti.map(function (o) {
              return {
                v: o.id,
                l: o.nome
              };
            }));
            _context21.n = 1;
            return UI.form(es ? 'Modifica spesa' : 'Nuova spesa', [{
              key: 'categoria',
              label: 'Categoria',
              type: 'select',
              options: D.CATEGORIE_SPESE.map(function (c) {
                return {
                  v: c,
                  l: c
                };
              }),
              value: es ? es.categoria : 'Altro',
              autofocus: false
            }, {
              key: 'descrizione',
              label: 'Descrizione (facoltativa)',
              type: 'text',
              value: es ? es.descrizione : ''
            }, {
              key: 'importo',
              label: 'Importo in euro (es. 12,50)',
              type: 'number',
              value: es ? L.num(es.importo, 2) : '',
              autofocus: true
            }, {
              key: 'data',
              label: 'Data',
              type: 'date',
              value: es ? es.data : L.iso(L.today())
            }, {
              key: 'ortoId',
              label: 'Orto',
              type: 'select',
              options: opzOrti,
              value: es ? es.ortoId : stSp.orto || (orti.length === 1 ? orti[0].id : 0)
            }], {
              validate: function validate(v) {
                return !(L.parseNum(v.importo) > 0) ? 'Scrivi un importo maggiore di zero, ad esempio 12,50.' : !v.data ? 'Scegli la data.' : null;
              }
            });
          case 1:
            r = _context21.v;
            if (r) {
              _context21.n = 2;
              break;
            }
            return _context21.a(2, null);
          case 2:
            return _context21.a(2, {
              categoria: r.categoria,
              descrizione: r.descrizione,
              importo: L.parseNum(r.importo),
              data: r.data,
              ortoId: r.ortoId
            });
        }
      }, _callee21);
    }));
    function chiediSpesa(_x10) {
      return _chiediSpesa.apply(this, arguments);
    }
    return chiediSpesa;
  }();

  // =====================================================================
  // IMPOSTAZIONI
  // =====================================================================
  var salvaFile = /*#__PURE__*/function () {
    var _salvaFile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(nome, testo) {
      var file, url, a, _t16;
      return _regenerator().w(function (_context22) {
        while (1) switch (_context22.p = _context22.n) {
          case 0:
            file = new File([testo], nome, {
              type: 'application/json'
            });
            _context22.p = 1;
            if (!(navigator.canShare && navigator.canShare({
              files: [file]
            }))) {
              _context22.n = 3;
              break;
            }
            _context22.n = 2;
            return navigator.share({
              files: [file],
              title: 'Backup Gestione Orto'
            });
          case 2:
            return _context22.a(2);
          case 3:
            _context22.n = 5;
            break;
          case 4:
            _context22.p = 4;
            _t16 = _context22.v;
            if (!(_t16 && _t16.name === 'AbortError')) {
              _context22.n = 5;
              break;
            }
            return _context22.a(2);
          case 5:
            url = URL.createObjectURL(file);
            a = h('a', {
              href: url,
              download: nome
            });
            document.body.append(a);
            a.click();
            a.remove();
            setTimeout(function () {
              return URL.revokeObjectURL(url);
            }, 4000);
          case 6:
            return _context22.a(2);
        }
      }, _callee22, null, [[1, 4]]);
    }));
    function salvaFile(_x11, _x12) {
      return _salvaFile.apply(this, arguments);
    }
    return salvaFile;
  }();
  V.impostazioni = function () {
    var set = S.set();
    var root = h('div');
    root.append(h('h2', {
      class: 'pg-t',
      text: '🌱 Gestione Orto'
    }), UI.note("Versione ".concat(GO.VERSION, " · app web installabile (PWA)")));
    var sw = function sw(label, key, onchange) {
      var f = UI.field({
        label,
        type: 'checkbox',
        value: set[key]
      });
      f.el.classList.add('switch');
      f.input.addEventListener('change', function () {
        set[key] = f.get();
        if (onchange) onchange(f.get());
        S.save();
      });
      return f.el;
    };
    var num = function num(label, key, min, max) {
      var f = UI.field({
        label,
        type: 'int',
        value: set[key]
      });
      f.el.classList.add('inl'); // etichetta e valore sulla stessa riga
      f.input.addEventListener('change', function () {
        var v = parseInt(f.get(), 10);
        if (!isNaN(v)) set[key] = Math.max(min, Math.min(max, v));
        S.save();
      });
      return f.el;
    };
    var ora = function ora(label, key) {
      var f = UI.field({
        label,
        type: 'time',
        value: set[key]
      });
      f.el.classList.add('inl'); // etichetta e orario sulla stessa riga
      f.input.addEventListener('change', function () {
        if (f.get()) {
          set[key] = f.get();
          S.save();
        }
      });
      return f.el;
    };
    var sec = function sec(t) {
      return h('h3', {
        class: 'grp',
        text: t
      });
    };
    var sel = UI.field({
      label: 'Tema',
      type: 'select',
      options: [{
        v: 'auto',
        l: 'Automatico (come il dispositivo)'
      }, {
        v: 'light',
        l: 'Chiaro'
      }, {
        v: 'dark',
        l: 'Scuro'
      }],
      value: set.tema
    });
    sel.input.addEventListener('change', function () {
      set.tema = sel.get();
      GO.applicaTema();
      S.save();
    });
    root.append(sec('🎨 Aspetto'), sel.el);
    root.append(sec('🔔 Notifiche'), UI.note('Con le notifiche attive i promemoria (raccolta, annaffiatura, gelo, semina, trapianto, concimazione) arrivano all\'ora giusta anche con l\'app chiusa. Per farlo, l\'app invia al server l\'elenco dei prossimi promemoria (titolo e testo, con i nomi di orti e verdure) e si aggiorna ogni volta che apri l\'app o cambi i dati. Se non le attivi, gli avvisi compaiono nella scheda Attività.', 'small'));
    var notif = 'Notification' in window;
    var nb = UI.field({
      label: 'Notifiche (anche con l\'app chiusa)',
      type: 'checkbox',
      value: set.notificheBrowser && notif && Notification.permission === 'granted'
    });
    nb.el.classList.add('switch');
    nb.input.addEventListener('change', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23() {
      var p, ok, _t17;
      return _regenerator().w(function (_context23) {
        while (1) switch (_context23.n) {
          case 0:
            if (nb.get()) {
              _context23.n = 1;
              break;
            }
            set.notificheBrowser = false;
            S.save();
            if (GO.push) GO.push.disattiva();
            return _context23.a(2);
          case 1:
            if (!(!notif || !GO.push || !GO.push.supportato())) {
              _context23.n = 3;
              break;
            }
            _context23.n = 2;
            return UI.alert('Notifiche non disponibili', 'Questo browser non supporta le notifiche. Su iPhone servono iOS 16.4 o successivo e l\'app aggiunta alla schermata Home.');
          case 2:
            nb.set(false);
            return _context23.a(2);
          case 3:
            if (!(GO.push.isIOS() && !GO.push.standalone())) {
              _context23.n = 5;
              break;
            }
            _context23.n = 4;
            return UI.alert('Aggiungi Gestione Orto alla schermata Home', 'Su iPhone e iPad le notifiche funzionano solo se apri Gestione Orto dall\'icona sulla schermata Home. Non serve scaricare nulla dall\'App Store.\n\n1. Apri questa pagina in Safari.\n2. Tocca il pulsante Condividi (il quadrato con la freccia in su).\n3. Scegli «Aggiungi alla schermata Home» e conferma.\n4. Chiudi Safari e apri Gestione Orto dalla nuova icona.\n5. Vai in Impostazioni e attiva di nuovo le notifiche.');
          case 4:
            nb.set(false);
            return _context23.a(2);
          case 5:
            if (!(Notification.permission === 'granted')) {
              _context23.n = 6;
              break;
            }
            _t17 = 'granted';
            _context23.n = 8;
            break;
          case 6:
            _context23.n = 7;
            return Notification.requestPermission();
          case 7:
            _t17 = _context23.v;
          case 8:
            p = _t17;
            if (!(p !== 'granted')) {
              _context23.n = 10;
              break;
            }
            set.notificheBrowser = false;
            nb.set(false);
            S.save();
            _context23.n = 9;
            return UI.alert('Permesso negato', 'Per attivare le notifiche consenti il permesso dalle impostazioni del browser.');
          case 9:
            return _context23.a(2);
          case 10:
            set.notificheBrowser = true;
            S.save();
            _context23.n = 11;
            return GO.push.attiva();
          case 11:
            ok = _context23.v;
            if (ok) {
              _context23.n = 12;
              break;
            }
            _context23.n = 12;
            return UI.alert('Notifiche attivate, ma…', 'Non sono riuscito a registrare il dispositivo sul server (rete o servizio non raggiungibile). Riproverò al prossimo avvio o alla prossima modifica.');
          case 12:
            return _context23.a(2);
        }
      }, _callee23);
    })));
    if (GO.push && GO.push.isIOS() && !GO.push.standalone()) {
      root.append(UI.note('Su iPhone e iPad le notifiche funzionano solo se apri Gestione Orto dall\'icona sulla schermata Home. Non serve scaricare nulla dall\'App Store.\n\n1. Apri questa pagina in Safari.\n2. Tocca il pulsante Condividi (il quadrato con la freccia in su).\n3. Scegli «Aggiungi alla schermata Home» e conferma.\n4. Chiudi Safari e apri Gestione Orto dalla nuova icona.\n5. Vai in Impostazioni e attiva le notifiche.', 'warn'));
    }
    root.append(nb.el);

    // Sezioni come nell'app Android: titolo, interruttore, opzioni sulla stessa riga e nota esplicativa.
    root.append(sec('🔔 Promemoria di raccolta'), sw('Avvisami prima della raccolta', 'promAttivo'), num('Giorni di anticipo (0-30)', 'promGiorni', 0, 30), ora('Orario della notifica', 'promOra'), UI.note('Per ogni verdura con raccolta stimata. L\'orario può variare di qualche minuto.', 'small'));
    root.append(sec('💧 Promemoria di annaffiatura'), sw('Ricordami di annaffiare', 'annAttiva'), num('Ogni quanti giorni (1-30)', 'annGiorni', 1, 30), ora('Orario della notifica', 'annOra'), sw('🌦️ Adatta a verdura e meteo', 'annIntelligente'), UI.note('Ogni verdura ha il suo intervallo (i pomodori più spesso delle cipolle), più frequente per le piantine appena messe. Il meteo della città di ciascun orto (Open-Meteo) conta la pioggia come annaffiatura, rimanda se domani piove e anticipa se fa molto caldo. Serre e tunnel ignorano la pioggia. Le previsioni si aggiornano quando apri l\'app.', 'small'), sw('🌧️ Controlla la pioggia di oggi', 'pioggiaOraria'), num('Soglia di pioggia in mm (1-30)', 'pioggiaSoglia', 1, 30), UI.note('Quando apri l\'app, somma la pioggia caduta oggi (Open-Meteo, della città di ciascun orto: se piove a Firenze segna solo gli orti di Firenze). Superata la soglia, nella scheda Attività ti chiede «Sta piovendo?»: con «Sì» le piante nei solchi e nelle aiuole rialzate risultano annaffiate. Serve la città dell\'orto («Modifica orto»).', 'small'));
    root.append(sec('❄️ Avvisi di gelo'), sw('Avvisami se è previsto gelo', 'geloAttivo'), UI.note('La sera prima di una notte con minima di 2 °C o meno (alle 18:00) ti elenca le verdure all\'aperto da coprire: quelle che soffrono il freddo (pomodori, peperoni, zucchine…) e le piantine messe a dimora da meno di 30 giorni. Le serre sono escluse. Serve la città dell\'orto («Modifica orto»).', 'small'));
    root.append(sec('🌱 Promemoria di semina'), sw('Avvisami delle nuove semine', 'seminaAttiva'), UI.note('Il primo giorno del mese (all\'orario dei promemoria di raccolta) ti dice quali verdure da quel mese si possono seminare nel tuo orto.', 'small'));
    root.append(sec('🌿 Promemoria di trapianto'), sw('Avvisami quando trapiantare', 'trapiantoAttivo'), UI.note('Per le verdure seminate in una vaschetta alveolare, nel giorno in cui sono pronte per il trapianto (i giorni dalla semina sono quelli del catalogo; all\'orario dei promemoria di raccolta). Funziona anche con la raccolta disattivata.', 'small'));
    root.append(sec('🧪 Promemoria di concimazione'), sw('Avvisami quando concimare', 'concimazioneAttiva'), UI.note('Ogni giorno (all\'orario dei promemoria di raccolta) elenca le piante da concimare e con cosa: pomodori, peperoni, melanzane e zucchine a intervalli, cavoli e bietola una volta sola. Si azzera quando registri un concime sulla pianta o sul solco. Piano indicativo.', 'small'));
    root.append(sec('🏗️ Promemoria di strutture'), sw('Avvisami quando mettere il sostegno', 'struttureAttive'), UI.note('Una volta sola, qualche giorno dopo la messa a dimora di pomodori, peperoni, peperoncini, melanzane, fagiolini e cetrioli (all\'orario dei promemoria di raccolta), ti ricorda di aggiungere un tutore o delle canne. Non parte se hai già registrato una struttura sulla pianta (menu della verdura → Aggiungi struttura) né per le piantine ancora in vaschetta alveolare.', 'small'));
    root.append(sec('💾 Dati'), UI.note('I dati sono salvati solo su questo dispositivo (nel browser). Esporta un backup JSON per conservarli o spostarli su un altro dispositivo.', 'small'), h('div', {
      class: 'row-gap'
    }, h('button', {
      class: 'btn small',
      text: '⬇️ Esporta dati (JSON)',
      onclick: function onclick() {
        return salvaFile("gestione-orto-".concat(L.iso(new Date()), ".json"), S.esporta());
      }
    }), h('button', {
      class: 'btn small',
      text: '⬆️ Importa dati…',
      onclick: function onclick() {
        return fileInput.click();
      }
    }), h('button', {
      class: 'btn small danger',
      text: '🗑️ Cancella tutti i dati',
      onclick: function () {
        var _onclick10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24() {
          return _regenerator().w(function (_context24) {
            while (1) switch (_context24.n) {
              case 0:
                _context24.n = 1;
                return UI.confirm('Cancella tutti i dati', 'Verranno eliminati orti, verdure, raccolti, spese e impostazioni di questo dispositivo. Esporta prima un backup se vuoi conservarli.', {
                  ok: 'Cancella tutto',
                  danger: true
                });
              case 1:
                if (_context24.v) {
                  _context24.n = 2;
                  break;
                }
                return _context24.a(2);
              case 2:
                S.azzera();
                GO.applicaTema();
                UI.toast('Dati cancellati');
              case 3:
                return _context24.a(2);
            }
          }, _callee24);
        }));
        function onclick() {
          return _onclick10.apply(this, arguments);
        }
        return onclick;
      }()
    })));
    var fileInput = h('input', {
      type: 'file',
      accept: '.json,application/json',
      hidden: true,
      onchange: function () {
        var _onchange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(e) {
          var f, testo, j, d, _t18;
          return _regenerator().w(function (_context25) {
            while (1) switch (_context25.p = _context25.n) {
              case 0:
                f = e.target.files[0];
                e.target.value = '';
                if (f) {
                  _context25.n = 1;
                  break;
                }
                return _context25.a(2);
              case 1:
                _context25.p = 1;
                _context25.n = 2;
                return f.text();
              case 2:
                testo = _context25.v;
                j = JSON.parse(testo);
                d = j.dati || j;
                if (Array.isArray(d.orti)) {
                  _context25.n = 3;
                  break;
                }
                throw new Error('Il file non contiene dati di Gestione Orto.');
              case 3:
                _context25.n = 4;
                return UI.confirm('Importa dati', "Il file contiene ".concat(d.orti.length, " orti e ").concat((d.coltivazioni || []).length, " verdure. Sostituirà tutti i dati attuali di questo dispositivo."), {
                  ok: 'Importa',
                  danger: true
                });
              case 4:
                if (_context25.v) {
                  _context25.n = 5;
                  break;
                }
                return _context25.a(2);
              case 5:
                S.importa(testo);
                GO.applicaTema();
                UI.toast('Dati importati');
                _context25.n = 7;
                break;
              case 6:
                _context25.p = 6;
                _t18 = _context25.v;
                _context25.n = 7;
                return UI.alert('Importazione non riuscita', _t18.message || 'File non valido.');
              case 7:
                return _context25.a(2);
            }
          }, _callee25, null, [[1, 6]]);
        }));
        function onchange(_x13) {
          return _onchange.apply(this, arguments);
        }
        return onchange;
      }()
    });
    root.append(fileInput);
    if (S.erroreSalvataggio) root.append(UI.note(S.erroreSalvataggio, 'warn'));
    root.append(sec('📲 Installazione'), UI.note('Su iPhone e iPad apri la pagina in Safari, tocca Condividi e poi «Aggiungi alla schermata Home». Su Android e su computer usa «Installa app» del browser. Dopo il primo caricamento l\'app funziona anche senza rete (il meteo e i prezzi richiedono la connessione).', 'small'));
    root.append(sec('Cosa fa l\'app'), h('div', {
      class: 'card'
    }, h('div', {
      class: 'pre small',
      text: ['• Orti: crea uno o più orti, su terreno (con metri quadrati e numero di solchi) oppure su balcone o terrazzo (solo vasi e cassette, con l\'esposizione). Con la città dell\'orto meteo, avvisi e mesi di semina si adattano al luogo.', '• Verdure: annota cosa hai piantato, quando e dove (solco o contenitore), quante piantine e le distanze. Per ognuna stima il raccolto e annota annaffiature, concimi e raccolti (data, numero e unità).', '• Trapianto: dal menu di una verdura sposta tutte o alcune piantine in un altro solco o contenitore, anche di un altro orto.', '• Balcone: profondità del terriccio e luce consigliate, con avvisi se il contenitore o l\'esposizione non vanno bene.', '• Rotazione: avviso se nello stesso posto c\'era la stessa famiglia botanica negli ultimi 2 anni.', '• Solchi: sostanze date a tutto il solco, inserimento di solchi e passaggi, rimozione con rinumerazione.', '• Oggetti: lombricompostiera e compostiera (temperature e materiali), vasi, cassette, vaschette alveolari, serre, aiuole rialzate, irrigazione e altro, ciascuno con il suo registro.', '• Attività: calendario di annaffiatura, concimazione, trapianto, raccolta e rimozione; cosa seminare e dove; schede delle verdure; calendario delle semine; compagni.', '• Schema: il disegno dell\'orto con solchi, verdure e oggetti.', '• Statistiche e spese: raccolti per anno e verdura, spese e valore stimato dei raccolti.'].join('\n\n')
    })));
    root.append(h('p', {
      class: 'copyright',
      text: '@Marco Rosano'
    }));
    return {
      title: 'Impostazioni',
      el: root
    };
  };
})();