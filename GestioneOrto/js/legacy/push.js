function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(typeof e + " is not iterable"); }
function _createForOfIteratorHelper(e, t) { var _n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"]; if (!_n) { if (Array.isArray(e) || (_n = _unsupportedIterableToArray(e)) || t && e && "number" == typeof e.length) { _n && (e = _n); var o = 0, F = function F() {}; return { s: F, n: function n() { return o >= e.length ? { done: !0 } : { done: !1, value: e[o++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var a, u, i = !0; return { s: function s() { _n = _n.call(e); }, n: function n() { i = !0; var r = _n.next(); return r.done ? { done: !0 } : { value: r.value, done: i = !1 }; }, e: function e(r) { a = !0, u = r; }, f: function f() { try { i || null == _n.return || _n.return(); } finally { if (a) throw u; } } }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var r, e, o = "function" == typeof Symbol ? Symbol : {}, n = o.iterator || "@@iterator", a = o.toStringTag || "@@toStringTag"; function i(o, n, a, i) { var u = n && n.prototype instanceof Generator ? n : Generator, f = Object.create(u.prototype); return _regeneratorDefine2(f, "_invoke", function (t, o, n) { var a, i, u, f = 0, p = n || [], y = !1, G = { p: 0, n: 0, v: r, a: l, f: l.bind(r, 4), d: function d(t, e) { return a = t, i = 0, u = r, G.n = e, c; } }; function l(t, o) { for (i = t, u = o, e = 0; !y && f && !n && e < p.length; e++) { var n, a = p[e], l = G.p, F = a[2]; t > 3 ? (n = F === o) && (u = a[(i = a[4]) ? 5 : (i = 3, 3)], a[4] = a[5] = r) : a[0] <= l && ((n = t < 2 && l < a[1]) ? (i = 0, G.v = o, G.n = a[1]) : l < F && (n = t < 3 || a[0] > o || o > F) && (a[4] = t, a[5] = o, G.n = F, i = 0)); } if (n || t > 1) return c; throw y = !0, o; } return function (n, p, F) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && l(p, F), i = p, u = F; (e = i < 2 ? r : u) || !y;) { a || (i ? (i > 1 && (G.n = i < 3 ? -1 : u), l(i, u)) : G.v = u); try { if (f = 2, a) { if (i || (n = "next"), e = a[n]) { if (!(e = e.call(a, u))) throw TypeError("iterator result is not an object"); if (!e.done) return e; u = e.value, i < 2 && (i = 0); } else 1 === i && (e = a.return) && e.call(a), i < 2 && (u = TypeError("The iterator does not provide a '" + n + "' method"), i = 1); a = r; } else if ((e = (y = G.n < 0) ? u : t.call(o, G)) !== c) break; } catch (t) { a = r, i = 1, u = t; } finally { f = 1; } } return { value: e, done: y }; }; }(o, a, i), !0), f; } var c = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} e = Object.getPrototypeOf; var u = [][n] ? e(e([][n]())) : (_regeneratorDefine2(e = {}, n, function () { return this; }), e), f = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(u); function p(r) { return Object.setPrototypeOf ? Object.setPrototypeOf(r, GeneratorFunctionPrototype) : (r.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(r, a, "GeneratorFunction")), r.prototype = Object.create(f), r; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(f, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, a, "GeneratorFunction"), _regeneratorDefine2(f), _regeneratorDefine2(f, a, "Generator"), _regeneratorDefine2(f, n, function () { return this; }), _regeneratorDefine2(f, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: p }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(e, i) { return _iterableToArrayLimit(e, i) || _unsupportedIterableToArray(e, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(t, e) { if (t) { if ("string" == typeof t) return _arrayLikeToArray(t, e); var o = {}.toString.call(t).slice(8, -1); return "Object" === o && t.constructor && (o = t.constructor.name), "Map" === o || "Set" === o ? Array.from(t) : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? _arrayLikeToArray(t, e) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, t) { var e = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (Array.isArray(r) && (null == e || e === ("undefined" != typeof Symbol && [][Symbol.iterator]) || e === []["@@iterator"])) return r; if (null != e) { var l, n, i, a, u = [], o = !0, f = !1; try { if (i = (e = e.call(r)).next, 0 === t) { if (Object(e) !== e) return; o = !1; } else for (; !(o = (l = i.call(e)).done) && (u.push(l.value), u.length !== t); o = !0); } catch (r) { f = !0, n = r; } finally { try { if (!o && null != e.return && (a = e.return(), Object(a) !== a)) return; } finally { if (f) throw n; } } return u; } }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/* Gestione Orto PWA - promemoria push: calcola i promemoria dei prossimi giorni (come l'app nativa, che li programma
   come notifiche locali) e li manda a Supabase, che li spedisce all'ora giusta anche con l'app chiusa.
   Va caricato DOPO app.js (si aggancia a S.onChange). */
(function () {
  'use strict';

  var GO = window.GO;
  var L = GO.L,
    S = GO.S,
    ST = GO.net,
    V = GO.V;

  // --- Configurazione (vedi _backend-supabase/LEGGIMI.md) ---
  var PUSH_URL = 'https://cvonyqexrnwvebfxgdih.supabase.co'; // progetto Supabase di Gestione Orto (NON quello di Mangiami Prima)
  var PUSH_KEY = 'sb_publishable_L0QszZJh33AXcAk2SM2DJw_KNz6vfk-'; // chiave pubblica (anon)
  GO.supabase = {
    url: PUSH_URL,
    key: PUSH_KEY
  }; // usato anche da store.js per il servizio prezzi
  var VAPID_PUBBLICA = 'BLkxXKXkJdpcS5-ab3BBx3gzFlmCQkZBrcEZlHBnwYmCov1teb6Y9qBNeiDOtvruLY2n_BrHiWb0ySQt1EYBVuw'; // coppia propria di Gestione Orto

  var GIORNI_AVANTI = 14; // come l'app nativa: annaffiatura, gelo, concimazione per i prossimi 14 giorni
  var GIORNI_RACCOLTA = 45; // raccolta e trapianto: piu' avanti, perche' sono eventi singoli
  var MAX_PROMEMORIA = 150;
  var ORA_GELO = '18:00'; // la sera prima della notte fredda, come l'app nativa

  var CH_ID = 'gestioneorto.push.id';
  var CH_ATTIVO = 'gestioneorto.push.attivo';
  var CH_DA_INVIARE = 'gestioneorto.push.daInviare';
  var timer = null;
  var leggi = function leggi(k) {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return null;
    }
  };
  var scrivi = function scrivi(k, v) {
    try {
      localStorage.setItem(k, v);
    } catch (e) {/* ignora */}
  };
  var supportato = function supportato() {
    return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
  };
  var attivo = function attivo() {
    return supportato() && leggi(CH_ATTIVO) === '1' && Notification.permission === 'granted';
  };
  var isIOS = function isIOS() {
    return /iphone|ipad|ipod/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  };
  var standalone = function standalone() {
    return window.matchMedia && window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  };
  function idDispositivo() {
    var id = leggi(CH_ID);
    if (!id) {
      id = crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
      });
      scrivi(CH_ID, id);
    }
    return id;
  }
  function chiaveDaBase64(b64) {
    var pad = '='.repeat((4 - b64.length % 4) % 4);
    var raw = atob((b64 + pad).replace(/-/g, '+').replace(/_/g, '/'));
    return Uint8Array.from(raw, function (c) {
      return c.charCodeAt(0);
    });
  }
  function rpc(_x, _x2) {
    return _rpc.apply(this, arguments);
  }
  function _rpc() {
    _rpc = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(nome, corpo) {
      var r, _t, _t2, _t3, _t4;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return fetch("".concat(PUSH_URL, "/rest/v1/rpc/").concat(nome), {
              method: 'POST',
              headers: {
                apikey: PUSH_KEY,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(corpo)
            });
          case 1:
            r = _context.v;
            if (r.ok) {
              _context.n = 3;
              break;
            }
            _t = Error;
            _t2 = "".concat(nome, ": HTTP ").concat(r.status, " ");
            _t3 = _t2.concat;
            _context.n = 2;
            return r.text().catch(function () {
              return '';
            });
          case 2:
            _t4 = _t3.call(_t2, _context.v);
            throw new _t(_t4);
          case 3:
            return _context.a(2);
        }
      }, _callee);
    }));
    return _rpc.apply(this, arguments);
  }
  function sottoscrizione(_x3) {
    return _sottoscrizione.apply(this, arguments);
  } // ---------------------------------------------------------------------
  // Calcolo dei promemoria programmati
  // ---------------------------------------------------------------------
  function _sottoscrizione() {
    _sottoscrizione = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(crea) {
      var reg, chiave, sub, att;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return navigator.serviceWorker.ready;
          case 1:
            reg = _context2.v;
            chiave = chiaveDaBase64(VAPID_PUBBLICA);
            _context2.n = 2;
            return reg.pushManager.getSubscription();
          case 2:
            sub = _context2.v;
            if (!(sub && sub.options && sub.options.applicationServerKey)) {
              _context2.n = 4;
              break;
            }
            att = new Uint8Array(sub.options.applicationServerKey);
            if (!(att.length !== chiave.length || att.some(function (b, i) {
              return b !== chiave[i];
            }))) {
              _context2.n = 4;
              break;
            }
            _context2.n = 3;
            return sub.unsubscribe();
          case 3:
            sub = null;
          case 4:
            if (!(!sub && crea)) {
              _context2.n = 6;
              break;
            }
            _context2.n = 5;
            return reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: chiave
            });
          case 5:
            sub = _context2.v;
          case 6:
            return _context2.a(2, sub);
        }
      }, _callee2);
    }));
    return _sottoscrizione.apply(this, arguments);
  }
  var istante = function istante(giorno, hhmm) {
    var _String$split$map = String(hhmm || '09:00').split(':').map(Number),
      _String$split$map2 = _slicedToArray(_String$split$map, 2),
      h = _String$split$map2[0],
      m = _String$split$map2[1];
    return new Date(giorno.getFullYear(), giorno.getMonth(), giorno.getDate(), h || 0, m || 0, 0);
  };

  /** Promemoria "serve una struttura?": uno per pianta, qualche giorno dopo la messa a dimora, se non ne ha ancora registrate. */
  function programmatiStrutture() {
    var set = S.set();
    if (!set.struttureAttive) return [];
    var adesso = new Date();
    var oggi = L.today();
    var out = [];
    S.db.coltivazioni.forEach(function (c) {
      var cont = c.oggettoId != null ? S.get('oggetti', c.oggettoId) : null;
      if (cont && L.tipo(cont.tipo).conAlveoli) return;
      var sugg = L.suggerimentoStruttura(c.verdura);
      var giorno = L.dataAvvisoStruttura(c, S.db.trattVerdura);
      var orto = S.orto(c.ortoId);
      if (!sugg || !giorno || !orto || L.diff(giorno, oggi) > GIORNI_RACCOLTA) return;
      var quando = istante(giorno, set.promOra);
      if (quando <= adesso) return;
      var luogo = cont ? cont.nome : c.solco > 0 ? "solco ".concat(c.solco) : 'senza posto';
      out.push({
        tag: "strut-".concat(c.id),
        quando: quando.toISOString(),
        titolo: "\uD83C\uDFD7\uFE0F ".concat(c.verdura, ": serve una struttura?"),
        testo: "".concat(c.verdura, " (").concat(orto.nome, " \xB7 ").concat(luogo, "): ").concat(sugg.consiglio, " Suggerito: ").concat(sugg.struttura.toLowerCase(), ". Registrala dal menu della verdura \u2192 \xABAggiungi struttura\xBB.")
      });
    });
    return out;
  }

  /** Elenco { tag, quando (ISO UTC), titolo, testo } dei promemoria futuri, come li programmerebbe l'app nativa. */
  function programmati() {
    return _programmati.apply(this, arguments).then(function (out) {
      var extra = programmatiStrutture();
      if (!extra.length) return out;
      return out.concat(extra).sort(function (a, b) {
        return a.quando.localeCompare(b.quando);
      }).slice(0, MAX_PROMEMORIA);
    });
  } // ---------------------------------------------------------------------
  // Sincronizzazione con Supabase
  // ---------------------------------------------------------------------
  function _programmati() {
    _programmati = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var set, adesso, oggi, meteoDi, out, aggiungi, verdura, emoji, att, _iterator, _step, a, giorno, quanto, _iterator2, _step2, _a, _loop, i, k, primo, sem, _t5, _t6;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            set = S.set();
            adesso = new Date();
            oggi = L.today();
            _context4.n = 1;
            return ST.meteoPerOrti(S.orti(), false);
          case 1:
            meteoDi = _context4.v;
            // usa la cache se ha meno di un'ora
            out = [];
            aggiungi = function aggiungi(quando, tag, titolo, testo) {
              if (quando <= adesso) return;
              out.push({
                tag,
                quando: quando.toISOString(),
                titolo,
                testo
              });
            };
            verdura = function verdura(a) {
              return a.titolo.replace(/^\S+\s+\S+\s+/, '');
            };
            emoji = function emoji(a) {
              return a.titolo.split(' ')[0];
            }; // Raccolta (N giorni prima) e trapianto (nel giorno): eventi singoli, uno per pianta
            att = L.costruisciAttivita(S.db, oggi, meteoDi, set.annGiorni);
            if (!set.promAttivo) {
              _context4.n = 9;
              break;
            }
            _iterator = _createForOfIteratorHelper(att.filter(function (x) {
              return x.tipo === 'raccogli';
            }));
            _context4.p = 2;
            _iterator.s();
          case 3:
            if ((_step = _iterator.n()).done) {
              _context4.n = 6;
              break;
            }
            a = _step.value;
            giorno = L.add(a.data, -set.promGiorni);
            if (!(L.diff(giorno, oggi) > GIORNI_RACCOLTA)) {
              _context4.n = 4;
              break;
            }
            return _context4.a(3, 5);
          case 4:
            quanto = set.promGiorni === 0 ? 'oggi' : set.promGiorni === 1 ? 'domani' : "fra ".concat(set.promGiorni, " giorni");
            aggiungi(istante(giorno, set.promOra), "racc-".concat(a.coltId, "-").concat(L.iso(a.data)), "".concat(emoji(a), " ").concat(verdura(a), " quasi pronta"), "Raccolta stimata ".concat(quanto, " (").concat(L.fmt(a.data), ") · ").concat(a.posto));
          case 5:
            _context4.n = 3;
            break;
          case 6:
            _context4.n = 8;
            break;
          case 7:
            _context4.p = 7;
            _t5 = _context4.v;
            _iterator.e(_t5);
          case 8:
            _context4.p = 8;
            _iterator.f();
            return _context4.f(8);
          case 9:
            if (!set.trapiantoAttivo) {
              _context4.n = 17;
              break;
            }
            _iterator2 = _createForOfIteratorHelper(att.filter(function (x) {
              return x.tipo === 'trapianta';
            }));
            _context4.p = 10;
            _iterator2.s();
          case 11:
            if ((_step2 = _iterator2.n()).done) {
              _context4.n = 14;
              break;
            }
            _a = _step2.value;
            if (!(L.diff(_a.data, oggi) > GIORNI_RACCOLTA)) {
              _context4.n = 12;
              break;
            }
            return _context4.a(3, 13);
          case 12:
            aggiungi(istante(_a.data, set.promOra), "trap-".concat(_a.coltId, "-").concat(L.iso(_a.data)), "".concat(emoji(_a), " ").concat(verdura(_a), " pronta da trapiantare"), "È il momento di trapiantare (".concat(_a.posto, ")."));
          case 13:
            _context4.n = 11;
            break;
          case 14:
            _context4.n = 16;
            break;
          case 15:
            _context4.p = 15;
            _t6 = _context4.v;
            _iterator2.e(_t6);
          case 16:
            _context4.p = 16;
            _iterator2.f();
            return _context4.f(16);
          case 17:
            _loop = /*#__PURE__*/_regenerator().m(function _loop() {
              var giorno, iso, avvisi, di, ann, conc, gelo;
              return _regenerator().w(function (_context3) {
                while (1) switch (_context3.n) {
                  case 0:
                    giorno = L.add(oggi, i);
                    iso = L.iso(giorno);
                    _context3.n = 1;
                    return V.calcolaAvvisi(meteoDi, giorno);
                  case 1:
                    avvisi = _context3.v;
                    di = function di(icona) {
                      return avvisi.find(function (a) {
                        return a.icona === icona;
                      });
                    };
                    ann = di('💧'), conc = di('🧪'), gelo = di('❄️');
                    if (ann) aggiungi(istante(giorno, set.annOra), "ann-".concat(iso), '💧 Da annaffiare', ann.righe.join('\n'));
                    if (conc) aggiungi(istante(giorno, set.promOra), "conc-".concat(iso), '🧪 Da concimare', conc.righe.join('\n'));
                    if (gelo) aggiungi(istante(giorno, ORA_GELO), "gelo-".concat(iso), '❄️ Rischio gelo stanotte', "Domattina proteggi con tessuto non tessuto o un telo:\n".concat(gelo.righe.join('\n')));
                  case 2:
                    return _context3.a(2);
                }
              }, _loop);
            });
            i = 0;
          case 18:
            if (!(i < GIORNI_AVANTI)) {
              _context4.n = 20;
              break;
            }
            return _context4.d(_regeneratorValues(_loop()), 19);
          case 19:
            i++;
            _context4.n = 18;
            break;
          case 20:
            if (!set.seminaAttiva) {
              _context4.n = 24;
              break;
            }
            k = 1;
          case 21:
            if (!(k <= 3)) {
              _context4.n = 24;
              break;
            }
            primo = new Date(oggi.getFullYear(), oggi.getMonth() + k, 1);
            _context4.n = 22;
            return V.calcolaAvvisi(meteoDi, primo);
          case 22:
            sem = _context4.v.find(function (a) {
              return a.icona === '🌱';
            });
            if (sem) aggiungi(istante(primo, set.promOra), "sem-".concat(L.iso(primo)), "🌱 ".concat(sem.titolo), "".concat(sem.righe.join('\n'), "\nApri «Attività» → «Cosa seminare» per vedere dove."));
          case 23:
            k++;
            _context4.n = 21;
            break;
          case 24:
            out.sort(function (a, b) {
              return a.quando.localeCompare(b.quando);
            });
            return _context4.a(2, out.slice(0, MAX_PROMEMORIA));
        }
      }, _callee3, null, [[10, 15, 16, 17], [2, 7, 8, 9]]);
    }));
    return _programmati.apply(this, arguments);
  }
  function sincronizzaOra() {
    return _sincronizzaOra.apply(this, arguments);
  }
  /** Raggruppa modifiche ravvicinate in un solo invio. */
  function _sincronizzaOra() {
    _sincronizzaOra = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var sub, _t7, _t8, _t9, _t0, _t1;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            if (attivo()) {
              _context5.n = 1;
              break;
            }
            return _context5.a(2);
          case 1:
            _context5.p = 1;
            _context5.n = 2;
            return sottoscrizione(true);
          case 2:
            sub = _context5.v;
            _t7 = rpc;
            _t8 = idDispositivo();
            _t9 = sub.toJSON();
            _context5.n = 3;
            return programmati();
          case 3:
            _t0 = _context5.v;
            _context5.n = 4;
            return _t7('push_sincronizza', {
              p_id: _t8,
              p_subscription: _t9,
              p_promemoria: _t0
            });
          case 4:
            scrivi(CH_DA_INVIARE, '0');
            _context5.n = 6;
            break;
          case 5:
            _context5.p = 5;
            _t1 = _context5.v;
            console.warn('Sincronizzazione promemoria non riuscita:', _t1);
            scrivi(CH_DA_INVIARE, '1'); // riprova al ritorno della rete / alla prossima modifica
          case 6:
            return _context5.a(2);
        }
      }, _callee4, null, [[1, 5]]);
    }));
    return _sincronizzaOra.apply(this, arguments);
  }
  function sincronizza() {
    if (!attivo()) return;
    clearTimeout(timer);
    timer = setTimeout(sincronizzaOra, 2500);
  }

  /** Dopo che l'utente ha concesso il permesso: registra il telefono e invia i promemoria. true se riuscito. */
  function attiva() {
    return _attiva.apply(this, arguments);
  }
  function _attiva() {
    _attiva = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            if (!(!supportato() || Notification.permission !== 'granted')) {
              _context6.n = 1;
              break;
            }
            return _context6.a(2, false);
          case 1:
            scrivi(CH_ATTIVO, '1');
            _context6.n = 2;
            return sincronizzaOra();
          case 2:
            return _context6.a(2, leggi(CH_DA_INVIARE) !== '1');
        }
      }, _callee5);
    }));
    return _attiva.apply(this, arguments);
  }
  function disattiva() {
    return _disattiva.apply(this, arguments);
  }
  function _disattiva() {
    _disattiva = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var sub, _t10;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.p = _context7.n) {
          case 0:
            scrivi(CH_ATTIVO, '0');
            _context7.p = 1;
            _context7.n = 2;
            return sottoscrizione(false);
          case 2:
            sub = _context7.v;
            if (!sub) {
              _context7.n = 3;
              break;
            }
            _context7.n = 3;
            return sub.unsubscribe();
          case 3:
            _context7.n = 4;
            return rpc('push_rimuovi', {
              p_id: idDispositivo()
            });
          case 4:
            _context7.n = 6;
            break;
          case 5:
            _context7.p = 5;
            _t10 = _context7.v;
            console.warn('Disattivazione push:', _t10);
          case 6:
            return _context7.a(2);
        }
      }, _callee6, null, [[1, 5]]);
    }));
    return _disattiva.apply(this, arguments);
  }
  GO.push = {
    supportato,
    attivo,
    attiva,
    disattiva,
    sincronizza,
    isIOS,
    standalone,
    programmati
  };

  // Ogni modifica ai dati o alle impostazioni ricalcola i promemoria (come RicalcolaAsync dell'app nativa)
  var precedente = S.onChange;
  S.onChange = function () {
    if (precedente) precedente();
    sincronizza();
  };
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') sincronizza();
  });
  window.addEventListener('online', function () {
    if (leggi(CH_DA_INVIARE) === '1') sincronizza();
  });
  var avvia = function avvia() {
    if (attivo()) sincronizza();
  }; // rinnova anche la sottoscrizione ad ogni apertura
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', avvia);else avvia();
})();